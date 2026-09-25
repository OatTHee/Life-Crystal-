// =========================================================
//  deck_format.js — ฟอร์แมตรายเด็ค + ตรวจเด็คว่าลงแข่งได้ไหม
//
//  - ฟอร์แมตของเด็ค = ค่าเดียวกับตัวเลือก "ฟอร์แมต" (currentBanlistFormat ใน banlist_data.js)
//    เซฟ/โหลด/แชร์เด็ค จะพกฟอร์แมตไปด้วย โหลดเด็คไหนเว็บจะสลับฟอร์แมตให้เอง
//  - กฎจำนวนการ์ดของแต่ละฟอร์แมต แก้ได้ที่ DECK_FORMAT_RULES ด้านล่าง
//  - ตัวตรวจ (validateDeck) ใช้กฎจาก banlist_data.js ทั้งหมด: แบน / ลิมิต / การ์ดขัดแย้ง / เงื่อนไข
// =========================================================

// --- กฎจำนวนการ์ดรายฟอร์แมต (key ต้องตรงกับ banlistData) ---
//   mainMin      : Main Deck ต่ำสุดกี่ใบ
//   mainMax      : Main Deck ไม่เกินกี่ใบ
//   mainExact    : Main Deck ต้องมีพอดีกี่ใบ (ถ้าใส่ จะใช้แทน mainMax)
//   extraMax     : Extra Deck ไม่เกินกี่ใบ
//   requireMaster: ต้องมี Master 1 ใบ (Boost Master ไม่นับแทน — เป็นคนละช่อง)
//   checkSize    : false = ไม่ตรวจจำนวนการ์ด / Master (ใช้กับ "ไม่จำกัด")
//   copyRule     : กฎจำนวนใบซ้ำพิเศษของการ์ดใน Main Deck (ดู getFormatCopyLimit ด้านล่าง)
//      highDp      : การ์ดที่ DP ≥ ค่านี้ ใส่ได้ใบเดียว
//      byType      : จำนวนใบซ้ำสูงสุดตามประเภท (การ์ดที่ DP ต่ำกว่า highDp)
const DECK_FORMAT_RULES = {
    "Standard": { mainMin: 40, mainMax: 60, extraMax: 15, requireMaster: true,  checkSize: true },
    "No_Meta":  { mainMin: 40, mainMax: 60, extraMax: 15, requireMaster: true,  checkSize: true },
    "Classic":  { mainExact: 30, extraMax: 5, requireMaster: false, checkSize: true,
                  copyRule: { highDp: 4, byType: { Creature: 3, Action: 2, Armor: 2, Field: 2, Action_Field: 2 } } },
    "None":     { mainMax: 60, extraMax: 15, requireMaster: false, checkSize: false }
};

function getDeckFormatKey() {
    return (typeof currentBanlistFormat !== 'undefined' && currentBanlistFormat) ? currentBanlistFormat : 'None';
}

function getDeckFormatName(key) {
    key = key || getDeckFormatKey();
    return (typeof banlistData !== 'undefined' && banlistData[key] && banlistData[key].name) || key;
}

function getDeckFormatRules(key) {
    key = key || getDeckFormatKey();
    return DECK_FORMAT_RULES[key] || DECK_FORMAT_RULES["None"];
}

// ตัวเลขที่ใช้โชว์หลัง "/" ของตัวนับ Main
function getMainDeckLimit(key) {
    const r = getDeckFormatRules(key);
    return r.mainExact || r.mainMax;
}

// ป้ายจำนวน Main ที่ใช้ได้ เช่น "30 พอดี" / "40–60" / "60"
function getMainDeckLimitLabel(key) {
    const r = getDeckFormatRules(key);
    if (r.mainExact) return `${r.mainExact} พอดี`;
    if (r.mainMin && r.checkSize) return `${r.mainMin}–${r.mainMax}`;
    return String(r.mainMax);
}

