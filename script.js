const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];
const projectMenu = document.querySelector("[data-project-menu]");
const projectMenuToggle = document.querySelector(".nav-submenu-toggle");
const projectMenuLinks = document.querySelectorAll(".nav-submenu a[data-project-target]");
const carousel = document.querySelector("[data-carousel]");

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/index.html";
  }

  return pathname.endsWith("/") ? `${pathname}index.html` : pathname;
};

const currentPath = normalizePath(window.location.pathname);
const currentHash = window.location.hash;

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const setActiveLink = () => {
  const offset = window.scrollY + window.innerHeight * 0.3;
  let currentSectionId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const linkUrl = new URL(link.getAttribute("href"), window.location.href);
    const linkPath = normalizePath(linkUrl.pathname);
    const samePage = linkPath === currentPath;
    const isHashLink = Boolean(linkUrl.hash);

    let isActive = false;

    if (samePage && isHashLink && currentSectionId) {
      isActive = linkUrl.hash === `#${currentSectionId}`;
    } else if (samePage && !isHashLink) {
      isActive = true;
    } else if (samePage && isHashLink && !sections.length) {
      isActive = linkUrl.hash === currentHash;
    }

    link.classList.toggle("is-active", isActive);
  });
};

setActiveLink();

if (sections.length) {
  window.addEventListener("scroll", setActiveLink, { passive: true });
}

if (projectMenu && projectMenuToggle) {
  const closeProjectMenu = () => {
    projectMenu.classList.remove("is-open");
    projectMenuToggle.setAttribute("aria-expanded", "false");
  };

  const openProjectMenu = () => {
    projectMenu.classList.add("is-open");
    projectMenuToggle.setAttribute("aria-expanded", "true");
  };

  projectMenuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    if (projectMenu.classList.contains("is-open")) {
      closeProjectMenu();
      return;
    }

    openProjectMenu();
  });

  document.addEventListener("click", (event) => {
    if (!projectMenu.contains(event.target)) {
      closeProjectMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectMenu();
    }
  });

  projectMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeProjectMenu();
    });
  });
}

if (carousel) {
  const slides = [...carousel.querySelectorAll(".project-slide")];
  const tabs = [...carousel.querySelectorAll(".carousel-tab")];
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const section = document.querySelector("#projetos");
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
  let autoplayId;

  if (activeIndex < 0) {
    activeIndex = 0;
  }

  const setSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const activeName = slides[activeIndex].dataset.slide;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });

    tabs.forEach((tab) => {
      const isActive = tab.dataset.slideTarget === activeName;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    if (window.location.hash !== `#${activeName}`) {
      window.history.replaceState(null, "", `#${activeName}`);
    }
  };

  const restartAutoplay = () => {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => {
      setSlide(activeIndex + 1);
    }, 5500);
  };

  prevButton?.addEventListener("click", () => {
    setSlide(activeIndex - 1);
    restartAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    setSlide(activeIndex + 1);
    restartAutoplay();
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setSlide(index);
      restartAutoplay();
    });
  });

  projectMenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.dataset.projectTarget;
      const slideIndex = slides.findIndex((slide) => slide.dataset.slide === target);
      const linkUrl = new URL(link.href);
      const samePage = normalizePath(linkUrl.pathname) === currentPath;

      if (slideIndex < 0 || !section || !samePage) {
        return;
      }

      event.preventDefault();
      setSlide(slideIndex);
      restartAutoplay();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  carousel.addEventListener("mouseenter", () => {
    window.clearInterval(autoplayId);
  });

  carousel.addEventListener("mouseleave", () => {
    restartAutoplay();
  });

  const slideFromHash = slides.findIndex((slide) => `#${slide.dataset.slide}` === currentHash);

  if (slideFromHash >= 0) {
    activeIndex = slideFromHash;
  }

  setSlide(activeIndex);
  restartAutoplay();
}
