// =========================================================
//  deck_extras.js — โน้ตประจำเด็ค + จัดการคอลเล็คชั่น
//
//  1) โน้ตเด็ค : ช่องจดแผนการเล่น / การ์ดที่อยากเปลี่ยน ในแถบจัดเด็ค
//     - เด็คที่กำลังจัด: จำไว้ใน lc_deck_notes
//     - กด Save / Save As: บันทึกโน้ตไปกับเด็คในคอลเล็คชั่น (ช่อง notes) + เวลาแก้ล่าสุด (updatedAt)
//     - โหลดเด็คจากคอลเล็คชั่น: โน้ตของเด็คนั้นกลับมาด้วย
//  2) คอลเล็คชั่น : ค้นหาเด็ค (ชื่อ / โน้ต), เรียง (แก้ล่าสุด / ชื่อ / ฟอร์แมต / ลำดับที่เซฟ),
//     ปุ่มทำสำเนาเด็ค
// =========================================================

(function () {
    const NOTES_KEY = 'lc_deck_notes';
    const SORT_KEY = 'lc_collection_sort';
    const COLL_KEY = 'dinomaster_collections';
    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
    const readColl = () => { try { return JSON.parse(lsGet(COLL_KEY)) || []; } catch (e) { return []; } };
    const writeColl = list => lsSet(COLL_KEY, JSON.stringify(list));

    // ---------- 1. โน้ตเด็ค ----------
    function notesInput() { return document.getElementById('deckNotesInput'); }

    function updateNotesHint() {
        const box = document.getElementById('deckNotesBox');
        const input = notesInput();
        if (!box || !input) return;
        const has = input.value.trim().length > 0;
        box.classList.toggle('has-notes', has);
        const hint = document.getElementById('deckNotesHint');
        if (hint) hint.textContent = has ? `(${input.value.trim().length} ตัวอักษร)` : '';
    }

    function setDeckNotes(text) {
        const input = notesInput();
        if (input) input.value = text || '';
        lsSet(NOTES_KEY, text || '');
        updateNotesHint();
    }

    // หลัง Save / Save As: ใส่โน้ต + เวลาแก้ล่าสุด ให้เด็คที่เพิ่งเซฟ
    function stampSavedDeck() {
        if (window.lcLastWriteOk === false) return;
        if (typeof currentEditingDeckId === 'undefined' || currentEditingDeckId == null) return;
        const list = readColl();
        const item = list.find(d => String(d.id) === String(currentEditingDeckId));
        if (!item) return;
        const input = notesInput();
        item.notes = input ? input.value : (item.notes || '');
        item.updatedAt = Date.now();
        writeColl(list);
        if (typeof renderCollection === 'function' && isCollectionVisible()) renderCollection();
    }

    function wrapAfter(name, after) {
        const orig = window[name];
        if (typeof orig !== 'function' || orig['_lcAfter_' + after.name]) return;
        const w = function () {
            const r = orig.apply(this, arguments);
            try { after.apply(this, arguments); } catch (e) { console.warn(e); }
            return r;
        };
        w['_lcAfter_' + after.name] = true;
        Object.keys(orig).forEach(k => { w[k] = orig[k]; });
        window[name] = w;
    }

    // โหลดเด็คจากคอลเล็คชั่น → เอาโน้ตของเด็คนั้นมาด้วย
    function afterLoadDeck(id) {
        const item = readColl().find(d => String(d.id) === String(id));
        setDeckNotes(item ? (item.notes || '') : '');
    }

    // ---------- 2. คอลเล็คชั่น ----------
    function isCollectionVisible() {
        const v = document.getElementById('deckCollectionView');
        return !!v && getComputedStyle(v).display !== 'none';
    }

    let searchText = '';
    function getSort() { return lsGet(SORT_KEY) || 'updated'; }

    const updatedOf = d => d.updatedAt || (typeof d.id === 'number' ? d.id : Number(d.id) || 0);

    function sortDecks(list, mode) {
        const arr = list.map((d, i) => ({ d, i }));
        if (mode === 'updated') arr.sort((a, b) => updatedOf(b.d) - updatedOf(a.d));
        else if (mode === 'name') arr.sort((a, b) => String(a.d.name || '').localeCompare(String(b.d.name || ''), 'th'));
        else if (mode === 'format') arr.sort((a, b) => String(a.d.format || 'zz').localeCompare(String(b.d.format || 'zz')) || updatedOf(b.d) - updatedOf(a.d));
        return arr.map(x => x.d);
    }

    function relTime(ms) {
        if (!ms) return '';
        const days = Math.floor((Date.now() - ms) / 86400000);
        if (days <= 0) return 'วันนี้';
        if (days === 1) return 'เมื่อวาน';
        if (days < 30) return `${days} วันก่อน`;
        return new Date(ms).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' });
    }

    // วาดรายการเด็ค (แทน renderCollection เดิมใน collection_logic.js — หน้าตาเหมือนเดิม + ปุ่มสำเนา)
    function renderCollection() {
        const container = document.getElementById('collectionListContainer');
        if (!container) return;
        container.innerHTML = '';
        const all = readColl();
        const q = searchText.trim().toLowerCase();
        const shown = sortDecks(all, getSort())
            .filter(d => !q || String(d.name || '').toLowerCase().includes(q) || String(d.notes || '').toLowerCase().includes(q));

        const count = document.getElementById('collCount');
        if (count) count.textContent = q ? `${shown.length} / ${all.length} เด็ค` : `${all.length} เด็ค`;

        shown.forEach(item => {
            const cardItem = document.createElement('div');
            cardItem.className = 'collection-card-item';
            const coverImg = item.cover || (item.cards && item.cards[0] ? item.cards[0].image : 'images/default-bg.jpg');
            cardItem.style.backgroundImage = `url('${coverImg}')`;
            const fmt = item.format && typeof getDeckFormatName === 'function' ? getDeckFormatName(item.format) : '';
            const when = relTime(updatedOf(item));
            cardItem.innerHTML = `
                <div class="deck-overlay" onclick="loadFromCollection('${esc(item.id)}')">
                    <div class="deck-info">
                        <h4>${esc(item.name)}</h4>
                        <span>🃏 ${(item.cards || []).length} ใบ</span>
                        ${fmt ? `<span class="coll-format-badge">${esc(fmt)}</span>` : ''}
                        ${item.notes && item.notes.trim() ? `<span class="coll-note-badge" title="${esc(item.notes.slice(0, 200))}">📝 มีโน้ต</span>` : ''}
                        ${when ? `<span class="coll-when">แก้ล่าสุด ${esc(when)}</span>` : ''}
                    </div>
                </div>
                <button class="dup-deck-btn" title="ทำสำเนาเด็คนี้" onclick="duplicateDeck(event, '${esc(item.id)}')">⧉</button>
                <button class="delete-deck-btn" title="ลบเด็ค" onclick="confirmDeleteDeck(event, '${esc(item.id)}')">✕</button>`;
            container.appendChild(cardItem);
        });

        if (q && !shown.length) {
            const p = document.createElement('p');
            p.className = 'coll-empty';
            p.textContent = `ไม่พบเด็คที่มีคำว่า "${searchText.trim()}"`;
            container.appendChild(p);
        }
        if (typeof createAddDeckButton === 'function') createAddDeckButton(container);
    }

    function duplicateDeck(ev, id) {
        if (ev) { ev.stopPropagation(); ev.preventDefault(); }
        const list = readColl();
        const idx = list.findIndex(d => String(d.id) === String(id));
        if (idx === -1) return;
        const copy = JSON.parse(JSON.stringify(list[idx]));
        copy.id = Date.now();
        copy.name = `${list[idx].name || 'เด็ค'} (สำเนา)`;
        copy.updatedAt = Date.now();
        copy.timestamp = new Date().toLocaleString();
        list.splice(idx + 1, 0, copy);
        writeColl(list);
        if (window.lcLastWriteOk === false) return;
        if (typeof showQuickFeedback === 'function') showQuickFeedback(null, `ทำสำเนา "${list[idx].name}" แล้ว`, '#2ecc71');
        window.renderCollection();
    }

    function onCollSearch(v) { searchText = v || ''; window.renderCollection(); }
    function onCollSort(v) { lsSet(SORT_KEY, v); window.renderCollection(); }

    // ---------- ติดตั้ง ----------
    window.renderCollection = renderCollection;
    window.duplicateDeck = duplicateDeck;
    window.onCollSearch = onCollSearch;
    window.onCollSort = onCollSort;
    window.setDeckNotes = setDeckNotes;

    document.addEventListener('DOMContentLoaded', () => {
        // โน้ต: โหลดค่าที่ค้างไว้ + บันทึกทุกครั้งที่พิมพ์
        const input = notesInput();
        if (input) {
            input.value = lsGet(NOTES_KEY) || '';
            input.addEventListener('input', () => {
                lsSet(NOTES_KEY, input.value);
                if (typeof isUnsaved !== 'undefined' && typeof myDeck !== 'undefined' && myDeck.length) isUnsaved = true;
                updateNotesHint();
            });
        }
        updateNotesHint();

        const sortSel = document.getElementById('collSortSelect');
        if (sortSel) sortSel.value = getSort();

        wrapAfter('saveOverwrite', stampSavedDeck);
        wrapAfter('saveAsNew', stampSavedDeck);
        wrapAfter('loadFromCollection', afterLoadDeck);
    });
})();
