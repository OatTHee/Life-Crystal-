// =========================================================
//  ABILITY SEARCH — วางไว้ที่นี่เพื่อให้โหลดก่อน main.js
// =========================================================
let abilitySearchMode = false;

function stripAbilityHTML(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
}

function toggleAbilitySearch() {
    abilitySearchMode = !abilitySearchMode;
    const btn = document.getElementById('abilitySearchToggle');
    const searchInput = document.getElementById('searchInput');
    if (btn) {
        if (abilitySearchMode) {
            btn.textContent = '⚡ Effect';
            btn.style.background = '#6c3483';
            btn.style.color = '#e8daef';
            btn.style.borderColor = '#8e44ad';
            btn.style.boxShadow = '0 0 12px rgba(142,68,173,0.6)';
            if (searchInput) searchInput.placeholder = 'ค้นหาจาก Effect / Skill / ความสามารถ...';
        } else {
            btn.textContent = '🔍 ชื่อ';
            btn.style.background = '#07357D';
            btn.style.color = '#aac4ff';
            btn.style.borderColor = '#1a4a9e';
            btn.style.boxShadow = '0 0 8px rgba(255,217,0,0.3)';
            if (searchInput) searchInput.placeholder = 'ค้นหาชื่อการ์ด (ไทย / EN)...';
        }
    }
    if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    if (typeof filterCards === 'function') filterCards();
}

let isUnsaved = false;
let isHistogramOpen = false; // ตัวแปรเก็บสถานะเปิด/ปิดแผนภูมิ
let currentEditingDeckId = null;
let isEditMode = false; // สำหรับ Mobile Edit Mode
let lastTap = 0;        // สำหรับตรวจจับ Double Tap (ต้องอยู่ข้างนอก)


