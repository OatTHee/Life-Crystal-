// =========================================================
//  SECTION: DECK SHOWCASE & STATISTICS
//  (รวบรวมฟังก์ชันสำหรับหน้าโชว์เคสและหน้าสถิติไว้ที่นี่)
// =========================================================

// ---------------------------------------------------------
//  โหมดมุมมอง Showcase: 'grid' = แบบเดิม (รวมใบซ้ำ x2 x3)
//                       'expanded' = เรียงทีละใบ ไม่รวมใบซ้ำ
//                       'list' = ป้ายชื่อ ชื่อไทย/อังกฤษ DP AT/DF จำนวน
// ---------------------------------------------------------
const SHOWCASE_VIEW_KEY = 'lc_showcase_view';
const SHOWCASE_VIEWS = [
    { key: 'grid',     icon: '🖼',  label: 'แบบเดิม' },
    { key: 'expanded', icon: '🃏', label: 'ทีละใบ' },
    { key: 'list',     icon: '📋', label: 'รายชื่อ' }
];

function getShowcaseView() {
    if (window.showcaseViewMode) return window.showcaseViewMode;
    let v = 'grid';
    try { v = localStorage.getItem(SHOWCASE_VIEW_KEY) || 'grid'; } catch (e) {}
    if (!SHOWCASE_VIEWS.some(x => x.key === v)) v = 'grid';
    window.showcaseViewMode = v;
    return v;
}

function setShowcaseView(mode) {
    window.showcaseViewMode = mode;
    try { localStorage.setItem(SHOWCASE_VIEW_KEY, mode); } catch (e) {}
    document.querySelectorAll('.showcase-view-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.view === mode);
    });
    renderShowcaseCards();
}

function showcaseEsc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function showcaseHasType(card, ...types) {
    const cardTypes = Array.isArray(card.type) ? card.type : [card.type];
    return types.some(t => cardTypes.includes(t));
}

// แยกการ์ดในเด็คเป็น Starter / Main / Extra (กฎเดิม)
function classifyShowcaseDeck(deck) {
    const commanderList = deck.filter(c => c.isCommander);
    const starterList = deck.filter(c =>
        c.isCommander === true ||
        c.type === "Master" ||
        c.type === "LC" ||
        c.type === "Boost_Master"
    );
    const extraList = deck.filter(c => !c.isCommander &&
        showcaseHasType(c, "Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion")
    );
    const mainList = deck.filter(c => !starterList.includes(c) && !extraList.includes(c));
    return { commanderList, starterList, mainList, extraList };
}

// เผ่าจาก Commander หรือ LC (ใช้ร่วมกันไม่ได้ จึงมีได้อย่างเดียว)
function getShowcaseTitleClanHTML() {
    const commander = (typeof getDeckCommander === 'function') ? getDeckCommander() : myDeck.find(c => c.isCommander);
    const lc = commander ? null :
        ((typeof getDeckLifeCrystal === 'function') ? getDeckLifeCrystal() : myDeck.find(c => c.type === "LC"));
    const src = commander || lc;
    if (!src || !src.clan) return '';
    const chips = (typeof renderClanIcons === 'function') ? renderClanIcons(src.clan, 'lg') : showcaseEsc(src.clan);
    if (!chips || chips === '-') return '';
    const tag = commander ? '👑' : '💎';
    const tip = commander ? 'เผ่าจาก Commander' : 'เผ่าจาก Life Crystal';
    return `<span class="showcase-title-clan" title="${tip}"><span class="showcase-title-clan-tag">${tag}</span>${chips}</span>`;
}

