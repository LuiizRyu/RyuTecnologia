document.addEventListener('DOMContentLoaded', () => {
    // --- Gestión del Modal ---
    const modal = document.getElementById('modalAviso');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    const cerrarModal = () => {
        if (modal) {
            modal.style.display = 'none';
        }
    };

    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', cerrarModal);
    }

    // --- Gestión del Banner Flotante ---
    const banner = document.getElementById('bannerFlotante');
    const btnCerrarBanner = document.getElementById('btnCerrarBanner');
    const tabBanner = document.getElementById('tabBanner');

    const ocultarBanner = () => {
        if (banner && tabBanner) {
            banner.classList.add('closed');
            tabBanner.classList.add('visible');
            tabBanner.setAttribute('aria-expanded', 'false');
        }
    };

    const mostrarBanner = () => {
        if (banner && tabBanner) {
            banner.classList.remove('closed');
            tabBanner.classList.remove('visible');
            tabBanner.setAttribute('aria-expanded', 'true');
        }
    };

    if (btnCerrarBanner) btnCerrarBanner.addEventListener('click', ocultarBanner);
    if (tabBanner) tabBanner.addEventListener('click', mostrarBanner);

    // --- Cierre con tecla ESC ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
            ocultarBanner();
        }
    });
});