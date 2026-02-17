// =========================================================
// ไฟล์แยกสำหรับจัดการ Quick Multi-Add (Double Click/Tap)
// =========================================================

// ฟังก์ชันจัดการ Visual Feedback (แก้ไขแล้ว: รองรับ Custom Object และ Null)
function showQuickFeedback(e, text, color = "#f1c40f") {
    const feedback = document.createElement('div');
    feedback.className = 'floating-feedback';
    feedback.innerText = text;
    feedback.style.color = color;

    let x, y;

    // 1. กรณีไม่ได้ส่ง e มาเลย (null/undefined) -> ให้แสดงกลางจอ
    if (!e) {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    } 
    // 2. กรณีเป็น Touch Event (เช็คว่ามี type และขึ้นต้นด้วย touch)
    else if (e.type && e.type.startsWith('touch')) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } 
    // 3. กรณีเป็น Mouse Event หรือ Custom Object {clientX, clientY} จาก main.js
    else {
        x = e.clientX;
        y = e.clientY;
    }

    // กันเหนียว: ถ้าค่าเป็น NaN หรือ undefined ให้ใช้ค่ากลางจอ
    if (isNaN(x) || x === undefined) x = window.innerWidth / 2;
    if (isNaN(y) || y === undefined) y = window.innerHeight / 2;

    feedback.style.left = `${x}px`;
    feedback.style.top = `${y}px`;

    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 800);
}

// ฟังก์ชันหลักสำหรับ Double Click / Double Tap
function handleQuickMultiAdd(e, card) {
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();

    // --- ส่วนตรวจสอบเผ่า (Clan) ก่อนเริ่มทำงานส่วนอื่น เพื่อให้ alert ครั้งเดียว ---
    const commander = myDeck.find(c => c.isCommander);
    if (commander && card.type === "Creature") {
        const targetClans = Array.isArray(card.clan) ? card.clan : [card.clan];
        const commClans = Array.isArray(commander.clan) ? commander.clan : [commander.clan];
        const isSameClan = targetClans.some(clan => commClans.includes(clan));

        if (!isSameClan) {
            alert(`เด็คนี้มี ${commander.nameTH} เป็นคอมมานเดอร์ ใส่ได้เฉพาะเผ่า ${commClans.join(', ')} เท่านั้น!`);
            return; // หยุดการทำงานทันที
        }
    }

    // 1. ตรวจสอบโควตาสูงสุดของการ์ดใบนี้ (รวมกฎ Banlist และกฎประเภทการ์ด)
    let maxLimit = 3;
    
    // ดึงข้อมูล Banlist ปัจจุบัน
    const format = (typeof banlistData !== 'undefined') ? (banlistData[currentBanlistFormat] || banlistData["None"]) : null;
    const cardId = String(card.id);

    if (format) {
        if (format.banned.includes(cardId)) {
            maxLimit = 0; // ถ้าโดนแบน ให้ Max เป็น 0
        } else if (format.limited.includes(cardId)) {
            maxLimit = 1; // ถ้าโดนจำกัด ให้ Max เป็น 1
        } else if (card.type === "Master" || card.type === "Boost_Master") {
            maxLimit = 1; // กฎปกติประเภทการ์ด
        }
    } else if (card.type === "Master" || card.type === "Boost_Master") {
        maxLimit = 1;
    }

    // 2. นับจำนวนปัจจุบันในเด็ค (ใช้ myDeck จากไฟล์หลัก)
    const currentCount = myDeck.filter(c => String(c.id) === String(card.id)).length;
    
    // 3. คำนวณจำนวนที่สามารถเพิ่มได้จริง
    const spaceLeft = maxLimit - currentCount;

    if (spaceLeft <= 0) {
        // ถ้า maxLimit เป็น 0 (โดนแบน) หรือเต็มโควตาแล้ว ให้แสดง Feedback "MAX!"
        showQuickFeedback(e, "MAX!", "#ff4757");
        
        // เรียกใช้ canAddCardToDeck เพื่อพ่น Alert แจ้งเหตุผล (Banned/Limit) เพียงครั้งเดียว
        if (typeof canAddCardToDeck === 'function') {
            canAddCardToDeck(card);
        }
        return;
    }

    // 4. วนลูปเพิ่มการ์ดตามจำนวนที่ว่าง
    let addedCount = 0;
    for (let i = 0; i < spaceLeft; i++) {
        // ส่ง silent = true (i > 0) เพื่อไม่ให้ Alert เด้งซ้ำซ้อนในการวนลูป
        if (typeof canAddCardToDeck === 'function' && canAddCardToDeck(card, i > 0)) {
            const isFusion = card.type && card.type.includes('Fusion_Monster');
            myDeck.push({ ...card, isExtra: isFusion, isCommander: false });
            addedCount++;
        } else {
            break; // ถ้าติดเงื่อนไขอื่น (เช่น Master ซ้ำ) ให้หยุดลูปทันที
        }
    }

    if (addedCount > 0) {
        // 5. บันทึกข้อมูล
        if (typeof saveDeckToLocalStorage === 'function') saveDeckToLocalStorage();
        isUnsaved = true;

        // 6. อัปเดต UI แบบ "ไม่กระพริบ"
        if (typeof updateAllButtonStates === 'function') {
            updateAllButtonStates();
        }

        // อัปเดตแถบรายการในเด็ค (Side Panel)
        if (typeof updateDeckUI === 'function') {
            updateDeckUI(); 
        }

        // 7. แสดง Feedback และ Animation
        showQuickFeedback(e, `+${addedCount}`, "#2ecc71");

        const cardDiv = e.target.closest('.card');
        const startImg = cardDiv ? cardDiv.querySelector('.card-img-btn') : null;
        if (startImg && typeof animateFly === 'function') {
            const safeId = String(card.id).replace(/\s+/g, '-');
            const targetSelector = `.target-card-${safeId}`;
            requestAnimationFrame(() => {
                animateFly(startImg, targetSelector);
            });
        }

        // 8. อัปเดต Histogram (ถ้ามี)
        const histogramPanel = document.getElementById('typeHistogramPanel');
        if (histogramPanel && histogramPanel.classList.contains('open')) {
            if (typeof renderTypeHistogram === 'function') renderTypeHistogram();
        }
    }
}