// --- แยกการ์ดเป็น Starter / Main / Extra (ใช้กฎเดียวกับหน้า Showcase) ---
function dfHasType(card, ...types) {
    const t = Array.isArray(card.type) ? card.type : [card.type];
    return types.some(x => t.includes(x));
}

function getDeckSections(deck) {
    deck = deck || (typeof myDeck !== 'undefined' ? myDeck : []);
    if (typeof classifyShowcaseDeck === 'function') return classifyShowcaseDeck(deck);
    const commanderList = deck.filter(c => c.isCommander);
    const starterList = deck.filter(c => c.isCommander === true || dfHasType(c, "Master", "LC", "Boost_Master"));
    const extraList = deck.filter(c => !c.isCommander && dfHasType(c, "Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion"));
    const mainList = deck.filter(c => !starterList.includes(c) && !extraList.includes(c));
    return { commanderList, starterList, mainList, extraList };
}

// จำนวนแบบเดียวกับหน้า Showcase: MAIN = Main + Commander
function getDeckCounts(deck) {
    const s = getDeckSections(deck);
    return {
        starter: s.starterList.length,
        main: s.mainList.length + s.commanderList.length,
        extra: s.extraList.length,
        sections: s
    };
}

// --- กฎจำนวนใบซ้ำพิเศษของฟอร์แมต (เช่น คลาสสิค) ---
// คืน { limit, reason } หรือ null ถ้าฟอร์แมตนี้ไม่มีกฎ / การ์ดใบนี้ไม่เข้าข่าย
// ใช้เฉพาะการ์ดใน Main Deck: Creature / Action / Armor / Field (ไม่รวม Master, LC, Extra Deck)
function getFormatCopyLimit(card, formatKey) {
    const rule = getDeckFormatRules(formatKey).copyRule;
    if (!rule || !card) return null;
    const types = Array.isArray(card.type) ? card.type : [card.type];
    const type = Object.keys(rule.byType).find(t => types.includes(t));
    if (!type || card.isCommander) return null;
    const name = getDeckFormatName(formatKey);
    const dp = Number(card.dp);
    if (!isNaN(dp) && String(card.dp).trim() !== '' && dp >= rule.highDp) {
        return { limit: 1, reason: `ฟอร์แมต${name}: การ์ด DP ${rule.highDp} ขึ้นไปใส่ได้ใบเดียว` };
    }
    const lim = rule.byType[type];
    const label = type === 'Creature' ? 'Creature' : 'Action / Armor / Field';
    return { limit: lim, reason: `ฟอร์แมต${name}: ${label} ใส่ซ้ำได้สูงสุด ${lim} ใบ` };
}

// --- จำนวนใบสูงสุดของการ์ด 1 ใบ ตามฟอร์แมตและเด็คที่ส่งมา ---
function deckCardMaxLimit(card, deck, formatKey) {
    const format = (typeof banlistData !== 'undefined' && (banlistData[formatKey] || banlistData["None"])) || {};
    const id = String(card.id);
    const types = Array.isArray(card.type) ? card.type : (card.type ? [card.type] : []);
    const has = ids => deck.some(c => ids.includes(String(c.id)));
    let limit = 3, reason = '', banned = false;

    let overridden = false;
    (format.conditional_limits || []).forEach(rule => {
        if (!overridden && rule.overridesBan && rule.target.includes(id) && has(rule.trigger)) {
            limit = rule.limit; reason = rule.message || ''; overridden = true;
        }
    });

    if (!overridden) {
        if ((format.banned || []).includes(id) || types.some(t => (format.bannedTypes || []).includes(t))) {
            const setReason = (format._setBannedIds && format._setBannedIds.has(id) && format.allowedSets)
                ? `ฟอร์แมตนี้ใช้ได้เฉพาะชุด ${format.allowedSets.join(' / ')}` : '';
            return { limit: 0, banned: true, reason: setReason };
        }
        if ((format.limited || []).includes(id)) limit = 1;
        else if ((format.limit_if_no_commander || []).includes(id) && !deck.some(c => c.isCommander)) limit = 1;

        (format.conditional_limits || []).forEach(rule => {
            if (!rule.overridesBan && rule.target.includes(id) && has(rule.trigger)) {
                limit = rule.limit; reason = rule.message || ''; banned = rule.limit === 0;
            }
        });
    }

    if (types.some(t => ["Master", "Boost_Master", "LC", "Legend"].includes(t))) limit = Math.min(limit, 1);
    const fc = getFormatCopyLimit(card, formatKey);
    if (fc && fc.limit < limit) { limit = fc.limit; reason = fc.reason; }
    return { limit, banned, reason };
}

