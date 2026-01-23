function updateDynamicBackground() {
    const searchBar = document.getElementById('searchBar');
    const mainTitle = document.querySelector('.main-title span'); 
    const commander = myDeck.find(c => c.isCommander);

    // 1. ค่าเริ่มต้น
    const defaultBg = "url('images/smart_bg/defult_bg.jpg')"; 

    // แก้ปัญหาที่ต้นเหตุ: สั่งงานไปที่ CSS Variable ของ body เพื่อเปลี่ยนรูปใน ::before
    // วิธีนี้จะทำให้ตำแหน่ง Fixed ของปุ่ม Mobile ไม่ถูกคำนวณใหม่ (ไม่ขยับที่)
    const applyBgStyle = (bgValue) => {
        // ใช้การตั้งค่าผ่าน CSS Property เพื่อไม่ให้โครงสร้างหลักของ Body ไหวติง
        document.body.style.setProperty('--dynamic-bg', bgValue);
        
        // บังคับสไตล์ผ่านสไตล์ชีท (ย้ายการตั้งค่าหนักๆ ไปไว้ที่ CSS แทนการยัดผ่าน JS)
        // บรรทัดนี้จะเปลี่ยนรูปใน body::before ผ่านการเรียกใช้ variable
        document.body.style.backgroundImage = 'none'; // ล้างพื้นหลังที่ตัว body หลัก
        
        // สร้างสไตล์ชั่วคราวเพื่อคุม ::before (ทำครั้งเดียว)
        if (!document.getElementById('dynamic-bg-style')) {
            const style = document.createElement('style');
            style.id = 'dynamic-bg-style';
            style.innerHTML = `body::before { background-image: var(--dynamic-bg) !important; }`;
            document.head.appendChild(style);
        }
    };

    // 2. กรณีไม่มี Commander
    if (!commander) {
        applyBgStyle(defaultBg);
        
        if (searchBar) {
            searchBar.style.background = "rgba(0, 0, 0, 0.9)";
            searchBar.style.boxShadow = "none";
            searchBar.style.opacity = "0.9";
            searchBar.style.backdropFilter = "none";
        }
        if (mainTitle) {
            mainTitle.style.color = "#ffffff"; 
            mainTitle.style.textShadow = "none";
        }
        return;
    }

    // 3. ธีมสีตามเผ่า (ดึงค่าตามที่คุณกำหนดไว้)
    const clanThemes = {
        "สองขา": "url('images/smart_bg/2L.jpg')",
        "คอยาว": "url('images/smart_bg/ln.jpg')",
        "มีปีก": "url('images/smart_bg/wing.jpg')",
        "มีเขา":"url('images/smart_bg/horn.jpg')",
        "สัตว์น้ำ": "url('images/smart_bg/aqua.jpg')",
        "มีเกราะหางหนาม": "url('images/smart_bg/sh.jpg')",
        "จักรกล": "url('images/smart_bg/horn.jpg')",
    };

    let clanKey = Array.isArray(commander.clan) ? commander.clan[0] : commander.clan;
    const selectedTheme = clanThemes[clanKey] || defaultBg;

    // เปลี่ยนพื้นหลัง
    applyBgStyle(selectedTheme);

    // 4. เปลี่ยนสีหัวข้อ
    if (mainTitle) {
        mainTitle.style.color = "#FFFFFF"; 
        mainTitle.style.textShadow = "0 2px 4px rgba(0,0,0,0.5)";
    }

    // 5. ปรับ Search Bar
    if (searchBar) {
        searchBar.style.background = "rgba(255, 255, 255, 0.15)";
        searchBar.style.backdropFilter = "blur(10px)";
        searchBar.style.borderColor = "rgba(255, 255, 255, 0.3)";
        searchBar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    }
}