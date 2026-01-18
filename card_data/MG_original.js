const MG_originalData = [
    {
        id: "AC001 MG",
        nameTH: "ฝนกรด",
        nameEN: "Acid Rain",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบ ลด AT 200 DF 200 จนจบเทิร์น`,
        image: "images/OriginalMG/Acid Rain.jpg"
    },
    {
        id: "AC002 MG",
        nameTH: "พิษอัลคาลอยด์",
        nameEN: "Alkaloid Toxic",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature เผ่าที่เลือกทุกใบไม่สามารถตกเป็นเป้าหมายการโจมตีได้จนจบเทิร์น`,
        image: "images/OriginalMG/Alkaloid Toxic.jpg"
    },
    {
        id: "AC003 MG",
        nameTH: "พายุหิมะ",
        nameEN: "Blizzard",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบไม่สามารถโจมตีได้จนจบเทิร์น`,
        image: "images/OriginalMG/Blizzard.jpg"
    },
    {
        id: "AC004 MG",
        nameTH: "แผ่นดินไหว",
        nameEN: "Earthquake",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ทำลาย Creature 1 ใบที่สั่งโจมตี`,
        image: "images/OriginalMG/Earthquake.jpg"
    },
    {
        id: "AC005 MG",
        nameTH: "ซากดึกดำบรรพ์",
        nameEN: "Fossil",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำ Creature 1 ใบในสุสานกลับเข้ามาในสนาม <br> <span class="hlred">*(ใส่ได้ 1 ใบในเด็ค)*</span>`,
        image: "images/OriginalMG/Fossil.jpg"
    },
    {
        id: "AC006 MG",
        nameTH: "ฝนดาวตก",
        nameEN: "Meteor Rain",
        dp: 4,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สามารถร่ายการ์ดใบนี้เมื่อการ์ดใน DF Line ตกเป็นเป้าหมายการโจมตีเท่านั้น : ทำลาย Creature ได้ 1 ใบ`,
        image: "images/OriginalMG/Meteor Rain.jpg"
    },
    {
        id: "AC007 MG",
        nameTH: "อุกกาบาตตก",
        nameEN: "Meteor Strike",
        dp: 5,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สามารถร่ายเมื่อ Master ของเราตกเป็นเป้าหมายการโจมตีเท่านั้น : ทำลาย Creature ไม่เกิน 2 ใบ`,
        image: "images/OriginalMG/Meteor Strike.jpg"
    },
    {
        id: "AC008 MG",
        nameTH: "ธารลาวาหลอมละลาย",
        nameEN: "Molten Lava",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ทุกใบที่ไม่ได้สวมใส่ Armor Card ลด AT 1000 จนจบเทิร์น`,
        image: "images/OriginalMG/Molten Lava.jpg"
    },
    {
        id: "AC009 MG",
        nameTH: "น้ำขึ้น น้ำลง",
        nameEN: "Moon Control",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สลับค่า AT และ DF ของ Creature 1 ใบ จนจบเทิร์น`,
        image: "images/OriginalMG/Moon Control.jpg"
    },
    {
        id: "AC010 MG",
        nameTH: "สายฟ้าฟาด",
        nameEN: "Thunderbolt",
        dp: 3,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ยกเลิกกระบวนการร่าย Action Card ที่กำลังใช้งาน 1 ใบ`,
        image: "images/OriginalMG/Thunderbolt.jpg"
    },
    {
        id: "AC011 MG",
        nameTH: "พายุทอร์นาโด",
        nameEN: "Tornado",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำการ์ด 1 ใบที่ไม่ได้สวม Armor Card กลับขึ้นมือ`,
        image: "images/OriginalMG/Tornado.jpg"
    },
    {
        id: "AC012 MG",
        nameTH: "คลื่นสึนามิ",
        nameEN: "Tsunami",
        dp: 3,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ทำลาย Creature 1 ใบที่ติดสภาวะต่างปกติ`,
        image: "images/OriginalMG/Tsunami.jpg"
    },
    {
        id: "AC013 MG",
        nameTH: "ภูเขาไฟปะทุ",
        nameEN: "Volcano Burst",
        dp: 4,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ของผู้เล่นคนอื่นทุกใบไม่สามารถสั่งโจมตีได้จนจบเทิร์น`,
        image: "images/OriginalMG/Volcano Burst.jpg"
    },
    {
        id: "AC014 MG",
        nameTH: "กำมะถันภูเขาไฟ",
        nameEN: "Volcano Gas",
        dp: 2,
        type: "Action",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature เป้าหมาย AT+700 จนจบเทิร์น`,
        image: "images/OriginalMG/Volcano Gas.jpg"
    },
	
	{
        id: "AR001 MG",
        nameTH: "กองพันอมตะ",
        nameEN: "Battalion of Endure",
        dp: 3,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> การ์ดทุกใบในสนามของเรา เพิ่ม DF+300`,
        image: "images/OriginalMG/Battalion of Endure.jpg"
    },
    {
        id: "AR002 MG",
        nameTH: "พลังแห่งความอ่อนแอ",
        nameEN: "Force of Feeble",
        dp: 5,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่สวมใส่ไม่ตกเป็นเป้าหมายของ Action Card และ Creature ที่สวมใส่ AT+500`,
        image: "images/OriginalMG/Force of Feeble.jpg"
    },
    {
        id: "AR003 MG",
        nameTH: "แนวหน้าหน่วยรบ",
        nameEN: "Front of Armament",
        dp: 3,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เมื่อ Creature ของเราสั่งโจมตี : การ์ดทุกใบของเรา AT+200 จนจบเทิร์น`,
        image: "images/OriginalMG/Front of Armament.jpg"
    },
    {
        id: "AR004 MG",
        nameTH: "สัญลักษณ์แห่งความกตัญญู",
        nameEN: "Gratitude Sign",
        dp: 3,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เมื่อ Creature ที่สวมใส่สั่งโจมตี : ผู้เล่นที่ถูกโจมตีแสดงการ์ดบนมือ และเราเลือกทิ้งการ์ดใบนั้นได้ 1 ใบ`,
        image: "images/OriginalMG/Gratitude Sign.jpg"
    },
    {
        id: "AR005 MG",
        nameTH: "อารักขาชั่วขณะ",
        nameEN: "Guard the Right",
        dp: 3,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่สวมใส่ไม่สามารถตกเป็นเป้าหมายการโจมตีได้ (1 เทิร์น)`,
        image: "images/OriginalMG/Guard the Right.jpg"
    },
    {
        id: "AR006 MG",
        nameTH: "พลังแห่งการทำลายล้าง",
        nameEN: "Power of Destroy",
        dp: 3,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> • ถ้า Creature ที่สวมใส่มี DF ตั้งแต่ 600 ขึ้นไป : AT+800 <br> • ถ้า Creature ที่สวมใส่มี DF น้อยกว่า 600 : AT+300`,
        image: "images/OriginalMG/Power of Destroy.jpg"
    },
    {
        id: "AR007 MG",
        nameTH: "จิตวิญญานแห่งผู้เสียสละ",
        nameEN: "Spirits of Sacrifice",
        dp: 2,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่สวมใส่ลด AT ตามค่า DP ของการ์ดที่ทิ้ง x100`,
        image: "images/OriginalMG/Spirits of Sacrifice.jpg"
    },
    {
        id: "AR008 MG",
        nameTH: "สัญลักษณ์แห่งการล่มสลาย",
        nameEN: "Symbol of Ruin",
        dp: 2,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เมื่อ Creature ที่สวมใส่ตกเป็นเป้าหมายการโจมตี : นำการ์ดใบนี้และ Creature ตัวที่สั่งโจมตีลงสุสาน`,
        image: "images/OriginalMG/Symbol of Ruin.jpg"
    },
    {
        id: "AR009 MG",
        nameTH: "พรสวรรค์ที่เลวร้าย",
        nameEN: "Terrible Talent",
        dp: 2,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่สวมใส่ไม่สามารถใช้ Skill ได้`,
        image: "images/OriginalMG/Terrible Talent.jpg"
    },
    {
        id: "AR010 MG",
        nameTH: "กองทหารกระหายเลือด",
        nameEN: "Troop of Blood",
        dp: 2,
        type: "Armor",
        set: "ออริจินอล",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เมื่อ Creature ที่สวมใส่สั่งโจมตี : เพิ่ม AT ตามค่า DP ของการ์ดที่ทิ้ง x100 จนจบเทิร์น`,
        image: "images/OriginalMG/Troop of Blood.jpg"
    },

    ////////////////////////////////Field/////////////

    {
id: "FD001 MG",
nameTH: "พื้นที่ท้องทะเล",
nameEN: "Lagoon Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "สัตว์น้ำ",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Creature เผ่าสัตว์น้ำทุกใบ ลดค่า DP ในการใช้ Skill ลง 1`
,
image: "images/OriginalMG/Lagoon Field.jpg"
},

{
id: "FD002 MG",
nameTH: "พื้นที่ทุ่งราบ",
nameEN: "Plains Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "มีเขา",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Creature เผ่ามีเขาที่สวมใส่ Armor Card อยู่ทุกใบ สามารถสั่งโจมตีได้ 2 ครั้ง`
,
image: "images/OriginalMG/Plains Field.jpg"
},

{
id: "FD003 MG",
nameTH: "พื้นที่ป่าดงดิบ",
nameEN: "Rainforest Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "คอยาว",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature เผ่าคอยาวใบไหนก็ตาม ตกเป็นเป้าหมายการโจมตี <br> ลดพลังโจมตีของการ์ดที่โจมตีมา AT-300 จนจบเทิร์น`
,
image: "images/OriginalMG/Rainforest Field.jpg"
},

{
id: "FD004 MG",
nameTH: "พื้นที่หนองน้ำ",
nameEN: "Swamp Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "มีเกราะหางหนาม",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Creature เผ่ามีเกราะหางหนามทุกใบ เพิ่ม AT และ DF ตามจำนานการ์ดเผ่ามีเกราะหางหนามที่อยู่ใน Defense line ทุกใบ x100`
,
image: "images/OriginalMG/Swamp Field.jpg"
},

{
id: "FD005 MG",
nameTH: "พื้นที่เทือกเขา",
nameEN: "Valley Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "มีปีก",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Creature เผ่ามีปีกทุกใบสามารถสั่งโจมตีการ์ดที่ Defense line ได้ แม้ว่าจะมีการ์ดใน Attack line`
,
image: "images/OriginalMG/Valley Field.jpg"
},

{
id: "FD006 MG",
nameTH: "พื้นที่ภูเขาไฟ",
nameEN: "Volcano Field",
dp: 3,
type: "Field",
set: "ออริจินอล",
clan: "สองขา",
ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature เผ่า สองขาใบใดก็ตามสั่งโจมตี เพิ่ม AT+200`
,
image: "images/OriginalMG/Volcano Field.jpg"
},
];