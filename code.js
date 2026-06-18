const celebrateButton = document.getElementById('celebrateButton');
const celebrationLayer = document.getElementById('celebrationLayer');
const heartStage = document.getElementById('heartStage');
const heartGrid = document.getElementById('heartGrid');
const tickerShell = document.getElementById('tickerShell');
const tickerTrack = document.getElementById('tickerTrack');

const celebrationEmojis = ['🎉', '✨', '💖', '🥳', '🎊', '💫', '🪩', '⭐', '🍾', '💥'];

const tickerItems = [
	{ type: 'text', value: 'Nuestro primer año juntitos' },
	{ type: 'image', label: 'Imagen 01', src: '_Images/img1.jpg' },
	{ type: 'text', value: 'Gracias por cada momento' },
	{ type: 'image', label: 'Imagen 02', src: '_Images/img4.jpg' },
	{ type: 'text', value: 'Siempre juntos' },
	{ type: 'image', label: 'Imagen 03', src: '_Images/img3.jpg' },
	{ type: 'text', value: 'Más recuerdos por crear' },
	{ type: 'image', label: 'Imagen 04', src: '_Images/img2.jpg' },
	{ type: 'text', value: 'Otro recuerdo más' },
	{ type: 'image', label: 'Imagen 05', src: '_Images/img5.jpg' },
	{ type: 'text', value: 'Lo mejor todavía viene' },
	{ type: 'image', label: 'Imagen 06', src: '_Images/img6.jpeg' },
];

let celebrationStarted = false;

function createParticleBurst() {
	const particleCount = 28;

	for (let index = 0; index < particleCount; index += 1) {
		const particle = document.createElement('span');
		particle.className = 'particle';
		particle.textContent = celebrationEmojis[index % celebrationEmojis.length];

		const angle = (Math.PI * 2 * index) / particleCount;
		const distance = 80 + Math.random() * 180;
		const drift = (Math.random() - 0.5) * 90;
		const x = Math.cos(angle) * distance + drift;
		const y = Math.sin(angle) * distance - (60 + Math.random() * 90);
		const rotation = `${Math.round((Math.random() - 0.5) * 540)}deg`;

		particle.style.setProperty('--dx', `${Math.round(x)}px`);
		particle.style.setProperty('--dy', `${Math.round(y)}px`);
		particle.style.setProperty('--rotation', rotation);
		particle.style.left = '50%';
		particle.style.top = '50%';

		celebrationLayer.appendChild(particle);
		particle.addEventListener('animationend', () => particle.remove(), { once: true });
	}
}

function buildHeart() {
	heartGrid.innerHTML = '';

	const columns = 34;
	const rows = 30;
	const dots = [];

	for (let row = 0; row < rows; row += 1) {
		for (let column = 0; column < columns; column += 1) {
			const x = (column / (columns - 1)) * 3 - 1.5;
			const y = (row / (rows - 1)) * 3 - 1.5;
			const equation = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);

			if (equation <= 0) {
				dots.push({ column, row });
			}
		}
	}

	dots.forEach((dot, index) => {
		const dotElement = document.createElement('span');
		dotElement.className = 'heart-dot';

		const xPercent = (dot.column / (columns - 1)) * 100;
		const yPercent = 100 - (dot.row / (rows - 1)) * 100;

		dotElement.style.left = `${xPercent}%`;
		dotElement.style.top = `${yPercent}%`;
		dotElement.style.setProperty('--delay', `${index * 18}ms`);

		heartGrid.appendChild(dotElement);
	});
}

function renderTickerItem(item) {
	const card = document.createElement('div');
	card.className = 'ticker-card';

	if (item.type === 'text') {
		card.classList.add('ticker-card--text');
		card.textContent = item.value;
		return card;
	}

	card.classList.add('ticker-card--image');

	const image = document.createElement('img');
	image.className = 'ticker-card__image';
	image.src = item.src;
	image.alt = item.label;

	card.appendChild(image);

	return card;
}

function buildTicker() {
	tickerTrack.innerHTML = '';

	const groups = [document.createElement('div'), document.createElement('div')];
	groups.forEach((group) => group.className = 'ticker-group');

	tickerItems.forEach((item) => {
		groups.forEach((group) => group.appendChild(renderTickerItem(item)));
	});

	groups.forEach((group) => tickerTrack.appendChild(group));
}

function startCelebration() {
	if (celebrationStarted) {
		return;
	}

	celebrationStarted = true;
	celebrateButton.disabled = true;
	celebrateButton.classList.add('is-exiting');

	createParticleBurst();

	window.setTimeout(() => {
		buildHeart();
		buildTicker();
		heartStage.classList.add('is-visible');
		tickerShell.classList.add('is-visible');
		heartStage.setAttribute('aria-hidden', 'false');
		tickerShell.setAttribute('aria-hidden', 'false');
	}, 600);
}

celebrateButton.addEventListener('click', startCelebration);

