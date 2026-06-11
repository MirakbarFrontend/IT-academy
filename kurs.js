// 1. Kurslar ro'yxati (Barcha ma'lumotlar, rasmlar va SVG-lar shu yerda markazlashgan)
const coursesData = [
	{
		id: 'dasturlash',
		num: '01 / DASTURLASH',
		title: 'Dasturlash',
		desc: "HTML, CSS, JavaScript, Python. Real loyihalar bilan o'rganish va portfolio yaratish.",
		price: "600 000 so'm/oy",
		duration: '9 oy',
		category: 'tech',
		badge: 'IT & DEVELOPMENT',
		iconType: 'img',
		iconSrc: 'img/information-technology.png',
		syllabus: [
			'HTML5, CSS3, Flexbox & Grid',
			'Mukammal JavaScript va ES6+',
			'React.js Framework & Single Page Apps',
			'Git/GitHub va Vercel-ga loyihalarni yuklash',
		],
	},
	{
		id: 'english',
		num: '02 / INGLIZ TILI',
		title: 'Ingliz tili',
		desc: 'A1 dan C1 gacha barcha darajalar. IELTS imtihoniga maxsus tayyorgarlik.',
		price: "390 000 so'm/oy",
		duration: '3 oy',
		category: 'languages',
		badge: 'GLOBAL LANGUAGES',
		iconType: 'img',
		iconSrc: 'img/english.png',
		syllabus: [
			'Speaking va Pronunciation intensiv mashqlari',
			'Grammar & Vocabulary tizimli darslari',
			'Mock IELTS imtihonlari (har oyda)',
			'IELTS imtihon strategiyalari',
		],
	},
	{
		id: 'math',
		num: '03 / MATEMATIKA',
		title: 'Matematika',
		desc: 'Maktab va abituriyentlar uchun. DTM imtihoniga chuqur tayyorgarlik.',
		price: "390 000 so'm/oy",
		duration: '4 oy',
		category: 'academic',
		badge: 'EXAM PREPARATION',
		iconType: 'img',
		iconSrc: 'img/math.png',
		syllabus: [
			'Algebraning barcha murakkab mavzulari',
			'Geometriya va stereometriya',
			'DTM testlari bilan ishlash strategiyasi',
			'Mantiqiy masalalar yechish',
		],
	},
	{
		id: 'korean',
		num: '04 / KOREYS TILI',
		title: 'Koreys tili',
		desc: 'Hangeul alifbosidan boshlab grammatika va suhbat. TOPIK imtihoniga tayyorgarlik.',
		price: "390 000 so'm/oy",
		duration: '6 oy',
		category: 'languages',
		badge: 'GLOBAL LANGUAGES',
		iconType: 'img',
		iconSrc: 'img/korea-flag.png',
		syllabus: [
			"Koreyscha suhbat va to'g'ri talaffuz",
			'TOPIK I va TOPIK II formatidagi testlar',
			'Koreya universitetlari grant dasturlari hujjati',
		],
	},
	{
		id: 'german',
		num: '05 / NEMIS TILI',
		title: 'Nemis tili',
		desc: 'A1 dan B2 gacha. Grammatika, suhbat va Goethe imtihoniga tayyorgarlik.',
		price: "400 000 so'm/oy",
		duration: '6 oy',
		category: 'languages',
		badge: 'GLOBAL LANGUAGES',
		iconType: 'svg',
		iconSvg: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect width="30" height="10" fill="#fff" /><rect y="10" width="30" height="10" fill="#fff" opacity="0.5" /><rect y="20" width="30" height="10" fill="#fff" opacity="0.25" /><text x="15" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" font-family="monospace">DE</text></svg>`,
		syllabus: [
			'A1-B2 darajadagi nemis tili grammatikasi',
			'Goethe va Telc imtihonlari andozalari',
			"Ausbildung uchun hujjat tayyorlash bo'yicha maslahatlar",
		],
	},
	{
		id: 'comp-literacy',
		num: '06 / KOMPYUTER SAVODXONLIGI',
		title: 'Kompyuter savodxonligi',
		desc: "Windows, Office (Word, Excel, PowerPoint), internet va asosiy kompyuter ko'nikmalari.",
		price: "500 000 so'm/oy",
		duration: '3 oy',
		category: 'tech',
		badge: 'BASE DIGITAL SKILLS',
		iconType: 'svg',
		iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>`,
		syllabus: [
			'Windows tizimi va boshqaruv paneli',
			'MS Word va mukammal Excel formulalari',
			'PowerPoint-da professional taqdimotlar yaratish',
			'Internet xavfsizligi va bulutli xizmatlar',
		],
	},
	{
		id: 'design',
		num: '07 / GRAFIK DIZAYN',
		title: 'Grafik dizayn',
		desc: 'Figma, Photoshop, Illustrator. Logo, banner va UI dizayn. Portfolio yaratish.',
		price: "600 000 so'm/oy",
		duration: '6 oy',
		category: 'tech',
		badge: 'CREATIVE & DESIGN',
		iconType: 'svg',
		iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20C7 22 2 17 2 12" /><path d="M12 8v8M8 12h8" /></svg>`,
		syllabus: [
			'Figma yordamida UI/UX veb va mobil dizayn',
			'Photoshop dasturida kollaj va vizual effektlar',
			'Illustrator dasturida logotip va vektor chizish',
			'Shaxsiy brending va SMM postlar tayyorlash',
		],
	},
	{
		id: 'pmt',
		num: '08 / PMT TAYYORLOV',
		title: 'Prezident maktabiga tayyorlov',
		desc: 'Matematika, ingliz tili va mantiq. Prezident maktabi imtihoniga chuqur tayyorgarlik.',
		price: "650 000 so'm/oy",
		duration: '6 oy',
		category: 'academic',
		badge: 'EXAM PREPARATION',
		iconType: 'svg',
		iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>`,
		syllabus: [
			'Kembrij formatidagi mantiq va matematika',
			'Critical thinking (tanqidiy fikrlash) darslari',
			'Nostandart masalalarni yechish metodikasi',
		],
	},
	{
		id: 'ai',
		num: '09 / AI DARSLARI',
		title: 'AI darslari',
		desc: "ChatGPT, Midjourney, Copilot va boshqa AI vositalarini ishda va hayotda qo'llash.",
		price: "600 000 so'm/oy",
		duration: '3 oy',
		category: 'tech',
		badge: 'FUTURE TECH',
		iconType: 'svg',
		iconSvg: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="9" cy="9" r="1.5" fill="white" /><circle cx="15" cy="9" r="1.5" fill="white" /><path d="M9 15s1 2 3 2 3-2 3-2" /></svg>`,
		syllabus: [
			'ChatGPT va Claude dasturlarida professional Prompt muhandisligi',
			'Midjourney orqali yuqori sifatli rasmlar generatsiyasi',
			'AI yordamida kontent-meyking va avtomatlashtirish',
		],
	},
];

