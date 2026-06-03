// =========================================================
//  ai_deck.js (v2 — Groq Edition)
//  ต้องโหลดหลัง: card_data/*.js, card_stats.js,
//                card_knowledge_builder.js
// =========================================================

// -------------------------------------------------------
//  CONFIG — แก้ตรงนี้เพื่อ "เทรน" AI เพิ่ม
// -------------------------------------------------------
const AI_CONFIG = {
    model: "llama-3.3-70b-versatile",   // เปลี่ยน model ตรงนี้
    max_tokens: 2048,

    systemPrompt: `
คุณคือ "ผู้เล่นระดับแข่งขัน Dinomaster TCG"
คุณต้องวิเคราะห์เกมโดยยึดกฎทั้งหมด 100%
ห้ามสมมติกฎเอง
ห้ามใช้ตรรกะแบบเกมอื่น
ห้ามอ้างอิง Yu-Gi-Oh / MTG / Pokémon

ให้คิดแบบผู้เล่นจริงที่เข้าใจ และศึกษากติกาที่ให้อย่างละเอียด:
Tempo , Resource (DP management),Line Control, Red Zone Timing, Fusion / Swarm Optimization
Armor Infuse Efficiency, Boost Value Curve, Illusion Risk Assessment

ให้คุณยึดกฎเหล่านี้เป็นหลัก (ห้ามข้าม ทำความเข้าใจอย่างละเอียดที่สุด):
DECK RULE
Main Deck: 40–60 ใบ
Extra Deck: 0–15 ใบ
ซ้ำได้ไม่เกิน 3 ใบ (ดูจาก ID)
Boost / Fusion / Illusion อยู่ Extra Deck
หากเป็นการ์ดคนละ Type หมายความว่านั่นไม่ใช่การ์ดที่ซ้ำกัน

DP ECONOMY
เริ่มก่อน 8 DP | เริ่มหลัง 10 DP | ทุก Start Phase รีเซ็ตเป็น 8
Extra Draw = 4 DP ต่อใบ (ในทางปฏิบัติมักไม่จ่าย เก็บไว้ป้องกันดีกว่า)
วิเคราะห์ Efficiency ต่อ 1 DP เสมอ

TURN STRUCTURE: Start → Draw → Main1 → Battle → Main2 → End
คนเริ่ม ข้าม Draw + Battle เทิร์นแรก

RED ZONE
ปลดล็อกเทิร์น 4 ของเจ้าของเทิร์น | ลงใหม่เท่านั้น ห้ามย้าย
ตอนโจมตีเลือก +500 AT หรือ +500 DF | เปลี่ยนตัว = ตัวเก่าออกนอกเกม

LINE LOGIC
AT Line ว่าง → ตี DF ได้ | AT+DF ว่าง → ตี Master ได้
DF ใช้ DF สู้ | AT ใช้ AT เทียบ AT | SH ลด AT ฝ่ายรุก

SWARM: ทำได้ Main 1/2 ต้องพร้อมสั่งการ ห้ามรวมหลังโจมตี รวมได้ครั้งเดียวต่อใบ

FUSION: ใช้ 2 เผ่าต่างกัน ได้ความสามารถทั้งหมด ใช้สิทธิ์ตามวัตถุดิบ
Armor ลงสุสาน | Boost ออกจากเกม | Effect หาย ยกเว้น Abnormal

ARMOR: จ่าย DP แล้ววางทับ | ใส่ให้ศัตรูได้ | Infuse ลด DP (เทิร์นละครั้ง)

BOOST: ติดได้ใบเดียว | เพิ่ม AT/DF/DP | ออกจากสนาม = ออกจากเกม

ILLUSION: 1 DP ลงตัวใหญ่ | ถ้า Illusion หลุด = Creature ตาย
ใช้ช่วย Fusion ลดวัตถุดิบ 1

MANUAL QUOTA: 1 ครั้งต่อใบต่อเทิร์น | รีเซ็ต Start Phase
Hand Trap / Stat Modifier / Targeting Attacker ใช้ได้แม้หลังประกาศโจมตี

COMMANDER SYSTEM
เลือก Creature เป็น Commander → เด็คใช้ Creature เผ่าเดียว (ไม่จำกัด Magic)
Commander Support: วางนอน = ลด DP 2 สำหรับลงการ์ดเผ่าตรงกัน
Commander Call: จ่าย 4 DP เข้า Red Zone | Commander Gift: ค้นการ์ดเผ่า 1 ใบ
Life Link: ถูกนำออก → จ่าย 1000 LP กลับ Commander Zone หรือยกเลิก

META ปัจจุบัน
- เด็ควนสุสาน และเด็คตีเร็ว เป็นเมต้าหลัก
- ระวัง Armor สาย pelta (โม่กอง)
- Counter สุสาน: Clean The Graveyard, Temper in Waste
- Counter บอร์ด: Black Hole, Super Incendiary Bomb, End of the Strongest
- การ์ดสามัญสำคัญ: Earthquake, Tornado, Thunder Bolt, Flashing Bolt, Disintegrate
- ถ้าเด็คเน้น Creature DP ต่ำ: Creature Reinforcement 1-2 ใบ

การ์ด Limit 1 ที่ควรใส่ถ้าได้:
- Lacussovagus: โดดจากมือยกเลิกเวท ได้บอร์ด ได้จั่ว
- Dryptosaurus: ทิ้งการ์ดโดดฟรีมาสั่งสับสน คอมโบตกสุสานได้
- Tapejara imperator: ลงมาดูมืออีกฝ่ายทั้งหมด ทิ้ง 1 ใบ
- Geosternbergia: สกิลฟรี รีมูฟสุสาน 3 ใบ วน Magic กลับมือ
- Germanodactylus: ตกสุสานจากสนาม → วน Magic 1 ใบ

ANALYSIS FORMAT (ตอบแบบพี่สอนน้อง ไม่เกริ่นนำ เข้าประเด็นทันที):
1. Archetype & Win Condition (วิเคราะห์จาก Master+BoostMaster ก่อน)
2. Tempo Curve: Turn 1-3 setup / Turn 4 Red Zone spike / Late game
3. DP Efficiency: คุ้มไหม overextend ตรงไหน resource leak
4. Red Zone Plan: ลงตัวไหน bait หรือ all-in
5. Swarm/Fusion Optimization
6. Risk Map: แพ้อะไร โดน counter แบบไหน
7. Suggested Improvements: ตัดอะไร เพิ่มอะไร ปรับ ratio เท่าไร
`
};

