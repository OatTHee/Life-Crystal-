function exportToUntap() {
    if (myDeck.length === 0) {
        alert("กรุณาเลือกการ์ดลงเด็คก่อนครับ");
        return;
    }

    // แยกกลุ่มการ์ดตามประเภท
    // 1. Starter: Commander หรือ Master
    const starterCards = myDeck.filter(c => c.isCommander || (c.type && c.type.includes('Master'))|| c.type.includes('Boost_Master'));
    
    // 2. Extra Deck: Fusion หรือ Armored Dino
    const extraCards = myDeck.filter(c => 
        !c.isCommander && 
        (c.type && (c.type.includes('Fusion_Monster') || c.type.includes('Armored_Dino')|| c.type.includes('Boost_Creature')|| c.type.includes('Illusion')))
    );

    // 3. Main Deck: การ์ดที่เหลือ (Action, Creature ปกติ ฯลฯ)
    const mainCards = myDeck.filter(c => 
        !starterCards.includes(c) && !extraCards.includes(c)
    );

    // ฟังก์ชันช่วยจัดรูปแบบข้อความ (นับจำนวนซ้ำและจัด String)
    const formatSection = (cards) => {
        const counts = {};
        cards.forEach(c => {
            const line = `${c.nameEN} (${c.id})`; // รูปแบบ: Name EN (id)
            counts[line] = (counts[line] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([text, qty]) => `${qty} ${text}`)
            .join('\n');
    };

    // ประกอบร่างข้อความ
    let output = "//play-1\n";
    output += formatSection(starterCards) + "\n\n";

    output += "//deck-1\n";
    output += formatSection(mainCards) + "\n\n";

    output += "//deck-2\n";
    output += formatSection(extraCards);

    // คัดลอกลง Clipboard
    navigator.clipboard.writeText(output).then(() => {
        alert("คัดลอกรหัสเด็คสำหรับ Untap เรียบร้อยแล้ว!\n\n" + output);
    }).catch(err => {
        console.error('ไม่สามารถคัดลอกได้:', err);
        // กรณี Clipboard API ไม่ทำงาน ให้แสดงเป็น prompt แทน
        prompt("คัดลอกรหัสเด็คที่นี่:", output);
    });
}