const scrollTopBtn = document.getElementById("scrollTopBtn");

// Mostrar el botón al hacer scroll hacia abajo
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Volver arriba al hacer click
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});