const cardsData = [...C_originalData,...MG_originalData,...CharacterData, ...C_EnigmaData,
    ...MG_enigmaData,...C_NewmasterData,
...MG_newmasterData, ...C_StepNextData, ...MS_newmasterData, ...MG_StepNextData,
 ...ReEnigmaData, ...MG_AR1Data, ...Armored_DinoData,
...BoostMaster2Data,...Boost3Data, ...Boost4Data, ...Reart1Data, ...Boost5Data, ...icefireData, 
...Boost6Data,...Boost7Data,...PR09Data,...PR10Data ]; 

if (typeof cardStatsData !== 'undefined') {
    cardsData.forEach(card => {
        const stats = cardStatsData[String(card.id)];
        if (stats) {
            card.at = stats.at;
            card.df = stats.df;
            card.taxonomy = stats.taxonomy;
        }
    });
}

let myDeck = JSON.parse(localStorage.getItem('dinomaster_deck')) || [];
let currentFilteredCards = cardsData;

// --- ตัวกรอง DP แบบเลือกได้หลายค่าพร้อมกัน (เช่น 2 + 3 + 6) ---
// เก็บเป็น Array ของ string เช่น ["2","3","6"] / [] = ไม่กรอง (แสดงทั้งหมด)
let selectedDpValues = [];

// รายการค่า DP ทั้งหมด (ใช้ร่วมกันทั้งตอนสร้างปุ่มและตอน sync/แสดงผล)
const DP_FILTER_VALUES = [
    { val: "0", label: "0" },
    { val: "1", label: "1" },
    { val: "2", label: "2" },
    { val: "3", label: "3" },
    { val: "4", label: "4" },
    { val: "5", label: "5" },
    { val: "6", label: "6" },
    { val: "7", label: "7" },
    { val: "8", label: "8" },
    { val: "X", label: "X" },
    { val: "ไร้DP", label: "Ø" } // ใช้สัญลักษณ์ Ø แทนไร้ DP เพื่อความสวยงาม
];
let myCollections = JSON.parse(localStorage.getItem('dinomaster_collections')) || [];
// เรียกใช้ฟังก์ชันแสดงผลทันที เพื่อให้การ์ดที่ค้างอยู่แสดงออกมา
document.addEventListener('DOMContentLoaded', () => {
    updateDeckUI();
    // ถ้าอยากให้ปุ่มในคลังการ์ดแสดงสถานะ "ใส่ครบแล้ว" ตามเด็คที่ค้างอยู่ด้วย
    renderCards(cardsData); 
});

const container = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalInfo = document.getElementById('modalInfo');

// 3. ฟังก์ชัน Filter (Multi-select: type / clan / rarity / set เลือกได้หลายค่าพร้อมกัน)
const MULTI_SELECT_DEFAULT_LABELS = {
    typeFilter: 'ทุกประเภท',
    clanFilter: '(ไม่เลือกเผ่า)',
    rarityFilter: 'ทุกความหายาก',
    setFilter: 'ทุกชุด'
};

function getMultiSelectValues(id) {
    const container = document.getElementById(id);
    if (!container) return [];
    return Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
}

function updateMultiSelectLabel(id) {
    const container = document.getElementById(id);
    if (!container) return;
    const btn = container.querySelector('.multi-select-btn');
    const checked = Array.from(container.querySelectorAll('input[type="checkbox"]:checked'));
    const defaultLabel = MULTI_SELECT_DEFAULT_LABELS[id] || 'เลือก';

    if (checked.length === 0) {
        btn.textContent = defaultLabel;
    } else if (checked.length === 1) {
        // คัดลอกเนื้อหาใน label มาทั้งก้อน (ตัด checkbox ออก) เพื่อให้ไอคอนเผ่าติดมาด้วย
        const clone = checked[0].closest('label').cloneNode(true);
        clone.querySelectorAll('input').forEach(i => i.remove());
        btn.innerHTML = clone.innerHTML.trim();
    } else {
        // ถ้าทุกตัวที่เลือกมีไอคอน (เช่นตัวกรองเผ่า) ให้โชว์ไอคอนเรียงกัน + จำนวน
        const icons = checked.map(cb => cb.closest('label').querySelector('img'));
        if (icons.every(Boolean)) {
            btn.innerHTML = icons.map(img => img.outerHTML).join('') +
                            ` <span class="ms-count">(${checked.length})</span>`;
        } else {
            btn.textContent = `เลือกแล้ว ${checked.length} รายการ`;
        }
    }
    container.classList.toggle('has-selection', checked.length > 0);
}

function clearMultiSelect(id) {
    const container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.checked = false);
    updateMultiSelectLabel(id);
}

function toggleMultiSelect(id) {
    document.querySelectorAll('.multi-select.open').forEach(el => {
        if (el.id !== id) el.classList.remove('open');
    });
    const container = document.getElementById(id);
    if (container) container.classList.toggle('open');
}

document.addEventListener('click', (e) => {
    document.querySelectorAll('.multi-select.open').forEach(el => {
        if (!el.contains(e.target)) el.classList.remove('open');
    });
});

function initMultiSelect(id) {
    const container = document.getElementById(id);
    if (!container) return;
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            updateMultiSelectLabel(id);
            filterCards();
        });
    });
    updateMultiSelectLabel(id);
}

['typeFilter', 'clanFilter', 'rarityFilter', 'setFilter'].forEach(initMultiSelect);

// พับ/กางแถบตัวกรองบนมือถือ เพื่อไม่ให้กินพื้นที่จอเกินจำเป็น
function toggleFilterBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) searchBar.classList.toggle('filters-open');
}

function resetFilters() {
    document.getElementById('searchInput').value = "";
    clearDpFilter(true); // ล้างค่า DP ที่เลือกไว้ทั้งหมด (ยังไม่สั่งกรอง เดี๋ยวท้ายฟังก์ชันสั่งเอง)
    clearMultiSelect('typeFilter');
    clearMultiSelect('clanFilter');
    clearMultiSelect('setFilter');
    clearMultiSelect('rarityFilter');

    advancedFilterState = {
        atMin: null, atMax: null,
        dfMin: null, dfMax: null,
        taxonomy: '',
        legendary: 'all'
    };
    document.getElementById('advAtMin').value = '';
    document.getElementById('advAtMax').value = '';
    document.getElementById('advDfMin').value = '';
    document.getElementById('advDfMax').value = '';
    document.getElementById('advTaxonomy').value = '';
    setLegendaryFilter('all');
    updateAdvancedFilterIndicator();

    // reset ability search mode ด้วย
    if (typeof abilitySearchMode !== 'undefined' && abilitySearchMode) {
        toggleAbilitySearch();
    }

    currentFilteredCards = cardsData;
    renderCards(currentFilteredCards);
    syncDpButtons();
}

