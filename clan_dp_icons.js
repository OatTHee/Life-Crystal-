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

// --- 6. อนุกรมวิธาน (Taxonomy) ---
// ข้อมูลกลางชุดเดียว ใช้ทั้งป้ายใน Modal และตัวกรองขั้นสูง
// rank: วงศ์ / วงศ์ย่อย / อันดับ — parent = กลุ่มที่ใหญ่กว่า (ใช้แสดงเป็นข้อมูลเสริม)
const TAXONOMY_INFO = {
    "Tyrannosauridae":   { clan: "สองขา",          th: "ไทรันโนซอริด",     rank: "วงศ์" },
    "Abelisauridae":     { clan: "สองขา",          th: "อเบลิซอริด",       rank: "วงศ์" },
    "Spinosauridae":     { clan: "สองขา",          th: "สไปโนซอริด",       rank: "วงศ์" },
    "Megalosauridae":    { clan: "สองขา",          th: "เมกะโลซอริด",      rank: "วงศ์" },
    "Therizinosauridae": { clan: "สองขา",          th: "เธอริซิโนซอริด",   rank: "วงศ์" },
    "Hadrosauridae":     { clan: "สองขา",          th: "แฮโดรซอริด",       rank: "วงศ์" },
    "Nodosauridae":      { clan: "มีเกราะหางหนาม", th: "โนโดซอริด",        rank: "วงศ์" },
    "Ankylosauridae":    { clan: "มีเกราะหางหนาม", th: "แองคิโลซอริด",     rank: "วงศ์" },
    "Stegosauridae":     { clan: "มีเกราะหางหนาม", th: "สเตโกซอริด",       rank: "วงศ์" },
    "Chasmosaurinae":    { clan: "มีเขา",          th: "แคสโมซอรีน",       rank: "วงศ์ย่อย", parent: "Ceratopsidae" },
    "Centrosaurinae":    { clan: "มีเขา",          th: "เซนโทรซอรีน",      rank: "วงศ์ย่อย", parent: "Ceratopsidae" },
    "Titanosauridae":    { clan: "คอยาว",          th: "ไททันโนซอริด",     rank: "วงศ์" },
    "Diplodocidae":      { clan: "คอยาว",          th: "ดิพโลโดซิด",       rank: "วงศ์" },
    "Elasmosauridae":    { clan: "สัตว์น้ำ",        th: "อีแลสโมซอริด",     rank: "วงศ์" },
    "Leptocleididae":    { clan: "สัตว์น้ำ",        th: "เล็ปโตไคลดิด",     rank: "วงศ์" },
    "Pliosauridae":      { clan: "สัตว์น้ำ",        th: "ไพลโอซอริด",       rank: "วงศ์" },
    "Ichthyosauria":     { clan: "สัตว์น้ำ",        th: "อิกทิโอซอร์",      rank: "อันดับ" },
    "Pteranodontidae":   { clan: "มีปีก",          th: "เทอราโนดอนทิด",    rank: "วงศ์" },
    "Rhamphorhynchidae": { clan: "มีปีก",          th: "แรมโฟรินคิด",      rank: "วงศ์" },
    "Anurognathidae":    { clan: "มีปีก",          th: "อนูโรกนาธิด",      rank: "วงศ์" },
    "Ornithocheiridae":  { clan: "มีปีก",          th: "ออร์นิโธแคริด",    rank: "วงศ์" },
    "Azhdarchidae":      { clan: "มีปีก",          th: "อัซดาร์คิด",       rank: "วงศ์" }
};

// ป้ายอนุกรมวิธานใน Modal (คืนค่าว่างถ้าการ์ดไม่มี taxonomy)
function renderTaxonomyBadge(taxonomy) {
    if (!taxonomy) return '';
    const info = TAXONOMY_INFO[taxonomy] || { rank: "วงศ์", th: "" };
    const icon = info.clan ? getClanIconFile(info.clan) : null;
    const sub = [info.th, info.parent ? `วงศ์ ${info.parent}` : ''].filter(Boolean).join(' · ');
    return `<span class="taxo-badge" title="${info.rank} ${taxonomy}">` +
           (icon ? `<img class="clan-icon" src="${icon}" alt="${info.clan}">` : '') +
           `<span class="taxo-rank">${info.rank}</span>` +
           `<span class="taxo-name">${taxonomy}</span>` +
           (sub ? `<span class="taxo-sub">(${sub})</span>` : '') +
           `</span>`;
}

