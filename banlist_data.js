// banlist_data.js
const banlistData = {
    "None": { name: "ไม่จำกัด (No Limit)", banned: [], limited: [], limit_commander: [], conflict_groups: [] },

    "Standard": {
        name: "ฟอร์แมตหลัก",
        banned: [
            "AC052 MG", 
        ], 

        limited: [
            "D049 JU", 
            "AC005 MG",
            "ARC004 MG",
            "DE011 JU",
            "DE019 JU",
            "DE063 JU",
            "AC016 MG",
            "AC022 MG",
            "AC026 MG",
            "AC028 MG",
            "2011NM-C001",
            "2011NM-C018",
            "2011NM-C045",
            "2011NM-C056",
            "2011NM-A014",
            "BambiraptorM1",
            "CompsognathusM1",
            "MamenchisaurusM1",
            "EudimorphodonM1",
            "Flashing Bolt",
            "Super Incendiary Bomb",
            "2016NE-DE302",
            "2016NE-DE505"
        ], // <--- ✅ ใส่ลูกน้ำ (comma) ตรงนี้ครับ! (ของเดิมไม่มีเลย Error)

        // 3. ถ้าไม่มี Commander จะใส่ได้ 1 ใบ / ถ้ามี Commander ใส่ได้ 3 ใบ
        limit_if_no_commander : [  // แนะนำให้ใช้ชื่อ key ให้ตรงกับ Logic ที่เขียนไว้ (limit_if_no_commander)
            "D041 JU / FM-PRO1 D05 JU"
        ],

        // 4. การ์ดขัดแย้ง: ถ้าใส่กลุ่ม A ห้ามใส่กลุ่ม B
        conflict_groups: [
           {
                name: "ล้างสนาม",
                groupA: ["AC016 MG"],            // ใบที่ 1
                groupB: ["AC026 MG"],            // ใบที่ 2
                groupC: ["Super Incendiary Bomb"], // ใบที่ 3
                message: "ไม่สามารถใส่การ์ดล้างสนามเรื้อนๆรวมกันได้ (เลือกได้แค่แบบใดแบบหนึ่ง)"
            },
            {
                name: "เนโก อามาก้า",
                groupA: ["D021 JU"],
                groupB: ["AC030 MG"],
                message: "การ์ดสองใบนี้ห้ามใส่ด้วยกัน มันโหดเกิน ถือว่าขอล่ะ"
            },
                        {
                name: "อายุ-อีกัว",
                groupA: ["FM-PRO2 MS02 JU"],
                groupB: ["DE011 JU"],
                message: "การ์ดสองใบนี้ห้ามใส่ด้วยกัน มันโหดเกิน ถือว่าขอล่ะ"
            },
                                    {
                name: "อายุ-อเบลิ",
                groupA: ["FM-PRO2 MS02 JU"],
                groupB: ["FM-PR07 D17 JU"],
                message: "การ์ดสองใบนี้ห้ามใส่ด้วยกัน มันโหดเกิน ถือว่าขอล่ะ"
            },
        ]
    },
    
    "No_Meta": {
        name: "โนเมต้า",
        banned: [
            "D021 JU",
            "DE019 JU",
            "DE060",
            "MamenchisaurusM1",
            "2016NE-DE303",
            "2016NE-DE309",   

            "DE011 JU",
            "BambiraptorM1",
            "CompsognathusM1",
            "SiamotyrannusM1",
            "2011NM-C001",
            "2016NE-DE107",
            "2011NE-DE108",

            "D038 JU",
            "DC018 JU",
            "DE063 JU",
            "KronosaurusM1",

            "D049 JU",
            "2011NM-C018",
            "2011NM-C056",
            "2011NM-C045",
            "AnurognathusF1",
            "EudimorphodonM1",
            "NyctosaurusF1",
            "SordesM1",
            "2016NE-DE505",

            "2016NE-DE601",

            "AC004 MG",
            "AC005 MG",
            "AC015 MG",
            "AC016 MG",
            "AC022 MG",
            "AC026 MG",
            "AC028 MG",
            "AC030 MG",
            "AC047 MG",
            "AC052 MG",
            "2011NM-A005",
            "2011NM-A020",
            "2011NM-A030",
            "2011NM-A022",
            "Megatech Cycling",
            "Super Incendiary Bomb",
            "2011NM-A014",
            "AR004 MG",
            "ARC004 MG",
            "AR027 MG",
            "AR040 MG",
            "2011NM-R013",
            "AR020 MG",
            "2011NM-R018",
            "2011NM-R028",
            "DP Fern2",
            "Megatech Yoyo",
            "Flashing Bolt",
            "Disintegrate",            
            "2011NM-R015"
        ],
        bannedTypes: ["Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion"],
        limited: [
            "D020 JU",
            "AC036 MG",
            "2016NE-DE302",
            "2016NE-DE604",
            "AC011 MG",

                ],        
        limit_if_no_commander: [],
        conflict_groups: []
    }
};