function cardMatchesTypeValue(card, typeValue) {
    if (typeValue === "Action") {
        return Array.isArray(card.type)
            ? (card.type.includes("Action") || card.type.includes("Action_Field"))
            : (card.type === "Action" || card.type === "Action_Field");
    } else if (typeValue === "Field") {
        return Array.isArray(card.type)
            ? (card.type.includes("Field") || card.type.includes("Action_Field"))
            : (card.type === "Field" || card.type === "Action_Field");
    } else {
        return Array.isArray(card.type)
            ? card.type.includes(typeValue)
            : (card.type === typeValue);
    }
}

function filterCards() {
    const searchText = searchInput.value.toLowerCase();
    // DP: เลือกได้หลายค่า — ว่าง = ไม่กรอง
    const typeValues = getMultiSelectValues('typeFilter');
    const setValues = getMultiSelectValues('setFilter');
    const clanValues = getMultiSelectValues('clanFilter');
    const rarityValues = getMultiSelectValues('rarityFilter');

    const filtered = cardsData.filter(card => {

        const matchName = abilitySearchMode
            ? stripAbilityHTML(card.ability).includes(searchText)
            : ((card.nameTH || "").toLowerCase().includes(searchText) ||
               (card.nameEN || "").toLowerCase().includes(searchText));

        const matchDP = selectedDpValues.length === 0 ||
            selectedDpValues.some(v => String(card.dp) === String(v));

        const matchType = typeValues.length === 0 || typeValues.some(v => cardMatchesTypeValue(card, v));

        const matchSet = setValues.length === 0 || setValues.includes(card.set);
        const matchClan = clanValues.length === 0 || (card.clan && clanValues.some(v => card.clan.includes(v)));
        const matchRarity = rarityValues.length === 0 || rarityValues.includes(card.rarity);

        const s = advancedFilterState;
        const matchAtMin = s.atMin === null || (card.at != null && card.at >= s.atMin);
        const matchAtMax = s.atMax === null || (card.at != null && card.at <= s.atMax);
        const matchDfMin = s.dfMin === null || (card.df != null && card.df >= s.dfMin);
        const matchDfMax = s.dfMax === null || (card.df != null && card.df <= s.dfMax);
        const matchTaxonomy = s.taxonomy === "" || card.taxonomy === s.taxonomy;

        let matchLegendary = true;
        if (s.legendary === 'yes') {
            matchLegendary = Array.isArray(card.type)
                ? card.type.some(t => t.includes("Legend"))
                : (card.type || "").includes("Legend");
        } else if (s.legendary === 'no') {
            matchLegendary = Array.isArray(card.type)
                ? !card.type.some(t => t.includes("Legend"))
                : !(card.type || "").includes("Legend");
        }

        return matchName && matchDP && matchType && matchSet && matchClan && matchRarity
            && matchAtMin && matchAtMax && matchDfMin && matchDfMax
            && matchTaxonomy && matchLegendary;
    });

    currentFilteredCards = filtered;
    renderCards(currentFilteredCards);
}

