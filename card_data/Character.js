const CharacterData = [
	{
        id: "DC001 JU",
        nameTH: "แบมบิแรปเตอร์ เพลิง",
        nameEN: "Bambiraptor Fire",
        dp: 2,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ตัวนี้เข้ามาในสนาม : ค้นหาการ์ดที่ชื่อ "Bambiraptor Fire" จาก Deck แสดงแล้วนำขึ้นมือ จากนั้นสับ Deck`,
        image: "images/Character/Bambiraptor Fire.jpg"
    },
    {
        id: "DC002 JU",
        nameTH: "บารีโอนิกซ์ ทองคำ",
        nameEN: "Golden Baryonyx",
        dp: 3,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ตัวนี้โจมตี : จะโจมตีเข้าค่า DF ของเป้าหมายแทนค่า AT`,
        image: "images/Character/Golden Baryonyx.jpg"
    },
    {
        id: "DC003 JU",
        nameTH: "เรด คาร์โนทอรัส",
        nameEN: "Red Carnotaurus",
        dp: 3,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> จ่าย 2 DP และทิ้งการ์ดเผ่าสองขา 1 ใบ : สั่ง Creature 1 ใบลด AT-300 จนจบเทิร์น`,
        image: "images/Character/Red Carnotaurus.jpg"
    },
    {
        id: "DC004 JU",
        nameTH: "ซอมบี้ คอมซอกนาทัส",
        nameEN: "Zombie Compsognathus",
        dp: 2,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อมีการ์ดกลับขึ้นมือคู่ต่อสู้จากสนาม : Creature 1 ใบเพิ่ม AT+200 จนจบเทิร์น`,
        image: "images/Character/Zombie Compsognathus.jpg"
    },
    {
        id: "D007 JU",
        nameTH: "สไปโนซอรัส",
        nameEN: "Spinosaurus",
        dp: 4,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ตัวนี้ตกเป็นเป้าหมายการโจมตี : สลับค่า AT และ DF ของ Creature ตัวนี้จนจบเทิร์น <br> • <span class="hlauto">Auto</span> เมื่อ Creature ตัวนี้เข้ามาในสนาม : Creature ของผู้เล่นคนอื่นทุกคนที่มีค่า DF ต่ำกว่า Creature ตัวนี้ จะลด AT-500 จนจบเทิร์น`,
        image: "images/Character/Spinosaurus.jpg"
    },
    {
        id: "DC006 JU",
        nameTH: "ไชน์ เทอริซิโนซอรัส",
        nameEN: "Shine Therizinosaurus",
        dp: 3,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> จ่าย 2 DP : สั่งให้ Creature 1 ใบลด AT-200 จนจบเทิร์น`,
        image: "images/Character/Shine Therizinosaurus.jpg"
    },
    {
        id: "D009 JU",
        nameTH: "ไทแรนโนซอรัส",
        nameEN: "Tyrannosaurus",
        dp: 5,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> {Fast Run} (เมื่อ Creature ตัวนี้เข้ามาในสนาม สามารถสั่งการได้ทันที) <br> • <span class="hlauto">Auto</span> เมื่อ Creature ตัวนี้สั่งโจมตี : Creature เผ่าสองขาทุกใบฝ่ายเราเพิ่ม AT+200 จนจบเทิร์น`,
        image: "images/Character/Tyrannosaurus.jpg"
    },
    {
        id: "DC008 JU",
        nameTH: "พลั๊ก ยูทาห์แรปเตอร์",
        nameEN: "Plug Utahraptor",
        dp: 2,
        type: "Creature",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ทิ้ง Creature 1 ใบของเราจากบนมือ : สั่งให้ Creature 1 ใบเพิ่ม AT+200 จนจบเทิร์น`,
        image: "images/Character/Plug Utahraptor.jpg"
    },
	
	

    {
    id: "DC014 JU",
    nameTH: "เอเมอรอล อีแลสโมซอรัส",
    nameEN: "Emerald Elasmosaurus",
    dp: 4,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> ถ้ามีการ์ดอีกฝ่ายติดสภาวะผิดปกติ และไม่มีการ์ดใน Attack line ของผู้เล่นอีกฝ่าย การ์ดใบนี้ข้ามไปโจมตี Master Card ได้ <br> <span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 3)</span> ย้ายสภาวะผิดปกติทุกอย่างจากการ์ดทุกใบในสนามไปไว้ที่การ์ดเป้าหมาย 1 ใบ`,
    image: "images/Character/Emerald Elasmosaurus.jpg"
},

{
    id: "DC015 JU",
    nameTH: "ไฮโบดัส เรด",
    nameEN: "Hybodus Red",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 2)</span> สั่งให้การ์ด 1 ใบติดสภาวะบาดเจ็บ ลดพลังโจมตีลง 200`,
    image: "images/Character/Hybodus Red.jpg"
},

