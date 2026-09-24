// card_sort_logic.js
// ระบบเรียงลำดับการ์ดในคลัง
//   ลำดับการเรียง (ความสำคัญจากมากไปน้อย)
//   1) การ์ดที่ใส่ได้ มาก่อนการ์ดเทา (โดนแบน / เผ่าไม่ตรง / ติดกฎ LC-Commander) — เสมอ
//   2) การ์ดเผ่าตรงกับ Commander / Life Crystal มาก่อน (ระบบเดิมใน clan_identity_logic.js)
//   3) ตัวเลือกที่ผู้ใช้กด : ชุด / ประเภท / DP / ความแรร์ (กดซ้ำเพื่อสลับ ▲▼)
//   4) ลำดับเดิมของข้อมูล (stable sort)

// --- ลำดับชุดจากเก่า -> ใหม่ (แก้/เพิ่มชุดใหม่ได้ที่นี่) ---
const SORT_SET_ORDER = [
    "ออริจินอล", "อินิกม่า", "คาแร็คเตอร์", "นิวมาสเตอร์", "สเต็ปเน็ก", "รีอินิกม่า", "AR1",
    "PR01", "PR02", "PR03", "PR04", "PR05", "PR06", "PR07", "PR08", "PR09", "PR10"
];

// --- ลำดับประเภท ---
const SORT_TYPE_ORDER = [
    ["Creature"], ["Boost_Creature"], ["Fusion_Monster"], ["Armored_Dino"], ["Illusion"],
    ["Action"], ["Armor"], ["Field", "Action_Field"], ["Master"], ["Boost_Master"], ["LC"]
];

// --- ลำดับความแรร์ ---
const SORT_RARITY_ORDER = { "": 0, "Promo": 1, "Silver_Rare": 2, "Golden_Rare": 3 };

const SORT_MODES = [
    { key: "default", label: "ค่าเริ่มต้น" },
    { key: "set",     label: "ชุด",       hint: ["เก่า → ใหม่", "ใหม่ → เก่า"] },
    { key: "type",    label: "ประเภท",    hint: ["Creature → LC", "LC → Creature"] },
    { key: "dp",      label: "DP",        hint: ["น้อย → มาก", "มาก → น้อย"] },
    { key: "rarity",  label: "ความแรร์",  hint: ["ธรรมดา → ทอง", "ทอง → ธรรมดา"] }
];

