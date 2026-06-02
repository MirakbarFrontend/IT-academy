const SCRIPT_URL =
	'https://script.google.com/macros/s/AKfycbzaY2gDOqyAAxF4-iddD1VQ7w9CblC-M6y-yfRqK3BdHkAIJ5wnqcw3Ukf7oGUudAl2DA/exec';

const nameInput = document.getElementById('cf-ism');
const phoneInput = document.getElementById('cf-telefon');
const kursSelect = document.getElementById('cf-kurs');
const vaqtSelect = document.getElementById('cf-vaqt');
const submitBtn = document.getElementById('cf-btn');

// Telefon maska
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

// Error
function showError(input, message) {
	removeError(input);
	const error = document.createElement('small');
	error.className = 'error-text';
	error.innerText = message;
	input.parentElement.appendChild(error);
	input.classList.add('error');
}

function removeError(input) {
	const oldError = input.parentElement.querySelector('.error-text');
	if (oldError) oldError.remove();
	input.classList.remove('error');
}

// Validation
function validateForm() {
	let valid = true;

	if (nameInput.value.trim().length < 3) {
		showError(nameInput, "Ism kamida 3 harf bo'lishi kerak");
		valid = false;
	} else {
		removeError(nameInput);
	}

	const phoneNumbers = phoneInput.value.replace(/\D/g, '');
	if (phoneNumbers.length !== 12) {
		showError(phoneInput, "Telefon raqam noto'g'ri");
		valid = false;
	} else {
		removeError(phoneInput);
	}

	if (!kursSelect.value) {
		showError(kursSelect, 'Iltimos tanlang');
		valid = false;
	} else {
		removeError(kursSelect);
	}

	if (!vaqtSelect.value) {
		showError(vaqtSelect, 'Iltimos tanlang');
		valid = false;
	} else {
		removeError(vaqtSelect);
	}

	return valid;
}

// Submit
async function arizaYuborish() {
	if (!validateForm()) return;

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
		nameInput.value = '';
		phoneInput.value = '';
		kursSelect.value = '';
		vaqtSelect.value = '';
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
}

// Toast
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

// Real-time validation
[nameInput, phoneInput, kursSelect, vaqtSelect].forEach(input => {
	input.addEventListener('change', () => removeError(input));
});

// Hero grid mouse follow
const grid = document.querySelector('.hero-grid');
let x = innerWidth / 2;
let y = innerHeight / 2;
let tx = x;
let ty = y;

document.addEventListener('mousemove', e => {
	tx = e.clientX;
	ty = e.clientY;
});

function animate() {
	x += (tx - x) * 0.08;
	y += (ty - y) * 0.08;
	grid.style.setProperty('--x', `${x}px`);
	grid.style.setProperty('--y', `${y}px`);
	requestAnimationFrame(animate);
}
animate();

// Course modal data
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

// Modal
document.body.insertAdjacentHTML(
	'beforeend',
	`
<div id="course-modal-overlay" style="
  display:none; position:fixed; inset:0; z-index:9999;
  background:rgba(0,0,0,0.75); backdrop-filter:blur(4px);
  align-items:center; justify-content:center; padding:1rem;
">
  <div id="course-modal" style="
    background:#1a1a1a; border:1px solid #2a2a2a;
    border-radius:16px; width:100%; max-width:520px;
    max-height:90vh; overflow-y:auto; position:relative;
    animation: modalIn 0.3s ease;
  ">
    <button id="modal-close" style="
      position:sticky; top:1rem; float:right; margin:1rem 1rem 0 0;
      background:#2a2a2a; border:none; color:#fff; width:32px; height:32px;
      border-radius:50%; cursor:pointer; font-size:16px; line-height:1;
      display:flex; align-items:center; justify-content:center; z-index:1;
    ">✕</button>
    <div id="modal-body" style="padding:2rem;"></div>
  </div>
</div>
<style>
  @keyframes modalIn {
    from { opacity:0; transform:translateY(20px) scale(0.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  #course-modal::-webkit-scrollbar { width:4px; }
  #course-modal::-webkit-scrollbar-track { background:transparent; }
  #course-modal::-webkit-scrollbar-thumb { background:#333; border-radius:4px; }
  .modal-topic-item {
    display:flex; align-items:flex-start; gap:10px;
    padding:8px 0; border-bottom:1px solid #222; font-size:13px; color:#ccc;
  }
  .modal-topic-item:last-child { border-bottom:none; }
  .modal-check { color:#e63946; font-size:14px; margin-top:1px; flex-shrink:0; }
</style>
`,
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
        <a href="#contact" onclick="closeModal()" style="
          background:#e63946;color:#fff;text-decoration:none;
          padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;
        " onmouseover="this.style.background='#c1121f'" onmouseout="this.style.background='#e63946'">
          Ro'yxatdan o'tish →
        </a>
      </div>
    `;

		const overlay = document.getElementById('course-modal-overlay');
		overlay.style.display = 'flex';
		document.body.style.overflow = 'hidden';
	});
});

function closeModal() {
	document.getElementById('course-modal-overlay').style.display = 'none';
	document.body.style.overflow = '';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('course-modal-overlay').addEventListener('click', function (e) {
	if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModal();
});

// Telefon nusxalash
function copyNumber(number) {
	navigator.clipboard.writeText(number).then(() => {
		showToast('Nusxa olindi: ' + number);
	});
}

// Jadval tabs
function switchTab(btn, id) {
	document.querySelectorAll('.sch-tab').forEach(t => t.classList.remove('active'));
	document.querySelectorAll('.sch-panel').forEach(p => p.classList.remove('active'));
	btn.classList.add('active');
	document.getElementById('tab-' + id).classList.add('active');
}