// Global holat elementlari (Filtr va Qidiruv uchun)
let currentFilter = 'all';
let currentSearchQuery = '';

// 2. DOM yuklanganda ishga tushadigan asosiy logika
document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('courses-container');
	const searchInput = document.getElementById('course-search');
	const filterButtons = document.querySelectorAll('.filter-btn');
	const modal = document.getElementById('course-modal');
	const closeModalBtn = document.getElementById('close-modal');

	// Kurslarni boshlang'ich render qilish
	renderCourses();

	// Qidiruv tizimi hodisasi (Input yozilganda)
	if (searchInput) {
		searchInput.addEventListener('input', e => {
			currentSearchQuery = e.target.value.toLowerCase().trim();
			renderCourses();
		});
	}

	// Filtr tugmalari tizimi
	filterButtons.forEach(btn => {
		btn.addEventListener('click', () => {
			// Aktiv klassni boshqarish
			filterButtons.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			// Filtr parametrini yangilash
			currentFilter = btn.getAttribute('data-filter');
			renderCourses();
		});
	});

	// Modal oynani yopish hodisalari
	if (closeModalBtn) {
		closeModalBtn.addEventListener('click', closeCourseModal);
	}
	if (modal) {
		modal.addEventListener('click', e => {
			if (e.target === modal) closeCourseModal();
		});
	}
});

