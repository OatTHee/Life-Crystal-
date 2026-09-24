// =========================================================
//  whats_new.js — ปุ่ม "✨ มีอะไรใหม่" ข้างหัวเว็บ
//
//  - ไม่เด้งขึ้นมาเอง: เป็นปุ่มเล็กมีจุดกระพริบชวนกด จนกว่าผู้ใช้จะเปิดดูเวอร์ชันนั้นแล้ว
//  - อัปเดตครั้งหน้า: แก้ WHATS_NEW_VERSION เป็นค่าใหม่ + แก้รายการ WHATS_NEW_ITEMS
//    (จุดกระพริบจะกลับมาให้ทุกคนอีกครั้ง)
// =========================================================

const WHATS_NEW_VERSION = '2026-09';
const WHATS_NEW_TITLE = 'อัปเดตใหญ่ กันยายน 2026';

// action (ไม่บังคับ) = ปุ่ม "ลองเลย" — ชื่อฟังก์ชันใน WHATS_NEW_ACTIONS ด้านล่าง
const WHATS_NEW_ITEMS = [
    { icon: '🔍', title: 'กดชื่อการ์ดในความสามารถ = ค้นหาทันที',
      desc: 'ชื่อการ์ดที่เป็นป้ายสีฟ้าในหน้าการ์ด กดแล้วค้นหาให้เลย พร้อมป้าย "← กลับไปที่การ์ดเดิม" (ปุ่มย้อนกลับของมือถือก็ใช้ได้)' },
    { icon: '📖', title: 'อภิธานศัพท์คีย์เวิร์ด & สภาวะ',
      desc: 'คำที่เป็นป้ายเหลืองขีดเส้นประ กดดูความหมายได้ และดูต่อยอดไปคำอื่นได้', action: 'glossary', actionLabel: 'เปิดคำศัพท์' },
    { icon: '🧬', title: 'กดอนุกรมวิธาน = กรองการ์ดวงศ์เดียวกัน',
      desc: 'ในหน้าการ์ด เปิด "ข้อมูลขั้นสูง" แล้วกดป้ายวงศ์ได้เลย' },
    { icon: '⚖️', title: 'ฟอร์แมตรายเด็ค + ตรวจเด็คลงแข่ง',
      desc: 'แต่ละเด็คจำฟอร์แมตของตัวเอง และบอกทันทีว่าผิดกฎข้อไหน (จำนวนการ์ด / Master / แบน / เผ่า / กฎคลาสสิค)', action: 'build', actionLabel: 'ไปจัดเด็ค' },
    { icon: '📝', title: 'ใบลงทะเบียนเด็คสำหรับทัวร์',
      desc: 'กรอกชื่อในเซิร์ฟเวอร์ แล้วพิมพ์ / บันทึกเป็น PDF ได้เลย ลิงก์เด็คในไฟล์กดได้' },
    { icon: '🔗', title: 'ลิงก์เด็คสั้นลง ~3 เท่า',
      desc: 'ลิงก์ใหม่พกชื่อเด็ค ฟอร์แมต และอาร์ตที่เลือกไปด้วย (ลิงก์เก่ายังใช้ได้)' },
    { icon: '🧩', title: 'นับการ์ดที่มีจริง',
      desc: 'ในหน้า "ดูเต็มจอ" เอากองการ์ดมาเทียบ แตะนับใบที่มี ใบที่ยังเทา = ขาด คัดลอกรายการที่ขาดได้' },
    { icon: '💾', title: 'สำรอง / กู้คืนข้อมูลทั้งหมด',
      desc: 'เด็คทุกใบเก็บอยู่ในเบราว์เซอร์ — กดสำรองเก็บไว้เป็นไฟล์ กันข้อมูลหายหรือย้ายเครื่อง', action: 'backup', actionLabel: 'ไปหน้าสำรอง' },
    { icon: '🔎', title: 'ค้นหาไม่เจอ? เว็บช่วยหา',
      desc: 'บอกว่าติดตัวกรองอะไรอยู่ กดล้างได้ทันที และแนะนำชื่อการ์ดที่ใกล้เคียงเมื่อพิมพ์ผิด' },
    { icon: '🧹', title: 'หน้าจัดเด็คใหม่ สะอาดตา',
      desc: 'ปุ่มที่ใช้ไม่บ่อยรวมอยู่ในเมนู ⋯ / ตัวกรองพับเก็บได้ มีตัวเลขบอกว่าเปิดตัวกรองอยู่กี่อย่าง' }
];

(function () {
    const SEEN_KEY = 'lc_whats_new_seen';
    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const seen = () => { try { return localStorage.getItem(SEEN_KEY) === WHATS_NEW_VERSION; } catch (e) { return false; } };
    const markSeen = () => { try { localStorage.setItem(SEEN_KEY, WHATS_NEW_VERSION); } catch (e) {} };

    // ปุ่ม "ลองเลย"
    const WHATS_NEW_ACTIONS = {
        glossary() { if (typeof openGlossaryModal === 'function') openGlossaryModal(); },
        build() {
            if (typeof setAppMode === 'function') setAppMode('build');
            if (window.innerWidth <= 768 && typeof applySidePanelState === 'function') applySidePanelState(true);
        },
        backup() {
            if (typeof setAppMode === 'function') setAppMode('build');
            if (typeof applySidePanelState === 'function') applySidePanelState(true);
            const coll = document.getElementById('deckCollectionView');
            if (coll && getComputedStyle(coll).display === 'none' && typeof handleCollectionNavigation === 'function') {
                handleCollectionNavigation();
            }
        }
    };

    function updateButton() {
        const btn = document.getElementById('whatsNewBtn');
        if (btn) btn.classList.toggle('is-new', !seen());
    }

    function closeWhatsNew() {
        const m = document.getElementById('whatsNewModal');
        if (m) m.remove();
    }

    function openWhatsNew() {
        closeWhatsNew();
        markSeen();
        updateButton();
        const wrap = document.createElement('div');
        wrap.id = 'whatsNewModal';
        wrap.className = 'lc-dialog-backdrop';
        wrap.innerHTML = `
            <div class="lc-dialog whats-new-box" role="dialog" aria-labelledby="whatsNewTitle">
                <div class="lc-dialog-head">
                    <h3 id="whatsNewTitle">✨ มีอะไรใหม่</h3>
                    <button type="button" class="lc-dialog-x" data-wn="close" aria-label="ปิด">✕</button>
                </div>
                <p class="lc-dialog-sub">${esc(WHATS_NEW_TITLE)}</p>
                <ul class="whats-new-list">
                    ${WHATS_NEW_ITEMS.map(it => `
                    <li>
                        <span class="wn-icon">${it.icon}</span>
                        <div class="wn-body">
                            <b>${esc(it.title)}</b>
                            <small>${esc(it.desc)}</small>
                            ${it.action ? `<button type="button" class="wn-try" data-wn="${esc(it.action)}">${esc(it.actionLabel || 'ลองเลย')} →</button>` : ''}
                        </div>
                    </li>`).join('')}
                </ul>
            </div>`;
        wrap.addEventListener('click', e => {
            if (e.target === wrap) { closeWhatsNew(); return; }
            const b = e.target.closest('[data-wn]');
            if (!b) return;
            const act = b.dataset.wn;
            closeWhatsNew();
            if (act !== 'close' && WHATS_NEW_ACTIONS[act]) WHATS_NEW_ACTIONS[act]();
        });
        document.body.appendChild(wrap);
    }

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWhatsNew(); });
    document.addEventListener('DOMContentLoaded', updateButton);

    window.openWhatsNew = openWhatsNew;
})();