// --- Ability Highlight Helper ---
function highlightAbilityKeyword(abilityHTML, keyword) {
    if (!keyword || !abilityHTML) return abilityHTML;
    // ล้าง HTML tag ชั่วคราวเพื่อหาตำแหน่ง keyword แล้ว wrap ใน span
    const escaped = keyword.replace(/[.*+?^${}()|\[\]\\]/g, '\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    // inject highlight เฉพาะใน text node (ไม่ตัด HTML tag)
    return abilityHTML.replace(/>([^<]*)</g, (match, text) => {
        const highlighted = text.replace(regex,
            `<mark style="background:#f39c12; color:#1a1a1a; border-radius:3px; padding:0 2px; font-weight:bold;">$1</mark>`
        );
        return `>${highlighted}<`;
    });
}

// 4. ฟังก์ชันเปิด Modal (Pop-up) พร้อมสีตาม Type
function openModal(cardOrId) {
    // --- 1. เตรียมข้อมูลการ์ด ---
    let card;
    if (cardOrId && typeof cardOrId === 'object') {
        card = cardOrId;
    } else {
        card = cardsData.find(c => String(c.id) === String(cardOrId));
    }

    if (!card) {
        console.error("ไม่พบข้อมูลการ์ด:", cardOrId);
        return;
    }

    // +++ [เพิ่มตรงนี้] อัปเดต Index ปัจจุบันจากรายการที่กรองอยู่ +++
    // เราใช้ currentFilteredCards เพื่อให้การเลื่อนดูการ์ดสอดคล้องกับผลการค้นหา
    currentModalIndex = currentFilteredCards.findIndex(c => String(c.id) === String(card.id));
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // --- 2. คำนวณสถานะต่างๆ (ประกาศไว้ด้านบนสุดเพื่อให้ทุกส่วนเรียกใช้ได้) ---
    const countInDeck = myDeck.filter(c => String(c.id) === String(card.id)).length;
    const isMaster = card.type && (card.type.includes("Master") || card.type.includes("Boost_Master"));
    const hasMasterInDeck = myDeck.some(c => c.type && (c.type.includes("Master") || c.type.includes("Boost_Master")));
    
    // กฎ Armor: ข้ามการเช็คเผ่า
    const isArmor = card.nameTH && card.nameTH.includes("Armor");
    let isCompatible = true;
    if (!isArmor && typeof isCardCompatibleWithCommander === 'function') {
        isCompatible = isCardCompatibleWithCommander(card);
    }

    const isLegend = Array.isArray(card.type) ? card.type.includes("Legend") : card.type === "Legend";
    const activeLegend = myDeck.find(c => Array.isArray(c.type) ? c.type.includes("Legend") : c.type === "Legend");
    const isLegendBlocked = isLegend && activeLegend && String(activeLegend.id) !== String(card.id);

    const isLC = card.type === "LC";
    const activeLC = myDeck.find(c => c.type === "LC");
    const isLCBlocked = isLC && activeLC && String(activeLC.id) !== String(card.id);

    const isFull = (isLegend || isLC) ? countInDeck >= 1 : countInDeck >= 3;
    const isMasterDisabled = isMaster && hasMasterInDeck && !myDeck.some(c => String(c.id) === String(card.id));
    // LC กับ Commander ใช้ร่วมกันไม่ได้
    const lcConflict = (typeof findCommanderLcConflict === 'function') ? findCommanderLcConflict(card) : null;

    const isDisabled = !isCompatible || isFull || isMasterDisabled || isLegendBlocked || isLCBlocked || !!lcConflict;

    // เตรียม Class สำหรับ Ability Box (แก้ปัญหา ReferenceError: abilityBoxClass)
    let abilityBoxClass = "ability-box";
    if (card.type) {
        // เช็คว่าเป็น Array หรือไม่ ถ้าใช่ให้ใช้เลย ถ้าไม่ใช่ค่อย split
        const typesArray = Array.isArray(card.type) ? card.type : card.type.split(' ');
        const types = typesArray.filter(t => t.trim() !== '');
        const typeClasses = types.map(t => `type-${t}`).join(' '); 
        abilityBoxClass += ` ${typeClasses}`;
    }

    // --- 3. จัดการรูปภาพและ Rarity ---
    modalImg.src = card.image;
    modalImg.style.opacity = '1';
    modalImg.classList.remove('img-silver-rare', 'img-golden-rare', 'img-Promo');
    
    let rarityTextHTML = ''; 
    if (card.rarity === 'Silver_Rare') {
        modalImg.classList.add('img-silver-rare');
        rarityTextHTML = `<span class="text-silver-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Silver Rare</span>`;
    } else if (card.rarity === 'Golden_Rare') {
        modalImg.classList.add('img-golden-rare');
        rarityTextHTML = `<span class="text-golden-rare" style="font-size: 0.9em;">✦ ระดับความหายาก: Golden Rare</span>`;
    } else if (card.rarity === 'Promo') {
        modalImg.classList.add('img-Promo');
        rarityTextHTML = `<span class="text-promo" style="font-size: 0.9em;">✦ การ์ดโปรโมฟอยล์</span>`;
    } 
    
    else {
        rarityTextHTML = `<span style="color: #ccc; font-size: 0.8em;">✦ ระดับความหายาก: การ์ดทั่วไป</span>`;
    }

    // --- 4. แสดงผลข้อมูลใน Modal ---
    if (modalInfo) {
        const typeMapping = {
            "Creature": "ครีเจอร์", "Action": "แอ็คชั่น", "Armor": "อาร์เมอร์",
            "Fusion_Monster": "ฟิวชั่นมอนสเตอร์", "Armored_Dino" : "ครีเจอร์ติดเกราะ",
            "Field": "ฟิลด์", "Master": "มาสเตอร์", "Boost_Master": "บูสมาสเตอร์", "Boost_Creature": "บูสครีเจอร์",
            "Action_Field":"แอคชั่น [รูปแบบ:พื้นที่]","Illusion":"อิลูชั่น","LC":"ไลฟ์คริสตัล","Legend":"เลเจนด์"
        };
        const typesArrayForDisplay = Array.isArray(card.type) ? card.type : card.type.split(' ');
        const displayTypes = card.type ? typesArrayForDisplay.map(t => typeMapping[t] || t).join(' / ') : '-';        
        // --- [ส่วนที่เพิ่ม] คำนวณ Banlist และ Limit ---
        let dynamicMaxLimit = 3;
        let isBanned = false;
        let conditionalBanMessage = '';
        
        if (typeof banlistData !== 'undefined' && typeof currentBanlistFormat !== 'undefined') {
            const format = banlistData[currentBanlistFormat] || banlistData["None"];
            const strId = String(card.id);

            // เช็คเงื่อนไขยกเว้นแบนก่อน (การ์ดที่ปกติโดนแบน แต่มีการ์ดหลัก trigger อยู่ในเด็ค)
            let overrideBanApplied = false;
            if (format.conditional_limits && typeof myDeck !== 'undefined') {
                for (const rule of format.conditional_limits) {
                    if (rule.overridesBan && rule.target.includes(strId) && myDeck.some(c => rule.trigger.includes(String(c.id)))) {
                        dynamicMaxLimit = rule.limit;
                        overrideBanApplied = true;
                        break;
                    }
                }
            }

            if (overrideBanApplied) {
                // ข้ามการเช็คแบนปกติ เพราะมีข้อยกเว้นแล้ว
            } else if (format.banned.includes(strId)) {
                isBanned = true;
                dynamicMaxLimit = 0;
            } else if (format.limited.includes(strId)) {
                dynamicMaxLimit = 1;
            } else if (format.limit_if_no_commander && format.limit_if_no_commander.includes(strId)) {
                 // เช็คเงื่อนไข Limit 1 หากไม่มี Commander
                 const hasCommander = typeof myDeck !== 'undefined' && myDeck.some(c => c.isCommander);
                 if (!hasCommander) dynamicMaxLimit = 1;
            }

            // เช็คเงื่อนไข: มีการ์ดหลัก (trigger) อยู่ในเด็คแล้วหรือไม่ ถ้ามีให้ Limit ตามกฎ
            if (format.conditional_limits && typeof myDeck !== 'undefined') {
                for (const rule of format.conditional_limits) {
                    if (rule.overridesBan) continue;
                    if (rule.target.includes(strId) && myDeck.some(c => rule.trigger.includes(String(c.id)))) {
                        dynamicMaxLimit = rule.limit;
                        // limit: 0 = ห้ามใส่เลย (ให้ปุ่มขึ้นสถานะแบน พร้อมเหตุผลของกฎ)
                        if (rule.limit === 0) {
                            isBanned = true;
                            conditionalBanMessage = rule.message || '';
                        }
                        break;
                    }
                }
            }
        }
        // กฎ Master เดิม (ใส่ได้ 1)
        if (card.type === "Master" || card.type === "Boost_Master") dynamicMaxLimit = 1;
        // กฎ Legend (ใส่ได้ 1)
        if (isLegend) dynamicMaxLimit = 1;
        // กฎ LC (ใส่ได้ 1)
        if (isLC) dynamicMaxLimit = 1;
        // ------------------------------------------

        let btnText = '+ เพิ่มลงเด็ค';
        
        // ปรับ warningText ให้โชว์เลข Limit ที่ถูกต้อง (เช่น / 1 หรือ / 3)
        let warningText = isMaster ? '(Master ใส่ได้เพียงใบเดียว)' : `(ในเด็คมีแล้ว ${countInDeck} / ${dynamicMaxLimit} ใบ)`;
        
        let btnColor = '#28a745'; 

        // เรียงลำดับเงื่อนไข (เพิ่ม isBanned และใช้ dynamicMaxLimit แทนเลข 3)
        if (isBanned) {
            btnText = conditionalBanMessage ? '🚫 ห้ามใส่ (ติดเงื่อนไข)' : 'โดนแบน (BANNED)';
            warningText = conditionalBanMessage
                ? `(${conditionalBanMessage})`
                : `(ห้ามใส่ในฟอร์แมต ${banlistData[currentBanlistFormat]?.name || 'ปัจจุบัน'})`;
            btnColor = '#b0b0b0';
        } else if (lcConflict) {
            btnText = '🔒 ' + lcConflict.short;
            warningText = '(คอมมานเดอร์กับไลฟ์คริสตัลใช้ร่วมกันไม่ได้)';
            btnColor = '#b0b0b0';
        } else if (!isCompatible) {
            const clanRule = (typeof findClanRestrictionViolation === 'function')
                ? findClanRestrictionViolation(card) : null;
            btnText = clanRule && clanRule.source === 'lc'
                ? '⚠️ เผ่าไม่ตรงกับไลฟ์คริสตัล'
                : '⚠️ เผ่าไม่ตรงกับคอมมานเดอร์';
            warningText = clanRule
                ? `(เด็คนี้ใส่ได้เฉพาะเผ่า ${clanRule.clans.join(' / ')})`
                : '(ไม่สามารถใส่การ์ดข้ามเผ่าได้)';
            btnColor = '#b0b0b0'; 
        } else if (isMasterDisabled) {
            btnText = 'มี Master ในเด็คแล้ว';
            btnColor = '#b0b0b0';
        } else if (isLegendBlocked) {
            btnText = `มี Legend อื่นแล้ว (${activeLegend.nameTH})`;
            warningText = '(ใส่ Legend ได้เพียง 1 ใบต่อเด็ค)';
            btnColor = '#b0b0b0';
        } else if (isLCBlocked) {
            btnText = `มี LC อื่นแล้ว (${activeLC.nameTH})`;
            warningText = '(ใส่ Life Crystal ได้เพียง 1 ใบต่อเด็ค)';
            btnColor = '#b0b0b0';
        } else if (countInDeck >= dynamicMaxLimit) { 
            // เช็คว่าเต็ม Limit หรือยัง (รองรับทั้ง Limit 1 และ 3)
            btnText = `ใส่ครบ ${dynamicMaxLimit} ใบแล้ว`;
            btnColor = '#b0b0b0';
        }
        
        // สร้าง HTML ส่วน Secret Art (ถ้ามี)
const secretArtHTML = card.secretArt && card.secretArt_img ? `
    <div style="margin-top: 16px; border-top: 1px solid #444; padding-top: 12px;">
        <p style="color: #f1c40f; font-weight: bold; margin-bottom: 8px;">
            ✨ มีอาร์ตเวิร์คพิเศษ (Secret Art)
        </p>
        <img 
            src="${card.secretArt_img}" 
            alt="Secret Art ของ ${card.nameTH}"
            onclick="openFullSecretArt('${card.secretArt_img}', '${card.nameTH}')"
            style="
                width: 100%; 
                max-width: 200px;
                border-radius: 8px; 
                cursor: zoom-in;
                border: 2px solid #f1c40f;
                display: block;
                margin: 0 auto;
                transition: transform 0.2s;
            "
            onmouseover="this.style.transform='scale(1.03)'"
            onmouseout="this.style.transform='scale(1)'"
        >
        <p style="text-align:center; font-size: 11px; color: #aaa; margin-top: 6px;">
            กดที่รูปเพื่อดูแบบเต็ม
        </p>
    </div>
` : '';
        // เพิ่มตัวแปรเช็คเงื่อนไข Boost Master
        const hasBoostMaster = myDeck.some(c => c.type === "Boost_Master");
        const isSpecialButNoBoost = card.specialCommander && !hasBoostMaster;

        if (isSpecialButNoBoost) {
            warningText = `<span style="color:#e67e22;">(ต้องมี Boost Master ในเด็คก่อนจึงจะตั้งเป็น Commander ได้)</span>`;
        }
        
        // 7. พ่น HTML (เพิ่ม rarityTextHTML เข้าไปข้างชื่อการ์ดหรือใต้ชื่อ)
        modalInfo.innerHTML = `
            <h2>${card.nameEN}</h2>
            <p style="color:#666; margin-bottom:5px;">${card.nameTH} | ID: ${card.id}</p>
            <hr>            
            <p><strong>ประเภท :</strong> ${displayTypes} | <strong>DP :</strong> ${typeof renderDpCrystal === 'function' ? renderDpCrystal(card.dp, 'lg') : card.dp}</p>
            <p><strong>เผ่า :</strong> ${typeof renderClanIcons === 'function' ? renderClanIcons(card.clan, 'lg') : (card.clan || '-')}</p>
            <p><strong>ชุด :</strong> ${card.set || '-'}</p> <div style="margin: 10px 0;"> ${rarityTextHTML} 
            </div>

            <div class="${abilityBoxClass}"> 
                <strong>ความสามารถ : </strong><br>
                ${(() => {
                    // ใส่ไอคอนเผ่า + คริสตัล DP ลงในเนื้อความสกิลก่อน แล้วค่อยไฮไลท์คำค้น
                    let ab = card.ability || "ไม่มีความสามารถพิเศษ";
                    if (typeof decorateAbilityHTML === 'function') ab = decorateAbilityHTML(ab);
                    if (abilitySearchMode && searchInput.value.trim()) ab = highlightAbilityKeyword(ab, searchInput.value.trim());
                    return ab;
                })()}
            </div>

            <div id="modalActionArea" style="margin-top: 20px;">
                <button id="modalAddBtn" class="add-to-deck-btn" 
                    ${isDisabled ? 'disabled' : ''} 
                    style="background-color: ${btnColor}; color: white; width:100%; cursor: ${isDisabled ? 'not-allowed' : 'pointer'}; border:none; padding:12px; border-radius:8px; font-weight:bold;">
                    ${btnText}
                </button>
                <p style="text-align: center; font-size: 12px; color: ${!isCompatible ? '#ff4757' : '#666'}; margin-top: 8px; font-weight: ${!isCompatible ? 'bold' : 'normal'};">
                    ${warningText}
                </p>
                <div id="commanderBtnArea"></div> 
                ${secretArtHTML}
            </div>
        `;

        // 8. ผูก Event Click ให้ปุ่มเพิ่มลงเด็ค
        const modalAddBtn = document.getElementById('modalAddBtn'); // แก้ไขการประกาศตัวแปรให้ถูกต้อง
        if (modalAddBtn && !isDisabled) {
            modalAddBtn.onclick = (e) => {
                handleAddToDeck(e, card, card.image);
                openModal(card); 
            };
        }
        
        // 9. อัปเดตส่วนปุ่มตั้งค่าคอมมานเดอร์
        const sidePanel = document.querySelector('.side-panel');
        const isDeckOpen = sidePanel && sidePanel.classList.contains('open');

        if (typeof updateModalForCommander === 'function' && isCompatible && isDeckOpen) {
            updateModalForCommander(card); 
        } else {
            // ถ้าไม่ได้เปิดหน้าต่างจัดเด็ค ให้ล้างพื้นที่ปุ่มคอมมานเดอร์ทิ้ง (กันปุ่มค้าง)
            const commanderBtnArea = document.getElementById('commanderBtnArea');
            if (commanderBtnArea) commanderBtnArea.innerHTML = '';
        }
    }

    // 10. แสดงผล Modal
    modal.style.display = "flex";
    
    window.openModal = openModal;
}
// ตัวแปรเก็บ Index ของการ์ดที่เปิดอยู่ใน Modal ปัจจุบัน
let currentModalIndex = -1;

function openFullSecretArt(imgSrc, cardName) {
    // สร้าง Overlay ชั่วคราว ซ้อนบน Modal ที่มีอยู่แล้ว
    const overlay = document.createElement('div');
    overlay.id = 'secretArtOverlay';
    overlay.style = `
        position: fixed; inset: 0; z-index: 999999;
        background: rgba(0,0,0,0.92);
        display: flex; align-items: center; justify-content: center;
        cursor: zoom-out;
        backdrop-filter: blur(6px);
    `;
    overlay.innerHTML = `
        <img src="${imgSrc}" alt="Secret Art: ${cardName}"
            style="max-width: 90vw; max-height: 90vh; border-radius: 10px; border: 2px solid #f1c40f;">
    `;
    overlay.onclick = () => overlay.remove(); // กดที่ไหนก็ปิดได้
    document.body.appendChild(overlay);
}

// ฟังก์ชันเปลี่ยนการ์ด (Previous / Next) พร้อม Fade Effect
function navigateModal(direction) {
    // ตรวจสอบความปลอดภัยพื้นฐาน
    if (currentModalIndex === -1 || !currentFilteredCards || currentFilteredCards.length === 0) return;

    let newIndex = currentModalIndex + direction;

    // Logic วนลูป
    if (newIndex < 0) {
        newIndex = currentFilteredCards.length - 1;
    } else if (newIndex >= currentFilteredCards.length) {
        newIndex = 0;
    }

    
    // --- เริ่ม Step 1: Fade Out รูปเก่า ---
    // ตั้งค่า Opacity เป็น 0 (CSS transition จะทำงานทำให้ค่อยๆ จาง)
    modalImg.style.opacity = '0';

    // --- เริ่ม Step 2: รอจังหวะ แล้วเปลี่ยนข้อมูล ---
    // ใช้ setTimeout รอให้ Fade out เสร็จสิ้น (เวลาต้องตรงกับใน CSS คือ 250ms)
    setTimeout(() => {
        // เปลี่ยนข้อมูลการ์ดเป็นใบใหม่ (ฟังก์ชันนี้จะเปลี่ยน src รูปด้วย)
        openModal(currentFilteredCards[newIndex]);
        
        // --- เริ่ม Step 3: Fade In รูปใหม่ ---
        // หลังจากเปลี่ยน src แล้ว สั่งให้ Opacity กลับมาเป็น 1
        // (CSS transition จะทำงานทำให้ค่อยๆ ชัดขึ้น)
        modalImg.style.opacity = '1';
        
    }, 250); // <-- เวลาตรงนี้ต้องสอดคล้องกับ transition ใน CSS (0.25s = 250ms)
}

// 2. เพิ่ม Event Listener สำหรับการกดปุ่มลูกศรบนคีย์บอร์ด (เฉพาะตอนเปิด Modal)
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            navigateModal(-1);
        } else if (e.key === "ArrowRight") {
            navigateModal(1);
        }
    }
});










