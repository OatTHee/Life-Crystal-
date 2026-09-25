// 1. ฟังก์ชันสลับหน้า
function toggleDeckViewMode() {


        currentFilteredCards = cardsData;
    renderCards(currentFilteredCards);

    const builder = document.getElementById('deckBuilderView');
    const collection = document.getElementById('deckCollectionView');
    
    // ดึงปุ่มและไอคอน/ข้อความบนปุ่มมาเพื่อเปลี่ยนสถานะ
    const viewModeIcon = document.getElementById('viewModeIcon');
    const viewModeText = document.getElementById('viewModeText');

    if (!builder || !collection) return;

    // เช็คว่าหน้าจัดเด็คแสดงอยู่หรือไม่
    const isBuilderVisible = window.getComputedStyle(builder).display !== 'none';

    if (isBuilderVisible) {
        // --- สลับไปหน้า Collection ---
        builder.style.setProperty('display', 'none', 'important');
        collection.style.setProperty('display', 'flex', 'important');
        
        // เปลี่ยนสถานะปุ่ม (Optional: เพื่อให้ผู้ใช้รู้ว่ากดแล้วจะกลับไปไหน)
        if(viewModeIcon) viewModeIcon.innerText = "🛠️";
        if(viewModeText) viewModeText.innerText = "หน้าจัดเด็ค";
        
        
        renderCollection(); 
        myDeck = []; 
        currentEditingDeckId = null;
                updateDeckUI(); 

               if (typeof renderCards === "function") {
            // ใช้ currentFilteredCards เพื่อรักษาหน้าการค้นหาเดิมไว้
            renderCards(currentFilteredCards); 
        }  

    } else {
        // --- สลับกลับไปหน้า Builder ---
        collection.style.setProperty('display', 'none', 'important');
        builder.style.setProperty('display', 'flex', 'important');
        
        // เปลี่ยนสถานะปุ่มกลับ
        if(viewModeIcon) viewModeIcon.innerText = "📂";
        if(viewModeText) viewModeText.innerText = "คอลเล็คชั่น";
    }
        
    
}

// 2. ฟังก์ชันแสดงรายการเด็ค (แก้ไข: ย้ายปุ่มเพิ่มไปไว้ท้ายสุด)
function renderCollection() {

    const container = document.getElementById('collectionListContainer');
    if (!container) return;
    container.innerHTML = '';

    const myCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];

    // 1. วาดรายการเด็คที่มีอยู่ก่อน
    if (myCollections.length > 0) {
        myCollections.forEach(item => {
            const cardItem = document.createElement('div');
            cardItem.className = 'collection-card-item';
            
            const coverImg = item.cover || (item.cards[0] ? item.cards[0].image : 'images/default-bg.jpg');
            cardItem.style.backgroundImage = `url('${coverImg}')`;
            
            cardItem.innerHTML = `
                <div class="deck-overlay" onclick="loadFromCollection('${item.id}')">
                    <div class="deck-info">
                        <h4>${item.name}</h4>
                        <span>🃏 ${item.cards.length} ใบ</span>
                        ${item.format && typeof getDeckFormatName === 'function'
                            ? `<span class="coll-format-badge">${getDeckFormatName(item.format)}</span>` : ''}
                    </div>
                </div>
                <button class="delete-deck-btn" title="ลบเด็ค" 
                    onclick="confirmDeleteDeck(event, '${item.id}')">✕</button>
            `;
            container.appendChild(cardItem);
        });
    }

    // 2. วาดปุ่ม "สร้างเด็คใหม่" ไว้ท้ายสุดเสมอ
    createAddDeckButton(container);

}

