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
  
/* 1. CONTACT FORM */
formEndpoint: "https://send.webforms.to/wft_gcniic4snytfxi8y79a3",

formExtraFields: {
  _subject: "New NXT Agency Quote Request"
},

  /* Shown on the site and in error messages. */
  contactEmail: "team@nxtagency.net",

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
      id: "render",
      title: "3D Renders",
      description: "Custom 3D visuals designed to bring concepts to life."
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
      client: "Rancho Hats",
      image: "",
      description: "[Short project description]",
      services: ["Web Design", "Marketing"],
      url: ""
    },
    {
      client: "Cashedout Hats",
      image: "",
      description: "[Short project description]",
      services: ["Web Design"],
      url: ""
    },
    {
      client: "FMB LA",
      image: "",
      description: "[Short project description]",
      services: ["Web Design", "Business Automation"],
      url: ""
    }
  ],

  /* 6. PACKAGES
     Prices are placeholders until you set them. "id" is used in links, so keep it unique. */
  packages: [
    {
      id: "starter",
      name: "Brand",
      price: "[Starter]",
      summary: "Create a brand that stands out with custom logos, designs, and visuals that represent your business.",
      includes: "Web design", "SMS/Email Setup", "SEO",
      highlighted: false
    },
    {
      id: "growth",
      name: "Business",
      price: "[Growth]",
      summary: "Build your online presence with a professional website and tools that help your business reach more customers.",
      includes: "Web design", "Marketing", "Content Creation", "Management",
      highlighted: true
    },
    {
      id: "scale",
      name: "Partnership",
      price: "[Scale]",
      summary: "Connect us with businesses that need our services. We handle the work, while you earn a commission for every successful referral.",
      includes: "Web design", "Marketing", "Hosting/Maintenance", "Business Automation",
      highlighted: false
    }
  ],

  /* 7. BUDGET OPTIONS on the quote form */
  budgetRanges: ["Not sure yet", "Under $500", "$500-1000", "$1,000 - $2,500", "$2,500+"]
};