function closeModal() {
    modal.style.display = "none";
}

function closeModalOutside(event) {
    if (event.target.id === "imageModal") closeModal();
}

function updateModalForCommander(card) {
    const infoDiv = document.getElementById('modalInfo');
    if (!infoDiv) return;

    // 1. เช็คว่าการ์ดเป็น Creature หรือไม่
    if (card.type !== "Creature") return;

    // 2. ตรวจสอบสถานะการเป็น Commander
    const isEligible = canSetAsCommander(card);
    const hasBoostMaster = myDeck.some(c => c.type === "Boost_Master");
    
    // เงื่อนไข: เป็นกรณีพิเศษ (specialCommander) แต่ยังไม่มี Boost Master ในเด็ค
    const isLockedSpecial = card.specialCommander && !hasBoostMaster;

    // เงื่อนไข: เด็คมีไลฟ์คริสตัลอยู่ -> ตั้งคอมมานเดอร์ไม่ได้ (ใช้ร่วมกันไม่ได้)
    const lcBlock = (typeof findLcBlockingCommander === 'function') ? findLcBlockingCommander() : null;
    if (lcBlock) {
        const lockBtn = document.createElement('button');
        lockBtn.id = "setCommanderBtn";
        lockBtn.innerHTML = "🔒 " + lcBlock.short;
        lockBtn.title = lcBlock.message;
        lockBtn.disabled = true;
        lockBtn.style = `
            margin-top: 10px; width: 100%; padding: 10px;
            background-color: #bdc3c7; color: #7f8c8d;
            border: none; border-radius: 5px; font-weight: bold;
            cursor: not-allowed; font-family: 'Kanit', sans-serif;
        `;
        infoDiv.appendChild(lockBtn);
        return;
    }

    // ถ้าผ่านเงื่อนไข (isEligible) ให้สร้างปุ่มกดได้ปกติ
    // หรือถ้าเป็นใบพิเศษแต่ล็อคอยู่ (isLockedSpecial) ให้สร้างปุ่มแบบกดไม่ได้ (Disabled) เพื่อแจ้งเตือนผู้ใช้
    if (isEligible || isLockedSpecial) {
        
        const cmdBtn = document.createElement('button');
        cmdBtn.id = "setCommanderBtn";
        
        // กำหนดข้อความและสีปุ่มตามสถานะ
        if (isLockedSpecial) {
            cmdBtn.innerHTML = "🔒 ต้องการ Boost Master (กรณีพิเศษ)";
            cmdBtn.style = `
                margin-top: 10px;
                width: 100%;
                padding: 10px;
                background-color: #bdc3c7; /* สีเทา */
                color: #7f8c8d;
                border: none;
                border-radius: 5px;
                font-weight: bold;
                cursor: not-allowed;
                font-family: 'Kanit', sans-serif;
            `;
            cmdBtn.disabled = true;
        } else {
            cmdBtn.innerHTML = "⭐ ตั้งเป็นคอมมานเดอร์ไดโน";
            cmdBtn.style = `
                margin-top: 10px;
                width: 100%;
                padding: 10px;
                background-color: #f1c40f; /* สีทอง */
                color: #2c3e50;
                border: none;
                border-radius: 5px;
                font-weight: bold;
                cursor: pointer;
                font-family: 'Kanit', sans-serif;
            `;
            
            cmdBtn.onclick = () => {
                if (confirm(`คุณต้องการใช้ ${card.nameTH} เป็นคอมมานเดอร์ใช่หรือไม่?\n(จะทำให้ใส่ Creature ได้เฉพาะเผ่า ${card.clan} เท่านั้น)`)) {
                    setCommander(card);
                    closeModal();
                }
            };
        }
        
        infoDiv.appendChild(cmdBtn);
    }
}

