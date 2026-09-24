// =========================================================
//  ability_enhance.js
//  ตกแต่งข้อความ "ความสามารถ" ใน Modal การ์ด หลังวาดเสร็จ (แตะเฉพาะ DOM ไม่แก้ข้อมูลการ์ด)
//
//   1) คีย์เวิร์ด (อภิธานศัพท์) : คำใน KEYWORD_GLOSSARY (keyword_glossary.js)
//      → ขีดเส้นใต้ประ กดแล้วขึ้น popup คำอธิบาย
//   2) ชื่อการ์ดในข้อความ : คำที่อยู่ใน "..." / [...] / {...} แล้วตรงกับชื่อการ์ดจริง
//      → กดแล้วปิด Modal และค้นหาชื่อนั้นในคลังการ์ด
//      (รองรับชื่อเต็ม, รหัสการ์ด และคำอังกฤษที่เป็นส่วนหนึ่งของชื่อ เช่น [Raptor] ในชื่อ)
//
//  เรียกใช้: enhanceAbilityBox(element)  — main.js เรียกให้ทุกครั้งที่เปิด Modal
// =========================================================

(function () {

    // ---------- 1. เตรียมข้อมูลคีย์เวิร์ด ----------
    const esc = s => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const htmlEsc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    function glossaryList() {
        return (typeof KEYWORD_GLOSSARY !== 'undefined' && Array.isArray(KEYWORD_GLOSSARY)) ? KEYWORD_GLOSSARY : [];
    }

    function glossaryByKey(key) {
        return glossaryList().find(g => g.key === key) || null;
    }

    // regex รวมทุกคำ — 1 คำศัพท์ = 1 กลุ่มจับ (capture group) เพื่อรู้ว่าจับได้คำไหน
    //   match   : คำธรรมดา (ช่องว่างกี่ช่องก็ได้, ไม่สนตัวพิมพ์)
    //   pattern : regex แบบเขียนเอง (ต้องใช้ (?: ) แทนวงเล็บธรรมดา)
    // คำศัพท์ที่ยาวกว่าจะถูกลองจับก่อน
    let _kwRegex = null;
    let _kwKeys = [];      // ลำดับ key ตามกลุ่มจับ
    let _kwFullRegex = null; // ใช้เช็คว่า "ทั้งคำ" เป็นคีย์เวิร์ดหรือไม่
    const normKw = s => String(s).toLowerCase().replace(/\s+/g, '');

    function entrySource(g) {
        const alts = [];
        (g.pattern || []).forEach(p => { if (p) alts.push(p); });
        (g.match || (g.pattern ? [] : [g.title])).forEach(m => {
            if (m) alts.push(esc(String(m).trim()).replace(/\s+/g, '\\s*'));
        });
        return alts.join('|');
    }

    function buildKeywordRegex() {
        if (_kwRegex !== null) return _kwRegex;
        const entries = glossaryList()
            .map(g => ({ key: g.key, src: entrySource(g),
                         weight: Math.max(0, ...[].concat(g.match || [], g.pattern || []).map(x => String(x).length)) }))
            .filter(e => e.src);
        entries.sort((a, b) => b.weight - a.weight);
        _kwKeys = entries.map(e => e.key);
        try {
            _kwRegex = entries.length ? new RegExp(entries.map(e => '(' + e.src + ')').join('|'), 'gi') : false;
            _kwFullRegex = entries.length ? new RegExp('^(?:' + entries.map(e => e.src).join('|') + ')$', 'i') : null;
        } catch (e) {
            console.warn('keyword_glossary: regex ผิดรูปแบบ', e);
            _kwRegex = false; _kwFullRegex = null;
        }
        return _kwRegex;
    }

    // key ของคำศัพท์ที่จับได้ จากผลลัพธ์ regex.exec
    function keyOfMatch(m) {
        for (let i = 1; i < m.length; i++) if (m[i] !== undefined) return _kwKeys[i - 1];
        return null;
    }

    function isKeywordToken(t) {
        buildKeywordRegex();
        return !!(_kwFullRegex && _kwFullRegex.test(String(t).trim()));
    }

    // ---------- 2. เตรียมดัชนีชื่อการ์ด ----------
    // คำที่ไม่ควรเป็นลิงก์แม้จะตรงกับบางส่วนของชื่อการ์ด (เป็นคำประเภท/ศัพท์เกม)
    const CARD_REF_STOPWORDS = new Set([
        'armor', 'creature', 'action', 'field', 'master', 'commander', 'effect', 'skill',
        'extra', 'main', 'deck', 'line', 'boost', 'fusion', 'legend', 'illusion', 'auto', 'manual', 'cont',
        'สับสน', 'หลับ', 'บาดเจ็บ', 'ทำลาย', 'คืนชีพ', 'อมตะ', 'ตื่นตระหนก'
    ]);

    let _nameIndex = null;
    function buildNameIndex() {
        if (_nameIndex) return _nameIndex;
        const exact = new Map();  // lower(name) → คำที่ใช้ค้นหา
        const ids = new Map();    // lower(id) → คำที่ใช้ค้นหา
        const latinNames = [];    // ชื่ออังกฤษทั้งหมด (lower) สำหรับเช็คคำบางส่วน
        const data = (typeof cardsData !== 'undefined') ? cardsData : [];
        data.forEach(c => {
            const en = String(c.nameEN || '').trim();
            const th = String(c.nameTH || '').trim();
            if (en) { exact.set(en.toLowerCase(), en); latinNames.push(en.toLowerCase()); }
            if (th) exact.set(th.toLowerCase(), th);
            if (c.id) ids.set(String(c.id).toLowerCase(), en || th);
        });
        _nameIndex = { exact, ids, latinNames };
        return _nameIndex;
    }

    // คืนคำที่จะใช้ค้นหา หรือ null ถ้าคำนี้ไม่ใช่ชื่อการ์ด
    function resolveCardRef(token) {
        const t = String(token || '').trim();
        if (t.length < 2) return null;
        const low = t.toLowerCase();
        const idx = buildNameIndex();

        // คีย์เวิร์ดในอภิธานศัพท์ไม่ใช่ชื่อการ์ด
        if (isKeywordToken(t)) return null;

        // ชื่อการ์ดที่ซ้ำกับชื่อสภาวะ/ศัพท์เกม (เช่น [สับสน] = สภาวะ ไม่ใช่การ์ด)
        if (CARD_REF_STOPWORDS.has(low)) return null;

        if (idx.exact.has(low)) return idx.exact.get(low);
        if (idx.ids.has(low)) return idx.ids.get(low);

        // คำอังกฤษที่เป็นส่วนหนึ่งของชื่อ เช่น [Raptor] / [Megatech] ในชื่อ
        if (/^[A-Za-z][A-Za-z .'\-]{2,}$/.test(t) && t.length >= 4 && !CARD_REF_STOPWORDS.has(low)) {
            if (idx.latinNames.some(n => n.includes(low))) return t;
        }
        return null;
    }

    // ---------- 3. เดินทีละ text node แล้วห่อ span ----------
    function textNodesOf(root) {
        const out = [];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const p = node.parentElement;
                if (!p) return NodeFilter.FILTER_REJECT;
                if (p.closest('.kw-term, .card-ref, script, style, button')) return NodeFilter.FILTER_REJECT;
                return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        while (walker.nextNode()) out.push(walker.currentNode);
        return out;
    }

    // แทน text node ด้วยชิ้นส่วน [{text} | {el}]
    function replaceWithPieces(node, pieces) {
        const frag = document.createDocumentFragment();
        pieces.forEach(p => frag.appendChild(typeof p === 'string' ? document.createTextNode(p) : p));
        node.parentNode.replaceChild(frag, node);
    }

    function makeKwSpan(text, key) {
        const span = document.createElement('span');
        span.className = 'kw-term';
        span.dataset.kw = key;
        span.setAttribute('role', 'button');
        span.setAttribute('tabindex', '0');
        span.title = 'กดเพื่อดูความหมาย';
        span.textContent = text;
        return span;
    }

    function makeRefSpan(text, query) {
        const span = document.createElement('span');
        span.className = 'card-ref';
        span.dataset.q = query;
        span.setAttribute('role', 'link');
        span.setAttribute('tabindex', '0');
        span.title = `ค้นหาการ์ด "${query}"`;
        span.textContent = text;
        return span;
    }

    function wrapKeywords(root) {
        const re = buildKeywordRegex();
        if (!re) return;
        textNodesOf(root).forEach(node => {
            const text = node.nodeValue;
            re.lastIndex = 0;
            if (!re.test(text)) return;
            re.lastIndex = 0;
            const pieces = [];
            let last = 0, m;
            while ((m = re.exec(text))) {
                const key = keyOfMatch(m);
                if (!key || !m[0]) { if (!m[0]) re.lastIndex++; continue; }
                if (m.index > last) pieces.push(text.slice(last, m.index));
                pieces.push(makeKwSpan(m[0], key));
                last = m.index + m[0].length;
            }
            if (!pieces.length) return;
            if (last < text.length) pieces.push(text.slice(last));
            replaceWithPieces(node, pieces);
        });
    }

    // "ชื่อ" / [ชื่อ] / {ชื่อ} — ชื่อหลายใบในวงเล็บเดียวกันคั่นด้วย / ได้ เช่น [Control / Meteor]
    const REF_RE = /(["“”\[{])([^"“”\[\]{}<>\n]{2,60}?)(["“”\]}])/g;

    function wrapCardRefs(root) {
        textNodesOf(root).forEach(node => {
            const text = node.nodeValue;
            REF_RE.lastIndex = 0;
            const pieces = [];
            let last = 0, m, found = false;
            while ((m = REF_RE.exec(text))) {
                const inner = m[2];
                // แยกชื่อที่คั่นด้วย /
                const parts = inner.split(/(\s*\/\s*)/);
                const resolved = parts.map((p, i) => (i % 2 === 0) ? resolveCardRef(p) : null);
                if (!resolved.some(Boolean)) continue;

                found = true;
                const innerStart = m.index + m[1].length;
                if (innerStart > last) pieces.push(text.slice(last, innerStart));
                parts.forEach((p, i) => {
                    if (i % 2 === 1 || !resolved[i]) { pieces.push(p); return; }
                    const lead = p.match(/^\s*/)[0], trail = p.match(/\s*$/)[0];
                    if (lead) pieces.push(lead);
                    pieces.push(makeRefSpan(p.trim(), resolved[i]));
                    if (trail) pieces.push(trail);
                });
                last = innerStart + inner.length;
            }
            if (!found) return;
            if (last < text.length) pieces.push(text.slice(last));
            replaceWithPieces(node, pieces);
        });
    }

    function enhanceAbilityBox(box, card) {
        if (card) window._lcModalCard = card; // การ์ดที่เปิดอยู่ (ใช้ตอนกดกลับ)
        if (!box) return;
        try {
            wrapKeywords(box);
            wrapCardRefs(box);
        } catch (e) {
            console.warn('enhanceAbilityBox error:', e);
        }
    }

    // ---------- 4. การค้นหา ----------
    function setAbilityMode(on) {
        if (typeof abilitySearchMode === 'undefined') return;
        if (!!abilitySearchMode !== !!on && typeof toggleAbilitySearch === 'function') {
            toggleAbilitySearch();
            const input = document.getElementById('searchInput');
            if (input) input.blur(); // ไม่ให้คีย์บอร์ดมือถือเด้ง
        }
    }

    // opts.apply   : ตั้งตัวกรองเพิ่มเติมหลังล้างตัวกรองเดิม (เช่น อนุกรมวิธาน)
    // opts.label   : ข้อความที่โชว์ในแจ้งเตือน (ค่าเริ่มต้น = คำค้น)
    function runSearch(query, abilityMode, opts) {
        opts = opts || {};
        // จำการ์ดที่เปิดอยู่ + ตัวกรองเดิม ไว้กดกลับทีหลัง (search_trail.js)
        if (typeof pushSearchTrail === 'function') pushSearchTrail(opts.label || query);

        if (typeof closeModal === 'function') closeModal();
        // ปิดหน้าที่บังผลค้นหา: Showcase / แถบเด็คบนมือถือ
        const sc = document.getElementById('deckShowcaseOverlay');
        if (sc && getComputedStyle(sc).display !== 'none' && typeof closeDeckShowcase === 'function') closeDeckShowcase();
        if (window.innerWidth <= 768 && typeof closeSidePanel === 'function') closeSidePanel();
        closeKeywordPopover();
        closeGlossaryModal();

        // ล้างตัวกรองอื่นก่อน เพื่อไม่ให้ผลค้นหาว่างเพราะติดตัวกรองเดิม
        if (typeof resetFilters === 'function') resetFilters();
        setAbilityMode(abilityMode);

        const input = document.getElementById('searchInput');
        if (input) { input.value = query; input.blur(); }
        if (typeof opts.apply === 'function') opts.apply();
        if (typeof filterCards === 'function') filterCards();

        const target = document.getElementById('searchBar') || document.getElementById('cardContainer');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        const count = (typeof currentFilteredCards !== 'undefined') ? currentFilteredCards.length : 0;
        if (typeof showQuickFeedback === 'function') {
            showQuickFeedback(null, `${opts.icon || (abilityMode ? '⚡' : '🔍')} ${opts.label || query} — พบ ${count} ใบ`, count ? '#2ecc71' : '#e67e22');
        }
    }

    function searchCardByName(query) { runSearch(query, false); }

    // กดป้ายอนุกรมวิธานในหน้าการ์ด → กรองการ์ดอนุกรมวิธานนั้น
    // (ถ้าเป็นระดับวงศ์ จะรวมวงศ์ย่อยที่อยู่ใต้วงศ์นั้นด้วย เช่น Ceratopsidae = Chasmosaurinae + Centrosaurinae)
    function searchByTaxonomy(taxonomy) {
        if (!taxonomy) return;
        const info = (typeof TAXONOMY_INFO !== 'undefined') ? TAXONOMY_INFO : {};
        const list = [taxonomy].concat(Object.keys(info).filter(t => info[t] && info[t].parent === taxonomy));
        const rank = (info[taxonomy] && info[taxonomy].rank) || 'วงศ์';
        runSearch('', false, {
            icon: '🧬',
            label: `${rank} ${taxonomy}`,
            apply: () => {
                if (typeof advancedFilterState === 'undefined') return;
                advancedFilterState.taxonomy = list;
                if (typeof setSelectedTaxonomies === 'function') setSelectedTaxonomies(list);
                if (typeof updateAdvancedFilterIndicator === 'function') updateAdvancedFilterIndicator();
            }
        });
    }
    function searchCardsByKeyword(key) {
        const g = glossaryByKey(key);
        if (g) runSearch(g.search || g.title, true);
    }

    // ---------- 5. Popup คำอธิบายคีย์เวิร์ด ----------
    // ทำคำศัพท์ที่อยู่ในคำอธิบายให้กดต่อได้ (ยกเว้นคำของตัวเอง)
    function linkifyDescs(root) {
        root.querySelectorAll('.kw-pop-desc[data-self]').forEach(el => {
            wrapKeywords(el);
            el.querySelectorAll(`.kw-term[data-kw="${el.dataset.self}"]`).forEach(sp => sp.replaceWith(sp.textContent));
        });
    }

    function descHTML(g) {
        return g.desc
            ? `<div class="kw-pop-desc" data-self="${htmlEsc(g.key)}">${g.desc}</div>`
            : `<div class="kw-pop-desc is-pending">รอเพิ่มนิยาม</div>`;
    }

    function relatedHTML(g) {
        const related = (g.related || []).map(glossaryByKey).filter(Boolean);
        if (!related.length) return '';
        return `<div class="kw-pop-related">ดูเพิ่ม: ${related.map(r =>
            `<span class="kw-term" data-kw="${htmlEsc(r.key)}" role="button" tabindex="0">${htmlEsc(r.title)}</span>`).join(' ')}</div>`;
    }

    function closeKeywordPopover() {
        const pop = document.getElementById('kwPopover');
        if (pop) pop.remove();
        _popHistory = [];
        _popAnchor = null;
    }

    // ประวัติการดูคำศัพท์ต่อยอดภายใน popup เดียวกัน (กด ← เพื่อย้อน)
    let _popHistory = [];

    function popoverContentHTML(g) {
        return `
            <div class="kw-pop-head">
                ${_popHistory.length ? `<button type="button" class="kw-pop-back" data-act="kw-back" aria-label="ย้อนกลับ"
                    title="กลับไปที่ ${htmlEsc((glossaryByKey(_popHistory[_popHistory.length - 1]) || {}).title || '')}">←</button>` : ''}
                <span class="kw-pop-title">${htmlEsc(g.title)}</span>
                <button type="button" class="kw-pop-close" aria-label="ปิด" data-act="close">✕</button>
            </div>
            ${descHTML(g)}
            ${relatedHTML(g)}
            <div class="kw-pop-actions">
                <button type="button" data-act="search" data-kw="${htmlEsc(g.key)}">🔍 การ์ดที่มีคำนี้</button>
                <button type="button" data-act="all">📖 คำศัพท์ทั้งหมด</button>
            </div>`;
    }

    function fillPopover(pop, g) {
        pop.dataset.kw = g.key;
        pop.innerHTML = popoverContentHTML(g);
        linkifyDescs(pop);
    }

    function openKeywordPopover(anchor, key) {
        const g = glossaryByKey(key);
        if (!g) return;

        // กดคำศัพท์ที่อยู่ "ใน popup" → เปลี่ยนเนื้อหาใน popup เดิม (ดูต่อยอด) ไม่ต้องปิดแล้วเปิดใหม่
        const existing = document.getElementById('kwPopover');
        if (existing && existing.contains(anchor)) {
            if (existing.dataset.kw && existing.dataset.kw !== key) _popHistory.push(existing.dataset.kw);
            fillPopover(existing, g);
            positionPopover();
            return;
        }

        closeKeywordPopover();
        const pop = document.createElement('div');
        pop.id = 'kwPopover';
        pop.className = 'kw-popover';
        pop.setAttribute('role', 'dialog');
        document.body.appendChild(pop);
        fillPopover(pop, g);

        _popAnchor = anchor;
        positionPopover();
    }

    function popoverBack() {
        const pop = document.getElementById('kwPopover');
        const prev = _popHistory.pop();
        const g = prev && glossaryByKey(prev);
        if (!pop || !g) return;
        fillPopover(pop, g);
        positionPopover();
    }

    // วางใต้คำที่กด (ถ้าล้นจอให้ขึ้นด้านบน) — เรียกซ้ำตอนเลื่อนจอ ให้ popup ตามคำไป
    let _popAnchor = null;
    function positionPopover() {
        const pop = document.getElementById('kwPopover');
        if (!pop || !_popAnchor) return;
        if (!_popAnchor.isConnected) { closeKeywordPopover(); return; }
        const r = _popAnchor.getBoundingClientRect();
        // คำหลุดออกนอกจอไปแล้ว = ปิด
        if (r.bottom < 0 || r.top > window.innerHeight) { closeKeywordPopover(); return; }
        const pw = pop.offsetWidth, ph = pop.offsetHeight;
        const margin = 8;
        let left = Math.min(Math.max(margin, r.left + r.width / 2 - pw / 2), window.innerWidth - pw - margin);
        let top = r.bottom + 8;
        if (top + ph > window.innerHeight - margin) top = Math.max(margin, r.top - ph - 8);
        pop.style.left = left + 'px';
        pop.style.top = top + 'px';
    }

    // ---------- 6. หน้ารวมคำศัพท์ ----------
    // นับแบบเดียวกับช่องค้นหาโหมด Effect (จะได้ตัวเลขตรงกับผลค้นหาจริง)
    function countCardsWithKeyword(g) {
        const data = (typeof cardsData !== 'undefined') ? cardsData : [];
        const q = String(g.search || g.title).toLowerCase();
        const strip = (typeof stripAbilityHTML === 'function') ? stripAbilityHTML
            : (t => String(t || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase());
        return data.filter(c => strip(c.ability).includes(q)).length;
    }

    function closeGlossaryModal() {
        const m = document.getElementById('glossaryModal');
        if (m) m.remove();
    }

    function openGlossaryModal(focusKey) {
        closeKeywordPopover();
        closeGlossaryModal();
        const list = glossaryList();
        const groups = [...new Set(list.map(g => g.group || 'คีย์เวิร์ด'))];
        const wrap = document.createElement('div');
        wrap.id = 'glossaryModal';
        wrap.className = 'glossary-modal';
        wrap.innerHTML = `
            <div class="glossary-box" role="dialog" aria-label="อภิธานศัพท์คีย์เวิร์ด">
                <div class="glossary-head">
                    <h3>📖 อภิธานศัพท์คีย์เวิร์ด</h3>
                    <button type="button" class="kw-pop-close" data-act="close-glossary" aria-label="ปิด">✕</button>
                </div>
                <p class="glossary-hint">คำที่ขีดเส้นใต้ประในหน้าการ์ด กดดูความหมายได้</p>
                <div class="glossary-list">
                    ${groups.map(grp => `
                    ${groups.length > 1 ? `<h4 class="glossary-group">${htmlEsc(grp)}</h4>` : ''}
                    ${list.filter(g => (g.group || 'คีย์เวิร์ด') === grp).map(g => `
                    <div class="glossary-item${g.key === focusKey ? ' is-focus' : ''}" id="glossary-${htmlEsc(g.key)}">
                        <div class="glossary-item-head">
                            <span class="glossary-term">${htmlEsc(g.title)}</span>
                            <button type="button" data-act="search" data-kw="${htmlEsc(g.key)}">🔍 ${countCardsWithKeyword(g)} ใบ</button>
                        </div>
                        ${descHTML(g)}
                        ${relatedHTML(g)}
                    </div>`).join('')}`).join('')}
                </div>
            </div>`;
        document.body.appendChild(wrap);
        linkifyDescs(wrap);
        if (focusKey) {
            const el = document.getElementById('glossary-' + focusKey);
            if (el) el.scrollIntoView({ block: 'center' });
        }
    }

    // ---------- 7. Event (delegation ทั้งหน้า) ----------
    function activate(target, ev) {
        const act = target.closest('[data-act]');
        if (act) {
            const a = act.dataset.act;
            if (a === 'close') { closeKeywordPopover(); return true; }
            if (a === 'kw-back') { popoverBack(); return true; }
            if (a === 'close-glossary') { closeGlossaryModal(); return true; }
            if (a === 'search') { searchCardsByKeyword(act.dataset.kw); return true; }
            if (a === 'all') { openGlossaryModal(); return true; }
        }
        const kw = target.closest('.kw-term');
        if (kw) { openKeywordPopover(kw, kw.dataset.kw); return true; }
        const taxo = target.closest('#modalInfo .taxo-badge');
        if (taxo) {
            const name = taxo.querySelector('.taxo-name');
            searchByTaxonomy(name ? name.textContent.trim() : '');
            return true;
        }
        const ref = target.closest('.card-ref');
        if (ref) { searchCardByName(ref.dataset.q); return true; }
        return false;
    }

    document.addEventListener('click', ev => {
        if (activate(ev.target, ev)) { ev.stopPropagation(); ev.preventDefault(); return; }
        // คลิกข้างนอก popup = ปิด
        const pop = document.getElementById('kwPopover');
        if (pop && !pop.contains(ev.target)) closeKeywordPopover();
        const gm = document.getElementById('glossaryModal');
        if (gm && ev.target === gm) closeGlossaryModal();
    }, true);

    document.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') {
            if (document.getElementById('kwPopover')) { closeKeywordPopover(); ev.stopPropagation(); return; }
            if (document.getElementById('glossaryModal')) { closeGlossaryModal(); ev.stopPropagation(); return; }
        }
        if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.closest && ev.target.closest('.kw-term, .card-ref')) {
            ev.preventDefault();
            activate(ev.target, ev);
        }
    }, true);

    // เลื่อนจอ / เลื่อนกล่อง Modal → ขยับ popup ตามคำ (ปิดเมื่อคำหลุดจอ)
    document.addEventListener('scroll', ev => {
        const pop = document.getElementById('kwPopover');
        if (pop && !pop.contains(ev.target)) positionPopover();
    }, true);
    window.addEventListener('resize', positionPopover);

    // ---------- export ----------
    window.enhanceAbilityBox = enhanceAbilityBox;
    window.searchCardByName = searchCardByName;
    window.searchByTaxonomy = searchByTaxonomy;
    window.searchCardsByKeyword = searchCardsByKeyword;
    window.openGlossaryModal = openGlossaryModal;
    window.closeGlossaryModal = closeGlossaryModal;
    window.resolveCardRef = resolveCardRef;
})();
