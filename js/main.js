(function () {
  "use strict";

  var CFG = window.NXT_CONFIG || {};
  var prefersReducedMotion =
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------- Small helpers ---------- */

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function readSession(key) {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }

  function writeSession(key, value) {
    try { sessionStorage.setItem(key, value); } catch (e) { /* storage blocked: ignore */ }
  }

  /* ---------- Sound system ----------
     - Nothing plays until the visitor interacts with the page (browser rule).
     - Missing files fail silently.
     - Each sound has a short cooldown so rapid clicks don't stack.
     - Preference is remembered for the session. */

  var Sound = (function () {
    var KEY = "nxt-sound";
    var COOLDOWN_MS = 120;
    var cache = {};      // name -> Audio element, or false if the file is missing
    var lastPlayed = {}; // name -> timestamp
    var enabled = readSession(KEY) !== "off";

    function source(name) {
      if (cache[name] === false) return null;
      if (cache[name]) return cache[name];

      var src = (CFG.sounds || {})[name];
      if (!src) { cache[name] = false; return null; }

      var audio = new Audio();
      audio.preload = "auto";
      audio.addEventListener("error", function () { cache[name] = false; });
      audio.src = src;
      cache[name] = audio;
      return audio;
    }

    function play(name) {
      if (!enabled) return;

      var now = Date.now();
      if (lastPlayed[name] && now - lastPlayed[name] < COOLDOWN_MS) return;

      var base = source(name);
      if (!base) return;
      lastPlayed[name] = now;

      // A fresh copy lets the same sound overlap without cutting itself off.
      var node = new Audio(base.src);
      node.volume = typeof CFG.soundVolume === "number" ? CFG.soundVolume : 0.5;
      var promise = node.play();
      if (promise && promise.catch) promise.catch(function () { /* blocked or missing: ignore */ });
    }

    function setEnabled(on) {
      enabled = !!on;
      writeSession(KEY, enabled ? "on" : "off");
      $$("[data-sound-toggle]").forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(enabled));
        btn.textContent = enabled ? "Sound on" : "Sound off";
      });
    }

    return {
      play: play,
      setEnabled: setEnabled,
      isEnabled: function () { return enabled; }
    };
  })();

  /* ---------- Rendering from config ---------- */

  function limitFor(root, total) {
    var limit = parseInt(root.getAttribute("data-limit"), 10);
    return isNaN(limit) ? total : Math.min(limit, total);
  }

  function renderServices(root) {
    var list = CFG.services || [];
    list.slice(0, limitFor(root, list.length)).forEach(function (s) {
      var card = el("article", "card");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("h3", "card-title", s.title));
      card.appendChild(el("p", null, s.description));
      root.appendChild(card);
    });
  }

  function renderProjects(root) {
    var list = CFG.projects || [];
    list.slice(0, limitFor(root, list.length)).forEach(function (p) {
      var card = el("article", "card");
      card.setAttribute("data-reveal", "");

      var media;
      if (p.image) {
        media = el("img", "project-media");
        media.src = p.image;
        media.alt = (p.client || "Client") + " project";
        media.loading = "lazy";
      } else {
        media = el("div", "project-media project-placeholder", "Project image placeholder");
      }
      card.appendChild(media);

      card.appendChild(el("h3", "card-title", p.client));
      card.appendChild(el("p", null, p.description));

      if (p.services && p.services.length) {
        var tags = el("ul", "tags");
        p.services.forEach(function (s) { tags.appendChild(el("li", null, s)); });
        card.appendChild(tags);
      }

      if (p.url) {
        var link = el("a", "text-link", "Visit website");
        link.href = p.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);
      }

      root.appendChild(card);
    });
  }

  function renderPackages(root) {
    var list = CFG.packages || [];
    list.slice(0, limitFor(root, list.length)).forEach(function (p) {
      var card = el("article", "card package" + (p.highlighted ? " is-highlighted" : ""));
      card.setAttribute("data-reveal", "");

      card.appendChild(el("h3", "card-title", p.name));
      card.appendChild(el("p", "package-price", p.price));
      card.appendChild(el("p", null, p.summary));

      var list2 = el("ul", "check-list");
      (p.includes || []).forEach(function (item) { list2.appendChild(el("li", null, item)); });
      card.appendChild(list2);

      var cta = el("a", "btn btn-secondary", "Request this package");
      cta.href = "#contact";
      cta.setAttribute("data-package-id", p.id);
      card.appendChild(cta);

      root.appendChild(card);
    });
  }

  function renderFormOptions() {
    var boxes = $("[data-render='service-checkboxes']");
    if (boxes) {
      (CFG.services || []).forEach(function (s) {
        var label = el("label", "check");
        var input = el("input");
        input.type = "checkbox";
        input.name = "services";
        input.value = s.title;
        label.appendChild(input);
        label.appendChild(document.createTextNode(s.title));
        boxes.appendChild(label);
      });
    }

    var select = $("[data-render='budget-options']");
    if (select) {
      (CFG.budgetRanges || []).forEach(function (range) {
        var option = el("option", null, range);
        option.value = range;
        select.appendChild(option);
      });
    }
  }

  // Clicking "Request this package" preselects it in the form, then the anchor scrolls to #contact.
  // The "custom quote" link clears any preselection.
  function setPackageChoice(id) {
    var hidden = $("#package-field");
    var note = $("#package-note");
    if (!hidden) return;

    var pkg = (CFG.packages || []).filter(function (p) { return p.id === id; })[0];
    hidden.value = pkg ? pkg.name : "";

    if (note) {
      note.textContent = pkg ? "Interested in: " + pkg.name : "";
      note.hidden = !pkg;
    }
  }

  function initPackageChoice() {
    document.addEventListener("click", function (e) {
      if (!e.target || !e.target.closest) return;
      var pkgLink = e.target.closest("[data-package-id]");
      if (pkgLink) {
        setPackageChoice(pkgLink.getAttribute("data-package-id"));
        return;
      }
      if (e.target.closest("[data-package-custom]")) {
        setPackageChoice(null);
      }
    });
  }

  function fillContactEmail() {
    var email = CFG.contactEmail;
    if (!email) return;
    $$("[data-contact-email]").forEach(function (node) {
      node.textContent = email;
      node.setAttribute("href", "mailto:" + email);
    });
  }

  /* ---------- Typing effect ---------- */

  // Types text into a node one character at a time, then calls done().
  function typeInto(node, text, speed, done) {
    if (prefersReducedMotion) {
      node.textContent = text;
      if (done) done();
      return;
    }
    var i = 0;
    (function tick() {
      node.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, speed);
      else if (done) done();
    })();
  }

  function initTyping() {
    var node = $("[data-typing]");
    if (!node) return;
    var text = CFG.heroTyping || node.textContent;
    node.textContent = "";
    typeInto(node, text, 55);
  }

  /* ---------- Startup screen (home page only) ----------
     1. Opens on the title and START SYSTEM button.
     2. On click, the button sound plays and the boot lines type out.
     3. The overlay fades away and the site is shown. */

  function initStartup() {
    var overlay = $("#startup");
    if (!overlay) return;

    // Skip the startup screen for the rest of the session once it has run.
    if (readSession("nxt-started") === "yes") {
      overlay.remove();
      return;
    }

    var log = $("#startup-log");
    var title = $("#startup-title");
    var sub = $("#startup-sub");
    var button = $("#startup-start");
    var lines = CFG.startupLines || [];

    document.documentElement.classList.add("is-startup");
    if (CFG.startupTitle) title.textContent = CFG.startupTitle;
    if (CFG.startupSubtitle) sub.textContent = CFG.startupSubtitle;
    button.textContent = CFG.startupLabel || "START SYSTEM";

    sub.hidden = false;
    button.hidden = false;
    button.focus({ preventScroll: true });

    // Types the boot lines one after another, then calls done().
    function boot(done) {
      var index = 0;
      (function next() {
        if (index >= lines.length) {
          done();
          return;
        }
        var line = el("li", "startup-line");
        log.appendChild(line);
        typeInto(line, lines[index++], 22, function () {
          setTimeout(next, prefersReducedMotion ? 0 : 260);
        });
      })();
    }

    // The button carries data-sound="startup", so the global click handler plays the sound.
    button.addEventListener("click", function () {
      button.disabled = true;
      overlay.classList.add("is-booting");

      boot(function () {
        setTimeout(function () {
          overlay.classList.add("is-hidden");
          document.documentElement.classList.remove("is-startup");
          writeSession("nxt-started", "yes");
          setTimeout(function () { overlay.remove(); }, prefersReducedMotion ? 0 : 700);
        }, prefersReducedMotion ? 0 : 900);
      });
    });
  }

  /* ---------- Navigation ---------- */

  function initNav() {
    var toggle = $(".nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.documentElement.classList.toggle("nav-open", open);
      Sound.play(open ? "menuOpen" : "menuClose");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset the mobile menu if the window grows to desktop width.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 800 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        document.documentElement.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Tapping a link in the mobile menu closes it. The anchor then scrolls to the section.
    $$(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) setOpen(false);
      });
    });
  }

  /* ---------- Section highlight in the menu ---------- */

  function initSectionNav() {
    var links = $$(".site-nav a[href^='#']");
    var sections = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---------- Scroll reveals ---------- */

  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ---------- Quote form ---------- */

  function initForm() {
    var form = $("#quote-form");
    if (!form) return;

    var status = $("#form-status");
    var submit = $("button[type='submit']", form);
    var submitLabel = submit.textContent;

    function showStatus(type, message) {
      status.className = "form-status is-" + type;
      status.textContent = message;
      status.hidden = false;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;

      // Browser checks for required fields and valid email.
      if (!form.reportValidity()) return;

      // Honeypot: real visitors never see or fill this field.
      var trap = form.querySelector("[name='_gotcha']");
      if (trap && trap.value) return;

      // Never fake a success: say clearly when the form isn't connected yet.
      if (!CFG.formEndpoint) {
        showStatus(
          "error",
          "The form isn't connected yet. Add a form endpoint in js/config.js, or email " +
            (CFG.contactEmail || "us") + " directly."
        );
        return;
      }

      var data = new FormData(form);
      Object.keys(CFG.formExtraFields || {}).forEach(function (key) {
        data.append(key, CFG.formExtraFields[key]);
      });

      submit.disabled = true;
      submit.textContent = "Sending...";

      fetch(CFG.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed with status " + res.status);
          form.reset();
          showStatus("success", "Thanks. Your request was sent, and we'll be in touch soon.");
        })
        .catch(function () {
          showStatus(
            "error",
            "Your request didn't send. Please try again, or email " +
              (CFG.contactEmail || "us") + " directly."
          );
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = submitLabel;
        });
    });
  }

  /* ---------- Logo and sound controls ---------- */

  function initLogos() {
    // If no logo file exists yet, remove the broken image so only the text name shows.
    $$(".brand-logo").forEach(function (img) {
      var remove = function () { img.remove(); };
      if (img.complete && img.naturalWidth === 0) remove();
      else img.addEventListener("error", remove);
    });
  }

  function initSoundControls() {
    // Buttons without an explicit sound get the standard click sound.
    $$(".btn").forEach(function (btn) {
      if (!btn.hasAttribute("data-sound")) btn.setAttribute("data-sound", "click");
    });

    // One global handler covers all sound-enabled elements, so nothing is wired per element.
    document.addEventListener("click", function (e) {
      if (!e.target || !e.target.closest) return;

      var toggle = e.target.closest("[data-sound-toggle]");
      if (toggle) {
        Sound.setEnabled(!Sound.isEnabled());
        if (Sound.isEnabled()) Sound.play("click");
        return;
      }

      var soundEl = e.target.closest("[data-sound]");
      if (soundEl) Sound.play(soundEl.getAttribute("data-sound"));
    });

    Sound.setEnabled(Sound.isEnabled());
  }

  /* ---------- Boot ---------- */

  function init() {
    $$("[data-render='services']").forEach(renderServices);
    $$("[data-render='projects']").forEach(renderProjects);
    $$("[data-render='packages']").forEach(renderPackages);
    renderFormOptions();
    fillContactEmail();

    initLogos();
    initSoundControls();
    initPackageChoice();
    initNav();
    initSectionNav();
    initTyping();
    initStartup();
    initReveal();
    initForm();
  }

  /* ---------- Scroll to sections without leaving # in the address bar ---------- */

  // Menu and page links to sections on this page: scroll to the section, then clear the #.
  document.addEventListener("click", function (e) {
    var link = e.target && e.target.closest && e.target.closest("a[href*='#']");
    if (!link) return;

    var url = new URL(link.href, window.location.href);
    var samePage = url.pathname.replace(/index\.html$/, "") === window.location.pathname.replace(/index\.html$/, "");
    if (!samePage || !url.hash) return;

    var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start"
    });
    history.replaceState(null, "", url.pathname);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
