function saveOverwrite() {
    // 1. ดึงข้อมูลล่าสุดจาก Storage มาก่อนเสมอ (ห้ามใช้ตัวแปร Global อย่างเดียว)
    let currentCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
    
    if (!currentEditingDeckId) {
        saveAsNew();
        return;
    }

    const deckName = document.getElementById('deckNameInput').value.trim() || "เด็คไร้ชื่อ";
    
    // 2. ค้นหา Index จากข้อมูลที่ดึงมาใหม่
    const index = currentCollections.findIndex(d => String(d.id) === String(currentEditingDeckId));
    
    if (index !== -1) {
        // 3. อัปเดตข้อมูลใน Array
        currentCollections[index].name = deckName;
        currentCollections[index].cards = JSON.parse(JSON.stringify(myDeck));
        currentCollections[index].cover = getDeckCoverURL(); 
        currentCollections[index].timestamp = new Date().toLocaleString() + " (แก้ไข)";
        
        // 4. เซฟกลับลง Storage และอัปเดตตัวแปร Global ให้ตรงกัน
        localStorage.setItem('dinomaster_collections', JSON.stringify(currentCollections));
        if (window.hasOwnProperty('myCollections')) myCollections = currentCollections;

        isUnsaved = false;
        updateDeckUI();
        showSaveSuccess();
        
        if (typeof renderCollection === 'function') renderCollection();
    } else {
        // ถ้าหา Index ไม่เจอ (อาจเพราะเด็คถูกลบไปแล้ว) ให้เซฟเป็นใบใหม่แทน
        saveAsNew();
    }
}

function saveAsNew() {
    // 1. ดึงข้อมูลล่าสุด
    let currentCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];

    const deckName = document.getElementById('deckNameInput').value.trim() || "เด็คใหม่";
    
    const newSave = {
        id: Date.now(),
        name: deckName,
        cards: JSON.parse(JSON.stringify(myDeck)),
        cover: getDeckCoverURL(),
        timestamp: new Date().toLocaleString()
    };

    // 2. Push ลงในข้อมูลที่ดึงมาใหม่
    currentCollections.push(newSave);
    
    // 3. เซฟลง Storage และอัปเดต Global
    localStorage.setItem('dinomaster_collections', JSON.stringify(currentCollections));
    if (window.hasOwnProperty('myCollections')) myCollections = currentCollections;
    
    currentEditingDeckId = newSave.id;
    isUnsaved = false; // อย่าลืมล้างสถานะเมื่อเซฟเสร็จ
    
    alert(`เซฟเด็ค "${deckName}" เรียบร้อย!`);
    if (typeof updateDeckUI === 'function') updateDeckUI();
    if (typeof renderCollection === 'function') renderCollection();
}

