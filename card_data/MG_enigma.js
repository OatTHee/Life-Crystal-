const MG_enigmaData = [
    {
        id: "AC015 MG",
        nameTH: "หลุมดำ",
        nameEN: "Black Hole",
        dp: 5,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำ Creature ที่อยู่ในสนามทั้งหมดของผู้เล่นทุกคนออกจากเกม จากนั้นผู้เล่นทุกคนจั่วการ์ด 3 ใบ`,
        image: "images/EnigmaMG/Black Hole.jpg"
    },
    {
        id: "AC016 MG",
        nameTH: "พายุใหญ่ที่หายไป",
        nameEN: "Tempest",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> การ์ดทุกใบในสนามของผู้เล่นทุกคนกลับขึ้นมือยกเว้นการ์ด Master`,
        image: "images/EnigmaMG/Tempest.jpg"
    },
    {
        id: "AC017 MG",
        nameTH: "ละอองดาวประทานพร",
        nameEN: "Blessing Stardust",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบเพิ่ม DF+400 จนจบเทิร์น <br> • จ่าย DP 4 : นำการ์ดใบนี้จากสุสานกลับขึ้นมือ`,
        image: "images/EnigmaMG/Blessing Stardust.jpg"
    },
    {
        id: "AC018 MG",
        nameTH: "ความร้ายกาจครั้งสุดท้าย",
        nameEN: "Last Fatal",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบ เพิ่ม AT+400 จนจบเทิร์น <br> • จ่าย DP 4 : นำการ์ดใบนี้จากสุสานกลับขึ้นมือ`,
        image: "images/EnigmaMG/Last Fatal.jpg"
    },
    {
        id: "AC019 MG",
        nameTH: "สายลมแห่งการเปลี่ยนแปลง",
        nameEN: "Wind Of Change",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สลับ Creature ที่ Attack line กับ Defense line ของผู้เล่น 1 คน`,
        image: "images/EnigmaMG/Wind Of Change.jpg"
    },
    {
        id: "AC020 MG",
        nameTH: "แรงโน้มถ่วงเกินพิกัด",
        nameEN: "Gravitation Overload",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบลด DF-300 จนจบเทิร์น <br> • จ่าย DP 4 : นำการ์ดใบนี้จากสุสานมาขึ้นมือ`,
        image: "images/EnigmaMG/Gravitation Overload.jpg"
    },
    {
        id: "AC021 MG",
        nameTH: "คลื่นไหวสะเทือน",
        nameEN: "Shock Wave",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ทำลาย Armor Card ทั้งหมดของ Creature เป้าหมาย 1 ใบ`,
        image: "images/EnigmaMG/Shock Wave.jpg"
    },
    {
        id: "AC022 MG",
        nameTH: "บัลลังก์เยือกแข็ง",
        nameEN: "Frozen Throne",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ในสนามทั้งหมดไม่สามารถสั่งโจมตีหรือใช้ Skill ได้เป็นเวลา 2 เทิร์น (การ์ดนี้ใช้ได้เฉพาะ Turn โจมตีเท่านั้น) <br> <span class="hlred">*(ใส่ได้ 1 ใบในเด็ค)*</span>`,
        image: "images/EnigmaMG/Frozen Throne.jpg"
    },
    {
        id: "AC023 MG",
        nameTH: "ควบคุมมนตรา",
        nameEN: "Magic Control",
        dp: 0,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สามารถใช้งาน Action ที่เลือกได้โดยใช้ค่าร่าย X (X = ค่า DP ของการ์ดนั้น) ไม่สามารถใช้กับ Action Card ที่มี DP 5 ได้`,
        image: "images/EnigmaMG/Magic Control.jpg"
    },
    {
        id: "AC024 MG",
        nameTH: "การฟิวชั่นขั้นสุดท้าย",
        nameEN: "Final Fusion",
        dp: 5,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สามารถรวมร่าง Creature ได้ 3 ใบ โดยที่การ์ดทุกใบจะต้องมีเผ่าแตกต่างกัน AT และ DF ของการ์ดรวมร่างเท่ากับผลรวมของทั้ง 3 ใบ และสามารถใช้ Skill ของการ์ดวัตถุดิบได้ทุกใบ (ต้องทิ้ง Armor ของวัตถุดิบลงสุสาน)`,
        image: "images/EnigmaMG/Final Fusion.jpg"
    },
    {
        id: "AC025 MG",
        nameTH: "รุ่งอรุณแห่งความตาย",
        nameEN: "Dawn Of The Dead",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำ Creature ที่ค่าร่ายไม่เกิน 3 ที่เผ่าต่างกัน 2 ใบจากสุสานกลับเข้ามาในสนาม สามารถสั่งการได้ทันที และเมื่อจบเทิร์นจะต้องนำกลับเข้าสุสาน`,
        image: "images/EnigmaMG/Dawn Of The Dead.jpg"
    },
    {
        id: "AC026 MG",
        nameTH: "จุดจบของผู้ที่แข็งแกร่งที่สุด",
        nameEN: "End Of The Strongest",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สั่งทำลาย Creature ทุกใบในสนามที่มีค่าร่ายมากกว่า 3`,
        image: "images/EnigmaMG/End Of The Strongest.jpg"
    },
    {
        id: "AC027 MG",
        nameTH: "เพิกถอนประกาศิต",
        nameEN: "Cancel Command",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ยกเลิกคำสั่งโจมตีของ Creature 1 ใบ`,
        image: "images/EnigmaMG/Cancel Command.jpg"
    },
    {
        id: "AC028 MG",
        nameTH: "คืนชีพทักษะ",
        nameEN: "Resurrection Skill",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ใช้ความสามารถของ Action Card ในสุสานของใครก็ได้อีกครั้ง.`,
        image: "images/EnigmaMG/Resurrection Skill.jpg"
    },
    {
        id: "AC029 MG",
        nameTH: "ระเบิดฝูง",
        nameEN: "Destroy The Assembly",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ทำลาย Creature ที่รวมฝูงอยู่ 1 ฝูง`,
        image: "images/EnigmaMG/Destroy The Assembly.jpg"
    },
    {
        id: "AC030 MG",
        nameTH: "การต่อรองด้วยชีวิต",
        nameEN: "Negotiation Of Life",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ทิ้งการ์ดบนมือ 1 ใบ เลือก Creature 1 ใบให้กลับเข้ากองการ์ดเจ้าของ`,
        image: "images/EnigmaMG/Negotiation Of Life.jpg"
    },
    {
        id: "AC031 MG",
        nameTH: "เสื่อมสมรรถภาพ",
        nameEN: "Loss Of Ability",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เลือก Creature 1 ใบ การ์ดนั้นไม่สามารถใช้ความสามารถได้จนกว่าการ์ดนั้นจะตกสุสาน`,
        image: "images/EnigmaMG/Loss Of Ability.jpg"
    },
    {
        id: "AC032 MG",
        nameTH: "โปรโมชั่นพิเศษ",
        nameEN: "Privilege",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature 1 ใบสามารถใช้ Skill ได้อีกครั้งโดยไม่เสียค่าร่าย`,
        image: "images/EnigmaMG/Privilege.jpg"
    },
    {
        id: "AC033 MG",
        nameTH: "ปลดยศ",
        nameEN: "Dismissal",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ยกเลิกความสามารถของ Armor Card ในสนาม 1 ใบ`,
        image: "images/EnigmaMG/Dismissal.jpg"
    },
    {
        id: "AC034 MG",
        nameTH: "คืนชีพมนตรา",
        nameEN: "Magic Reborn",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำ Action Card ในสุสานฝั่งผู้ใช้กลับเข้ากองการ์ดแล้วสลับกองการ์ดนั้น`,
        image: "images/EnigmaMG/Magic Reborn.jpg"
    },
    {
        id: "AC035 MG",
        nameTH: "ความภูมิใจของซอริสเซีย",
        nameEN: "Proud Of Saurischia",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> Creature เผ่า 2 ขาทุกใบของเราปรับ AT+300 จนจบเทิร์น และ Creature ที่ไม่ใช่เผ่า 2 ขาปรับ AT+200 จนจบเทิร์น`,
        image: "images/EnigmaMG/Proud Of Saurischia.jpg"
    },
    {
        id: "AC036 MG",
        nameTH: "การแลกเปลี่ยนของเซราทอปซิด",
        nameEN: "Ceratopsidae Exchange",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> ทิ้งการ์ด 1 ใบ, จั่วการ์ด 2 ใบ (หากที่ทิ้งเป็นเผ่ามีเขา สามารถค้นหา Creature เผ่ามีเขา 1 ใบจากเด็คขึ้นมือได้)`,
        image: "images/EnigmaMG/Ceratopsidae Exchange.jpg"
    },
    {
        id: "AC037 MG",
        nameTH: "ระงับเวทย์",
        nameEN: "Magic Denied",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> กำหนด Action Card เป้าหมายที่คงสภาพอยู่ในสนาม 1 ใบ และทำลายเป้าหมายนั้น`,
        image: "images/EnigmaMG/Magic Denied.jpg"
    },
    {
        id: "AC038 MG",
        nameTH: "อุบายของกิ้งก่ามีปีก",
        nameEN: "Winged Reptiles's Trick",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่มีค่าร่าย 2 หรือต่ำกว่าที่คู่ต่อสู้ควบคุมไม่สามารถสั่งการได้ (2 เทิร์น) <br> • ทิ้ง Creature เผ่ามีปีก 2 ใบ : นำการ์ดใบนี้กลับขึ้นมือ`,
        image: "images/EnigmaMG/Winged Reptiles's Trick.jpg"
    },
    {
        id: "AC039 MG",
        nameTH: "สารเจือปนในของเสีย",
        nameEN: "Temper in Waste",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ผู้เล่นทั้งหมดไม่สามารถนำการ์ดในสุสานกลับเข้าสนามได้ (4 เทิร์น)`,
        image: "images/EnigmaMG/Temper in Waste.jpg"
    },
    {
        id: "AC040 MG",
        nameTH: "หยุดการต่อสู้",
        nameEN: "Break The Fight",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เลือก Creature ที่กำลังต่อสู้กัน 1 กลุ่ม หยุดกระบวนการต่อสู้ทั้งหมด`,
        image: "images/EnigmaMG/Break The Fight.jpg"
    },
    {
        id: "AC041 MG",
        nameTH: "หยุดทักษะ",
        nameEN: "Stop Skill",
        dp: 1,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> หยุดกระบวนการใช้ Skill ของเป้าหมาย`,
        image: "images/EnigmaMG/Stop Skill.jpg"
    },
    {
        id: "AC042 MG",
        nameTH: "พลังแห่งญาติมิตร",
        nameEN: "Power Of Suborder",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เลือกอันดับย่อย 1 ชนิด จาก Creature ของเรา Creature ทั้งหมดในอันดับย่อยนั้นปรับค่า AT+400/DF+400 (2 เทิร์น)`,
        image: "images/EnigmaMG/Power Of Suborder.jpg"
    },
    {
        id: "AC043 MG",
        nameTH: "ล้างสุสาน",
        nameEN: "Clean the Graveyard",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำการ์ดทุกใบในสุสานของผู้เล่นทั้งหมดออกจากเกม`,
        image: "images/EnigmaMG/Clean the Graveyard.jpg"
    },
	{
        id: "AC044 MG",
        nameTH: "ทักษะแห่งเดจาวู",
        nameEN: "Sight Of Dejavu",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เราสามารถใช้ Action Card ในสุสานของเราได้ (1 เทิร์น) โดย Action Card ที่ตกสุสานจะถูกนำออกจากเกมแทน`,
        image: "images/EnigmaMG/Sight Of Dejavu.jpg"
    },
    {
        id: "AC045 MG",
        nameTH: "ทดลองเสี่ยง",
        nameEN: "Try to Risk",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เราจั่วการ์ด 4 ใบ จากนั้นสุ่มทิ้งการ์ดบนมือ 2 ใบ`,
        image: "images/EnigmaMG/Try to Risk.jpg"
    },
   
    {
        id: "AC046 MG",
        nameTH: "ชีวิตหวนคืนกลับ",
        nameEN: "Life Restoration",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เลือกนำการ์ดในสุสานของเรา 1-3 ใบ สับเข้า Deck และจั่วการ์ด 1 ใบ`,
        image: "images/EnigmaMG/Life Restoration.jpg"
    },
    {
        id: "AC047 MG",
        nameTH: "กระจกเงาสะท้อน",
        nameEN: "Reflective Mirror",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เมื่อการ์ดตกเป็นเป้าหมายของ Action Card สามารถเปลี่ยนเป้าหมายของ Action นั้นได้ (3 เทิร์น)`,
        image: "images/EnigmaMG/Reflective Mirror.jpg"
    },
    {
        id: "AC048 MG",
        nameTH: "กระเทาะไข่",
        nameEN: "Crack The Egg",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> ค้นหา Creature 1 ใบจาก Deck นำขึ้นมือแล้วสับ Deck`,
        image: "images/EnigmaMG/Crack The Egg.jpg"
    },
    {
        id: "AC049 MG",
        nameTH: "มรดกเหยื่อ",
        nameEN: "Victim's Legacy",
        dp: 3,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> นำ Creature ที่เข้าสุสานในเทิร์นนี้ทั้งหมดสับเข้า Deck จากนั้นเปิดการ์ดบนสุด X ใบ (X=จำนวนที่สับเข้า) เลือก Creature 1 ใบเข้าสนาม`,
        image: "images/EnigmaMG/Victim's Legacy.jpg"
    },
	 {
        id: "AC050 MG",
        nameTH: "พาวเวอร์ ดีพี รูเล็ต",
        nameEN: "Power DP Roulette",
        dp: 5,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> แสดงการ์ดบนสุดของ Deck 3 ใบ : เรารับ DP ตามค่าร่ายรวมของการ์ดที่แสดง (รวมสูงสุดไม่เกิน 10 จุด) จากนั้นนำการ์ดที่แสดงและการ์ดใบนี้ออกจากเกม`,
        image: "images/EnigmaMG/Power DP Roulette.jpg"
    },
    {
        id: "AC051 MG",
        nameTH: "สับเปลี่ยนโลงศพ",
        nameEN: "Swap The Coffin",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> (ใช้ได้เฉพาะเทิร์นตนเอง) นำ Creature ของเรา 1 ใบเข้าสุสาน เพื่อเรียก Creature 1 ใบจากสุสานเข้าสนาม (หากเผ่าตรงกัน AT/DF+200 ตลอดเกม)`,
        image: "images/EnigmaMG/Swap The Coffin.jpg"
    },
    {
        id: "AC052 MG",
        nameTH: "การเริ่มแมทที่ได้เปรียบ",
        nameEN: "Advantage Rematch",
        dp: 6,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สับการ์ดทุกใบในสนาม มือ และสุสานเข้ากอง จั่ว 5 ใบ และลง Creature DP ไม่เกิน 5 ได้ 1 ใบ (สั่งการไม่ได้ในเทิร์นนี้) <br> <span class="hlred">*(BANNED)*</span>`,
        image: "images/EnigmaMG/Advantage Rematch.jpg"
    },
    {
        id: "AC053 MG",
        nameTH: "ยิงแรปเตอร์",
        nameEN: "Fire a Raptor",
        dp: 2,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สร้างความเสียหาย-ความร้อน 200 จุดแก่เป้าหมาย`,
        image: "images/EnigmaMG/Fire a Raptor.jpg"
    },
    {
        id: "AC054 MG",
        nameTH: "ย่างสด",
        nameEN: "Flesh Cremate",
        dp: 5,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> สร้างความเสียหาย-ความร้อน 400 จุด (หากทิ้งการ์ด 1 ใบ จะสร้างความเสียหาย 700 จุดแทน)`,
        image: "images/EnigmaMG/Flesh Cremate.jpg"
    },
    {
        id: "AC055 MG",
        nameTH: "สิงร่าง",
        nameEN: "Oversoul",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> เลือก Creature ในสุสาน (DP ไม่เกิน 4) นำมาแทนที่ Creature เป้าหมายในสนามเป็นเวลา 2 เทิร์น`,
        image: "images/EnigmaMG/Oversoul.jpg"
    },
    {
        id: "AC056 MG",
        nameTH: "ผู้คุ้มครอง",
        nameEN: "Guardianship",
        dp: 4,
        type: "Action",
        set: "อินิกม่า",
        clan: "",
        ability: `<span class="hlabi">Effect :</span> <br> Creature ที่รวมร่างจะไม่รับผลของ Action Card เป็นเวลา 2 เทิร์น`,
        image: "images/EnigmaMG/Guardianship.jpg"
    },
	
	/////////////////////////////
	
	{
    id: "AR011 MG",
    nameTH: "เลเซอร์นำวิถีเหนือระยะ",
    nameEN: "Over Range Laser",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "คอยาว",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+200 สามารถสั่งโจมตีจาก DF Line โดยใช้ค่า AT ได้ เมื่อต่อสู้กับเผ่ามีปีก เพิ่ม AT+500`,
    image: "images/EnigmaMG/Over Range Laser.jpg"
},

{
    id: "AR012 MG",
    nameTH: "เขี้ยวอำมหิต",
    nameEN: "Brutal Fang",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "สองขา",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+350 ให้ Creature เป้าหมาย 1 ใบ <br> <span class="hlmanual">Manual</span> ใช้ DP 4 นำการ์ดใบนี้จากในสุสานกลับขึ้นมือ`,
    image: "images/EnigmaMG/Brutal Fang.jpg"
},

{
    id: "AR013 MG",
    nameTH: "วิงครอสวิง",
    nameEN: "Wing X Wing",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีปีก",
    ability: `<span class="hlabi">Skill :</span> <br> • เพิ่ม AT+200 เมื่อ Creature ที่สวมใส่การ์ดใบนี้ถูกทำลาย ฝ่ายที่โจมตี Creature จะต้องกลับขึ้นมือ 1 ใบ <br> • <span class="hlmanual">Manual</span> ใช้ DP 3 นำการ์ดใบนี้จากในสุสานกลับขึ้นมือ`,
    image: "images/EnigmaMG/Wing X Wing.jpg"
},

{
    id: "AR014 MG",
    nameTH: "เขาสว่าน",
    nameEN: "Drill Horn",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีเขา",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+200 โจมตีที่ค่า DF ไม่ว่าเป้าหมายจะอยู่ที่ Line ใดก็ตาม`,
    image: "images/EnigmaMG/Drill Horn.jpg"
},

{
    id: "AR015 MG",
    nameTH: "โล่หวนคืนชีวิต",
    nameEN: "Return Shield",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีเกราะหางหนาม",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+200 และ DF+400 เมื่อ Creature ที่สวมใส่ถูกทำลาย การ์ดใบนี้จะตกสุสาน แต่ Creature ใบนั้นจะกลับขึ้นมือ`,
    image: "images/EnigmaMG/Return Shield.jpg"
},

{
    id: "AR016 MG",
    nameTH: "โซนาร์พร้อมรบ",
    nameEN: "Duel Sonar",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Skill :</span> <br> • เพิ่ม AT+300 สามารถเลือกใช้ Skill ได้ 2 ครั้ง แต่ต้องใช้ DP x 2 <br> • <span class="hlmanual">Manual</span> ใช้ DP 3 นำการ์ดใบนี้จากในสุสานกลับขึ้นมือ`,
    image: "images/EnigmaMG/Duel Sonar.jpg"
},

{
    id: "AR017 MG",
    nameTH: "พลังของผู้พิทักษ์",
    nameEN: "Power of Guardian",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> ถ้า Creature ที่สวมใส่มี AT มากกว่าหรือเท่ากับ 600 เพิ่ม DF+900 ถ้า Creature ที่สวมใส่มี AT น้อยกว่า 600 เพิ่ม DF+450`,
    image: "images/EnigmaMG/Power of Guardian.jpg"
},

{
    id: "AR018 MG",
    nameTH: "การเผาไหม้ต้นกำเนิดแห่งไดโน",
    nameEN: "Dinogenesis Burn",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+300 สามารถเพิ่มค่า AT ตามจำนวน DP ที่ใช้ X 100 จนจบเทิร์น`,
    image: "images/EnigmaMG/Dinogenesis Burn.jpg"
},

{
    id: "AR019 MG",
    nameTH: "บีกิสเตอร์",
    nameEN: "Begister",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม DF+300 และไม่สามารถเป็นเป้าหมายของ Skill ไม่สามารถใช้การ์ดใบนี้ร่วมกับการ์ด [Force of Feeble]`,
    image: "images/EnigmaMG/Begister.jpg"
},

{
    id: "AR020 MG",
    nameTH: "อัลเทอนาไทป์",
    nameEN: "Alternatype",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+200 <br> <span class="hlmanual">Manual</span> จ่าย 1 DP + นำ Creature ที่สวมใส่ออกจากเกม : เรารับ DP ตามค่า DP ของ Creature ที่ถูกนำออก x2 (ห้ามใช้กับฝ่ายตรงข้าม)`,
    image: "images/EnigmaMG/Alternatype.jpg"
},

{
    id: "AR021 MG",
    nameTH: "ความเสียหายติดคริติคอล",
    nameEN: "Critical Damage",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่การ์ดนี้ โจมตีสำเร็จ 3 ครั้ง สามารถเลือกทำลาย Creature ในสนามได้อีก 1 ใบ`,
    image: "images/EnigmaMG/Critical Damage.jpg"
},

{
    id: "AR022 MG",
    nameTH: "ป้องกันความเสียหาย",
    nameEN: "Prevent Damage",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบที่สวมใส่ใบนี้ตกเป็นเป้าหมายการโจมตี ลดพลังโจมตีของตัวที่โจมตีมาลง AT-200`,
    image: "images/EnigmaMG/Prevent Damage.jpg"
},

{
    id: "AR023 MG",
    nameTH: "ตีกลับ",
    nameEN: "Repatriate",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP สุ่มเลือกการ์ดในมือฝ่ายตรงข้าม ส่งการ์ดนั้นกลับเข้ากองการ์ดแล้วสลับกอง`,
    image: "images/EnigmaMG/Repatriate.jpg"
},

{
    id: "AR024 MG",
    nameTH: "สุดขีดความสามารถ",
    nameEN: "Extreme Ability",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่การ์ดใบนี้ สามารถใช้ Skill ได้ 2 ครั้ง`,
    image: "images/EnigmaMG/Extreme Ability.jpg"
},

{
    id: "AR025 MG",
    nameTH: "โรคระบาดมรณะ",
    nameEN: "Dead Plague",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่การ์ดนี้ ติดสภาวะติดพิษ ลด AT-100 และ DF-100 ต่อ 1 เทิร์นจนกว่าการ์ดนี้จะตกสุสาน`,
    image: "images/EnigmaMG/Dead Plague.jpg"
},

{
    id: "AR026 MG",
    nameTH: "ภูมิปัญญาอันเหนือชั้น",
    nameEN: "Superior Knowledge",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP และใช้ Skill ของ Creature ใบใดก็ได้ในสุสาน`,
    image: "images/EnigmaMG/Superior Knowledge.jpg"
},

{
    id: "AR027 MG",
    nameTH: "ควบคุมศพ",
    nameEN: "Corpse Control",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เมื่อ Creature สวมใส่การ์ดใบนี้ สามารถนำ Creature 1 ใบในสุสานมารวมฝูงได้`,
    image: "images/EnigmaMG/Corpse Control.jpg"
},

{
    id: "AR028 MG",
    nameTH: "คุ้มกะลาหัว",
    nameEN: "Safeguard",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่การ์ดใบนี้ เมื่อถูกทำลายให้นำกลับขึ้นมือแทนการส่งลงสุสาน`,
    image: "images/EnigmaMG/Safeguard.jpg"
},

{
    id: "AR029 MG",
    nameTH: "เครื่องจองเวรจองกรรม",
    nameEN: "Vindicate",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่การ์ดนี้ หากไม่สามารถทำลายได้ภายใน 2 เทิร์น จะถูกส่งลงสุสาน`,
    image: "images/EnigmaMG/Vindicate.jpg"
},

{
    id: "AR030 MG",
    nameTH: "การเพิ่มพูน",
    nameEN: "Augment",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+300 ให้ Creature ที่สวมใส่ และเมื่อสั่งโจมตีเพิ่ม AT+300`,
    image: "images/EnigmaMG/Augment.jpg"
},

{
    id: "AR031 MG",
    nameTH: "เดือยเหล็ก 2 ใบมีด",
    nameEN: "Double Edge Steel",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "สองขา",
    ability: `<span class="hlabi">Skill :</span> <br> • เพิ่ม AT+200 <br> • เมื่อ Creature ที่สวมใส่ตกเป็นเป้าหมายของ Action Card จ่าย DP 1 : ปรับเพิ่ม AT+200 จนจบเทิร์น`,
    image: "images/EnigmaMG/Double Edge Steel.jpg"
},

{
    id: "AR032 MG",
    nameTH: "ปลอกคอพลังงาน",
    nameEN: "Energetic Collar",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีเขา",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่ เพิ่ม AT+300/DF+300`,
    image: "images/EnigmaMG/Energetic Collar.jpg"
},

{
    id: "AR033 MG",
    nameTH: "ขาหน้าไม่ไหวติง",
    nameEN: "Static Front Legs",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีเกราะหางหนาม",
    ability: `<span class="hlabi">Skill :</span> <br> • เพิ่ม AT+300/DF+400 <br> • เมื่อ Creature ที่สวมใส่ตกเป็นเป้าหมายการโจมตี ปรับเพิ่ม AT+100/DF+200 จนจบการต่อสู้`,
    image: "images/EnigmaMG/Static Front Legs.jpg"
},

{
    id: "AR034 MG",
    nameTH: "เครื่องร่อนลมพายุ",
    nameEN: "Gale Glider",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "มีปีก",
    ability: `<span class="hlabi">Skill :</span> <br> • เพิ่ม AT+200/DF+100 <br> • เมื่อ Creature ที่สวมใส่ออกโจมตี ปรับเพิ่ม AT+200 จนจบการต่อสู้ <br> • <span class="hlmanual">Manual</span> ใช้ DP 2 จุด นำ Armor Card ใบนี้และ Creature ที่สวมใส่กลับเข้ามือ`,
    image: "images/EnigmaMG/Gale Glider.jpg"
},

{
    id: "AR035 MG",
    nameTH: "โซ่คล้องคู่หู",
    nameEN: "Duo Chain",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "คอยาว",
    ability: `<span class="hlabi">Skill :</span> <br> เมื่อเข้าสนาม : กำหนด Creature ที่มี DP 4 ขึ้นไปในไลน์เดียวกัน 1 ตัว ตราบที่ Armor นี้ยังสวมอยู่ Creature นั้นเพิ่ม DF+500 และไม่สามารถถูกแยกการรวมฝูง`,
    image: "images/EnigmaMG/Duo Chain.jpg"
},

{
    id: "AR036 MG",
    nameTH: "เขาสว่านเร่งซ้ำ",
    nameEN: "Aggravative Drill Horn",
    dp: 4,
    type: "Armor",
    set: "อินิกม่า",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Skill :</span> <br> เพิ่ม AT+500/DF+200 เมื่อต่อสู้สำเร็จ หากเป้าหมายมีสภาวะผิดปกติ เพิ่มระยะเวลาสภาวะนั้นอีก 1 เทิร์น`,
    image: "images/EnigmaMG/Aggravative Drill Horn.jpg"
},

{
    id: "AR037 MG",
    nameTH: "สนับระยางค์แดงเพลิง",
    nameEN: "Red Flame Glied Pad",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่ เพิ่ม AT+400/DF+300`,
    image: "images/EnigmaMG/Red Flame Glied Pad.jpg"
},

{
    id: "AR038 MG",
    nameTH: "นัยต์แห่งความสับสน",
    nameEN: "Eyes of Chaos",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เมื่อถูกโจมตี : สามารถเลือก Creature ที่กำลังโจมตีเข้ามือเจ้าของ (เจ้าของสามารถจ่าย DP 3 เพื่อยกเลิกผลนี้)`,
    image: "images/EnigmaMG/Eyes of Chaos.jpg"
},

{
    id: "AR039 MG",
    nameTH: "สร้อยคอกระดูกนำโชค",
    nameEN: "Lucky Bones Necklace",
    dp: 1,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> เมื่อเข้าสู่เทิร์นฝ่ายตรงข้าม หากเรามีการ์ดในมือ 1 ใบหรือต่ำกว่า เราสามารถจั่วการ์ด 1 ใบ`,
    image: "images/EnigmaMG/Lucky Bones Necklace.jpg"
},

{
    id: "AR040 MG",
    nameTH: "อัญมณีแห่งฟ้าใส",
    nameEN: "Faahsai Gemstone",
    dp: 2,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> • Creature ที่สวมใส่ไม่ตกเป็นเป้าหมายของ Action Card ของฝ่ายตรงข้าม <br> • <span class="hlmanual">Manual</span> ใช้ DP 2 : เรารับ DP 3 และนำการ์ดใบนี้ลงสุสาน`,
    image: "images/EnigmaMG/Faahsai Gemstone.jpg"
},

{
    id: "AR041 MG",
    nameTH: "ปีกมังกร",
    nameEN: "Dragon Wing",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่ สามารถข้ามไปโจมตีการ์ดใน DF Line ได้`,
    image: "images/EnigmaMG/Dragon Wing.jpg"
},

{
    id: "AR042 MG",
    nameTH: "ใบดาบคู่",
    nameEN: "Twin Blade",
    dp: 3,
    type: "Armor",
    set: "อินิกม่า",
    clan: "",
    ability: `<span class="hlabi">Skill :</span> <br> Creature ที่สวมใส่ สามารถสั่งโจมตีได้ 2 ครั้ง`,
    image: "images/EnigmaMG/Twin Blade.jpg"
},


///////////////////////////Illusion///////////////////

{
    id: "Illus001",
    nameTH: "ไทแรนท์",
    nameEN: "Tyrant",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Tyrant_illusion.jpg"
},

{
    id: "Illus005",
    nameTH: "เอ็ดมันต้า",
    nameEN: "Edmanta",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Edmanta_illusion.jpg"
},

{
    id: "Illus002",
    nameTH: "ที-ร็อก",
    nameEN: "T-Rog",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/T-Rog_illusion.jpg"
},

{
    id: "Illus003",
    nameTH: "สปาร์ตัน",
    nameEN: "Spatan",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Spatan_illusion.jpg"
},

{
    id: "Illus004",
    nameTH: "อีแรมโฟ",
    nameEN: "Erampho",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Erampho_illusion.jpg"
},
{
    id: "Illus006",
    nameTH: "แองคิโลซอรัส",
    nameEN: "Ankylosaurus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Ankylosaurus_illusion.jpg"
},

{
    id: "Illus007",
    nameTH: "แบรคคิโอซอรัส",
    nameEN: "Brachiosaurus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Brachiosaurus_illusion.jpg"
},

{
    id: "Illus008",
    nameTH: "เทอราโนดอน",
    nameEN: "Pteranodon",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Pteranodon_illusion.jpg"
},

{
    id: "Illus009",
    nameTH: "โรเมลโอซอรัส",
    nameEN: "Rhomaleosaurus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Rhomaleosaurus_illusion.jpg"
},

{
    id: "Illus010",
    nameTH: "สเตโกซอรัส",
    nameEN: "Stegosaurus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Stegosaurus_illusion.jpg"
},

{
    id: "Illus011",
    nameTH: "ไทแรนโนซอรัส",
    nameEN: "Tyrannosaurus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "อินิกม่า",
    clan: "",
    ability: ``,
    image: "images/EnigmaMG/Tyrannosaurus_illusion.jpg"
}
];