{
    id: "DC016 JU",
    nameTH: "ไจแอนท์ โรเมลโอซอรัส",
    nameEN: "Giant Rhomaleosaurus",
    dp: 5,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อมีการ์ดของผู้เล่นคนอื่นกลับขึ้นมือจากสนาม ให้การ์ด 1 ใบติดสภาวะหลับ 1 เทิร์น และลดพลังป้องกันลง 300 จนจบเทิร์น`,
    image: "images/Character/Giant Rhomaleosaurus.jpg"
},

{
    id: "DC017 JU",
    nameTH: "คิลลิ่ง อิกธิโอซอรัส",
    nameEN: "Killing Ichthyosaurus",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> ตราบเท่าที่มีการ์ดชื่อ "Killing Ichthyosaurus" ในสนามฝ่ายเรา 2 ใบขึ้นไป การ์ดเผ่าสัตว์น้ำลดค่า DP ลง 1`,
    image: "images/Character/Killing Ichthyosaurus.jpg"
},

{
    id: "DC018 JU",
    nameTH: "ดีป มูเรโนซอรัส",
    nameEN: "Deep Muraenosaurus",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 2)</span> ให้การ์ด 1 ใบได้รับสภาวะหลับ 1 เทิร์น`,
    image: "images/Character/Deep Muraenosaurus.jpg"
},

{
    id: "DC020 JU",
    nameTH: "แบล็ค ออปทัลโมซอรัส",
    nameEN: "Black Ophthalmosaurus",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 2)</span> รักษาสภาวะผิดปกติ 1 ชนิดให้การ์ด 1 ใบ`,
    image: "images/Character/Black Ophthalmosaurus.jpg"
},

{
    id: "DC009 JU",
    nameTH: "บล็อดดี้ ไดโมโฟดอน",
    nameEN: "Bloody Dimorphodon",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม : ทิ้งการ์ดเผ่าสัตว์น้ำ 1 ใบ สั่งให้ Dino Card 1 ใบ ลด DF-300 และได้รับสภาวะหลับ 1 เทิร์น`,
    image: "images/Character/Bloody Dimorphodon.jpg"
},

{
    id: "DC010 JU",
    nameTH: "บลู นิกโตซอรัส",
    nameEN: "Blue Nyctosaurus",
    dp: 3,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นเป้าหมายการโจมตี : นำ Dino Card ที่โจมตีขึ้นมือหลังจบการต่อสู้`,
    image: "images/Character/Blue Nyctosaurus.jpg"
},