// ฟังก์ชันสำหรับอัปเดตสถานะปุ่ม "ทุกใบ" โดยไม่วาดรูปใหม่ (ป้องกันการกระพริบ)
function updateAllButtonStates() {
    const activeMaster = myDeck.find(c => c.type === "Master");
    const activeBoostMaster = myDeck.find(c => c.type === "Boost_Master");
    const activeLC = myDeck.find(c => c.type === "LC");
    const activeLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
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

        // --- 1. คำนวณ Limit ตาม Banlist (แทรกตรงนี้) ---
        let dynamicMaxLimit = 3; // ค่าเริ่มต้นคือ 3
        if (typeof banlistData !== 'undefined' && typeof currentBanlistFormat !== 'undefined') {
            const format = banlistData[currentBanlistFormat] || banlistData["None"];
            if (format.banned.includes(String(card.id))) {
                dynamicMaxLimit = 0; // ถ้าแบน ให้ Limit เป็น 0
            } else if (format.limited.includes(String(card.id))) {
                dynamicMaxLimit = 1; // ถ้าจำกัด ให้ Limit เป็น 1
            }
        }

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

        } else if (card.type === "LC") {
            if (activeLC) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeLC.id)) ? "เพิ่มแล้ว 1 / 1" : "มี LC อื่นแล้ว";
            } else { btnText = `+ เพิ่ม (0 / 1)`; }

} else if (Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend") {
            // เช็ค Legend ทับ Type อื่นไปเลย (ความสำคัญสูงสุด)
            if (activeLegend) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeLegend.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Legend อื่นแล้ว";
            } else { 
                btnText = `+ เพิ่ม (0 / 1)`; 
            }
        } else {
            // --- แก้ไขตรงนี้: ใช้ dynamicMaxLimit แทนเลข 3 ---
            const maxLimit = dynamicMaxLimit;
            
            // กรณีโดนแบน (maxLimit = 0): จะเข้าเงื่อนไข 0 >= 0 -> เป็นจริง -> ปุ่มเทา ข้อความ "ใส่ครบแล้ว 0 / 0"
            // กรณี Limit 1: จะแสดงผลเป็น x / 1
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
    const activeLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
    const commander = myDeck.find(c => c.isCommander);

    // ตรวจสอบสถานะการเปิดแผงจัดเด็ค/แก้ไข (ย้ายมาเช็คตรงนี้เพื่อให้ใช้ได้ทั่วถึง)
    const sidePanel = document.getElementById('deckSidePanel');
    const isPcEditing = sidePanel && sidePanel.classList.contains('open');
    const isMobileEditMode = (typeof isEditMode !== 'undefined') ? isEditMode : false;
    const showBadges = isPcEditing || isMobileEditMode;

    // แก้ไข: เติมวงเล็บครอบ (card, index)
    cards.forEach((card, index) => {
        const isLegend = Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend";
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.setAttribute('data-card-id', card.id);
        
        // --- [สำคัญ] ต้องใส่ relative เพื่อให้ badge ที่เป็น absolute เกาะอยู่ที่มุมการ์ดนี้ ---
        cardDiv.style.position = 'relative';

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

        // --- 1. คำนวณ Limit และเช็คการแบนล่วงหน้า ---
        let dynamicMaxLimit = 3;
        let isPermanentlyBanned = false;
        let isBanlistLimited = false; // ตัวแปรใหม่: เช็คว่าโดนลิมิตจาก Banlist หรือไม่
        
        if (typeof banlistData !== 'undefined' && typeof currentBanlistFormat !== 'undefined') {
            const format = banlistData[currentBanlistFormat] || banlistData["None"];
            const cardIdStr = String(card.id);
            
            if (format.banned.includes(cardIdStr)) {
                isPermanentlyBanned = true;
                dynamicMaxLimit = 0;
            } else if (format.limited.includes(cardIdStr)) {
                dynamicMaxLimit = 1;
                isBanlistLimited = true; // ✅ เป็น Limit จาก Banlist ให้โชว์ Badge
            } else if (format.limit_if_no_commander && format.limit_if_no_commander.includes(cardIdStr)) {
                // เช็คเงื่อนไขพิเศษ (ถ้าไม่มีคอมให้ลิมิต 1)
                const hasCommander = typeof myDeck !== 'undefined' && myDeck.some(c => c.isCommander);
                if (!hasCommander) {
                    dynamicMaxLimit = 1;
                    isBanlistLimited = true; // ✅ เป็น Limit จากเงื่อนไข Banlist ให้โชว์ Badge
                }
            }
        }

        // กฎ Master / Boost Master (กำหนด Max เป็น 1 แต่ "ไม่" นับว่าเป็น Banlist Limit)
        if (card.type === "Master" || card.type === "Boost_Master" || card.type === "LC") {
            dynamicMaxLimit = 1;
            // ❌ ไม่ต้อง set isBanlistLimited = true
        }

        // --- 2. สร้าง Badge Html (ถ้าอยู่ในโหมดแก้ไข) ---
        let badgeHtml = '';
        if (showBadges) {
            if (isPermanentlyBanned) {
                // ใช้ class "status-badge" แทน style ยาวๆ
                badgeHtml = `<img src="images/icon_ban.png" class="status-badge" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" alt="Banned"><div class="status-badge-fallback ban">BAN</div>`;
            } 
            else if (isBanlistLimited) { 
                badgeHtml = `<img src="images/icon_limit1.png" 
                             class="status-badge"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" 
                             alt="Limit 1">
                             <div class="status-badge-fallback limit">1</div>`;
            }
        }

        // --- Logic การคำนวณจำนวนและสถานะปุ่ม ---
        const countInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
        let isDisabled = false;
        let btnText = ""; 
        let btnColor = "#28a745"; // สีเขียวตั้งต้น

        if (isPermanentlyBanned) {
            isDisabled = true;
            btnText = "โดนแบน (BANNED)";
            btnColor = "#b0b0b0";
        } else if (isIllegalByCommander) {
            isDisabled = true;
            btnText = "เผ่าไม่ตรงกับ Commander";
            btnColor = "#b0b0b0";
        } else if (card.type === "Master") {
            if (activeMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Master อื่นแล้ว";
            } else {
                btnText = `+ เพิ่ม (0 / 1)`;
            }
        } else if (card.type === "Boost_Master") {
            if (activeBoostMaster) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeBoostMaster.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Boost Master อื่นแล้ว";
            } else {
                btnText = `+ เพิ่ม (0 / 1)`;
            }

} else if (Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend") {
            // เช็ค Legend ทับ Type อื่นไปเลย (ความสำคัญสูงสุด)
            if (activeLegend) {
                isDisabled = true;
                btnColor = "#b0b0b0";
                btnText = (String(card.id) === String(activeLegend.id)) ? "เพิ่มแล้ว 1 / 1" : "มี Legend อื่นแล้ว";
            } else { 
                btnText = `+ เพิ่ม (0 / 1)`; 
            }
        } else {
            const maxLimit = dynamicMaxLimit;
            if (countInDeck >= maxLimit) {
                isDisabled = true;
                btnText = `ใส่ครบแล้ว ${countInDeck} / ${maxLimit}`;
                btnColor = "#b0b0b0";
            } else {
                btnText = `+ เพิ่ม (${countInDeck} / ${maxLimit})`;
            }
        }

        if (isIllegalByCommander || isPermanentlyBanned) cardDiv.classList.add('disabled-card');

        const fullImgUrl = window.location.origin + window.location.pathname.replace('index.html', '') + card.image;        
        const imgVersion = "1.2";
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        const fullAbsoluteUrl = new URL(card.image, baseUrl).href;
        const cleanUrl = fullAbsoluteUrl.replace(/^https?:\/\//, '');
        const optimizedImageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=300&output=webp&q=80&we=1&n=-1`;
        
        cardDiv.innerHTML = `
            ${badgeHtml}
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
            openModal(card); 
        };

        const addBtn = cardDiv.querySelector('.add-to-deck-btn');
        addBtn.onclick = (e) => {
            e.stopPropagation();
            if (typeof canAddCardToDeck === 'function' && !canAddCardToDeck(card)) {
                return; 
            }
            handleAddToDeck(e, card); 
        };
        
        // ... (Logic Event Listeners อื่นๆ คงเดิม) ...
        // --- ส่วนจัดการ Event แบบแยกโหมด (Click vs Long Press) ---
        const cardImg = cardDiv.querySelector('.card-img-btn');
        let pressTimer = null;
        let isLongPress = false;

        const startPress = (e) => {
            const sidePanel = document.getElementById('deckSidePanel');
            const isPcEditing = sidePanel && sidePanel.classList.contains('open');
            const isMobileEditMode = (typeof isEditMode !== 'undefined') ? isEditMode : false;
            
            if (!isPcEditing && !isMobileEditMode) return;

            isLongPress = false;
            pressTimer = setTimeout(() => {
                isLongPress = true; 
                if (navigator.vibrate) navigator.vibrate(50); 
                
                if (typeof handleQuickMultiAdd === 'function') {
                    handleQuickMultiAdd(e, card);
                }
            }, 500); 
        };

        const cancelPress = () => {
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        cardImg.addEventListener('mousedown', startPress);
        cardImg.addEventListener('mouseup', cancelPress);
        cardImg.addEventListener('mouseleave', cancelPress);

        cardImg.addEventListener('touchstart', (e) => {
            startPress(e);
        }, { passive: true });
        
        cardImg.addEventListener('touchend', cancelPress);
        cardImg.addEventListener('touchmove', cancelPress); 

        cardImg.onclick = (e) => {
            e.stopPropagation();
            if (isLongPress) {
                isLongPress = false; 
                return;
            }
            openModal(card);
        };

        cardImg.oncontextmenu = (e) => {
            // สำคัญ: บรรทัดนี้จะกันไม่ให้เมนู save รูปเด้งขึ้นมา
            e.preventDefault(); 
            e.stopPropagation();
            
            cancelPress(); // ยกเลิกการกดค้าง (Logic เดิม)

            // ทำงาน Logic เพิ่มการ์ดตามปกติ
            const sidePanel = document.getElementById('deckSidePanel');
            const isPcEditing = sidePanel && sidePanel.classList.contains('open');
            const isMobileEditMode = (typeof isEditMode !== 'undefined') ? isEditMode : false;

            if (isPcEditing || isMobileEditMode) {
                if (typeof handleQuickMultiAdd === 'function') {
                    handleQuickMultiAdd(e, card);
                }
            }
        };

        container.appendChild(cardDiv);
    }); 

    window.scrollTo(0, scrollPos);
}
// 1. ฟังก์ชันช่วยเช็คเงื่อนไข (แยกออกมาข้างนอก)
function canAddCardToDeck(targetCard, silent = false) {
    // 1. ดึงข้อมูล Banlist
    const format = (typeof banlistData !== 'undefined') ? (banlistData[currentBanlistFormat] || banlistData["None"]) : null;
    const cardId = String(targetCard.id);
    const isLegend = Array.isArray(targetCard.type) ? targetCard.type.includes("Legend") : targetCard.type === "Legend";
    
    // --- ส่วนคำนวณ Limit จำนวนการ์ด ---
    let maxLimit = 3;
    if (typeof getCardMaxLimit === 'function') {
        maxLimit = getCardMaxLimit(targetCard);
    } else {
        // ให้ Legend โดนบีบเหลือ 1 ด้วย
        if (isLegend || targetCard.type === "Master" || targetCard.type === "Boost_Master" || targetCard.type === "LC") {
            maxLimit = 1;
        }
    }

    // --- กฎเหล็ก: เช็ค Legend ซ้ำในเด็ค ---
    if (isLegend) {
        const existingLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
        // ถ้ามี Legend อยู่แล้ว และใบที่จะเพิ่มไม่ใช่ใบเดิม (ป้องกันการใส่ Legend 2 ชื่อ)
        if (existingLegend && String(existingLegend.id) !== String(targetCard.id)) {
            if (!silent) alert(`เด็คนี้มีการ์ด Legend แล้ว (${existingLegend.nameTH})\nใส่ Legend ได้เพียง 1 ใบต่อเด็คเท่านั้น!`);
            return false;
        }
    }

    const totalCount = myDeck.filter(c => String(c.id) === cardId).length;

    if (maxLimit === 0) {
        if (!silent) alert(`🚫 การ์ดใบนี้ถูก "BANNED" ใน${format ? format.name : 'ฟอร์แมตปัจจุบัน'}\nไม่สามารถใส่ในเด็คได้`);
        return false;
    }

    if (totalCount >= maxLimit) {
        if (!silent) {
            if (maxLimit === 1) {
                // เช็คว่าเป็นกฎ Limit_if_no_commander หรือไม่
                const conditionalRule = format && format.conditional_limits &&
                    format.conditional_limits.find(rule => rule.limit === 1 && rule.target.includes(cardId) &&
                        myDeck.some(c => rule.trigger.includes(String(c.id))));

                if (format && format.limit_if_no_commander && format.limit_if_no_commander.includes(cardId)) {
                    const hasCommander = myDeck.some(c => c.isCommander);
                    if (!hasCommander) {
                        alert(`⚠️ การ์ดใบนี้ Limit 1 ใบ หากยังไม่ตั้ง Commander!\n(ตั้ง Commander ก่อนเพื่อใส่เพิ่ม)`);
                    } else {
                        alert(`⚠️ การ์ดใบนี้ใส่ได้เพียง 1 ใบเท่านั้น`);
                    }
                } else if (conditionalRule) {
                    alert(`⚠️ ${conditionalRule.message || "การ์ดใบนี้ใส่ได้เพียง 1 ใบเท่านั้น เนื่องจากมีการ์ดหลักอยู่ในเด็คแล้ว"}`);
                } else {
                    alert(`⚠️ การ์ดใบนี้ใส่ได้เพียง 1 ใบเท่านั้น`);
                }
            } else {
                alert(`ใส่การ์ดชื่อซ้ำกันได้ไม่เกิน ${maxLimit} ใบต่อเด็ค`);
            }
        }
        return false;
    }

    // --- 2. (อัปเดตใหม่) เช็คการ์ดขัดแย้ง (Conflict Groups) รองรับ A, B, C... ---
    if (format && format.conflict_groups) {
        for (const groupObj of format.conflict_groups) {
            // 2.1 ดึงชื่อกลุ่มทั้งหมดออกมา (groupA, groupB, groupC, ...)
            const allGroupKeys = Object.keys(groupObj).filter(k => k.startsWith('group'));
            
            // 2.2 หาว่าการ์ดที่เราจะเพิ่ม (targetCard) อยู่ในกลุ่มไหน
            let myGroupKey = null;
            for (const key of allGroupKeys) {
                if (groupObj[key].includes(cardId)) {
                    myGroupKey = key;
                    break;
                }
            }

            // ถ้าการ์ดที่จะเพิ่ม ไม่อยู่ในกฎข้อนี้เลย ก็ข้ามไปดูข้อถัดไป
            if (!myGroupKey) continue;

            // 2.3 ถ้าเจอว่าอยู่ในกลุ่มใดกลุ่มหนึ่ง ให้เช็คว่าในเด็คมี "กลุ่มอื่น" ปนอยู่ไหม
            // กลุ่มอื่น = key ทั้งหมด ที่ไม่ใช่ myGroupKey
            const otherGroupKeys = allGroupKeys.filter(k => k !== myGroupKey);

            for (const otherKey of otherGroupKeys) {
                const forbiddenIds = groupObj[otherKey];
                
                // ตรวจสอบว่าในเด็คมี ID ใดๆ ที่อยู่ในรายการต้องห้ามนี้หรือไม่
                const conflictCard = myDeck.find(c => forbiddenIds.includes(String(c.id)));
                
                if (conflictCard) {
                    if (!silent) alert(`❌ ผิดกฎการจัดเด็ค: ${groupObj.message || "ห้ามใส่ร่วมกัน"}\n(เนื่องจากมี ${conflictCard.nameEN || conflictCard.id} อยู่ในเด็คแล้ว)`);
                    return false;
                }
            }
        }
    }
    // ----------------------------------------------------

    // 3. กฎ Master/Boost Master (คงเดิม)
    if (targetCard.type === "Master") {
        const hasAnyMaster = myDeck.some(c => c.type === "Master");
        if (hasAnyMaster) {
            if (!silent) alert("คุณมี Master ในเด็คแล้ว (ใส่ได้เพียงประเภทละ 1 ใบ)");
            return false;
        }
    } else if (targetCard.type === "Boost_Master") {
        const hasAnyBoostMaster = myDeck.some(c => c.type === "Boost_Master");
        if (hasAnyBoostMaster) {
            if (!silent) alert("คุณมี Boost Master ในเด็คแล้ว (ใส่ได้เพียงประเภทละ 1 ใบ)");
            return false;
        }
    }

    // 4. เงื่อนไข Commander: เช็คเผ่า (คงเดิม)
    const commander = myDeck.find(c => c.isCommander);
    if (commander && targetCard.type === "Creature") {
        const targetClans = Array.isArray(targetCard.clan) ? targetCard.clan : [targetCard.clan];
        const commClans = Array.isArray(commander.clan) ? commander.clan : [commander.clan];
        
        const isSameClan = targetClans.some(clan => commClans.includes(clan));
        if (!isSameClan) {
            if (!silent) alert(`เด็คนี้มี ${commander.nameTH} เป็นคอมมานเดอร์\nใส่ได้เฉพาะเผ่า ${commClans.join(', ')} เท่านั้น!`);
            return false;
        }
    }

    return true; 
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
        
        const isLegend = Array.isArray(cardTemplate.type) ? cardTemplate.type.includes("Legend") : cardTemplate.type === "Legend";
const maxQty = isLegend ? 1 : 3;

if (isLegend) {
    const existingLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
    if (existingLegend && String(existingLegend.id) !== String(cardId)) {
        alert("เด็คนี้มีการ์ด Legend แล้ว ใส่ Legend ได้เพียง 1 ใบต่อเด็คเท่านั้น!");
        return;
    }
}

if (currentCount < maxQty) {
    myDeck.push({ ...cardTemplate });
} else {
    alert(`การ์ดใบนี้ใส่ได้สูงสุด ${maxQty} ใบครับ`);
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

// Update UI

function updateDeckUI() {
    // 1. Auto-save
    saveDeckToLocalStorage();
    
    // 2. อัปเดตส่วนแสดงผลหลัก
    if (typeof renderAllDeckItems === 'function') renderAllDeckItems();
    if (typeof updateTotalCounterOnly === 'function') updateTotalCounterOnly();

    // 3. เรียกใช้ฟังก์ชันเจ้าปัญหา (ใส่ Check เพื่อไม่ให้ Error ค้าง)
    if (typeof bindHistogramEvent === 'function') {
        bindHistogramEvent();
    } else {
        console.warn("⚠️ ไม่พบฟังก์ชัน bindHistogramEvent");
    }

    if (typeof updateDynamicBackground === 'function') {
        updateDynamicBackground(); 
    } else {
        console.warn("⚠️ ไม่พบฟังก์ชัน updateDynamicBackground");
    }
    
    // 4. อัปเดตกราฟ Histogram
    if (typeof renderTypeHistogram === 'function') {
        renderTypeHistogram(isHistogramOpen); 
    }

    // 5. อัปเดตสถานะปุ่ม
    if (typeof updateAllButtonStates === 'function') {
        updateAllButtonStates();
    }

    // 6. อัปเดตปุ่มบันทึก (Save Button)
    const saveBtn = document.querySelector('.btn-save-main'); 
    if (saveBtn) {
        if (typeof isUnsaved !== 'undefined' && isUnsaved) {
            saveBtn.classList.add('unsaved');
            saveBtn.innerText = "บันทึก*"; 
        } else {
            saveBtn.classList.remove('unsaved');
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
        !c.type.includes('LC') &&
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

const isMasterGroup = card.type === "Master" || card.type === "Boost_Master" || card.type === "LC";
const isCommander = card.isCommander === true;
const isLegendCard = Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend";
const displayTypeName = card.type

    ? (Array.isArray(card.type) ? card.type.join(' / ') : card.type.replace('_', ' ')).toUpperCase()
    : 'CARD';
    const safeTypeStr = Array.isArray(card.type) ? card.type.join("_") : (card.type || "");
    item.innerHTML = `
    <img src="${card.image}" alt="${card.nameTH}" 
         style="cursor: pointer; border: ${card.isCover ? '2px solid #ff9f43' : 'none'};"
         onerror="this.src='images/placeholder.png'">
    
    <div class="qty-control">${(isCommander || isMasterGroup || isLegendCard) ? 
        `<span style="color:${isCommander ? '#f1c40f' : isLegendCard ? '#9b59b6' : '#3498db'}; font-size:10px; font-weight:bold;">${isCommander ? 'COMMANDER' : displayTypeName}</span>
         <button class="qty-btn minus" style="position:absolute; top:3px; right:3px; width:20px; height:20px; font-size:13px; border-radius:50%; z-index:10; padding:0; line-height:1;" onclick="event.stopPropagation(); removeFromDeck(${index})">×</button>` : 
        `<button class="qty-btn minus" onclick="event.stopPropagation(); changeQty('${card.id}', -1, ${index})">-</button>
         <div class="qty-number">${card.count || 1}</div>
         <button class="qty-btn plus" onclick="event.stopPropagation(); changeQty('${card.id}', 1, ${index})">+</button>`
    }</div>
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
        if (item.isCommander || type.includes('Master') || type.includes('LC')) {
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
    const isMasterType = card.type === "Master" || card.type === "Boost_Master" || card.type === "LC";

    if (isMasterType) {
        // เช็คว่าในเด็คมี Master ที่ ID ต่างจากใบนี้อยู่แล้วหรือไม่
        const otherMaster = myDeck.find(c => 
            (c.type === "Master" || c.type === "Boost_Master" || c.type === "LC") && 
            String(c.id) !== String(card.id)
        );

        if (otherMaster) {
            alert(`ไม่สามารถเพิ่มได้! เด็คนี้มี Master แล้วคือ: ${otherMaster.nameTH}`);
            return;
        }
    }
    
    const isLegend = Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend";
const maxQty = isLegend ? 1 : 3;

if (isLegend) {
    const existingLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
    if (existingLegend && String(existingLegend.id) !== String(card.id)) {
        alert(`เด็คนี้มีการ์ด Legend แล้ว (${existingLegend.nameTH})\nใส่ Legend ได้เพียง 1 ใบต่อเด็คเท่านั้น!`);
        return;
    }
}

const count = myDeck.filter(c => c.id === cardId).length;
if (count >= maxQty) {
    alert(`ใส่การ์ดใบนี้ซ้ำได้ไม่เกิน ${maxQty} ใบ`);
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

function saveDeckToLocalStorage() {
    let currentCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
    localStorage.setItem('dinomaster_deck', JSON.stringify(myDeck));
    console.log("Deck Autosaved"); 
}


function animateFly(startElement, targetSelector) {
    // Escape อักขระพิเศษใน selector เช่น < > ( ) ที่อาจมาจาก card ID
    const safeSelector = targetSelector.replace(/([<>()[\]{}*+?.,\\^$|#\s])/g, '\\$1');
    const targetElement = document.querySelector(safeSelector);
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
        const isLegend = Array.isArray(template.type) ? template.type.includes("Legend") : template.type === "Legend";
const maxQty = isLegend ? 1 : 3;
const currentCount = myDeck.filter(c => String(c.id) === String(cardId)).length;

if (isLegend) {
    const existingLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
    if (existingLegend && String(existingLegend.id) !== String(cardId)) {
        alert(`⚠️ เด็คนี้มีการ์ด Legend แล้ว (${existingLegend.nameTH})\nใส่ Legend ได้เพียง 1 ใบเท่านั้น`);
        return;
    }
}

if (currentCount >= maxQty) {
    alert(`⚠️ ใส่การ์ดซ้ำได้ไม่เกิน ${maxQty} ใบ`);
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
// ฟังก์ชันสำหรับวาดกราฟสถิติประเภทการ์ด
// ฟังก์ชันสำหรับวาดกราฟสถิติประเภทการ์ด (เวอร์ชั่นอัปเดต: นับเฉพาะ Main Deck)
function renderTypeHistogram() {
    const panel = document.getElementById('typeHistogramPanel');
    if (!panel) return;

    if (!isHistogramOpen) {
        panel.classList.remove('open');
        return;
    }

    panel.classList.add('open');

    // 1. ข้อมูลพื้นฐาน
    const targetTypes = ['Creature', 'Action', 'Armor', 'Field'];
    const mainDeckCards = myDeck.filter(card => targetTypes.includes(card.type));
    const totalMainCards = mainDeckCards.length;

    // 2. แผนผังสี (Constants)
    const typeColors = {
        'Creature': '#f1c40f', // สีเหลือง (พื้นฐานกรณีไม่มีเผ่า)
        'Action': '#e74c3c',   // สีแดง
        'Armor': '#3498db',    // สีน้ำเงิน
        'Field': '#2ecc71'     // สีเขียว
    };

    const clanColorMap = {
        "สองขา": "#e74c3c", "คอยาว": "#9b59b6", "มีปีก": "#3fbffa",
        "มีเขา": "#f1c40f", "สัตว์น้ำ": "#1a46e6", "มีเกราะหางหนาม": "#27ae60",
        "จักรกล": "#95a5a6", "ไม่ระบุเผ่า": "#444444"
    };

    // 3. สร้าง HTML
    let html = `

        <div class="histogram-container">
    `;

    if (totalMainCards === 0) {
        html += `<p style="text-align:center; color:#7f8c8d; font-size: 14px;">ยังไม่มีการ์ดในเด็ค</p>`;
    } else {
        targetTypes.forEach(type => {
            const cardsInType = mainDeckCards.filter(c => c.type === type);
            const count = cardsInType.length;
            const percentage = (count / totalMainCards) * 100;
            
            let barBackground = typeColors[type]; // สีพื้นฐาน

            // --- พิเศษ: คำนวณ Multi-color สำหรับ Creature ---
            if (type === 'Creature' && count > 0) {
                const clanStats = {};
                cardsInType.forEach(c => {
                    const clan = c.clan || "ไม่ระบุเผ่า";
                    clanStats[clan] = (clanStats[clan] || 0) + 1;
                });

                let currentPos = 0;
                const gradientParts = [];
                const sortedClans = Object.entries(clanStats).sort((a, b) => b[1] - a[1]);

                sortedClans.forEach(([clanName, clanCount]) => {
                    const clanPercent = (clanCount / count) * 100;
                    const color = clanColorMap[clanName] || clanColorMap["ไม่ระบุเผ่า"];
                    gradientParts.push(`${color} ${currentPos}% ${currentPos + clanPercent}%`);
                    currentPos += clanPercent;
                });
                
                barBackground = `linear-gradient(to right, ${gradientParts.join(', ')})`;
            }

            html += `
                <div class="hist-row">
                    <div class="hist-label">
                        <span style="font-size:12px;">${type} :</span>
                        <span style="font-size:12px;">${count}</span>
                    </div>
                    <div class="hist-bar-bg">
                        <div class="hist-bar-fill" style="width: ${percentage}%; background: ${barBackground};"></div>
                    </div>
                </div>
            `;
        });
    }

    html += `</div>`;
    panel.innerHTML = html;
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