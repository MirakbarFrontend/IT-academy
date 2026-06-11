const SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbzaY2gDOqyAAxF4-iddD1VQ7w9CblC-M6y-yfRqK3BdHkAIJ5wnqcw3Ukf7oGUudAl2DA/exec';

const nameInput = document.getElementById('cf-ism');
const phoneInput = document.getElementById('cf-telefon');
const kursSelect = document.getElementById('cf-kurs');
const vaqtSelect = document.getElementById('cf-vaqt');
const submitBtn = document.getElementById('cf-btn');
const navbar = document.querySelector('nav');
const grid = document.querySelector('.hero-grid');

// ─── 1. TELEFON MASKA ───
if (phoneInput) {
	phoneInput.addEventListener('input', e => {
		let value = e.target.value.replace(/\D/g, '');
		if (!value.startsWith('998')) value = '998' + value;
		value = value.substring(0, 12);
		let formatted = '+998 ';
		if (value.length > 3) formatted += value.substring(3, 5);
		if (value.length >= 5) formatted += ' ' + value.substring(5, 8);
		if (value.length >= 8) formatted += ' ' + value.substring(8, 10);
		if (value.length >= 10) formatted += ' ' + value.substring(10, 12);
		e.target.value = formatted.trim();
	});
}

// ─── 2. ERROR VA VALIDATION TIZIMI ───
function showError(input, message) {
	removeError(input);
	const error = document.createElement('small');
	error.className = 'error-text';
	error.innerText = message;
	input.parentElement.appendChild(error);
	input.classList.add('error');
}

// Global scope-ga chiqarildi, chunki inline HTML-da chaqirilgan bo'lishi mumkin
window.removeError = function (input) {
	if (!input) return;
	const oldError = input.parentElement.querySelector('.error-text');
	if (oldError) oldError.remove();
	input.classList.remove('error');
};

function validateForm() {
	let valid = true;

	if (nameInput && nameInput.value.trim().length < 3) {
		showError(nameInput, "Ism kamida 3 harf bo'lishi kerak");
		valid = false;
	} else if (nameInput) {
		removeError(nameInput);
	}

	if (phoneInput) {
		const phoneNumbers = phoneInput.value.replace(/\D/g, '');
		if (phoneNumbers.length !== 12) {
			showError(phoneInput, "Telefon raqam noto'g'ri");
			valid = false;
		} else {
			removeError(phoneInput);
		}
	}

	if (kursSelect && !kursSelect.value) {
		showError(kursSelect, 'Iltimos tanlang');
		valid = false;
	} else if (kursSelect) {
		removeError(kursSelect);
	}

	if (vaqtSelect && !vaqtSelect.value) {
		showError(vaqtSelect, 'Iltimos tanlang');
		valid = false;
	} else if (vaqtSelect) {
		removeError(vaqtSelect);
	}

	return valid;
}

// Real-time validation
const inputFields = [nameInput, phoneInput, kursSelect, vaqtSelect].filter(el => el !== null);
inputFields.forEach(input => {
	input.addEventListener('change', () => removeError(input));
	input.addEventListener('input', () => removeError(input));
});

// ─── 3. ARIZA YUBORISH (SUBMIT) ───
window.arizaYuborish = async function () {
	if (!validateForm() || !submitBtn) return;

	const originalText = submitBtn.innerHTML;
	submitBtn.disabled = true;
	submitBtn.innerHTML = 'Yuborilmoqda...';

	try {
		await fetch(SCRIPT_URL, {
			method: 'POST',
			body: JSON.stringify({
				ism: nameInput.value.trim(),
				telefon: phoneInput.value.trim(),
				kurs: kursSelect.value,
				vaqt: vaqtSelect.value,
			}),
		});

		submitBtn.innerHTML = '✓ Yuborildi';
		if (nameInput) nameInput.value = '';
		if (phoneInput) phoneInput.value = '';
		if (kursSelect) kursSelect.value = '';
		if (vaqtSelect) vaqtSelect.value = '';
		showToast("Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz");

		setTimeout(() => {
			submitBtn.disabled = false;
			submitBtn.innerHTML = originalText;
		}, 2000);
	} catch (err) {
		submitBtn.disabled = false;
		submitBtn.innerHTML = originalText;
		showToast('Xatolik yuz berdi', true);
	}
};

// ─── 4. TOAST NOTIFICATION ───
function showToast(message, error = false) {
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.innerText = message;
	toast.style.background = error ? '#ff4d4f' : '#16a34a';
	document.body.appendChild(toast);
	setTimeout(() => toast.classList.add('show'), 100);
	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => toast.remove(), 300);
	}, 3000);
}

