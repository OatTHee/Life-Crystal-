// =========================================================
//  lc_storage.js — ตัวกันพังของข้อมูลที่เก็บในเบราว์เซอร์ (localStorage)
//  ต้องโหลด "ก่อน" main.js และไฟล์อื่นทั้งหมดที่อ่านเด็ค
//
//  1) กันเว็บค้างเพราะข้อมูลเสีย
//     ตอนเปิดเว็บ ตรวจค่าที่เก็บเป็น JSON ทุกตัว ถ้าอ่านไม่ได้ (เช่นปิดแท็บระหว่างเซฟ)
//     จะย้ายค่าเดิมไปเก็บสำรองไว้ที่ "<ชื่อเดิม>__corrupt_<เวลา>" แล้วเริ่มค่านั้นใหม่ + แจ้งผู้เล่น
//
//  2) ประหยัดพื้นที่ (เด็ค / คอลเล็คชั่น)
//     ตอนเซฟ: เก็บการ์ดแต่ละใบแบบย่อ = รหัส + อาร์ต + ค่าที่ต่างจากฐานข้อมูล (เช่น isCommander, isCover)
//     ตอนอ่าน: เติมข้อมูลการ์ดกลับจากฐานข้อมูล (cardsData) ให้อัตโนมัติ — โค้ดส่วนอื่นไม่ต้องแก้อะไร
//     เด็คเก่าที่เก็บแบบเต็มยังอ่านได้ และจะถูกย่อเองในการเซฟครั้งถัดไป
//
//  3) พื้นที่เต็ม: ถ้าเซฟไม่สำเร็จ จะแจ้งผู้เล่นแทนที่จะเงียบ
// =========================================================

