// =========================================================
//  build_compact.js — ทำโหมดจัดเด็คให้สะอาดตา (ไม่ได้ตัดฟีเจอร์ออก แค่ย่อ/รวบ)
//
//  1) เมนู "⋯" ในแถบเด็ค : รวมปุ่มที่ใช้ไม่บ่อย (เรียงการ์ด, เลือกหน้าปก, โค้ด Untap,
//     ใบลงทะเบียน, นำเข้า/ดาวน์โหลด .json, ล้างเด็ค)
//  2) ตัวเลขบนปุ่ม "ตัวกรอง" : บอกว่าตอนนี้เปิดตัวกรองอยู่กี่อย่าง (ตัวกรองพับไว้ในโหมดจัดเด็ค)
// =========================================================

(function () {

    // ---------- 1. เมนู ⋯ ----------
    function menuEl() { return document.getElementById('deckMoreMenu'); }

    function closeDeckMenu() {
        const m = menuEl();
        if (!m || m.hidden) return;
        m.hidden = true;
        const btn = document.querySelector('.dp-more-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    function toggleDeckMenu(ev) {
        if (ev) ev.stopPropagation();
        const m = menuEl();
        if (!m) return;
        m.hidden = !m.hidden;
        const btn = document.querySelector('.dp-more-btn');
        if (btn) btn.setAttribute('aria-expanded', String(!m.hidden));
    }

    // กดรายการในเมนู = ปิดเมนูแล้วทำงานนั้น
    function deckMenuRun(fn) {
        closeDeckMenu();
        if (typeof fn === 'function') fn();
    }

    document.addEventListener('click', ev => {
        const m = menuEl();
        if (m && !m.hidden && !ev.target.closest('.dp-more')) closeDeckMenu();
    });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') closeDeckMenu(); });

    // ---------- 2. จำนวนตัวกรองที่เปิดอยู่ ----------
    function countActiveFilters() {
        let n = 0;
        ['typeFilter', 'clanFilter', 'rarityFilter', 'setFilter'].forEach(id => {
            if (typeof getMultiSelectValues === 'function' && getMultiSelectValues(id).length) n++;
        });
        if (typeof selectedDpValues !== 'undefined' && selectedDpValues.length) n++;
        if (typeof advancedFilterState !== 'undefined') {
            const s = advancedFilterState;
            if (s.atMin !== null || s.atMax !== null || s.dfMin !== null || s.dfMax !== null ||
                (s.taxonomy && s.taxonomy.length) || s.legendary !== 'all') n++;
        }
        return n;
    }

    function updateFilterBadge() {
        const badge = document.getElementById('filterActiveBadge');
        if (!badge) return;
        const n = countActiveFilters();
        badge.hidden = n === 0;
        badge.textContent = n;
        const btn = document.getElementById('filterToggleBtn');
        if (btn) btn.classList.toggle('has-active', n > 0);
    }

    // เรียกทุกครั้งหลังกรองการ์ด (ครอบฟังก์ชันเดิมใน main.js)
    function wrap(name) {
        const orig = window[name];
        if (typeof orig !== 'function' || orig._lcWrapped) return;
        const w = function () {
            const r = orig.apply(this, arguments);
            try { updateFilterBadge(); } catch (e) {}
            return r;
        };
        w._lcWrapped = true;
        window[name] = w;
    }

    document.addEventListener('DOMContentLoaded', () => {
        ['filterCards', 'resetFilters', 'applyAdvancedFilter', 'resetAdvancedFilter', 'clearDpFilter'].forEach(wrap);
        updateFilterBadge();
        // กันกรณีตัวกรองบางตัวผูก event กับฟังก์ชันเดิมไว้ตรงๆ (ไม่ผ่านตัวครอบ)
        const later = () => setTimeout(updateFilterBadge, 0);
        ['searchBar', 'advancedFilterModal'].forEach(id => {
            const el = document.getElementById(id);
            if (el) { el.addEventListener('change', later); el.addEventListener('click', later); }
        });
    });

    window.toggleDeckMenu = toggleDeckMenu;
    window.closeDeckMenu = closeDeckMenu;
    window.deckMenuRun = deckMenuRun;
    window.updateFilterBadge = updateFilterBadge;
})();