// ─── 5. HERO GRID MOUSE FOLLOW (XAVFSIZ BLOK ICHIDA) ───
{
	let mouseX = window.innerWidth / 2;
	let mouseY = window.innerHeight / 2;
	let currentX = mouseX;
	let currentY = mouseY;

	window.addEventListener('mousemove', e => {
		if (grid) {
			const rect = grid.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
	});

	function animateGrid() {
		if (grid) {
			currentX += (mouseX - currentX) * 0.08;
			currentY += (mouseY - currentY) * 0.08;
			grid.style.setProperty('--x', `${currentX}px`);
			grid.style.setProperty('--y', `${currentY}px`);
		}
		requestAnimationFrame(animateGrid);
	}
	animateGrid();
}

// ─── 6. SMART NAVBAR (KURS.HTML UCHUN TO'G'RILANGAN VARIANT) ───
{
	let lastScrollTop = 0;

	window.addEventListener('scroll', function () {
		const navbarEl = document.querySelector('.navbar');
		if (!navbarEl) return;

		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Sahifa kurs.html bo'lsa navbar har doim qotib turadi, yo'qolmaydi:
		if (window.location.pathname.includes('kurs.html')) {
			navbarEl.style.transform = 'translateY(0)';
			return;
		}

		if (scrollTop > lastScrollTop && scrollTop > 100) {
			navbarEl.style.transform = 'translateY(-100%)';
		} else {
			navbarEl.style.transform = 'translateY(0)';
		}
		lastScrollTop = scrollTop;
	});
}

// ─── 7. COURSE MODAL DATA & LOGIC ───
const courseData = {
	1: {
		num: '01 / DASTURLASH',
		title: 'Dasturlash',
		price: "600 000 so'm/oy",
		duration: '9 oy',
		teacher: 'Jasur Karimov',
		level: "Boshlang'ich → Professional",
		topics: ['HTML & CSS', 'JavaScript', 'Python', 'Git & GitHub', 'Real loyihalar & portfolio', 'CV, intervyu tayyorgarlik'],
		schedule: 'Hafta 3 kun | 18:00 – 20:00',
	},
	2: {
		num: '02 / INGLIZ TILI',
		title: 'Ingliz tili',
		price: "390 000 so'm/oy",
		duration: '3 oy',
		teacher: 'Nilufar Yusupova',
		level: 'A1 dan C1 gacha',
		topics: [
			'Grammatika',
			'Speaking',
			'Listening & Reading',
			'IELTS tayyorgarlik',
			'Communicative methodology',
			'Biznes ingliz tili',
		],
		schedule: 'Hafta 3 kun | 09:00 – 11:00',
	},
	3: {
		num: '03 / MATEMATIKA',
		title: 'Matematika',
		price: "390 000 so'm/oy",
		duration: '4 oy',
		teacher: 'Bobur Toshmatov',
		level: 'Maktab → Abituriyent',
		topics: ['Algebra va geometriya', 'Trigonometriya', 'DTM format mashqlar', 'Individual yondashuv', 'Sinov imtihonlari'],
		schedule: 'Hafta 3 kun | 15:00 – 17:00',
	},
	4: {
		num: '04 / KOREYS TILI',
		title: 'Koreys tili',
		price: "390 000 so'm/oy",
		duration: '6 oy',
		teacher: 'Seul Pak',
		level: 'Noldan → TOPIK 3',
		topics: [
			'Hangeul alifbosi',
			'Grammatika',
			'Kundalik suhbat',
			'TOPIK tayyorgarlik',
			'K-drama orqali tinglash',
			'Koreys madaniyati',
		],
		schedule: 'Hafta 2 kun | 17:00 – 19:00',
	},
	5: {
		num: '05 / NEMIS TILI',
		title: 'Nemis tili',
		price: "400 000 so'm/oy",
		duration: '6 oy',
		teacher: "O'qituvchi",
		level: 'A1 dan B2 gacha',
		topics: [
			'Grammatika asoslari',
			'Suhbat mashqlari',
			"Yozish ko'nikmalari",
			'Goethe imtihon tayyorgarlik',
			"Kundalik lug'at",
			'Tinglash mashqlari',
		],
		schedule: 'Hafta 3 kun | 10:00 – 12:00',
	},
	6: {
		num: '06 / KOMPYUTER SAVODXONLIGI',
		title: 'Kompyuter savodxonligi',
		price: "500 000 so'm/oy",
		duration: '3 oy',
		teacher: "O'qituvchi",
		level: 'Noldan boshlovchilar uchun',
		topics: [
			'Windows asoslari',
			'Microsoft Word',
			'Microsoft Excel',
			'Microsoft PowerPoint',
			'Internet va email',
			'Printer, skaner ishlatish',
		],
		schedule: 'Hafta 3 kun | 11:00 – 13:00',
	},
	7: {
		num: '07 / GRAFIK DIZAYN',
		title: 'Grafik dizayn',
		price: "600 000 so'm/oy",
		duration: '6 oy',
		teacher: "O'qituvchi",
		level: "Boshlang'ich → Professional",
		topics: [
			'Figma — UI/UX dizayn',
			'Photoshop — rasm tahrirlash',
			'Illustrator — vektorlar',
			'Logo va branding',
			'Banner va poster',
			'Portfolio yaratish',
		],
		schedule: 'Hafta 3 kun | 14:00 – 16:00',
	},
	8: {
		num: '08 / PMT TAYYORLOV',
		title: 'Prezident maktabiga tayyorlov',
		price: "650 000 so'm/oy",
		duration: '6 oy',
		teacher: "O'qituvchi",
		level: "Maktab o'quvchilari uchun",
		topics: [
			"Matematika chuqur o'rganish",
			'Ingliz tili intensiv',
			'Mantiqiy fikrlash',
			'Test strategiyalari',
			'Mock imtihonlar',
			'Individual tahlil',
		],
		schedule: 'Hafta 4 kun | 09:00 – 11:00',
	},
	9: {
		num: '09 / AI DARSLARI',
		title: 'AI darslari',
		price: "600 000 so'm/oy",
		duration: '3 oy',
		teacher: "O'qituvchi",
		level: 'Hamma uchun',
		topics: [
			'ChatGPT — professional foydalanish',
			'Midjourney — AI rasm yaratish',
			'GitHub Copilot — kod yozish',
			'AI bilan ish samaradorligi',
			'Prompt engineering',
			"AI biznesda qo'llash",
		],
		schedule: 'Hafta 2 kun | 16:00 – 18:00',
	},
};

// Modal foni va stillarini inject qilish
document.body.insertAdjacentHTML(
	'beforeend',
	`<div id="course-modal-overlay" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:1rem;"><div id="course-modal" style="background:#1a1a1a; border:1px solid #2a2a2a; border-radius:16px; width:100%; max-width:520px; max-height:90vh; overflow-y:auto; position:relative; animation: modalIn 0.3s ease;"><button id="modal-close" style="position:sticky; top:1rem; float:right; margin:1rem 1rem 0 0; background:#2a2a2a; border:none; color:#fff; width:32px; height:32px; border-radius:50%; cursor:pointer; font-size:16px; line-height:1; display:flex; align-items:center; justify-content:center; z-index:1;">✕</button><div id="modal-body" style="padding:2rem;"></div></div></div><style>@keyframes modalIn { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } } #course-modal::-webkit-scrollbar { width:4px; } #course-modal::-webkit-scrollbar-track { background:transparent; } #course-modal::-webkit-scrollbar-thumb { background:#333; border-radius:4px; } .modal-topic-item { display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:1px solid #222; font-size:13px; color:#ccc; } .modal-topic-item:last-child { border-bottom:none; } .modal-check { color:#e63946; font-size:14px; margin-top:1px; flex-shrink:0; }</style>`,
);

document.querySelectorAll('.ccard').forEach((card, i) => {
	card.addEventListener('click', () => {
		const data = courseData[i + 1];
		if (!data) return;
		const body = document.getElementById('modal-body');

		body.innerHTML = `
      <div style="font-family:monospace;font-size:10px;color:#666;letter-spacing:1px;margin-bottom:1.5rem;">${data.num}</div>
      <h2 style="font-size:26px;font-weight:700;color:#fff;margin-bottom:0.5rem;letter-spacing:-0.5px;">${data.title}</h2>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:2rem;">
        <span style="font-size:12px;color:#999;background:#222;border:1px solid #2a2a2a;border-radius:100px;padding:4px 12px;">${data.level}</span>
        <span style="font-size:12px;color:#999;background:#222;border:1px solid #2a2a2a;border-radius:100px;padding:4px 12px;">⏱ ${data.duration}</span>
      </div>
      <div style="background:#111;border-radius:10px;padding:1rem 1.25rem;margin-bottom:1.5rem;border:1px solid #222;">
        <div style="font-size:11px;color:#555;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;">O'qituvchi</div>
        <div style="font-size:15px;color:#fff;font-weight:600;">${data.teacher}</div>
      </div>
      <div style="background:#111;border-radius:10px;padding:1rem 1.25rem;margin-bottom:1.5rem;border:1px solid #222;">
        <div style="font-size:11px;color:#555;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;">Jadval</div>
        <div style="font-size:14px;color:#ccc;">${data.schedule}</div>
      </div>
      <div style="margin-bottom:2rem;">
        <div style="font-size:11px;color:#555;text-transform:uppercase;letter-spacing:1px;margin-bottom:1rem;">Nima o'rganasiz</div>
        <div>${data.topics.map(t => `<div class="modal-topic-item"><span class="modal-check">✓</span><span>${t}</span></div>`).join('')}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #222;padding-top:1.5rem;">
        <div style="font-size:20px;font-weight:700;color:#e63946;">${data.price}</div>
        <a href="#contact" onclick="closeModal()" style="background:#e63946;color:#fff;text-decoration:none; padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;" onmouseover="this.style.background='#c1121f'" onmouseout="this.style.background='#e63946'">Ro'yxatdan o'tish →</a>
      </div>
    `;

		const overlay = document.getElementById('course-modal-overlay');
		if (overlay) {
			overlay.style.display = 'flex';
			document.body.style.overflow = 'hidden';
		}
	});
});

window.closeModal = function () {
	const overlay = document.getElementById('course-modal-overlay');
	if (overlay) overlay.style.display = 'none';
	document.body.style.overflow = '';
};

const modalCloseBtn = document.getElementById('modal-close');
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

const modalOverlayEl = document.getElementById('course-modal-overlay');
if (modalOverlayEl) {
	modalOverlayEl.addEventListener('click', function (e) {
		if (e.target === this) closeModal();
	});
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModal();
});