// 3. ฟังก์ชันสำหรับลบเด็ค (ฉบับแก้ไขใหม่)
function confirmDeleteDeck(event, id) {
    // หยุดการทำงานไม่ให้ไปโหลดเด็ค (Event Bubbling)
    event.stopPropagation();
    event.preventDefault();

    if (confirm("⚠️ คุณต้องการลบเด็คนี้ออกจากคอลเล็คชั่นใช่หรือไม่?\n(ข้อมูลจะหายไปถาวร)")) {
        // 1. ดึงข้อมูลล่าสุดจาก Storage
        let myCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
        
        // 2. กรองข้อมูลออก
        const updatedCollections = myCollections.filter(item => String(item.id) !== String(id));
        
        // 3. เซฟลง Storage ทันที
        localStorage.setItem('dinomaster_collections', JSON.stringify(updatedCollections));
        
        // --- ส่วนที่เพิ่มเพื่อแก้บั๊กเด็คกลับมา ---
        
        // 4. อัปเดตตัวแปร Global (ถ้ามี) 
        // สมมติว่าในไฟล์ collection_logic.js มีการใช้ตัวแปรชื่อ myCollections อยู่ข้างนอก
        if (window.hasOwnProperty('myCollections')) {
            window.myCollections = updatedCollections;
        }

        // 5. ถ้าเด็คที่ลบ คือเด็คที่กำลัง "เปิดค้างไว้" เพื่อแก้ไข (Edit Mode)
        // ต้องล้างค่า ID ทิ้ง ไม่ให้มันจำว่ากำลังแก้เด็คที่ไม่มีอยู่แล้ว
        if (typeof currentEditingDeckId !== 'undefined' && String(currentEditingDeckId) === String(id)) {
            currentEditingDeckId = null;
            console.log("Cleared current editing session because deck was deleted.");
        }
        // ------------------------------------

        // วาดหน้าจอใหม่
        renderCollection();
        console.log("✅ Deleted and Synced deck ID:", id);
    }
}

// 4. ฟังก์ชันสร้างปุ่มเพิ่มเด็ค (ปรับสไตล์ให้เข้ากับรายการอื่น)
function createAddDeckButton(container) {
    const addBtn = document.createElement('div');
    addBtn.className = 'collection-card-item';
    addBtn.style.border = `2px dashed #ffd900`;
    addBtn.style.backgroundColor = "#0b0b0b";
    addBtn.style.backgroundImage = "none"; // เอาพื้นหลังรูปออก
    
    addBtn.onclick = () => {
        myDeck = []; 
        currentEditingDeckId = null;
        document.getElementById('deckNameInput').value = "";
        if (typeof setDeckNotes === 'function') setDeckNotes(''); // เด็คใหม่ = โน้ตว่าง (deck_extras.js)
        if (typeof updateDeckUI === 'function') updateDeckUI();
        toggleDeckViewMode();
    };
    
    addBtn.innerHTML = `
        <div class="deck-overlay" style="background: #0b0b0b; justify-content: center; flex-direction: column;">
            <div style="font-size: 30px; color: #ffd900;">➕</div>
            <h4 style="color: #ffd900; margin:0;">สร้างเด็คใหม่</h4>
        </div>
    `;
    container.appendChild(addBtn);
}

// 5. ฟังก์ชันโหลดเด็คมาแก้ไข
function loadFromCollection(id) {
    const myCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
    const targetDeck = myCollections.find(item => String(item.id) === String(id));

    if (targetDeck) {
        myDeck = [...targetDeck.cards];
        currentEditingDeckId = targetDeck.id;
        document.getElementById('deckNameInput').value = targetDeck.name;

        // ฟอร์แมตรายเด็ค: สลับเป็นฟอร์แมตที่เด็คนี้เซฟไว้ (เด็คเก่าที่ไม่มีข้อมูล = คงฟอร์แมตเดิม)
        if (targetDeck.format && typeof applyDeckFormat === 'function') applyDeckFormat(targetDeck.format);
        
        if (typeof updateDeckUI === 'function') updateDeckUI();
        toggleDeckViewMode(); // กลับไปหน้าจัดเด็ค
    }
}