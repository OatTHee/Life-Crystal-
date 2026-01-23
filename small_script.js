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

// ปรับ toggleSidePanel ให้ฉลาดขึ้น
function toggleSidePanel() {
    const sidePanel = document.getElementById('deckSidePanel');
    // อ้างอิง ID Wrapper หลักของคุณ
    const mainWrapper = document.getElementById("main-wrapper");
    


    if (!sidePanel) return;

    // เช็คขนาดหน้าจอ
    const isMobile = window.innerWidth <= 768;
    const isOpen = sidePanel.classList.toggle('open');

    if (!isMobile) {
        /* --- ระบบสำหรับ PC (ดันหน้าจอ) --- */
        if (isOpen) {
            sidePanel.style.right = "0";
            if (mainWrapper) {
                // ดัน Padding หรือ Margin ตามที่คุณตั้งค่าไว้ใน CSS
                mainWrapper.style.paddingRight = "570px"; 
            }
            document.body.classList.add('panel-open');
        } 
        else {
            sidePanel.style.right = "-550px";
            if (mainWrapper) {
                mainWrapper.style.paddingRight = "20px"; // กลับไปค่า Default
            }
            document.body.classList.remove('panel-open');
        }
            } else {
        /* --- ระบบสำหรับมือถือ (เลื่อนทับ) --- */
        // ล้างค่า Style ของ PC ออกให้หมดเพื่อให้ CSS Media Query คุมแทน
        sidePanel.style.right = ""; 
        if (mainWrapper) {
            mainWrapper.style.paddingRight = "";
            mainWrapper.style.width = "";
        }
        // การเลื่อน เปิด-ปิด จะใช้ Class .open ที่คุมโดย responsive.css
    }

    if (!sidePanel.classList.contains('panel open')) {
        showEditModeHint(); // <--- เพิ่มบรรทัดนี้: แสดงเมื่อเปิดแผงจัดเด็ค 
        }
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