const CardSortEngine = {
    mode: "default",
    dir: 1,        // 1 = ตามลำดับ (▲) / -1 = กลับด้าน (▼)

    // ----- คะแนนของแต่ละเกณฑ์ (ค่าน้อย = มาก่อน) -----
    setRank(card) {
        const i = SORT_SET_ORDER.indexOf(card.set);
        return i === -1 ? null : i;             // ชุดที่ไม่รู้จัก ไว้ท้ายเสมอ
    },
    typeRank(card) {
        const types = Array.isArray(card.type) ? card.type : String(card.type || '').split(' ');
        let best = null;
        types.forEach(t => {
            const i = SORT_TYPE_ORDER.findIndex(group => group.includes(t));
            if (i !== -1 && (best === null || i < best)) best = i;
        });
        return best;
    },
    dpRank(card) {
        const n = parseInt(card.dp, 10);
        if (!isNaN(n)) return n;
        return { tail: String(card.dp) === "X" ? 0 : 1 };   // X แล้วตามด้วย ไร้DP — ไว้ท้ายเสมอ
    },
    rarityRank(card) {
        const r = SORT_RARITY_ORDER[card.rarity || ""];
        return r === undefined ? 0 : r;
    },

    // การ์ดเทา = ใส่ไม่ได้ในสถานะปัจจุบัน
    isGray(card) {
        if (typeof computeCardBanStatus === 'function' && computeCardBanStatus(card).isBanned) return true;
        if (typeof findClanRestrictionViolation === 'function' && findClanRestrictionViolation(card)) return true;
        if (typeof findCommanderLcConflict === 'function' && findCommanderLcConflict(card)) return true;
        return false;
    },

    // เปรียบเทียบตามเกณฑ์ที่เลือก (ค่า null ไปท้ายเสมอ ไม่ว่าจะเรียงทิศไหน)
    compareByMode(a, b) {
        const fn = { set: this.setRank, type: this.typeRank, dp: this.dpRank, rarity: this.rarityRank }[this.mode];
        if (!fn) return 0;
        const ra = fn.call(this, a), rb = fn.call(this, b);
        if (ra === rb) return 0;
        if (ra === null) return 1;
        if (rb === null) return -1;
        // ค่าพิเศษ {tail} (เช่น X / ไร้DP) อยู่ท้ายเสมอ ไม่กลับทิศ
        const ta = typeof ra === 'object', tb = typeof rb === 'object';
        if (ta && tb) return ra.tail - rb.tail;
        if (ta) return 1;
        if (tb) return -1;
        return (ra - rb) * this.dir;
    },

    sort(cards) {
        if (!Array.isArray(cards)) return cards;

        // โหมดดูการ์ด: เรียงตามตัวเลือกของผู้ใช้อย่างเดียว (ไม่ดันเผ่า / ไม่ดันการ์ดเทาไปท้าย)
        const building = (typeof isBuildMode !== 'function') || isBuildMode();
        const clanRules = (building && typeof getDeckClanRestrictions === 'function') ? getDeckClanRestrictions() : [];
        const useClan = clanRules.length > 0 && typeof ClanSortEngine !== 'undefined';

        // คำนวณครั้งเดียวต่อใบ (กันช้าเวลาการ์ดเยอะ)
        const rows = cards.map((card, idx) => ({
            card, idx,
            gray: (building && this.isGray(card)) ? 1 : 0,
            clan: useClan ? (ClanSortEngine.isPriorityCard(card, clanRules) ? 0 : 1) : 0
        }));

        rows.sort((x, y) =>
            (x.gray - y.gray) ||
            (x.clan - y.clan) ||
            this.compareByMode(x.card, y.card) ||
            (x.idx - y.idx)
        );
        return rows.map(r => r.card);
    },

    // ----- UI -----
    select(key) {
        if (key === "default") { this.mode = "default"; this.dir = 1; }
        else if (this.mode === key) { this.dir *= -1; }          // กดซ้ำ = สลับทิศ
        else { this.mode = key; this.dir = 1; }

        try { localStorage.setItem('dinomaster_card_sort', JSON.stringify({ mode: this.mode, dir: this.dir })); } catch (e) {}

        this.renderBar();
        if (typeof renderCards === 'function' && typeof currentFilteredCards !== 'undefined') {
            renderCards(currentFilteredCards);
        }
    },

    renderBar() {
        const bar = document.getElementById('cardSortBar');
        if (!bar) return;
        bar.innerHTML = '<span class="card-sort-label"><i class="fa-solid fa-arrow-down-wide-short"></i> เรียงตาม</span>';

        SORT_MODES.forEach(m => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'card-sort-btn' + (this.mode === m.key ? ' active' : '');
            const arrow = (m.key !== 'default' && this.mode === m.key) ? (this.dir === 1 ? ' ▲' : ' ▼') : '';
            btn.textContent = m.label + arrow;
            if (m.hint) {
                const h = (this.mode === m.key) ? m.hint[this.dir === 1 ? 0 : 1] : m.hint[0];
                btn.title = `${m.label} : ${h}` + (this.mode === m.key ? ' (กดอีกครั้งเพื่อสลับ)' : '');
            } else {
                btn.title = 'การ์ดที่ใส่ได้ขึ้นก่อน ตามลำดับเดิม';
            }
            btn.onclick = () => this.select(m.key);
            bar.appendChild(btn);
        });
    },

    init() {
        try {
            const saved = JSON.parse(localStorage.getItem('dinomaster_card_sort') || 'null');
            if (saved && SORT_MODES.some(m => m.key === saved.mode)) {
                this.mode = saved.mode;
                this.dir = saved.dir === -1 ? -1 : 1;
            }
        } catch (e) {}
        this.renderBar();
    }
};

window.addEventListener('DOMContentLoaded', () => CardSortEngine.init());
