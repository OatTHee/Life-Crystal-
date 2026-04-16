// =========================================================
//  SECTION: DECK SHOWCASE & STATISTICS
//  (รวบรวมฟังก์ชันสำหรับหน้าโชว์เคสและหน้าสถิติไว้ที่นี่)
// =========================================================

function openDeckShowcase() {
    const overlay = document.getElementById('deckShowcaseOverlay');
    const body = document.getElementById('showcaseBody');
    const title = document.getElementById('showcaseTitle');
    
    if (!overlay || !body) return;

    window.isShowcaseEditMode = false; // รีเซ็ตโหมดแก้ไขทุกครั้งที่เปิดใหม่

    // ดึงชื่อเด็คจาก Input
    const deckName = document.getElementById('deckNameInput').value || "Unnamed Deck";
    title.innerText = deckName;
    
    // 1. แยกกลุ่มการ์ด
    //Commander
    const commanderList = myDeck.filter(c => c.isCommander);
    // Starter: Commander + Master + Boost Master
    const starterList = myDeck.filter(c => 
        c.isCommander === true || 
        c.type === "Master" || 
        c.type === "LC" || 
        c.type === "Boost_Master"
    );
    // Extra: การ์ดพิเศษต่างๆ
    const extraList = myDeck.filter(c => !c.isCommander && ["Boost_Creature", "Fusion_Monster", "Armored_Dino", "Illusion"].includes(c.type));
    
    // Main: ที่เหลือทั้งหมด
    const mainList = myDeck.filter(c => 
        !starterList.includes(c) && 
        !extraList.includes(c)
    );

    // 2. ฟังก์ชันนับจำนวนซ้ำเพื่อโชว์เลข x2, x3
    const getGrouped = (list) => {
        return list.reduce((acc, card) => {
            if (!acc[card.id]) {
                acc[card.id] = { ...card, count: 0 };
            }
            acc[card.id].count++;
            return acc;
        }, {});
    };

    // 3. สร้างส่วนของสรุปตัวเลข (Stats Bar ด้านบน)
    let finalHtml = `
    <div style="position: sticky; top: 0; background: #1e1e2e; padding: 15px; border-radius: 12px; color: white; margin-bottom: 10px; display: flex; justify-content: space-around; border-bottom: 3px solid #6c5ce7; z-index: 1000; box-shadow: 0 10px 20px rgba(0,0,0,0.3);">
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">STARTER</span>
            <span style="font-size:20px; font-weight:bold; color:#ff9f43;">${starterList.length}</span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">MAIN DECK</span>
            <span style="font-size:20px; font-weight:bold; color:#00d2d3;">${mainList.length + commanderList.length} <small style="font-size:12px; color:#666;">/ 60</small></span>
        </div>
        <div style="text-align:center;">
            <span style="display:block; font-size:12px; color:#aaa;">EXTRA DECK</span>
            <span style="font-size:20px; font-weight:bold; color:#54a0ff;">${extraList.length} <small style="font-size:12px; color:#666;">/ 15</small></span>
        </div>
    </div>`;

    // 4. แทรกปุ่ม Toggle และ Dashboard สถิติ
    finalHtml += `
    <div style="text-align: right; margin-bottom: 15px;">
        <button id="toggleMonitorBtn" onclick="toggleMonitor()" 
                style="background: #6c5ce7; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; font-family: 'Kanit', sans-serif; font-size: 14px;">
            📊 ดูสถิติเด็ค
        </button>
    </div>
    
    ${getDeckStatsHTML()} 
    `;

    // 5. วนลูปสร้าง Section การ์ด
    const sections = [
        { name: "STARTER / COMMANDER", data: getGrouped(starterList) },
        { name: "MAIN DECK", data: getGrouped(mainList) },
        { name: "EXTRA DECK", data: getGrouped(extraList) }
    ];

    sections.forEach(sec => {
        const cards = Object.values(sec.data);
        if (cards.length > 0) {
            finalHtml += `<h3 style="color:#ff9f43; margin-top:30px; border-left: 4px solid #ff9f43; padding-left:10px; font-size:20px;">${sec.name}</h3>`;
            finalHtml += `<div class="showcase-grid" id="grid-${sec.name.replace(/\s/g, '')}" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; margin-bottom: 20px;">`;
            
            cards.forEach(card => {
                const isStarter = sec.name === "STARTER / COMMANDER";
                const countBadge = !isStarter 
                    ? `<div class="showcase-count-badge" style="position: absolute; top: -5px; right: -5px; background: #ff4757; color: white; padding: 2px 8px; border-radius: 10px; font-weight: bold; z-index: 2;">x${card.count}</div>` 
                    : "";

                // ป้องกัน Tainted Canvas (เผื่ออนาคต)
                const imageUrl = card.image + (card.image.includes('?') ? '&' : '?') + 'not-tainted=1';

                finalHtml += `
                    <div class="showcase-card" 
                         data-card-id="${card.id}" 
                         style="position: relative; cursor: pointer; transition: opacity 0.2s;"> 
                        <img src="${imageUrl}" 
                             onclick="if(!window.isShowcaseEditMode) { typeof openModal === 'function' ? openModal('${card.id}') : showCardModal('${card.id}') }"
                             crossorigin="anonymous" 
                             onerror="this.removeAttribute('crossorigin'); this.src='${card.image}';"
                             style="width:100%; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.5); display: block;">
                        ${countBadge}
                        
                        <div class="showcase-controls" style="display: ${window.isShowcaseEditMode ? 'flex' : 'none'}; position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.85); border-radius: 20px; padding: 2px 10px; gap: 15px; border: 1px solid rgba(255,255,255,0.3); z-index:10;">
                            <div class="showcase-ctrl-btn minus" style="color:white; font-size:20px; font-weight:bold; cursor:pointer;" onclick="event.stopPropagation(); handleShowcaseUpdate('${card.id}', 'remove')">−</div>
                            <div class="showcase-ctrl-btn plus" style="color:white; font-size:20px; font-weight:bold; cursor:pointer;" onclick="event.stopPropagation(); handleShowcaseUpdate('${card.id}', 'add')">+</div>
                        </div>
                    </div>`;
            });
            finalHtml += `</div>`;
        }
    });

    // แสดงผลลัพธ์
    body.innerHTML = finalHtml;
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}