function setCommander(card) {
    // 1. ตรวจสอบประเภทว่าเป็น Creature หรือไม่
    if (card.type !== "Creature") {
        alert("เฉพาะ Creature เท่านั้นที่สามารถเป็นคอมมานเดอร์ได้");
        return;
    }

    // 2. กฎการผสมเผ่า: ตรวจสอบการ์ดที่มีอยู่ใน Main Deck ทั้งหมด
    // (กรองเอาเฉพาะ Creature เพราะ Action/Support ปกติจะไม่มี Clan หรือใส่ได้อิสระ)
    const mainDeckCreatures = myDeck.filter(c => c.type === "Creature" && !c.isCommander);
    
    if (mainDeckCreatures.length > 0) {
        const targetClans = Array.isArray(card.clan) ? card.clan : [card.clan];
        
        // ตรวจหาการ์ดในเด็คที่มีเผ่าไม่ตรงกับคอมมานเดอร์ตัวใหม่
        const invalidCards = mainDeckCreatures.filter(c => {
            const currentCardClans = Array.isArray(c.clan) ? c.clan : [c.clan];
            // เช็คว่ามีเผ่าไหนตรงกันบ้างไหม (ถ้าไม่มีเลยคือผิดกฎ)
            return !currentCardClans.some(clan => targetClans.includes(clan));
        });

        if (invalidCards.length > 0) {
            alert(`ไม่สามารถแต่งตั้งได้! เนื่องจากมี Creature เผ่าอื่นในเด็ค (${invalidCards[0].nameTH} และอื่นๆ) ซึ่งไม่ตรงกับเผ่า ${targetClans.join(', ')}`);
            return;
        }
    }

    // 2.5 กฎ "คอมมานเดอร์ กับ ไลฟ์คริสตัล ใช้ร่วมกันไม่ได้"
    if (typeof findLcBlockingCommander === 'function') {
        const lcBlock = findLcBlockingCommander();
        if (lcBlock) {
            alert(`❌ ไม่สามารถแต่งตั้งได้!\n${lcBlock.message}`);
            return;
        }
    }

    // 3. กฎ DP: ตรวจสอบเงื่อนไข DP 4 หรือ Boost Master
    if (!canSetAsCommander(card)) {
        alert("การ์ดใบนี้ไม่ตรงตามเงื่อนไขการเป็นคอมมานเดอร์ (ต้อง DP 4+ หรือมี Boost Master)");
        return;
    }

    // --- ถ้าผ่านทุกกฎ ให้ทำการเปลี่ยนคอมมานเดอร์ ---
    
    // ล้างสถานะคอมมานเดอร์เก่า
    myDeck.forEach(c => c.isCommander = false);

    // หาการ์ดใบนี้ในเด็ค (ถ้ามีอยู่แล้ว) เพื่อเปลี่ยนสถานะ หรือเพิ่มเข้าไปใหม่
    const existingIndex = myDeck.findIndex(c => c.id === card.id && !c.isCommander);
    if (existingIndex !== -1) {
        myDeck[existingIndex].isCommander = true;
    } else {
        myDeck.push({ ...card, isCommander: true });
    }

    saveDeckToLocalStorage();
    updateDeckUI();
    renderCards(currentFilteredCards); // อัปเดตปุ่มหน้าคลัง
    alert(`แต่งตั้ง ${card.nameTH} เป็นคอมมานเดอร์เรียบร้อยแล้ว`);
}