function openDeckShowcase() {
    const overlay = document.getElementById('deckShowcaseOverlay');
    const body = document.getElementById('showcaseBody');
    const title = document.getElementById('showcaseTitle');

    if (!overlay || !body) return;

    window.isShowcaseEditMode = false; // รีเซ็ตโหมดแก้ไขทุกครั้งที่เปิดใหม่
    window.isOwnedMode = false;        // รีเซ็ตโหมดเช็คการ์ดที่ขาด (showcase_owned.js)
    if (typeof updateOwnedButton === 'function') updateOwnedButton();
    const editBtn = document.querySelector('button[onclick="toggleShowcaseEdit()"]');
    if (editBtn) { editBtn.innerHTML = "แก้ไข"; editBtn.style.background = ""; }

    // ชื่อเด็ค + เผ่า (ถ้าตั้ง Commander หรือ LC)
    const deckName = document.getElementById('deckNameInput').value || "Unnamed Deck";
    title.innerHTML = `<span class="showcase-title-name">${showcaseEsc(deckName)}</span>${getShowcaseTitleClanHTML()}`;

    // 1. แยกกลุ่มการ์ด
    const { commanderList, starterList, mainList, extraList } = classifyShowcaseDeck(myDeck);

    // จำการ์ดที่เห็นตอนเปิด (ลำดับ + หมวด + อาร์ต) ไว้ เพื่อให้ลดเหลือ 0 แล้วยังกด + คืนได้
    // คีย์ = หมวด|id|รูป : เหมือนแถบเด็คด้านข้าง — id เดียวกันแต่อาร์ตต่างกันถือเป็นคนละกลุ่ม
    //                       และ Commander ที่ใส่ซ้ำ ใบที่ตั้งเป็น Commander อยู่ Starter ใบที่เหลืออยู่ Main
    window._showcaseSeen = [];
    registerShowcaseArts();

    // 2. ส่วนสรุปตัวเลข (Stats Bar ด้านบน) — ตัวเลขตามกฎฟอร์แมตของเด็ค + ผลตรวจเด็ค
    let finalHtml = `<div id="showcaseStatsBar">${showcaseStatsBarHTML()}</div>
    <div id="showcaseValidation" class="showcase-validation">${typeof deckValidationHTML === 'function' ? deckValidationHTML() : ''}</div>`;

    // 3. แถบเลือกมุมมอง + ปุ่มสถิติ
    const view = getShowcaseView();
    finalHtml += `
    <div class="showcase-toolbar">
        <div class="showcase-view-switch" role="group" aria-label="เลือกมุมมอง">
            ${SHOWCASE_VIEWS.map(v => `
                <button type="button" class="showcase-view-btn ${v.key === view ? 'active' : ''}" data-view="${v.key}"
                        onclick="setShowcaseView('${v.key}')" title="มุมมอง${v.label}">
                    <span class="svb-icon">${v.icon}</span><span class="svb-label">${v.label}</span>
                </button>`).join('')}
        </div>
        <button id="toggleMonitorBtn" onclick="toggleMonitor()"
                style="background: #6c5ce7; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-family: 'Kanit', sans-serif; font-size: 14px;">
            📊 ดูสถิติเด็ค
        </button>
    </div>

    ${getDeckStatsHTML()}
    <div id="ownedBar"></div>
    <div id="showcaseCardsArea"></div>
    `;

    body.innerHTML = finalHtml;
    renderShowcaseCards();
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// แถบตัวเลข STARTER / MAIN / EXTRA (ตัวหารตามกฎฟอร์แมต — deck_format.js)
function showcaseStatsBarHTML() {
    const { commanderList, starterList, mainList, extraList } = classifyShowcaseDeck(myDeck);
    const rules = (typeof getDeckFormatRules === 'function') ? getDeckFormatRules() : { mainMax: 60, extraMax: 15, checkSize: true };
    const mainCount = mainList.length + commanderList.length;
    const mainLimit = (typeof getMainDeckLimitLabel === 'function') ? getMainDeckLimitLabel()
        : (rules.mainExact ? `${rules.mainExact} พอดี` : rules.mainMax);
    const mainBad = rules.checkSize && (rules.mainExact ? mainCount !== rules.mainExact
        : (mainCount > rules.mainMax || (rules.mainMin && mainCount < rules.mainMin)));
    const extraBad = rules.checkSize && extraList.length > rules.extraMax;
    return `
    <div style="position: sticky; top: 0; background: #1e1e2e; padding: 15px; border-radius: 12px; color: white; margin-bottom: 10px; display: flex; justify-content: space-around; border-bottom: 3px solid #6c5ce7; z-index: 1000; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">STARTER</span>
            <span style="font-size:20px; font-weight:bold; color:#ff9f43;">${starterList.length}</span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">MAIN DECK</span>
            <span style="font-size:20px; font-weight:bold; color:${mainBad ? '#ff6b6b' : '#00d2d3'};">${mainCount} <small style="font-size:12px; color:#666;">/ ${mainLimit}</small></span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">EXTRA DECK</span>
            <span style="font-size:20px; font-weight:bold; color:${extraBad ? '#ff6b6b' : '#54a0ff'};">${extraList.length} <small style="font-size:12px; color:#666;">/ ${rules.extraMax}</small></span>
        </div>
    </div>`;
}

// อัปเดตแถบตัวเลข + ผลตรวจเด็ค + แถบการ์ดที่ขาด (หลังแก้เด็คในหน้า Showcase)
function refreshShowcaseMeta() {
    const bar = document.getElementById('showcaseStatsBar');
    if (bar) bar.innerHTML = showcaseStatsBarHTML();
    const val = document.getElementById('showcaseValidation');
    if (val && typeof deckValidationHTML === 'function') {
        const wasOpen = !!val.querySelector('details[open]');
        val.innerHTML = deckValidationHTML(undefined, { open: wasOpen });
    }
    const owned = document.getElementById('ownedBar');
    if (owned) owned.innerHTML = (typeof ownedBarHTML === 'function') ? ownedBarHTML() : '';
}

// คีย์ของการ์ด 1 กลุ่มอาร์ต (หมวด|id|รูป)
function showcaseArtKey(sec, card) {
    return sec + '|' + String(card.id) + '|' + String(card.image || '');
}

// เพิ่มกลุ่มอาร์ตที่ยังไม่เคยเห็นเข้า _showcaseSeen (ตามลำดับที่อยู่ในเด็ค)
function registerShowcaseArts() {
    if (!window._showcaseSeen) window._showcaseSeen = [];
    const seen = window._showcaseSeen;
    const seenKeys = new Set(seen.map(s => s.key));
    const { starterList, mainList, extraList } = classifyShowcaseDeck(myDeck);
    [['starter', starterList], ['main', mainList], ['extra', extraList]].forEach(([sec, list]) => {
        list.forEach(card => {
            const key = showcaseArtKey(sec, card);
            if (seenKeys.has(key)) return;
            seenKeys.add(key);
            seen.push({ key, id: String(card.id), image: card.image, section: sec, card: { ...card } });
        });
    });
}

// ข้อมูลแต่ละหมวด: กลุ่มละ 1 อาร์ต (count = จำนวนใบของอาร์ตนั้นในหมวดนั้น)
function getShowcaseSectionsData() {
    registerShowcaseArts();
    const seen = window._showcaseSeen;
    const { starterList, mainList, extraList } = classifyShowcaseDeck(myDeck);
    const lists = { starter: starterList, main: mainList, extra: extraList };

    const counts = {};
    const liveCard = {};
    Object.entries(lists).forEach(([sec, list]) => {
        list.forEach(c => {
            const key = showcaseArtKey(sec, c);
            counts[key] = (counts[key] || 0) + 1;
            if (!liveCard[key]) liveCard[key] = c;
        });
    });

    const pick = (sec) => seen
        .map((s, idx) => ({ s, idx }))
        .filter(({ s }) => s.section === sec)
        .map(({ s, idx }) => ({ ...(liveCard[s.key] || s.card), count: counts[s.key] || 0, _sec: sec, _artIdx: idx }));

    return [
        { key: 'starter', name: "STARTER / COMMANDER", isStarter: true, cards: pick('starter') },
        { key: 'main',    name: "MAIN DECK",           isStarter: false, cards: pick('main') },
        { key: 'extra',   name: "EXTRA DECK",          isStarter: false, cards: pick('extra') }
    ];
}

// โหมดรายชื่อ: รวมกลุ่มอาร์ตของ id เดียวกัน (ในหมวดเดียวกัน) เป็น 1 แถว
function groupShowcaseArtsById(cards) {
    const rows = [];
    const byId = {};
    cards.forEach(c => {
        const id = String(c.id);
        if (!byId[id]) {
            byId[id] = { ...c, count: 0, arts: [] };
            rows.push(byId[id]);
        }
        byId[id].arts.push({ image: c.image, count: c.count, artIdx: c._artIdx });
        byId[id].count += c.count;
    });
    // อาร์ตที่มีมากที่สุดขึ้นก่อน (ใช้เป็นอาร์ตหลักของแถว / ปุ่ม +/−)
    rows.forEach(r => {
        r.arts.sort((a, b) => b.count - a.count);
        r._artIdx = r.arts[0].artIdx;
    });
    return rows;
}

function showcaseControlsHTML(card, extraClass = '') {
    const id = showcaseEsc(card.id);
    const sec = showcaseEsc(card._sec || '');
    const art = (card._artIdx != null) ? card._artIdx : 'null';
    return `
        <div class="showcase-controls ${extraClass}" style="display: ${window.isShowcaseEditMode ? 'flex' : 'none'};">
            <div class="showcase-ctrl-btn minus" onclick="event.stopPropagation(); handleShowcaseUpdate('${id}', 'remove', '${sec}', ${art})">−</div>
            <div class="showcase-ctrl-btn plus" onclick="event.stopPropagation(); handleShowcaseUpdate('${id}', 'add', '${sec}', ${art})">+</div>
        </div>`;
}

function showcaseOpenCardJS(cardId) {
    const id = showcaseEsc(cardId);
    return `if(window.isOwnedMode) { cycleMissing('${id}'); } else if(!window.isShowcaseEditMode) { typeof openModal === 'function' ? openModal('${id}') : showCardModal('${id}') }`;
}

// รูปการ์ด 1 ใบ (ใช้ทั้งโหมดแบบเดิมและทีละใบ)
function showcaseImageCardHTML(card, badgeHTML, extraClass = '') {
    const imageUrl = card.image + (card.image.includes('?') ? '&' : '?') + 'not-tainted=1';
    return `
        <div class="showcase-card ${card.count === 0 ? 'is-empty' : ''} ${extraClass}" data-card-id="${showcaseEsc(card.id)}"
             style="position: relative; cursor: pointer; transition: opacity 0.2s;">
            <img src="${imageUrl}"
                 onclick="${showcaseOpenCardJS(card.id)}"
                 crossorigin="anonymous"
                 onerror="this.removeAttribute('crossorigin'); this.src='${card.image}';"
                 style="width:100%; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: block;">
            ${badgeHTML}
            ${showcaseControlsHTML(card)}
        </div>`;
}

function showcaseTypeClass(card) {
    if (showcaseHasType(card, "Field", "Action_Field")) return 't-field';
    if (showcaseHasType(card, "Action")) return 't-action';
    if (showcaseHasType(card, "Armor")) return 't-armor';
    if (card.isCommander || showcaseHasType(card, "Master", "Boost_Master", "LC")) return 't-master';
    if (showcaseHasType(card, "Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion")) return 't-extra';
    return 't-creature';
}

// url() สำหรับใส่ใน style="" (กันช่องว่าง/เครื่องหมายคำพูดในชื่อไฟล์)
function showcaseCssUrl(path) {
    return `url('${encodeURI(String(path || '')).replace(/'/g, '%27')}')`;
}

// พื้นหลังอาร์ตของแถว: 1 อาร์ต = เต็มช่อง / หลายอาร์ต = แบ่งช่องเฉียงตามสัดส่วนจำนวนใบ
function showcaseRowArtHTML(row) {
    const arts = row.arts.filter(a => a.count > 0);
    const list = arts.length ? arts : row.arts.slice(0, 1);
    const multi = list.length > 1;
    return `
        <div class="sr-art ${multi ? 'is-multi' : ''}" aria-hidden="true">
            ${list.map(a => `<div class="sr-art-slice" style="flex-grow:${Math.max(a.count, 1)}; background-image:${showcaseCssUrl(a.image)};"
                                 title="${multi ? 'x' + a.count : ''}"></div>`).join('')}
        </div>`;
}

// ป้ายชื่อ 1 แถว (โหมดรายชื่อ)
function showcaseListRowHTML(row, isStarter, owned) {
    owned = owned || null; // { show: จำนวนที่โชว์, miss: ขาดกี่ใบ, gray: เทาทั้งแถว }
    let at = row.at, df = row.df;
    if ((at == null && df == null) && typeof cardStatsData !== 'undefined' && cardStatsData[String(row.id)]) {
        at = cardStatsData[String(row.id)].at;
        df = cardStatsData[String(row.id)].df;
    }
    const hasPower = (at != null || df != null);
    const dp = (typeof renderDpCrystal === 'function') ? renderDpCrystal(row.dp) : showcaseEsc(row.dp);
    const nameTH = row.nameTH || row.nameEN || row.id;
    const nameEN = (row.nameEN && row.nameEN !== row.nameTH) ? row.nameEN : '';
    const artCount = row.arts.filter(a => a.count > 0).length;

    return `
        <div class="showcase-row showcase-card ${showcaseTypeClass(row)} ${row.count === 0 ? 'is-empty' : ''} ${owned && owned.gray ? 'is-missing' : ''}"
             data-card-id="${showcaseEsc(row.id)}" onclick="${showcaseOpenCardJS(row.id)}">
            ${showcaseRowArtHTML(row)}
            <div class="sr-dp">${dp}</div>
            <div class="sr-name">
                <span class="sr-name-th">${showcaseEsc(nameTH)}</span>
                ${nameEN ? `<span class="sr-name-en">${showcaseEsc(nameEN)}</span>` : ''}
            </div>
            ${hasPower ? `
            <div class="sr-power">
                <span class="sr-at" title="AT">⚔ ${at != null ? at : '-'}</span>
                <span class="sr-df" title="DF">🛡 ${df != null ? df : '-'}</span>
            </div>` : ''}
            ${owned && owned.miss > 0 && !owned.gray ? `<span class="owned-miss-chip">มี ${row.count - owned.miss}/${row.count}</span>` : ''}
            ${isStarter ? '' : `
            <div class="sr-count">
                <span class="showcase-count-badge sr-badge">x${owned ? owned.show : row.count}</span>
                ${artCount > 1 ? `<span class="sr-art-note" title="มี ${artCount} อาร์ต">${artCount} อาร์ต</span>` : ''}
            </div>`}
            ${showcaseControlsHTML(row, 'sr-controls')}
        </div>`;
}

// วาดเฉพาะส่วนการ์ด ตามโหมดที่เลือก
//   โหมดเช็คการ์ดที่ขาด (showcase_owned.js): ใบที่ขาด = สีเทา / เลือกดูเฉพาะใบที่มี หรือใบที่ขาดได้
function renderShowcaseCards() {
    const area = document.getElementById('showcaseCardsArea');
    if (!area) return;
    const view = getShowcaseView();
    const sections = getShowcaseSectionsData();
    const ownedOn = (typeof ownedIsOn === 'function') && ownedIsOn();
    const alloc = ownedOn ? ownedAllocate(sections) : null;
    const ownedView = ownedOn ? getOwnedView() : 'all';
    let html = '';

    // จำนวนที่ขาด / ที่จะโชว์ ของกลุ่มอาร์ต 1 กลุ่ม
    const ownedInfo = (secKey, card) => {
        const count = card.count || 0;
        if (!ownedOn) return { show: count, miss: 0, have: count, skip: false };
        const miss = alloc.get(secKey + '|' + card._artIdx) || 0;
        const have = count - miss;
        if (ownedView === 'have') return { show: have, miss: 0, have, skip: have <= 0 };
        if (ownedView === 'missing') return { show: miss, miss, have: 0, skip: miss <= 0 };
        return { show: count, miss, have, skip: false };
    };

    sections.forEach(sec => {
        if (sec.cards.length === 0) return;
        const infos = sec.cards.map(c => ownedInfo(sec.key, c));
        if (ownedOn && infos.every(i => i.skip)) return;
        const total = infos.reduce((n, i) => n + (i.skip ? 0 : i.show), 0);
        html += `<h3 class="showcase-section-title">${sec.name} <small>${total}</small></h3>`;

        if (view === 'list') {
            html += `<div class="showcase-list" id="grid-${sec.key}">`;
            groupShowcaseArtsById(sec.cards).forEach(row => {
                let owned = null;
                if (ownedOn) {
                    const parts = sec.cards.filter(c => String(c.id) === String(row.id));
                    const inf = parts.map(c => ownedInfo(sec.key, c));
                    const show = inf.reduce((n, i) => n + (i.skip ? 0 : i.show), 0);
                    const miss = inf.reduce((n, i) => n + i.miss, 0);
                    if (show <= 0 && ownedView !== 'all') return;
                    owned = { show, miss, gray: ownedView === 'missing' || (row.count > 0 && miss >= row.count) };
                }
                html += showcaseListRowHTML(row, sec.isStarter, owned);
            });
            html += `</div>`;
        } else {
            html += `<div class="showcase-grid ${view === 'expanded' ? 'is-expanded' : ''}" id="grid-${sec.name.replace(/\s/g, '')}">`;
            sec.cards.forEach((card, ci) => {
                const inf = infos[ci];
                if (inf.skip) return;
                if (view === 'expanded') {
                    // ทีละใบ: วาดทุกใบด้วยอาร์ตของใบนั้นจริง (อาร์ตเดียวกันเรียงติดกัน)
                    const copies = ownedOn ? Math.max(inf.show, 1) : Math.max(card.count, 1); // เหลือ 0 ใบ: โชว์จาง 1 ใบไว้กด + คืน
                    for (let i = 0; i < copies; i++) {
                        const gray = ownedOn && (ownedView === 'missing' || i >= inf.have);
                        html += showcaseImageCardHTML(card, '', gray ? 'is-missing' : '');
                    }
                } else {
                    const gray = ownedOn && (ownedView === 'missing' || (card.count > 0 && inf.miss >= card.count));
                    let badge = !sec.isStarter
                        ? `<div class="showcase-count-badge" style="position: absolute; top: -5px; right: -5px; background: #ff4757; color: white; padding: 2px 8px; border-radius: 10px; font-weight: bold; z-index: 2;">x${inf.show}</div>`
                        : "";
                    if (ownedOn && ownedView === 'all' && inf.miss > 0 && !gray) {
                        badge += `<div class="owned-miss-chip is-on-card">มี ${inf.have}/${card.count}</div>`;
                    }
                    html += showcaseImageCardHTML(card, badge, gray ? 'is-missing' : '');
                }
            });
            html += `</div>`;
        }
    });

    if (ownedOn && !html) {
        html = `<p class="owned-empty">${ownedView === 'missing' ? 'ไม่มีการ์ดที่ขาด 🎉' : 'ยังไม่ได้นับการ์ดที่มี — กลับไปมุมมอง "ทั้งหมด" แล้วแตะการ์ดที่มีอยู่'}</p>`;
    }

    area.className = `showcase-view-${view}${ownedOn ? ' owned-mode' : ''}`;
    area.innerHTML = html;
    refreshShowcaseMeta();
}

function closeDeckShowcase() {
    document.getElementById('deckShowcaseOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ฟังก์ชันสำหรับสลับการแสดงผลหน้า Dashboard สถิติ
function toggleMonitor() {
    const monitor = document.getElementById('deckMonitor');
    const btn = document.getElementById('toggleMonitorBtn');
    
    if (monitor.style.display === 'none' || monitor.style.display === '') {
        monitor.style.display = 'flex'; 
        btn.innerText = "📊 ซ่อนสถิติเด็ค";
        btn.style.background = "#ff4757"; 
    } else {
        monitor.style.display = 'none';
        btn.innerText = "📊 ดูสถิติเด็ค";
        btn.style.background = "#6c5ce7"; 
    }
}

// =========================================================
//  STATS CALCULATION (Updated: Curve Graphs Fixed)
// =========================================================

function getDeckStatsHTML() {
    // 1. กรองข้อมูล (Main Deck)
    const mainList = myDeck.filter(c => 
        c.type !== "Master" && 
        c.type !== "Boost_Master" &&
        !["Fusion_Monster", "Armored_Dino", "Boost_Creature", "Illusion"].includes(c.type)
    );

    const creatureCards = mainList.filter(c => c.type === "Creature");
    const magicCards = mainList.filter(c => ["Action", "Armor", "Field"].includes(c.type));
    
    // 2. นับจำนวนแยกประเภท
    const typeCounts = { "Creature": creatureCards.length, "Action": 0, "Armor": 0, "Field": 0 };
    magicCards.forEach(c => { if(typeCounts.hasOwnProperty(c.type)) typeCounts[c.type]++; });

    // 3. คำนวณค่าฐานนิยม (Mode DP) เฉพาะ Creature
    const dpCountsMap = {};
    creatureCards.forEach(c => {
        const val = parseInt(c.dp) || 0;
        dpCountsMap[val] = (dpCountsMap[val] || 0) + 1;
    });
    let modeDP = 0;
    let maxFreq = 0;
    for (const val in dpCountsMap) {
        if (dpCountsMap[val] > maxFreq) {
            maxFreq = dpCountsMap[val];
            modeDP = val;
        }
    }

    // 4. คำนวณสถานะไฟจราจร
    let statusColor = "#2ecc71"; // Green
    let statusText = "เด็คถูกกฎ (ฟอร์แมตหลัก)";
    if (mainList.length < 40 || mainList.length > 60) {
        statusColor = "#e74c3c"; // Red
        statusText = "ผิดกฎจำนวนการ์ด (ฟอร์แมตหลัก)";
    } else if (modeDP >= 4) {
        statusColor = "#f1c40f"; // Yellow
        statusText = "Heavy Deck (เด็คหนักเกินไป)";
    }

    // 5. ข้อมูล Donut Chart เผ่า
    const clanColorMap = {
        "สองขา": "#e74c3c", "คอยาว": "#9b59b6", "มีปีก": "#3fbffa",
        "มีเขา": "#f1c40f", "สัตว์น้ำ": "#1a46e6", "มีเกราะหางหนาม": "#27ae60",
        "จักรกล": "#95a5a6", "ไม่ระบุเผ่า": "#444444"
    };
    const clanCounts = {};
    creatureCards.forEach(c => {
        const clan = c.clan || "ไม่ระบุเผ่า";
        clanCounts[clan] = (clanCounts[clan] || 0) + 1;
    });
    const sortedClans = Object.entries(clanCounts).sort((a, b) => b[1] - a[1]);
    let currentPercent = 0;
    const clanGradient = sortedClans.map(clan => {
        const color = clanColorMap[clan[0]] || "#ffffff"; 
        const percent = (clan[1] / (creatureCards.length || 1)) * 100;
        const start = currentPercent;
        currentPercent += percent;
        return `${color} ${start}% ${currentPercent}%`;
    }).join(", ");

    // 6. ข้อมูล DP Curves
    const getCurveData = (list) => {
        const curve = new Array(9).fill(0); // 0 ถึง 8
        list.forEach(c => {
            const val = parseInt(c.dp) || 0;
            if(val >= 0 && val <= 8) curve[val]++;
        });
        return curve;
    };
    const creatureCurve = getCurveData(creatureCards);
    const magicCurve = getCurveData(magicCards);
    const maxVal = Math.max(...creatureCurve, ...magicCurve, 1); // หาค่าสูงสุดเพื่อเทียบ % ความสูง

    // --- ส่วน HTML Dashboard ---
    return `
<style>
    /* CSS เฉพาะส่วน Dashboard เพื่อให้รองรับมือถือ */
    #deckMonitor {
        padding: 20px !important;
    }
    .stats-flex-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: stretch;
    }
    .stats-col {
        flex: 1;
        min-width: 280px; 
    }
    .stats-col-wide {
        flex: 1.5;
        min-width: 300px;
    }
    .curve-container {
        flex: 2;
        min-width: 100%; 
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    @media (max-width: 600px) {
        #deckMonitor { padding: 15px !important; }
        .stats-col { min-width: 100%; }
        .curve-container { min-width: 100%; }
        .chart-row { flex-direction: column !important; align-items: center !important; }
    }
</style>

<div id="deckMonitor" style="display:none; background: #141423; border: 1px solid #6c5ce7; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: white; font-family: 'Kanit', sans-serif;">
    
    <div class="stats-flex-container">
        
        <div class="stats-col" style="display: flex; flex-direction: column; gap: 15px;">
            <h4 style="color:#00cec9; margin:0; font-size:16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-chart-line"></i> Deck Overview
            </h4>
            
            <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid #444; border-radius: 12px; padding: 15px;">
                <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px;">
                    <span style="font-size: 11px; color: #aaa; display: block;">การ์ดรวม (Main Deck)</span>
                    <span style="font-size: 32px; font-weight: bold; color: #fff;">${mainList.length}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
                    <div style="color: #f1c40f;">Creature: <b style="float:right;">${typeCounts.Creature}</b></div>
                    <div style="color: #e74c3c;">Action: <b style="float:right;">${typeCounts.Action}</b></div>
                    <div style="color: #3498db;">Armor: <b style="float:right;">${typeCounts.Armor}</b></div>
                    <div style="color: #2ecc71;">Field: <b style="float:right;">${typeCounts.Field}</b></div>
                </div>
            </div>

            <div style="background: rgba(108, 92, 231, 0.1); border: 1px solid #6c5ce7; border-radius: 12px; padding: 12px; text-align: center;">
                <span style="font-size: 11px; color: #aaa;">DP ยอดนิยม (Creature)</span>
                <span style="font-size: 24px; font-weight: bold; color: #00cec9; display: block;">DP ${modeDP}</span>
            </div>
        </div>

        <div class="stats-col" style="background: rgba(0,0,0,0.2); border: 1px solid #333; border-radius: 12px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <h4 style="color:#a29bfe; margin:0 0 15px 0; font-size:15px; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-robot"></i> AI Deck Doctor
                </h4>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: ${statusColor}; box-shadow: 0 0 10px ${statusColor};"></div>
                    <span style="font-size: 13px; font-weight: bold; color: ${statusColor};">${statusText}</span>
                </div>
                
                <p style="font-size: 11px; color: #888; line-height: 1.4; margin-bottom: 15px;">
                    กดปุ่มวิเคราะห์เพื่อเช็คความพร้อมของเด็คกับ Meta Games ปัจจุบัน และตรวจสอบลิสต์การ์ดที่ถูกแบน
                </p>
            </div>

            <button onclick="askAIForAdvice()" style="width: 100%; padding: 10px; background: #6c5ce7; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: bold; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i class="fas fa-magic"></i> วิเคราะห์เด็คด้วย AI
            </button>
        </div>
<div id="aiInsight" style="
    margin-top: 15px; 
    padding: 15px; 
    background: rgba(0,0,0,0.3); 
    border-radius: 8px; 
    color: #ecf0f1; 
    line-height: 1.6; 
    min-height: 50px;
    white-space: pre-wrap;
    border: 1px dashed #7f8c8d;
">
    คำแนะนำจาก AI จะปรากฏตรงนี้...
</div>
        <div class="stats-col-wide">
            <div class="chart-row" style="display: flex; flex-wrap: wrap; gap: 20px;">
                
                <div style="flex: 1; min-width: 150px; text-align: center;">
                    <div style="position: relative; width: 150px; height: 150px; margin: 0 auto 10px auto; border-radius: 50%; background: conic-gradient(${clanGradient || "#444 0% 100%"}); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 110px; height: 110px; background: #141423; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; color: #fff; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);">
                            ${creatureCards.length}
                        </div>
                    </div>
                    <span style="font-size: 12px; color: #888; letter-spacing: 1px;">CREATURE CLANS</span>
                </div>

                <div class="curve-container">
                    <div>
                        <span style="font-size: 14px; color: #f1c40f;">📊 Creature Curves (DP)</span>
                        <div style="display: flex; align-items: flex-end; height: 80px; gap: 8px; border-bottom: 2px solid #00ff15; padding-bottom:4px; margin-top:10px;">
                            ${creatureCurve.map((count, i) => `
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <span style="font-size:11px; color:#fff; font-weight:bold; margin-bottom:2px;">${count > 0 ? count : ''}</span>
                                    
                                    <div style="width: 100%; height: 50px; display: flex; align-items: flex-end;">
                                        <div style="width:100%; background:#f1c40f; height:${(count/maxVal)*100}%; border-radius:2px 2px 0 0; min-height:2px; opacity: ${count > 0 ? 1 : 0.3}; transition: height 0.4s ease-out;"></div>
                                    </div>

                                    <span style="font-size:11px; color:#00ff15; margin-top:2px;">${i}</span>
                                </div>
                            `).join('')} 
                        </div>
                    </div>

                    <div>
                        <span style="font-size: 14px; color: #e74c3c;">🪄 Magic Curves (DP)</span>
                        <div style="display: flex; align-items: flex-end; height: 80px; gap: 8px; border-bottom: 2px solid #00ff15; padding-bottom:4px; margin-top:10px;">
                            ${magicCurve.map((count, i) => `
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <span style="font-size:11px; color:#fff; font-weight:bold; margin-bottom:2px;">${count > 0 ? count : ''}</span>
                                    
                                    <div style="width: 100%; height: 50px; display: flex; align-items: flex-end;">
                                        <div style="width:100%; background:#e74c3c; height:${(count/maxVal)*100}%; border-radius:2px 2px 0 0; min-height:2px; opacity: ${count > 0 ? 1 : 0.3}; transition: height 0.4s ease-out;"></div>
                                    </div>

                                    <span style="font-size:11px; color:#00ff15; margin-top:2px;">${i}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>`;
}

// ฟังก์ชันจำลองสำหรับปุ่ม AI
async function askAIForAdvice() {
    const insightBox = document.getElementById('aiInsight');
    if (!insightBox) return;

    insightBox.innerText = "🔍 AI กำลังอ่านเด็คของคุณ...";

    try {
        const apiKey = getApiKey();
        if (!apiKey) return;

        const data = prepareAIData();

        // ใช้ URL เวอร์ชัน Stable เพื่อความชัวร์กับ API Key ทุกประเภท
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${AI_CONFIG.systemPrompt}\n\nนี่คือข้อมูลเด็คของฉัน:\n${data.deckList}`
                    }]
                }]
            })
        });

        const resData = await response.json();

        if (resData.error) {
            // ถ้า Error เพราะรุ่นโมเดลผิด ให้แจ้งเตือนชัดเจน
            throw new Error(`Google API ตอบกลับว่า: ${resData.error.message}`);
        }

        const aiResponse = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiResponse) {
            insightBox.innerText = aiResponse;
        } else {
            insightBox.innerText = "AI ไม่สามารถสร้างคำแนะนำได้ในขณะนี้";
        }

    } catch (error) {
        console.error("AI Error:", error);
        insightBox.innerHTML = `<span style='color:#ff7675'>❌ ${error.message}</span>`;
    }
}

