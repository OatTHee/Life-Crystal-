// =========================================================
//  site_extras.js — เก็บตกก่อน launch
//   1) ค้นหาไม่เจอ → บอกว่าติดตัวกรองอะไร + ปุ่มล้าง + แนะนำชื่อที่ใกล้เคียง (พิมพ์ผิดก็หาเจอ)
//   2) เตือนก่อนปิดแท็บ ถ้าเด็คที่กำลังจัดยังไม่ได้ Save เข้าคอลเล็คชั่น
//   3) ป้าย "ข้อมูลการ์ดล่าสุด" ที่แถบล่าง  ← แก้วันที่ได้ที่ CARD_DATA_UPDATED
// =========================================================

// วันที่อัปเดตฐานข้อมูลการ์ดครั้งล่าสุด (ปี-เดือน-วัน) — เปลี่ยนทุกครั้งที่เพิ่ม/แก้การ์ด
const CARD_DATA_UPDATED = '2026-09-25';

(function () {
    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const norm = s => String(s || '').toLowerCase().replace(/[\s\-_'’.]+/g, '');

    // ---------- 1. ค้นหาไม่เจอ ----------
    function activeFilterChips() {
        const chips = [];
        const labelOf = (id, v) => {
            const cb = document.querySelector(`#${id} input[value="${CSS.escape(v)}"]`);
            return cb ? cb.closest('label').textContent.trim() : v;
        };
        [['typeFilter', 'ประเภท'], ['clanFilter', 'เผ่า'], ['rarityFilter', 'ความหายาก'], ['setFilter', 'ชุด']].forEach(([id, name]) => {
            const vals = (typeof getMultiSelectValues === 'function') ? getMultiSelectValues(id) : [];
            if (vals.length) chips.push(`${name}: ${vals.map(v => labelOf(id, v)).join(', ')}`);
        });
        if (typeof selectedDpValues !== 'undefined' && selectedDpValues.length) chips.push(`DP: ${selectedDpValues.join(', ')}`);
        if (typeof advancedFilterState !== 'undefined') {
            const s = advancedFilterState;
            if (s.atMin !== null || s.atMax !== null) chips.push(`AT ${s.atMin ?? '…'}–${s.atMax ?? '…'}`);
            if (s.dfMin !== null || s.dfMax !== null) chips.push(`DF ${s.dfMin ?? '…'}–${s.dfMax ?? '…'}`);
            if (s.taxonomy && s.taxonomy.length) chips.push(`อนุกรมวิธาน: ${s.taxonomy.join(', ')}`);
            if (s.legendary && s.legendary !== 'all') chips.push(s.legendary === 'yes' ? 'เฉพาะ Legend' : 'ไม่รวม Legend');
        }
        if (window.lcListFilter === 'fav') chips.push('เฉพาะการ์ดโปรด ★');
        if (window.lcListFilter === 'recent') chips.push('เฉพาะที่ดูล่าสุด 🕘');
        return chips;
    }

    function editDistance(a, b, cap) {
        if (Math.abs(a.length - b.length) > cap) return cap + 1;
        let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
        for (let i = 1; i <= a.length; i++) {
            const cur = [i];
            let rowMin = i;
            for (let j = 1; j <= b.length; j++) {
                cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
                if (cur[j] < rowMin) rowMin = cur[j];
            }
            if (rowMin > cap) return cap + 1;
            prev = cur;
        }
        return prev[b.length];
    }

    // ชื่อการ์ดที่ใกล้กับคำค้น (เทียบทั้งชื่อ และช่วงคำที่ยาวเท่าคำค้น เพื่อรองรับพิมพ์แค่บางส่วน)
    function similarNames(query, limit) {
        const q = norm(query);
        if (q.length < 2 || typeof cardsData === 'undefined') return [];
        const cap = Math.max(1, Math.min(3, Math.floor(q.length / 3)));
        const seen = new Map();
        cardsData.forEach(c => {
            [c.nameEN, c.nameTH].forEach(name => {
                if (!name || seen.has(name)) return;
                const n = norm(name);
                let best = editDistance(q, n, cap);
                if (best > 0 && n.length > q.length) {
                    for (let i = 0; i + q.length <= n.length + 1 && best > 0; i++) {
                        const d = editDistance(q, n.slice(i, i + q.length), cap);
                        if (d < best) best = d;
                    }
                }
                if (best <= cap) seen.set(name, best);
            });
        });
        return [...seen.entries()].sort((a, b) => a[1] - b[1] || a[0].length - b[0].length)
            .slice(0, limit || 6).map(e => e[0]);
    }

    function countMatches(query, abilityMode) {
        if (typeof cardsData === 'undefined') return 0;
        const q = String(query || '').toLowerCase();
        const strip = (typeof stripAbilityHTML === 'function') ? stripAbilityHTML : (t => String(t || '').toLowerCase());
        const ids = new Set();
        cardsData.forEach(c => {
            const hit = abilityMode ? strip(c.ability).includes(q)
                : ((c.nameTH || '').toLowerCase().includes(q) || (c.nameEN || '').toLowerCase().includes(q));
            if (hit) ids.add(c.id + '|' + c.image);
        });
        return ids.size;
    }

    function renderEmptySearchHelp(container) {
        const input = document.getElementById('searchInput');
        const query = input ? input.value.trim() : '';
        const ability = (typeof abilitySearchMode !== 'undefined') && abilitySearchMode;
        const chips = activeFilterChips();

        const actions = [];
        if (chips.length) {
            const n = query ? countMatches(query, ability) : (typeof cardsData !== 'undefined' ? cardsData.length : 0);
            actions.push(`<button type="button" class="es-btn is-primary" data-es="clear-filters">🧹 ล้างตัวกรอง${query ? ' แล้วค้นหาใหม่' : ''}${n ? ` (${n} ใบ)` : ''}</button>`);
        }
        if (query) {
            const other = countMatches(query, !ability);
            if (other) actions.push(`<button type="button" class="es-btn" data-es="switch-mode">${ability ? '🔍 ค้นจากชื่อแทน' : '⚡ ค้นในความสามารถ (Effect) แทน'} (${other} ใบ)</button>`);
        }
        const similar = query ? similarNames(query) : [];

        container.innerHTML = `
            <div class="empty-search">
                <div class="es-title">😕 ไม่พบการ์ด${query ? ` "<b>${esc(query)}</b>"` : 'ที่ตรงกับตัวกรอง'}</div>
                ${chips.length ? `<div class="es-chips"><span>ตัวกรองที่เปิดอยู่:</span>${chips.map(c => `<span class="es-chip">${esc(c)}</span>`).join('')}</div>` : ''}
                ${actions.length ? `<div class="es-actions">${actions.join('')}</div>` : ''}
                ${similar.length ? `<div class="es-similar"><span>หรือหมายถึง:</span>${similar.map(n =>
                    `<button type="button" class="es-name" data-es="name" data-name="${esc(n)}">${esc(n)}</button>`).join('')}</div>` : ''}
            </div>`;
    }

    document.addEventListener('click', ev => {
        const b = ev.target.closest && ev.target.closest('.empty-search [data-es]');
        if (!b) return;
        const input = document.getElementById('searchInput');
        const query = input ? input.value : '';
        const ability = (typeof abilitySearchMode !== 'undefined') && abilitySearchMode;
        const act = b.dataset.es;
        if (act === 'clear-filters') {
            if (typeof resetFilters === 'function') resetFilters();       // ล้างทั้งหมด (รวมโหมดค้นหา)
            if (ability && typeof toggleAbilitySearch === 'function') toggleAbilitySearch();
            if (input) { input.value = query; input.blur(); }
            if (typeof filterCards === 'function') filterCards();
        } else if (act === 'switch-mode') {
            if (typeof toggleAbilitySearch === 'function') toggleAbilitySearch(); // จะล้างช่องค้นหา
            if (input) { input.value = query; input.blur(); }
            if (typeof filterCards === 'function') filterCards();
        } else if (act === 'name') {
            if (typeof searchCardByName === 'function') searchCardByName(b.dataset.name);
        }
    });

    // ---------- 2. เตือนก่อนปิดแท็บ ----------
    window.addEventListener('beforeunload', ev => {
        const building = (typeof isBuildMode !== 'function') || isBuildMode();
        const dirty = typeof isUnsaved !== 'undefined' && isUnsaved &&
                      typeof myDeck !== 'undefined' && myDeck.length > 0;
        if (building && dirty) {
            ev.preventDefault();
            ev.returnValue = ''; // เบราว์เซอร์จะแสดงข้อความยืนยันของตัวเอง
            return '';
        }
    });

    // ---------- 3. ป้ายข้อมูลการ์ดล่าสุด ----------
    function latestSet() {
        if (typeof cardsData === 'undefined') return '';
        const sets = new Set(cardsData.map(c => c.set));
        const order = (typeof SORT_SET_ORDER !== 'undefined') ? SORT_SET_ORDER : [];
        for (let i = order.length - 1; i >= 0; i--) if (sets.has(order[i])) return order[i];
        return '';
    }

    function renderDataUpdated() {
        const el = document.getElementById('dataUpdatedLabel');
        if (!el) return;
        const d = new Date(CARD_DATA_UPDATED + 'T00:00:00');
        const date = isNaN(d) ? CARD_DATA_UPDATED : d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' });
        const set = latestSet();
        const count = (typeof cardsData !== 'undefined') ? new Set(cardsData.map(c => c.id)).size : 0;
        el.textContent = `ข้อมูลการ์ด${set ? ` ถึง ${set}` : ''} · ${count} ใบ · อัปเดต ${date}`;
        el.title = 'ฐานข้อมูลการ์ดอัปเดตล่าสุด';
    }

    document.addEventListener('DOMContentLoaded', renderDataUpdated);

    window.renderEmptySearchHelp = renderEmptySearchHelp;
    window.similarCardNames = similarNames;
})();
