/* ── Cargar Header ── */
fetch("components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-container").innerHTML = data;
    iniciarMenu();
    iniciarHeaderScroll();
    waitForI18nAndRebind();
  })
  .catch(err => console.error("Error cargando header:", err));

/* ── Cargar Footer ── */
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-container").innerHTML = data;
    /* Traducir el footer una vez inyectado */
    waitForI18nAndRebind();
  })
  .catch(err => console.error("Error cargando footer:", err));

/* ── Polling: espera a que i18n esté listo y llama translateDOM ── */
function waitForI18nAndRebind() {
  if (window.i18nReady === true && typeof window.i18nRebind === 'function') {
    window.i18nRebind();
  } else {
    setTimeout(waitForI18nAndRebind, 50);
  }
}

/* ── Scroll Header ── */
function iniciarHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scroll-header', window.scrollY >= 50);
  });
}