// Animação simples ao rolar a página
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.8) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      } else {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
      }
    });
  });