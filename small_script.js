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

// 2. ระบบโหมดจัดเด็ค (เปิด-ปิด ปุ่มเขียวบนการ์ด)
function toggleMobileDeckMode() {
    isEditMode = !isEditMode; // ห้ามใส่ let/const ตรงนี้ เพราะเราจะใช้ตัวแปร Global
    const btn = document.getElementById('mobileEditModeBtn');
    const body = document.body;

    if (isEditMode) {
        body.classList.add('edit-mode-on');
        if (btn) {
            btn.classList.add('active');
            const icon = document.getElementById('editIcon');
            const text = document.getElementById('editText');
            if (icon) icon.innerText = "❌";
            if (text) text.innerText = "เสร็จสิ้น";
        }
    } else {
        body.classList.remove('edit-mode-on');
        if (btn) {
            btn.classList.remove('active');
            const icon = document.getElementById('editIcon');
            const text = document.getElementById('editText');
            if (icon) icon.innerText = "➕";
            if (text) text.innerText = "โหมดจัดเด็ค";
        }
    }

    if (isEditMode) {
        body.classList.add('edit-mode-on');
        showEditModeHint(); // <--- เพิ่มบรรทัดนี้: แสดงเมื่อเปิดโหมด
        // ...
    } else {
        body.classList.remove('edit-mode-on');
        // ...
    }

    console.log("Current Edit Mode:", isEditMode); // ลองใส่เพื่อเช็คใน Console ของมือถือ
}

// 3. ระบบเปิด-ปิด Side Panel (หน้าจัดเด็ค)
function closeSidePanel() {
    const sidePanel = document.getElementById('deckSidePanel');
    const mainContent = document.getElementById("mainContent") || document.getElementById("main");
    
    if (sidePanel) {
        sidePanel.classList.remove('open');
        
        // ล้างค่าสำหรับ PC
        sidePanel.style.right = (window.innerWidth <= 768) ? "" : "-300px";
        
        if (mainContent) {
            mainContent.style.marginRight = "0";
            mainContent.style.width = "100%";
        }
    }
    
}


// ปรับ toggleSidePanel ให้ฉลาดขึ้นและกว้างขึ้น
function toggleSidePanel() {
    const sidePanel = document.getElementById('deckSidePanel');
    const mainWrapper = document.getElementById("main-wrapper");

    if (!sidePanel) return;

    const isMobile = window.innerWidth <= 768;
    const isOpen = sidePanel.classList.toggle('open');

    if (!isMobile) {
        /* --- ระบบสำหรับ PC (ดันหน้าจอ) --- */
        if (isOpen) {
            // ดึงพาเนลออกมาให้สุดขอบขวา
            sidePanel.style.right = "0";
            if (mainWrapper) {
                // ดันพื้นที่คลังการ์ดหลบไปทางซ้าย (700px + ระยะห่าง 20px)
                mainWrapper.style.paddingRight = "720px"; 
            }
            document.body.classList.add('panel-open');
        } 
        else {
            // ซ่อนพาเนลไปทางขวา (ต้องติดลบเท่ากับความกว้างใหม่ใน CSS)
            sidePanel.style.right = "-700px";
            if (mainWrapper) {
                mainWrapper.style.paddingRight = "20px"; // กลับไปค่า Default
            }
            document.body.classList.remove('panel-open');
        }
    } else {
        /* --- ระบบสำหรับมือถือ (เลื่อนทับ) --- */
        sidePanel.style.right = ""; 
        if (mainWrapper) {
            mainWrapper.style.paddingRight = "";
            mainWrapper.style.width = "";
        }
    }

    if (sidePanel.classList.contains('open')) {
        if (typeof showEditModeHint === 'function') showEditModeHint();
    }
    renderCards(currentFilteredCards);

}

// ฟังก์ชันสลับสถานะไอคอนและคลาสหลัก
function toggleDeckPanel() {
    const panel = document.getElementById('deckSidePanel');
    const body = document.body;

    if (!panel) return;

    // เรียกใช้ฟังก์ชันหลักเพื่อจัดการเรื่องขนาดและการดันหน้าจอ
    toggleSidePanel();

    // อัปเดตไอคอนที่ปุ่มกด
    const icon = panel.querySelector('.triangle-icon');
    if (icon) {
        icon.innerText = panel.classList.contains('open') ? "▶" : "◀";
    }

    // สั่งให้ Grid คำนวณใหม่เพื่อให้การ์ดจัดเรียงตัวถูกต้อง
    window.dispatchEvent(new Event('resize'));
}

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

