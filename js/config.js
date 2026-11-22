
/*
  NXT Agency site configuration.

  Edit this file to change content, packages, sounds, and the form connection.
  It is plain data, so no build step is needed.
*/

window.NXT_CONFIG = {

  /* 1. CONTACT FORM */
  formEndpoint: "https://send.webforms.to/wft_gcniic4snytfxi8y79a3",

  formExtraFields: {
    _subject: "New NXT Agency Quote Request"
  },

  contactEmail: "team@nxtagency.net",

  /* 2. SOUNDS */
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

  /* HERO TEXT */
  heroTyping: "your next website starts here...",

  /* 4. SERVICES */
  services: [
    {
      id: "web-design",
      title: "Website Design & Development",
      description: "Custom websites designed to represent businesses professionally and generate customers."
    },
    {
      id: "render",
      title: "3D Renders",
      description: "High-quality 3D visuals that bring your ideas and designs to life."
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

  /* 5. PORTFOLIO */
  projects: [
    {
      client: "Rancho Hats",
      image: "",
      description: "[Short project description]",
      services: ["Web Design", "Marketing"],
      url: ""
    },
    {
      client: "RIAA Scaffold",
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

  /* 6. PACKAGES */
  packages: [
    {
      id: "starter",
      name: "Brand",
      price: "Custom Quote",
      summary: "Create a brand that stands out with custom logos, designs, and visuals that represent your business.",
      includes: [
        "Logo Design",
        "Brand Identity",
        "Social Media Graphics",
        "3D Renders"
      ],
      highlighted: false
    },
    {
      id: "growth",
      name: "Business",
      price: "Custom Quote",
      summary: "Build your online presence with a professional website and tools that help your business reach more customers.",
      includes: [
        "Website Design",
        "SEO",
        "SMS/Email Setup",
        "Business Automation",
        "Website Management"
      ],
      highlighted: true
    },
    {
      id: "scale",
      name: "Partnership",
      price: "Commission Based",
      summary: "Connect us with businesses that need our services. We handle the work, while you earn a commission for every successful referral.",
      includes: [
        "Business Referrals",
        "30% Commission",
        "Dedicated Support",
        "Ongoing Opportunities"
      ],
      highlighted: false
    }
  ],

  /* 7. BUDGET OPTIONS */
  budgetRanges: [
    "Not sure yet",
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500+"
  ]

};