function renderCommanderButton(container, card, color, text, disabled = false) {
    const cmdBtn = document.createElement('button');
    cmdBtn.innerHTML = text;
    cmdBtn.disabled = disabled;
    cmdBtn.style = `
        margin-top: 10px; width: 100%; padding: 10px;
        background-color: ${color}; color: ${disabled ? '#7f8c8d' : '#2c3e50'};
        border: none; border-radius: 5px; font-weight: bold;
        cursor: ${disabled ? 'not-allowed' : 'pointer'}; font-family: 'Kanit', sans-serif;
    `;
    if(!disabled) {
        cmdBtn.onclick = () => {
            if (confirm(`คุณต้องการใช้ ${card.nameTH} เป็นคอมมานเดอร์ใช่หรือไม่?`)) {
                setCommander(card);
                closeModal();
            }
        };
    }
    container.appendChild(cmdBtn);
}

// ฟังก์ชันสร้างปุ่ม DP Crystal (รองรับเลือกหลายค่าพร้อมกัน)
function initDpFilterUI() {
    const container = document.getElementById('dp-crystal-bar');
    if (!container) return;

    container.innerHTML = '';

    // 1. ปุ่มเคลียร์ (Reset) — ล้างค่าที่เลือกทั้งหมด
    const resetBtn = document.createElement('div');
    resetBtn.className = 'dp-crystal-btn special dp-reset-btn';
    resetBtn.innerHTML = '<i class="fa-solid fa-rotate-left" style="font-size:14px"></i>';
    resetBtn.title = "แสดงทั้งหมด (ล้างค่า DP ที่เลือก)";
    resetBtn.onclick = () => clearDpFilter();
    container.appendChild(resetBtn);

    // 2. ปุ่มค่า DP — กดเพิ่ม/กดซ้ำเพื่อเอาออก (Toggle) เลือกพร้อมกันได้หลายค่า
    DP_FILTER_VALUES.forEach(item => {
        const btn = document.createElement('div');
        btn.className = 'dp-crystal-btn';
        if (item.val === "ไร้DP") btn.classList.add('special');

        btn.dataset.dp = item.val;      // ใช้ data-dp แทนการอ่าน innerText (แม่นกว่า)
        btn.innerText = item.label;
        btn.title = `DP ${item.label} (กดซ้ำเพื่อเอาออก)`;
        btn.onclick = () => toggleDpValue(item.val);

        container.appendChild(btn);
    });

    syncDpButtons();
}