// ฟังก์ชันจัดการ Showcase Update (Add/Remove)
window.isShowcaseEditMode = window.isShowcaseEditMode || false;

function toggleShowcaseEdit() {
    window.isShowcaseEditMode = !window.isShowcaseEditMode;
    // โหมดแก้ไขกับโหมดเช็คการ์ดที่ขาดใช้พร้อมกันไม่ได้
    if (window.isShowcaseEditMode && window.isOwnedMode && typeof toggleOwnedMode === 'function') toggleOwnedMode(false);
    const controls = document.querySelectorAll('.showcase-controls');
    const eyeBtn = document.querySelector('button[onclick="toggleShowcaseEdit()"]');
    
    controls.forEach(el => el.style.display = window.isShowcaseEditMode ? 'flex' : 'none');

    if (eyeBtn) {
        eyeBtn.innerHTML = window.isShowcaseEditMode ? "เลิกแก้ไข" : "แก้ไข";
        eyeBtn.style.background = window.isShowcaseEditMode ? "#e67e22" : "#07357d";
    }
}

function handleShowcaseUpdate(cardId, action, section, artIdx) {
    const allAvailableCards = (typeof cardsData !== 'undefined') ? cardsData : [];
    // อาร์ตของปุ่มที่กด (ถ้ามี) — ใช้เลือกใบที่จะเพิ่ม/ลบให้ตรงอาร์ต
    const art = (artIdx != null && window._showcaseSeen) ? window._showcaseSeen[artIdx] : null;
    const artImage = art ? art.image : null;
    const template = (artImage && allAvailableCards.find(c => String(c.id) === String(cardId) && c.image === artImage)) ||
                     allAvailableCards.find(c => String(c.id) === String(cardId)) ||
                     myDeck.find(c => String(c.id) === String(cardId));

    if (!template) return;

    if (action === 'add') {
        const currentCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
        const isLegend = Array.isArray(template.type) ? template.type.includes("Legend") : template.type === "Legend";
        const isLC = template.type === "LC";
        let maxAllowed = (isLegend || isLC) ? 1 : 3;
        // กฎ Banlist + กฎใบซ้ำของฟอร์แมต (เช่น คลาสสิค DP 4+ ใบเดียว)
        if (typeof getCardMaxLimit === 'function') maxAllowed = Math.min(maxAllowed, getCardMaxLimit(template));
        const formatCopy = (typeof getFormatCopyLimit === 'function') ? getFormatCopyLimit(template, currentBanlistFormat) : null;
        if (currentCount >= maxAllowed && formatCopy && formatCopy.limit === maxAllowed && maxAllowed < 3 && !isLegend && !isLC) {
            alert(`⚠️ ${formatCopy.reason}`);
            return;
        }

        if (currentCount >= maxAllowed) {
            alert(isLegend ? "⚠️ การ์ด Legend ใส่ได้เพียง 1 ใบต่อเด็คเท่านั้น" : isLC ? "⚠️ การ์ด Life Crystal ใส่ได้เพียง 1 ใบต่อเด็คเท่านั้น" : "⚠️ ใส่การ์ดซ้ำได้ไม่เกิน 3 ใบ");
            return;
        }
        if (isLegend) {
            const activeLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
            if (activeLegend && String(activeLegend.id) !== String(cardId)) {
                alert(`⚠️ เด็คนี้มีการ์ด Legend แล้ว (${activeLegend.nameTH})\nใส่ Legend ได้เพียง 1 ใบต่อเด็คเท่านั้น!`);
                return;
            }
        }
        if (isLC) {
            const activeLC = myDeck.find(c => c.type === "LC");
            if (activeLC && String(activeLC.id) !== String(cardId)) {
                alert(`⚠️ เด็คนี้มีการ์ด Life Crystal แล้ว (${activeLC.nameTH})\nใส่ LC ได้เพียง 1 ใบต่อเด็คเท่านั้น!`);
                return;
            }
        }
        if (template.type === "Master" || template.type === "Boost_Master") {
            const hasMaster = myDeck.some(c => c.type === template.type);
            if (hasMaster) {
                alert(`⚠️ ในเด็คมี ${template.type} ได้เพียงใบเดียวเท่านั้น`);
                return;
            }
        }
        const newCard = { ...template };
        if (artImage) newCard.image = artImage;   // เพิ่มใบอาร์ตเดียวกับที่กด
        delete newCard.isCommander;
        myDeck.push(newCard);
    } else {
        // ลบใบในหมวดที่กด (กดลบใน Main จะไม่ไปลบใบที่ตั้งเป็น Commander)
        let index = -1;
        if (section) {
            const lists = classifyShowcaseDeck(myDeck);
            const secList = lists[section + 'List'] || [];
            const match = c => String(c.id) === String(cardId) && secList.includes(c);
            if (artImage) index = myDeck.findIndex(c => match(c) && c.image === artImage);
            if (index === -1) index = myDeck.findIndex(match);
        }
        if (index === -1) index = myDeck.findIndex(c => String(c.id) === String(cardId));
        if (index !== -1) myDeck.splice(index, 1);
    }

    // บันทึกและอัปเดต UI
    isUnsaved = true;
    saveDeckToLocalStorage();
    
    if (typeof updateDeckUI === 'function') updateDeckUI();

    // วาดส่วนการ์ดใหม่ตามมุมมองปัจจุบัน (ตัวเลข x / จำนวนรูป / การ์ดจาง)
    renderShowcaseCards();
    const titleClan = document.querySelector('#showcaseTitle .showcase-title-clan');
    if (titleClan) titleClan.remove();
    const titleEl = document.getElementById('showcaseTitle');
    if (titleEl) titleEl.insertAdjacentHTML('beforeend', getShowcaseTitleClanHTML());
}
