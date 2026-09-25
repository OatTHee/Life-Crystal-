// =========================================================
//  ux_extras.js — ความสะดวกเวลาดูการ์ด
//   1) การ์ดโปรด ★ + การ์ดที่ดูล่าสุด 🕘  (ปุ่มดาวในหน้าการ์ด / ปุ่มกรองใต้แถบเรียง)
//   2) มือถือ: ปัดซ้าย-ขวาในหน้าต่างการ์ดเพื่อเปลี่ยนใบ / แตะรูปการ์ดเพื่อดูรูปใหญ่ (ซูมด้วยสองนิ้วได้)
//   3) คีย์ลัด: "/" ไปที่ช่องค้นหา · Esc ในช่องค้นหา = ล้างคำค้น
//   4) ปุ่ม A− / A+ ปรับขนาดตัวอักษรความสามารถ (จำไว้ในเครื่อง)
// =========================================================

(function () {
    const FAV_KEY = 'lc_fav_cards';
    const RECENT_KEY = 'lc_recent_cards';
    const SCALE_KEY = 'lc_ability_scale';
    const RECENT_MAX = 40;

    const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
    const readList = k => { try { const v = JSON.parse(lsGet(k)); return Array.isArray(v) ? v : []; } catch (e) { return []; } };

    let favs = readList(FAV_KEY);
    let recent = readList(RECENT_KEY);
    window.lcListFilter = null; // 'fav' | 'recent' | null

    const modalOpen = () => { const m = document.getElementById('imageModal'); return !!m && m.style.display === 'flex'; };

    // ---------- 1. การ์ดโปรด / ดูล่าสุด ----------
    function isFav(id) { return favs.includes(String(id)); }

    function toggleFav(id) {
        id = String(id);
        favs = isFav(id) ? favs.filter(x => x !== id) : [id, ...favs];
        lsSet(FAV_KEY, JSON.stringify(favs));
        document.querySelectorAll(`.fav-star[data-fav="${CSS.escape(id)}"]`).forEach(renderStar);
        renderQuickLists();
        if (window.lcListFilter === 'fav' && typeof filterCards === 'function') filterCards();
        if (typeof showQuickFeedback === 'function') {
            showQuickFeedback(null, isFav(id) ? '★ เพิ่มในการ์ดโปรดแล้ว' : 'เอาออกจากการ์ดโปรดแล้ว', isFav(id) ? '#f1c40f' : '#aaa');
        }
    }

    function renderStar(btn) {
        const on = isFav(btn.dataset.fav);
        btn.classList.toggle('is-on', on);
        btn.textContent = on ? '★' : '☆';
        btn.title = on ? 'เอาออกจากการ์ดโปรด' : 'เพิ่มเป็นการ์ดโปรด';
        btn.setAttribute('aria-pressed', String(on));
    }

    function pushRecent(id) {
        id = String(id);
        recent = [id, ...recent.filter(x => x !== id)].slice(0, RECENT_MAX);
        lsSet(RECENT_KEY, JSON.stringify(recent));
        renderQuickLists();
    }

    function renderQuickLists() {
        const bar = document.getElementById('quickLists');
        if (!bar) return;
        const f = window.lcListFilter;
        bar.innerHTML = `
            <button type="button" class="ql-btn ${f === 'fav' ? 'active' : ''}" data-ql="fav" title="แสดงเฉพาะการ์ดโปรด">★ การ์ดโปรด <small>${favs.length}</small></button>
            <button type="button" class="ql-btn ${f === 'recent' ? 'active' : ''}" data-ql="recent" title="การ์ดที่เปิดดูล่าสุด (ใหม่ → เก่า)">🕘 ดูล่าสุด <small>${recent.length}</small></button>
            ${f === 'recent' && recent.length ? `<button type="button" class="ql-clear" data-ql="clear-recent">ล้างประวัติ</button>` : ''}`;
    }

    function setListFilter(mode) {
        window.lcListFilter = (window.lcListFilter === mode) ? null : mode;
        renderQuickLists();
        if (typeof filterCards === 'function') filterCards();
    }

    // กรองต่อจากผลของตัวกรองปกติ
    function applyListFilter() {
        const f = window.lcListFilter;
        if (!f || typeof currentFilteredCards === 'undefined') return;
        if (f === 'fav') {
            const set = new Set(favs);
            currentFilteredCards = currentFilteredCards.filter(c => set.has(String(c.id)));
        } else if (f === 'recent') {
            const out = [];
            recent.forEach(id => {
                const c = currentFilteredCards.find(x => String(x.id) === id);
                if (c) out.push(c);
            });
            currentFilteredCards = out;
        }
        if (typeof renderCards === 'function') renderCards(currentFilteredCards);
    }

    // ---------- 4. ขนาดตัวอักษรความสามารถ ----------
    const SCALES = [0.85, 1, 1.15, 1.3, 1.5];
    function getScale() { const v = parseFloat(lsGet(SCALE_KEY)); return SCALES.includes(v) ? v : 1; }
    function applyScale() {
        document.documentElement.style.setProperty('--lc-ability-scale', getScale());
    }
    function stepScale(dir) {
        const i = SCALES.indexOf(getScale());
        const next = SCALES[Math.max(0, Math.min(SCALES.length - 1, i + dir))];
        lsSet(SCALE_KEY, String(next));
        applyScale();
        document.querySelectorAll('.ab-font [data-font]').forEach(b => {
            b.disabled = (b.dataset.font === '-1' && next === SCALES[0]) || (b.dataset.font === '1' && next === SCALES[SCALES.length - 1]);
        });
    }

    // ---------- ตกแต่งหน้าต่างการ์ดทุกครั้งที่เปิด ----------
    function decorateModal() {
        const card = window._lcModalCard;
        const info = document.getElementById('modalInfo');
        if (!card || !info) return;
        pushRecent(card.id);

        const h2 = info.querySelector('h2');
        if (h2 && !h2.querySelector('.fav-star')) {
            const star = document.createElement('button');
            star.type = 'button';
            star.className = 'fav-star';
            star.dataset.fav = String(card.id);
            h2.appendChild(star);
            renderStar(star);
        }

        const box = info.querySelector('.ability-box');
        const head = box && box.querySelector('strong');
        if (head && !box.querySelector('.ab-font')) {
            const ctl = document.createElement('span');
            ctl.className = 'ab-font';
            ctl.innerHTML = `<button type="button" data-font="-1" title="ตัวอักษรเล็กลง" aria-label="ตัวอักษรเล็กลง">A−</button><button type="button" data-font="1" title="ตัวอักษรใหญ่ขึ้น" aria-label="ตัวอักษรใหญ่ขึ้น">A+</button>`;
            head.after(ctl);
            const s = getScale();
            ctl.querySelector('[data-font="-1"]').disabled = s === SCALES[0];
            ctl.querySelector('[data-font="1"]').disabled = s === SCALES[SCALES.length - 1];
        }

        const img = document.getElementById('modalImg');
        if (img) img.title = 'แตะเพื่อดูรูปใหญ่';
    }

    // ---------- 2. ปัดเปลี่ยนการ์ด / แตะดูรูปใหญ่ ----------
    let touch = null;
    function onTouchStart(e) {
        if (!modalOpen() || e.touches.length !== 1) { touch = null; return; }
        if (document.getElementById('kwPopover')) { touch = null; return; }
        touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
    }
    function onTouchEnd(e) {
        if (!touch || !modalOpen()) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touch.x, dy = t.clientY - touch.y;
        const quick = Date.now() - touch.t < 600;
        touch = null;
        if (quick && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && typeof navigateModal === 'function') {
            navigateModal(dx < 0 ? 1 : -1);
        }
    }

    function openImageZoom() {
        const img = document.getElementById('modalImg');
        const card = window._lcModalCard;
        if (!img || !img.src) return;
        if (typeof openFullSecretArt === 'function') {
            openFullSecretArt(img.src, card ? (card.nameTH || card.nameEN) : '');
            const ov = document.getElementById('secretArtOverlay');
            if (ov) {
                ov.classList.add('lc-zoom-overlay');
                const im = ov.querySelector('img');
                if (im) im.style.border = 'none';
            }
        }
    }

    // ---------- event รวม ----------
    document.addEventListener('click', ev => {
        const t = ev.target;
        const star = t.closest && t.closest('.fav-star');
        if (star) { ev.stopPropagation(); toggleFav(star.dataset.fav); return; }
        const font = t.closest && t.closest('.ab-font [data-font]');
        if (font) { ev.stopPropagation(); stepScale(parseInt(font.dataset.font, 10)); return; }
        const ql = t.closest && t.closest('#quickLists [data-ql]');
        if (ql) {
            if (ql.dataset.ql === 'clear-recent') {
                recent = []; lsSet(RECENT_KEY, '[]'); renderQuickLists();
                if (typeof filterCards === 'function') filterCards();
            } else setListFilter(ql.dataset.ql);
            return;
        }
        if (t.id === 'modalImg' && modalOpen()) openImageZoom();
    }, true); // capture: หน้าต่างการ์ดหยุด event ไม่ให้ขึ้นไปถึง document

    // ---------- 3. คีย์ลัด ----------
    document.addEventListener('keydown', e => {
        const el = document.activeElement;
        const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
        const input = document.getElementById('searchInput');
        if (e.key === '/' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey && !modalOpen()) {
            if (input) {
                e.preventDefault();
                input.focus();
                input.select();
                const bar = document.getElementById('searchBar');
                if (bar) bar.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        } else if (e.key === 'Escape' && el === input) {
            if (input.value) {
                input.value = '';
                if (typeof filterCards === 'function') filterCards();
            } else input.blur();
        }
    });

    // ---------- ติดตั้ง ----------
    function wrap(name, { before, after }) {
        const orig = window[name];
        if (typeof orig !== 'function') return;
        const w = function () {
            if (before) before.apply(this, arguments);
            const r = orig.apply(this, arguments);
            if (after) try { after.apply(this, arguments); } catch (err) { console.warn(err); }
            return r;
        };
        Object.keys(orig).forEach(k => { w[k] = orig[k]; });
        window[name] = w;
    }

    applyScale();
    document.addEventListener('DOMContentLoaded', () => {
        // แถบ ★ / 🕘 ใต้แถบเรียงลำดับ
        const sortBar = document.getElementById('cardSortBar');
        if (sortBar && !document.getElementById('quickLists')) {
            const bar = document.createElement('div');
            bar.id = 'quickLists';
            bar.className = 'quick-lists';
            sortBar.after(bar);
        }
        renderQuickLists();

        wrap('filterCards', { after: applyListFilter });
        wrap('resetFilters', { before: () => { window.lcListFilter = null; renderQuickLists(); } });
        wrap('openModal', { after: decorateModal });

        // ช่องค้นหา / ตัวกรองบางตัวผูก event กับ filterCards ตัวเดิมตรงๆ → กรองรายการโปรด/ล่าสุดซ้ำหลังจากนั้น
        const later = () => { if (window.lcListFilter) setTimeout(applyListFilter, 0); };
        const si = document.getElementById('searchInput');
        if (si) si.addEventListener('input', later);
        const sb = document.getElementById('searchBar');
        if (sb) sb.addEventListener('change', later);

        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.addEventListener('touchstart', onTouchStart, { passive: true });
            modal.addEventListener('touchend', onTouchEnd, { passive: true });
        }
    });

    window.toggleFavCard = toggleFav;
    window.isFavCard = isFav;
})();