// 3. Kurslarni filtr va qidiruvga qarab dinamik generatsiya qilish funksiyasi
function renderCourses() {
	const container = document.getElementById('courses-container');
	if (!container) return;

	container.innerHTML = ''; // Eski kartochkalarni tozalash

	// Ma'lumotlarni saralash (Filtr & Qidiruv)
	const filteredData = coursesData.filter(course => {
		const matchesFilter = currentFilter === 'all' || course.category === currentFilter;
		const matchesSearch =
			course.title.toLowerCase().includes(currentSearchQuery) || course.desc.toLowerCase().includes(currentSearchQuery);
		return matchesFilter && matchesSearch;
	});

	// Agar qidiruvga mos kurs topilmasa
	if (filteredData.length === 0) {
		container.innerHTML = `<p class="no-results" style="grid-column: 1/-1; text-align: center; color: #808090; padding: 3rem; font-family: 'Space Grotesk', sans-serif;">Qidiruvga mos keladigan kurs topilmadi.</p>`;
		return;
	}

	// HTML kartochkalarni generatsiya qilib, container-ga joylash
	filteredData.forEach(course => {
		const card = document.createElement('div');
		card.className = 'ccard';

		// Ikonka qismini aniqlash (Rasm yoki SVG)
		let iconHtml = '';
		if (course.iconType === 'img') {
			iconHtml = `<img style="width: 30px; height: 30px; object-fit: contain;" src="${course.iconSrc}" alt="${course.title}" />`;
		} else {
			iconHtml = course.iconSvg;
		}

		// Kartochka ichki strukturasi (Siz xohlagan 'Batafsil' va 'A'zo bo'lish' tugmalari bilan)
		card.innerHTML = `
      <div class="ccard-num">${course.num}</div>
      <span class="ccard-emoji">${iconHtml}</span>
      <h3>${course.title}</h3>
      <p>${course.desc}</p>
      <div class="ccard-foot">
        <div class="ccard-price">${course.price}</div>
        <div class="ccard-dur">${course.duration}</div>
      </div>
      <div class="ccard-actions" style="display: flex; gap: 10px; margin-top: 1.5rem;">
        <button class="btn-card-more" onclick="openCourseModal('${course.id}')" style="flex: 1; padding: 12px; font-weight: 600; border-radius: 8px; cursor: pointer;">Batafsil</button>
        <button class="btn-red" onclick="location.href = 'index.html#contact'" style="flex: 1; padding: 12px; font-weight: 600; border-radius: 8px; cursor: pointer;">A'zo bo'lish</button>
      </div>
    `;
		container.appendChild(card);
	});
}

// 4. "Batafsil" bosilganda modal oynani ochish funksiyasi
function openCourseModal(courseId) {
	const course = coursesData.find(c => c.id === courseId);
	const modal = document.getElementById('course-modal');
	if (!course || !modal) return;

	// HTML dagi modal elementlarini topib ma'lumotlarni yuklash
	document.getElementById('modal-course-cat').innerText = course.badge;
	document.getElementById('modal-course-title').innerText = course.title;
	document.getElementById('modal-course-desc').innerText = course.desc;
	document.getElementById('modal-course-dur').innerText = course.duration;
	document.getElementById('modal-course-price').innerText = course.price;

	// Syllabus (O'quv rejasini) tozalab qayta yozish
	const syllabusList = document.getElementById('modal-course-syllabus');
	syllabusList.innerHTML = '';
	course.syllabus.forEach(item => {
		const li = document.createElement('li');
		li.style.cssText = 'display: flex; align-items: center; gap: 10px; margin-bottom: 8px;';
		li.innerHTML = `<span style="color: #e02020; font-weight: bold;">✓</span> ${item}`;
		syllabusList.appendChild(li);
	});

	// Modalni ochish (CSS klassi orqali effekt beriladi)
	modal.classList.add('open');

	// Agar CSS klass hali yozilmagan bo'lsa, xavfsizlik uchun inline stillar bilan ham ochamiz:
	modal.style.opacity = '1';
	modal.style.pointerEvents = 'auto';
	modal.querySelector('.modal-content').style.transform = 'scale(1)';
}

