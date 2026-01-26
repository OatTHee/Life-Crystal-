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
        const matchType = typeValue === "" || (card.type && card.type.includes(typeValue));
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
    modalImg.classList.remove('img-silver-rare', 'img-golden-rare');
    
    let rarityTextHTML = ''; 
    if (card.rarity === 'Silver_Rare') {
        modalImg.classList.add('img-silver-rare');
        rarityTextHTML = `<span class="text-silver-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Silver Rare</span>`;
    } else if (card.rarity === 'Golden_Rare') {
        modalImg.classList.add('img-golden-rare');
        rarityTextHTML = `<span class="text-golden-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Golden Rare</span>`;
    } else {
        rarityTextHTML = `<span style="color: #ccc; font-size: 0.8em;">✦ ระดับความหายาก: การ์ดทั่วไป</span>`;
    }

    // --- 4. แสดงผลข้อมูลใน Modal ---
    if (modalInfo) {
        const typeMapping = {
            "Creature": "ครีเจอร์", "Action": "แอ็คชั่น", "Armor": "อาร์เมอร์",
            "Fusion_Monster": "ฟิวชั่นมอนสเตอร์", "Armored_Dino" : "ครีเจอร์ติดเกราะ",
            "Field": "ฟิลด์", "Master": "มาสเตอร์", "Boost_Master": "บูสมาสเตอร์", "Boost_Creature": "บููสครีเจอร์",
            "Action_Field":"แอคชั่น [รูปแบบ:พื้นที่]",
        };

        const displayTypes = card.type ? card.type.split(' ').map(t => typeMapping[t] || t).join(' / ') : '-';
        
        let btnText = '+ เพิ่มลงเด็ค';
        let warningText = isMaster ? '(Master ใส่ได้เพียงใบเดียว)' : `(ในเด็คมีแล้ว ${countInDeck} / 3 ใบ)`;
        let btnColor = '#28a745'; 

        if (!isCompatible) {
            btnText = '⚠️ เผ่าไม่ตรงกับคอมมานเดอร์';
            warningText = '(ไม่สามารถใส่การ์ดข้ามเผ่าได้)';
            btnColor = '#b0b0b0'; 
        } else if (isMasterDisabled) {
            btnText = 'มี Master ในเด็คแล้ว';
            btnColor = '#b0b0b0';
        } else if (isFull) {
            btnText = 'ใส่ครบ 3 ใบแล้ว';
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
            <h2>${card.nameTH}</h2>
            <p style="color:#666; margin-bottom:5px;">${card.nameEN} | ID: ${card.id}</p>
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
        const AddBtn = document.getElementById('modalAddBtn');
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




// 5. Event Listeners
searchInput.addEventListener('input', filterCards);
dpFilter.addEventListener('change', filterCards);
typeFilter.addEventListener('change', filterCards);
clanFilter.addEventListener('change', filterCards);
setFilter.addEventListener('change', filterCards);

// เริ่มต้นแสดงผล
renderCards(cardsData);