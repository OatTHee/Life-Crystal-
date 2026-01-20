function exportToUntap() {
    if (myDeck.length === 0) {
        alert("กรุณาเลือกการ์ดลงเด็คก่อนครับ");
        return;
    }

    // แยกกลุ่มการ์ดตามประเภท
    const starterCards = myDeck.filter(c => c.isCommander || (c.type && c.type.includes('Master')) || c.type.includes('Boost_Master'));
    
    const extraCards = myDeck.filter(c => 
        !c.isCommander && 
        (c.type && (c.type.includes('Fusion_Monster') || c.type.includes('Armored_Dino') || c.type.includes('Boost_Creature') || c.type.includes('Illusion')))
    );

    const mainCards = myDeck.filter(c => 
        !starterCards.includes(c) && !extraCards.includes(c)
    );

    // ฟังก์ชันช่วยจัดรูปแบบข้อความ
    const formatSection = (cards) => {
        const counts = {};
        cards.forEach(c => {
            // --- LOGIC ใหม่ตามที่คุณต้องการ ---
            // 1. ดึง ID (ลบอักขระพิเศษที่ไม่จำเป็นออก)
            const cleanID = (c.id || "").replace(/[",]/g, "").trim();
            // 2. ดึง NameEN (ลบอักขระพิเศษที่ไม่จำเป็นออก)
            const cleanName = (c.nameEN || "Card").replace(/[",]/g, "").trim();
            
            // 3. รูปแบบ: [ID] [NameEN] (DMT) -> เว้นวรรคทุกจุด
            const line = `${cleanID} ${cleanName} (DMT)`; 
            
            counts[line] = (counts[line] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([text, qty]) => `${qty} ${text}`)
            .join('\n');
    };

    // ประกอบร่างข้อความ
    let output = "//play-1\n";
    let starterText = formatSection(starterCards);
    if (starterText) output += starterText + "\n\n";

    output += "//deck-1\n";
    let mainText = formatSection(mainCards);
    if (mainText) output += mainText + "\n\n";

    output += "//deck-2\n";
    let extraText = formatSection(extraCards);
    if (extraText) output += extraText;

    // คัดลอกลง Clipboard
    navigator.clipboard.writeText(output).then(() => {
        alert("คัดลอกรหัสเด็คเรียบร้อย!\nรูปแบบ: [ID] [Name] (DMT)\n\n" + output);
    }).catch(err => {
        console.error('Error:', err);
        prompt("คัดลอกรหัสเด็คที่นี่:", output);
    });
}