function closeDeckShowcase() {
    document.getElementById('deckShowcaseOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ฟังก์ชันสำหรับสลับการแสดงผลหน้า Dashboard สถิติ
function toggleMonitor() {
    const monitor = document.getElementById('deckMonitor');
    const btn = document.getElementById('toggleMonitorBtn');
    
    if (monitor.style.display === 'none' || monitor.style.display === '') {
        monitor.style.display = 'flex'; 
        btn.innerText = "📊 ซ่อนสถิติเด็ค";
        btn.style.background = "#ff4757"; 
    } else {
        monitor.style.display = 'none';
        btn.innerText = "📊 ดูสถิติเด็ค";
        btn.style.background = "#6c5ce7"; 
    }
}

// =========================================================
//  STATS CALCULATION (Updated: Curve Graphs Fixed)
// =========================================================

function getDeckStatsHTML() {
    // 1. กรองข้อมูล (Main Deck)
    const mainList = myDeck.filter(c => 
        c.type !== "Master" && 
        c.type !== "Boost_Master" &&
        !["Fusion_Monster", "Armored_Dino", "Boost_Creature", "Illusion"].includes(c.type)
    );

    const creatureCards = mainList.filter(c => c.type === "Creature");
    const magicCards = mainList.filter(c => ["Action", "Armor", "Field"].includes(c.type));
    
    // 2. นับจำนวนแยกประเภท
    const typeCounts = { "Creature": creatureCards.length, "Action": 0, "Armor": 0, "Field": 0 };
    magicCards.forEach(c => { if(typeCounts.hasOwnProperty(c.type)) typeCounts[c.type]++; });

    // 3. คำนวณค่าฐานนิยม (Mode DP) เฉพาะ Creature
    const dpCountsMap = {};
    creatureCards.forEach(c => {
        const val = parseInt(c.dp) || 0;
        dpCountsMap[val] = (dpCountsMap[val] || 0) + 1;
    });
    let modeDP = 0;
    let maxFreq = 0;
    for (const val in dpCountsMap) {
        if (dpCountsMap[val] > maxFreq) {
            maxFreq = dpCountsMap[val];
            modeDP = val;
        }
    }

    // 4. คำนวณสถานะไฟจราจร
    let statusColor = "#2ecc71"; // Green
    let statusText = "เด็คถูกกฎ (ฟอร์แมตหลัก)";
    if (mainList.length < 40 || mainList.length > 60) {
        statusColor = "#e74c3c"; // Red
        statusText = "ผิดกฎจำนวนการ์ด (ฟอร์แมตหลัก)";
    } else if (modeDP >= 4) {
        statusColor = "#f1c40f"; // Yellow
        statusText = "Heavy Deck (เด็คหนักเกินไป)";
    }

    // 5. ข้อมูล Donut Chart เผ่า
    const clanColorMap = {
        "สองขา": "#e74c3c", "คอยาว": "#9b59b6", "มีปีก": "#3fbffa",
        "มีเขา": "#f1c40f", "สัตว์น้ำ": "#1a46e6", "มีเกราะหางหนาม": "#27ae60",
        "จักรกล": "#95a5a6", "ไม่ระบุเผ่า": "#444444"
    };
    const clanCounts = {};
    creatureCards.forEach(c => {
        const clan = c.clan || "ไม่ระบุเผ่า";
        clanCounts[clan] = (clanCounts[clan] || 0) + 1;
    });
    const sortedClans = Object.entries(clanCounts).sort((a, b) => b[1] - a[1]);
    let currentPercent = 0;
    const clanGradient = sortedClans.map(clan => {
        const color = clanColorMap[clan[0]] || "#ffffff"; 
        const percent = (clan[1] / (creatureCards.length || 1)) * 100;
        const start = currentPercent;
        currentPercent += percent;
        return `${color} ${start}% ${currentPercent}%`;
    }).join(", ");

    // 6. ข้อมูล DP Curves
    const getCurveData = (list) => {
        const curve = new Array(9).fill(0); // 0 ถึง 8
        list.forEach(c => {
            const val = parseInt(c.dp) || 0;
            if(val >= 0 && val <= 8) curve[val]++;
        });
        return curve;
    };
    const creatureCurve = getCurveData(creatureCards);
    const magicCurve = getCurveData(magicCards);
    const maxVal = Math.max(...creatureCurve, ...magicCurve, 1); // หาค่าสูงสุดเพื่อเทียบ % ความสูง

    // --- ส่วน HTML Dashboard ---
    return `
<style>
    /* CSS เฉพาะส่วน Dashboard เพื่อให้รองรับมือถือ */
    #deckMonitor {
        padding: 20px !important;
    }
    .stats-flex-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: stretch;
    }
    .stats-col {
        flex: 1;
        min-width: 280px; 
    }
    .stats-col-wide {
        flex: 1.5;
        min-width: 300px;
    }
    .curve-container {
        flex: 2;
        min-width: 100%; 
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    @media (max-width: 600px) {
        #deckMonitor { padding: 15px !important; }
        .stats-col { min-width: 100%; }
        .curve-container { min-width: 100%; }
        .chart-row { flex-direction: column !important; align-items: center !important; }
    }
</style>

<div id="deckMonitor" style="display:none; background: #141423; border: 1px solid #6c5ce7; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); color: white; font-family: 'Kanit', sans-serif;">
    
    <div class="stats-flex-container">
        
        <div class="stats-col" style="display: flex; flex-direction: column; gap: 15px;">
            <h4 style="color:#00cec9; margin:0; font-size:16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-chart-line"></i> Deck Overview
            </h4>
            
            <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid #444; border-radius: 12px; padding: 15px;">
                <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px;">
                    <span style="font-size: 11px; color: #aaa; display: block;">การ์ดรวม (Main Deck)</span>
                    <span style="font-size: 32px; font-weight: bold; color: #fff;">${mainList.length}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
                    <div style="color: #f1c40f;">Creature: <b style="float:right;">${typeCounts.Creature}</b></div>
                    <div style="color: #e74c3c;">Action: <b style="float:right;">${typeCounts.Action}</b></div>
                    <div style="color: #3498db;">Armor: <b style="float:right;">${typeCounts.Armor}</b></div>
                    <div style="color: #2ecc71;">Field: <b style="float:right;">${typeCounts.Field}</b></div>
                </div>
            </div>

            <div style="background: rgba(108, 92, 231, 0.1); border: 1px solid #6c5ce7; border-radius: 12px; padding: 12px; text-align: center;">
                <span style="font-size: 11px; color: #aaa;">DP ยอดนิยม (Creature)</span>
                <span style="font-size: 24px; font-weight: bold; color: #00cec9; display: block;">DP ${modeDP}</span>
            </div>
        </div>

        <div class="stats-col" style="background: rgba(0,0,0,0.2); border: 1px solid #333; border-radius: 12px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <h4 style="color:#a29bfe; margin:0 0 15px 0; font-size:15px; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-robot"></i> AI Deck Doctor
                </h4>
                
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; background: rgba(255,255,255,0.03); padding: 8px; border-radius: 8px;">
                    <div style="width: 12px; height: 12px; border-radius: 50%; background: ${statusColor}; box-shadow: 0 0 10px ${statusColor};"></div>
                    <span style="font-size: 13px; font-weight: bold; color: ${statusColor};">${statusText}</span>
                </div>
                
                <p style="font-size: 11px; color: #888; line-height: 1.4; margin-bottom: 15px;">
                    กดปุ่มวิเคราะห์เพื่อเช็คความพร้อมของเด็คกับ Meta Games ปัจจุบัน และตรวจสอบลิสต์การ์ดที่ถูกแบน
                </p>
            </div>

            <button onclick="askAIForAdvice()" style="width: 100%; padding: 10px; background: #6c5ce7; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: bold; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <i class="fas fa-magic"></i> วิเคราะห์เด็คด้วย AI
            </button>
        </div>
<div id="aiInsight" style="
    margin-top: 15px; 
    padding: 15px; 
    background: rgba(0,0,0,0.3); 
    border-radius: 8px; 
    color: #ecf0f1; 
    line-height: 1.6; 
    min-height: 50px;
    white-space: pre-wrap;
    border: 1px dashed #7f8c8d;
">
    คำแนะนำจาก AI จะปรากฏตรงนี้...
</div>
        <div class="stats-col-wide">
            <div class="chart-row" style="display: flex; flex-wrap: wrap; gap: 20px;">
                
                <div style="flex: 1; min-width: 150px; text-align: center;">
                    <div style="position: relative; width: 150px; height: 150px; margin: 0 auto 10px auto; border-radius: 50%; background: conic-gradient(${clanGradient || "#444 0% 100%"}); display: flex; align-items: center; justify-content: center;">
                        <div style="width: 110px; height: 110px; background: #141423; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; color: #fff; box-shadow: inset 0 0 10px rgba(0,0,0,0.5);">
                            ${creatureCards.length}
                        </div>
                    </div>
                    <span style="font-size: 12px; color: #888; letter-spacing: 1px;">CREATURE CLANS</span>
                </div>

                <div class="curve-container">
                    <div>
                        <span style="font-size: 14px; color: #f1c40f;">📊 Creature Curves (DP)</span>
                        <div style="display: flex; align-items: flex-end; height: 80px; gap: 8px; border-bottom: 2px solid #00ff15; padding-bottom:4px; margin-top:10px;">
                            ${creatureCurve.map((count, i) => `
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <span style="font-size:11px; color:#fff; font-weight:bold; margin-bottom:2px;">${count > 0 ? count : ''}</span>
                                    
                                    <div style="width: 100%; height: 50px; display: flex; align-items: flex-end;">
                                        <div style="width:100%; background:#f1c40f; height:${(count/maxVal)*100}%; border-radius:2px 2px 0 0; min-height:2px; opacity: ${count > 0 ? 1 : 0.3}; transition: height 0.4s ease-out;"></div>
                                    </div>

                                    <span style="font-size:11px; color:#00ff15; margin-top:2px;">${i}</span>
                                </div>
                            `).join('')} 
                        </div>
                    </div>

                    <div>
                        <span style="font-size: 14px; color: #e74c3c;">🪄 Magic Curves (DP)</span>
                        <div style="display: flex; align-items: flex-end; height: 80px; gap: 8px; border-bottom: 2px solid #00ff15; padding-bottom:4px; margin-top:10px;">
                            ${magicCurve.map((count, i) => `
                                <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; align-items:center;">
                                    <span style="font-size:11px; color:#fff; font-weight:bold; margin-bottom:2px;">${count > 0 ? count : ''}</span>
                                    
                                    <div style="width: 100%; height: 50px; display: flex; align-items: flex-end;">
                                        <div style="width:100%; background:#e74c3c; height:${(count/maxVal)*100}%; border-radius:2px 2px 0 0; min-height:2px; opacity: ${count > 0 ? 1 : 0.3}; transition: height 0.4s ease-out;"></div>
                                    </div>

                                    <span style="font-size:11px; color:#00ff15; margin-top:2px;">${i}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>`;
}

// ฟังก์ชันจำลองสำหรับปุ่ม AI
async function askAIForAdvice() {
    const insightBox = document.getElementById('aiInsight');
    if (!insightBox) return;

    insightBox.innerText = "🔍 AI กำลังอ่านเด็คของคุณ...";

    try {
        const apiKey = getApiKey();
        if (!apiKey) return;

        const data = prepareAIData();

        // ใช้ URL เวอร์ชัน Stable เพื่อความชัวร์กับ API Key ทุกประเภท
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${AI_CONFIG.systemPrompt}\n\nนี่คือข้อมูลเด็คของฉัน:\n${data.deckList}`
                    }]
                }]
            })
        });

        const resData = await response.json();

        if (resData.error) {
            // ถ้า Error เพราะรุ่นโมเดลผิด ให้แจ้งเตือนชัดเจน
            throw new Error(`Google API ตอบกลับว่า: ${resData.error.message}`);
        }

        const aiResponse = resData?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiResponse) {
            insightBox.innerText = aiResponse;
        } else {
            insightBox.innerText = "AI ไม่สามารถสร้างคำแนะนำได้ในขณะนี้";
        }

    } catch (error) {
        console.error("AI Error:", error);
        insightBox.innerHTML = `<span style='color:#ff7675'>❌ ${error.message}</span>`;
    }
}

