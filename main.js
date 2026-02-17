const cardsData = [...C_originalData,...MG_originalData,...CharacterData, ...C_EnigmaData,
    ...MG_enigmaData,...C_NewmasterData,
...MG_newmasterData, ...C_StepNextData, ...MS_newmasterData, ...MG_StepNextData,
 ...ReEnigmaData, ...MG_AR1Data, ...Armored_DinoData,
...BoostMaster2Data,...Boost3Data, ...Boost4Data, ...Reart1Data, ...icefireData,...Boost5Data, ]; 

let myDeck = JSON.parse(localStorage.getItem('dinomaster_deck')) || [];
let currentFilteredCards = cardsData;
let myCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
// เรียกใช้ฟังก์ชันแสดงผลทันที เพื่อให้การ์ดที่ค้างอยู่แสดงออกมา
document.addEventListener('DOMContentLoaded', () => {
    updateDeckUI();
    // ถ้าอยากให้ปุ่มในคลังการ์ดแสดงสถานะ "ใส่ครบแล้ว" ตามเด็คที่ค้างอยู่ด้วย
    renderCards(cardsData); 
});

const container = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const dpFilter = document.getElementById('dpFilter');
const typeFilter = document.getElementById('typeFilter');
const setFilter = document.getElementById('setFilter');
const clanFilter = document.getElementById('clanFilter');
const rarityFilter = document.getElementById('rarityFilter');

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalInfo = document.getElementById('modalInfo');

// 3. ฟังก์ชัน Filter
function filterCards() {
    const searchText = searchInput.value.toLowerCase();
    const dpValue = dpFilter.value;
    const typeValue = typeFilter.value;
    const setValue = setFilter.value;
    const clanValue = clanFilter.value;
    const rarityValue = rarityFilter.value;
    
    const filtered = cardsData.filter(card => {
        const matchName = (card.nameTH || "").toLowerCase().includes(searchText) || 
                          (card.nameEN || "").toLowerCase().includes(searchText);
        const matchDP = dpValue === "" || card.dp == dpValue;
        
        // --- แก้ไขจุดนี้: เปลี่ยนจาก .includes(typeValue) เป็นการเช็ค === ---
let matchType = false;
        if (typeValue === "") {
            matchType = true; // ถ้าไม่ได้เลือกประเภท ให้ผ่านทั้งหมด
        } else if (typeValue === "Action") {
            // ถ้าเลือก Action ให้หาทั้ง "Action" และ "Action_Field"
            matchType = (card.type === "Action" || card.type === "Action_Field");
        } else if (typeValue === "Field") {
            matchType = (card.type === "Field" || card.type === "Action_Field");
        }
        else {
            // ประเภทอื่นๆ (Creature, Armor, Field ฯลฯ) ให้เช็คตรงตัวเหมือนเดิม
            matchType = (card.type === typeValue);
        }

        const matchSet = setValue === "" || card.set === setValue;
        const matchClan = clanValue === "" || (card.clan && card.clan.includes(clanValue));
        const matchRarity = rarityValue === "" || card.rarity === rarityValue;

        return matchName && matchDP && matchType && matchSet && matchClan && matchRarity;
    });

    // --- จุดที่แก้ไข: เก็บค่าที่กรองแล้วลงในตัวแปรส่วนกลาง ---
    currentFilteredCards = filtered; 
    renderCards(currentFilteredCards);
}

function resetFilters() {
    document.getElementById('searchInput').value = "";
    document.getElementById('dpFilter').value = "";
    document.getElementById('typeFilter').value = "";
    document.getElementById('clanFilter').value = "";
    document.getElementById('setFilter').value = "";
	document.getElementById('rarityFilter').value = "";

    currentFilteredCards = cardsData;
    renderCards(currentFilteredCards);
    syncDpButtons();
}
// เพิ่มบรรทัดนี้ล่างสุดเพื่อให้ Filter ทำงานทันทีที่กดเลือก
				rarityFilter.addEventListener('change', filterCards);


