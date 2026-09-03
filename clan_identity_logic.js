/**
 * Clan Identity Logic - Dinomaster TCG
 *
 * ระบบ "เผ่าประจำเด็ค" ใช้ร่วมกันระหว่าง
 *   1) Commander      : ตั้งแล้วบังคับเผ่าของ Creature ทั้งเด็ค
 *   2) Life Crystal   : ใส่แล้วบังคับเผ่าของ Creature เช่นกัน (LC 1 ใบมีได้หลายเผ่า)
 *
 * หน้าที่ของไฟล์นี้
 *   - เป็นแหล่งความจริงเดียว (single source of truth) ว่าเด็คตอนนี้อนุญาตเผ่าอะไรบ้าง
 *   - จัดเรียงการ์ดในคลังให้เผ่าที่ตรงขึ้นมาก่อน
 * (หมายเหตุ: ไม่ยุ่งกับการเปลี่ยนพื้นหลัง — ระบบนั้นอยู่ใน dynamic_bg.js และยังรองรับแค่ Commander)
 */

// --- ตัวช่วย: แตกชื่อเผ่าให้เป็น Array เสมอ ---
// ใช้ splitClanList จาก clan_dp_icons.js (รองรับ "มีปีก, สัตว์น้ำ" และ Array)
// ถ้าไฟล์นั้นไม่ถูกโหลด ให้มี fallback ง่ายๆ กันพัง
function getClanArray(clan) {
    if (typeof splitClanList === 'function') return splitClanList(clan);
    if (!clan) return [];
    return (Array.isArray(clan) ? clan : String(clan).split(/[,/]/))
        .map(s => String(s).trim()).filter(Boolean);
}

// --- การ์ดประเภทไหนบ้างที่โดนกฎเผ่าบังคับ ---
// เฉพาะ Creature แท้ๆ เท่านั้น (Action / Armor / Field / Master / Extra Deck ใส่ข้ามเผ่าได้อิสระ)
function isClanRestrictedCard(card) {
    if (!card || !card.type) return false;
    const isCreature = Array.isArray(card.type)
        ? (card.type.includes("Creature") && !card.type.includes("Boost_Creature"))
        : card.type === "Creature";
    if (!isCreature) return false;

    // ข้อยกเว้นเดิมของระบบ: การ์ดที่ชื่อมีคำว่า Armor ไม่ถูกบังคับเผ่า
    if (card.nameTH && card.nameTH.includes("Armor")) return false;

    return true;
}

/**
 * รายการข้อจำกัดเผ่าที่กำลังมีผลกับเด็คตอนนี้
 * คืนค่าเป็น Array ของ { source, label, card, clans }
 * ถ้ามีทั้ง Commander และ LC จะต้องผ่าน "ทุกข้อ" (เผ่าต้องตรงกับทั้งคู่)
 */
function getDeckClanRestrictions() {
    const rules = [];
    if (typeof myDeck === 'undefined' || !Array.isArray(myDeck)) return rules;

    const commander = myDeck.find(c => c.isCommander);
    if (commander) {
        const clans = getClanArray(commander.clan);
        if (clans.length) rules.push({ source: 'commander', label: 'คอมมานเดอร์', card: commander, clans });
    }

    const lc = myDeck.find(c => c.type === "LC");
    if (lc) {
        const clans = getClanArray(lc.clan);
        if (clans.length) rules.push({ source: 'lc', label: 'ไลฟ์คริสตัล', card: lc, clans });
    }

    return rules;
}

// รวมเผ่าทั้งหมดที่ควรถูกดันขึ้นบนสุดในคลัง (Commander + LC)
function getPriorityClans() {
    const set = [];
    getDeckClanRestrictions().forEach(r => r.clans.forEach(c => {
        if (!set.includes(c)) set.push(c);
    }));
    return set;
}

/**
 * เช็คว่าการ์ดใบนี้ผิดกฎเผ่าข้อไหนหรือไม่
 * คืน rule ที่ผิด (เอาไปทำข้อความแจ้งเตือนได้) หรือ null ถ้าใส่ได้
 */
function findClanRestrictionViolation(card) {
    if (!isClanRestrictedCard(card)) return null;

    const cardClans = getClanArray(card.clan);
    if (cardClans.length === 0) return null; // การ์ดไม่มีข้อมูลเผ่า ให้ผ่านไปก่อน

    const rules = getDeckClanRestrictions();
    for (const rule of rules) {
        if (!cardClans.some(c => rule.clans.includes(c))) return rule;
    }
    return null;
}

// ข้อความแจ้งเตือนมาตรฐาน (ใช้ให้ตรงกันทุกที่)
function clanRestrictionMessage(rule) {
    if (!rule) return '';
    const name = rule.card.nameTH || rule.card.nameEN || rule.card.id;
    return `เด็คนี้มี ${name} เป็น${rule.label}\nใส่ได้เฉพาะเผ่า ${rule.clans.join(' / ')} เท่านั้น!`;
}

// ป้ายสั้นๆ สำหรับปุ่มบนการ์ด
function clanRestrictionShortLabel(rule) {
    if (!rule) return '';
    return rule.source === 'lc' ? 'เผ่าไม่ตรงกับ Life Crystal' : 'เผ่าไม่ตรงกับ Commander';
}