// สร้างรายการเลือกอนุกรมวิธาน (เลือกได้หลายอัน) จัดกลุ่มตามเผ่า พร้อมไอคอนเผ่า + จำนวนการ์ด
function initTaxonomyFilter(cards) {
    const box = document.getElementById('advTaxonomy');
    if (!box || box.dataset.ready) return;
    const counts = {};
    (cards || []).forEach(c => { if (c.taxonomy) counts[c.taxonomy] = (counts[c.taxonomy] || 0) + 1; });

    const clanOrder = ["สองขา", "มีเกราะหางหนาม", "มีเขา", "คอยาว", "สัตว์น้ำ", "มีปีก"];
    const names = Object.keys(TAXONOMY_INFO);
    // taxonomy ที่มีในข้อมูลแต่ยังไม่ได้ลงตาราง ให้ไปอยู่กลุ่ม "อื่นๆ"
    Object.keys(counts).forEach(t => { if (!TAXONOMY_INFO[t]) names.push(t); });

    let html = '';
    [...clanOrder, null].forEach(clan => {
        const list = names.filter(t => ((TAXONOMY_INFO[t] || {}).clan || null) === clan);
        if (!list.length) return;
        const icon = clan ? getClanIconFile(clan) : null;
        html += `<div class="taxo-group">` +
                `<div class="taxo-group-title">${icon ? `<img class="clan-filter-icon" src="${icon}" alt="">` : ''}${clan ? 'เผ่า' + clan : 'อื่นๆ'}</div>` +
                `<div class="taxo-chips">` +
                list.map(t => `<label class="taxo-chip"><input type="checkbox" value="${t}">` +
                    (icon ? `<img class="clan-filter-icon" src="${icon}" alt="">` : '') +
                    `<span>${t}</span><small>${counts[t] || 0}</small></label>`).join('') +
                `</div></div>`;
    });
    box.innerHTML = html;
    box.dataset.ready = '1';
}

function getSelectedTaxonomies() {
    return Array.from(document.querySelectorAll('#advTaxonomy input:checked')).map(cb => cb.value);
}

function setSelectedTaxonomies(values) {
    const set = new Set(values || []);
    document.querySelectorAll('#advTaxonomy input[type="checkbox"]').forEach(cb => cb.checked = set.has(cb.value));
}

// --- 7. ค่าพลังเมื่อรวมฝูง (Herd Power) ---
// ข้อมูลอยู่ใน card_stats.js -> herd: [{ x: 2, at: 1800 }, { x: 3, at: 2500, df: 2000 }]
// จำลองหน้าตาแถบ "[โลโก้เผ่า] X 2 ➜ ATTACK 2100" ที่พิมพ์อยู่บนหน้าการ์ด
function renderHerdPower(card) {
    const rows = card && Array.isArray(card.herd) ? card.herd : [];
    if (!rows.length) return '';

    const clanName = splitClanList(card.clan)[0];
    const icon = clanName ? getClanIconFile(clanName) : null;
    const iconHTML = icon
        ? `<img class="herd-clan" src="${icon}" alt="${clanName}" title="เผ่า${clanName}">`
        : '';
    const arrow = `<svg class="herd-arrow" viewBox="0 0 40 24" aria-hidden="true">` +
                  `<path d="M2 7h19V1l17 11-17 11v-6H2z"/></svg>`;
    const fmt = n => Number(n).toLocaleString('en-US').replace(/,/g, '');

    const rowHTML = rows.map(r => {
        const stats = [];
        if (r.at != null) stats.push(`<span class="herd-lbl at">ATTACK</span><span class="herd-val">${fmt(r.at)}</span>`);
        if (r.df != null) stats.push(`<span class="herd-lbl df">DEFENCE</span><span class="herd-val">${fmt(r.df)}</span>`);
        return `<div class="herd-pill${stats.length > 1 ? ' two' : ''}">` +
                   iconHTML +
                   `<span class="herd-x"><small>X</small>${r.x}</span>` +
                   arrow +
                   `<span class="herd-stats">${stats.join('')}</span>` +
               `</div>`;
    }).join('');

    return `<div class="herd-power">` +
               `<div class="herd-title">พลังเมื่อรวมฝูง</div>` +
               `<div class="herd-board">${rowHTML}</div>` +
               (card.herdByRule
                   ? `<div class="herd-note">หน้าการ์ดไม่ได้ระบุค่ารวมฝูง ใช้กฎฟอร์แมตหลัก: AT +600 ต่อตัว (สูงสุด x3) · DF ใช้ค่าเดิม</div>`
                   : '') +
           `</div>`;
}