// 4. ฟังก์ชันเปิด Modal (Pop-up) พร้อมสีตาม Type
function openModal(cardOrId) {
    // --- 1. เตรียมข้อมูลการ์ด ---
    let card;
    if (cardOrId && typeof cardOrId === 'object') {
        card = cardOrId;
    } else {
        card = cardsData.find(c => String(c.id) === String(cardOrId));
    }

    if (!card) {
        console.error("ไม่พบข้อมูลการ์ด:", cardOrId);
        return;
    }

    // +++ [เพิ่มตรงนี้] อัปเดต Index ปัจจุบันจากรายการที่กรองอยู่ +++
    // เราใช้ currentFilteredCards เพื่อให้การเลื่อนดูการ์ดสอดคล้องกับผลการค้นหา
    currentModalIndex = currentFilteredCards.findIndex(c => String(c.id) === String(card.id));
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // --- 2. คำนวณสถานะต่างๆ (ประกาศไว้ด้านบนสุดเพื่อให้ทุกส่วนเรียกใช้ได้) ---
    const countInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
    const isMaster = card.type && (card.type.includes("Master") || card.type.includes("Boost_Master"));
    const hasMasterInDeck = myDeck.some(c => c.type && (c.type.includes("Master") || c.type.includes("Boost_Master")));
    
    // กฎ Armor: ข้ามการเช็คเผ่า
    const isArmor = card.nameTH && card.nameTH.includes("Armor");
    let isCompatible = true;
    if (!isArmor && typeof isCardCompatibleWithCommander === 'function') {
        isCompatible = isCardCompatibleWithCommander(card);
    }

    const isFull = countInDeck >= 3;
    const isMasterDisabled = isMaster && hasMasterInDeck && !myDeck.some(c => String(c.id) === String(card.id));
    const isDisabled = !isCompatible || isFull || isMasterDisabled;

    // เตรียม Class สำหรับ Ability Box (แก้ปัญหา ReferenceError: abilityBoxClass)
    let abilityBoxClass = "ability-box";
    if (card.type) {
        const types = card.type.split(' ').filter(t => t.trim() !== '');
        const typeClasses = types.map(t => `type-${t}`).join(' '); 
        abilityBoxClass += ` ${typeClasses}`;
    }

    // --- 3. จัดการรูปภาพและ Rarity ---
    modalImg.src = card.image;
    modalImg.style.opacity = '1';
    modalImg.classList.remove('img-silver-rare', 'img-golden-rare');
    
    let rarityTextHTML = ''; 
    if (card.rarity === 'Silver_Rare') {
        modalImg.classList.add('img-silver-rare');
        rarityTextHTML = `<span class="text-silver-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Silver Rare</span>`;
    } else if (card.rarity === 'Golden_Rare') {
        modalImg.classList.add('img-golden-rare');
        rarityTextHTML = `<span class="text-golden-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Golden Rare</span>`;
    } else if (card.rarity === 'Promo') {
        modalImg.classList.add('img-Promo');
        rarityTextHTML = `<span class="text-promo" style="font-size: 0.9em;">✦ การ์ดโปรโมฟอยล์</span>`;
    } 
    
    else {
        rarityTextHTML = `<span style="color: #ccc; font-size: 0.8em;">✦ ระดับความหายาก: การ์ดทั่วไป</span>`;
    }

    // --- 4. แสดงผลข้อมูลใน Modal ---
    if (modalInfo) {
        const typeMapping = {
            "Creature": "ครีเจอร์", "Action": "แอ็คชั่น", "Armor": "อาร์เมอร์",
            "Fusion_Monster": "ฟิวชั่นมอนสเตอร์", "Armored_Dino" : "ครีเจอร์ติดเกราะ",
            "Field": "ฟิลด์", "Master": "มาสเตอร์", "Boost_Master": "บูสมาสเตอร์", "Boost_Creature": "บููสครีเจอร์",
            "Action_Field":"แอคชั่น [รูปแบบ:พื้นที่]","Illusion":"อิลูชั่น"
        };

        const displayTypes = card.type ? card.type.split(' ').map(t => typeMapping[t] || t).join(' / ') : '-';
        
        // --- [ส่วนที่เพิ่ม] คำนวณ Banlist และ Limit ---
        let dynamicMaxLimit = 3;
        let isBanned = false;
        
        if (typeof banlistData !== 'undefined' && typeof currentBanlistFormat !== 'undefined') {
            const format = banlistData[currentBanlistFormat] || banlistData["None"];
            const strId = String(card.id);
            
            if (format.banned.includes(strId)) {
                isBanned = true;
                dynamicMaxLimit = 0;
            } else if (format.limited.includes(strId)) {
                dynamicMaxLimit = 1;
            } else if (format.limit_if_no_commander && format.limit_if_no_commander.includes(strId)) {
                 // เช็คเงื่อนไข Limit 1 หากไม่มี Commander
                 const hasCommander = typeof myDeck !== 'undefined' && myDeck.some(c => c.isCommander);
                 if (!hasCommander) dynamicMaxLimit = 1;
            }
        }
        // กฎ Master เดิม (ใส่ได้ 1)
        if (card.type === "Master" || card.type === "Boost_Master") dynamicMaxLimit = 1;
        // ------------------------------------------

        let btnText = '+ เพิ่มลงเด็ค';
        
        // ปรับ warningText ให้โชว์เลข Limit ที่ถูกต้อง (เช่น / 1 หรือ / 3)
        let warningText = isMaster ? '(Master ใส่ได้เพียงใบเดียว)' : `(ในเด็คมีแล้ว ${countInDeck} / ${dynamicMaxLimit} ใบ)`;
        
        let btnColor = '#28a745'; 

        // เรียงลำดับเงื่อนไข (เพิ่ม isBanned และใช้ dynamicMaxLimit แทนเลข 3)
        if (isBanned) {
            btnText = 'โดนแบน (BANNED)';
            warningText = `(ห้ามใส่ในฟอร์แมต ${banlistData[currentBanlistFormat]?.name || 'ปัจจุบัน'})`;
            btnColor = '#b0b0b0';
        } else if (!isCompatible) {
            btnText = '⚠️ เผ่าไม่ตรงกับคอมมานเดอร์';
            warningText = '(ไม่สามารถใส่การ์ดข้ามเผ่าได้)';
            btnColor = '#b0b0b0'; 
        } else if (isMasterDisabled) {
            btnText = 'มี Master ในเด็คแล้ว';
            btnColor = '#b0b0b0';
        } else if (countInDeck >= dynamicMaxLimit) { 
            // เช็คว่าเต็ม Limit หรือยัง (รองรับทั้ง Limit 1 และ 3)
            btnText = `ใส่ครบ ${dynamicMaxLimit} ใบแล้ว`;
            btnColor = '#b0b0b0';
        }
        
        
        // เพิ่มตัวแปรเช็คเงื่อนไข Boost Master
        const hasBoostMaster = myDeck.some(c => c.type === "Boost_Master");
        const isSpecialButNoBoost = card.specialCommander && !hasBoostMaster;

        if (isSpecialButNoBoost) {
            warningText = `<span style="color:#e67e22;">(ต้องมี Boost Master ในเด็คก่อนจึงจะตั้งเป็น Commander ได้)</span>`;
        }
        
        // 7. พ่น HTML (เพิ่ม rarityTextHTML เข้าไปข้างชื่อการ์ดหรือใต้ชื่อ)
        modalInfo.innerHTML = `
            <h2>${card.nameEN}</h2>
            <p style="color:#666; margin-bottom:5px;">${card.nameTH} | ID: ${card.id}</p>
            <hr>            
            <p><strong>ประเภท :</strong> ${displayTypes} | <strong>DP :</strong> ${card.dp}</p>
            <p><strong>เผ่า :</strong> ${card.clan || '-'}</p>
            <p><strong>ชุด :</strong> ${card.set || '-'}</p> <div style="margin: 10px 0;"> ${rarityTextHTML} 
            </div>

            <div class="${abilityBoxClass}"> 
                <strong>ความสามารถ : </strong><br>
                ${card.ability || "ไม่มีความสามารถพิเศษ"}
            </div>

            <div id="modalActionArea" style="margin-top: 20px;">
                <button id="modalAddBtn" class="add-to-deck-btn" 
                    ${isDisabled ? 'disabled' : ''} 
                    style="background-color: ${btnColor}; color: white; width:100%; cursor: ${isDisabled ? 'not-allowed' : 'pointer'}; border:none; padding:12px; border-radius:8px; font-weight:bold;">
                    ${btnText}
                </button>
                <p style="text-align: center; font-size: 12px; color: ${!isCompatible ? '#ff4757' : '#666'}; margin-top: 8px; font-weight: ${!isCompatible ? 'bold' : 'normal'};">
                    ${warningText}
                </p>
                <div id="commanderBtnArea"></div> 
            </div>
        `;

        // 8. ผูก Event Click ให้ปุ่มเพิ่มลงเด็ค
        const modalAddBtn = document.getElementById('modalAddBtn'); // แก้ไขการประกาศตัวแปรให้ถูกต้อง
        if (modalAddBtn && !isDisabled) {
            modalAddBtn.onclick = (e) => {
                handleAddToDeck(e, card, card.image);
                openModal(card); 
            };
        }
        
        // 9. อัปเดตส่วนปุ่มตั้งค่าคอมมานเดอร์
        const sidePanel = document.querySelector('.side-panel');
        const isDeckOpen = sidePanel && sidePanel.classList.contains('open');

        if (typeof updateModalForCommander === 'function' && isCompatible && isDeckOpen) {
            updateModalForCommander(card); 
        } else {
            // ถ้าไม่ได้เปิดหน้าต่างจัดเด็ค ให้ล้างพื้นที่ปุ่มคอมมานเดอร์ทิ้ง (กันปุ่มค้าง)
            const commanderBtnArea = document.getElementById('commanderBtnArea');
            if (commanderBtnArea) commanderBtnArea.innerHTML = '';
        }
    }

    // 10. แสดงผล Modal
    modal.style.display = "flex";
    
    window.openModal = openModal;
}
// ตัวแปรเก็บ Index ของการ์ดที่เปิดอยู่ใน Modal ปัจจุบัน
let currentModalIndex = -1;

