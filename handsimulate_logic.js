// =========================================================
//  SECTION: HAND SIMULATOR (ฉบับแก้ไข: ไม่จั่ว Commander ขึ้นมือ)
// =========================================================

function openHandSimulator() {
    // ตรวจสอบตัวแปร myDeck (ต้องโหลด main.js หรือ deck_builder_logic.js ก่อนไฟล์นี้)
    if (typeof myDeck === 'undefined' || !myDeck || myDeck.length === 0) {
        alert("กรุณาใส่การ์ดในเด็คก่อนทดสอบมือเริ่มต้น");
        return;
    }

    // เรียกใช้ฟังก์ชันสร้าง Modal ถ้ายังไม่มี Element นี้ในหน้าเว็บ
    if (!document.getElementById('handSimModal')) {
        createHandSimModal();
    }

    // --- ส่วน Logic การคำนวณ ---
    
    // 1. หา Master ในเด็ค
    const masterInDeck = myDeck.find(c => c.type === "Master");
    let handSize = 6; // ค่า Default มาตรฐาน
    let masterName = "ไม่มีมาสเตอร์";

    if (masterInDeck) {
        masterName = masterInDeck.nameTH;
        
        // 2. พยายามดึงข้อมูลล่าสุดจาก cardsData (ถ้ามี) เพื่อเช็ค handSize
        if (typeof cardsData !== 'undefined') {
            const masterTemplate = cardsData.find(c => String(c.id) === String(masterInDeck.id));

            // 3. ตรวจสอบว่าในไฟล์ข้อมูลการ์ด มีการระบุ handSize ไว้หรือไม่?
            if (masterTemplate && typeof masterTemplate.handSize === 'number') {
                handSize = masterTemplate.handSize;
            }
        }
    }

    // 4. เตรียมกองจั่ว (แก้ไข: ตัด Master, Boost Master และ Commander ออกจากกองจั่ว)
    let drawPile = myDeck.filter(c => c.type !== "Master" && c.type !== "Boost_Master"&& c.type !== "Boost_Creature"&& 
	c.type !== "Fusion_Monster"&& c.type !== "Armored_Dino"&& c.type !== "Illusion");
    // 5. สับกองการ์ด (Fisher-Yates Shuffle)
    for (let i = drawPile.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [drawPile[i], drawPile[j]] = [drawPile[j], drawPile[i]];
    }

    // 6. จั่วการ์ดตามจำนวน Hand Size ของ Master
    const startingHand = drawPile.slice(0, handSize);

    // --- ส่วนแสดงผล ---
    const handContainer = document.getElementById('handSimContainer');
    const infoText = document.getElementById('handSimInfo');
    
    if (infoText) {
        infoText.innerHTML = `
            <span style="color:#aaa;">มาสเตอร์: <strong style="color:#fff;">${masterName}</strong></span>
            <span style="margin-left:15px; color:#aaa;">จำนวนการ์ดเริ่มต้น: <strong style="color:#2ecc71;">${handSize}</strong> ใบ</span>
            <div style="font-size: 12px; color: #888; margin-top: 5px;">*ไม่รวม Master และ Commander ในการจั่ว</div>
        `;
    }

    if (handContainer) {
        handContainer.innerHTML = '';
        startingHand.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.style.cssText = `
                position: relative; width: 120px; border-radius: 8px; overflow: hidden;
                box-shadow: 0 4px 8px rgba(0,0,0,0.5); transition: transform 0.2s; cursor: pointer;
                margin-bottom: 10px;
            `;
            
            const img = document.createElement('img');
            img.src = card.image;
            img.style.width = "100%";
            img.style.display = "block";
            img.onerror = function() { this.src = 'images/placeholder.png'; }; 
            
            cardDiv.onmouseover = () => {
                cardDiv.style.transform = "scale(1.1) translateY(-10px)";
                cardDiv.style.zIndex = "100";
            };
            cardDiv.onmouseout = () => {
                cardDiv.style.transform = "scale(1)";
                cardDiv.style.zIndex = "1";
            };

            cardDiv.appendChild(img);
            handContainer.appendChild(cardDiv);
        });
    }

    const modal = document.getElementById('handSimModal');
    if (modal) modal.style.display = 'flex';
}

// --- ฟังก์ชันสร้าง Modal ---
function createHandSimModal() {
    if (document.getElementById('handSimModal')) return;

    const modalHTML = `
    <div id="handSimModal" style="
        display: none; 
        position: fixed; 
        z-index: 10000; 
        left: 0; top: 0; 
        width: 100%; height: 100%; 
        background-color: rgba(0,0,0,0.85); 
        align-items: center; 
        justify-content: center;
        backdrop-filter: blur(5px);">
        
        <div style="
            background: #1e272e; 
            width: 90%; 
            max-width: 1000px; 
            padding: 30px; 
            border-radius: 15px; 
            border: 1px solid #485460;
            box-shadow: 0 0 30px rgba(0,0,0,0.8);
            text-align: center;
            position: relative;">
            
            <span onclick="document.getElementById('handSimModal').style.display='none'" style="
                position: absolute; top: 15px; right: 20px; 
                color: #ccc; font-size: 30px; font-weight: bold; 
                cursor: pointer; line-height: 20px;">&times;</span>

            <h2 style="color: #fff; margin-top: 0;">✋ Hand Simulator</h2>
            <div id="handSimInfo" style="margin-bottom: 20px; font-size: 16px;"></div>

            <div id="handSimContainer" style="
                display: flex; 
                justify-content: center; 
                flex-wrap: wrap; 
                gap: 15px; 
                padding: 20px; 
                background: #0f1519; 
                border-radius: 10px; 
                min-height: 180px;">
            </div>

            <div style="margin-top: 25px;">
                <button onclick="openHandSimulator()" style="
                    padding: 10px 25px; 
                    background: #3498db; 
                    color: white; border: none; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    font-size: 16px; 
                    font-weight: bold;">
                    🔄 สุ่มมือใหม่
                </button>
                <button onclick="document.getElementById('handSimModal').style.display='none'" style="
                    padding: 10px 25px; 
                    background: #e74c3c; 
                    color: white; border: none; 
                    border-radius: 5px; 
                    cursor: pointer; 
                    font-size: 16px; 
                    font-weight: bold;
                    margin-left: 10px;">
                    ปิด
                </button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}