let currentBanlistFormat = localStorage.getItem('dinomaster_banlist_format') || "None";

// ... (ส่วน Logic ด้านล่างคงเดิม) ...
function getCardMaxLimit(card) {
    const format = banlistData[currentBanlistFormat] || banlistData["None"];
    const cardId = String(card.id);

    // 1. เช็คว่าโดนแบนหรือไม่ (0 ใบ)
    if (format.banned && format.banned.includes(cardId)) return 0;
    if (format.bannedTypes && card.type && format.bannedTypes.includes(card.type)) return 0; // ถ้าประเภทการ์ดตรงกับที่แบนไว้ ให้ใส่ได้ 0 ใบ

    // 2. เช็คว่าโดนจำกัด Limit 1 หรือไม่ (1 ใบ)
    if (format.limited && format.limited.includes(cardId)) return 1;

    // 3. เช็คกฎพิเศษ: ถ้าไม่มี Commander ไดโนเสาร์ ให้ Limit 1
    // หมายเหตุ: ต้องใช้ชื่อ key ให้ตรงกับข้างบน (limit_if_no_commander)
    if (format.limit_if_no_commander && format.limit_if_no_commander.includes(cardId)) {
        const hasCommander = typeof myDeck !== 'undefined' && myDeck.some(c => c.isCommander);
        if (!hasCommander) {
            return 1; 
        }
    }

    if (card.type === "Master" || card.type === "Boost_Master") return 1;
    return 3;
}

// ในไฟล์ banlist_data.js

function changeBanlistFormat(formatKey) {
    currentBanlistFormat = formatKey;
    localStorage.setItem('dinomaster_banlist_format', formatKey);
    
    // 1. อัปเดต UI ของเด็ค (Side Panel)
    if (typeof updateDeckUI === 'function') updateDeckUI();

    // 2. สั่งวาดการ์ดใหม่ทั้งหน้า เพื่อให้ Badge (ป้าย BAN/Limit) ขึ้นทันที
    if (typeof renderCards === 'function' && typeof currentFilteredCards !== 'undefined') {
        renderCards(currentFilteredCards); 
    } else if (typeof updateAllButtonStates === 'function') {
        // Fallback: ถ้าวาดใหม่ไม่ได้ อย่างน้อยให้อัปเดตสีปุ่ม
        updateAllButtonStates();
    }
    
    // 3. แจ้งเตือน (Feedback)
    if (typeof showQuickFeedback === 'function') {
        showQuickFeedback(null, `สลับเป็น ${banlistData[formatKey].name}`, "#3498db");
    } else {
        console.log(`สลับเป็น ${banlistData[formatKey].name}`);
    }
}

function renderBanlistOptions() {
    const selector = document.getElementById('banlistFormatSelect');
    if (!selector) return;

    selector.innerHTML = ""; 

    Object.keys(banlistData).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.innerText = banlistData[key].name;
        
        if (key === currentBanlistFormat) {
            option.selected = true;
        }

        selector.appendChild(option);
    });
}