// ฟังก์ชันเปลี่ยนการ์ด (Previous / Next) พร้อม Fade Effect
function navigateModal(direction) {
    // ตรวจสอบความปลอดภัยพื้นฐาน
    if (currentModalIndex === -1 || !currentFilteredCards || currentFilteredCards.length === 0) return;

    let newIndex = currentModalIndex + direction;

    // Logic วนลูป
    if (newIndex < 0) {
        newIndex = currentFilteredCards.length - 1;
    } else if (newIndex >= currentFilteredCards.length) {
        newIndex = 0;
    }

    const modalImg = document.getElementById('modalImg');
    
    // --- เริ่ม Step 1: Fade Out รูปเก่า ---
    // ตั้งค่า Opacity เป็น 0 (CSS transition จะทำงานทำให้ค่อยๆ จาง)
    modalImg.style.opacity = '0';

    // --- เริ่ม Step 2: รอจังหวะ แล้วเปลี่ยนข้อมูล ---
    // ใช้ setTimeout รอให้ Fade out เสร็จสิ้น (เวลาต้องตรงกับใน CSS คือ 250ms)
    setTimeout(() => {
        // เปลี่ยนข้อมูลการ์ดเป็นใบใหม่ (ฟังก์ชันนี้จะเปลี่ยน src รูปด้วย)
        openModal(currentFilteredCards[newIndex]);
        
        // --- เริ่ม Step 3: Fade In รูปใหม่ ---
        // หลังจากเปลี่ยน src แล้ว สั่งให้ Opacity กลับมาเป็น 1
        // (CSS transition จะทำงานทำให้ค่อยๆ ชัดขึ้น)
        modalImg.style.opacity = '1';
        
    }, 250); // <-- เวลาตรงนี้ต้องสอดคล้องกับ transition ใน CSS (0.25s = 250ms)
}

