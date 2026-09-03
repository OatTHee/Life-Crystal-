// clan_dp_icons.js
// แปลง "เผ่า" ให้เป็นไอคอนรูปภาพ และ "ค่า DP" ให้เป็นคริสตัลวงกลมเขียว (สไตล์เดียวกับปุ่มกรอง DP)
// ใช้ทั้งในบรรทัดข้อมูลของ Modal และในเนื้อความ Skill/Ability ของการ์ดทุกใบ

// --- 1. ตารางไอคอนเผ่า (ไฟล์อยู่ใน images/clans/) ---
const CLAN_ICONS = {
    "สองขา":          "2legs",
    "สัตว์น้ำ":        "aqua",
    "มีเกราะหางหนาม": "armored",
    "มีเขา":          "horn",
    "คอยาว":          "longneck",
    "จักรกล":         "tech",
    "มีปีก":          "wings"
};

// คำที่สะกดต่างเล็กน้อย "ในเนื้อความสกิล" -> ชื่อเผ่ามาตรฐาน
// (ต้องเป็นคำที่เฉพาะเจาะจงพอ ไม่งั้นจะไปจับคำทั่วไปในประโยคผิดๆ)
const CLAN_ALIASES = {
    "เกราะหางหนาม": "มีเกราะหางหนาม"
};

// คำที่สะกดต่าง "เฉพาะในฟิลด์ clan ของการ์ด" -> ชื่อเผ่ามาตรฐาน
// ตรงนี้เทียบแบบทั้งคำ (ไม่ได้ค้นในประโยค) จึงใส่คำสั้นๆ ได้ปลอดภัย
const CLAN_FIELD_ALIASES = {
    "เขา": "มีเขา",
    "ปีก": "มีปีก",
    "หางหนาม": "มีเกราะหางหนาม",
    "เกราะหางหนาม": "มีเกราะหางหนาม",
    "น้ำ": "สัตว์น้ำ"
};

// เรียงจากชื่อยาวไปสั้น เพื่อให้จับ "มีเกราะหางหนาม" ก่อน "เกราะหางหนาม"
const CLAN_MATCH_LIST = [...Object.keys(CLAN_ICONS), ...Object.keys(CLAN_ALIASES)]
    .sort((a, b) => b.length - a.length);

function getClanIconFile(name) {
    const key = CLAN_ALIASES[name] || name;
    return CLAN_ICONS[key] ? `images/clans/${CLAN_ICONS[key]}.png` : null;
}

// --- 2. ชิพเผ่า (ไอคอน + ชื่อ) ---
// size: '' = ขนาดปกติ (ในเนื้อความ) / 'lg' = ขนาดใหญ่ (บรรทัดข้อมูลใน Modal)
function renderClanChip(name, size = '') {
    const file = getClanIconFile(name);
    if (!file) return name; // ไม่รู้จักเผ่านี้ ให้คืนข้อความเดิม
    const cls = size ? `clan-chip ${size}` : 'clan-chip';
    return `<span class="${cls}" title="เผ่า${name}">` +
           `<img class="clan-icon" src="${file}" alt="${name}" loading="lazy">` +
           `<span class="clan-name">${name}</span></span>`;
}

// ทำชื่อเผ่า 1 ตัวให้เป็นมาตรฐาน (ตัดคำนำหน้า "เผ่า" + เทียบ alias)
function normalizeClanToken(raw) {
    let t = String(raw == null ? '' : raw).trim();
    if (!t) return '';
    t = t.replace(/^เผ่า/, '').trim();          // "เผ่าคอยาว" -> "คอยาว"
    return CLAN_FIELD_ALIASES[t] || CLAN_ALIASES[t] || t;
}

// แตกฟิลด์ clan ให้เป็นรายชื่อเผ่า
// รองรับทั้ง Array และ string ที่คั่นด้วย , หรือ / เช่น "มีปีก, มีเกราะหางหนาม" (Armor AR1 / Life Crystal)
function splitClanList(clan) {
    if (!clan) return [];
    const arr = Array.isArray(clan) ? clan : [clan];
    const list = [];
    arr.forEach(v => {
        String(v == null ? '' : v).split(/[,/]/).forEach(part => {
            const name = normalizeClanToken(part);
            if (name && !list.includes(name)) list.push(name);   // กันชื่อซ้ำ
        });
    });
    return list;
}