// --- ตัวตรวจเด็ค ---
// คืน { ok, formatKey, formatName, rules, counts, issues: [{ text, detail }] }
function validateDeck(deck, formatKey) {
    deck = deck || (typeof myDeck !== 'undefined' ? myDeck : []);
    formatKey = formatKey || getDeckFormatKey();
    const rules = getDeckFormatRules(formatKey);
    const format = (typeof banlistData !== 'undefined' && banlistData[formatKey]) || {};
    const counts = getDeckCounts(deck);
    const issues = [];
    const add = (text, detail) => issues.push({ text, detail: detail || '' });
    const nameOf = c => c.nameTH || c.nameEN || c.id;

    if (deck.length === 0) {
        add('เด็คยังว่างอยู่');
        return { ok: false, formatKey, formatName: getDeckFormatName(formatKey), rules, counts, issues };
    }

    // 1) จำนวนการ์ด
    if (rules.checkSize) {
        if (rules.mainExact) {
            if (counts.main !== rules.mainExact)
                add(`Main Deck ต้องมี ${rules.mainExact} ใบพอดี (ตอนนี้ ${counts.main} ใบ)`);
        } else if (counts.main > rules.mainMax) {
            add(`Main Deck เกิน ${rules.mainMax} ใบ (ตอนนี้ ${counts.main} ใบ)`);
        } else if (rules.mainMin && counts.main < rules.mainMin) {
            add(`Main Deck ต้องมีอย่างน้อย ${rules.mainMin} ใบ (ตอนนี้ ${counts.main} ใบ)`);
        } else if (counts.main === 0) {
            add('ยังไม่มีการ์ดใน Main Deck');
        }
        if (counts.extra > rules.extraMax)
            add(`Extra Deck เกิน ${rules.extraMax} ใบ (ตอนนี้ ${counts.extra} ใบ)`);
    }

    // 2) Master / Boost Master — เป็นคนละช่อง มีได้อย่างละ 1 ใบ
    const masters = deck.filter(c => dfHasType(c, "Master"));
    const boostMasters = deck.filter(c => dfHasType(c, "Boost_Master"));
    if (rules.checkSize && rules.requireMaster && masters.length === 0)
        add('ต้องมี Master 1 ใบ');
    if (masters.length > 1)
        add(`มี Master ได้ใบเดียว (ตอนนี้ ${masters.length} ใบ)`, masters.map(nameOf).join(', '));
    if (boostMasters.length > 1)
        add(`มี Boost Master ได้ใบเดียว (ตอนนี้ ${boostMasters.length} ใบ)`, boostMasters.map(nameOf).join(', '));

    // 3) LC / Legend มีได้ 1 แบบ
    const lcIds = [...new Set(deck.filter(c => dfHasType(c, "LC")).map(c => String(c.id)))];
    if (lcIds.length > 1) add('ใส่ Life Crystal ได้ใบเดียว');
    const legendIds = [...new Set(deck.filter(c => dfHasType(c, "Legend")).map(c => String(c.id)))];
    if (legendIds.length > 1) add('ใส่ Legend ได้ใบเดียว');

    // 4) Commander กับ LC ใช้ร่วมกันไม่ได้
    const commander = deck.find(c => c.isCommander);
    const lc = deck.find(c => dfHasType(c, "LC"));
    if (commander && lc) add('คอมมานเดอร์กับไลฟ์คริสตัลใช้ร่วมกันไม่ได้', `${nameOf(commander)} + ${nameOf(lc)}`);

    // 5) จำนวนต่อใบ / แบน / ลิมิต
    const byId = {};
    deck.forEach(c => {
        const id = String(c.id);
        if (!byId[id]) byId[id] = { card: c, n: 0 };
        byId[id].n++;
    });
    Object.values(byId).forEach(({ card, n }) => {
        const st = deckCardMaxLimit(card, deck, formatKey);
        if (st.limit === 0) add(`${nameOf(card)} ห้ามใช้ในฟอร์แมตนี้`, st.reason);
        else if (n > st.limit) add(`${nameOf(card)} ใส่ได้ไม่เกิน ${st.limit} ใบ (ตอนนี้ ${n} ใบ)`, st.reason);
    });

    // 6) การ์ดขัดแย้ง (ห้ามใส่ร่วมกัน)
    (format.conflict_groups || []).forEach(g => {
        const groups = Object.keys(g).filter(k => k.startsWith('group'))
            .filter(k => deck.some(c => g[k].includes(String(c.id))));
        if (groups.length > 1) add(`ใส่การ์ดที่ห้ามใช้ร่วมกัน: ${g.name || ''}`.trim(), g.message || '');
    });

    // 7) เผ่า (Commander / LC บังคับเผ่า Creature)
    const restrictions = [];
    [[commander, 'คอมมานเดอร์'], [lc, 'ไลฟ์คริสตัล']].forEach(([src, label]) => {
        if (!src) return;
        const clans = (typeof getClanArray === 'function') ? getClanArray(src.clan) : [].concat(src.clan || []);
        if (clans.length) restrictions.push({ label, clans });
    });
    if (restrictions.length && typeof isClanRestrictedCard === 'function') {
        const wrong = [];
        Object.values(byId).forEach(({ card }) => {
            if (!isClanRestrictedCard(card)) return;
            const cc = (typeof getClanArray === 'function') ? getClanArray(card.clan) : [].concat(card.clan || []);
            if (!cc.length) return;
            if (restrictions.some(r => !cc.some(c => r.clans.includes(c)))) wrong.push(nameOf(card));
        });
        if (wrong.length) {
            add(`มี Creature เผ่าไม่ตรงกับ${restrictions.map(r => r.label).join('/')} ${wrong.length} ใบ`,
                `ใส่ได้เฉพาะเผ่า ${restrictions.map(r => r.clans.join(' / ')).join(' และ ')} : ${wrong.join(', ')}`);
        }
    }

    return { ok: issues.length === 0, formatKey, formatName: getDeckFormatName(formatKey), rules, counts, issues };
}