// 2. เพิ่ม Event Listener สำหรับการกดปุ่มลูกศรบนคีย์บอร์ด (เฉพาะตอนเปิด Modal)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            navigateModal(-1);
        } else if (e.key === "ArrowRight") {
            navigateModal(1);
        }
    }
});










function closeModal() {
    modal.style.display = "none";
}

function closeModalOutside(event) {
    if (event.target.id === "imageModal") closeModal();
}

function updateModalForCommander(card) {
    const infoDiv = document.getElementById('modalInfo');
    if (!infoDiv) return;

    // 1. เช็คว่าการ์ดเป็น Creature หรือไม่
    if (card.type !== "Creature") return;

    // 2. ตรวจสอบสถานะการเป็น Commander
    const isEligible = canSetAsCommander(card);
    const hasBoostMaster = myDeck.some(c => c.type === "Boost_Master");
    
    // เงื่อนไข: เป็นกรณีพิเศษ (specialCommander) แต่ยังไม่มี Boost Master ในเด็ค
    const isLockedSpecial = card.specialCommander && !hasBoostMaster;

    // ถ้าผ่านเงื่อนไข (isEligible) ให้สร้างปุ่มกดได้ปกติ
    // หรือถ้าเป็นใบพิเศษแต่ล็อคอยู่ (isLockedSpecial) ให้สร้างปุ่มแบบกดไม่ได้ (Disabled) เพื่อแจ้งเตือนผู้ใช้
    if (isEligible || isLockedSpecial) {
        
        const cmdBtn = document.createElement('button');
        cmdBtn.id = "setCommanderBtn";
        
        // กำหนดข้อความและสีปุ่มตามสถานะ
        if (isLockedSpecial) {
            cmdBtn.innerHTML = "🔒 ต้องการ Boost Master (กรณีพิเศษ)";
            cmdBtn.style = `
                margin-top: 10px;
                width: 100%;
                padding: 10px;
                background-color: #bdc3c7; /* สีเทา */
                color: #7f8c8d;
                border: none;
                border-radius: 5px;
                font-weight: bold;
                cursor: not-allowed;
                font-family: 'Kanit', sans-serif;
            `;
            cmdBtn.disabled = true;
        } else {
            cmdBtn.innerHTML = "⭐ ตั้งเป็นคอมมานเดอร์ไดโน";
            cmdBtn.style = `
                margin-top: 10px;
                width: 100%;
                padding: 10px;
                background-color: #f1c40f; /* สีทอง */
                color: #2c3e50;
                border: none;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                font-family: 'Kanit', sans-serif;
            `;
            
            cmdBtn.onclick = () => {
                if (confirm(`คุณต้องการใช้ ${card.nameTH} เป็นคอมมานเดอร์ใช่หรือไม่?\n(จะทำให้ใส่ Creature ได้เฉพาะเผ่า ${card.clan} เท่านั้น)`)) {
                    setCommander(card);
                    closeModal();
                }
            };
        }
        
        infoDiv.appendChild(cmdBtn);
    }
}

