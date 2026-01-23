/**
 * Clan Identity Logic - Dinomaster TCG
 * ฟีเจอร์: จัดเรียงการ์ดที่เผ่าตรงกับ Commander ขึ้นก่อนอัตโนมัติ
 */

// 1. ฟังก์ชันภายในสำหรับจัดการ Sorting
const ClanSortEngine = {
    // หาเผ่าของ Commander ปัจจุบัน
    getCommanderClan: function() {
        if (typeof myDeck === 'undefined') return null;
        const commander = myDeck.find(c => c.isCommander);
        if (!commander) return null;
        
        // รองรับทั้งกรณี clan เป็น String หรือ Array
        return Array.isArray(commander.clan) ? commander.clan[0] : commander.clan;
    },

    // ฟังก์ชันหลักในการจัดลำดับการ์ด
    sort: function(cards) {
        const targetClan = this.getCommanderClan();
        if (!targetClan) return cards; // ถ้าไม่มีคอมมานเดอร์ ไม่ต้องทำอะไร

        // สร้าง Array ใหม่เพื่อไม่ให้กระทบ Data ต้นฉบับ
        return [...cards].sort((a, b) => {
            const aClans = Array.isArray(a.clan) ? a.clan : [a.clan];
            const bClans = Array.isArray(b.clan) ? b.clan : [b.clan];

            const aMatches = aClans.includes(targetClan);
            const bMatches = bClans.includes(targetClan);

            if (aMatches && !bMatches) return -1; // a มาก่อน
            if (!aMatches && bMatches) return 1;  // b มาก่อน
            return 0; // ลำดับเท่ากัน
        });
    }
};

/**
 * 2. ระบบ Intercept (ดักจับ) 
 * เราจะทำการ "ครอบ" ฟังก์ชัน renderCards เดิมไว้ 
 * เพื่อให้มัน Sort ก่อนแสดงผลเสมอ โดยไม่ต้องแก้ไฟล์ main.js
 */
(function injectClanLogic() {
    // รอจนกว่าหน้าเว็บจะโหลดเสร็จเพื่อให้แน่ใจว่า main.js ทำงานแล้ว
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof window.renderCards === 'function') {
            // เก็บฟังก์ชันเดิมไว้ในตัวแปร
            const originalRenderCards = window.renderCards;

            // เขียนทับฟังก์ชันเดิม
            window.renderCards = function(cards) {
                // 1. ส่งการ์ดไป Sort ตามเผ่าก่อน
                const sortedCards = ClanSortEngine.sort(cards);
                
                // 2. ส่งการ์ดที่ Sort แล้วกลับไปให้ฟังก์ชันเดิมวาดภาพหน้าจอ
                return originalRenderCards(sortedCards);
            };
            
            console.log("🧬 Clan Identity Logic: Activated");
        }
    });
})();