const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...document.querySelectorAll("main section[id]")];

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
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("is-active", isActive);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink, { passive: true });