function setCommander(card) {
    // 1. ตรวจสอบประเภทว่าเป็น Creature หรือไม่
    if (card.type !== "Creature") {
        alert("เฉพาะ Creature เท่านั้นที่สามารถเป็นคอมมานเดอร์ได้");
        return;
    }

    // 2. กฎการผสมเผ่า: ตรวจสอบการ์ดที่มีอยู่ใน Main Deck ทั้งหมด
    // (กรองเอาเฉพาะ Creature เพราะ Action/Support ปกติจะไม่มี Clan หรือใส่ได้อิสระ)
    const mainDeckCreatures = myDeck.filter(c => c.type === "Creature" && !c.isCommander);
    
    if (mainDeckCreatures.length > 0) {
        const targetClans = Array.isArray(card.clan) ? card.clan : [card.clan];
        
        // ตรวจหาการ์ดในเด็คที่มีเผ่าไม่ตรงกับคอมมานเดอร์ตัวใหม่
        const invalidCards = mainDeckCreatures.filter(c => {
            const currentCardClans = Array.isArray(c.clan) ? c.clan : [c.clan];
            // เช็คว่ามีเผ่าไหนตรงกันบ้างไหม (ถ้าไม่มีเลยคือผิดกฎ)
            return !currentCardClans.some(clan => targetClans.includes(clan));
        });

        if (invalidCards.length > 0) {
            alert(`ไม่สามารถแต่งตั้งได้! เนื่องจากมี Creature เผ่าอื่นในเด็ค (${invalidCards[0].nameTH} และอื่นๆ) ซึ่งไม่ตรงกับเผ่า ${targetClans.join(', ')}`);
            return;
        }
    }

    // 3. กฎ DP: ตรวจสอบเงื่อนไข DP 4 หรือ Boost Master
    if (!canSetAsCommander(card)) {
        alert("การ์ดใบนี้ไม่ตรงตามเงื่อนไขการเป็นคอมมานเดอร์ (ต้อง DP 4+ หรือมี Boost Master)");
        return;
    }

    // --- ถ้าผ่านทุกกฎ ให้ทำการเปลี่ยนคอมมานเดอร์ ---
    
    // ล้างสถานะคอมมานเดอร์เก่า
    myDeck.forEach(c => c.isCommander = false);

    // หาการ์ดใบนี้ในเด็ค (ถ้ามีอยู่แล้ว) เพื่อเปลี่ยนสถานะ หรือเพิ่มเข้าไปใหม่
    const existingIndex = myDeck.findIndex(c => c.id === card.id && !c.isCommander);
    if (existingIndex !== -1) {
        myDeck[existingIndex].isCommander = true;
    } else {
        myDeck.push({ ...card, isCommander: true });
    }

    saveDeckToLocalStorage();
    updateDeckUI();
    renderCards(currentFilteredCards); // อัปเดตปุ่มหน้าคลัง
    alert(`แต่งตั้ง ${card.nameTH} เป็นคอมมานเดอร์เรียบร้อยแล้ว`);
}

