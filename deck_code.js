// =========================================================
//  deck_code.js — รหัสเด็ค / ลิงก์เด็คแบบสั้น (v2)
//
//  รูปแบบ v2 (ก่อนบีบอัด):  2 <TAB> ฟอร์แมต <TAB> ชื่อเด็ค <TAB> รายการการ์ด
//     รายการการ์ด = กลุ่มคั่นด้วย ","  แต่ละกลุ่ม = id[@อาร์ต][*จำนวน][!][^]
//        @k  = อาร์ตลำดับที่ k ของการ์ด id เดียวกัน (ไม่ใส่ = อาร์ตแรก)
//        *n  = จำนวนใบ (ไม่ใส่ = 1)
//        !   = มีใบที่ตั้งเป็น Commander,  ^ = มีใบที่เป็นหน้าปก
//  จากนั้นบีบอัดด้วย deflate แล้วแปลงเป็น base64url → ขึ้นต้นด้วย "z."
//  (เบราว์เซอร์ที่บีบอัดไม่ได้จะได้ "p." = ไม่บีบอัด แต่ยังใช้ได้เหมือนกัน)
//
//  ลิงก์/รหัสแบบเก่า (base64 ของ "id|n|cmd,...") ยังอ่านได้ตามเดิม
// =========================================================

