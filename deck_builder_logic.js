let isUnsaved = false;
let isHistogramOpen = false; // ตัวแปรเก็บสถานะเปิด/ปิดแผนภูมิ
let currentEditingDeckId = null;
let isEditMode = false; // สำหรับ Mobile Edit Mode
let lastTap = 0;        // สำหรับตรวจจับ Double Tap (ต้องอยู่ข้างนอก)

// ฟังก์ชันสำหรับอัปเดตสถานะปุ่ม "ทุกใบ" โดยไม่วาดรูปใหม่ (ป้องกันการกระพริบ)
function updateAllButtonStates() {
    const activeMaster = myDeck.find(c => c.type === "Master");
    const activeBoostMaster = myDeck.find(c => c.type === "Boost_Master");
    const commander = myDeck.find(c => c.isCommander);

    // วนลูปการ์ดทุกใบที่แสดงอยู่ในหน้าจอ
    const visibleCards = document.querySelectorAll('.card');
    
    visibleCards.forEach(cardDiv => {
        const cardId = cardDiv.getAttribute('data-card-id');
        if (!cardId) return;

        // ดึงข้อมูลการ์ดจาก cardsData (ตัวแปร Global)
        const card = cardsData.find(c => String(c.id) === String(cardId));
        if (!card) return;

        // --- Logic การคำนวณเดิมของคุณ ---
        const countInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
        let isDisabled = false;
        let btnText = ""; 
        let btnColor = "#28a745"; 

        // เช็คเงื่อนไข Commander/Master/Limit (ยกมาจาก Logic renderCards ของคุณ)
        let isIllegalByCommander = false;
        const isArmor = card.nameTH && card.nameTH.includes("Armor");
        if (commander && card.type === "Creature" && !isArmor) {
            const targetClans = Array.isArray(card.clan) ? card.clan : [card.clan];
            const commClans = Array.isArray(commander.clan) ? commander.clan : [commander.clan];
            if (!targetClans.some(clan => commClans.includes(clan))) isIllegalByCommander = true;
        }

        if (isIllegalByCommander) {
            isDisabled = true;
            btnText = "เผ่าไม่ตรงกับ Commander";
            btnColor = "#b0b0b0";
        } else if (card.type === "Master") {
            if (activeMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Master อื่นแล้ว";
            } else { btnText = `+ เพิ่ม (0 / 1)`; }
        } else if (card.type === "Boost_Master") {
            if (activeBoostMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeBoostMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Boost Master อื่นแล้ว";
            } else { btnText = `+ เพิ่ม (0 / 1)`; }
        } else {
            const maxLimit = 3;
            if (countInDeck >= maxLimit) {
                isDisabled = true;
                btnText = `ใส่ครบแล้ว ${countInDeck} / ${maxLimit}`;
                btnColor = "#b0b0b0";
            } else {
                btnText = `+ เพิ่ม (${countInDeck} / ${maxLimit})`;
            }
        }

        // สั่งอัปเดตที่ Element ปุ่มโดยตรง
        const addBtn = cardDiv.querySelector('.add-to-deck-btn');
        if (addBtn) {
            addBtn.innerText = btnText;
            addBtn.style.backgroundColor = btnColor;
            addBtn.disabled = isDisabled;
        }
    });
}
//////////////////////////////////