function renderCommanderButton(container, card, color, text, disabled = false) {
    const cmdBtn = document.createElement('button');
    cmdBtn.innerHTML = text;
    cmdBtn.disabled = disabled;
    cmdBtn.style = `
        margin-top: 10px; width: 100%; padding: 10px;
        background-color: ${color}; color: ${disabled ? '#7f8c8d' : '#2c3e50'};
        border: none; border-radius: 5px; font-weight: bold;
        cursor: ${disabled ? 'not-allowed' : 'pointer'}; font-family: 'Kanit', sans-serif;
    `;
    if(!disabled) {
        cmdBtn.onclick = () => {
            if (confirm(`คุณต้องการใช้ ${card.nameTH} เป็นคอมมานเดอร์ใช่หรือไม่?`)) {
                setCommander(card);
                closeModal();
            }
        };
    }
    container.appendChild(cmdBtn);
}

// ฟังก์ชันสร้างปุ่ม DP Crystal
function initDpFilterUI() {
    const dpSelect = document.getElementById('dpFilter');
    const container = document.getElementById('dp-crystal-bar');
    
    if (!dpSelect || !container) return;

    // ค่าที่จะสร้างปุ่ม (รวม "ไร้DP" และ ปุ่มเคลียร์ค่า)
    const dpValues = [
        { val: "0", label: "0" },
        { val: "1", label: "1" },
        { val: "2", label: "2" },
        { val: "3", label: "3" },
        { val: "4", label: "4" },
        { val: "5", label: "5" },
        { val: "6", label: "6" },
        { val: "7", label: "7" },
        { val: "8", label: "8" },
        { val: "X", label: "X" },
        { val: "ไร้DP", label: "Ø" } // ใช้สัญลักษณ์ Ø แทนไร้ DP เพื่อความสวยงาม
    ];

    // 1. สร้างปุ่มเคลียร์ (Reset)
    const resetBtn = document.createElement('div');
    resetBtn.className = 'dp-crystal-btn special';
    resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left" style="font-size:14px"></i>'; // ใช้ไอคอนถ้ามี หรือใช้ text "All"
    resetBtn.title = "แสดงทั้งหมด";
    resetBtn.onclick = () => {
        updateDpSelection(""); // ส่งค่าว่าง
    };
    container.appendChild(resetBtn);

    // 2. สร้างปุ่มตัวเลข 0-8
    dpValues.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'dp-crystal-btn';
        if (item.val === "ไร้DP") btn.classList.add('special'); // เปลี่ยนสีสำหรับไร้ DP
        
        btn.innerText = item.label;
        btn.onclick = () => {
            // ถ้ากดปุ่มเดิมซ้ำ ให้ยกเลิกการเลือก (Toggle)
            if (dpSelect.value === item.val) {
                updateDpSelection(""); 
            } else {
                updateDpSelection(item.val);
            }
        };
        container.appendChild(btn);
    });

    // ฟังก์ชันอัปเดตค่าและ UI
    function updateDpSelection(value) {
        // 1. เปลี่ยนค่าใน Select ที่ซ่อนอยู่
        dpSelect.value = value;
        
        // 2. สั่งให้แจ้งเตือนว่ามีการเปลี่ยนแปลง (Trigger Event)
        // เพื่อให้ Logic ค้นหาเดิมทำงาน (filterCards)
        dpSelect.dispatchEvent(new Event('change'));

        // 3. อัปเดต UI (ไฮไลท์ปุ่มที่เลือก)
        const allBtns = container.querySelectorAll('.dp-crystal-btn');
        allBtns.forEach(b => {
            b.classList.remove('active');
            // เช็คว่าปุ่มไหนตรงกับค่าที่เลือก
            if (b.innerText === value || (value === "ไร้DP" && b.innerText === "Ø")) {
                b.classList.add('active');
            }
        });
        
        // ถ้าเป็นค่าว่าง ให้ไฮไลท์ปุ่ม Reset (ตัวแรก)
        if (value === "") {
            allBtns[0].classList.add('active');
        }
    }
}
function syncDpButtons() {
    const dpSelect = document.getElementById('dpFilter');
    const container = document.getElementById('dp-crystal-bar');
    if (!dpSelect || !container) return;

    const currentValue = dpSelect.value;
    const allBtns = container.querySelectorAll('.dp-crystal-btn');

    allBtns.forEach(btn => {
        btn.classList.remove('active');
        
        // ตรวจสอบเงื่อนไขเพื่อให้ปุ่มสว่างตามค่า
        const isResetBtn = btn.classList.contains('special') && (btn.innerHTML.includes('fa-rotate-left') || btn.innerText === "All");
        const isTargetValue = btn.innerText === currentValue || (currentValue === "ไร้DP" && btn.innerText === "Ø");

        if ((currentValue === "" && isResetBtn) || isTargetValue) {
            btn.classList.add('active');
        }
    });
}

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    // --- เพิ่มส่วนนี้เข้าไป ---
    if (typeof renderBanlistOptions === 'function') {
        renderBanlistOptions(); // สั่งให้สร้างตัวเลือก Banlist ทันที
    }
    // ----------------------
    initDpFilterUI()
    updateDeckUI();
    
    // ถ้าอยากให้ปุ่มในคลังการ์ดแสดงสถานะ "ใส่ครบแล้ว" ตามเด็คที่ค้างอยู่ด้วย
    renderCards(cardsData); 
});