(function () {
    const JSON_KEYS = [
        'dinomaster_deck', 'dinomaster_collections', 'dinomaster_card_sort',
        'lc_owned_counts_v2'
    ];
    const DECK_KEYS = { dinomaster_deck: 'deck', dinomaster_collections: 'collections' };
    const MARK = '_c'; // การ์ดที่เก็บแบบย่อ

    const proto = Storage.prototype;
    const rawGet = proto.getItem;
    const rawSet = proto.setItem;
    const isLocal = st => { try { return st === window.localStorage; } catch (e) { return false; } };

    // ---------- 1. ตรวจข้อมูลเสียตอนเปิดเว็บ ----------
    const repaired = [];
    try {
        JSON_KEYS.forEach(key => {
            const v = rawGet.call(localStorage, key);
            if (v == null) return;
            try { JSON.parse(v); }
            catch (e) {
                try { rawSet.call(localStorage, `${key}__corrupt_${Date.now()}`, v); } catch (e2) {}
                localStorage.removeItem(key);
                repaired.push(key);
            }
        });
    } catch (e) { /* เบราว์เซอร์ปิด localStorage ไว้ */ }

    // ---------- 2. ย่อ / เติมข้อมูลการ์ด ----------
    let _index = null;
    function db() {
        if (_index) return _index;
        if (typeof cardsData === 'undefined' || !Array.isArray(cardsData)) return null;
        _index = new Map();
        cardsData.forEach(c => {
            const id = String(c.id);
            if (!_index.has(id)) _index.set(id, []);
            _index.get(id).push(c);
        });
        return _index;
    }
    function templateOf(id, image) {
        const idx = db();
        const list = idx && idx.get(String(id));
        if (!list) return null;
        return (image && list.find(c => c.image === image)) || list[0];
    }

    function compactCard(card) {
        if (!card || typeof card !== 'object' || card[MARK]) return card;
        const tpl = templateOf(card.id, card.image);
        if (!tpl) return card; // ไม่มีในฐานข้อมูล → เก็บแบบเต็มไว้ก่อน กันข้อมูลหาย
        const out = { id: card.id, [MARK]: 1 };
        if (card.image && card.image !== tpl.image) out.image = card.image;
        else if (card.image && tpl !== templateOf(card.id)) out.image = card.image; // อาร์ตที่ไม่ใช่ใบแรก
        Object.keys(card).forEach(k => {
            if (k === 'id' || k === 'image') return;
            const v = card[k];
            if (JSON.stringify(v) !== JSON.stringify(tpl[k])) out[k] = v;
        });
        return out;
    }

    function hydrateCard(card) {
        if (!card || typeof card !== 'object' || !card[MARK]) return card;
        const tpl = templateOf(card.id, card.image);
        const full = tpl ? { ...tpl, ...card } : { ...card };
        delete full[MARK];
        return full;
    }

    const mapDeck = (cards, fn) => Array.isArray(cards) ? cards.map(fn) : cards;

    function transform(kind, value, fn) {
        if (kind === 'deck') return mapDeck(value, fn);
        if (kind === 'collections' && Array.isArray(value)) {
            return value.map(d => (d && Array.isArray(d.cards)) ? { ...d, cards: d.cards.map(fn) } : d);
        }
        return value;
    }

    proto.getItem = function (key) {
        const v = rawGet.call(this, key);
        if (v == null || !isLocal(this) || !DECK_KEYS[key] || !db()) return v;
        try {
            if (v.indexOf(`"${MARK}":1`) === -1) return v; // ไม่มีการ์ดแบบย่อ
            return JSON.stringify(transform(DECK_KEYS[key], JSON.parse(v), hydrateCard));
        } catch (e) { return v; }
    };

    let quotaWarned = 0;
    proto.setItem = function (key, value) {
        let v = value;
        if (isLocal(this) && DECK_KEYS[key] && db()) {
            try { v = JSON.stringify(transform(DECK_KEYS[key], JSON.parse(value), compactCard)); } catch (e) { v = value; }
        }
        try {
            const r = rawSet.call(this, key, v);
            window.lcLastWriteOk = true;
            return r;
        } catch (e) {
            const quota = e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014);
            if (!quota) throw e;
            window.lcLastWriteOk = false; // ให้ปุ่ม Save รู้ว่าเซฟไม่สำเร็จ (save_deck_logic.js)
            // พื้นที่เต็ม: เตือน (ไม่เกินนาทีละครั้ง) แทนการพังเงียบๆ
            if (Date.now() - quotaWarned > 60000) {
                quotaWarned = Date.now();
                setTimeout(() => alert('⚠️ พื้นที่เก็บข้อมูลในเบราว์เซอร์เต็ม — บันทึกไม่สำเร็จ\n\n' +
                    'แนะนำ: ไปที่หน้าคอลเล็คชั่น กด "💾 สำรองข้อมูลทั้งหมด" แล้วลบเด็คที่ไม่ใช้ออก'), 0);
            }
            return undefined;
        }
    };

    // ขนาดข้อมูลของเว็บที่ใช้อยู่ (KB) — ใช้ดูใน console: lcStorageUsage()
    window.lcStorageUsage = function () {
        let total = 0;
        const rows = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            const n = (k.length + (rawGet.call(localStorage, k) || '').length) * 2;
            total += n;
            rows.push([k, Math.round(n / 1024) + ' KB']);
        }
        console.table(rows);
        return Math.round(total / 1024) + ' KB';
    };

    document.addEventListener('DOMContentLoaded', () => {
        // ย่อข้อมูลเก่าที่เคยเก็บแบบเต็ม (ครั้งเดียว — รอบต่อไปเก็บแบบย่ออยู่แล้ว)
        try {
            Object.keys(DECK_KEYS).forEach(key => {
                const raw = rawGet.call(localStorage, key);
                if (raw && raw.length > 2000 && raw.indexOf('"ability"') !== -1) {
                    localStorage.setItem(key, localStorage.getItem(key));
                }
            });
        } catch (e) {}

        if (repaired.length) {
            setTimeout(() => alert('⚠️ พบข้อมูลในเบราว์เซอร์เสียหาย จึงเริ่มส่วนนั้นใหม่เพื่อให้เว็บใช้งานได้\n' +
                `(${repaired.join(', ')})\n\nข้อมูลเดิมถูกเก็บสำรองไว้ในเครื่อง หากต้องการกู้ ติดต่อผู้ดูแลเว็บ`), 300);
        }
    });

    window.lcCompactCard = compactCard;
    window.lcHydrateCard = hydrateCard;
})();
