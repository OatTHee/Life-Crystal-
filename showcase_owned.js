// =========================================================
//  showcase_owned.js — โหมด "เช็คการ์ดที่ขาด" ในหน้า Showcase (ดูเต็มจอ)
//
//  - ค่าเริ่มต้น: การ์ดเป็นสีเทาทั้งหมด (ถือว่ายังไม่มี)
//  - เอากองการ์ดจริงมาเทียบ แล้วแตะการ์ดเพื่อนับว่า "มีกี่ใบ" (แตะซ้ำเพิ่มทีละ 1 ครบแล้ววนกลับเป็น 0)
//    ใบที่ยังไม่ได้แตะ = ใบที่ขาด (สีเทา)
//  - เลือกมุมมองได้: ทั้งหมด / เฉพาะใบที่มี / เฉพาะใบที่ขาด
//  - จำไว้ในเครื่องเป็น "จำนวนใบที่มีจริง" ต่อรหัสการ์ด จึงใช้ร่วมกันทุกเด็ค
//    (เช่น นับไว้ว่ามี Bambiraptor 1 ใบ เปิดเด็คอื่นที่ใช้ 3 ใบจะขึ้นว่ามี 1/3 ให้เอง)
// =========================================================

(function () {
    const STORE_KEY = 'lc_owned_counts_v2'; // v2 = ค่าเริ่มต้นคือ "ยังไม่มี" (ไม่ใช้ข้อมูลแบบเดิมที่เริ่มจาก "มีครบ")
    const VIEW_KEY = 'lc_owned_view';
    const VIEWS = [
        { key: 'all',     label: 'ทั้งหมด' },
        { key: 'have',    label: 'ใบที่มี' },
        { key: 'missing', label: 'ใบที่ขาด' }
    ];
    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    let owned = {};
    try { owned = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { owned = {}; }
    function persist() { try { localStorage.setItem(STORE_KEY, JSON.stringify(owned)); } catch (e) {} }

    window.isOwnedMode = false;

    function ownedIsOn() { return !!window.isOwnedMode; }

    function getOwnedView() {
        let v = 'all';
        try { v = localStorage.getItem(VIEW_KEY) || 'all'; } catch (e) {}
        return VIEWS.some(x => x.key === v) ? v : 'all';
    }

    function setOwnedView(v) {
        try { localStorage.setItem(VIEW_KEY, v); } catch (e) {}
        refresh();
    }

    function deck() { return (typeof myDeck !== 'undefined' && Array.isArray(myDeck)) ? myDeck : []; }
    function deckQty(id) { return deck().filter(c => String(c.id) === String(id)).length; }

    // จำนวนใบที่มี (ไม่เกินที่เด็คใช้) / ที่ขาด ของการ์ด id นี้ ในเด็คปัจจุบัน
    function ownedHaveOf(id) {
        const k = String(id);
        return Math.min(deckQty(k), Math.max(0, parseInt(owned[k], 10) || 0));
    }
    function ownedMissingOf(id) {
        return deckQty(id) - ownedHaveOf(id);
    }

    // แตะ 1 ครั้ง = มีเพิ่ม 1 ใบ (ครบแล้ววนกลับเป็น 0)
    function cycleOwned(id) {
        const k = String(id);
        const q = deckQty(k);
        if (q === 0) return;
        const next = (ownedHaveOf(k) + 1) % (q + 1);
        if (next === 0) delete owned[k];
        else owned[k] = next;
        persist();
        refresh();
        if (typeof showQuickFeedback === 'function') {
            const c = deck().find(x => String(x.id) === k);
            showQuickFeedback(null, `${(c && (c.nameTH || c.nameEN)) || k} : มี ${next}/${q}`, next === q ? '#2ecc71' : (next ? '#f1c40f' : '#aaa'));
        }
    }

    // กระจายจำนวนที่ขาดของแต่ละ id ลงแต่ละกลุ่มอาร์ต (ไล่จากท้ายเด็คขึ้นมา)
    // คืน Map: "หมวด|artIdx" → จำนวนที่ขาดในกลุ่มนั้น
    function ownedAllocate(sections) {
        const remain = {};
        const map = new Map();
        const groups = [];
        sections.forEach(sec => sec.cards.forEach(c => groups.push({ sec: sec.key, card: c })));
        for (let i = groups.length - 1; i >= 0; i--) {
            const { sec, card } = groups[i];
            const id = String(card.id);
            if (remain[id] == null) remain[id] = ownedMissingOf(id);
            const take = Math.min(remain[id], card.count || 0);
            remain[id] -= take;
            map.set(sec + '|' + card._artIdx, take);
        }
        return map;
    }

    function missingSummary() {
        const ids = [...new Set(deck().map(c => String(c.id)))];
        const all = ids.map(id => ({ id, miss: ownedMissingOf(id), card: deck().find(c => String(c.id) === id) }));
        const rows = all.filter(r => r.miss > 0);
        const total = rows.reduce((n, r) => n + r.miss, 0);
        return { rows, total, have: deck().length - total, deckSize: deck().length };
    }

    function ownedBarHTML() {
        if (!ownedIsOn()) return '';
        const view = getOwnedView();
        const sum = missingSummary();
        return `
        <div class="owned-bar">
            <div class="owned-bar-top">
                <span class="owned-hint">🧩 เอากองการ์ดจริงมาเทียบ แล้ว<b>แตะการ์ดที่มี</b> (แตะซ้ำเพิ่มทีละใบ) — ใบที่ยังเทา = ขาด</span>
                <span class="owned-total ${sum.total ? 'has-missing' : ''}">
                    มีแล้ว <b>${sum.have}</b>/${sum.deckSize} ใบ
                    ${sum.total ? ` · ขาด <b>${sum.total}</b> ใบ (${sum.rows.length} แบบ)` : ' · ครบทุกใบ ✅'}
                </span>
                <div class="owned-progress" aria-hidden="true"><span style="width:${sum.deckSize ? Math.round(sum.have / sum.deckSize * 100) : 0}%"></span></div>
            </div>
            <div class="owned-bar-actions">
                <div class="owned-view-switch" role="group" aria-label="มุมมองการ์ดที่มี/ขาด">
                    ${VIEWS.map(v => `<button type="button" class="${v.key === view ? 'active' : ''}"
                        onclick="setOwnedView('${v.key}')">${v.label}</button>`).join('')}
                </div>
                <button type="button" class="owned-act" onclick="copyMissingList()" ${sum.total ? '' : 'disabled'}>📋 คัดลอกรายการที่ขาด</button>
                <button type="button" class="owned-act" onclick="markAllOwnedForDeck()" ${sum.total ? '' : 'disabled'}>✔ มีครบทั้งเด็ค</button>
                <button type="button" class="owned-act" onclick="resetOwnedForDeck()" ${sum.have ? '' : 'disabled'}>↺ เริ่มนับใหม่</button>
            </div>
        </div>`;
    }

    function copyMissingList() {
        const sum = missingSummary();
        if (!sum.total) return;
        const name = (document.getElementById('deckNameInput') || {}).value || 'เด็ค';
        const text = `การ์ดที่ยังขาด — ${name}\n` +
            sum.rows.map(r => `${r.miss}x ${r.card.nameTH || r.card.nameEN} (${r.id})`).join('\n') +
            `\nรวม ${sum.total} ใบ`;
        const done = () => { if (typeof showQuickFeedback === 'function') showQuickFeedback(null, 'คัดลอกรายการที่ขาดแล้ว', '#2ecc71'); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done, () => window.prompt('คัดลอกรายการนี้:', text));
        } else {
            window.prompt('คัดลอกรายการนี้:', text);
        }
    }

    // ทุกใบในเด็คนี้ = มีครบ (ไม่ลดจำนวนที่เคยนับไว้เกินจากเด็คอื่น)
    function markAllOwnedForDeck() {
        [...new Set(deck().map(c => String(c.id)))].forEach(id => {
            owned[id] = Math.max(parseInt(owned[id], 10) || 0, deckQty(id));
        });
        persist();
        refresh();
    }

    // ล้างจำนวนที่นับไว้ของการ์ดในเด็คนี้ (กลับเป็นสีเทาทั้งหมด)
    function resetOwnedForDeck() {
        if (!confirm('ล้างจำนวนที่นับไว้ของการ์ดในเด็คนี้ แล้วเริ่มนับใหม่ (การ์ดจะกลับเป็นสีเทาทั้งหมด)?')) return;
        [...new Set(deck().map(c => String(c.id)))].forEach(id => { delete owned[id]; });
        persist();
        refresh();
    }

    function updateOwnedButton() {
        const btn = document.getElementById('ownedModeBtn');
        if (!btn) return;
        btn.classList.toggle('is-on', ownedIsOn());
        btn.innerHTML = ownedIsOn() ? '🧩 เลิกนับ' : '🧩 นับการ์ดที่มี';
    }

    function toggleOwnedMode(force) {
        window.isOwnedMode = (typeof force === 'boolean') ? force : !window.isOwnedMode;
        // ใช้พร้อมโหมดแก้ไขไม่ได้ (แตะการ์ดคนละความหมาย)
        if (window.isOwnedMode && window.isShowcaseEditMode && typeof toggleShowcaseEdit === 'function') toggleShowcaseEdit();
        updateOwnedButton();
        refresh();
    }

    function refresh() {
        const bar = document.getElementById('ownedBar');
        if (bar) bar.innerHTML = ownedBarHTML();
        if (typeof renderShowcaseCards === 'function' && document.getElementById('showcaseCardsArea')) renderShowcaseCards();
    }

    window.ownedIsOn = ownedIsOn;
    window.getOwnedView = getOwnedView;
    window.setOwnedView = setOwnedView;
    window.cycleOwned = cycleOwned;
    window.cycleMissing = cycleOwned; // ชื่อเดิม (Showcase_logic.js เรียกใช้)
    window.ownedHaveOf = ownedHaveOf;
    window.markAllOwnedForDeck = markAllOwnedForDeck;
    window.ownedMissingOf = ownedMissingOf;
    window.ownedAllocate = ownedAllocate;
    window.ownedBarHTML = ownedBarHTML;
    window.copyMissingList = copyMissingList;
    window.resetOwnedForDeck = resetOwnedForDeck;
    window.toggleOwnedMode = toggleOwnedMode;
    window.updateOwnedButton = updateOwnedButton;
})();