function renderCards(cards) {
    const container = document.getElementById('cardContainer');
    if (!container) return;

    const scrollPos = window.scrollY;
    container.innerHTML = ''; 

    if (cards.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%; color:#888;">ไม่พบการ์ดที่คุณค้นหา</p>';
        return; 
    }

    // 1. ดึงข้อมูลสถานะในเด็คปัจจุบัน
    const activeMaster = myDeck.find(c => c.type === "Master");
    const activeBoostMaster = myDeck.find(c => c.type === "Boost_Master");
    const commander = myDeck.find(c => c.isCommander);

    // แก้ไข: เติมวงเล็บครอบ (card, index)
    cards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-card-id', card.id);

            let cardImgDisplay = `https://wsrv.nl/?url=${encodeURIComponent(card.image)}&w=300&output=webp&q=80`;

        // --- Logic เช็คเผ่าไม่ตรง Commander ---
        let isIllegalByCommander = false;
        
        // แก้ไข: เช็คก่อนว่าเป็น Armor หรือไม่ ถ้าเป็น Armor ให้ข้ามกฎการเช็คเผ่าไปเลย
        const isArmor = card.nameTH && card.nameTH.includes("Armor");

        if (commander && card.type === "Creature" && !isArmor) {
            const targetClans = Array.isArray(card.clan) ? card.clan : [card.clan];
            const commClans = Array.isArray(commander.clan) ? commander.clan : [commander.clan];
            if (!targetClans.some(clan => commClans.includes(clan))) {
                isIllegalByCommander = true;                
            }
        }

        // --- Logic การคำนวณจำนวนและสถานะปุ่ม ---
        // เช็คจาก ID (ใช้ String เพื่อความชัวร์)
        const countInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
        let isDisabled = false;
        let btnText = ""; 
        let btnColor = "#28a745"; // สีเขียวตั้งต้น

        if (isIllegalByCommander) {
            isDisabled = true;
            btnText = "เผ่าไม่ตรงกับ Commander";
            btnColor = "#b0b0b0";
        } 
        // กรณีเป็นการ์ดประเภท Master
        else if (card.type === "Master") {
            if (activeMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Master อื่นแล้ว";
            } else {
                btnText = `+ เพิ่ม (0 / 1)`;
            }
        }
        // กรณีเป็นการ์ดประเภท Boost_Master
        else if (card.type === "Boost_Master") {
            if (activeBoostMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeBoostMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Boost Master อื่นแล้ว";
            } else {
                btnText = `+ เพิ่ม (0 / 1)`;
            }
        }
        // กรณีการ์ดปกติอื่นๆ (Action, Creature, Armor, Field)
        else {
            const maxLimit = 3;
            if (countInDeck >= maxLimit) {
                isDisabled = true;
                btnText = `ใส่ครบแล้ว ${countInDeck} / ${maxLimit}`;
                btnColor = "#b0b0b0";
            } else {
                btnText = `+ เพิ่ม (${countInDeck} / ${maxLimit})`;
            }
        }

        if (isIllegalByCommander) cardDiv.classList.add('disabled-card');

const fullImgUrl = window.location.origin + window.location.pathname.replace('index.html', '') + card.image;        
const optimizedImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(fullImgUrl)}&w=300&output=webp&q=80`;
        cardDiv.innerHTML = `
            <img src="${optimizedImageUrl}"
            onerror="this.src='${card.image}'; this.onerror=null;"
            class="card-img-btn" style="cursor: zoom-in;" loading="lazy" width="150" height="210">
            <div class="card-controls">
                <button class="add-to-deck-btn" 
                    ${isDisabled ? 'disabled' : ''} 
                    style="background-color: ${btnColor}; cursor: ${isDisabled ? 'not-allowed' : 'pointer'};">
                    ${btnText}
                </button>
            </div>
        `;

        // Event Listeners
        cardDiv.querySelector('.card-img-btn').onclick = (e) => {
            e.stopPropagation();
            // แก้ไข: ส่ง 'card' ทั้ง Object เข้าไปแทน 'card.id' เพื่อแก้บั๊กรูป Artwork
            openModal(card); 
        };

        const addBtn = cardDiv.querySelector('.add-to-deck-btn');
        addBtn.onclick = (e) => {
            e.stopPropagation();
            // แนะนำ: ถ้าเปลี่ยน handleAddToDeck ให้รับ card object จะลดโอกาสบั๊กได้มากกว่ารับ id
            handleAddToDeck(e, card); 
        };
        
        // 1. ฟังก์ชันตัวกลางสำหรับเพิ่มการ์ดแบบรวดเร็ว (Quick Add)
        const performQuickAdd = (e) => {
            if (isDisabled) {
                showFeedback(e, "MAX!", "#ff4757");
                return;
            }
            let limit = (card.type === "Master" || card.type === "Boost_Master") ? 1 : 3;
            let currentInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
            let amountToAdd = limit - currentInDeck;

            if (amountToAdd > 0) {
                for (let i = 0; i < amountToAdd; i++) {
                    handleAddToDeck(e, card); 
                }
                showFeedback(e, `+${amountToAdd}`, "#f1c40f");
            } else {
                showFeedback(e, "FULL", "#ff4757");
            }
        };

// --- ส่วนจัดการ Event แบบแยกโหมด (Browsing vs Editing) ---
        const cardImg = cardDiv.querySelector('.card-img-btn');
        let clickTimer = null;
        let isDoubleTapping = false; // ตัวแปรล็อคสถานะชั่วคราว

        cardImg.onclick = (e) => {
            e.stopPropagation();

            // 1. เช็คสถานะ: PC เปิด Side Panel อยู่หรือไม่ OR Mobile อยู่ในโหมดจัดเด็คหรือไม่
            const sidePanel = document.getElementById('deckSidePanel');
            const isPcEditing = sidePanel && sidePanel.classList.contains('open');
            // สมมติว่า toggleMobileDeckMode() มีการเปลี่ยนสถานะ isMobileEditing
            const isMobileEditMode = (typeof isMobileEditing !== 'undefined') ? isMobileEditing : false;

            const isInEditingMode = isPcEditing || isEditMode;

            // --- กรณีที่ 1: โหมดส่องการ์ด (Browsing) ---
            if (!isInEditingMode) {
                if (clickTimer) clearTimeout(clickTimer);
                clickTimer = null;
                openModal(card); // เปิดทันที ไม่หน่วงเวลา
                return;
            }

            // --- กรณีที่ 2: โหมดจัดเด็ค (Editing) ---
            if (clickTimer === null) {
                clickTimer = setTimeout(() => {
                    openModal(card);
                    clickTimer = null;
                }, 250);
            } else {
                clearTimeout(clickTimer);
                clickTimer = null;
                if (typeof handleQuickMultiAdd === 'function') {
                    handleQuickMultiAdd(e, card);
                }
            }
        };

        // 2. คลิกขวา (PC) - ทำงานเฉพาะตอนเปิด Side Panel เท่านั้น
        cardImg.oncontextmenu = (e) => {
            const sidePanel = document.getElementById('deckSidePanel');
            if (sidePanel && sidePanel.classList.contains('open')) {
                e.preventDefault();
                e.stopPropagation();
                if (clickTimer) clearTimeout(clickTimer);
                clickTimer = null;
                if (typeof handleQuickMultiAdd === 'function') {
                    handleQuickMultiAdd(e, card);
                }
            }
            // ถ้าไม่เปิด Panel คลิกขวาจะขึ้นเมนู Browser ปกติ หรือไม่ทำอะไร
        };

 // --- 2. การจัดการ Double Tap (Mobile) ---
cardImg.addEventListener('touchstart', (e) => {
            // ถ้าไม่เปิดโหมดจัดเด็ค ปล่อยผ่าน
            if (typeof isEditMode === 'undefined' || !isEditMode) return; 

            const now = Date.now();
            const TIMESPAN = 350; 

            if (now - lastTap < TIMESPAN && now - lastTap > 0) {
                // --- ตรวจพบ Double Tap ---
                isDoubleTapping = true; // ล็อคไว้ไม่ให้ onclick เปิด Modal
                
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }
                
                if (e.cancelable) e.preventDefault(); 
                
                if (typeof handleQuickMultiAdd === 'function') {
                    handleQuickMultiAdd(e, card);
                }
                
                lastTap = 0;

                // ปลดล็อคหลังจากผ่านไปครู่หนึ่ง
                setTimeout(() => { isDoubleTapping = false; }, 500);
            } else {
                lastTap = now;
            }
        }, { passive: false });

        container.appendChild(cardDiv);
    });

    window.scrollTo(0, scrollPos);

}


function toggleDeckPanel() {
    const panel = document.getElementById('deckSidePanel');
    const body = document.body;

    if (!panel) return;

    panel.classList.toggle('open');
    
    // บังคับสลับ Class ที่ body เพื่อให้ Grid เปลี่ยนจาก 6 เป็น 4
    if (panel.classList.contains('open')) {
        body.classList.add('panel-open');
    } else {
        body.classList.remove('panel-open');
    }

    // อัปเดตไอคอน
    const icon = panel.querySelector('.triangle-icon');
    if (icon) {
        icon.innerText = panel.classList.contains('open') ? "▶" : "◀";
    }

    // สั่งให้ Grid คำนวณใหม่ทันที
    window.dispatchEvent(new Event('resize'));
}

// และต้องเรียกฟังก์ชันอัปเดต UI ทันทีเพื่อให้ตัวเลขที่ปุ่มมุมขวาบนตรงกับความจริง
// 1. ฟังก์ชันช่วยเช็คเงื่อนไข (แยกออกมาข้างนอก)
function canAddCardToDeck(targetCard) {
    
    // 1. ปรับปรุงกฎ Master: แยกเช็ค Master และ Boost_Master ออกจากกันเด็ดขาด
    if (targetCard.type === "Master") {
        const hasSameMaster = myDeck.some(c => c.type === "Master");
        if (hasSameMaster) {
            alert("คุณมี Master ในเด็คแล้ว (ใส่ได้เพียงใบเดียว)");
            return false;
        }
    } else if (targetCard.type === "Boost_Master") {
        const hasSameBoostMaster = myDeck.some(c => c.type === "Boost_Master");
        if (hasSameBoostMaster) {
            alert("คุณมี Boost Master ในเด็คแล้ว (ใส่ได้เพียงใบเดียว)");
            return false;
        }
    }
	
    // หา Commander ในเด็ค (ถ้ามี)
    const commander = myDeck.find(c => c.isCommander);

    // เงื่อนไขที่ 1: เช็คเผ่า (เฉพาะ Creature)
    if (commander && targetCard.type === "Creature") {
        const targetClans = Array.isArray(targetCard.clan) ? targetCard.clan : [targetCard.clan];
        const commClans = Array.isArray(commander.clan) ? commander.clan : [commander.clan];
        
        const isSameClan = targetClans.some(clan => commClans.includes(clan));
        if (!isSameClan) {
            alert(`เด็คนี้มี ${commander.nameTH} เป็นคอมมานเดอร์ ใส่ได้เฉพาะเผ่า ${commClans.join(', ')} เท่านั้น!`);
            return false;
        }
    }

    // เงื่อนไขที่ 2: เช็คจำนวนซ้ำ (รวม Commander + ในเด็ค ห้ามเกิน 3)
    const totalCount = myDeck.filter(c => c.id === targetCard.id).length;
    if (totalCount >= 3) {
        alert("ใส่การ์ดชื่อซ้ำกันรวมแล้วไม่เกิน 3 ใบ (นับรวม Commander)");
        return false;
    }

    return true; // ผ่านทุกเงื่อนไข
}

// 2. ฟังก์ชันหลักในการกดเพิ่มการ์ด
function handleAddToDeck(e, cardOrId) {
    // 1. ดึงข้อมูลการ์ด (รองรับทั้งส่งมาเป็น Object และ ID)
    let card;
    if (cardOrId && typeof cardOrId === 'object') {
        card = cardOrId;
    } else {
        card = cardsData.find(c => String(c.id) === String(cardOrId));
    }

    // ตรวจสอบข้อมูลและการเช็คเงื่อนไขตามระบบเดิม
    if (!card || !canAddCardToDeck(card)) return;

    // --- จัดการข้อมูลเด็ค ---
    const isFusion = card.type && card.type.includes('Fusion_Monster');
    
    // สำคัญ: ใช้ { ...card } เพื่อคัดลอกข้อมูลรูปภาพ (image) ของอาร์ตนั้นๆ ลงไปในเด็คด้วย
    const cardToAdd = { 
        ...card, 
        isExtra: isFusion, 
        isCommander: false 
    };
    
    myDeck.push(cardToAdd);
    saveDeckToLocalStorage();

    // --- จัดการ UI ---
    const deckBody = document.querySelector('.side-panel-content'); // ปรับให้ตรงกับ class ใน deck_builder.css
    const scrollPos = deckBody ? deckBody.scrollTop : 0;

    updateDeckUI(); 

    if (deckBody) deckBody.scrollTop = scrollPos;

    // --- ส่วนสั่งบิน (Fly Animation) ---
    // ตรวจสอบว่ามี event (e) ส่งมาหรือไม่ (ถ้าเพิ่มจาก Modal e อาจเป็น null)
    if (e && e.target) {
        const cardDiv = e.target.closest('.card');
        const startImg = cardDiv ? cardDiv.querySelector('.card-img-btn') : null;

        if (startImg && typeof animateFly === 'function') {
            // ใช้ card.id ของ Object ที่ได้มาในการสร้าง Selector ปลายทาง
            const safeId = String(card.id).replace(/\s+/g, '-');
            const targetSelector = `.target-card-${safeId}`;
            
            requestAnimationFrame(() => {
                animateFly(startImg, targetSelector);
            });
        }
    }

    // อัปเดตหน้าคลังการ์ดเพื่อให้ตัวเลขจำนวนการ์ด (เช่น 1/3) เปลี่ยนตาม
    if (typeof renderCards === 'function') {
        updateAllButtonStates();
    }
	
    // อัปเดต Histogram แบบ Real-time
    const histogramPanel = document.getElementById('typeHistogramPanel');
    if (histogramPanel && histogramPanel.classList.contains('open')) {
        if (typeof renderTypeHistogram === 'function') renderTypeHistogram();
    }
	
    isUnsaved = true;
}

// ฟังก์ชันเดิมของคุณ (ใช้เช็คว่าใบนี้ตั้งเป็นหัวหน้าได้ไหม) - คงไว้เหมือนเดิม
function canSetAsCommander(card) {
if (card.type !== "Creature") return false;

    // 1. เช็คว่าในเด็คมี Boost Master หรือไม่
    const hasBoostMaster = myDeck.some(c => c.type === "Boost_Master");
    const cardDP = parseInt(card.dp) || 0;

    // 2. เงื่อนไขปกติ: DP 4 ขึ้นไป
    if (cardDP >= 4) return true;

    // 3. เงื่อนไขพิเศษ: ถ้ามี Boost Master และการ์ดใบนี้มี property canBeCommander
    if (hasBoostMaster && card.specialCommander === true) {
        return true;
    }

    return false;
}

// ฟังก์ชันใหม่: เช็คว่า "ลูกน้อง" ใบนี้ เข้ากับ "หัวหน้า" ที่เลือกไว้หรือไม่
function isCardCompatibleWithCommander(card) {
    // หาว่าตอนนี้ในเด็คมี Commander หรือยัง
    const currentCommander = myDeck.find(c => c.isCommander === true);
    
    // กฎที่ 1: ถ้ายังไม่มีหัวหน้า หรือการ์ดเป็นประเภท Master/Action/Armor/Field ให้ผ่านเสมอ
    if (!currentCommander || card.type.includes("Master")|| card.type.includes("Armor")|| card.type.includes("Action")|| card.type.includes("Field")
    || card.type.includes("Fusion_Monster")|| card.type.includes("Boost_Creature")|| card.type.includes("Armored_Dino")
    ) 
		return true;

    // กฎที่ 2: ถ้ามีหัวหน้าแล้ว ลูกน้องที่จะเพิ่มต้องมี "เผ่า" (Clan) ตรงกับหัวหน้า
    // (เปรียบเทียบเผ่าของลูกน้อง กับเผ่าของหัวหน้า)
    if (card.clan && currentCommander.clan) {
        return card.clan === currentCommander.clan;
    }

    return true; // กรณีที่ไม่มีข้อมูลเผ่าให้เช็ค ให้ผ่านไปก่อน
}

function createDeckCardElement(card, index) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'deck-item';
    cardDiv.setAttribute('data-index', index);
    cardDiv.setAttribute('data-card-id', card.id); // สำคัญมากสำหรับการ Stack
    
    if (card.isCommander) cardDiv.classList.add('is-commander');

    // นับจำนวนปัจจุบันในเด็ค
    const count = myDeck.filter(c => c.id === card.id).length;

    cardDiv.innerHTML = `
        <img src="${card.image}" alt="${card.nameTH}" onclick="openModal('${card.id}')">
        ${count > 1 && !card.isCommander ? `<div class="card-count-badge">x${count}</div>` : ''}
        <div class="deck-item-controls">
            <button onclick="removeFromDeck(${index})" class="btn-remove">×</button>
        </div>
    `;

    return cardDiv;
}

function addSingleCardToUI(card, index) {
    let targetContainer;
    if (card.isCommander || card.type === "Master" || card.type === "Boost_Master") {
        targetContainer = document.getElementById('starterContainer');
    } else if (card.isExtra) {
        targetContainer = document.getElementById('extraDeckContainer');
    } else {
        targetContainer = document.getElementById('deckContainer');
    }

    if (!targetContainer) return;

    // --- ส่วนที่แก้ไข: เช็คว่ามีการ์ดใบนี้รหัสนี้อยู่ใน Container นั้นหรือยัง ---
    const existingCardElement = targetContainer.querySelector(`[data-card-id="${card.id}"]`);

    if (existingCardElement && !card.isCommander) {
        // 1. ถ้ามีอยู่แล้ว และไม่ใช่คอมมานเดอร์ (คอมมานเดอร์แยกใบเสมอ)
        // ให้หาตัวเลข count เดิมแล้ว +1
        const countBadge = existingCardElement.querySelector('.card-count-badge');
        const currentCount = myDeck.filter(c => c.id === card.id).length;
        
        if (countBadge) {
            countBadge.innerText = `x${currentCount}`;
        } else {
            // ถ้ายังไม่มี badge ให้สร้างใหม่
            const badge = document.createElement('div');
            badge.className = 'card-count-badge';
            badge.innerText = `x${currentCount}`;
            existingCardElement.appendChild(badge);
        }
    } else {
        // 2. ถ้ายังไม่มีใน UI เลย ให้สร้างใหม่ (ใช้ฟังก์ชันเดิมที่เราคุยกัน)
        const cardElement = createDeckCardElement(card, index);
        cardElement.setAttribute('data-card-id', card.id); // เพิ่ม ID ไว้เพื่อหาเจอรอบหน้า
        targetContainer.appendChild(cardElement);
    }
	
	isUnsaved = true;
}


function changeQty(cardId, delta, index = null) {
    let targetIndex = -1;

    // 1. ถ้าส่ง index มา (จากหน้าเด็ค) ให้ใช้ index นั้นโดยตรงเพื่อความแม่นยำเรื่องอาร์ตเวิร์ค
    if (index !== null && index !== undefined) {
        targetIndex = index;
    } else {
        // 2. ถ้าไม่ส่ง index มา (ระบบเก่า) ให้หาใบสุดท้ายที่มี ID นี้
        targetIndex = myDeck.findLastIndex(c => String(c.id) === String(cardId));
    }

    if (targetIndex === -1 && delta < 0) return;

    if (delta > 0) {
        // --- กฎการเพิ่ม (Plus) ---
        const cardTemplate = myDeck[targetIndex];
        const currentCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
        
        if (currentCount < 3) {
            // Copy ข้อมูลการ์ดเดิม (รวม image อาร์ตนั้น) เพิ่มเข้าไป
            myDeck.push({ ...cardTemplate });
        } else {
            alert("การ์ดชื่อนี้ใส่ได้สูงสุด 3 ใบครับ");
            return;
        }
    } else {
        // --- กฎการลด (Minus) ---
        myDeck.splice(targetIndex, 1);
    }

    // อัปเดตสถานะและ UI
    isUnsaved = true;
    if (typeof updateDeckUI === 'function') {
        updateDeckUI();
    }


    // 2. บันทึกข้อมูล


    // 3. จัดการหน้าจอ UI
    const remainingNormalCards = myDeck.filter(c => String(c.id) === String(cardId) && !c.isCommander).length;
    const qtyLabel = document.querySelector(`.qty-number[data-id="${cardId}"]`);
    
    if (remainingNormalCards === 0 || !qtyLabel) {
        // กรณีลบจนหมดใบ หรือหา UI ไม่เจอ ต้องวาดใหม่ (ยอมให้ Re-render)
        updateDeckUI();
    } else {
        // --- ส่วนที่จูนใหม่เพื่อให้ Real-time แบบไม่กระตุก ---
        qtyLabel.innerText = remainingNormalCards; // อัปเดตตัวเลขบนการ์ด
        updateTotalCounterOnly();                  // อัปเดตตัวเลขรวม (เช่น 59/60)
        
        // สั่งอัปเดตแผนภูมิเฉพาะจุด (ส่งค่า isHistogramOpen เข้าไป)
        // ถ้าเปิดแผนภูมิอยู่ มันจะวาดกราฟใหม่ทันทีโดยไม่รีเฟรชการ์ดทั้งหน้า
        if (typeof renderTypeHistogram === 'function') {
            renderTypeHistogram(isHistogramOpen); 
        }
    }

    // 4. อัปเดตสถานะปุ่มฝั่งคลังการ์ด
    if (typeof renderCards === 'function') {
        updateTotalCounterOnly();

    }
	
	isUnsaved = true;
}

// ฟังก์ชันหลักที่ระบบชอบเรียกหา

function updateDeckUI() {
    // 1. (ลบออก) ไม่ตั้งค่า isUnsaved = true ที่นี่ เพราะมันจะทำให้ส้มตลอดเวลา
    // เราจะไปตั้ง true เฉพาะในฟังก์ชัน addToDeck หรือ removeFromDeck แทน

    // 2. Auto-save ลง LocalStorage
    saveDeckToLocalStorage();
    
    // 3. อัปเดตส่วนแสดงผลต่างๆ
    renderAllDeckItems();
    updateTotalCounterOnly();
    bindHistogramEvent();
    updateDynamicBackground(); 
    
    if (typeof renderTypeHistogram === 'function') {
        renderTypeHistogram(isHistogramOpen); 
    }

   // if (typeof renderCards === 'function') {
   //     renderCards(currentFilteredCards);
  //  }

  if (typeof updateAllButtonStates === 'function') {
        updateAllButtonStates(); // อัปเดตแค่เลขปุ่ม หน้าจอจะไม่กระพริบ
    }

const saveBtn = document.querySelector('.btn-save-main'); 
    if (saveBtn) {
        if (isUnsaved) {
            saveBtn.classList.add('unsaved'); // เปิดไฟสีส้มกะพริบ
            if (!saveBtn.innerText.includes('*')) {
                saveBtn.innerText = "บันทึก";
            }
        } else {
            saveBtn.classList.remove('unsaved'); // ปิดไฟสีส้ม กลับเป็นสีเขียว
            saveBtn.innerText = "บันทึก"; 
        }
    }
}



// ฟังก์ชันอัปเดตแค่ตัวเลขรวม (ไม่ล้างหน้าจอ)
function updateTotalCounterOnly() {
    // นับเฉพาะ Main Deck: ไม่เอา Fusion, Armored_Dino และ Master
    const mainCount = myDeck.filter(c => 
        !c.type.includes('Fusion_Monster') && 
        !c.type.includes('Armored_Dino') &&
        !c.type.includes('Boost_Creature') &&
        !c.type.includes('Illusion') &&
        !c.type.includes('Master')
    ).length;
    
    // นับ Extra Deck: Fusion หรือ Armored_Dino
    const extraCount = myDeck.filter(c => 
        c.type.includes('Fusion_Monster') || c.type.includes('Armored_Dino') || c.type.includes('Boost_Creature') || c.type.includes('Illusion')
    ).length;
    
    if(document.getElementById('mainDeckCounter'))
        document.getElementById('mainDeckCounter').innerText = `(${mainCount}/60)`;
        
    if(document.getElementById('extraDeckCounter'))
        document.getElementById('extraDeckCounter').innerText = `(${extraCount}/15)`;
}


function createDeckItem(card, index) {
    const item = document.createElement('div');
    item.className = 'deck-item';    
    const safeId = String(card.id).replace(/\s+/g, '-');
    item.classList.add(`target-card-${safeId}`); 
    
    if (card.isCover) item.classList.add('is-cover-now');
    if (card.isCommander) item.classList.add('is-commander');

    const isMasterGroup = card.type === "Master" || card.type === "Boost_Master";
    const isCommander = card.isCommander === true;
    const displayTypeName = card.type ? card.type.replace('_', ' ').toUpperCase() : 'CARD';

    item.innerHTML = `
    <img src="${card.image}" alt="${card.nameTH}" 
         style="cursor: pointer; border: ${card.isCover ? '2px solid #ff9f43' : 'none'};"
         onerror="this.src='images/placeholder.png'">
    
    <div class="qty-control">${(isCommander || isMasterGroup) ? 
        `<span style="color:${isCommander ? '#f1c40f' : '#3498db'}; font-size:10px; font-weight:bold;">${isCommander ? 'COMMANDER' : displayTypeName}</span>` : 
        `<button class="qty-btn minus" onclick="event.stopPropagation(); changeQty('${card.id}', -1, ${index})">-</button>
         <div class="qty-number">${card.count || 1}</div>
         <button class="qty-btn plus" onclick="event.stopPropagation(); changeQty('${card.id}', 1, ${index})">+</button>`
    }</div>

    ${(isCommander || isMasterGroup) ? `
    <div class="deck-item-overlay-controls">
        <button onclick="event.stopPropagation(); removeFromDeck(${index})" class="btn-custom-action ${isCommander ? 'btn-detach-cmd' : 'btn-eject-master'}">
            ${isCommander ? 'ปลด' : 'ลบ'}
        </button>
    </div>
    ` : ''}
    `;
    
    // --- [เพิ่มส่วน Logic: Quick Remove & Double Interaction] ---
    const img = item.querySelector('img');
    let removeTimer = null;
    let lastRemoveTap = 0;
    let isRemoveDoubleTapping = false;

    // 1. คลิกซ้าย (PC) / แตะปกติ (Mobile)
    img.onclick = (e) => {
        e.stopPropagation();

        // ถ้าเป็นผลพวงมาจาก Double Tap บนมือถือ ให้หยุดทำงาน
        if (isRemoveDoubleTapping) {
            isRemoveDoubleTapping = false;
            return;
        }

        // เช็คโหมดจัดเด็ค (สำหรับ Mobile)
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isInEditMode = (typeof isEditMode !== 'undefined') ? isEditMode : false;

        // ถ้าไม่ได้อยู่ในโหมดแก้เด็ค (บน Mobile) ให้ทำงานปกติทันที
        if (isMobile && !isInEditMode) {
            if (typeof isSelectingCover !== 'undefined' && isSelectingCover) {
                setAsCover(index);
            } else {
                openModal(card);
            }
            return;
        }

        // --- โหมดจัดเด็ค: ใช้ระบบหน่วงเวลาเพื่อแยก Single/Double Click ---
        if (removeTimer === null) {
            removeTimer = setTimeout(() => {
                // SINGLE CLICK: ทำหน้าที่เดิม (ตั้งปก หรือ เปิด Modal)
                if (typeof isSelectingCover !== 'undefined' && isSelectingCover) {
                    setAsCover(index);
                } else {
                    if (typeof openModal === 'function') openModal(card); 
                }
                removeTimer = null;
            }, 250); // หน่วงเวลา 0.25 วินาที
        } else {
            // DOUBLE CLICK: ลบยกชุดทันที
            clearTimeout(removeTimer);
            removeTimer = null;
            if (typeof handleQuickRemove === 'function') {
                handleQuickRemove(e, card, index);
            }
        }
    };

    // 2. คลิกขวา (PC): ลบยกชุดทันที (ไม่ต้องรอเบิ้ลคลิก)
    img.oncontextmenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (removeTimer) clearTimeout(removeTimer);
        removeTimer = null;
        if (typeof handleQuickRemove === 'function') {
            handleQuickRemove(e, card, index);
        }
    };

    // 3. Double Tap (Mobile): สำหรับผู้ใช้มือถือที่เปิด Edit Mode
    img.addEventListener('touchend', (e, card, index) => {
        if (typeof isEditMode === 'undefined' || !isEditMode) return;

        const now = Date.now();
        const TIMESPAN = 350;

        if (now - lastRemoveTap < TIMESPAN && now - lastRemoveTap > 0) {
            // ตรวจพบ Double Tap
            isRemoveDoubleTapping = true;
            if (removeTimer) clearTimeout(removeTimer);
            removeTimer = null;

            if (e.cancelable) e.preventDefault();
            if (typeof handleQuickRemove === 'function') {
                handleQuickRemove(e, card, index);
            }
            lastRemoveTap = 0;
            // ปลดล็อค Flag หลังจากผ่านไปครู่หนึ่ง
            setTimeout(() => { isRemoveDoubleTapping = false; }, 500);
        } else {
            lastRemoveTap = now;
        }
    }, { passive: false });
    
    return item;
}





// ฟังก์ชันวาดการ์ดทั้งหมด (แก้ไขจุดที่ว่างเปล่า)
function renderAllDeckItems() {
    const mainBox = document.getElementById('deckContainer');
    const extraBox = document.getElementById('extraDeckContainer');
    const starterBox = document.getElementById('starterContainer');
    
    if(!mainBox || !extraBox) return;

    // ล้างข้อมูลหน้าจอเก่า
    mainBox.innerHTML = '';
    extraBox.innerHTML = '';
    if(starterBox) starterBox.innerHTML = '';

    // --- 1. จัดกลุ่มการ์ดโดยใช้ ID + Image + isCommander ---
    // วิธีนี้จะทำให้การ์ดใบเดียวกันแต่อาร์ตต่างกัน แยกบรรทัดกันแสดงผลสวยงาม
    const groupedDeck = myDeck.reduce((acc, card, currentIndex) => {
        const groupKey = `${card.id}_${card.image}_${card.isCommander}`;
        
        if (!acc[groupKey]) {
            // เก็บข้อมูลการ์ด และจำ index ตัวแรกที่เจอในกลุ่มนี้ไว้
            acc[groupKey] = { 
                ...card, 
                count: 0, 
                originalIndex: currentIndex // ใช้ตัวนี้ส่งให้โหมดเลือกปกและปุ่ม +/-
            };
        }
        acc[groupKey].count++;
        return acc;
    }, {});

    // --- 2. วาดการ์ดลงใน UI ตามประเภทถังที่กำหนดไว้ ---
    Object.values(groupedDeck).forEach(item => {
        // สร้าง Element โดยส่ง index ของใบแรกในกลุ่มเข้าไป
        const element = createDeckItem(item, item.originalIndex);
        
        const type = String(item.type || "");

        // แยกถังลงหน้าจอ (Starter / Extra / Main)
        if (item.isCommander || type.includes('Master')) {
            // ใบที่เป็น Commander หรือ Master ให้ลง StarterBox
            if(starterBox) starterBox.appendChild(element);
        } else if (item.isExtra || type.includes('Fusion_Monster') || type.includes('Armored_Dino') || type.includes('Boost_Creature')|| type.includes('Illusion')) {
            // ใบที่เป็น Extra Deck
            extraBox.appendChild(element);
        } else {
            // การ์ดทั่วไปลง Main Deck
            mainBox.appendChild(element);
        }
    });
}

// 2. ฟังก์ชันเพิ่มการ์ดลงเด็ค
function addToDeck(cardId) {
	
const card = cardsData.find(c => String(c.id) === String(cardId));
    if (!card) return;

    // เช็คประเภท Master / Boost Master
    const isMasterType = card.type === "Master" || card.type === "Boost_Master";

    if (isMasterType) {
        // เช็คว่าในเด็คมี Master ที่ ID ต่างจากใบนี้อยู่แล้วหรือไม่
        const otherMaster = myDeck.find(c => 
            (c.type === "Master" || c.type === "Boost_Master") && 
            String(c.id) !== String(card.id)
        );

        if (otherMaster) {
            alert(`ไม่สามารถเพิ่มได้! เด็คนี้มี Master แล้วคือ: ${otherMaster.nameTH}`);
            return;
        }
    }
    
    // ตรวจสอบเงื่อนไข (เช่น ไม่เกิน 4 ใบต่อ 1 ชื่อ)
    const count = myDeck.filter(c => c.id === cardId).length;
    if (count >= 3) {
        alert("ใส่การ์ดใบนี้ซ้ำได้ไม่เกิน 3 ใบ");
        return;
    }



    myDeck.push(card);

currentDeck.push(cardId); 
isUnsaved = true;
    updateDeckUI();

}

// 3. ฟังก์ชันลบการ์ดออกจากเด็ค
function removeFromDeck(index) {
	
	
    // 1. ลบการ์ดออกจาก Array
    myDeck.splice(index, 1);
    
    // 2. บันทึกลง LocalStorage
    localStorage.setItem('dinomaster_deck', JSON.stringify(myDeck));

    // 3. เพื่อไม่ให้หน้าจอดีด (Scroll Jump) เราจะใช้วิธีจำตำแหน่ง Scroll ไว้
    const scrollPos = document.querySelector('.deck-body').scrollTop;
    
	
    // วาดหน้าเด็คใหม่เพื่อให้ดัชนี (Index) ของปุ่มลบถูกจัดเรียงใหม่ทั้งหมดป้องกันบั๊ค

    
    // คืนค่า Scroll กลับไปที่เดิมทันที
    document.querySelector('.deck-body').scrollTop = scrollPos;

    // 4. อัปเดตสถานะปุ่มที่คลังการ์ด (ให้ปุ่ม "ใส่ครบแล้ว" กลับมาเป็น "เพิ่มลงเด็ค")
    if (typeof renderCards === 'function') {
        renderCards(currentFilteredCards);
    }
	
	isUnsaved = true;
	    updateDeckUI(); 
}


// 6. ระบบ Export เป็นไฟล์ (รองรับมือถือ)
function exportDeckToFile() {
    const dataStr = JSON.stringify(myDeck);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'my-dino-deck.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// 7. ระบบ Import จากไฟล์
function importDeckFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // ตรวจสอบเบื้องต้นว่าเป็นไฟล์เด็คจริงไหม
            if (Array.isArray(importedData)) {
                myDeck = importedData;
                
                // แจ้งระบบว่ามีการเปลี่ยนแปลง (เพื่อให้ปุ่มเป็นสีส้ม)
                isUnsaved = true; 
                
                updateDeckUI();
                
                // แสดงผลสำเร็จ
                if (typeof showSaveSuccess === 'function') {
                    showSaveSuccess(); // ใช้ตัวเดิมที่เราทำ หรือเปลี่ยนข้อความด้านล่าง
                }
                alert("📥 นำเข้าข้อมูลเด็คเรียบร้อยแล้ว! อย่าลืมกดบันทึกนะครับ");
                
            } else {
                alert("❌ รูปแบบไฟล์ไม่ถูกต้อง");
            }
        } catch (err) {
            alert("❌ ไม่สามารถอ่านไฟล์นี้ได้");
            console.error(err);
        }
        
        // ล้างค่า input เพื่อให้เลือกไฟล์เดิมซ้ำได้ในครั้งต่อไป
        event.target.value = '';
    };
    reader.readAsText(file);
}

function clearDeck() {
    if (confirm("คุณต้องการล้างการ์ดทั้งหมดในเด็คใช่หรือไม่?")) {
        myDeck = []; // ล้างข้อมูลใน Array
        saveDeckToLocalStorage(); // บันทึกค่าว่างลง LocalStorage
		
        // --- จุดสำคัญคือตรงนี้ ---
        updateDeckUI(); 
        
        // แทนที่จะปล่อยให้ UI รีเซ็ตคลัง ให้สั่ง Render คลังการ์ดด้วยค่าฟิลเตอร์ปัจจุบัน
        if (typeof renderCards === "function") {
            // ใช้ currentFilteredCards เพื่อรักษาหน้าการค้นหาเดิมไว้
            renderCards(currentFilteredCards); 
        }
        
    }
	isUnsaved = true;
}

// ฟังก์ชันสำหรับสั่ง Sort ข้อมูลในเด็ค

function sortDeck() {
    if (!myDeck || myDeck.length === 0) return;

    // 1. นับจำนวนการ์ดแต่ละใบในเด็ค
    const cardCounts = {};
    myDeck.forEach(card => {
        const id = String(card.id);
        cardCounts[id] = (cardCounts[id] || 0) + 1;
    });

    const typeOrder = {
        "Creature": 1,
        "Action": 2,
        "Armor": 3,
        "Field": 4,
        "Master": 5
    };

    myDeck.sort((a, b) => {
        // --- 1. แยก Extra Deck ไว้ท้ายสุด ---
        const isExA = (a.type && (a.type.includes('Fusion_Monster') || a.type.includes('Armored_Dino'))) ? 1 : 0;
        const isExB = (b.type && (b.type.includes('Fusion_Monster') || b.type.includes('Armored_Dino'))) ? 1 : 0;
        if (isExA !== isExB) return isExA - isExB;

        // --- 2. เรียงตามประเภท (Type) ---
        const orderA = typeOrder[a.type] || 99;
        const orderB = typeOrder[b.type] || 99;
        if (orderA !== orderB) return orderA - orderB;

        // --- 3. เรียงตามเผ่า (Clan) ---
        // ช่วยให้ Creature เผ่าเดียวกันกองอยู่ด้วยกัน
        const clanA = String(a.clan || "Z-None");
        const clanB = String(b.clan || "Z-None");
        if (clanA !== clanB) return clanA.localeCompare(clanB, 'th');

        // --- 4. กฎจำนวน: กลุ่ม 2-3 ใบ VS 1 ใบ ---
        const countA = cardCounts[String(a.id)];
        const countB = cardCounts[String(b.id)];
        const groupA = countA > 1 ? 0 : 1; 
        const groupB = countB > 1 ? 0 : 1;
        if (groupA !== groupB) return groupA - groupB;

        // --- 5. ถ้าอยู่ในกลุ่มจำนวนเดียวกัน (เช่น 3 ใบเท่ากัน) ให้เรียงตามจำนวนจากมากไปน้อย ---
        if (countA !== countB) return countB - countA;

        // --- 6. สุดท้ายเรียงตามชื่อการ์ด ---
        return String(a.nameTH || "").localeCompare(String(b.nameTH || ""), 'th');
    });
    saveDeckToLocalStorage();
    updateDeckUI();
	
	isUnsaved = true;
}

		// =========================================================
//  FIXED EXPORT FUNCTION (แก้ปัญหา Tainted Canvas / CORS)
// =========================================================

async function exportToPNG() {
    // 1. เพิ่มแจ้งเตือนเล็กน้อยให้ผู้ใช้รู้ว่ากำลังทำงาน (Optional)
    const originalBtnText = event?.target?.innerText;
    if(event?.target) event.target.innerText = "⌛ กำลังเตรียมรูป...";

    const exportArea = document.createElement('div');
    exportArea.className = 'export-container';
    const deckName = document.getElementById('deckNameInput').value || 'My Dinomaster Deck';

    const getGroupedCards = (cardList) => {
        const groups = {};
        cardList.forEach(c => {
            if (!groups[c.id]) groups[c.id] = { ...c, count: 0 };
            groups[c.id].count++;
        });
        return Object.values(groups);
    };

    const starterList = myDeck.filter(c => c.isCommander || c.type === "Master" || c.type === "Boost_Master");
    const extraTypes = ["Boost_Creature", "Fusion_Monster", "Illusion"];
    const extraList = myDeck.filter(c => extraTypes.includes(c.type));
    const mainList = myDeck.filter(c => !c.isCommander && c.type !== "Master" && c.type !== "Boost_Master" && !extraTypes.includes(c.type));

    exportArea.innerHTML = `
        <div style="text-align:center; margin-bottom:20px;">
            <h1 style="color:#fff; margin:0; font-size:32px;">${deckName}</h1>
            <p style="color:#f1c40f; margin:5px 0; font-size:16px;">Dinomaster Trading Card Game</p>
        </div>
        <div class="export-section-title"><span>🛡️ Starter / Commander</span></div>
        <div class="export-grid" id="gridStarter"></div>
        <div class="export-section-title"><span>🃏 Main Deck (${mainList.length})</span></div>
        <div class="export-grid" id="gridMain"></div>
        <div class="export-section-title"><span>✨ Extra Deck (${extraList.length})</span></div>
        <div class="export-grid" id="gridExtra"></div>
        <div style="text-align:center; margin-top:20px; color:#666; font-size:12px;">Generated by Dinomaster Tool</div>
    `;

    document.body.appendChild(exportArea);

    const renderGroupedToGrid = (cardList, gridId, showBadge = true) => {
        const grid = document.getElementById(gridId);
        const grouped = getGroupedCards(cardList);
        grouped.forEach(card => {
            const wrap = document.createElement('div');
            wrap.className = 'export-card-item';
            
            // ปรับปรุง: ไม่เติม Query String เพื่อให้ดึงรูปจาก Cache ได้ทันที
            const imageUrl = card.image; 
            const badgeHtml = showBadge ? `<div class="export-badge">x${card.count}</div>` : "";
            
            wrap.innerHTML = `
                <img src="${imageUrl}" crossorigin="anonymous" class="export-card-img" style="display:block; width:100%;">
                ${badgeHtml}
            `;
            grid.appendChild(wrap);
        });
    };

    renderGroupedToGrid(starterList, 'gridStarter', false);
    renderGroupedToGrid(mainList, 'gridMain', true);
    renderGroupedToGrid(extraList, 'gridExtra', true);

    const images = exportArea.getElementsByTagName('img');
    await Promise.all(Array.from(images).map(img => new Promise(res => { 
        if(img.complete) res(); 
        else { img.onload = res; img.onerror = res; }
    })));

    try {
        const canvas = await html2canvas(exportArea, {
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#1a1c20',
            scale: 1.5,
            logging: false,
            // เพิ่มการจัดการ Buffer
            removeContainer: true 
        });

        // แก้ไขจุดสำคัญ: เปลี่ยนจาก toDataURL เป็น toBlob เพื่อความเร็วสูงสุด
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `Deck_${deckName.replace(/\s+/g, '_')}.png`;
            link.href = url;
            link.click();
            
            // ล้างหน่วยความจำ
            URL.revokeObjectURL(url);
            if(event?.target) event.target.innerText = originalBtnText;
        }, 'image/png');

    } catch (err) {
        console.error("Export Error:", err);
        if(event?.target) event.target.innerText = originalBtnText;
    } finally {
        exportArea.remove();
    }
}

function saveDeckToLocalStorage() {
    let currentCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
    localStorage.setItem('dinomaster_deck', JSON.stringify(myDeck));
    console.log("Deck Autosaved"); 
}


function animateFly(startElement, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    // ถ้าหาการ์ดปลายทางไม่เจอ (เช่น อยู่ในแถบที่ปิดอยู่) ให้บินไปที่ปุ่มเปิดเด็คแทนเป็นแผนสำรอง
    const finalTarget = targetElement || document.querySelector('#openDeckBtn');
    
    if (!startElement || !finalTarget) return;

    const startRect = startElement.getBoundingClientRect();
    const endRect = finalTarget.getBoundingClientRect();

    const flyer = document.createElement('img');
    flyer.src = startElement.src;
    flyer.className = 'flying-card';
    
    Object.assign(flyer.style, {
        position: 'fixed',
        left: `${startRect.left}px`,
        top: `${startRect.top}px`,
        width: `${startRect.width}px`,
        height: `${startRect.height}px`,
        zIndex: '10000',
        pointerEvents: 'none',
        transition: 'all 0.6s ease-in-out' // ปรับความเร็วตามชอบ
    });

    document.body.appendChild(flyer);

    void flyer.offsetWidth; 

    requestAnimationFrame(() => {
        Object.assign(flyer.style, {
            left: `${endRect.left}px`,
            top: `${endRect.top}px`,
            width: '50px', // ย่อให้พอดีกับขนาดในหน้าเด็ค
            height: '70px',
            opacity: '0.5'
        });
    });

    flyer.addEventListener('transitionend', () => {
        flyer.remove();
        // เอฟเฟกต์กระตุกที่การ์ดปลายทาง
        finalTarget.style.transform = 'scale(1.1)';
        setTimeout(() => finalTarget.style.transform = 'scale(1)', 150);
    }, { once: true });
}

// ฟังก์ชันสร้างแอนิเมชั่น ✅
function showSaveSuccess() {
    // ลบอันเก่าถ้ามี (เพื่อป้องกันการซ้อนกันถ้ากดรัวๆ)
    const oldToast = document.querySelector('.save-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'save-toast';
    toast.innerHTML = '<span>✅</span> อัปเดตเด็คเรียบร้อย!';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1500);
}


// --- ฟังก์ชันโหลดเด็ค (ฉบับปรับปรุง: เอา Alert ยืนยันออก) ---
function loadFromCollection(id) {
    const target = myCollections.find(d => d.id === id);
    
    // ตรวจสอบว่าพบเด็คในคอลเล็คชั่นหรือไม่
    if (target) {
        // โหลดข้อมูลการ์ด (ใช้ JSON parse/stringify เพื่อป้องกันปัญหา Reference)
        myDeck = JSON.parse(JSON.stringify(target.cards));
        
        // ใส่ชื่อเด็คลงในช่อง Input
        document.getElementById('deckNameInput').value = target.name;
        
        // บันทึก ID ไว้เพื่อให้ระบบรู้ว่าตอนนี้กำลังแก้ไขเด็คนี้อยู่ (ใช้ตอนกด "เซฟทับ")
        currentEditingDeckId = target.id; 
        
        // บันทึกลง LocalStorage และอัปเดตหน้าจอทันที
        saveDeckToLocalStorage();
        updateDeckUI();
        
        // ปิดหน้าต่างคอลเล็คชั่น/เปลี่ยนโหมดกลับไปหน้าจัดเด็ค
        if (typeof toggleDeckViewMode === 'function') {
            toggleDeckViewMode();
        }

        // (Optional) แสดง Toast สั้นๆ แทน Alert ใหญ่ๆ ถ้าต้องการให้ผู้ใช้รู้ว่าโหลดแล้ว
        console.log(`โหลดเด็ค "${target.name}" เรียบร้อยแล้ว`);
    }
}



// --- 1. ฟังก์ชันตั้งหน้าปกเด็ค (แก้ไขใหม่ให้รองรับ Index และ Alternate Art) ---
function setAsCover(index) {
    // ดึงข้อมูลการ์ดจากตำแหน่งที่จิ้มโดยตรง
    const card = myDeck[index];
    
    if (!card) {
        console.error("ไม่พบการ์ดในตำแหน่งที่เลือก:", index);
        return;
    }

    // ล้างสถานะปกเก่าทั้งหมดในเด็ค
    myDeck.forEach(c => c.isCover = false);
    
    // ตั้งค่าใบที่เลือกเป็นปก
    card.isCover = true;
    
    // สำคัญ: ปิดโหมดเลือกปกทันทีเพื่อให้ UI กลับเป็นปกติ
    if (isSelectingCover) {
        toggleCoverSelectionMode();
    }
    
    // บันทึกและรีเฟรชหน้าจอ
    isUnsaved = true;
    updateDeckUI(); 
    
    alert(`ตั้งค่า ${card.nameTH} เป็นหน้าปกเรียบร้อย!`);
}
// --- 2. ฟังก์ชันดึงรูปหน้าปกเพื่อส่งไป Save ---
function getDeckCoverURL() {
    // หาใบที่มี property isCover เป็น true
    const coverCard = myDeck.find(c => c.isCover === true);
    
    if (coverCard) {
        return coverCard.image; // ส่งรูปอาร์ตที่เลือกไป
    }
    
    // ถ้าไม่มีใบไหนเป็นปก ให้ใช้รูปของใบแรกในเด็ค (Fallback)
    return myDeck.length > 0 ? myDeck[0].image : ''; 
}

// ตอนสร้าง Object ให้เพิ่ม:
// const newSave = { ..., cover: getDeckCover() };


////////////////////ปุ่มเลือกหน้าปกเด็ค////////////////////

let isSelectingCover = false;

// ฟังก์ชันเปิด/ปิดโหมดเลือกปก
function toggleCoverSelectionMode() {
    isSelectingCover = !isSelectingCover;
    const panel = document.getElementById('deckSidePanel');
    
    if (isSelectingCover) {
        panel.classList.add('selecting-cover-active');
        
        // สร้าง Overlay
        const overlay = document.createElement('div');
        overlay.id = 'coverModeOverlay';
        // กำหนด z-index 1004 (ต่ำกว่า Side Panel ที่เราตั้งไว้ 1005 ใน CSS)
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:1004;background:rgba(0,0,0,0.3);";
        
        // ถ้าคลิกที่ Overlay (พื้นที่นอก Side Panel) ถึงจะปิดโหมด
        overlay.onclick = () => {
            if(isSelectingCover) toggleCoverSelectionMode();
        };
        
        document.body.appendChild(overlay);
        alert("โหมดเลือกปก: จิ้มการ์ดในเด็คเพื่อใช้เป็นรูปหน้าปก หรือคลิกข้างนอกเพื่อยกเลิก");
    } else {
        panel.classList.remove('selecting-cover-active');
        const overlay = document.getElementById('coverModeOverlay');
        if (overlay) overlay.remove();
    }
}

// แก้ไขฟังก์ชันตอนสร้าง Card ในหน้าจัดเด็ค ( updateDeckUI )
// ต้องให้การ์ดในเด็คเรียก handleDeckCardClick แทนการเรียกลบโดยตรง
function handleDeckCardClick(event, cardId, index) {
    // สำคัญ: หยุดไม่ให้ Event ไหลไปที่ Overlay (ป้องกันการออกจากโหมดโดยไม่ตั้งใจ)
    if (event) {
        event.stopPropagation();
    }

    if (isSelectingCover) {
        // --- โหมดเลือกปก ---
        myDeck.forEach(c => c.isCover = false);
        
        const target = myDeck.find(c => String(c.id) === String(cardId));
        if (target) {
            target.isCover = true;
            alert(`เลือก "${target.nameTH}" เป็นหน้าปกเด็คแล้ว!`);
        }
        
        toggleCoverSelectionMode(); // ปิดโหมด
        updateDeckUI(); 
    } else {
        // --- โหมดปกติ ---
        openModal(cardId);
    }
	
}

// ฟังก์ชันดึง URL รูปปกมาใช้ตอนกด Save
function getDeckCoverURL() {
    const coverCard = myDeck.find(c => c.isCover);
    return coverCard ? coverCard.image : (myDeck[0] ? myDeck[0].image : '');
}



///////////////////////ฟังก์ชั่นแผนภูมิ///////////////////////
// --- 1. ฟังก์ชันเปิด/ปิดกราฟ ---
const histogramBtn = document.getElementById('typeHistogramBtn');
const histogramPanel = document.getElementById('typeHistogramPanel');

histogramBtn.onclick = (e) => {
    e.stopPropagation(); // ป้องกันบั๊คคลิกแล้วปิดทันที
    const isOpen = histogramPanel.classList.toggle('open');
    histogramBtn.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
    if (isOpen) renderTypeHistogram();
};

// --- 2. ฟังก์ชันปิดเมื่อคลิกที่ใดก็ตาม (ป้องกันบั๊ค) ---
document.addEventListener('click', (e) => {
    if (histogramPanel.classList.contains('open') && !histogramPanel.contains(e.target)) {
        histogramPanel.classList.remove('open');
        histogramBtn.style.transform = "rotate(0deg)";
    }
});

// --- 3. ฟังก์ชันคำนวณและวาดกราฟ ---
function bindHistogramEvent() {
    const btn = document.getElementById('typeHistogramBtn');
    if (btn) {
        btn.onclick = (e) => {
            e.stopPropagation();
            isHistogramOpen = !isHistogramOpen; // สลับสถานะตัวแปร global
            renderTypeHistogram(); // สั่งวาดตามสถานะใหม่
        };
    }
}

// แก้ไขบรรทัดแรกของฟังก์ชัน
function renderTypeHistogram(forceRender = false) {
    const histogramPanel = document.getElementById('typeHistogramPanel');
    const histogramBtn = document.getElementById('typeHistogramBtn');
    if (!histogramPanel || !histogramBtn) return;

    // ตรวจสอบว่าควรแสดงผลไหม
    if (isHistogramOpen || forceRender) {
        histogramPanel.classList.add('open');
        histogramBtn.style.transform = "rotate(180deg)";
    } else {
        histogramPanel.classList.remove('open');
        histogramBtn.style.transform = "rotate(0deg)";
        return; 
    }

    // --- ส่วนคำนวณ Logic (นับจำนวนจริง) ---
    const mainDeckCards = myDeck.filter(c => {
        const type = c.type || "";
        return !type.includes('Fusion_Monster') && !type.includes('Armored_Dino') && !type.includes('Master')
        && !type.includes('Boost_Creature')&& !type.includes('Illusion');
    });

    let totalCount = 0;
    const stats = {};
    mainDeckCards.forEach(card => {
        // ดึงจำนวนจริงจาก card.count (สำคัญมากสำหรับ Real-time)
        const count = card.count || 1; 
        const type = card.type || "Other";
        stats[type] = (stats[type] || 0) + count;
        totalCount += count;
    });

    // --- ส่วนสร้าง HTML กราฟ ---
    const colorMap = { 
        'Creature': '#f7d08bfb', 
        'Action': '#ff6b63', 
        'Armor': '#adbbed', 
        'Field': '#71e391' 
    };

    let html = `<div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 5px; margin-bottom: 10px; font-size: 11px; color:#bdc3c7; display:flex; justify-content:space-between;">
                    <span>สถิติ Main Deck</span>
                    <span>รวม: ${totalCount} ใบ</span>
                </div>`;

    if (totalCount > 0) {
        // เรียงลำดับชื่อประเภท และวาดแถบกราฟ
        Object.keys(stats).sort().forEach(type => {
            const count = stats[type];
            const percentage = (count / totalCount) * 100;
            const color = colorMap[type] || '#3498db';
            
            html += `
                <div class="histogram-row">
                    <div class="histogram-label">${type}</div>
                    <div class="histogram-bar-container">
                        <div class="histogram-bar-fill" style="width: ${percentage}%; background: ${color};"></div>
                    </div>
                    <div class="histogram-count">${count}</div>
                </div>`;
        });
    } else {
        html += '<p style="color:#666; text-align:center; font-size:12px; margin: 10px 0;">ไม่มีการ์ดใน Main Deck</p>';
    }
    
    histogramPanel.innerHTML = html;
}




//////////////Global_Histogram_Logic/////////////
document.addEventListener('click', (e) => {
    const panel = document.getElementById('typeHistogramPanel');
    const btn = document.getElementById('typeHistogramBtn');
    
    if (!isHistogramOpen || !panel || !btn) return;

    // ตรวจสอบว่าจุดที่คลิกยังอยู่ในหน้าเว็บไหม (ถ้าไม่อยู่แสดงว่ามันคือปุ่มที่เพิ่งโดน Re-render ไป)
    const isTargetStillInDoc = document.contains(e.target);
    
    const isClickInsidePanel = panel.contains(e.target);
    const isClickOnBtn = btn.contains(e.target);

    // ถ้าคลิกข้างนอกจริงๆ (และไม่ใช่การคลิกปุ่มที่หายไป) ถึงจะปิด
    if (!isClickInsidePanel && !isClickOnBtn && isTargetStillInDoc) {
        isHistogramOpen = false;
        renderTypeHistogram();
    }
});


/////////////////////////////////////Deck Showcase//////////////



function openDeckShowcase() {
    const overlay = document.getElementById('deckShowcaseOverlay');
    const body = document.getElementById('showcaseBody');
    const title = document.getElementById('showcaseTitle');
    
    if (!overlay || !body) return;

isShowcaseEditMode = false;

    // ดึงชื่อเด็คจาก Input
    const deckName = document.getElementById('deckNameInput').value || "Unnamed Deck";
    title.innerText = deckName;
    
    // 1. แยกกลุ่มการ์ด
    const starterList = myDeck.filter(c => 
        c.isCommander === true || 
        c.type === "Master" || 
        c.type === "Boost_Master"
    );
    const extraList = myDeck.filter(c => !c.isCommander && ["Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion"].includes(c.type));
    
    const mainList = myDeck.filter(c => 
        !starterList.includes(c) && 
        !extraList.includes(c)
    );

    // 2. ฟังก์ชันนับจำนวนซ้ำเพื่อโชว์เลข x2, x3
    const getGrouped = (list) => {
        return list.reduce((acc, card) => {
            if (!acc[card.id]) {
                acc[card.id] = { ...card, count: 0 };
            }
            acc[card.id].count++;
            return acc;
        }, {});
    };

    // 3. สร้างส่วนของสรุปตัวเลข (Stats Bar)
    let finalHtml = `
    <div style="position: sticky; top: 0; background: #1e1e2e; padding: 15px; border-radius: 12px; color: white; margin-bottom: 10px; display: flex; justify-content: space-around; border-bottom: 3px solid #6c5ce7; z-index: 1000; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">STARTER</span>
            <span style="font-size:20px; font-weight:bold; color:#ff9f43;">${starterList.length > 0 ? 1 : 0}</span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">MAIN DECK</span>
            <span style="font-size:20px; font-weight:bold; color:#00d2d3;">${mainList.length} <small style="font-size:12px; color:#666;">/ 60</small></span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">EXTRA DECK</span>
            <span style="font-size:20px; font-weight:bold; color:#54a0ff;">${extraList.length} <small style="font-size:12px; color:#666;">/ 15</small></span>
        </div>
    </div>`;

    // 4. แทรกปุ่ม Toggle และ Dashboard สถิติ (เรียกใช้ฟังก์ชันที่คุณต้องการเพิ่ม)
    finalHtml += `
    <div style="text-align: right; margin-bottom: 15px;">
        <button id="toggleMonitorBtn" onclick="toggleMonitor()" 
                style="background: #6c5ce7; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-family: 'Kanit', sans-serif; font-size: 14px;">
            📊 ดูสถิติเด็ค
        </button>
    </div>
	
    ${getDeckStatsHTML()} 
    `;

// --- 5. วนลูปสร้าง Section การ์ด (เวอร์ชันเสถียร) ---
    const sections = [
        { name: "STARTER / COMMANDER", data: getGrouped(starterList) },
        { name: "MAIN DECK", data: getGrouped(mainList) },
        { name: "EXTRA DECK", data: getGrouped(extraList) }
    ];

    sections.forEach(sec => {
        const cards = Object.values(sec.data);
        if (cards.length > 0) {
            finalHtml += `<h3 style="color:#ff9f43; margin-top:30px; border-left: 4px solid #ff9f43; padding-left:10px; font-size:20px;">${sec.name}</h3>`;
            finalHtml += `<div class="showcase-grid" id="grid-${sec.name.replace(/\s/g, '')}" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; margin-bottom: 20px;">`;
            
            cards.forEach(card => {
                const isStarter = sec.name === "STARTER / COMMANDER";
                const countBadge = !isStarter 
                    ? `<div class="showcase-count-badge" style="position: absolute; top: -5px; right: -5px; background: #ff4757; color: white; padding: 2px 8px; border-radius: 10px; font-weight: bold; z-index: 2;">x${card.count}</div>` 
                    : "";

                const imageUrl = card.image + (card.image.includes('?') ? '&' : '?') + 'not-tainted=1';

finalHtml += `
    <div class="showcase-card" 
         data-card-id="${card.id}" 
         style="position: relative; cursor: pointer; transition: opacity 0.2s;"> 
        <img src="${imageUrl}" 
             onclick="if(!window.isShowcaseEditMode) { typeof openModal === 'function' ? openModal('${card.id}') : showCardModal('${card.id}') }"
             crossorigin="anonymous" 
             onerror="this.removeAttribute('crossorigin'); this.src='${card.image}';"
             style="width:100%; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: block;">
        ${countBadge}
        
        <div class="showcase-controls" style="display: ${window.isShowcaseEditMode ? 'flex' : 'none'}; position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.85); border-radius: 20px; padding: 2px 10px; gap: 15px; border: 1px solid rgba(255,255,255,0.3); z-index:10;">
            <div class="showcase-ctrl-btn minus" style="color:white; font-size:20px; font-weight:bold; cursor:pointer;" onclick="event.stopPropagation(); handleShowcaseUpdate('${card.id}', 'remove')">−</div>
            <div class="showcase-ctrl-btn plus" style="color:white; font-size:20px; font-weight:bold; cursor:pointer;" onclick="event.stopPropagation(); handleShowcaseUpdate('${card.id}', 'add')">+</div>
        </div>
    </div>`;
            });
            finalHtml += `</div>`;
        }
    });

    // แสดงผลลัพธ์
    body.innerHTML = finalHtml;
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeDeckShowcase() {
    document.getElementById('deckShowcaseOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}
//////////////////แผนภูมิละเอียด//////////

function getDeckStatsHTML() {
    const stats = {
        type: {},
        dp: { "0-2": 0, "3-4": 0, "5+": 0 }
    };

    myDeck.forEach(card => {
        // นับประเภท (ไม่รวมใบที่เป็น Commander ถ้าคุณแยกไว้)
        stats.type[card.type] = (stats.type[card.type] || 0) + 1;

        // นับ DP (ถ้าเป็นการ์ด Creature)
        if (card.type === "Creature") {
            const dp = parseInt(card.dp);
            if (dp <= 2) stats.dp["1-2"]++;
            else if (dp <= 4) stats.dp["3-4"]++;
            else stats.dp["5+"]++;
        }
    });
    return stats;
}


// ฟังก์ชันสำหรับสลับการแสดงผลหน้า Dashboard สถิติ
function toggleMonitor() {
    const monitor = document.getElementById('deckMonitor');
    const btn = document.getElementById('toggleMonitorBtn');
    
    if (monitor.style.display === 'none' || monitor.style.display === '') {
        monitor.style.display = 'flex'; // หรือใช้ 'block' ตามความเหมาะสม
        btn.innerText = "📊 ซ่อนสถิติเด็ค";
        btn.style.background = "#ff4757"; // เปลี่ยนเป็นสีแดงตอนเปิด
    } else {
        monitor.style.display = 'none';
        btn.innerText = "📊 ดูสถิติเด็ค";
        btn.style.background = "#6c5ce7"; // กลับเป็นสีม่วงตอนปิด
    }
}

function getDeckStatsHTML() {
    // 1. กรองเฉพาะ Creature ใน Main Deck เพื่อนำมานับเผ่า
    const creatureCards = myDeck.filter(c => 
        c.type === "Creature" && 
        !c.isCommander && 
        !["Fusion_Monster", "Armored_Dino", "Boost_Creature"].includes(c.type)
    );
    
    // 2. กำหนดคู่สีตามเผ่า
    const clanColorMap = {
        "สองขา": "#e74c3c",          // แดง
        "คอยาว": "#9b59b6",          // ม่วง
        "มีปีก": "#3498db",            // ฟ้า
        "มีเขา": "#f1c40f",          // เหลือง
        "สัตว์น้ำ": "#2980b9",        // น้ำเงิน
        "มีเกราะหางหนาม": "#27ae60",  // เขียว
        "จักรกล": "#95a5a6",         // เทา
        "ไม่ระบุเผ่า": "#444444"      // สีเริ่มต้นกรณีไม่มีข้อมูล
    };

    // 3. นับจำนวนตามเผ่า
    const clanCounts = {};
    creatureCards.forEach(c => {
        const clan = c.clan || "ไม่ระบุเผ่า";
        clanCounts[clan] = (clanCounts[clan] || 0) + 1;
    });

    const totalCreatures = creatureCards.length || 1;
    const sortedClans = Object.entries(clanCounts).sort((a, b) => b[1] - a[1]);

    // 4. สร้าง conic-gradient สำหรับ Donut Chart
    let currentPercent = 0;
    const gradientSlices = sortedClans.map((clan) => {
        const clanName = clan[0];
        const color = clanColorMap[clanName] || "#ffffff"; 
        const percent = (clan[1] / totalCreatures) * 100;
        const start = currentPercent;
        currentPercent += percent;
        return `${color} ${start}% ${currentPercent}%`;
    }).join(", ");

    // 5. ข้อมูล DP Curve (ปรับปรุงให้นับ DP 0 และโชว์ครบ 0-8)
    const dpCurve = new Array(9).fill(0); 
    creatureCards.forEach(c => {
        const val = parseInt(c.dp) || 0; 
        if(val >= 0 && val <= 8) dpCurve[val]++;
    });
    const maxCount = Math.max(...dpCurve, 1); 

    return `
    <div id="deckMonitor" style="display:none; background: rgba(20, 20, 35, 0.95); border: 1px solid #6c5ce7; border-radius: 15px; padding: 25px; margin-bottom: 25px; flex-wrap: wrap; gap: 30px; justify-content: space-around; animation: fadeIn 0.3s; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <div style="text-align: center; min-width: 200px;">
            <h4 style="color:#00cec9; margin:0 0 15px 0;">🐾 Creature Clans</h4>
            <div style="position: relative; width: 130px; height: 130px; margin: 0 auto 15px auto; border-radius: 50%; 
                        background: conic-gradient(${gradientSlices || "#444 0% 100%"}); display: flex; align-items: center; justify-content: center;">
                <div style="width: 80px; height: 80px; background: #141423; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 20px; font-weight: bold; color: white;">${creatureCards.length}</span>
                    <span style="font-size: 9px; color: #888;">CREATURES</span>
                </div>
            </div>
            <div style="text-align: left; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                ${sortedClans.map((clan) => {
                    const color = clanColorMap[clan[0]] || "#ffffff";
                    return `
                    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <span style="color:${color};">●</span> ${clan[0]}: ${clan[1]}
                    </div>`;
                }).join('')}
            </div>
        </div>

        <div style="min-width: 250px; flex-grow: 1;">
            <h4 style="color:#ff9f43; margin:0 0 15px 0;">📊 DP Curves (Creature)</h4>
            <div style="display: flex; align-items: flex-end; height: 100px; gap: 10px; padding-bottom: 10px; border-bottom: 1px solid #444;">
                ${dpCurve.map((count, i) => `
                    <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                        <div style="width: 100%; background: linear-gradient(to top, #08ba2f, #1cff54); height: ${(count/maxCount)*80}px; border-radius: 4px 4px 0 0; position:relative; transition: height 0.5s ease;">
                            <span style="position:absolute; top:-20px; width:100%; text-align:center; font-size:11px; font-weight:bold; color:#a29bfe;">${count > 0 ? count : ''}</span>
                        </div>
                        <span style="font-size:10px; color:#aaa; margin-top:8px;">DP${i}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

//////////////////

// ฟังก์ชันจัดการการกดปุ่มคอลเล็คชั่น
// ฟังก์ชันนี้จะถูกเรียกจากปุ่มโดยตรง
// ฟังก์ชันจัดการการกดปุ่มคอลเล็คชั่น (เน้นยืนยันเพื่อออก)
// วางฟังก์ชันนี้ใน deck_builder_logic.js (ทับอันเก่าได้เลย)
function handleCollectionNavigation() {
    // เช็คว่ามีข้อมูลที่ยังไม่ได้บันทึกหรือไม่
    if (isUnsaved === true) {
        const confirmLeave = confirm("⚠️ คุณมีการแก้ไขเด็คที่ยังไม่ได้บันทึก!\n\nกด 'ตกลง' เพื่อออกจากหน้าจัดเด็คโดยไม่เซฟ\nกด 'ยกเลิก' เพื่ออยู่จัดเด็คต่อ");
        
        if (confirmLeave) {
            isUnsaved = false; // ล้างสถานะเมื่อผู้ใช้ยืนยันจะไป
            toggleDeckViewMode();
        }
    } else {
        // ถ้าเซฟแล้ว (isUnsaved เป็น false) ให้ไปหน้าคอลเล็คชั่นได้ทันที
        toggleDeckViewMode();
    }
}
// ฟังก์ชันเสริมสำหรับเช็คความเปลี่ยนแปลง (ตัวอย่าง)
function checkDeckChanges() {
    // สมมติว่าคุณมีตัวแปร isModified ที่เซ็ตเป็น true เมื่อมีการเพิ่ม/ลบการ์ด
    // หรือเช็คจากความยาวของ array ใน deck
    if (typeof isDeckModified !== 'undefined') {
        return isDeckModified;
    }
    return false; // ค่าเริ่มต้น
}

function showSaveSuccess() {
    // สร้าง Element ของ Toast
    const toast = document.createElement('div');
    toast.className = 'save-toast';
    toast.innerHTML = '<span>✅</span> บันทึกเด็คสำเร็จ!';
    document.body.appendChild(toast);

    // ลบออกเมื่อ Animation จบ
    setTimeout(() => {
        toast.remove();
    }, 1500);
}

///////////////////

window.isShowcaseEditMode = window.isShowcaseEditMode || false;

function toggleShowcaseEdit() {
    window.isShowcaseEditMode = !window.isShowcaseEditMode;
    const controls = document.querySelectorAll('.showcase-controls');
    const eyeBtn = document.querySelector('button[onclick="toggleShowcaseEdit()"]');
    
    controls.forEach(el => el.style.display = window.isShowcaseEditMode ? 'flex' : 'none');

    if (eyeBtn) {
        eyeBtn.innerHTML = window.isShowcaseEditMode ? "เลิกแก้ไข" : "แก้ไข";
        eyeBtn.style.background = window.isShowcaseEditMode ? "#e67e22" : "#07357d";
    }
}

function handleShowcaseUpdate(cardId, action) {
    // 1. ค้นหาการ์ดต้นแบบจากฐานข้อมูลกลาง (เพื่อให้ได้ Object ที่สมบูรณ์)
    // ตรวจสอบชื่อตัวแปรฐานข้อมูลของคุณ (ในไฟล์นี้คือ cardsData)
    const allAvailableCards = (typeof cardsData !== 'undefined') ? cardsData : [];
    const template = allAvailableCards.find(c => String(c.id) === String(cardId)) || 
                     myDeck.find(c => String(c.id) === String(cardId));

    if (!template) {
        console.error("❌ ไม่พบข้อมูลการ์ด ID:", cardId);
        return;
    }

    if (action === 'add') {
        // --- กฎการเพิ่มการ์ด (เลียนแบบ addToDeck แต่คุมเอง) ---
        
        // เช็คจำนวนการ์ดซ้ำ (ไม่เกิน 4 ใบตามกฎทั่วไป ถ้าไม่ใช่ Energy)
        const currentCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
        if (currentCount >= 3) {
            alert("⚠️ ใส่การ์ดซ้ำได้ไม่เกิน 3 ใบ");
            return;
        }

        // เช็ค Master (ถ้าเป็นการ์ด Master ต้องมีใบเดียวในเด็ค)
        if (template.type === "Master" || template.type === "Boost_Master") {
            const hasMaster = myDeck.some(c => c.type === template.type);
            if (hasMaster) {
                alert(`⚠️ ในเด็คมี ${template.type} ได้เพียงใบเดียวเท่านั้น`);
                return;
            }
        }

        // เพิ่มลงใน Array โดยตรง (ใช้ Spread เพื่อตัด Reference)
        myDeck.push({ ...template });
        console.log("✅ Added:", template.nameTH);

    } else {
        // --- การลบการ์ด ---
        const index = myDeck.findIndex(c => String(c.id) === String(cardId));
        if (index !== -1) {
            myDeck.splice(index, 1);
            console.log("❌ Removed ID:", cardId);
        }
    }

    // 2. บันทึกข้อมูลและอัปเดต UI หลัก
    isUnsaved = true; // ตั้งสถานะว่ามีการเปลี่ยนแปลง
    saveDeckToLocalStorage(); // บันทึกลง Storage ทันที
    
    if (typeof updateDeckUI === 'function') {
        updateDeckUI(); // อัปเดต Side Panel
    }

    // 3. อัปเดตตัวเลข Badge ในหน้า Showcase ทันที (ไม่ต้องวาดใหม่)
    const newTotalCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
    const cardElements = document.querySelectorAll(`.showcase-card[data-card-id="${cardId}"]`);
    
    cardElements.forEach(cardEl => {
        const badge = cardEl.querySelector('.showcase-count-badge');
        if (badge) {
            badge.innerText = `x${newTotalCount}`;
            badge.style.display = 'block';
        }
        // เอฟเฟกต์ Feedback
        cardEl.style.opacity = newTotalCount === 0 ? "0.4" : "1";
    });
}

// =========================================================
//  Global Helper Functions (วางไว้ล่างสุดของไฟล์)
// =========================================================

// 1. ฟังก์ชันแสดง Visual Feedback (+1, +3, MAX) - แก้ Error showFeedback is not defined
function showFeedback(e, text, color) {
    const feedback = document.createElement('div');
    feedback.className = 'floating-feedback';
    feedback.innerText = text;
    feedback.style.color = color;
    
    // คำนวณตำแหน่ง (รองรับทั้งเมาส์และนิ้ว)
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 800);
}