// ─── 8. BOSHQA FUNKSIYALAR (COPY, TABS) ───
window.copyNumber = function (number) {
	navigator.clipboard.writeText(number).then(() => {
		showToast('Nusxa olindi: ' + number);
	});
};

window.switchTab = function (btn, id) {
	document.querySelectorAll('.sch-tab').forEach(t => t.classList.remove('active'));
	document.querySelectorAll('.sch-panel').forEach(p => p.classList.remove('active'));
	btn.classList.add('active');
	const panel = document.getElementById('tab-' + id);
	if (panel) panel.classList.add('active');
};

// ─── 9. CANVAS BACKGROUND ANIMATION (XAVFSIZ BLOK ICHIDA) ───
{
	const canvasEl = document.getElementById('hero-canvas');

	if (canvasEl) {
		const ctxEl = canvasEl.getContext('2d');
		let dots = [];
		const gap = 35;
		const mouse = { x: null, y: null, radius: 180 };

		function resizeCanvas() {
			const parent = canvasEl.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			canvasEl.width = rect.width;
			canvasEl.height = rect.height;
			initDots();
		}

		class Dot {
			constructor(x, y) {
				this.x = x;
				this.y = y;
				this.baseX = x;
				this.baseY = y;
				this.size = 1.2;
				this.randomX = Math.random() * 20;
				this.randomY = Math.random() * 20;
				this.speed = 0.03;
			}

			draw() {
				ctxEl.beginPath();
				ctxEl.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctxEl.fill();
			}

			update() {
				this.randomX += this.speed;
				this.randomY += this.speed;
				let currentBaseX = this.baseX + Math.sin(this.randomX) * 4;
				let currentBaseY = this.baseY + Math.cos(this.randomY) * 4;

				let dx = mouse.x - this.x;
				let dy = mouse.y - this.y;
				let distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < mouse.radius && mouse.x !== null) {
					let force = (mouse.radius - distance) / mouse.radius;
					this.x += dx * force * 0.1;
					this.y += dy * force * 0.1;
					ctxEl.fillStyle = `rgba(255, 42, 81, ${0.15 + force * 0.85})`;
					this.size = 1.5 + force * 1;
				} else {
					let dxBase = currentBaseX - this.x;
					let dyBase = currentBaseY - this.y;
					this.x += dxBase * 0.08;
					this.y += dyBase * 0.08;
					ctxEl.fillStyle = 'rgba(255, 255, 255, 0.08)';
					this.size = 1.2;
				}
				this.draw();
			}
		}

		function initDots() {
			dots = [];
			for (let x = gap / 2; x < canvasEl.width; x += gap) {
				for (let y = gap / 2; y < canvasEl.height; y += gap) {
					dots.push(new Dot(x, y));
				}
			}
		}

		function animate() {
			ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);

			if (mouse.x !== null) {
				let gradient = ctxEl.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, mouse.radius);
				gradient.addColorStop(0, 'rgba(255, 42, 81, 0.12)');
				gradient.addColorStop(0.5, 'rgba(255, 42, 81, 0.03)');
				gradient.addColorStop(1, 'rgba(255, 42, 81, 0)');
				ctxEl.fillStyle = gradient;
				ctxEl.fillRect(0, 0, canvasEl.width, canvasEl.height);
			}

			for (let i = 0; i < dots.length; i++) {
				dots[i].update();
			}
			requestAnimationFrame(animate);
		}

		window.addEventListener('mousemove', e => {
			const rect = canvasEl.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
		});

		window.addEventListener('mouseleave', () => {
			mouse.x = null;
			mouse.y = null;
		});

		window.addEventListener('resize', resizeCanvas);

		resizeCanvas();
		animate();
	}
}