// -------------------------------------------------------
//  GROQ KEY MANAGEMENT
// -------------------------------------------------------
function getGroqKey() {
    let key = localStorage.getItem("dinomaster_groq_key");
    if (!key || key === "null" || key === "undefined" || key.trim() === "") {
        key = prompt(
            "กรุณาใส่ Groq API Key\n" +
            "ขอรับฟรีได้ที่: console.groq.com\n" +
            "(สมัครฟรี ไม่มีวันหมดอายุ)"
        );
        if (key && key.trim() !== "") {
            localStorage.setItem("dinomaster_groq_key", key.trim());
        } else {
            return null;
        }
    }
    return key.trim();
}

function clearGroqKey() {
    localStorage.removeItem("dinomaster_groq_key");
    alert("ล้าง Groq API Key เรียบร้อยแล้ว");
}

// -------------------------------------------------------
//  DECK DATA PREPARATION
// -------------------------------------------------------
function cleanAbilityText(input) {
    if (!input || typeof input !== "string") return "ไม่มีความสามารถพิเศษ";
    return input
        .replace(/<br\s*\/?>/gi, " | ")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function prepareAIData() {
    try {
        if (typeof myDeck === "undefined" || !myDeck || myDeck.length === 0) {
            throw new Error("ไม่พบข้อมูลเด็ค กรุณาใส่การ์ดก่อน");
        }

        const validDeck = myDeck.filter(c => c !== null && c !== undefined);
        const mainList = validDeck.filter(
            c => !c.isCommander && !["Master", "Boost_Master", "LC"].includes(c.type)
        );
        const extraList = validDeck.filter(
            c => ["Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion", "Legend"].includes(c.type)
        );
        const commander = validDeck.find(c => c.isCommander);
        const master = validDeck.find(c => c.type === "Master" || c.type === "Boost_Master");
        const lc = validDeck.find(c => c.type === "LC");

        // สร้าง summary ของเด็ค (รวม count)
        const summarize = (list) => {
            const map = {};
            list.forEach(c => {
                const id = c.id || "unknown";
                if (!map[id]) {
                    map[id] = {
                        name: c.nameTH || "?",
                        count: 1,
                        type: c.type || "-",
                        clan: c.clan || "-",
                        dp: c.dp != null ? c.dp : "?",
                        ability: cleanAbilityText(c.ability)
                    };
                    // ดึง AT/DF จาก cardStatsData ถ้ามี
                    if (typeof cardStatsData !== "undefined" && cardStatsData[id]) {
                        map[id].at = cardStatsData[id].at;
                        map[id].df = cardStatsData[id].df;
                    }
                } else {
                    map[id].count++;
                }
            });
            return Object.values(map)
                .map(c => {
                    const stat = (c.at != null) ? ` AT:${c.at} DF:${c.df}` : "";
                    return `- ${c.name} x${c.count} [${c.type}/${c.clan}] DP:${c.dp}${stat} | ${c.ability}`;
                })
                .join("\n");
        };

        return {
            commanderInfo: commander
                ? `${commander.nameTH} (เผ่า: ${commander.clan}) | ${cleanAbilityText(commander.ability)}`
                : "ไม่ได้เลือก",
            masterInfo: master
                ? `${master.nameTH} [${master.type}] | ${cleanAbilityText(master.ability)}`
                : "ไม่ได้เลือก",
            lcInfo: lc
                ? `${lc.nameTH} | ${cleanAbilityText(lc.ability)}`
                : "ไม่มี",
            mainDeckList: summarize(mainList),
            extraDeckList: extraList.length > 0 ? summarize(extraList) : "ไม่มี",
            mainCount: mainList.length + (commander ? 1 : 0),
            extraCount: extraList.length,
            deckCardIds: validDeck.map(c => c.id),
        };
    } catch (e) {
        console.error("prepareAIData Error:", e);
        throw e;
    }
}

// -------------------------------------------------------
//  UI HELPERS
// -------------------------------------------------------
function setInsightHTML(html) {
    const box = document.getElementById("aiInsight");
    if (box) box.innerHTML = html;
}

function setInsightText(text) {
    const box = document.getElementById("aiInsight");
    if (box) box.innerText = text;
}

function renderMarkdown(text) {
    // แปลง markdown เบื้องต้นให้อ่านง่ายใน HTML
    return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/^#{1,3}\s(.+)$/gm, "<h4 style='color:#3498db;margin:12px 0 4px'>$1</h4>")
        .replace(/^[-•]\s(.+)$/gm, "<li style='margin:3px 0'>$1</li>")
        .replace(/(<li.*<\/li>)/gs, "<ul style='margin:4px 0 4px 20px'>$1</ul>")
        .replace(/\n{2,}/g, "<br><br>")
        .replace(/\n/g, "<br>");
}

// -------------------------------------------------------
//  MAIN FUNCTION
// -------------------------------------------------------
async function askAIForAdvice() {
    const insightBox = document.getElementById("aiInsight");
    if (!insightBox) {
        alert("CRITICAL ERROR: ไม่พบ Element id='aiInsight' ในหน้า HTML");
        return;
    }

    // ---- Step 1: API Key ----
    const apiKey = getGroqKey();
    if (!apiKey) {
        setInsightHTML("<span style='color:#e74c3c'>❌ ไม่พบ Groq API Key — กดวิเคราะห์อีกครั้งเพื่อใส่ Key</span>");
        return;
    }

    // ---- Step 2: เตรียมข้อมูลเด็ค ----
    let deckData;
    try {
        setInsightHTML("<span style='color:#f39c12'>⏳ กำลังอ่านข้อมูลเด็ค...</span>");
        deckData = prepareAIData();
    } catch (e) {
        setInsightHTML(`<span style='color:#e74c3c'>❌ ${e.message}</span>`);
        return;
    }

    // ---- Step 3: สร้าง knowledge string ----
    setInsightHTML("<span style='color:#f39c12'>⏳ กำลังรวบรวมข้อมูลการ์ดในเกม...</span>");

    let cardKnowledgeStr = "";
    if (typeof window.CARD_KNOWLEDGE !== "undefined") {
        // inject เฉพาะการ์ดในเด็ค + การ์ดทั้งหมดในเกม
        const deckCardKnowledge = window.CARD_KNOWLEDGE.forDeck(deckData.deckCardIds);
        cardKnowledgeStr = `
=== ฐานข้อมูลการ์ดในเกม (${window.CARD_KNOWLEDGE.totalCards} ใบ) ===
[format: [ID] ชื่อ | type/clan | DP AT DF | effect]
${window.CARD_KNOWLEDGE.full}`;
    } else {
        console.warn("[AI] CARD_KNOWLEDGE ไม่พบ — วิเคราะห์โดยไม่มีฐานข้อมูลการ์ด");
        cardKnowledgeStr = "(ไม่มีฐานข้อมูลการ์ด — กรุณาโหลด card_knowledge_builder.js)";
    }

    // ---- Step 4: สร้าง user prompt ----
    const userPrompt = `
=== เด็คที่ต้องการวิเคราะห์ ===
Commander: ${deckData.commanderInfo}
Master: ${deckData.masterInfo}
Life Crystal (LC): ${deckData.lcInfo}

Main Deck (${deckData.mainCount} ใบ):
${deckData.mainDeckList}

Extra Deck (${deckData.extraCount} ใบ):
${deckData.extraDeckList}

${cardKnowledgeStr}

วิเคราะห์เด็คนี้ให้ฉันหน่อย
`;

    // ---- Step 5: เรียก Groq API ----
    setInsightHTML("<span style='color:#f39c12'>🤖 AI กำลังวิเคราะห์เด็ค...</span>");

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                max_tokens: AI_CONFIG.max_tokens,
                messages: [
                    { role: "system", content: AI_CONFIG.systemPrompt },
                    { role: "user",   content: userPrompt }
                ]
            })
        });

        const resData = await response.json();

        // ---- Handle error responses ----
        if (!response.ok) {
            const errMsg = resData?.error?.message || `HTTP ${response.status}`;

            // Key ผิด → ลบทิ้งให้ใส่ใหม่
            if (response.status === 401) {
                localStorage.removeItem("dinomaster_groq_key");
                throw new Error("API Key ไม่ถูกต้อง — กรุณากดวิเคราะห์อีกครั้งเพื่อใส่ Key ใหม่");
            }
            // Rate limit
            if (response.status === 429) {
                throw new Error("เรียกใช้ AI บ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่");
            }
            // Context เกิน
            if (errMsg.includes("context") || errMsg.includes("token")) {
                throw new Error("ข้อมูลเด็คใหญ่เกินไป ลองลดจำนวนการ์ดในเด็คแล้วลองใหม่");
            }
            throw new Error(errMsg);
        }

        const aiText = resData?.choices?.[0]?.message?.content;
        if (!aiText) {
            throw new Error("AI ไม่ส่งคำตอบกลับมา");
        }

        // ---- แสดงผล ----
        insightBox.innerHTML = `
            <div style="
                text-align:left; 
                line-height:1.7; 
                font-size:14px;
                color:#ecf0f1;
                max-height: 500px;
                overflow-y: auto;
                padding-right: 8px;
            ">
                ${renderMarkdown(aiText)}
            </div>
            <div style="margin-top:12px; font-size:11px; color:#636e72; text-align:right;">
                Model: ${AI_CONFIG.model} | การ์ดในฐานข้อมูล: ${window.CARD_KNOWLEDGE?.totalCards ?? "N/A"} ใบ
            </div>
        `;

    } catch (error) {
        console.error("AI Error:", error);
        setInsightHTML(`
            <span style='color:#ff7675'>❌ เกิดข้อผิดพลาด: ${error.message}</span>
            <br><br>
            <button onclick="clearGroqKey()" style="
                padding:6px 14px; background:#636e72; color:white;
                border:none; border-radius:4px; cursor:pointer; font-size:13px;
            ">🔑 ล้าง API Key แล้วใส่ใหม่</button>
        `);
    }
}