// ---------------------------------------------------------
//  UI
// ---------------------------------------------------------
function dfEsc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ป้ายสถานะสั้นๆ (ใช้ทั้งในแถบเด็คและหน้า Showcase)
function deckValidationHTML(result, opts) {
    opts = opts || {};
    const r = result || validateDeck();
    const open = !!opts.open;
    const noCheck = !r.rules.checkSize;
    let head;
    if (r.ok) head = `✅ ${noCheck ? 'ผ่านกฎพื้นฐาน' : 'พร้อมลงแข่ง'}`;
    else head = `❌ ยังลงแข่งไม่ได้ · ${r.issues.length} ข้อ`;

    return `
        <details class="deck-validation ${r.ok ? 'is-ok' : 'is-bad'}" ${open ? 'open' : ''}>
            <summary>
                <span class="dv-head">${head}</span>
                <span class="dv-format">${dfEsc(r.formatName)}</span>
            </summary>
            <div class="dv-body">
                ${noCheck ? `<p class="dv-note">ฟอร์แมต "ไม่จำกัด" ไม่ตรวจจำนวนการ์ด — เลือกฟอร์แมตเพื่อตรวจแบบเต็ม</p>` : ''}
                ${r.issues.length ? `<ul>${r.issues.map(i =>
                    `<li>${dfEsc(i.text)}${i.detail ? `<small>${dfEsc(i.detail)}</small>` : ''}</li>`).join('')}</ul>`
                    : `<p class="dv-note">ผ่านทุกข้อ: จำนวนการ์ด, Master, แบน/ลิมิต, การ์ดขัดแย้ง, เผ่า</p>`}
            </div>
        </details>`;
}