// รับได้ทั้ง string เดี่ยว, string คั่นคอมม่า และ Array (การ์ดหลายเผ่า)
function renderClanIcons(clan, size = 'lg') {
    const list = splitClanList(clan);
    if (list.length === 0) return '-';
    return list.map(c => renderClanChip(c, size)).join(' ');
}

// --- 3. คริสตัล DP ---
// รองรับตัวเลข, "X" และ "ไร้DP" (แสดงเป็น Ø สีเทาเหมือนปุ่มกรอง)
function renderDpCrystal(value, size = '') {
    if (value === undefined || value === null || value === '') return '-';

    const raw = String(value).trim();
    const isNone = (raw === "ไร้DP" || raw === "ไร้ DP");
    const label = isNone ? "Ø" : raw;

    let cls = 'dp-crystal-inline';
    if (isNone) cls += ' special';
    if (size) cls += ` ${size}`;

    return `<span class="${cls}" title="DP ${isNone ? 'ไร้ DP' : raw}">${label}</span>`;
}

// --- 4. ตกแต่งเนื้อความ Skill/Ability ---
// จับทั้งชื่อเผ่า และตัวเลขที่ติดกับคำว่า DP ในรอบเดียว (one-pass)
// เพื่อไม่ให้ HTML ที่เพิ่งแทนที่ไปโดนสแกนซ้ำ
const ABILITY_DECORATE_RE = new RegExp(
    `(${CLAN_MATCH_LIST.join('|')})` +                                   // 1 : ชื่อเผ่า
    `|(\\d+)(\\s*DP)` +                                                  // 2,3 : "จ่าย 2 DP"
    `|(DP\\s*(?:ไม่เกิน|ตั้งแต่|เท่ากับ|มากกว่า|น้อยกว่า|ระดับ)?\\s*)` + // 4   : คำนำหน้าเลข
    `(\\d+(?:\\s*-\\s*\\d+)?)`,                                          // 5   : "DP 4" / "DP 4-5"
    'g'
);

function decorateAbilityHTML(html) {
    if (!html) return html;

    // แยกส่วนที่เป็น HTML tag ออกก่อน แล้วแตะเฉพาะ "ข้อความ" เท่านั้น
    // (กัน path รูป เช่น images/StepNextMG/DP Fern.jpg และ attribute อื่นๆ โดนแก้)
    return html.split(/(<[^>]*>)/g).map(part => {
        if (!part || part.charAt(0) === '<') return part;

        return part.replace(ABILITY_DECORATE_RE,
            (m, clan, numBefore, dpAfter, dpBefore, numAfter) => {
                if (clan) return renderClanChip(clan);
                if (numBefore) return renderDpCrystal(numBefore) + dpAfter;
                if (numAfter) {
                    // รองรับช่วงค่า เช่น "DP 4-5"
                    const nums = numAfter.split('-').map(n => n.trim());
                    return dpBefore + nums.map(n => renderDpCrystal(n)).join('-');
                }
                return m;
            }
        );
    }).join('');
}

// --- 5. เติมไอคอนเผ่าให้ตัวกรอง "เผ่า" (ใช้ตารางไอคอนชุดเดียวกับ Modal) ---
// ฉีดรูปเข้าไปใน <label> ของ checkbox แต่ละอันด้วย JS
// จะได้ไม่ต้องไปไล่แก้ index.html ทีละบรรทัด และแหล่งข้อมูลไอคอนมีที่เดียว
function initClanFilterIcons() {
    const labels = document.querySelectorAll('#clanFilter .multi-select-panel label');
    labels.forEach(label => {
        if (label.querySelector('.clan-filter-icon')) return; // ใส่ไปแล้ว ไม่ต้องซ้ำ

        const cb = label.querySelector('input[type="checkbox"]');
        if (!cb) return;

        const file = getClanIconFile(normalizeClanToken(cb.value));
        if (!file) return;

        const img = document.createElement('img');
        img.className = 'clan-filter-icon';
        img.src = file;
        img.alt = cb.value;
        img.loading = 'lazy';

        cb.insertAdjacentElement('afterend', img); // วางไว้ระหว่าง checkbox กับข้อความ
    });
}