// สลับสถานะเลือก/ไม่เลือก ของค่า DP หนึ่งค่า
function toggleDpValue(value) {
    const i = selectedDpValues.indexOf(value);
    if (i === -1) selectedDpValues.push(value);
    else selectedDpValues.splice(i, 1);

    // เรียงตามลำดับปุ่ม เพื่อให้ข้อความสรุปอ่านง่าย (0,1,2,...,X,ไร้DP)
    const order = v => DP_FILTER_VALUES.findIndex(x => x.val === v);
    selectedDpValues.sort((a, b) => order(a) - order(b));

    applyDpSelection(selectedDpValues);
}

// ล้างค่า DP ที่เลือกทั้งหมด (silent = true คือไม่สั่งกรองใหม่ ให้ผู้เรียกจัดการเอง)
function clearDpFilter(silent = false) {
    applyDpSelection([], silent);
}

// ตั้งค่าที่เลือก + sync UI + สั่งกรองใหม่
function applyDpSelection(values, silent = false) {
    selectedDpValues = Array.isArray(values) ? [...values] : [];

    // sync <select id="dpFilter"> ที่ซ่อนอยู่ ไว้เผื่อโค้ดส่วนอื่นที่ยังอ่าน .value
    // (เลือกค่าเดียว = ใส่ค่านั้น / เลือกหลายค่าหรือไม่เลือก = ว่าง)
    const dpSelect = document.getElementById('dpFilter');
    if (dpSelect) dpSelect.value = (selectedDpValues.length === 1) ? selectedDpValues[0] : "";

    syncDpButtons();
    if (!silent && typeof filterCards === 'function') filterCards();
}

// อัปเดตหน้าตาปุ่ม (ไฮไลท์ทุกค่าที่เลือกไว้) + ข้อความสรุป
function syncDpButtons() {
    const container = document.getElementById('dp-crystal-bar');
    if (!container) return;

    container.querySelectorAll('.dp-crystal-btn').forEach(btn => {
        const v = btn.dataset.dp;
        if (v === undefined) return; // ข้ามปุ่ม Reset
        btn.classList.toggle('active', selectedDpValues.includes(v));
    });

    // ปุ่ม Reset จะสว่างเมื่อไม่ได้เลือกอะไรเลย (= แสดงทั้งหมด)
    const resetBtn = container.querySelector('.dp-reset-btn');
    if (resetBtn) resetBtn.classList.toggle('active', selectedDpValues.length === 0);

    // ข้อความสรุปข้างหัวข้อ เช่น "ค้นหาตาม DP : 2, 3, 6"
    const summary = document.getElementById('dpFilterSummary');
    if (summary) {
        const labels = selectedDpValues.map(v => {
            const item = DP_FILTER_VALUES.find(x => x.val === v);
            return item ? (v === "ไร้DP" ? "ไร้ DP" : item.label) : v;
        });
        summary.innerText = labels.length ? ` : ${labels.join(', ')}` : '';
    }
}

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    // --- เพิ่มส่วนนี้เข้าไป ---
    if (typeof renderBanlistOptions === 'function') {
        renderBanlistOptions(); // สั่งให้สร้างตัวเลือก Banlist ทันที
    }
    // ----------------------
    initDpFilterUI()
    if (typeof initClanFilterIcons === 'function') initClanFilterIcons(); // เติมไอคอนเผ่าในตัวกรอง
    updateDeckUI();
    
    // ถ้าอยากให้ปุ่มในคลังการ์ดแสดงสถานะ "ใส่ครบแล้ว" ตามเด็คที่ค้างอยู่ด้วย
    renderCards(cardsData); 
});

// ฟังก์ชันสำหรับปุ่ม "การ์ดที่โดนจำกัด"
function limitedSearch() {
    // 1. ตรวจสอบว่ามีข้อมูล Banlist และ Format หรือไม่
    if (typeof banlistData === 'undefined' || typeof currentBanlistFormat === 'undefined') {
        console.error("Banlist data not found");
        return;
    }

    // 2. ดึงข้อมูลฟอร์แมตปัจจุบัน
    const format = banlistData[currentBanlistFormat] || banlistData["None"];

    // 3. รวบรวม ID การ์ดที่ต้องการแสดง (เฉพาะ Banned และ Limited)
    // ใช้ Set เพื่อป้องกัน ID ซ้ำ และค้นหาได้เร็ว
    const targetIds = new Set([
        ...(format.banned || []), 
        ...(format.limited || [])
    ]);

    // ถ้าไม่มีการ์ดโดนแบน/ลิมิตเลย ให้แจ้งเตือนและจบการทำงาน
    if (targetIds.size === 0) {
        alert(`ในฟอร์แมต "${format.name}" ไม่มีการ์ดที่ถูก Banned หรือ Limited ครับ`);
        return;
    }

    // 4. กรองการ์ดจาก Database กลาง (cardsData)
    const filtered = cardsData.filter(card => targetIds.has(String(card.id)));

    // 5. อัปเดตตัวแปร Global และวาดหน้าจอใหม่
    currentFilteredCards = filtered; // อัปเดตเพื่อให้ระบบจำว่าตอนนี้แสดงผล list นี้อยู่
    renderCards(currentFilteredCards);

    // (Optional) ล้างค่าในช่องค้นหาและ Filter อื่นๆ เพื่อไม่ให้งง
    if(document.getElementById('searchInput')) document.getElementById('searchInput').value = "";
    clearMultiSelect('typeFilter');
    clearMultiSelect('clanFilter');
    clearMultiSelect('setFilter');
    clearMultiSelect('rarityFilter');
    if (typeof clearDpFilter === 'function') clearDpFilter(true);

    // แจ้งเตือนเล็กน้อยว่ากำลังแสดงผลอะไร
    if (typeof showQuickFeedback === 'function') {
        // หาตำแหน่งกึ่งกลางจอเพื่อแสดง Feedback
        showQuickFeedback(
            { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }, 
            `แสดง Ban/Limit ของ ${format.name}`, 
            "#e74c3c"
        );
    }
}

// ==========================================
// ✨ ระบบ SHARE & IMPORT DECK LINK
// ==========================================