(function () {

    // ---------- base64url ----------
    function bytesToB64url(bytes) {
        let bin = '';
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    function b64urlToBytes(str) {
        let b = String(str).replace(/-/g, '+').replace(/_/g, '/');
        while (b.length % 4) b += '=';
        const bin = atob(b);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
    }

    const canCompress = () => typeof CompressionStream === 'function' && typeof DecompressionStream === 'function';

    async function pipeBytes(bytes, stream) {
        const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
        return new Uint8Array(await res.arrayBuffer());
    }

    // ---------- อาร์ตของการ์ด id เดียวกัน ----------
    let _variants = null;
    function variantsOf(id) {
        if (!_variants) {
            _variants = new Map();
            (typeof cardsData !== 'undefined' ? cardsData : []).forEach(c => {
                const k = String(c.id);
                if (!_variants.has(k)) _variants.set(k, []);
                _variants.get(k).push(c);
            });
        }
        return _variants.get(String(id)) || [];
    }

    // ---------- สร้างรหัส ----------
    function deckToText(deck, meta) {
        const groups = [];
        const byKey = new Map();
        deck.forEach(card => {
            const id = String(card.id);
            const vs = variantsOf(id);
            let art = vs.findIndex(v => v.image === card.image);
            if (art < 0) art = 0;
            const key = id + '@' + art;
            let g = byKey.get(key);
            if (!g) { g = { id, art, n: 0, cmd: false, cover: false }; byKey.set(key, g); groups.push(g); }
            g.n++;
            if (card.isCommander) g.cmd = true;
            if (card.isCover) g.cover = true;
        });
        const list = groups.map(g =>
            g.id + (g.art ? '@' + g.art : '') + (g.n > 1 ? '*' + g.n : '') + (g.cmd ? '!' : '') + (g.cover ? '^' : '')
        ).join(',');
        const clean = s => String(s || '').replace(/[\t\r\n]+/g, ' ').trim();
        return ['2', clean(meta.format), clean(meta.name), list].join('\t');
    }

    async function encodeDeckCode(deck, meta) {
        meta = meta || {};
        const text = deckToText(deck || [], meta);
        const bytes = new TextEncoder().encode(text);
        if (canCompress()) {
            try {
                return 'z.' + bytesToB64url(await pipeBytes(bytes, new CompressionStream('deflate-raw')));
            } catch (e) { /* ใช้แบบไม่บีบอัดแทน */ }
        }
        return 'p.' + bytesToB64url(bytes);
    }

    // ---------- อ่านรหัส ----------
    // คืน { cards: [การ์ดพร้อมใช้], format, name } หรือ null
    function textToDeck(text) {
        const parts = text.split('\t');
        if (parts[0] !== '2' || parts.length < 4) return null;
        const [, format, name, list] = parts;
        const cards = [];
        list.split(',').filter(Boolean).forEach(tok => {
            const m = tok.match(/^(.+?)(?:@(\d+))?(?:\*(\d+))?(!)?(\^)?$/);
            if (!m) return;
            const vs = variantsOf(m[1]);
            if (!vs.length) return;
            const tpl = vs[parseInt(m[2] || '0', 10)] || vs[0];
            const n = Math.min(parseInt(m[3] || '1', 10), 60);
            for (let i = 0; i < n; i++) {
                const c = { ...tpl };
                if (i === 0 && m[4]) c.isCommander = true;
                if (i === 0 && m[5]) c.isCover = true;
                cards.push(c);
            }
        });
        return { cards, format: format || null, name: name || '' };
    }

    function legacyToDeck(code) {
        const decoded = decodeURIComponent(atob(code.replace(/ /g, '+')));
        const cards = [];
        decoded.split(',').forEach(row => {
            const [id, count, isCmd] = row.split('|');
            const tpl = (typeof cardsData !== 'undefined') && cardsData.find(c => String(c.id) === String(id));
            if (!tpl) return;
            for (let i = 0; i < parseInt(count, 10); i++) {
                const c = { ...tpl };
                if (i === 0 && isCmd === '1') c.isCommander = true;
                cards.push(c);
            }
        });
        return { cards, format: null, name: '' };
    }

    // รับได้ทั้งลิงก์เต็ม และรหัสอย่างเดียว
    function extractDeckCode(input) {
        let s = String(input || '').trim();
        const m = s.match(/[?&]deck=([^&#\s]+)/);
        if (m) s = m[1];
        try { s = decodeURIComponent(s); } catch (e) { /* ปล่อยตามเดิม */ }
        return s.trim();
    }

    async function decodeDeckCode(input) {
        const code = extractDeckCode(input);
        if (!code) return null;
        try {
            if (code.startsWith('z.')) {
                const bytes = await pipeBytes(b64urlToBytes(code.slice(2)), new DecompressionStream('deflate-raw'));
                return textToDeck(new TextDecoder().decode(bytes));
            }
            if (code.startsWith('p.')) return textToDeck(new TextDecoder().decode(b64urlToBytes(code.slice(2))));
            return legacyToDeck(code);
        } catch (e) {
            console.error('decodeDeckCode error:', e);
            return null;
        }
    }

    // ลิงก์เด็คปัจจุบัน
    async function buildDeckShareURL(deck, meta) {
        deck = deck || (typeof myDeck !== 'undefined' ? myDeck : []);
        meta = meta || {
            format: (typeof getDeckFormatKey === 'function') ? getDeckFormatKey() : '',
            name: (document.getElementById('deckNameInput') || {}).value || ''
        };
        const code = await encodeDeckCode(deck, meta);
        return `${window.location.origin}${window.location.pathname}?deck=${code}`;
    }

    // คัดลอกข้อความที่ได้มาแบบ async (รองรับ Safari ที่ต้องส่ง Promise เข้า ClipboardItem)
    async function copyTextAsync(textPromise) {
        try {
            if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
                const blob = Promise.resolve(textPromise).then(t => new Blob([t], { type: 'text/plain' }));
                await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]);
                return true;
            }
        } catch (e) { /* ลองวิธีถัดไป */ }
        const text = await textPromise;
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (e) {
            window.prompt('คัดลอกลิงก์นี้:', text);
            return false;
        }
    }

    window.encodeDeckCode = encodeDeckCode;
    window.decodeDeckCode = decodeDeckCode;
    window.extractDeckCode = extractDeckCode;
    window.buildDeckShareURL = buildDeckShareURL;
    window.copyTextAsync = copyTextAsync;
})();