/**
 * กฎ "คอมมานเดอร์ กับ ไลฟ์คริสตัล ใช้ร่วมกันไม่ได้"
 * เลือกได้อย่างใดอย่างหนึ่งเท่านั้นต่อ 1 เด็ค
 */
function getDeckCommander() {
    if (typeof myDeck === 'undefined') return null;
    return myDeck.find(c => c.isCommander) || null;
}

function getDeckLifeCrystal() {
    if (typeof myDeck === 'undefined') return null;
    return myDeck.find(c => c.type === "LC") || null;
}

// การ์ด LC ใบนี้ใส่ไม่ได้เพราะเด็คตั้งคอมมานเดอร์ไว้แล้วหรือไม่
// คืน { short, message } ถ้าติด หรือ null ถ้าใส่ได้
function findCommanderLcConflict(card) {
    if (!card || card.type !== "LC") return null;

    const commander = getDeckCommander();
    if (!commander) return null;

    const name = commander.nameTH || commander.nameEN || commander.id;
    return {
        short: 'มีคอมมานเดอร์ในเด็คแล้ว',
        message: `เด็คนี้ตั้ง ${name} เป็นคอมมานเดอร์อยู่\n` +
                 `คอมมานเดอร์กับไลฟ์คริสตัลใช้ร่วมกันไม่ได้ (เลือกได้อย่างใดอย่างหนึ่งเท่านั้น)`
    };
}

// ตั้งคอมมานเดอร์ไม่ได้เพราะมีไลฟ์คริสตัลอยู่ในเด็คหรือไม่
// คืน { short, message } ถ้าติด หรือ null ถ้าตั้งได้
function findLcBlockingCommander() {
    const lc = getDeckLifeCrystal();
    if (!lc) return null;

    const name = lc.nameTH || lc.nameEN || lc.id;
    return {
        short: 'มีไลฟ์คริสตัลในเด็คแล้ว',
        message: `เด็คนี้มี ${name} (ไลฟ์คริสตัล) อยู่\n` +
                 `คอมมานเดอร์กับไลฟ์คริสตัลใช้ร่วมกันไม่ได้ (เลือกได้อย่างใดอย่างหนึ่งเท่านั้น)`
    };
}

/**
 * ตรวจก่อน "ใส่ LC ลงเด็ค": ถ้าในเด็คมี Creature เผ่าอื่นอยู่แล้วจะใส่ไม่ได้
 * (กฎเดียวกับตอนแต่งตั้ง Commander) คืนรายการการ์ดที่ขัดกัน
 */
function findCreaturesBlockingLC(lcCard) {
    if (typeof myDeck === 'undefined') return [];
    const lcClans = getClanArray(lcCard && lcCard.clan);
    if (lcClans.length === 0) return [];

    return myDeck.filter(c => {
        if (!isClanRestrictedCard(c)) return false;
        const clans = getClanArray(c.clan);
        if (clans.length === 0) return false;
        return !clans.some(x => lcClans.includes(x));
    });
}

// --- 1. เอนจินจัดเรียงการ์ดในคลัง ---
const ClanSortEngine = {
    // การ์ดจะถูกดันขึ้นบนก็ต่อเมื่อ "เผ่าตรงกับกฎทุกข้อ"
    // (ถ้ามีทั้ง Commander และ LC ต้องตรงทั้งคู่ ไม่งั้นดันขึ้นมาแล้วก็กดใส่ไม่ได้อยู่ดี)
    isPriorityCard: function(card, rules) {
        const clans = getClanArray(card.clan);
        if (clans.length === 0) return false; // การ์ดไม่มีเผ่า (Action ฯลฯ) ไม่ต้องดันขึ้น
        return rules.every(r => clans.some(x => r.clans.includes(x)));
    },

    sort: function(cards) {
        const rules = getDeckClanRestrictions();
        if (rules.length === 0) return cards; // ไม่มี Commander และไม่มี LC = ไม่ต้องเรียง

        // Array.sort ใน JS สมัยใหม่เป็น stable sort
        // การ์ดที่ได้คะแนนเท่ากันจึงคงลำดับเดิมไว้
        return [...cards].sort((a, b) => {
            const aMatch = this.isPriorityCard(a, rules) ? 0 : 1;
            const bMatch = this.isPriorityCard(b, rules) ? 0 : 1;
            return aMatch - bMatch;
        });
    }
};

/**
 * 2. ระบบ Intercept (ดักจับ)
 * ครอบฟังก์ชัน renderCards เดิมไว้ ให้ Sort ก่อนแสดงผลเสมอ โดยไม่ต้องแก้ main.js
 */
(function injectClanLogic() {
    window.addEventListener('DOMContentLoaded', () => {
        if (typeof window.renderCards === 'function') {
            const originalRenderCards = window.renderCards;

            window.renderCards = function(cards) {
                const sortedCards = ClanSortEngine.sort(cards);
                return originalRenderCards(sortedCards);
            };

            console.log("🧬 Clan Identity Logic: Activated (Commander + Life Crystal)");
        }
    });
})();
