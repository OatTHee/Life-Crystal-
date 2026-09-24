// card_stats.js — Generated from DMT_Card_Stats_F1
// Total: 297 entries | AT/DF/Taxonomy data
// herdSpecial: ค่ารวมฝูงที่พิมพ์บนการ์ด StepNext (ใช้เฉพาะฟอร์แมตพิเศษ ไม่แสดงบนเว็บ)
//   Creature ที่ไม่มี herd จะคำนวณใน main.js ตามกฎฟอร์แมตหลัก: รวมได้ถึง x3, AT +600 ต่อตัว, DF คงเดิม
// herd: ค่าพลังเมื่อรวมฝูง อ่านจากแถบบนหน้าการ์ด  { x: จำนวนตัวในฝูง, at: ATTACK, df: DEFENCE (ถ้ามี) }
// Usage: load before main.js, then cardsData gets merged at runtime

const cardStatsData = {
    "D001 JU": { at: 300, df: 400, taxonomy: null, herd: [{ x: 2, at: 900 }, { x: 3, at: 1300 }, { x: 4, at: 1700 }] },
    "D002 JU": { at: 800, df: 700, taxonomy: "Spinosauridae", herd: [{ x: 2, at: 1800 }] },
    "D003 JU": { at: 850, df: 800, taxonomy: "Abelisauridae", herd: [{ x: 2, at: 1900 }] },
    "D004 JU": { at: 400, df: 700, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }, { x: 4, at: 2500 }] },
    "D005 JU": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1600 }, { x: 4, at: 2100 }] },
    "D006 JU": { at: 900, df: 500, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "D007 JU": { at: 600, df: 900, taxonomy: "Spinosauridae", herd: [{ x: 2, at: 1800, df: 2000 }] },
    "D008 JU": { at: 700, df: 500, taxonomy: "Therizinosauridae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2200 }] },
    "D009 JU": { at: 800, df: 600, taxonomy: "Tyrannosauridae", herd: [{ x: 2, at: 1900 }] },
    "D010 JU": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1600 }, { x: 4, at: 2100 }] },
    "D011 JU": { at: 600, df: 900, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 2000 }, { x: 3, at: 2800 }] },
    "D012 JU": { at: 700, df: 400, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2300 }] },
    "D013 JU": { at: 700, df: 700, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 1700 }, { x: 3, at: 2300 }] },
    "D014 JU": { at: 500, df: 600, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2200 }] },
    "D015 JU": { at: 900, df: 400, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "D016 JU": { at: 850, df: 500, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 2000 }] },
    "D017 JU": { at: 900, df: 400, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 2000 }] },
    "D018 JU": { at: 800, df: 400, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1800 }, { x: 3, at: 2500 }] },
    "D019 JU": { at: 800, df: 500, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 1700 }] },
    "D020 JU": { at: 700, df: 600, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 1900 }] },
    "D021 JU": { at: 800, df: 700, taxonomy: null, herd: [{ x: 2, at: 1900 }] },
    "D022 JU": { at: 600, df: 700, taxonomy: "Diplodocidae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2300 }] },
    "D023 JU": { at: 600, df: 900, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1400 }] },
    "D024 JU": { at: 900, df: 1000, taxonomy: null, herd: [{ x: 2, at: 2100 }] },
    "D025 JU": { at: 500, df: 800, taxonomy: "Diplodocidae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1900 }] },
    "D026 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2500 }] },
    "D027 JU": { at: 600, df: 800, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1900 }] },
    "D028 JU": { at: 900, df: 1000, taxonomy: "Diplodocidae", herd: [{ x: 2, at: 1800 }] },
    "D029 JU": { at: 700, df: 800, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2300 }] },
    "D030 JU": { at: 700, df: 1000, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1800 }] },
    "D031 JU": { at: 700, df: 400, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 1700 }, { x: 3, at: 2500 }] },
    "D032 JU": { at: 500, df: 500, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1700 }, { x: 4, at: 2300 }] },
    "D033 JU": { at: 700, df: 500, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 1800 }, { x: 3, at: 2300 }] },
    "D034 JU": { at: 600, df: 600, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }, { x: 4, at: 2500 }] },
    "D035 JU": { at: 900, df: 600, taxonomy: "Pliosauridae", herd: [{ x: 2, at: 1900 }] },
    "D036 JU": { at: 800, df: 900, taxonomy: "Pliosauridae", herd: [{ x: 2, at: 1900 }, { x: 3, at: 2500 }] },
    "D037 JU": { at: 700, df: 400, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2100 }] },
    "D038 JU": { at: 500, df: 600, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }] },
    "D039 JU": { at: 500, df: 500, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 1100 }, { x: 3, at: 1600 }, { x: 4, at: 2200 }] },
    "D040 JU": { at: 600, df: 800, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }] },
    "D041 JU": { at: 400, df: 400, taxonomy: "Anurognathidae", herd: [{ x: 2, at: 900 }, { x: 3, at: 1300 }, { x: 4, at: 1700 }] },
    "D042 JU": { at: 400, df: 400, taxonomy: null, herd: [{ x: 2, at: 1200 }, { x: 3, at: 1700 }, { x: 4, at: 2000 }] },
    "D043 JU": { at: 500, df: 500, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }, { x: 4, at: 2400 }] },
    "D044 JU": { at: 600, df: 800, taxonomy: null, herd: [{ x: 2, at: 900 }, { x: 3, at: 1300 }, { x: 4, at: 1700 }] },
    "D045 JU": { at: 800, df: 500, taxonomy: "Pteranodontidae", herd: [{ x: 2, at: 1900 }] },
    "D046 JU": { at: 1000, df: 600, taxonomy: "Azhdarchidae", herd: [{ x: 2, at: 2000 }] },
    "D047 JU": { at: 800, df: 700, taxonomy: "Rhamphorhynchidae", herd: [{ x: 2, at: 1300 }, { x: 3, at: 2000 }] },
    "D048 JU": { at: 200, df: 500, taxonomy: "Rhamphorhynchidae", herd: [{ x: 2, at: 1000 }, { x: 3, at: 1700 }, { x: 4, at: 2000 }] },
    "D049 JU": { at: 800, df: 500, taxonomy: null, herd: [{ x: 2, at: 1800 }] },
    "D050 JU": { at: 700, df: 500, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2300 }] },
    "D051 JU": { at: 800, df: 400, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 2000 }] },
    "D052 JU": { at: 500, df: 500, taxonomy: null, herd: [{ x: 2, at: 1600 }, { x: 3, at: 2300 }] },
    "D053 JU": { at: 500, df: 500, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2300 }] },
    "D054 JU": { at: 800, df: 900, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1800 }] },
    "D055 JU": { at: 500, df: 800, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1600 }, { x: 3, at: 2300 }] },
    "D056 JU": { at: 800, df: 500, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2300 }] },
    "D057 JU": { at: 900, df: 600, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 1900 }] },
    "D058 JU": { at: 400, df: 700, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2400 }] },
    "D059 JU": { at: 1000, df: 500, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 2000 }] },
    "D060 JU": { at: 600, df: 700, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }] },
    "DC001 JU": { at: 350, df: 400, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1400 }, { x: 4, at: 1800 }] },
    "DC002 JU": { at: 850, df: 750, taxonomy: "Spinosauridae", herd: [{ x: 2, at: 2000 }] },
    "DC003 JU": { at: 900, df: 750, taxonomy: "Abelisauridae", herd: [{ x: 2, at: 1900 }] },
    "DC004 JU": { at: 450, df: 750, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2100 }, { x: 4, at: 2600 }] },
    "DC006 JU": { at: 750, df: 550, taxonomy: "Therizinosauridae", herd: [{ x: 2, at: 1600 }, { x: 3, at: 2300 }] },
    "DC008 JU": { at: 550, df: 450, taxonomy: null, herd: [{ x: 2, at: 1200 }, { x: 3, at: 1700 }, { x: 4, at: 2200 }] },
    "DC014 JU": { at: 750, df: 400, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 1800 }, { x: 3, at: 2600 }] },
    "DC015 JU": { at: 550, df: 550, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 1800 }, { x: 4, at: 2400 }] },
    "DC016 JU": { at: 650, df: 800, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }] },
    "DC017 JU": { at: 650, df: 650, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }, { x: 4, at: 2600 }] },
    "DC018 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2100 }] },
    "DC020 JU": { at: 550, df: 550, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1700 }, { x: 4, at: 2300 }] },
    "DC009 JU": { at: 500, df: 450, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1800 }, { x: 4, at: 2100 }] },
    "DC010 JU": { at: 700, df: 800, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1400 }, { x: 4, at: 1800 }] },
    "DC011 JU": { at: 1000, df: 700, taxonomy: "Azhdarchidae", herd: [{ x: 2, at: 2200 }] },
    "DC012 JU": { at: 850, df: 650, taxonomy: "Rhamphorhynchidae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2100 }] },
    "DC013 JU": { at: 750, df: 550, taxonomy: null, herd: [{ x: 2, at: 1600 }, { x: 3, at: 2400 }] },
    "DE001 JU": { at: 900, df: 700, taxonomy: "Tyrannosauridae", herd: [{ x: 2, at: 2000 }] },
    "DE002": { at: 400, df: 700, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }, { x: 4, at: 2500 }] },
    "DE003 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }, { x: 4, at: 2400 }] },
    "DE004 JU": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1200 }, { x: 3, at: 1700 }, { x: 4, at: 2200 }] },
    "DE005 JU": { at: 800, df: 800, taxonomy: null, herd: [{ x: 2, at: 1600 }] },
    "DE006 JU": { at: 450, df: 500, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1600 }, { x: 4, at: 2100 }] },
    "DE007 JU": { at: 600, df: 900, taxonomy: "Hadrosauridae", herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }] },
    "DE008 JU": { at: 800, df: 600, taxonomy: "Spinosauridae", herd: [{ x: 2, at: 2000 }] },
    "DE009 JU": { at: 500, df: 500, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1600 }, { x: 4, at: 2100 }] },
    "DE010 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2000 }, { x: 4, at: 2500 }] },
    "DE011 JU": { at: 600, df: 800, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 1900 }] },
    "DE012 JU": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2500 }] },
    "DE013 JU": { at: 500, df: 750, taxonomy: "Hadrosauridae", herd: [{ x: 2, at: 1650 }, { x: 3, at: 2300 }] },
    "DE014 JU": { at: 850, df: 600, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1900 }, { x: 3, at: 2700 }] },
    "DE015 JU": { at: 550, df: 500, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1900 }] },
    "DE016 JU": { at: 650, df: 600, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2100 }] },
    "DE017 JU": { at: 500, df: 700, taxonomy: null, herd: [{ x: 2, at: 1200 }, { x: 3, at: 1800 }] },
    "DE018 JU": { at: 800, df: 600, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1800 }] },
    "DE019 JU": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "DE020 JU": { at: 600, df: 900, taxonomy: null, herd: [{ x: 2, at: 1300 }] },
    "DE021 JU": { at: 500, df: 800, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2500 }] },
    "DE022": { at: 700, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2200 }] },
    "DE023 JU": { at: 600, df: 550, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 2000 }] },
    "DE024 JU": { at: 700, df: 550, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "DE025 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "DE026 JU": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2600 }] },
    "DE027 JU": { at: 400, df: 500, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1600 }] },
    "DE028 JU": { at: 800, df: 500, taxonomy: null, herd: [{ x: 2, at: 1800 }] },
    "DE029 JU": { at: 500, df: 500, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1700 }] },
    "DE030 JU": { at: 400, df: 800, taxonomy: null, herd: [{ x: 2, at: 1800 }, { x: 3, at: 2500 }] },
    "DE031 JU": { at: 600, df: 500, taxonomy: null, herd: [{ x: 2, at: 1300 }, { x: 3, at: 2000 }] },
    "DE032 JU": { at: 550, df: 650, taxonomy: null, herd: [{ x: 2, at: 1200 }, { x: 3, at: 1800 }] },
    "DE033": { at: 500, df: 600, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1700 }] },
    "DE034": { at: 650, df: 500, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "DE035 JU": { at: 750, df: 650, taxonomy: null, herd: [{ x: 2, at: 1900 }, { x: 3, at: 2300 }] },
    "DE036 JU": { at: 500, df: 700, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1100 }] },
    "DE037 JU": { at: 400, df: 700, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1300 }] },
    "DE038 JU": { at: 800, df: 800, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 2000 }] },
    "DE039 JU": { at: 500, df: 800, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "DE040 JU": { at: 650, df: 700, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2100 }] },
    "DE041 JU": { at: 700, df: 600, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2500 }] },
    "DE042 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "DE043 JU": { at: 700, df: 700, taxonomy: null, herd: [{ x: 2, at: 1600 }, { x: 3, at: 2500 }] },
    "DE044 JU": { at: 800, df: 600, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1900 }] },
    "DE045 JU": { at: 900, df: 500, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 2000 }] },
    "DE046": { at: 600, df: 800, taxonomy: null, herd: [{ x: 2, at: 1500 }] },
    "DE047 JU": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "DE048 JU": { at: 900, df: 900, taxonomy: "Azhdarchidae", herd: [{ x: 2, at: 2000 }] },
    "DE049 JU": { at: 600, df: 1000, taxonomy: "Stegosauridae", herd: [{ x: 2, df: 2500 }] },
    "DE050 JU": { at: 700, df: 600, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1600 }] },
    "DE051": { at: 600, df: 300, taxonomy: null, herd: [{ x: 2, at: 1600 }] },
    "DE052 JU": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "DE053": { at: 500, df: 300, taxonomy: "Tyrannosauridae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 1800 }] },
    "DE054": { at: 500, df: 600, taxonomy: null, herd: [{ x: 2, at: 1500 }] },
    "DE055": { at: 600, df: 600, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 1400, df: 1400 }] },
    "DE056 JU": { at: 900, df: 600, taxonomy: null, herd: [{ x: 2, at: 2000, df: 1400 }, { x: 3, at: 3000, df: 2100 }] },
    "DE057 JU": { at: 600, df: 900, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 2000, df: 1400 }, { x: 3, at: 3000, df: 2100 }] },
    "DE058 JU": { at: 900, df: 500, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 2200 }] },
    "DE059": { at: 1000, df: 1400, taxonomy: null, herd: [{ x: 2, at: 2400, df: 3200 }] },
    "DE060": { at: 600, df: 700, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2100 }] },
    "DE061": { at: 600, df: 600, taxonomy: null, herd: [{ x: 2, at: 1400 }, { x: 3, at: 2100 }] },
    "DE062": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 2000, df: 1600 }] },
    "DE063 JU": { at: 500, df: 500, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 1400 }] },
    "DE064 JU": { at: 400, df: 400, taxonomy: "Rhamphorhynchidae" },
    "DE065 JU": { at: 300, df: 300, taxonomy: null, herd: [{ x: 2, at: 800 }, { x: 3, at: 1200 }, { x: 4, at: 1800, df: 1200 }] },
    "DE066": { at: 300, df: 300, taxonomy: "Rhamphorhynchidae" },
    "DE067 JU": { at: 800, df: 1000, taxonomy: "Ankylosauridae" },
    "DE068 JU": { at: 600, df: 800, taxonomy: "Nodosauridae" },
    "DE069 JU": { at: 800, df: 700, taxonomy: "Stegosauridae" },
    "DE070 JU": { at: 600, df: 800, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1400, df: 1800 }, { x: 3, at: 2100, df: 3000 }] },
    "SP001 JU": { at: 1300, df: 600, taxonomy: null },
    "SP002 JU": { at: 1300, df: 500, taxonomy: null },
    "SP003 JU": { at: 1200, df: 400, taxonomy: null },
    "SP004 JU": { at: 1500, df: 900, taxonomy: null },
    "SP005 JU": { at: 1400, df: 400, taxonomy: null },
    "SP006 JU": { at: 1300, df: 600, taxonomy: null },
    "2011NM-C001": { at: 900, df: 800, taxonomy: null },
    "2011NM-C002": { at: 500, df: 400, taxonomy: null },
    "2011NM-C003": { at: 1000, df: 800, taxonomy: null },
    "2011NM-C004": { at: 600, df: 400, taxonomy: null },
    "2011NM-C005": { at: 500, df: 500, taxonomy: null },
    "2011NM-C006": { at: 900, df: 900, taxonomy: "Centrosaurinae" },
    "2011NM-C007": { at: 800, df: 600, taxonomy: "Chasmosaurinae" },
    "2011NM-C008": { at: 600, df: 600, taxonomy: null },
    "2011NM-C009": { at: 500, df: 500, taxonomy: "Centrosaurinae" },
    "2011NM-C010": { at: 200, df: 200, taxonomy: null },
    "2011NM-C011": { at: 1200, df: 1200, taxonomy: "Elasmosauridae" },
    "2011NM-C012": { at: 800, df: 700, taxonomy: "Elasmosauridae" },
    "2011NM-C013": { at: 900, df: 900, taxonomy: null },
    "2011NM-C014": { at: 500, df: 700, taxonomy: "Elasmosauridae" },
    "2011NM-C015": { at: 900, df: 1100, taxonomy: "Elasmosauridae" },
    "2011NM-C016": { at: 1000, df: 1000, taxonomy: "Azhdarchidae" },
    "2011NM-C017": { at: 900, df: 800, taxonomy: null },
    "2011NM-C018": { at: 700, df: 600, taxonomy: null },
    "2011NM-C019": { at: 400, df: 400, taxonomy: null },
    "2011NM-C020": { at: 700, df: 300, taxonomy: "Anurognathidae" },
    "2011NM-C021": { at: 1000, df: 1500, taxonomy: "Titanosauridae" },
    "2011NM-C022": { at: 900, df: 1000, taxonomy: null },
    "2011NM-C023": { at: 800, df: 1000, taxonomy: "Titanosauridae" },
    "2011NM-C024": { at: 500, df: 700, taxonomy: "Titanosauridae" },
    "2011NM-C025": { at: 300, df: 500, taxonomy: null },
    "2011NM-C026": { at: 800, df: 1200, taxonomy: null },
    "2011NM-C027": { at: 800, df: 1000, taxonomy: "Stegosauridae" },
    "2011NM-C028": { at: 400, df: 600, taxonomy: null },
    "2011NM-C029": { at: 600, df: 800, taxonomy: "Nodosauridae" },
    "2011NM-C030": { at: 600, df: 800, taxonomy: "Nodosauridae" },
    "2011NM-C031": { at: 1000, df: 900, taxonomy: "Abelisauridae" },
    "2011NM-C032": { at: 800, df: 700, taxonomy: "Abelisauridae" },
    "2011NM-C033": { at: 1000, df: 900, taxonomy: "Abelisauridae" },
    "2011NM-C034": { at: 1500, df: 900, taxonomy: null },
    "2011NM-C036": { at: 700, df: 500, taxonomy: "Megalosauridae" },
    "2011NM-C037": { at: 1100, df: 900, taxonomy: "Chasmosaurinae" },
    "2011NM-C038": { at: 1500, df: 1000, taxonomy: "Chasmosaurinae" },
    "2011NM-C039": { at: 700, df: 700, taxonomy: "Elasmosauridae" },
    "2011NM-C040": { at: 900, df: 1000, taxonomy: "Elasmosauridae" },
    "2011NM-C041": { at: 700, df: 700, taxonomy: "Leptocleididae" },
    "2011NM-C042": { at: 500, df: 800, taxonomy: "Elasmosauridae" },
    "2011NM-C043": { at: 1000, df: 900, taxonomy: "Azhdarchidae" },
    "2011NM-C044": { at: 900, df: 800, taxonomy: "Ornithocheiridae" },
    "2011NM-C045": { at: 900, df: 900, taxonomy: null },
    "2011NM-C046": { at: 800, df: 800, taxonomy: "Ornithocheiridae" },
    "2011NM-C047": { at: 1200, df: 1200, taxonomy: "Titanosauridae" },
    "2011NM-C048": { at: 1200, df: 1200, taxonomy: "Diplodocidae" },
    "2011NM-C049": { at: 1800, df: 1800, taxonomy: "Titanosauridae" },
    "2011NM-C050": { at: 1600, df: 1600, taxonomy: "Titanosauridae" },
    "2011NM-C051": { at: 900, df: 1000, taxonomy: "Nodosauridae" },
    "2011NM-C052": { at: 400, df: 800, taxonomy: "Ankylosauridae" },
    "2011NM-C053": { at: 400, df: 800, taxonomy: "Ankylosauridae" },
    "2011NM-C054": { at: 400, df: 600, taxonomy: "Ankylosauridae" },
    "2011NM-C056": { at: 700, df: 600, taxonomy: "Pteranodontidae" },
    "2011NM-C057": { at: 400, df: 500, taxonomy: "Anurognathidae" },
    "2011NM-C058": { at: 500, df: 500, taxonomy: "Rhamphorhynchidae" },
    "2011NM-C059": { at: 1400, df: 1200, taxonomy: "Elasmosauridae" },
    "2011NM-C060": { at: 1300, df: 1200, taxonomy: null },
    "BambiraptorM1": { at: 400, df: 200, taxonomy: null, herdSpecial: [{ x: 2, at: 1000, df: 400 }, { x: 3, at: 1400, df: 600 }, { x: 4, at: 1900, df: 800 }] },
    "CeratosaurusF1": { at: 1200, df: 800, taxonomy: null, herdSpecial: [{ x: 2, at: 2500, df: 1600 }, { x: 3, at: 3800, df: 2400 }, { x: 4, at: 5100, df: 3200 }] },
    "CompsognathusM1": { at: 100, df: 50, taxonomy: null, herdSpecial: [{ x: 2, at: 1800, df: 2400 }, { x: 3, at: 2700, df: 3600 }, { x: 4, at: 3600, df: 4800 }] },
    "DilophosaurusF1": { at: 800, df: 500, taxonomy: null, herdSpecial: [{ x: 2, at: 1700, df: 1000 }, { x: 3, at: 2600, df: 1500 }, { x: 4, at: 3500, df: 2000 }] },
    "MegalosaurusM1": { at: 1600, df: 1200, taxonomy: "Megalosauridae", herdSpecial: [{ x: 2, at: 3200, df: 2200 }, { x: 3, at: 4800, df: 3300 }, { x: 4, at: 6400, df: 4400 }] },
    "SiamotyrannusM1": { at: 1500, df: 900, taxonomy: "Tyrannosauridae", herdSpecial: [{ x: 2, at: 3200, df: 2000 }, { x: 3, at: 4800, df: 3000 }] },
    "TarbosaurusM1": { at: 1200, df: 500, taxonomy: "Tyrannosauridae", herdSpecial: [{ x: 2, at: 2500, df: 1100 }, { x: 3, at: 3800, df: 1700 }] },
    "TherizinosaurusM1": { at: 1000, df: 1200, taxonomy: "Therizinosauridae", herdSpecial: [{ x: 2, at: 2200, df: 2400 }, { x: 3, at: 3300, df: 3600 }, { x: 4, at: 4400, df: 4800 }] },
    "TorvosaurusM1": { at: 1800, df: 800, taxonomy: "Megalosauridae", herdSpecial: [{ x: 2, at: 3800, df: 2000 }] },
    "TyrannosaurusF1": { at: 1800, df: 1000, taxonomy: "Tyrannosauridae", herdSpecial: [{ x: 2, at: 3700, df: 2100 }, { x: 3, at: 5600, df: 3200 }] },
    "SaurolophusM1": { at: 600, df: 1200, taxonomy: "Hadrosauridae", herdSpecial: [{ x: 2, at: 1200, df: 2500 }, { x: 3, at: 1800, df: 3700 }, { x: 4, at: 2400, df: 4900 }] },
    "ParasaurolophusF1": { at: 1000, df: 900, taxonomy: "Hadrosauridae", herdSpecial: [{ x: 2, at: 1800, df: 2500 }, { x: 3, at: 2700, df: 3700 }, { x: 4, at: 3600, df: 4900 }] },
    "LambeosaurusM1": { at: 1400, df: 1900, taxonomy: "Hadrosauridae", herdSpecial: [{ x: 2, at: 2800, df: 3800 }, { x: 3, at: 4200, df: 5700 }, { x: 4, at: 5600, df: 7600 }] },
    "DemandasaurusM1": { at: 1000, df: 1200, taxonomy: null, herdSpecial: [{ x: 2, at: 2000, df: 2400 }, { x: 3, at: 3000, df: 3600 }, { x: 4, at: 4000, df: 4800 }] },
    "MamenchisaurusM1": { at: 1500, df: 1800, taxonomy: null, herdSpecial: [{ x: 2, at: 3000, df: 3700 }, { x: 3, at: 4500, df: 5600 }, { x: 4, at: 6000, df: 7500 }] },
    "PhuwiangosaurusM1": { at: 1600, df: 1800, taxonomy: null, herdSpecial: [{ x: 2, at: 3300, df: 3700 }, { x: 3, at: 5000, df: 5600 }, { x: 4, at: 6700, df: 7500 }] },
    "RapetosaurusM1": { at: 800, df: 1200, taxonomy: "Titanosauridae", herdSpecial: [{ x: 2, at: 1700, df: 2500 }, { x: 3, at: 2600, df: 3800 }, { x: 4, at: 3500, df: 5100 }] },
    "SaltasaurusF1": { at: 500, df: 700, taxonomy: "Titanosauridae", herdSpecial: [{ x: 2, at: 1100, df: 1600 }, { x: 3, at: 1700, df: 2400 }, { x: 4, at: 2300, df: 3200 }] },
    "ShunosaurusM1": { at: 800, df: 1000, taxonomy: null, herdSpecial: [{ x: 2, at: 1700, df: 2000 }, { x: 3, at: 2600, df: 3000 }, { x: 4, at: 3500, df: 4000 }] },
    "AnurognathusF1": { at: 200, df: 50, taxonomy: "Anurognathidae", herdSpecial: [{ x: 2, at: 200, df: 100 }, { x: 3, at: 600, df: 150 }, { x: 4, at: 800, df: 200 }] },
    "EudimorphodonM1": { at: 500, df: 200, taxonomy: null, herdSpecial: [{ x: 2, at: 600, df: 400 }, { x: 3, at: 900, df: 600 }, { x: 4, at: 1300, df: 900 }] },
    "HatzegopteryxM1": { at: 1400, df: 500, taxonomy: "Azhdarchidae", herdSpecial: [{ x: 2, at: 600, df: 1000 }, { x: 3, at: 900, df: 1500 }, { x: 4, at: 1200, df: 2000 }] },
    "NyctosaurusF1": { at: 100, df: 50, taxonomy: null, herdSpecial: [{ x: 2, at: 100, df: 100 }, { x: 3, at: 300, df: 150 }, { x: 4, at: 500, df: 250 }] },
    "QuetzalcoatlusM1": { at: 1700, df: 900, taxonomy: "Azhdarchidae", herdSpecial: [{ x: 2, at: 2300, df: 1800 }, { x: 3, at: 3400, df: 2700 }, { x: 4, at: 4500, df: 3600 }] },
    "SordesM1": { at: 200, df: 50, taxonomy: "Rhamphorhynchidae", herdSpecial: [{ x: 2, at: 200, df: 100 }, { x: 3, at: 300, df: 150 }, { x: 4, at: 400, df: 200 }] },
    "AchelousaurusM1": { at: 900, df: 1200, taxonomy: "Centrosaurinae", herdSpecial: [{ x: 2, at: 1900, df: 2500 }, { x: 3, at: 2800, df: 3700 }, { x: 4, at: 3700, df: 4900 }] },
    "EiniosaurusM1": { at: 900, df: 1200, taxonomy: "Centrosaurinae", herdSpecial: [{ x: 2, at: 1900, df: 2500 }, { x: 3, at: 2900, df: 3700 }, { x: 4, at: 3900, df: 4900 }] },
    "KosmoceratopsF1": { at: 900, df: 900, taxonomy: "Chasmosaurinae", herdSpecial: [{ x: 2, at: 2000, df: 2000 }, { x: 3, at: 3000, df: 3000 }, { x: 4, at: 4000, df: 4000 }] },
    "CryptoclidusM1": { at: 600, df: 500, taxonomy: null, herdSpecial: [{ x: 2, at: 1200, df: 1000 }, { x: 3, at: 1800, df: 1500 }, { x: 4, at: 2800, df: 2400 }] },
    "ElasmosaurusM1": { at: 900, df: 1100, taxonomy: "Elasmosauridae", herdSpecial: [{ x: 2, at: 2000, df: 2200 }, { x: 3, at: 3000, df: 3300 }] },
    "KronosaurusM1": { at: 1700, df: 1000, taxonomy: "Pliosauridae", herdSpecial: [{ x: 2, at: 3500, df: 2100 }, { x: 3, at: 5300, df: 3200 }] },
    "MuraenosaurusF1": { at: 500, df: 400, taxonomy: null, herdSpecial: [{ x: 2, at: 1000, df: 800 }, { x: 3, at: 1500, df: 1200 }, { x: 4, at: 2000, df: 1600 }] },
    "AnimantarxM1": { at: 200, df: 400, taxonomy: "Nodosauridae", herdSpecial: [{ x: 2, at: 400, df: 600 }, { x: 3, at: 600, df: 900 }, { x: 4, at: 800, df: 1200 }] },
    "ChialingosaurusF1": { at: 200, df: 400, taxonomy: "Stegosauridae", herdSpecial: [{ x: 2, at: 500, df: 700 }, { x: 3, at: 800, df: 1100 }, { x: 4, at: 1100, df: 1500 }] },
    "GargoyleosaurusM1": { at: 200, df: 400, taxonomy: "Nodosauridae", herdSpecial: [{ x: 2, at: 500, df: 700 }, { x: 3, at: 800, df: 1100 }, { x: 4, at: 1100, df: 1500 }] },
    "GastoniaF1": { at: 300, df: 600, taxonomy: "Nodosauridae", herdSpecial: [{ x: 2, at: 700, df: 1300 }, { x: 3, at: 1100, df: 2000 }, { x: 4, at: 1500, df: 2700 }] },
    "GigantspinosaurusM1": { at: 400, df: 600, taxonomy: "Stegosauridae", herdSpecial: [{ x: 2, at: 800, df: 1200 }, { x: 3, at: 1200, df: 1800 }, { x: 4, at: 1600, df: 2400 }] },
    "KentrosaurusM1": { at: 900, df: 1200, taxonomy: "Stegosauridae", herdSpecial: [{ x: 2, at: 1800, df: 2400 }, { x: 3, at: 2700, df: 3600 }, { x: 4, at: 3600, df: 4800 }] },
    "StegosaurusF1": { at: 1000, df: 1400, taxonomy: "Stegosauridae", herdSpecial: [{ x: 2, at: 2000, df: 2900 }, { x: 3, at: 3000, df: 4400 }, { x: 4, at: 4000, df: 5900 }] },
    "Talarurus": { at: 300, df: 500, taxonomy: "Ankylosauridae", herdSpecial: [{ x: 2, at: 600, df: 1000 }, { x: 3, at: 1000, df: 1600 }, { x: 4, at: 1400, df: 2200 }] },
    "2016NE-DE101": { at: 300, df: 100, taxonomy: null, herd: [{ x: 2, at: 800 }, { x: 3, at: 1400 }] },
    "2016NE-DE102": { at: 600, df: 700, taxonomy: "Hadrosauridae", herd: [{ x: 2, at: 1300 }, { x: 3, at: 2000 }, { x: 4, at: 2800 }, { x: 5, at: 3500 }] },
    "2016NE-DE103": { at: 1000, df: 600, taxonomy: "Abelisauridae", herd: [{ x: 2, at: 2100 }, { x: 3, at: 3100 }] },
    "2016NE-DE104": { at: 700, df: 700, taxonomy: "Therizinosauridae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2500 }] },
    "2016NE-DE105": { at: 300, df: 300, taxonomy: null, herd: [{ x: 2, at: 800 }, { x: 3, at: 1300 }, { x: 4, at: 1800 }] },
    "2016NE-DE106": { at: 700, df: 600, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2700 }] },
    "2016NE-DE107": { at: 1300, df: 800, taxonomy: "Tyrannosauridae", herd: [{ x: 2, at: 2800 }] },
    "2011NE-DE108": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1600 }, { x: 4, at: 2300 }] },
    "2016NE-DE109": { at: 800, df: 700, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2700 }] },
    "2016NE-DE110": { at: 1200, df: 900, taxonomy: null, herd: [{ x: 2, at: 2500 }] },
    "2016NE-DE111": { at: 900, df: 900, taxonomy: null, herd: [{ x: 2, at: 2000 }] },
    "2016NE-DE301": { at: 1900, df: 1800, taxonomy: "Diplodocidae" },
    "2016NE-DE302": { at: 1500, df: 1400, taxonomy: "Diplodocidae", herd: [{ x: 2, at: 2500 }] },
    "2016NE-DE303": { at: 1700, df: 1600, taxonomy: "Titanosauridae" },
    "2016NE-DE304": { at: 1300, df: 1500, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 2500 }] },
    "2016NE-DE305": { at: 700, df: 500, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }] },
    "2016NE-DE306": { at: 500, df: 500, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1300 }, { x: 3, at: 1800 }] },
    "2016NE-DE307": { at: 1000, df: 1200, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 2300 }] },
    "2016NE-DE308": { at: 1400, df: 1400, taxonomy: null, herd: [{ x: 2, at: 2700 }] },
    "2016NE-DE309": { at: 1200, df: 1400, taxonomy: null, herd: [{ x: 2, at: 2400 }] },
    "2016NE-DE501": { at: 900, df: 700, taxonomy: null, herd: [{ x: 2, at: 2000 }, { x: 3, at: 2700 }] },
    "2016NE-DE502": { at: 400, df: 400, taxonomy: "Rhamphorhynchidae", herd: [{ x: 2, at: 1300 }, { x: 3, at: 1800 }, { x: 4, at: 2300 }] },
    "2016NE-DE503": { at: 600, df: 500, taxonomy: "Rhamphorhynchidae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2000 }, { x: 4, at: 2500 }] },
    "2016NE-DE504": { at: 1200, df: 1000, taxonomy: "Ornithocheiridae", herd: [{ x: 2, at: 2500 }] },
    "2016NE-DE505": { at: 800, df: 600, taxonomy: null, herd: [{ x: 2, at: 1700 }, { x: 3, at: 2700 }] },
    "2016NE-DE506": { at: 200, df: 200, taxonomy: null, herd: [{ x: 2, at: 600 }, { x: 3, at: 1100 }, { x: 4, at: 1700 }] },
    "2016NE-DE507": { at: 900, df: 700, taxonomy: "Ornithocheiridae", herd: [{ x: 2, at: 2000 }, { x: 3, at: 3000 }] },
    "2016NE-DE201": { at: 500, df: 600, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1200 }, { x: 3, at: 2000 }] },
    "2016NE-DE202": { at: 400, df: 400, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1600 }] },
    "2016NE-DE203": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1100 }, { x: 3, at: 1800 }] },
    "2016NE-DE204": { at: 400, df: 400, taxonomy: null, herd: [{ x: 2, at: 1000 }, { x: 3, at: 1600 }] },
    "2016NE-DE205": { at: 1000, df: 800, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 2200 }] },
    "2016NE-DE206": { at: 700, df: 700, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1300 }] },
    "2016NE-DE207": { at: 1300, df: 1000, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 2700 }] },
    "2016NE-DE401": { at: 1300, df: 1100, taxonomy: "Pliosauridae", herd: [{ x: 2, at: 2300 }] },
    "2016NE-DE402": { at: 1000, df: 700, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 1800 }, { x: 3, at: 2600 }] },
    "2016NE-DE403": { at: 300, df: 200, taxonomy: "Ichthyosauria", herd: [{ x: 2, at: 900 }, { x: 3, at: 1400 }, { x: 4, at: 1900 }] },
    "2016NE-DE404": { at: 200, df: 100, taxonomy: null, herd: [{ x: 2, at: 700 }, { x: 3, at: 1100 }, { x: 4, at: 1500 }, { x: 5, at: 2200 }] },
    "2016NE-DE405": { at: 900, df: 700, taxonomy: null, herd: [{ x: 2, at: 2300 }] },
    "2016NE-DE406": { at: 700, df: 600, taxonomy: null, herd: [{ x: 2, at: 1600 }] },
    "2016NE-DE407": { at: 500, df: 400, taxonomy: null, herd: [{ x: 2, at: 1200 }] },
    "2016NE-DE601": { at: 600, df: 1000, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2300 }] },
    "2016NE-DE602": { at: 100, df: 500, taxonomy: null, herd: [{ x: 2, at: 600 }, { x: 3, at: 1100 }, { x: 4, at: 1700 }] },
    "2016NE-DE603": { at: 500, df: 900, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1400 }, { x: 3, at: 2100 }] },
    "2016NE-DE604": { at: 1300, df: 800, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 2700 }] },
    "2016NE-DE605": { at: 1100, df: 1100, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 2400 }] },

    //fanmade cards

    "FM-PR06-EXC01 JU": { at: 2500, df: 1800, taxonomy: null },
    "FM-PR06 EXC02 JU": { at: 1500, df: 700, taxonomy: null },
    "FM-PR06 EXC03 JU": { at: 1500, df: 700, taxonomy: null },
    "FM-PR06 EXC04 JU": { at: 1500, df: 800, taxonomy: null },
    "FM-PR06 EXC05 JU": { at: 2700, df: 1800, taxonomy: null },
    "FM-PR06 EXC06 JU": { at: 1200, df: 500, taxonomy: null },
    "FM-PR06 EXC07 JU": { at: 1400, df: 400, taxonomy: null },

    "FM-PR08 EXC01 JU": { at: 1300, df: 600, taxonomy: null },
    "FM-PR08 EXC02 JU": { at: 1300, df: 600, taxonomy: null },
    "FM-PR08 EXC03 JU": { at: 1500, df: 1200, taxonomy: null },

    // Nodosauridae — ใบที่ไม่มีใน DMT stats เดิม + การ์ดบูสต์ (at/df = null เพื่อไม่ให้กระทบฟิลเตอร์ AT/DF)
    "2018NE-ARDE604": { at: 800, df: 1000, taxonomy: "Nodosauridae", herd: [{ x: 2, at: 1600 }, { x: 3, at: 2400 }, { x: 4, at: 3300 }] },
    "FM-PR05 D01 JU": { at: null, df: null, taxonomy: "Nodosauridae" },
    "FM-PRO2 D06": { at: null, df: null, taxonomy: "Nodosauridae" },

    // การ์ดบูสต์ Abelisauridae / Elasmosauridae / Tyrannosauridae (+ Edmontonia) — จับคู่ตามชื่อ EN
    "FM-PR03 D04 JU": { at: null, df: null, taxonomy: "Nodosauridae" }, // Edmontonia
    "D003 JU / FM-PRO1 D02 JU": { at: null, df: null, taxonomy: "Abelisauridae" }, // Carnotaurus
    "FM-PR07 D16 JU": { at: null, df: null, taxonomy: "Abelisauridae" }, // Carnotaurus / Red Carnotaurus
    "FM-PR07 D17 JU": { at: null, df: null, taxonomy: "Abelisauridae", herd: [{ x: 2, at: 2400 }] }, // Abelisaurus
    "FM-PR07 D18 JU": { at: null, df: null, taxonomy: "Abelisauridae", herd: [{ x: 2, at: 2000 }] }, // Pycnonemosaurus
    "FM-PR04 D03 JU": { at: null, df: null, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 2100 }] }, // Callawayasaurus
    "FM-PR05 D06 JU": { at: null, df: null, taxonomy: "Elasmosauridae" }, // Futabasaurus
    "FM-PR07 D13 JU": { at: null, df: null, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 2700 }] }, // Hydralmosaurus
    "FM-PR07 D15 JU": { at: null, df: null, taxonomy: "Elasmosauridae", herd: [{ x: 2, at: 2400 }] }, // Thalassomedon
    "FM-PRO8 <L>D02 JU": { at: null, df: null, taxonomy: "Elasmosauridae" }, // Elasmosaurus / Emerald Elasmosaurus
    "FM-PR05 D03 JU": { at: null, df: null, taxonomy: "Tyrannosauridae" }, // Siamotyrannus
    "FM-PRO8 <L>D06 JU": { at: null, df: null, taxonomy: "Tyrannosauridae" }, // Tyrannosaurus
    "Illus011": { at: null, df: null, taxonomy: "Tyrannosauridae" }, // Tyrannosaurus (Illusion)

    // Taxonomy รอบ 2 (Ankylo/Ceratopsid/Ichthyo/Pterosaur/Sauropod/...) — ใบที่ไม่มีใน DMT stats
    "2018NE-ARDE203": { at: null, df: null, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1800 }, { x: 3, at: 3000 }] }, // Nasutoceratops titusi
    "Illus006": { at: null, df: null, taxonomy: "Ankylosauridae" }, // Ankylosaurus
    "Illus008": { at: null, df: null, taxonomy: "Pteranodontidae" }, // Pteranodon
    "Illus010": { at: null, df: null, taxonomy: "Stegosauridae" }, // Stegosaurus
    "FM-PR04 D01 JU": { at: null, df: null, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 1600, df: 2000 }] }, // Lexovisaurus plicatospineus
    "FM-PR04 D05 JU": { at: null, df: null, taxonomy: "Ornithocheiridae", herd: [{ x: 2, at: 2200 }] }, // Ornithocheirus
    "FM-PR04 D06 JU": { at: null, df: null, taxonomy: "Chasmosaurinae", herd: [{ x: 2, at: 2200 }] }, // Nedoceratops hatcheri
    "FM-PR05 D02 JU": { at: null, df: null, taxonomy: "Stegosauridae" }, // Dacentrurus
    "FM-PR05 D07 JU": { at: null, df: null, taxonomy: "Azhdarchidae" }, // Hatzegopteryx
    "FM-PR05 D11 JU": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Achelousaurus
    "FM-PR05 D12 JU": { at: null, df: null, taxonomy: "Chasmosaurinae" }, // Diceratops
    "FM-PRO6 D02 JU": { at: null, df: null, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1400, df: 1600 }, { x: 3, at: 2000, df: 2200 }] }, // Aletopelta biibeyhallorum
    "FM-PRO4 D03 JU": { at: null, df: null, taxonomy: "Ankylosauridae", herd: [{ x: 2, at: 1700, df: 2100 }] }, // Cedarpelta plicatospineus
    "FM-PRO6 D09 JU": { at: null, df: null, taxonomy: "Therizinosauridae" }, // Therizinosaurus / Shine Therizinosaurus
    "FM-PR07-D02 JU": { at: null, df: null, taxonomy: "Stegosauridae", herd: [{ x: 2, at: 2600 }] }, // Chialingosaurus kuani
    "FM-PR07-D03 JU": { at: null, df: null, taxonomy: "Centrosaurinae", herd: [{ x: 2, at: 1500 }, { x: 3, at: 2200 }] }, // Avaceratops lammersi
    "FM-PR07-D04 JU": { at: null, df: null, taxonomy: "Leptocleididae", herd: [{ x: 2, at: 2100 }] }, // Thililua longicollis
    "FM-PR07-D05 JU": { at: null, df: null, taxonomy: "Azhdarchidae", herd: [{ x: 2, at: 2500 }] }, // Arambourgiania philadelphiae
    "FM-PR07-D06 JU": { at: null, df: null, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1400 }] }, // Sonidosaurus saihangaobiensis
    "FM-PR07 D08 JU": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Centrosaurus
    "FM-PR07 D09 JU": { at: null, df: null, taxonomy: "Ichthyosauria" }, // Ophthalmosaurus / Black Ophthalmosaurus
    "FM-PR07 D11 JU": { at: null, df: null, taxonomy: "Stegosauridae" }, // Tuojiangosaurus
    "FM-PR08 D05 JU": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Styracosaurus
    "FM-PRO8 <L>D01 JU": { at: null, df: null, taxonomy: "Spinosauridae" }, // Spinosaurus
    "FM-PRO8 <L>D03 JU": { at: null, df: null, taxonomy: "Stegosauridae" }, // Stegosaurus
    "FM-PRO8 <L>D04 JU": { at: null, df: null, taxonomy: "Azhdarchidae" }, // Quetzalcoatlus / Quetzalcoatlus K
    "FM-PRO8 <L>D05 JU": { at: null, df: null, taxonomy: "Chasmosaurinae" }, // Pentaceratops
    "FM-PRO2 D02 JU": { at: null, df: null, taxonomy: "Ichthyosauria" }, // Cymbospondylus
    "FM-PRO2 D03": { at: null, df: null, taxonomy: "Rhamphorhynchidae" }, // Scaphognathus crassirostris
    "FM-PRO2 D04": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Vendiceratops
    "D011 JU / FM-PRO1 D01 JU": { at: null, df: null, taxonomy: "Chasmosaurinae" }, // Anchiceratops
    "D057 JU / FM-PRO1 D03 JU": { at: null, df: null, taxonomy: "Stegosauridae" }, // Kentrosaurus
    "D013 JU / FM-PRO1 D04 JU": { at: null, df: null, taxonomy: "Chasmosaurinae" }, // Chasmosaurus
    "D041 JU / FM-PRO1 D05 JU": { at: null, df: null, taxonomy: "Anurognathidae" }, // Anurognathus
    "FM-PR10 D07 JU": { at: null, df: null, taxonomy: "Titanosauridae", herd: [{ x: 2, at: 1600 }] }, // Opisthocoelicaudia skarzynskii
    "FM-PR10 D09 JU": { at: null, df: null, taxonomy: "Titanosauridae" }, // Titanosaurus
    "FM-PR10 D10 JU": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Einiosaurus
    "FM-PR10 D12 JU": { at: null, df: null, taxonomy: "Centrosaurinae" }, // Sinoceratops zhuchengensis
    "FM-PR10 D01 JU": { at: null, df: null, taxonomy: "Ankylosauridae" }, // Saichania
    "FM-PR10 D04 JU": { at: null, df: null, taxonomy: "Rhamphorhynchidae" }, // Soldes
    "FM-PR10 D05 JU": { at: null, df: null, taxonomy: "Hadrosauridae" }, // Lambeosaurus
    "FM-PR10 D06 JU": { at: null, df: null, taxonomy: "Diplodocidae" }, // Diplodocus
    "FM-PR10 <L>D01 JU": { at: null, df: null, taxonomy: "Chasmosaurinae" }, // Triceratops
    "FM-PR10 <L>D02 JU": { at: null, df: null, taxonomy: "Ankylosauridae" }, // Ankylosaurus
    "FM-PR10 <L>D03 JU": { at: null, df: null, taxonomy: "Diplodocidae" }, // Seismosaurus

    // --- เพิ่มเพื่อเก็บค่าพลังรวมฝูง (ยังไม่มีข้อมูล AT/DF) ---
    "FM-PR04 D02 JU": { at: null, df: null, taxonomy: null, herd: [{ x: 2, at: 2200 }] }, // Carcharodontosaurus saharicus
    "FM-PR04 D04 JU": { at: null, df: null, taxonomy: null, herd: [{ x: 2, at: 1600 }] }, // Abrosaurus dongpoi
    "FM-PR07-D01 JU": { at: null, df: null, taxonomy: null, herd: [{ x: 2, at: 1500 }, { x: 3, at: 2100 }, { x: 4, at: 2600 }] }, // Alvarezsaurus calvoi
    "2011NM-C035": { at: 800, df: 700, taxonomy: "Abelisauridae" }, // Deltadromeus comahuensis (อ่านจากหน้าการ์ด)

    // Pliosauridae — ใบที่ไม่มีใน DMT stats
    "FM-PR03 D02 JU": { at: null, df: null, taxonomy: "Pliosauridae" }, // Kronosaurus

};
