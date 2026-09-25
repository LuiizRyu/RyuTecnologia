function cerrarModal() {
			var modal = document.getElementById('braveModal');
			if (modal) modal.style.display = 'none';
		}

		function cerrarBanner() {
			var banner = document.getElementById('promoBanner');
			var tab = document.getElementById('openBannerTab');
			if (banner && tab) {
				banner.classList.add('closed');
				tab.classList.add('visible');
				tab.setAttribute('aria-expanded', 'false');
			}
		}

		function abrirBanner() {
			var banner = document.getElementById('promoBanner');
			var tab = document.getElementById('openBannerTab');
			if (banner && tab) {
				banner.classList.remove('closed');
				tab.classList.remove('visible');
				tab.setAttribute('aria-expanded', 'true');
			}
		}

		// Soporte para cerrar modal o banner con la tecla ESC
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape') {
				cerrarModal();
				cerrarBanner();
			}
		});

		let serverDate = null;

		async function fetchRealTime() {
			try {
				const response = await fetch('https://worldtimeapi.org/api/timezone/America/Mexico_City');
				const data = await response.json();
				serverDate = new Date(data.datetime);
			} catch (error) {
				serverDate = new Date();
			}
		}

		function renderDateTime() {
			if (!serverDate) return;

			serverDate.setSeconds(serverDate.getSeconds() + 1);

			// Obtenemos la hora en formato de 24 horas (0 - 23)
			let hours24 = serverDate.getHours();

			// Determinamos si es AM o PM
			const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'; // O puedes usar 'PM' / 'AM'

			// Convertimos de formato 24h a 12h (si da 0, lo cambiamos a 12)
			let hours12 = hours24 % 12;
			hours12 = hours12 ? hours12 : 12;

			const hours = String(hours12).padStart(2, '0');
			const minutes = String(serverDate.getMinutes()).padStart(2, '0');

			// Mostramos la hora junto con el indicador AM/PM
			document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;

			// Genera únicamente el formato de fecha (ej. 14 DE AGOSTO DE 2026)
			const dateFull = serverDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

			// Se asigna únicamente dateFull sin el weekday ni el salto de línea <br>
			document.getElementById('date').textContent = dateFull;
		}

		async function initClock() {
			await fetchRealTime();
			renderDateTime();
			setInterval(renderDateTime, 1000);
			setInterval(fetchRealTime, 900000);
		}

		initClock();

		// Motor Navegación Espacial
		document.addEventListener('DOMContentLoaded', () => {
			const primeraTarjeta = document.querySelector('.grid-card');
			if (primeraTarjeta) primeraTarjeta.focus();

			document.addEventListener('keydown', (e) => {
				const activeElement = document.activeElement;

				if (e.key === 'Enter') {
					if (activeElement && activeElement.classList.contains('tv-focusable')) {
						activeElement.click();
					}
					return;
				}

				let direction = null;
				if (e.key === 'ArrowUp') direction = 'up';
				if (e.key === 'ArrowDown') direction = 'down';
				if (e.key === 'ArrowLeft') direction = 'left';
				if (e.key === 'ArrowRight') direction = 'right';

				if (direction) {
					e.preventDefault();
					navigateSpatial(activeElement, direction);
				}
			});
		});

		function navigateSpatial(currentEl, direction) {
			const focusables = Array.from(document.querySelectorAll('.tv-focusable')).filter(el => {
				const rect = el.getBoundingClientRect();
				return rect.width > 0 && rect.height > 0 && getComputedStyle(el).visibility !== 'hidden';
			});

			if (!currentEl || !focusables.includes(currentEl)) {
				if (focusables.length > 0) focusables[0].focus();
				return;
			}

			const currentRect = currentEl.getBoundingClientRect();
			let bestCandidate = null;
			let minDistance = Infinity;

			focusables.forEach((candidate) => {
				if (candidate === currentEl) return;

				const candidateRect = candidate.getBoundingClientRect();

				let isInDirection = false;
				if (direction === 'up') isInDirection = candidateRect.bottom <= currentRect.top + 10;
				if (direction === 'down') isInDirection = candidateRect.top >= currentRect.bottom - 10;
				if (direction === 'left') isInDirection = candidateRect.right <= currentRect.left + 10;
				if (direction === 'right') isInDirection = candidateRect.left >= currentRect.right - 10;

				if (isInDirection) {
					const currentCenter = {
						x: currentRect.left + currentRect.width / 2,
						y: currentRect.top + currentRect.height / 2
					};
					const candidateCenter = {
						x: candidateRect.left + candidateRect.width / 2,
						y: candidateRect.top + candidateRect.height / 2
					};

					const distance = Math.hypot(
						candidateCenter.x - currentCenter.x,
						candidateCenter.y - currentCenter.y
					);

					if (distance < minDistance) {
						minDistance = distance;
						bestCandidate = candidate;
					}
				}
			});

			if (bestCandidate) {
				bestCandidate.focus();
				bestCandidate.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center'
				});
			}
		}