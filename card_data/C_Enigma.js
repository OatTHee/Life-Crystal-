const C_EnigmaData = [
    {
        id: "DE001 JU",
        nameTH: "สยามโมไทแรนนัส",
        nameEN: "Siamotyrannus",
        dp: 5,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> Fast Run (เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถใช้งานได้ทันที) <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม Creature ที่ไม่ใช่เผ่า สองขา ลด AT 200 จนจบเทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP ให้ Creature เผ่า สองขา 1 ใบได้รับ Fast run`,
        image: "images/Enigma/Siamotyrannus.jpg"
    },
    {
        id: "DE002",
        nameTH: "ไมโครแรพเตอร์",
        nameEN: "Microraptor",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อมีการ์ด เผ่า สองขา ในสนาม 3 ใบขึ้นไปการ์ดใบนี้เพิ่ม AT + 300`,
        image: "images/Enigma/Microraptor.jpg"
    },
    {
        id: "DE003 JU",
        nameTH: "ไดโนไนคัส",
        nameEN: "Deinonychus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถหา Armor Card ที่สวมใส่ได้เฉพาะเผ่า สองขา มาขึ้นมือได้ 1 ใบ <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP สั่งให้ไดโนการ์ด 1 ใบติดสภาวะสับสน 2 เทิร์น`,
        image: "images/Enigma/Deinonychus.jpg"
    },
    {
        id: "DE004 JU",
        nameTH: "อีโอแรพเตอร์",
        nameEN: "Eoraptor",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามสามารถหาการ์ดเผ่า สองขา 1 ใบที่มี DP 2 จากในมือมารวมฝูงได้ทันที`,
        image: "images/Enigma/Eoraptor.jpg"
    },
    {
        id: "DE005 JU",
        nameTH: "กินรีไมมัส",
        nameEN: "Kinnareemimus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม Creature 1 ใบ สลับจาก AT Line ไป DF Line <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 Dp ให้ Creature 1 ใบ ลด DF -300 จนจบเทิร์น`,
        image: "images/Enigma/Kinnareemimus.jpg"
    },
    {
        id: "DE006 JU",
        nameTH: "โอวิแรพเตอร์",
        nameEN: "Oviraptor",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อมีการ์ดใบนี้อยู่ในสนามทำให้ ทำให้ DP ของ เผ่า สองขา ลดลง 1`,
        image: "images/Enigma/Oviraptor.jpg"
    },
    {
        id: "DE007 JU",
        nameTH: "พาราซอโรโลฟัส",
        nameEN: "Parasaurolophus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม รักษาสภาวะผิดปกติทุกชนิดให้ Creature 1 ใบ <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP สุ่มดูการ์ดในมือคู่ต่อสู้ 1 ใบ เพิ่ม DP ตาม DP ของการ์ดใบนั้น`,
        image: "images/Enigma/Parasaurolophus.jpg"
    },
	{
    id: "DE008 JU",
    nameTH: "สยามโมซอรัส",
    nameEN: "Siamosaurus",
    dp: 4,
    type: "Creature",
    set: "อินิกม่า",
    clan: "สองขา",
    ability: `<span class="hlabi">Effect :</span> <br> <span class="hlmanual">Manual</span> ทิ้งการ์ด 1 ใบ การ์ดใบนี้เพิ่ม AT+ ตาม DP ของการ์ดที่ทิ้ง X 200 จนจบเทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 4 DP ทำลายไดโนการ์ดที่มีพลังมากกว่า 2000 จำนวน 1 ใบ แล้วส่งการ์ดนี้ลงสุสาน`,
    image: "images/Enigma/Siamosaurus.jpg"
},
    {
        id: "DE009 JU",
        nameTH: "โทรโอดอน",
        nameEN: "Troodon",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> การ์ดใบนี้ไม่ตกเป็นเป้าหมายการโจมตีจาก Creature ที่ไม่ได้รวมฝูงหรือรวมร่าง <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP สั่งให้การ์ดทุกใบแยกการรวมฝูงและรวมร่าง`,
        image: "images/Enigma/Troodon.jpg"
    },
		{
    id: "DE010 JU",
    nameTH: "เวโลซิเเรพเตอร์",
    nameEN: "Velociraptor",
    dp: 4,
    type: "Creature",
    set: "อินิกม่า",
    clan: "สองขา",
    ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> ถ้ามีการ์ดเผ่า สองขาในสนามมากกว่า 2 ใบ เมื่อการ์ดใบนี้สั่งโจมตีเพิ่ม AT+200 จนจบเทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 4 DP ทิ้งการ์ดในมือ 1 ใบ เพิ่ม AT ตามค่า AT ของการ์ดที่ทิ้งไป`,
    image: "images/Enigma/Velociraptor.jpg"
},
{
    id: "DE011 JU",
    nameTH: "อิกัวโนดอน",
    nameEN: "Iguanodon",
    dp: 4,
    type: "Creature",
    set: "อินิกม่า",
    clan: "สองขา",
    ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> ถ้ามีการ์ดเผ่า สองขามากกว่า 1 ใบในสนาม การ์ดใบนี้จะไม่ตกเป็นเป้าหมายของ Magic card <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP นำ Creature 1 ใบ สุสานกลับเข้ามาในสนาม`,
    image: "images/Enigma/Iguanodon.jpg"
},
    {
        id: "DE012 JU",
        nameTH: "แพคคีเซฟาโลซอรัส",
        nameEN: "Pachycephalosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้อยู่ที่ AT Line ฝั่งตรงข้ามไม่สามารถสั่งโจมตีการ์ดใบอื่นนอกจากใบนี้ได้`,
        image: "images/Enigma/Pachycephalosaurus.jpg"
    },
    {
        id: "DE013 JU",
        nameTH: "แลมบีโอซอรัส",
        nameEN: "Lambeosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> ไม่ว่าการ์ดใบนี้จะอยู่ใน Line ใด เมื่อ เผ่า สองขา ตกเป็นเป้าหมายการโจมตี การ์ดใบนี้จะเข้ามาใน Line เดียวกับการ์ดที่ถูกโจมตีและย้ายการต่อสู้มาที่การ์ดใบนี้แทน`,
        image: "images/Enigma/Lambeosaurus.jpg"
    },
	
//เผ่าเขา

    {
        id: "DE014 JU",
        nameTH: "อาเคลูซอรัส",
        nameEN: "Achelousaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี จะไม่รับผลของ Effect ของการ์ดเป้าหมาย`,
        image: "images/Enigma/Achelousaurus.jpg"
    },
    {
        id: "DE015 JU",
        nameTH: "อัลเบอร์ต้าเซราทอปส์",
        nameEN: "Albertaceratops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม ให้ Creature เป้าหมาย 1 ใบ ลด AT-400 และ เพิ่ม DF+100 จนจบเทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 3 ให้ Creature เป้าหมาย 1 ใบ เพิ่ม AT+300 จนจบเทิร์น`,
        image: "images/Enigma/Albertaceratops.jpg"
    },
    {
        id: "DE016 JU",
        nameTH: "แบรคคีเซราทอปส์",
        nameEN: "Brachyceratops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน สามารถจั่วการ์ดจั่วการ์ด 1 ใบ`,
        image: "images/Enigma/Brachyceratops.jpg"
    },
    {
        id: "DE017 JU",
        nameTH: "ยูดาโนเซราทอปส์",
        nameEN: "Udanoceratops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามหา Armor Card ที่สวมใส่ได้เฉพาะเผ่ามีเขามาขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Udanoceratops.jpg"
    },
    {
        id: "DE018 JU",
        nameTH: "ไดเซราทอปส์",
        nameEN: "Diceratops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้สวมใส่ Armor Card เมื่อสั่งโจมตีการ์ดใน DF Line จะได้รับ AT + 300 จนจบเทิร์น`,
        image: "images/Enigma/Diceratops.jpg"
    },


//คอยาว
    {
        id: "DE019 JU",
        nameTH: "ภูเวียงโกซอรัส",
        nameEN: "Phuwiangosaurus",
        dp: 5,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน Creature ที่ไม่ใช่เผ่าคอยาวติด สภาวะบาดเจ็บ ลด AT-200 2Turn <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP3 นํา Creature เผ่าคอยาว ในสุสานกลับเข้ามาในสนามได้`,
        image: "images/Enigma/Phuwiangosaurus.jpg"
    },
    {
        id: "DE020 JU",
        nameTH: "อีสานโนซอรัส",
        nameEN: "Isanosaurus",
        dp: 5,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน ให้ Creature 1 ใบ ติดสภาวะสับสน 2 เทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP3 ให้ Creature 1ใบ เพิ่ม DF+300 จนจบ Turn`,
        image: "images/Enigma/Isanosaurus.jpg"
    },
    {
        id: "DE021 JU",
        nameTH: "ซอโรโพไซดอน",
        nameEN: "Sauroposeidon",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน การ์ดMaster เพิ่ม LP+250 <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 การ์ดมาสเตอร์ เพิ่ม LP+1000 2 Turn`,
        image: "images/Enigma/Sauroposeidon.jpg"
    },
    {
        id: "DE022",
        nameTH: "อากัสทีเนีย",
        nameEN: "Agustinia",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสานสามารถนำไดโนการ์ดที่มี DP ไม่เกิน 4 จากสุสานมาขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Agustinia.jpg"
    },
    {
        id: "DE023 JU",
        nameTH: "ริโอจาซอรัส",
        nameEN: "Riojasaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามหา Armor Card ที่สวมใส่ได้เฉพาะเผ่าคอยาวมาขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Riojasaurus.jpg"
    },
    {
        id: "DE024 JU",
        nameTH: "ไดเครโอซอรัส",
        nameEN: "Dicraeosaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี จั่วการ์ด 1 ใบ`,
        image: "images/Enigma/Dicraeosaurus.jpg"
    },
    {
        id: "DE025 JU",
        nameTH: "โจบาเรีย",
        nameEN: "Jobaria",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้รวมฝูง เมื่อตกสุสานให้นําการ์ดที่รวมฝูงกลับขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Jobaria.jpg"
    },
	{
        id: "DE026 JU",
        nameTH: "ไทโลซอรัส",
        nameEN: "Tylosaurus",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ลงมาในสนาม เลือก Line ใด Line หนึ่ง Creature ฝั่งตรงข้ามทุกใบใน Line ที่เลือกติดสภาวะบาดเจ็บ ลด DF 250`,
        image: "images/Enigma/Tylosaurus.jpg"
    },
    {
        id: "DE027 JU",
        nameTH: "เฮลิโคไพรออน",
        nameEN: "Helicoprion",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ลงมาในสนาม สามารถหา Armor Card ที่สวมใส่เฉพาะ เผ่า Aquatic ขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Helicoprion.jpg"
    },
    {
        id: "DE028 JU",
        nameTH: "ซาร์โคซูคัส",
        nameEN: "Sarcosuchus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 ให้ Creature เป้าหมาย 2 ใบ ติดสภาวะบาดเจ็บ ลด AT-300`,
        image: "images/Enigma/Sarcosuchus.jpg"
    },
    {
        id: "DE029 JU",
        nameTH: "ฟุตาบะซอรัส",
        nameEN: "Futabasaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 รักษาสภาวะผิดปกติให้ Creature เป้าหมายได้ 2 ใบ`,
        image: "images/Enigma/Futabasaurus.jpg"
    },
    {
        id: "DE030 JU",
        nameTH: "ดังเคิลออสเทียส",
        nameEN: "Dunkleosteus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถลง Creature ที่ค่า DP ไม่เกิน 3 ได้ทันทีอีก 1 ใบ`,
        image: "images/Enigma/Dunkleosteus.jpg"
    },
	{
        id: "DE031 JU",
        nameTH: "ทาลัสโซโดรเมอัส",
        nameEN: "Thalassodromeus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 ให้ Creature เป้าหมายไม่สามารถใช้ Skill ได้ 2 เทิร์น`,
        image: "images/Enigma/Thalassodromeus.jpg"
    },
    {
        id: "DE032 JU",
        nameTH: "เทอโรดอสโตร",
        nameEN: "Pterodaustro",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามหา Armor Card ที่สวมใส่ได้เฉพาะเผ่ามีปีกมาขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Pterodaustro.jpg"
    },
    {
        id: "DE033",
        nameTH: "อันยานเกอรา",
        nameEN: "Anhanguera",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ด เผ่ามีปีก สั่งโจมตี เพิ่ม AT+300 ให้ เผ่ามีปีกทุกใบในสนามจนจบเทิร์น`,
        image: "images/Enigma/Anhanguera.jpg"
    },
    {
        id: "DE034",
        nameTH: "คีราแดคทิลลัส",
        nameEN: "Cearadactylus",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlmanual">Manual</span> สั่งทำลายการ์ดใบนี้ การ์ดเผ่ามีปีกของเรา 1 ใบสามารถโจมตีการ์ดใน Defense Line ได้`,
        image: "images/Enigma/Cearadactylus.jpg"
    },
    {
        id: "DE035 JU",
        nameTH: "จุงการิปเทออัส",
        nameEN: "Dsungaripterus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> จ่าย DP 3 ให้ Creature เป้าหมาย 1 ใบ สามารถสั่งโจมตีการ์ดใน Defense Line ได้จนจบเทิร์น`,
        image: "images/Enigma/Dsungaripterus.jpg"
    },
{
        id: "DE036 JU",
        nameTH: "ไซชาเนีย",
        nameEN: "Saichania",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> การ์ดใบนี้จะไม่ตกเป็นเป้าหมายการโจมตีของ Creature ที่รวมฝูงหรือรวมร่างถ้าการ์ดใบนี้ไม่ได้รวมฝูงหรือรวมร่างอยู่`,
        image: "images/Enigma/Saichania.jpg"
    },
    {
        id: "DE037 JU",
        nameTH: "ซอโรเพลต้า",
        nameEN: "Sauropelta",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ถูกทำลายจากการโจมตี Creature ที่โจมตีจะติดสภาวะหลับ 1 เทิร์น <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 2 ให้ Creature 1 ใบ เพิ่ม DF +300 จนจบเทิร์น`,
        image: "images/Enigma/Sauropelta.jpg"
    },
    {
        id: "DE038 JU",
        nameTH: "ทัลอารูรัส",
        nameEN: "Talarurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Creature ที่ DF น้อยกว่า ไม่สามารถสั่งโจมตีการ์ดใบนี้ได้`,
        image: "images/Enigma/Talarurus.jpg"
    },
    {
        id: "DE039 JU",
        nameTH: "วูเออโฮซอรัส",
        nameEN: "Wuerhosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามหา Armor Card ที่สวมใส่ได้เฉพาะเผ่ามีเกราะหางหนามมาขึ้นมือได้ 1 ใบ`,
        image: "images/Enigma/Wuerhosaurus.jpg"
    },
    {
        id: "DE040 JU",
        nameTH: "ดาเซนทรูรัส",
        nameEN: "Dacentrurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อเผ่ามีเกราะหนามตกเป็นเป้าหมายการโจมตี เพิ่ม DF +200 ให้ Creature 1 ใบจนจบเทิร์น`,
        image: "images/Enigma/Dacentrurus.jpg"
    },
    {
        id: "DE041 JU",
        nameTH: "ไครโอโลโฟซอรัส",
        nameEN: "Cryolophosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Fast run (เมื่อการ์ดใบนี้เข้ามาในสนามสาารถสั่งใช้งานได้ทันที) <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP สั่งให้การ์ด 1  ใบ ลด AT-300 และ DF-300 จนกว่าการ์ดใบนี้จะตกสุสาน`,
        image: "images/Enigma/Cryolophosaurus.jpg"
    },
    {
        id: "DE042 JU",
        nameTH: "เซราโตซอรัส",
        nameEN: "Ceratosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสานสุ่มดูการ์ดในมือคู่ต่อสู้ได้ 1 ใบ`,
        image: "images/Enigma/Ceratosaurus.jpg"
    },
    {
        id: "DE043 JU",
        nameTH: "อูราโนซอรัส",
        nameEN: "Ouranosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามสั่งทำลายการ์ด Magic  1 ใบในสนาม`,
        image: "images/Enigma/Ouranosaurus.jpg"
    },
	
	 {
        id: "DE044 JU",
        nameTH: "เมดูซ่าเซราทอปส์",
        nameEN: "Medusaceratops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้รวมฝูง สามารถข้ามไปโจมตีการ์ดใน DF Line ได้ <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 4 DP สั่งทำลาย Creature เป้าหมาย 1 ใบที่ติดสภาวะหลับ`,
        image: "images/Enigma/Medusaceratops.jpg"
    },
    {
        id: "DE045 JU",
        nameTH: "รูบีโอซอรัส",
        nameEN: "Rubeosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนามเปิดการ์ดใบบนสุดของกองหากเป็น Creature ให้นำลงสนามได้โดยไม่เสียค่าร่าย ถ้าหากเป็น Magic ให้ทิ้งลงสุสาน`,
        image: "images/Enigma/Rubeosaurus.jpg"
    },
	
	   {
        id: "DE046",
        nameTH: "บาราปาซอรัส",
        nameEN: "Barapasaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlmanual">Manual</span> สั่งทำลายการ์ด เผ่าคอยาว 1 ใบ นำการ์ดใบนี้จากใน สุสาน กลับลงสนาม <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 นำ Creature 1 ใบ ใน สุสาน กลับเข้ามาในสนาม แต่ความสามารถต่างๆของการ์ดนั้นจะไม่สามารถใช้งานได้`,
        image: "images/Enigma/Barapasaurus.jpg"
    },
    {
        id: "DE047 JU",
        nameTH: "ไนเจอร์ซอรัส",
        nameEN: "Nigersaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน หากมีการ์ดเผ่าเดียวกันในสุสานเกิน 3 ใบ เลือก 1 ที่ไม่ใช่ใบนี้กลับขึ้นมือ`,
        image: "images/Enigma/Nigersaurus.jpg"
    },
   {
        id: "DE049 JU",
        nameTH: "ไจแกนสไปโนซอรัส",
        nameEN: "Gigantspinosaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตีสำเร็จ เลือกสุ่มทิ้งการ์ดในมือคู่ต่อสู้ 1 ใบได้ <br> <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 4 เปิดการ์ดบนกองการ์ดฝั่งใดก็ได้ 3 ใบ จัดเรียกแล้ววางกลับเข้ากองตามเดิม`,
        image: "images/Enigma/Gigantspinosaurus.jpg"
    },
    {
        id: "DE050 JU",
        nameTH: "ฮังกาโรซอรัส",
        nameEN: "Hungarosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> การ์ดใบนี้สามารถโจมตีไป DF Line ได้จากทุก Line โดยใช้ค่า AT เสมอ`,
        image: "images/Enigma/Hungarosaurus.jpg"
    },
	
    {
        id: "DE051",
        nameTH: "ดราโคเร็กซ์",
        nameEN: "Dracorex",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้ออกโจมตี Dino ตัวนี้ปรับค่า AT+400 จนจบเทิร์น <br> • <span class="hlauto">Auto</span> เมื่อ Dino ตัวนี้โจมตีสำเร็จ Creature ใบนี้สามารถเลือกทำลาย Armor Card ที่คู่ต่อสู้สวมใส่ 1 ชิ้น`,
        image: "images/Enigma/Dracorex.jpg"
    },
    {
        id: "DE052 JU",
        nameTH: "ซิโนไทรันนัส",
        nameEN: "Sinotyrannus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้เข้ามาในสนามเราสามารถสั่งใช้งานได้ทันที <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ออกโจมตีพร้อมกับ Creature ใบ อื่น 2 ใบขึ้นไป การ์ดใบนี้ปรับค่า AT+200 จนจบการต่อสู้`,
        rarity: "Silver_Rare",
        image: "images/Enigma/Sinotyrannus.jpg"
    },
    {
        id: "DE053",
        nameTH: "แร็ปเทอเร็กส์ คริกสเตนี",
        nameEN: "Raptorex kriegsteini",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้ออกโจมตี เราสามารถค้น Deck ของเรา สามารถหา Creature ที่ชื่อ [Raptorex (Kriegsteini)] 1 ใบแสดง, นำเข้ามือเจ้าของ, สับ Deck ของเรา`,
        image: "images/Enigma/Raptorex kriegsteini.jpg"
    },
    {
        id: "DE054",
        nameTH: "มัททาเบอราซอรัส ลังโดนี",
        nameEN: "Muttaburrasaurus langdoni",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สองขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสานนำ Magic Card ในสุสานมาขึ้นมือได้ 1 ใบ <br> • <span class="hlmanual">Manual</span> จ่าย DP 2 จุด : ทิ้ง Magic card 1 ใบ , เรา จั่วการ์ด 2 ใบ`,
        image: "images/Enigma/Muttaburrasaurus langdoni.jpg"
    },
	
	   {
        id: "DE055",
        nameTH: "คอสโมเซราทอปส์",
        nameEN: "Kosmoceratops richardsoni",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสนาม เราสามารถนำ Armor Card ใน สุสาน ของเรา 1 ใบเข้ามือเจ้าของ`,
        rarity: "Silver_Rare",
        image: "images/Enigma/Kosmoceratops richardsoni.jpg"
    },
    {
        id: "DE056 JU",
        nameTH: "กิกันโตเซราทอปส์ เฮอคิวเลส",
        nameEN: "Gigantoceratops Hercules",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> เมื่อ Creature ใบนี้ต่อสู้สำเร็จและยังอยู่ในสนาม เราสามารถใช้ DP 4 จุด + นำ Creature ใบนี้สับเข้า Deck ของเรา : ค้นเด็คของเราหา Creature เผ่ามีเขาที่มีค่าเรียก DP 4 หรือต่ำกว่า 1 ใบ > นำการ์ดนั้นเข้าสนาม > สับ Deck ของเรา.`,
        image: "images/Enigma/Gigantoceratops Hercules.jpg"
    },
    {
        id: "DE057 JU",
        nameTH: "ซิโนเซราทอปส์ ซือเช็นเจนซิส",
        nameEN: "Sinoceratops zhuchengensis",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี Creature ใบนี้ ปรับค่า AT+100/DF+100 จนจบการต่อสู้ <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้ตกเป็นเป้าหมายจาก Action Card หาก Creature ใบนี้ใส่ Armor Card อยู่ , สามารถจั่วการ์ดได้ 1 ใบ`,
        image: "images/Enigma/Sinoceratops zhuchengensis.jpg"
    },
    {
        id: "DE058 JU",
        nameTH: "ไดอโบลเซราทอปส์ เอโทนี",
        nameEN: "Diabloceratops eatoni",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเขา",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> ผู้เล่นฝ่ายตรงข้ามทุกคนไม่สามารถจั่วการ์ดได้มากกว่า 2 ใบต่อ 1 เทิร์น <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้าสุสานจากสนามเราทิ้งการ์ด 1 ใบ`,
        rarity: "Golden_Rare",
        image: "images/Enigma/Diabloceratops eatoni.jpg"
    },
	
	    {
        id: "DE059",
        nameTH: "ยีราฟฟาไทแทน",
        nameEN: "Giraffatitan",
        dp: 6,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสนามจากการเรียก Creature ที่มีค่าเรียก DP ไม่เกิน 4 หรือต่ำกว่าของฝ่ายตรงข้ามทั้งหมดติดสภาวะสับสน เป็นเวลา 1 เทิร์น <br> • <span class="hlauto">Auto</span> เมื่อจบเทิร์น ของเรา หากเรามีการ์ดในมือ2ใบหรือต่ำกว่า เราสามารถจั่วการ์ดเพิ่ม1ใบ`,
        rarity: "Golden_Rare",
		image: "images/Enigma/Giraffatitan.jpg"
    },
    {
        id: "DE060",
        nameTH: "โบนิทาซอรา ซัลกาดอย",
        nameEN: "Bonitasaura salgadoi",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "คอยาว",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสนามจากการเรียก เราสามารถนำ การ์ดใบบนสุดของ Deck ของเรา 2 ใบลงสุสาน , เรารับ DP 2 จุด <br> • <span class="hlmanual">Manual</span> ใช้ DP 2 จุด + ทิ้งการ์ด 1 ใบ กำหนด Creature 1 เป้าหมาย : เป้าหมายนั้นรับ สภาวะสับสน 1 เทิร์น`,		
        image: "images/Enigma/Bonitasaura salgadoi.jpg"
    },
	 {
        id: "DE061",
        nameTH: "โดลิคอรินคอปส์",
        nameEN: "Dolichorhynchops",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> เมื่อเข้าช่วงจบ Turn เราสามารถจ่าย DP 3 จุด + นำ Creature ใบนี้สับเข้า Deck เจ้าของ : เราจั่วการ์ด 3 ใบ`,
        image: "images/Enigma/Dolichorhynchops.jpg"
    },
    {
        id: "DE062",
        nameTH: "โนโธซอรัส",
        nameEN: "Nothosaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> ใช้ DP 4 จุด : แสดงการ์ดใบบนสุดของ Deck ของเรา 4 ใบ เลือกการ์ดที่แสดงเป็น Creature ที่มีค่าเรียก DP 3 หรือต่ำกว่า 1 ใบ เข้าสนามและนำการ์ดที่แสดงที่เหลือกลับเข้า Deck เจ้าของ <br> • <span class="hlmanual">Manual</span> ใช้ DP 2 จุด : Creature ใบนี้ปรับค่าเพิ่ม DF+200 1 เทิร์น`,
        rarity: "Golden_Rare",
        image: "images/Enigma/Nothosaurus.jpg"
    },
    {
        id: "DE063 JU",
        nameTH: "สติ๊กโอซอรัส สโนวี",
        nameEN: "Styxosaurus snowii",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "สัตว์น้ำ",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> กำหนด Creature 1 เป้าหมาย ถ้าใบนั้นมีสภาวะผิดปกติ เพิ่มระยะเวลาของสภาวะผิดปกติทั้งหมดที่มีของบนเป้าหมายอีก 1 เทิร์น <br> • <span class="hlmanual">Manual</span> ใช้ DP 3 จุด ให้ Creature ใบนี้ ไม่ตกเป็นเป้าหมายใดๆ 1 เทิร์น`,
        image: "images/Enigma/Styxosaurus snowii.jpg"
    },
	    {
        id: "DE048 JU",
        nameTH: "แฮทเซโกปเทอริกซ์",
        nameEN: "Hatzegopteryx",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> จ่าย DP 3 ให้การ์ด 1 ใบที่ไม่ได้รวมฝูงกลับขึ้นมือเจ้าของ`,
        image: "images/Enigma/Hatzegopteryx.jpg"
    },
    {
        id: "DE064 JU",
        nameTH: "ดอริกนาธัส",
        nameEN: "Dorygnathus",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสนาม หากเรามีการ์ดบนมือน้อยกว่าผู้เล่นฝ่ายตรงข้าม เราจั่วการ์ด 1 ใบ <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสุสานจากสนาม หากเรามีการ์ดบนมือน้อยกว่าผู้เล่นฝ่ายตรงข้าม เราเลือกสุ่มทั้งการ์ดบนมือของผู้เล่นฝ่ายตรงข้าม 1 คน`,
        image: "images/Enigma/Dorygnathus.jpg"
    },
    {
        id: "DE065 JU",
        nameTH: "เฟยหลงกัส",
        nameEN: "Feilongus",
        dp: 2,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> เมื่อ Creature ใบนี้เข้าสนาม เราสามารถใช้ DP 3 จุด กำหนดผู้เล่นเป้าหมายสุ่มทิ้งการ์ดบนมือของเป้าหมาย 2 ใบ <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสุสานจากที่ใดก็ตาม เราสามารถจั่วการ์ดเพิ่ม 1 ใบ`,
        rarity: "Golden_Rare",
        image: "images/Enigma/Feilongus.jpg"
    },
    {
        id: "DE066",
        nameTH: "สคาฟ๊อกนาธัส",
        nameEN: "Scaphognathus",
        dp: 1,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีปีก",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> ใช้ DP 4 กำหนดผู้เล่นเป้าหมาย : สุ่มทิ้งการ์ดบนมือเป้าหมาย 1 ใบ <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เข้าสุสานจากมือเจ้าของโดยผลสำแดงของฝ่ายตรงข้าม นำ Creature ใบนี้กลับขึ้นมือเจ้าของ`,
        image: "images/Enigma/Scaphognathus.jpg"
    },
	    {
        id: "DE067 JU",
        nameTH: "จงหยวนซอรัส",
        nameEN: "Zhongyuansaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้เป็นเป้าหมายการโจมตี Creature ใบนี้ปรับ AT+100/DF+200 จนจบเทิร์น <br> • <span class="hlmanual">Manual</span> จ่าย DP 4 : จั่วการ์ด 1 ใบ`,
        rarity: "Golden_Rare",
        image: "images/Enigma/Zhongyuansaurus.jpg"
    },
    {
        id: "DE068 JU",
        nameTH: "กากอยเลโอซอรัส",
        nameEN: "Gargoleosaurus",
        dp: 3,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้ตกเป็นเป้าหมายจากการโจมตี ปรับ AT+100/DF+200 จนจบการต่อสู้ (Skill นี้สำแดงผลครั้งเดียวใน 1 เกม) <br> • <span class="hlmanual">Manual</span> ใช้ DP 2 ให้ Creature 1 ใบ เพิ่ม DF +200 1 เทิร์น`,
        image: "images/Enigma/Gargoleosaurus.jpg"
    },
    {
        id: "DE069 JU",
        nameTH: "เชียหลิงโกซอรัส",
        nameEN: "Chialingosaurus",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> Creature ใบนี้ไม่เปลี่ยนแปลงพลังโจมตีและพลังป้องกันจากผลสำแดงของ Action Card ฝ่ายตรงข้าม <br> • <span class="hlcont">Cont.</span> ตราบที่ Creature ใบนี้สวมใส่ Armor Card : Creature ใบนี้ปรับ AT+200/DF+200`,
        image: "images/Enigma/Chialingosaurus.jpg"
    },
    {
        id: "DE070 JU",
        nameTH: "มิโนทอราซอรัส รามันชันดรานี",
        nameEN: "Minotaurasaurus ramachandrani",
        dp: 4,
        type: "Creature",
        set: "อินิกม่า",
        clan: "มีเกราะหางหนาม",
        ability: `<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Creature ใบนี้ตกเป็นเป้าหมายการโจมตี Creature ใบนี้ปรับค่าเพิ่ม AT+100/DF+200 จนจบการต่อสู้ <br> • <span class="hlcont">Cont.</span> ตราบที่ Creature ใบนี้สวมใส่ Armor Card : Creature ใบนี้ปรับค่าเพิ่ม AT+200/DF+300`,
        rarity: "Silver_Rare",
        image: "images/Enigma/Minotaurasaurus ramachandrani.jpg"
    },

    {
    id: "SP001 JU",
    nameTH: "ไทแรนท์",
    nameEN: "Tyrant",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["สองขา", "มีเขา"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Volcano field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตีสำเร็จ : สุ่มทำลายการ์ดในมือคู่ต่อสู้ 1 ใบ.`
    ,
    image: "images/Enigma/Tyrant.jpg"
},

{
    id: "SP002 JU",
    nameTH: "เอ็ดมันต้า",
    nameEN: "Edmanta",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["มีเกราะหางหนาม", "มีปีก"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Swamp field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี : เลือก Dino Card ฝั่งเรา 1 ใบ, นำค่า AT ของการ์ดใบนั้นมาเพิ่มให้การ์ดนี้จนจบเทิร์น.`
    ,
    image: "images/Enigma/Edmanta.jpg"
},

{
    id: "SP003 JU",
    nameTH: "ที-ร็อค",
    nameEN: "T-Rog",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["สองขา", "มีปีก"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Valley field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี : หากคู่แข่งไม่มีการ์ดใน DF Line, การ์ดนี้สามารถโจมตี Master ได้ทันที.`
    ,
    image: "images/Enigma/T-Rog.jpg"
},

{
    id: "SP004 JU",
    nameTH: "สปาตัน",
    nameEN: "Spatan",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["คอยาว", "สองขา"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Rainforest field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน : นำ Dino card เผ่าคอยาวทุกใบในสุสานกลับเข้ามาในสนามและใช้งานได้ทันที (เมื่อจบเทิร์นให้นำกลับลงสุสานตามเดิม).`
    ,
    image: "images/Enigma/Spatan.jpg"
},

{
    id: "SP005 JU",
    nameTH: "อีแลมโฟร",
    nameEN: "Erampho",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["สัตว์น้ำ", "มีปีก"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Lagoon field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม : Dino Card ทุกใบฝั่งเรา สามารถใช้ Skill ได้โดยไม่เสียค่าร่าย.`
    ,
    image: "images/Enigma/Erampho.jpg"
},

{
    id: "SP006 JU",
    nameTH: "โซรินคัส",
    nameEN: "Solychus",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "อินิกม่า",
    rarity: "Golden_Rare",
    clan: ["สองขา", "มีปีก"],
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">เงื่อนไข :</span> ต้องมี Volcano field อยู่ในสนาม <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตีสำเร็จ : สามารถเรียก Dino card เผ่าสองขา หรือ มีปีก 1 ใบจากในมือลงสนามโดยไม่เสียค่าร่าย.`
    ,
    image: "images/Enigma/Solychus.jpg"
}
];