// ฟังก์ชันจัดการ Showcase Update (Add/Remove)
window.isShowcaseEditMode = window.isShowcaseEditMode || false;

function toggleShowcaseEdit() {
    window.isShowcaseEditMode = !window.isShowcaseEditMode;
    const controls = document.querySelectorAll('.showcase-controls');
    const eyeBtn = document.querySelector('button[onclick="toggleShowcaseEdit()"]');
    
    controls.forEach(el => el.style.display = window.isShowcaseEditMode ? 'flex' : 'none');

    if (eyeBtn) {
        eyeBtn.innerHTML = window.isShowcaseEditMode ? "เลิกแก้ไข" : "แก้ไข";
        eyeBtn.style.background = window.isShowcaseEditMode ? "#e67e22" : "#07357d";
    }
}

function handleShowcaseUpdate(cardId, action) {
    const allAvailableCards = (typeof cardsData !== 'undefined') ? cardsData : [];
    const template = allAvailableCards.find(c => String(c.id) === String(cardId)) || 
                     myDeck.find(c => String(c.id) === String(cardId));

    if (!template) return;

    if (action === 'add') {
        const currentCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
        if (currentCount >= 3) {
            alert("⚠️ ใส่การ์ดซ้ำได้ไม่เกิน 3 ใบ");
            return;
        }
        if (template.type === "Master" || template.type === "Boost_Master") {
            const hasMaster = myDeck.some(c => c.type === template.type);
            if (hasMaster) {
                alert(`⚠️ ในเด็คมี ${template.type} ได้เพียงใบเดียวเท่านั้น`);
                return;
            }
        }
        myDeck.push({ ...template });
    } else {
        const index = myDeck.findIndex(c => String(c.id) === String(cardId));
        if (index !== -1) myDeck.splice(index, 1);
    }

    // บันทึกและอัปเดต UI
    isUnsaved = true;
    saveDeckToLocalStorage();
    
    if (typeof updateDeckUI === 'function') updateDeckUI();

    // อัปเดตตัวเลข Badge ในหน้า Showcase ทันที
    const newTotalCount = myDeck.filter(c => String(c.id) === String(cardId)).length;
    const cardElements = document.querySelectorAll(`.showcase-card[data-card-id="${cardId}"]`);
    
    cardElements.forEach(cardEl => {
        const badge = cardEl.querySelector('.showcase-count-badge');
        if (badge) {
            badge.innerText = `x${newTotalCount}`;
            badge.style.display = 'block';
        }
        cardEl.style.opacity = newTotalCount === 0 ? "0.4" : "1";
    });
}