{
    id: "DC011 JU",
    nameTH: "เควตซัลโคเเอตลัส เค",
    nameEN: "Quetzalcoatlus K",
    dp: 5,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> Fast Run [การ์ดนี้สามารถใช้งานได้ทันทีที่ลงสนาม] <br> • <span class="hlcont">Cont.</span> สามารถโจมตี Dino Card ใน DF Line ได้ถึงแม้จะมี Dino Card ใน AT Line <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม : นำการ์ดเผ่ามีปีก 1 ใบในสนามฝ่ายเราขึ้นมือ`,
    image: "images/Character/Quetzalcoatlus K.jpg"
},

{
    id: "DC012 JU",
    nameTH: "เดวิล แรมโฟริงคัส",
    nameEN: "Devil Rhamphorhynchus",
    dp: 3,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "มีปีก",
    ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 3)</span> สั่งให้ Dino Card ฝ่ายเรา 1 ใบได้รับสภาวะหลับ 2 เทิร์น แล้วนำ Dino Card เป้าหมาย 1 ใบกลับขึ้นมือ`,
    image: "images/Character/Devil Rhamphorhynchus.jpg"
},

{
    id: "DC013 JU",
    nameTH: "เนโอ ทูพูซัวรา",
    nameEN: "Neo Tupuxuara",
    dp: 2,
    type: "Creature",
    set: "คาแร็คเตอร์",
    clan: "มีปีก",
    ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual (DP 3)</span> ทิ้งการ์ดนี้ : ค้นกองการ์ดหา "Tornado" 1 ใบ แสดงแล้วนำขึ้นมือ`,
    image: "images/Character/Neo Tupuxuara.jpg"
},

    {
        id: "ARC001 MG",
        nameTH: "สุดยอดกรงเล็บ",
        nameEN: "Hyper Talon",
        dp: 3,
        type: "Armor",
        set: "คาแร็คเตอร์",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> สวมใส่ได้เฉพาะเผ่า 2 ขา : เพิ่ม AT+400 <br> • Creature ที่สวมใส่มีความสามารถ {Fast Run} (สามารถสั่งใช้งานได้ทันทีในเทิร์นที่เข้าสนาม)`,
        image: "images/Character/Hyper Talon.jpg"
    },
    {
        id: "ARC002 MG",
        nameTH: "หางวีรชน",
        nameEN: "Hero Tail",
        dp: 3,
        type: "Armor",
        set: "คาแร็คเตอร์",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> สวมใส่ได้เฉพาะเผ่ามีเกราะหางหนาม : เพิ่ม DF+300 <br> • Creature ที่สวมใส่ไม่สามารถรวมฝูงหรือรวมร่างได้ <br> • Creature ที่รวมฝูงหรือรวมร่างอยู่ ไม่สามารถสั่งโจมตี Creature ที่สวมใส่เกราะนี้ได้ <br> • จ่าย DP 5 : นำการ์ดใบนี้จากสุสานกลับขึ้นมือ`,
        image: "images/Character/Hero Tail.jpg"
    },
    {
        id: "ARC003 MG",
        nameTH: "วงแหวนแห่งการอัญเชิญ",
        nameEN: "Circlet of Call",
        dp: 3,
        type: "Armor",
        set: "คาแร็คเตอร์",
        clan: "มีปีก",
        ability: `<span class="hlabi">Effect :</span> <br> สวมใส่ได้เฉพาะเผ่ามีปีก : เพิ่ม AT+300 <br> • เมื่อการ์ดใบนี้ตกสุสาน : สามารถค้นหา Creature เผ่ามีปีกที่มี DP ไม่เกิน 3 จากใน Deck ขึ้นมือได้ 1 ใบ`,
        image: "images/Character/Circlet of Call.jpg"
    },
    {
        id: "ARC004 MG",
        nameTH: "ตรีศูลของไซเรน",
        nameEN: "Siren Triden",
        dp: 3,
        type: "Armor",
        set: "คาแร็คเตอร์",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Effect :</span> <br> สวมใส่ได้เฉพาะเผ่าสัตว์น้ำ : เพิ่ม AT+300 <br> • Creature ที่ต่อสู้กับ Creature ที่สวมใส่เกราะนี้ จะได้รับสภาวะบาดเจ็บ (ลด DF-300) <br> • เมื่อการ์ดใบนี้ตกสุสาน : นำ Action Card 1 ใบที่มี DP ไม่เกิน 3 จากใน Deck ขึ้นมือ`,
        image: "images/Character/Siren Triden.jpg"
    },
];