// 5. Modal oynani yopish funksiyasi
function closeCourseModal() {
	const modal = document.getElementById('course-modal');
	if (!modal) return;

	modal.classList.remove('open');
	modal.style.opacity = '0';
	modal.style.pointerEvents = 'none';
	modal.querySelector('.modal-content').style.transform = 'scale(0.92)';
}

//
//
document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('hologram-nexus');
	const svgLayer = document.getElementById('orbital-svg');

	const coreDisplay = document.getElementById('core-display');
	const coreDesc = document.getElementById('core-desc');

	const nodes = document.querySelectorAll('.orbit-node');

	let angleOffset = 0;

	const radiusX = 380;
	const radiusY = 250;

	const nodeState = Array.from(nodes).map((node, index) => ({
		element: node,
		baseAngle: index * (360 / nodes.length) * (Math.PI / 180),
		x: 0,
		y: 0,
	}));

	function animateOrbit() {
		angleOffset += 0.0025;

		const centerX = container.clientWidth / 2;

		const centerY = container.clientHeight / 2;

		svgLayer.innerHTML = '';

		nodeState.forEach(state => {
			const angle = state.baseAngle + angleOffset;

			const x = centerX + Math.cos(angle) * radiusX - state.element.offsetWidth / 2;

			const y = centerY + Math.sin(angle) * radiusY - state.element.offsetHeight / 2;

			state.x = x;
			state.y = y;

			const scale = 0.82 + (Math.sin(angle) + 1) * 0.18;

			state.element.style.left = x + 'px';

			state.element.style.top = y + 'px';

			state.element.style.transform = `scale(${scale})`;

			state.element.style.zIndex = Math.floor(scale * 100);

			const targetX = x + state.element.offsetWidth / 2;

			const targetY = y + state.element.offsetHeight / 2;

			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			path.setAttribute(
				'd',
				`M ${centerX} ${centerY}
				Q ${(centerX + targetX) / 2}
				${(centerY + targetY) / 2}
				${targetX}
				${targetY}`,
			);

			path.setAttribute('class', 'orbital-vector');

			if (state.element.classList.contains('active')) {
				path.style.stroke = 'rgba(224,32,32,.9)';
				path.style.strokeWidth = '3';
			}

			svgLayer.appendChild(path);
		});

		requestAnimationFrame(animateOrbit);
	}

	function decryptEffect(targetText, targetDesc) {
		const chars = '01X%&#$@§?Z♣♠♦★█▓▒░';

		let iteration = 0;

		clearInterval(coreDisplay.decryptInterval);

		coreDisplay.decryptInterval = setInterval(() => {
			coreDisplay.innerText = targetText
				.split('')
				.map((char, index) => {
					if (index < iteration) return targetText[index];

					return chars[Math.floor(Math.random() * chars.length)];
				})
				.join('');

			if (iteration >= targetText.length) {
				clearInterval(coreDisplay.decryptInterval);

				coreDisplay.innerText = targetText;

				coreDesc.innerText = targetDesc;
			}

			iteration += 1;
		}, 40);
	}

	nodes.forEach(node => {
		node.addEventListener('mouseenter', function () {
			nodes.forEach(n => n.classList.remove('active'));

			this.classList.add('active');

			decryptEffect(this.dataset.tech, this.dataset.desc);
		});
	});

	requestAnimationFrame(animateOrbit);
});
