export const revealSection = () => {
  const fadeInSection = document.getElementsByClassName("fade-in");

  for (let i = 0; i < fadeInSection.length; i++) {
    let windowHeight = window.innerHeight;
    let sectionTop = fadeInSection[i].getBoundingClientRect().top;

    if (sectionTop < windowHeight) {
      fadeInSection[i].classList.add("active");
    } else {
      fadeInSection[i].classList.remove("active");
    }
  }
};