function renderDeckValidation() {
    const box = document.getElementById('deckValidation');
    if (!box) return;
    const wasOpen = !!box.querySelector('details[open]');
    box.innerHTML = deckValidationHTML(validateDeck(), { open: wasOpen });
}

// ตัวนับ Main / Extra ในแถบเด็ค
function updateDeckFormatCounters() {
    const counts = getDeckCounts();
    const rules = getDeckFormatRules();
    const mainEl = document.getElementById('mainDeckCounter');
    const extraEl = document.getElementById('extraDeckCounter');
    const mainLimit = getMainDeckLimit();
    const mainBad = rules.checkSize && (rules.mainExact ? counts.main > rules.mainExact : counts.main > rules.mainMax);
    if (mainEl) {
        mainEl.innerText = `(${counts.main}/${getMainDeckLimitLabel()})`;
        mainEl.title = rules.mainMin ? `Main Deck ${rules.mainMin}–${rules.mainMax} ใบ` : '';
        mainEl.classList.toggle('dv-over', !!mainBad);
    }
    if (extraEl) {
        extraEl.innerText = `(${counts.extra}/${rules.extraMax})`;
        extraEl.classList.toggle('dv-over', rules.checkSize && counts.extra > rules.extraMax);
    }
}

// เติมตัวเลือกฟอร์แมตในแถบเด็ค + sync ทั้งสองตัว
function syncFormatSelectors() {
    const key = getDeckFormatKey();
    const deckSel = document.getElementById('deckFormatSelect');
    if (deckSel && typeof banlistData !== 'undefined') {
        if (deckSel.options.length !== Object.keys(banlistData).length) {
            deckSel.innerHTML = Object.keys(banlistData)
                .map(k => `<option value="${dfEsc(k)}">${dfEsc(banlistData[k].name)}</option>`).join('');
        }
        deckSel.value = key;
    }
    const mainSel = document.getElementById('banlistFormatSelect');
    if (mainSel && mainSel.value !== key) mainSel.value = key;
}

// เรียกจาก changeBanlistFormat (banlist_data.js) ทุกครั้งที่ฟอร์แมตเปลี่ยน
function onDeckFormatChanged() {
    // เปลี่ยนฟอร์แมตระหว่างจัดเด็ค = เด็คถูกแก้ (ยกเว้นตอนสลับตามเด็คที่เพิ่งโหลด)
    if (!window._applyingDeckFormat && typeof isUnsaved !== 'undefined' && typeof myDeck !== 'undefined'
        && myDeck.length > 0 && (typeof isBuildMode !== 'function' || isBuildMode())) {
        isUnsaved = true;
    }
    syncFormatSelectors();
    updateDeckFormatCounters();
    renderDeckValidation();
}

// เปลี่ยนฟอร์แมตของเด็คที่กำลังจัด (จากตัวเลือกในแถบเด็ค)
function setDeckFormat(key) {
    if (!key || typeof changeBanlistFormat !== 'function') return;
    if (key === getDeckFormatKey()) return;
    changeBanlistFormat(key); // → onDeckFormatChanged() ตั้งสถานะยังไม่เซฟให้เอง
}

// สลับฟอร์แมตตามเด็คที่โหลดมา (ไม่มีข้อมูลฟอร์แมต = คงฟอร์แมตเดิมไว้)
function applyDeckFormat(key) {
    if (!key || typeof banlistData === 'undefined' || !banlistData[key]) return false;
    window._applyingDeckFormat = true;
    try {
        if (key !== getDeckFormatKey() && typeof changeBanlistFormat === 'function') changeBanlistFormat(key);
        else onDeckFormatChanged();
    } finally {
        window._applyingDeckFormat = false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    syncFormatSelectors();
    updateDeckFormatCounters();
    renderDeckValidation();
});