// ฟังก์ชันสำหรับปุ่ม "การ์ดที่โดนจำกัด"
function limitedSearch() {
    // 1. ตรวจสอบว่ามีข้อมูล Banlist และ Format หรือไม่
    if (typeof banlistData === 'undefined' || typeof currentBanlistFormat === 'undefined') {
        console.error("Banlist data not found");
        return;
    }

    // 2. ดึงข้อมูลฟอร์แมตปัจจุบัน
    const format = banlistData[currentBanlistFormat] || banlistData["None"];

    // 3. รวบรวม ID การ์ดที่ต้องการแสดง (เฉพาะ Banned และ Limited)
    // ใช้ Set เพื่อป้องกัน ID ซ้ำ และค้นหาได้เร็ว
    const targetIds = new Set([
        ...(format.banned || []), 
        ...(format.limited || [])
    ]);

    // ถ้าไม่มีการ์ดโดนแบน/ลิมิตเลย ให้แจ้งเตือนและจบการทำงาน
    if (targetIds.size === 0) {
        alert(`ในฟอร์แมต "${format.name}" ไม่มีการ์ดที่ถูก Banned หรือ Limited ครับ`);
        return;
    }

    // 4. กรองการ์ดจาก Database กลาง (cardsData)
    const filtered = cardsData.filter(card => targetIds.has(String(card.id)));

    // 5. อัปเดตตัวแปร Global และวาดหน้าจอใหม่
    currentFilteredCards = filtered; // อัปเดตเพื่อให้ระบบจำว่าตอนนี้แสดงผล list นี้อยู่
    renderCards(currentFilteredCards);

    // (Optional) ล้างค่าในช่องค้นหาและ Filter อื่นๆ เพื่อไม่ให้งง
    if(document.getElementById('searchInput')) document.getElementById('searchInput').value = "";
    if(document.getElementById('typeFilter')) document.getElementById('typeFilter').value = "";
    if(document.getElementById('clanFilter')) document.getElementById('clanFilter').value = "";
    if(document.getElementById('setFilter')) document.getElementById('setFilter').value = "";
    if(document.getElementById('rarityFilter')) document.getElementById('rarityFilter').value = "";
    if(document.getElementById('dpFilter')) document.getElementById('dpFilter').value = "";

    // แจ้งเตือนเล็กน้อยว่ากำลังแสดงผลอะไร
    if (typeof showQuickFeedback === 'function') {
        // หาตำแหน่งกึ่งกลางจอเพื่อแสดง Feedback
        showQuickFeedback(
            { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, 
            `แสดง Ban/Limit ของ ${format.name}`, 
            "#e74c3c"
        );
    }
}

// 5. Event Listeners
searchInput.addEventListener('input', filterCards);
dpFilter.addEventListener('change', filterCards);
typeFilter.addEventListener('change', filterCards);
clanFilter.addEventListener('change', filterCards);
setFilter.addEventListener('change', filterCards);

// เริ่มต้นแสดงผล
renderCards(cardsData);