function showEditModeHint() {
    // ตรวจสอบว่าเป็นมือถือหรือไม่
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 1. ตรวจสอบสถานะการเปิดโหมดจัดเด็ค
    const sidePanel = document.getElementById('deckSidePanel');
    
    // PC: ถือว่าเปิดโหมดเมื่อ Side Panel เปิด (และต้องไม่ใช่ Mobile)
    const isPcEditing = (!isMobile) && (sidePanel && sidePanel.classList.contains('open'));
    
    // Mobile: ถือว่าเปิดโหมดเมื่อตัวแปร isEditMode เป็น true เท่านั้น (ไม่สน Side Panel)
    const isMobileEditing = (isMobile) && ((typeof isEditMode !== 'undefined') ? isEditMode : false);

    // ถ้าไม่เข้าเงื่อนไขเลยสักอย่าง ให้จบฟังก์ชัน (ไม่โชว์ Hint)
    if (!isPcEditing && !isMobileEditing) return;

    // --- ส่วนสร้าง Element (เหมือนเดิม) ---
    const oldHint = document.querySelector('.edit-mode-hint');
    if (oldHint) oldHint.remove();

    const hint = document.createElement('div');
    hint.className = 'edit-mode-hint';
    
    if (isMobile) {
        hint.innerHTML = "💡 <b>กดแช่ที่การ์ด</b> ที่รูปเพื่อเพิ่มทีละ 3 ใบ";
    } else {
        hint.innerHTML = "💡<b>คลิกขวา</b> เพื่อเพิ่มทีละ 3 ใบ";
    }

    document.body.appendChild(hint);

    // ตั้งเวลาหายไป
    setTimeout(() => {
        if (hint && hint.parentElement) {
            hint.classList.add('fade-out');
            setTimeout(() => {
                if (hint && hint.parentElement) hint.remove();
            }, 500);
        }
    }, 3500);
}

//////////////////////////Quick Remove/////////////////////////



function handleQuickRemove(e, card, index = null) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // --- Logic เดียวกับ changeQty: ระบุตัวตนการ์ดเป้าหมาย ---
    let targetCard = null;

    if (index !== null && index !== undefined) {
        // 1. ถ้าส่ง index มา ให้ใช้ index นั้นเพื่อระบุใบและ Artwork ที่ถูกต้อง
        targetCard = myDeck[index];
    } else {
        // 2. ถ้าไม่ส่ง index มา ให้หาใบสุดท้ายที่มี ID นี้ (Logic สำรอง)
        const lastIdx = myDeck.findLastIndex(c => String(c.id) === String(cardId));
        if (lastIdx !== -1) targetCard = myDeck[lastIdx];
    }

    // ถ้าไม่พบการ์ดเลย ให้หยุดทำงาน
    if (!targetCard) return;

    const targetId = targetCard.id;
    const targetImage = targetCard.image; // เก็บ URL รูปไว้เพื่อแยก Artwork

    // --- เริ่มกระบวนการลบ ---
    
    // 1. จำตำแหน่ง Scroll ของ Deck Body
    const deckBody = document.querySelector('.deck-body');
    const scrollPos = deckBody ? deckBody.scrollTop : 0;

    // 2. กรองออก: ลบทุกใบที่มี "ID ตรงกัน" และ "รูปตรงกันเป๊ะๆ" (แยก Art)
    const countBefore = myDeck.length;
    myDeck = myDeck.filter(c => !(String(c.id) === String(targetId) && c.image === targetImage));
    const countRemoved = countBefore - myDeck.length;

    if (countRemoved > 0) {
        // 3. บันทึกลง LocalStorage
        localStorage.setItem('dinomaster_deck', JSON.stringify(myDeck));

        // 4. อัปเดตเฉพาะจุดที่จำเป็น (ไม่วาด Gallery ใหม่)
        if (typeof updateDeckUI === 'function') updateDeckUI(); // วาด Side Bar ใหม่เพื่อล้าง Index
        if (typeof updateTotalCounterOnly === 'function') updateTotalCounterOnly(); // อัปเดตตัวเลขรวม

        // 5. คืนค่า Scroll
        if (deckBody) {
            deckBody.scrollTop = scrollPos;
        }

        // 6. สถานะ Unsaved และ Feedback
        isUnsaved = true;
        if (typeof showQuickFeedback === 'function') {
            showQuickFeedback(e, `-${countRemoved}`, "#ff4757");
        }
    }
}