// 1. ฟังก์ชันสำหรับสร้าง Link และคัดลอกลง Clipboard
function copyDeckLink() {
    if (myDeck.length === 0) {
        alert("กรุณาเลือกการ์ดลงเด็คก่อนแชร์ครับ");
        return;
    }

    // รวบรวมข้อมูล: {id: count, isCommander: true/false}
    // รูปแบบข้อมูลสั้นๆ: "ID:Count:isCmd"
    const deckData = myDeck.reduce((acc, card) => {
        const found = acc.find(item => item.id === card.id);
        if (found) {
            found.count++;
            if (card.isCommander) found.isCmd = 1;
        } else {
            acc.push({ id: card.id, count: 1, isCmd: card.isCommander ? 1 : 0 });
        }
        return acc;
    }, []);

    const shareString = deckData.map(item => `${item.id}|${item.count}|${item.isCmd}`).join(',');
    
    // เข้ารหัส Base64 เพื่อให้ URL ไม่เสียรูป
    const encodedDeck = btoa(encodeURIComponent(shareString));
    const finalUrl = `${window.location.origin}${window.location.pathname}?deck=${encodedDeck}`;

    // คัดลอกลง Clipboard
    navigator.clipboard.writeText(finalUrl).then(() => {
        if (typeof showQuickFeedback === 'function') {
            showQuickFeedback({clientX: window.innerWidth/2, clientY: 50}, "คัดลอกลิงก์เด็คแล้ว!", "#2ecc71");
        } else {
            alert("คัดลอกลิงก์เด็คเรียบร้อยแล้ว!");
        }
    });
}

// 2. ฟังก์ชันสำหรับแกะรหัสเด็คจาก String
function processImport(encodedData) {
    try {
        const decodedString = decodeURIComponent(atob(encodedData));
        const cardRows = decodedString.split(',');
        
        let newDeck = [];
        cardRows.forEach(row => {
            const [id, count, isCmd] = row.split('|');
            const cardTemplate = cardsData.find(c => String(c.id) === String(id));
            
            if (cardTemplate) {
                for (let i = 0; i < parseInt(count); i++) {
                    // สร้าง Object ใหม่จากการ์ดต้นแบบ
                    let cardToAdd = { ...cardTemplate };
                    if (i === 0 && isCmd === "1") {
                        cardToAdd.isCommander = true;
                    }
                    newDeck.push(cardToAdd);
                }
            }
        });

        if (newDeck.length > 0) {
            myDeck = newDeck;
            saveDeckToLocalStorage();
            updateDeckUI();
            if (typeof renderCards === 'function') renderCards(currentFilteredCards);
            return true;
        }
    } catch (e) {
        console.error("Import Error:", e);
        return false;
    }
}

// 3. ฟังก์ชันปุ่มกด Manual Import
function importDeckPrompt() {
    const link = prompt("วางลิงก์เด็ค หรือรหัสเด็คที่ได้รับมาที่นี่:");
    if (!link) return;

    let code = link;
    if (link.includes("?deck=")) {
        code = link.split("?deck=")[1];
    }

    if (processImport(code)) {
        alert("นำเข้าเด็คสำเร็จ!");
    } else {
        alert("รหัสเด็คไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
}

// 4. ตรวจสอบ URL เมื่อโหลดหน้าเว็บ (Auto-Import)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const deckParam = urlParams.get('deck');

    if (deckParam) {
        if (confirm("พบข้อมูลเด็คจากลิงก์ คุณต้องการโหลดเด็คนี้แทนที่เด็คปัจจุบันหรือไม่?")) {
            processImport(deckParam);
            // ล้าง URL parameter เพื่อไม่ให้เด้งถามซ้ำตอน Refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

// 5. Event Listeners
searchInput.addEventListener('input', filterCards);
// DP filter ใช้ปุ่ม dp-crystal-bar (เลือกได้หลายค่า) — ดู initDpFilterUI / toggleDpValue
// typeFilter / clanFilter / rarityFilter / setFilter เป็น multi-select แล้ว
// (change listener ผูกไว้ที่ checkbox แต่ละอันใน initMultiSelect() ด้านบน)

// เริ่มต้นแสดงผล
renderCards(cardsData);


// ===== ADVANCED FILTER =====

let advancedFilterState = {
    atMin: null, atMax: null,
    dfMin: null, dfMax: null,
    taxonomy: '',
    legendary: 'all'   // 'all' | 'yes' | 'no'
};

function openAdvancedFilter() {
    document.getElementById('advancedFilterModal').style.display = 'flex';
}

function closeAdvancedFilter() {
    document.getElementById('advancedFilterModal').style.display = 'none';
}

function closeAdvancedFilterOutside(event) {
    if (event.target === document.getElementById('advancedFilterModal')) {
        closeAdvancedFilter();
    }
}

function setLegendaryFilter(value) {
    advancedFilterState.legendary = value;
    // อัปเดตสีปุ่ม
    ['All','Yes','No'].forEach(v => {
        const btn = document.getElementById('legendaryBtn' + v);
        const isActive = value === v.toLowerCase();
        btn.style.background = isActive ? '#ff9f43' : 'transparent';
        btn.style.color = isActive ? '#000' : '#eee';
        btn.style.borderColor = isActive ? '#ff9f43' : '#555';
        btn.style.fontWeight = isActive ? 'bold' : 'normal';
    });
}

function applyAdvancedFilter() {
    advancedFilterState.atMin = parseInt(document.getElementById('advAtMin').value) || null;
    advancedFilterState.atMax = parseInt(document.getElementById('advAtMax').value) || null;
    advancedFilterState.dfMin = parseInt(document.getElementById('advDfMin').value) || null;
    advancedFilterState.dfMax = parseInt(document.getElementById('advDfMax').value) || null;
    advancedFilterState.taxonomy = document.getElementById('advTaxonomy').value;

    closeAdvancedFilter();
    filterCards(); // เรียก function filter หลักที่มีอยู่แล้ว
    updateAdvancedFilterIndicator();
}

function resetAdvancedFilter() {
    advancedFilterState = { atMin: null, atMax: null, dfMin: null, dfMax: null, taxonomy: '', legendary: 'all' };
    document.getElementById('advAtMin').value = '';
    document.getElementById('advAtMax').value = '';
    document.getElementById('advDfMin').value = '';
    document.getElementById('advDfMax').value = '';
    document.getElementById('advTaxonomy').value = '';
    setLegendaryFilter('all');
    filterCards();
    updateAdvancedFilterIndicator();
}

// แสดงจุดสีส้มบนไอคอนฟันเฟืองเมื่อมี filter ที่เปิดอยู่
function updateAdvancedFilterIndicator() {
    const s = advancedFilterState;
    const isActive = s.atMin !== null || s.atMax !== null ||
                     s.dfMin !== null || s.dfMax !== null ||
                     s.taxonomy !== '' || s.legendary !== 'all';
    const btn = document.getElementById('advancedFilterBtn');
    btn.style.color = isActive ? '#ff9f43' : '#aaa';
    btn.style.background = isActive ? 'rgba(255,159,67,0.15)' : 'none';
}