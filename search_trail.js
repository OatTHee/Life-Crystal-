// =========================================================
//  search_trail.js — ปุ่ม "กลับไปที่การ์ดเดิม" หลังกดค้นหาจากหน้าการ์ด
//
//  เมื่อกดชื่อการ์ด / คีย์เวิร์ด ในความสามารถ (ability_enhance.js) ระบบจะจำ
//    - การ์ดที่เปิดอยู่ตอนนั้น (ใบเจ้าของความสามารถ)
//    - คำค้น + ตัวกรองทั้งหมด + ตำแหน่งเลื่อนหน้าจอ
//    - หน้า Showcase / แถบเด็คบนมือถือ ที่เปิดค้างอยู่
//  แล้วโชว์ป้ายลอย "← กลับไปที่ ..." กดแล้วคืนทุกอย่างและเปิดการ์ดใบเดิมให้
//  กดต่อกันหลายทอดได้ (ย้อนกลับทีละขั้น) และปุ่มย้อนกลับของเบราว์เซอร์/มือถือก็ใช้ได้
// =========================================================

(function () {
    const MAX_STEPS = 10;
    const MULTI_IDS = ['typeFilter', 'clanFilter', 'rarityFilter', 'setFilter'];
    const stack = [];
    let restoring = false;

    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    function isShown(id, value) {
        const el = document.getElementById(id);
        return !!el && getComputedStyle(el).display === value;
    }

    // ---------- เก็บสถานะปัจจุบัน ----------
    function snapshot(nextQuery) {
        const modalOpen = isShown('imageModal', 'flex');
        const card = modalOpen ? window._lcModalCard : null;
        const panel = document.getElementById('deckSidePanel');
        const input = document.getElementById('searchInput');
        return {
            card: card || null,
            search: input ? input.value : '',
            ability: (typeof abilitySearchMode !== 'undefined') ? !!abilitySearchMode : false,
            multi: MULTI_IDS.reduce((o, id) => {
                o[id] = (typeof getMultiSelectValues === 'function') ? getMultiSelectValues(id) : [];
                return o;
            }, {}),
            dp: (typeof selectedDpValues !== 'undefined') ? [...selectedDpValues] : [],
            adv: (typeof advancedFilterState !== 'undefined') ? JSON.parse(JSON.stringify(advancedFilterState)) : null,
            scrollY: window.scrollY,
            showcase: isShown('deckShowcaseOverlay', 'block'),
            mobilePanel: !!(panel && panel.classList.contains('open') && window.innerWidth <= 768),
            nextQuery: nextQuery || ''
        };
    }

    // ---------- คืนสถานะ ----------
    function restore(s) {
        restoring = true;
        try {
            if (typeof closeModal === 'function') closeModal();

            // โหมดค้นหา (ชื่อ / Effect) — toggleAbilitySearch จะล้างช่องค้นหาเอง จึงต้องทำก่อนใส่คำค้น
            if (typeof abilitySearchMode !== 'undefined' && !!abilitySearchMode !== s.ability
                && typeof toggleAbilitySearch === 'function') {
                toggleAbilitySearch();
            }
            const input = document.getElementById('searchInput');
            if (input) { input.value = s.search; input.blur(); }

            // ตัวกรองแบบเลือกหลายค่า
            MULTI_IDS.forEach(id => {
                const box = document.getElementById(id);
                if (!box) return;
                const want = new Set(s.multi[id] || []);
                box.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = want.has(cb.value); });
                if (typeof updateMultiSelectLabel === 'function') updateMultiSelectLabel(id);
            });

            // DP
            if (typeof selectedDpValues !== 'undefined') {
                selectedDpValues = [...s.dp];
                if (typeof syncDpButtons === 'function') syncDpButtons();
            }

            // ตัวกรองขั้นสูง
            if (s.adv && typeof advancedFilterState !== 'undefined') {
                advancedFilterState = JSON.parse(JSON.stringify(s.adv));
                const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = (v == null ? '' : v); };
                setVal('advAtMin', s.adv.atMin); setVal('advAtMax', s.adv.atMax);
                setVal('advDfMin', s.adv.dfMin); setVal('advDfMax', s.adv.dfMax);
                if (typeof setSelectedTaxonomies === 'function') setSelectedTaxonomies(s.adv.taxonomy || []);
                if (typeof setLegendaryFilter === 'function') setLegendaryFilter(s.adv.legendary || 'all');
                if (typeof updateAdvancedFilterIndicator === 'function') updateAdvancedFilterIndicator();
            }

            if (typeof filterCards === 'function') filterCards();

            // หน้าจอที่เปิดค้างไว้
            if (s.mobilePanel && typeof applySidePanelState === 'function') applySidePanelState(true);
            if (s.showcase && typeof openDeckShowcase === 'function') openDeckShowcase();

            requestAnimationFrame(() => {
                if (!s.showcase) window.scrollTo(0, s.scrollY);
                if (s.card && typeof openModal === 'function') openModal(s.card);
            });
        } finally {
            restoring = false;
        }
    }

    // ---------- ป้ายลอย ----------
    function renderPill() {
        let pill = document.getElementById('searchTrailPill');
        if (!stack.length) { if (pill) pill.remove(); return; }
        if (!pill) {
            pill = document.createElement('div');
            pill.id = 'searchTrailPill';
            pill.className = 'search-trail';
            document.body.appendChild(pill);
        }
        const top = stack[stack.length - 1];
        const label = top.card
            ? `กลับไปที่ <b>${esc(top.card.nameTH || top.card.nameEN || top.card.id)}</b>`
            : `กลับไปผลค้นหาก่อนหน้า`;
        pill.innerHTML = `
            <button type="button" class="st-back" data-trail="back" title="ย้อนกลับ (หรือกดปุ่มย้อนกลับของเบราว์เซอร์)">
                ${top.card && top.card.image ? `<img src="${esc(top.card.image)}" alt="">` : '<span class="st-arrow">←</span>'}
                <span class="st-text">${top.card && top.card.image ? '← ' : ''}${label}</span>
                ${stack.length > 1 ? `<span class="st-count" title="ย้อนได้อีก ${stack.length} ขั้น">${stack.length}</span>` : ''}
            </button>
            <button type="button" class="st-close" data-trail="clear" aria-label="ปิด" title="ไม่ต้องกลับ">✕</button>`;
    }

    // เรียกจาก ability_enhance.js ก่อนเริ่มค้นหา
    function pushTrail(nextQuery) {
        if (restoring) return;
        stack.push(snapshot(nextQuery));
        if (stack.length > MAX_STEPS) stack.shift();
        try { history.pushState({ lcTrail: stack.length }, ''); } catch (e) {}
        renderPill();
    }

    function goBack() {
        const s = stack.pop();
        renderPill();
        if (s) restore(s);
    }

    function clearTrail() {
        stack.length = 0;
        renderPill();
    }

    // กดป้าย → ใช้ history.back() เพื่อให้ปุ่มย้อนกลับของเบราว์เซอร์กับป้ายทำงานตรงกัน
    function onPillBack() {
        if (history.state && history.state.lcTrail) history.back();
        else goBack();
    }

    window.addEventListener('popstate', () => {
        if (stack.length) goBack();
    });

    document.addEventListener('click', ev => {
        const btn = ev.target.closest && ev.target.closest('#searchTrailPill [data-trail]');
        if (!btn) return;
        ev.preventDefault();
        ev.stopPropagation();
        if (btn.dataset.trail === 'back') onPillBack();
        else clearTrail();
    }, true);

    window.pushSearchTrail = pushTrail;
    window.searchTrailBack = onPillBack;
    window.clearSearchTrail = clearTrail;
})();
