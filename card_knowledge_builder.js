// =========================================================
//  card_knowledge_builder.js
//  รวบรวมข้อมูลการ์ดจากทุก global variable แล้วสร้าง
//  "knowledge string" สำหรับ inject เข้า AI prompt
//
//  วิธีใช้: โหลดไฟล์นี้หลังจากโหลด card_data/*.js ทั้งหมดแล้ว
//  จะได้ window.CARD_KNOWLEDGE พร้อมใช้
// =========================================================

(function buildCardKnowledge() {

    // -------------------------------------------------------
    //  1. รายชื่อ global variable ทั้งหมดที่มาจาก card_data/
    //     ➜ เพิ่มตรงนี้เมื่อมีไฟล์ชุดใหม่
    // -------------------------------------------------------
    const CARD_DATA_SOURCES = [
        // Creature arrays
        "C_originalData",
        "CharacterData",
        "C_EnigmaData",
        "C_NewmasterData",
        "C_StepNextData",
        "ReEnigmaData",

        // Magic/Action/Armor/Field arrays
        "MG_originalData",
        "MG_enigmaData",
        "MG_newmasterData",
        "MG_StepNextData",
        "MG_AR1Data",
        // Master
        "MS_newmasterData",
        // Extra Deck
        "BoostMaster2Data",
        "Boost3Data",
        "Boost4Data",
        "Reart1Data",
        "Boost5Data",
        "icefireData",
        "Boost6Data",
        "Boost7Data",

    ];

    // -------------------------------------------------------
    //  2. Utility: ล้าง HTML tag ออกจาก ability text
    // -------------------------------------------------------
    function stripHTML(str) {
        if (!str || typeof str !== "string") return "";
        return str
            .replace(/<br\s*\/?>/gi, " | ")
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    // -------------------------------------------------------
    //  3. รวบรวมการ์ดจากทุก source ที่โหลดอยู่
    // -------------------------------------------------------
    let allCards = [];

    CARD_DATA_SOURCES.forEach(varName => {
        if (typeof window[varName] !== "undefined" && Array.isArray(window[varName])) {
            allCards = allCards.concat(window[varName]);
        }
    });

    // -------------------------------------------------------
    //  4. Merge กับ cardStatsData (AT/DF/taxonomy)
    // -------------------------------------------------------
    const statsMap = (typeof cardStatsData !== "undefined") ? cardStatsData : {};

    // -------------------------------------------------------
    //  5. บีบอัดเป็น compact string สำหรับ inject
    //     format: [ID] ชื่อ | type/clan | dp:N | at:N df:N | effect
    //     ตัดข้อมูลที่ AI ไม่ต้องการออก (image path ฯลฯ)
    // -------------------------------------------------------
    function compressCard(card) {
        const id = card.id || "?";
        const name = card.nameTH || card.nameEN || "?";
        const type = card.type || "?";
        const clan = card.clan || "-";
        const dp = card.dp != null ? card.dp : "?";
        const ability = stripHTML(card.ability);

        const stats = statsMap[id];
        const at = stats ? stats.at : (card.at != null ? card.at : "-");
        const df = stats ? stats.df : (card.df != null ? card.df : "-");
        const tax = stats && stats.taxonomy ? ` [${stats.taxonomy}]` : "";

        return `[${id}] ${name} | ${type}/${clan} | DP:${dp} AT:${at} DF:${df}${tax} | ${ability}`;
    }

    const knowledgeLines = allCards.map(compressCard);

    // -------------------------------------------------------
    //  6. แบ่งกลุ่มเพื่อให้ AI อ่านง่าย
    // -------------------------------------------------------
    function groupBy(cards, key) {
        return cards.reduce((acc, c) => {
            const k = c[key] || "อื่นๆ";
            if (!acc[k]) acc[k] = [];
            acc[k].push(c);
            return acc;
        }, {});
    }

    const grouped = groupBy(allCards, "type");
    let groupedKnowledge = "";
    for (const [type, cards] of Object.entries(grouped)) {
        groupedKnowledge += `\n=== ${type} (${cards.length} ใบ) ===\n`;
        groupedKnowledge += cards.map(compressCard).join("\n");
        groupedKnowledge += "\n";
    }

    // -------------------------------------------------------
    //  7. Export ออกมาเป็น global ให้ ai_deck.js ใช้
    // -------------------------------------------------------
    window.CARD_KNOWLEDGE = {
        // สำหรับ inject ทั้งหมด (แบ่งกลุ่ม)
        full: groupedKnowledge,

        // สำหรับ inject เฉพาะการ์ดในเด็ค (เร็วกว่า)
        forDeck: function(deckCardIds) {
            const idSet = new Set(deckCardIds.map(String));
            const deckCards = allCards.filter(c => idSet.has(String(c.id)));
            return deckCards.map(compressCard).join("\n");
        },

        // stats โดยตรงถ้าต้องการ
        stats: statsMap,

        // จำนวนการ์ดที่โหลดได้
        totalCards: allCards.length,
        totalSources: CARD_DATA_SOURCES.filter(v => typeof window[v] !== "undefined").length,
    };

    console.log(`[CardKnowledge] โหลดสำเร็จ: ${window.CARD_KNOWLEDGE.totalCards} การ์ด จาก ${window.CARD_KNOWLEDGE.totalSources} ไฟล์`);

})();
