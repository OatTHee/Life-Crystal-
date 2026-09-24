/* ======================================================
   SCRIPTS FOR MOBILE & SIDE PANEL
   ====================================================== */

   
// 1. ระบบปุ่ม Back to Top
const backToTopButton = document.querySelector("#backToTop");

if (backToTopButton) {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 2. โหมดของเว็บ: 'browse' (ดูการ์ด) / 'build' (จัดเด็ค)
// ---------------------------------------------------------------
// หน้าเดียวกัน แต่ "ผลจากเด็ค" จะทำงานเฉพาะโหมดจัดเด็คเท่านั้น ได้แก่
//   - เรียงการ์ดตามเผ่า Commander / Life Crystal + ดันการ์ดเทาไปท้าย
//   - การ์ดเทา (เผ่าไม่ตรง / ติดกฎ LC-Commander / โดนแบน)
//   - Smart BG ตามเผ่า Commander
//   - เงื่อนไขแบน/ลิมิตที่ขึ้นกับการ์ดในเด็ค
//   - ปุ่ม + เพิ่ม, กดค้าง/คลิกขวาเพื่อเพิ่ม, ปุ่มตั้ง Commander ใน modal
// โหมดดูการ์ดไม่ลบเด็คจริง (myDeck ยังอยู่ครบ) แค่ไม่เอามาคิด
// เปิดเว็บมาเป็นโหมดดูการ์ดเสมอ
var appMode = 'browse';

function isBuildMode() {
    return appMode === 'build';
}

// เด็คที่ใช้คิดกฎต่างๆ — โหมดดูการ์ดถือว่าเด็คว่าง
function getRuleDeck() {
    if (!isBuildMode()) return [];
    return (typeof myDeck !== 'undefined' && Array.isArray(myDeck)) ? myDeck : [];
}

// เปลี่ยนโหมด
//   opts.openPanel : false = ไม่ต้องเปิดพาเนลเด็คให้อัตโนมัติ (ค่าเริ่มต้น: PC เปิดให้ / มือถือไม่เปิด)
//   opts.skipRender: true  = ไม่ต้องวาดคลังการ์ดใหม่ (ผู้เรียกจะวาดเอง)
function setAppMode(mode, opts) {
    opts = opts || {};
    const next = (mode === 'build') ? 'build' : 'browse';
    const changed = next !== appMode;
    appMode = next;

    const body = document.body;
    body.classList.toggle('mode-build', next === 'build');
    body.classList.toggle('mode-browse', next !== 'build');

    // isEditMode = ตัวแปรเดิมของโหมดจัดเด็คบนมือถือ ให้เดินตามโหมดหลักเสมอ
    isEditMode = (next === 'build');
    body.classList.toggle('edit-mode-on', isEditMode);

    const panel = document.getElementById('deckSidePanel');
    const isMobile = window.innerWidth <= 768;
    if (panel) {
        if (next === 'browse') {
            if (panel.classList.contains('open')) applySidePanelState(false);
        } else if (!isMobile && opts.openPanel !== false && !panel.classList.contains('open')) {
            applySidePanelState(true);
        }
    }

    updateAppModeUI();
    if (typeof updateDynamicBackground === 'function') updateDynamicBackground();

    if (!opts.skipRender && typeof renderCards === 'function' && typeof currentFilteredCards !== 'undefined') {
        renderCards(currentFilteredCards);
    }
    if (changed && next === 'build' && typeof showEditModeHint === 'function') showEditModeHint();
}

// อัปเดตหน้าตาปุ่มสลับโหมด (PC: ปุ่มคู่บนแถบค้นหา / มือถือ: ปุ่มลอย)
function updateAppModeUI() {
    const build = isBuildMode();

    document.querySelectorAll('#appModeSwitch [data-mode]').forEach(btn => {
        const active = btn.getAttribute('data-mode') === appMode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const btn = document.getElementById('mobileEditModeBtn');
    if (btn) {
        btn.classList.toggle('active', build);
        const icon = document.getElementById('editIcon');
        const text = document.getElementById('editText');
        if (icon) icon.innerText = build ? "❌" : "➕";
        if (text) text.innerText = build ? "เสร็จสิ้น" : "โหมดจัดเด็ค";
    }
}

// ปุ่มลอยบนมือถือ = ตัวสลับโหมด
function toggleMobileDeckMode() {
    setAppMode(isBuildMode() ? 'browse' : 'build');
}

// 3. ระบบเปิด-ปิด Side Panel (หน้าจัดเด็ค)
// ย่อ/ขยายพาเนลเป็นแค่การจัดหน้าจอ "ภายในโหมดจัดเด็ค" ไม่ได้เปลี่ยนโหมด
function closeSidePanel() {
    const sidePanel = document.getElementById('deckSidePanel');
    if (sidePanel && sidePanel.classList.contains('open')) applySidePanelState(false);
}

// จัดการเฉพาะหน้าตา/Layout ของพาเนล (ไม่วาดการ์ดใหม่)
function applySidePanelState(open) {
    const sidePanel = document.getElementById('deckSidePanel');
    const mainWrapper = document.getElementById("main-wrapper");
    if (!sidePanel) return;

    const isMobile = window.innerWidth <= 768;
    sidePanel.classList.toggle('open', open);

    if (!isMobile) {
        /* --- ระบบสำหรับ PC (ดันหน้าจอ) --- */
        if (open) {
            sidePanel.style.right = "0";
            // ดันพื้นที่คลังการ์ดหลบไปทางซ้าย (700px + ระยะห่าง 20px)
            if (mainWrapper) mainWrapper.style.paddingRight = "720px";
            document.body.classList.add('panel-open');
        } else {
            // ซ่อนพาเนลไปทางขวา (ต้องติดลบเท่ากับความกว้างใน CSS)
            sidePanel.style.right = "-700px";
            if (mainWrapper) mainWrapper.style.paddingRight = "20px"; // กลับไปค่า Default
            document.body.classList.remove('panel-open');
        }
    } else {
        /* --- ระบบสำหรับมือถือ (เลื่อนทับ) --- */
        sidePanel.style.right = "";
        if (mainWrapper) {
            mainWrapper.style.paddingRight = "";
            mainWrapper.style.width = "";
        }
        document.body.classList.remove('panel-open');
    }

    const icon = sidePanel.querySelector('.triangle-icon');
    if (icon) icon.innerText = open ? "▶" : "◀";

    // สั่งให้ Grid คำนวณใหม่เพื่อให้การ์ดจัดเรียงตัวถูกต้อง
    window.dispatchEvent(new Event('resize'));
}

function toggleSidePanel() {
    const sidePanel = document.getElementById('deckSidePanel');
    if (!sidePanel) return;

    const willOpen = !sidePanel.classList.contains('open');

    // เปิดพาเนลเด็คจากโหมดดูการ์ด = เข้าโหมดจัดเด็คด้วย
    if (willOpen && !isBuildMode()) setAppMode('build', { openPanel: false, skipRender: true });

    applySidePanelState(willOpen);

    if (willOpen && typeof showEditModeHint === 'function') showEditModeHint();
    renderCards(currentFilteredCards);
}

// ชื่อเดิม (ยังมีที่เรียกใช้)
function toggleDeckPanel() {
    toggleSidePanel();
}

// ตั้งค่าเริ่มต้นตอนเปิดเว็บ: โหมดดูการ์ดเสมอ
document.addEventListener('DOMContentLoaded', () => {
    setAppMode('browse', { skipRender: true });
});

// --- Info Modal Logic ---
function openInfoModal() {
    const modal = document.getElementById('siteInfoModal');
    modal.style.display = 'flex';
}

function closeInfoModal() {
    const modal = document.getElementById('siteInfoModal');
    modal.style.display = 'none';
}

// ปิด Modal เมื่อคลิกพื้นที่ว่างๆ รอบนอก
window.addEventListener('click', function(event) {
    const modal = document.getElementById('siteInfoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

