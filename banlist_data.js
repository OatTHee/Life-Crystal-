// banlist_data.js
const banlistData = {
    "None": { name: "ไม่จำกัด (No Limit)", banned: [], limited: [], limit_commander: [], conflict_groups: [], conditional_limits: [] },

    "Standard": {
        name: "ฟอร์แมตหลัก",
        banned: [
            "AC052 MG", 
        ], 

        limited: [
            "D021 JU",
            "D049 JU", 
            "AC005 MG",
            "ARC004 MG",
            "DE011 JU",
            "DE019 JU",
            "DE020 JU",
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
                name: "อายุ-อีกัว",
                groupA: ["FM-PRO2 MS02 JU"],
                groupB: ["DE011 JU"],
                message: "การ์ดสองใบนี้ห้ามใส่ด้วยกัน มันโหดเกิน ถือว่าขอล่ะ"
            },

        ],

        // 5. การ์ดจำกัดตามเงื่อนไข: ถ้ามีการ์ด "trigger" (การ์ดหลัก) อยู่ในเด็ค (ไม่ว่า Starter/Main/Extra)
        // การ์ดใน "target" จะถูกจำกัดเหลือ "limit" ใบ (ต่างจาก conflict_groups ที่ห้ามใส่ร่วมกันเลย)
        conditional_limits: [
                {
                    name: "Lost Feel",
                    trigger: ["FM-PR08 MSLostFeel"],
                 target: ["Mega T-Rex Suit"],
                 limit: 1,
                 message: "ถ้าใช้ Lost Feel => Mega T-Rex Suitจะใส่ได้เพียง 1 ใบ"
                },
                {
                    name: "Lost Lovena",
                    trigger: ["FM-PR08 MSLostLovena"],
                 target: ["2011NM-R015"],
                 limit: 1,
                 message: "ถ้าใช้ LostLovena => Harmonic Rope Plateจะใส่ได้เพียง 1 ใบ"
                }
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
            "StegosaurusF1",
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
            "Mega T-Rex Suit",

                ],
        limit_if_no_commander: [],
        conflict_groups: [],

        // การ์ดยกเว้นแบน: ถ้ามี Master "Shino" (FM-PRO6-MS03 JU) อยู่ในเด็ค
        // จะสามารถใส่ FM-PR06-EXC01 JU (ปกติโดนแบนเพราะเป็น Fusion_Monster) ได้ 1 ใบ
        conditional_limits: [
            {
                name: "Shino - Megatech T Rex",
                trigger: ["FM-PRO6-MS03 JU"],
                target: ["FM-PR06-EXC01 JU"],
                limit: 1,
                overridesBan: true,
                message: "ถ้าใช้ Shino (FM-PRO6-MS03 JU) => FM-PR06-EXC01 JU จะใส่ได้เพียง 1 ใบ (ต้องเอามาตั้งคอมมานเดอร์เท่านั้น)"
            }
        ]
    }
};

let currentBanlistFormat = localStorage.getItem('dinomaster_banlist_format') || "None";

// ... (ส่วน Logic ด้านล่างคงเดิม) ...
function getCardMaxLimit(card) {
    const format = banlistData[currentBanlistFormat] || banlistData["None"];
    const cardId = String(card.id);

    // 0. เช็คเงื่อนไขยกเว้นแบน: ถ้ามีการ์ด "trigger" อยู่ในเด็ค ให้ข้ามการแบนปกติ/แบนตามประเภท
    // (ต้องเช็คก่อนขั้นตอนแบน เพราะการ์ดกลุ่มนี้ปกติจะโดนแบน แต่มีข้อยกเว้นตามเงื่อนไข)
    if (format.conditional_limits && typeof myDeck !== 'undefined') {
        for (const rule of format.conditional_limits) {
            if (rule.overridesBan && rule.target.includes(cardId)) {
                const hasTrigger = myDeck.some(c => rule.trigger.includes(String(c.id)));
                if (hasTrigger) return rule.limit;
            }
        }
    }

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

    // 4. เช็คกฎพิเศษ: ถ้ามีการ์ด "หลัก" (trigger) อยู่ในเด็คแล้ว การ์ดนี้จะโดน Limit
    if (format.conditional_limits && typeof myDeck !== 'undefined') {
        for (const rule of format.conditional_limits) {
            if (rule.target.includes(cardId)) {
                const hasTrigger = myDeck.some(c => rule.trigger.includes(String(c.id)));
                if (hasTrigger) return rule.limit;
            }
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