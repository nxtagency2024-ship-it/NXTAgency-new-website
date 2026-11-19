/*
  NXT Agency site configuration.

  Edit this file to change content, packages, sounds, and the form connection.
  It is plain data, so no build step is needed.
*/
window.NXT_CONFIG = {

  /* 1. CONTACT FORM
     Create a free form at https://formspree.io (or https://web3forms.com) and paste
     its endpoint below, for example "https://formspree.io/f/abcdwxyz".
     Until this is set, the form shows an error instead of pretending to send. */
  formEndpoint: "",

  /* Extra fields some form services need. For Web3Forms, use: { access_key: "YOUR_KEY" } */
  formExtraFields: {},

  /* Shown on the site and in error messages. */
  contactEmail: "[your-email@example.com]",

  /* 2. SOUNDS
     Put files in assets/sounds/ using these names. Missing files are ignored silently. */
  sounds: {
    startup: "assets/sounds/startup.wav",
    click: "assets/sounds/click.wav",
    nav: "assets/sounds/nav.wav",
    menuOpen: "assets/sounds/menu-open.wav",
    menuClose: "assets/sounds/menu-close.wav"
  },
  soundVolume: 0.5,

  /* 3. STARTUP SCREEN */
  startupTitle: "INITIALIZE NXT WEBSITE",
  startupSubtitle: "Click to access website and boot the system",
  startupLines: [
    "> INITIALIZING NXT_SYSTEM.EXE...",
    "> CONNECTING TO SERVICES_NETWORK...",
    "> CALIBRATING CREATIVE_ENGINE...",
    "> SYSTEM READY."
  ],
  startupLabel: "START SYSTEM",

  /* Hero line that types out under the headline */
  heroTyping: "your next website starts here...",

  /* 4. SERVICES (all six) */
  services: [
    {
      id: "web-design",
      title: "Website Design & Development",
      description: "Custom websites designed to represent businesses professionally and generate customers."
    },
    {
      id: "hosting",
      title: "Website Hosting",
      description: "Reliable website hosting and deployment services."
    },
    {
      id: "maintenance",
      title: "Website Maintenance",
      description: "Ongoing website updates, technical maintenance, and support."
    },
    {
      id: "seo",
      title: "SEO",
      description: "Search engine optimization to help businesses improve their online visibility."
    },
    {
      id: "automation",
      title: "Business Automation",
      description: "Digital workflows and automation solutions that help businesses save time."
    },
    {
      id: "marketing",
      title: "Digital Marketing",
      description: "Marketing solutions that help businesses establish and grow their online presence."
    }
  ],

  /* 5. PORTFOLIO
     Replace the placeholders with real projects. Leave "image" as "" to show a placeholder box.
     Image paths are relative, for example "assets/images/client-one.jpg". */
  projects: [
    {
      client: "[Client name]",
      image: "",
      description: "[Short project description]",
      services: ["[Service]", "[Service]"],
      url: ""
    },
    {
      client: "[Client name]",
      image: "",
      description: "[Short project description]",
      services: ["[Service]"],
      url: ""
    },
    {
      client: "[Client name]",
      image: "",
      description: "[Short project description]",
      services: ["[Service]", "[Service]"],
      url: ""
    }
  ],

  /* 6. PACKAGES
     Prices are placeholders until you set them. "id" is used in links, so keep it unique. */
  packages: [
    {
      id: "starter",
      name: "[Package 1 name]",
      price: "[Price]",
      summary: "[One-line summary of who this package is for]",
      includes: ["[Included item]", "[Included item]", "[Included item]"],
      highlighted: false
    },
    {
      id: "growth",
      name: "[Package 2 name]",
      price: "[Price]",
      summary: "[One-line summary of who this package is for]",
      includes: ["[Included item]", "[Included item]", "[Included item]", "[Included item]"],
      highlighted: true
    },
    {
      id: "scale",
      name: "[Package 3 name]",
      price: "[Price]",
      summary: "[One-line summary of who this package is for]",
      includes: ["[Included item]", "[Included item]", "[Included item]", "[Included item]"],
      highlighted: false
    }
  ],

  /* 7. BUDGET OPTIONS on the quote form */
  budgetRanges: ["Not sure yet", "[Range 1]", "[Range 2]", "[Range 3]", "[Range 4]"]
};
