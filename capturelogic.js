async function exportToPNG() {
    const btn = document.querySelector('button[onclick="exportToPNG()"]'); 
// 1. เปลี่ยนจาก innerText เป็น innerHTML เพื่อเก็บ <i> tag ไว้ด้วย
const originalContent = btn ? btn.innerHTML : ''; 

if(btn) {
    // 2. แสดงสถานะโหลด (ยังคงไอคอนไว้หรือเปลี่ยนเป็นข้อความชั่วคราวก็ได้)
    btn.innerHTML = '⏳ กำลังสร้างรูป...'; 
    btn.disabled = true;
    btn.style.opacity = "0.7";
}
    const exportArea = document.createElement('div');
    // บังคับความกว้าง 1920px สูงยืดหยุ่น (Min 1080px)
    exportArea.style.width = '1920px';
    exportArea.style.minHeight = '1080px';
    exportArea.style.position = 'fixed';
    exportArea.style.left = '-9999px';
    exportArea.style.top = '0';
    exportArea.style.backgroundColor = '#121417';
    exportArea.style.display = 'flex';
    exportArea.style.flexDirection = 'column';
    exportArea.style.padding = '50px';
    exportArea.style.boxSizing = 'border-box';
    exportArea.style.color = '#fff';
    exportArea.style.fontFamily = "'Kanit', sans-serif";
    
    const deckName = document.getElementById('deckNameInput').value || 'My Dinomaster Deck';

    const getGroupedCards = (cardList) => {
        const groups = {};
        cardList.forEach(c => {
            if (!groups[c.id]) groups[c.id] = { ...c, count: 0 };
            groups[c.id].count++;
        });
        return Object.values(groups);
    };
// เพิ่ม helper ก่อน (วางก่อน starterList)
const hasType = (card, ...types) => {
    const cardTypes = Array.isArray(card.type) ? card.type : [card.type];
    return types.some(t => cardTypes.includes(t));
};

// ✅ starterList — เพิ่ม hasType เผื่อ Legend+Master ในอนาคต
const starterList = myDeck.filter(c => 
    c.isCommander || 
    hasType(c, "Master", "Boost_Master", "LC")
);

// ✅ extraList — ใช้ hasType แทน includes(c.type)
const extraList = myDeck.filter(c => 
    !c.isCommander && 
    hasType(c, "Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion")
);

// ✅ mainList — กรองออกด้วย hasType เช่นกัน
const mainList = myDeck.filter(c => 
    !starterList.includes(c) && 
    !extraList.includes(c)
);

    const MainTypes = ["Creature", "Action", "Armor", "Field"];
    const typeCounts = { "Creature": 0, "Action": 0, "Armor": 0, "Field": 0 };
    mainList.forEach(c => { if (MainTypes.includes(c.type)) typeCounts[c.type]++; });

    const statsHTML = MainTypes.map(type => {
        let color = "#fff";
        if(type === "Creature") color = "#f1c40f";
        if(type === "Action") color = "#e74c3c";
        if(type === "Armor") color = "#3498db";
        if(type === "Field") color = "#2ecc71";
        return `<span style="margin-left: 30px; font-size: 26px;">${type}: <b style="color: ${color}; font-size: 32px;">${typeCounts[type]}</b></span>`;
    }).join('');

    exportArea.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #f1c40f; padding-bottom: 20px; margin-bottom: 30px;">
            <div>
                <h1 style="margin:0; font-size: 70px;">${deckName}</h1>
                <p style="margin:0; font-size: 28px; color: #f1c40f;">DINOMASTER TRADING CARD GAME</p>
            </div>
            <div style="text-align: right;">
                <div style="display: flex;">${statsHTML}</div>
                <div style="font-size: 30px; margin-top: 10px;">TOTAL: <b>${myDeck.length}</b> CARDS</div>
            </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <section>
                <div style="font-size: 26px; margin-bottom: 15px; color: #f1c40f; border-left: 6px solid #f1c40f; padding-left: 15px;">STARTER / COMMANDER</div>
                <div id="gridStarter" style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 12px;"></div>
            </section>

            <section>
                <div style="font-size: 26px; margin-bottom: 15px; color: #f1c40f; border-left: 6px solid #f1c40f; padding-left: 15px;">MAIN DECK (${mainList.length})</div>
                <div id="gridMain" style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 12px;"></div>
            </section>

            <section>
                <div style="font-size: 26px; margin-bottom: 15px; color: #f1c40f; border-left: 6px solid #f1c40f; padding-left: 15px;">EXTRA DECK (${extraList.length})</div>
                <div id="gridExtra" style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 12px;"></div>
            </section>
        </div>

        <div style="margin-top: auto; padding-top: 50px; text-align: center; color: #444; font-size: 22px;">
            Life-Crystal
        </div>
    `;

    document.body.appendChild(exportArea);

    // --- ฟังก์ชันหลักที่แก้ไขให้ฉลาดขึ้น ---
    const renderGroupedToGrid = (cardList, gridId, showBadge = true) => {
        const grid = document.getElementById(gridId);
        const grouped = getGroupedCards(cardList);

        // เช็คว่าเป็น Localhost หรือไม่
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const currentBase = window.location.origin + window.location.pathname.replace('index.html', '');

        grouped.forEach(card => {
            const wrap = document.createElement('div');
            wrap.style.position = 'relative';
            wrap.style.width = '100%';
            wrap.style.paddingBottom = '10px';

            let finalImageUrl = "";

            if (isLocalhost) {
                // 1. ถ้าอยู่บนเครื่องตัวเอง (Local) ให้ใช้ path ตรงๆ เลย (เร็วและไม่ติด CORS)
                finalImageUrl = card.image;
            } else {
                // 2. ถ้าอยู่บนเว็บจริง (GitHub) ให้ใช้ Proxy เพื่อย่อรูป (ประหยัดเน็ตและแรม)
                let cardImgPath = card.image;
                if (cardImgPath.startsWith('/')) cardImgPath = cardImgPath.substring(1);
                
                // เช็คว่า path เป็น http อยู่แล้วหรือเป็น relative path
                const absoluteImgUrl = cardImgPath.startsWith('http') ? cardImgPath : currentBase + cardImgPath;
                const cleanUrl = absoluteImgUrl.replace(/^https?:\/\//, '');
                
                finalImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=300&output=webp&q=85&il`;
            }

            wrap.innerHTML = `
                <img src="${finalImageUrl}" crossorigin="anonymous" style="display:block; width:100%; border-radius: 6px; border: 1px solid #333;">
                ${showBadge ? `
                    <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); 
                                background: #e74c3c; color: white; padding: 2px 12px; border-radius: 6px; 
                                font-weight: bold; font-size: 18px; border: 2px solid #fff; 
                                z-index: 10; white-space: nowrap;">x${card.count}</div>` : ""}
            `;
            grid.appendChild(wrap);
        });
    };
    // ------------------------------------

    renderGroupedToGrid(starterList, 'gridStarter', false);
    renderGroupedToGrid(mainList, 'gridMain', true);
    renderGroupedToGrid(extraList, 'gridExtra', true);

    const images = exportArea.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => new Promise(res => { 
        if(img.complete) res(); else { img.onload = res; img.onerror = res; }
    })));

    try {
        const canvas = await html2canvas(exportArea, {
            useCORS: true,
            backgroundColor: '#121417',
            scale: 1, // ใช้ 1 ก็พอสำหรับ Local Test (ถ้าอยากชัดมากให้ปรับเป็น 1.5 หรือ 2 ตอนขึ้นเว็บจริง)
            width: 1920
        });

        const link = document.createElement('a');
        link.download = `Deck_${deckName}.jpg`;
        link.href = canvas.toDataURL('image/jpeg', 0.9);
        link.click();
    } catch (err) {
        console.error(err);
    } finally {
    exportArea.remove();
    if(btn) {
        // 3. คืนค่าด้วย innerHTML ไอคอน <i class="fa-solid fa-camera"></i> จะกลับมาแสดงผล
        btn.innerHTML = originalContent; 
        btn.disabled = false;
        btn.style.opacity = "1";
            }
    }
}