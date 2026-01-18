	const icefireData = [
{
    id: "FM-PR06 EXC06 JU",
    nameTH: "เอ็ดมันโต เบต้า",
    nameEN: "Edmanto Beta",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "มีเกราะหางหนาม, มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> Creature ของเราจะไม่ถูกนำกลับขึ้นมือจากผลสำแดง (หากเป็นผลสำแดงของฝ่ายเรา จะเลือกให้ยังถูกนำกลับขึ้นมืออยู่ก็ได้) <br> • <span class="hlauto">Auto</span> เมื่อโจมตี/ตกเป็นเป้าหมายการโจมตี : สามารถ [ลบตัวตน] Creature มีเกราะหางหนาม ในสุสาน 1 ใบ ถ้าทำ, ปรับ AT+300 ต่อจำนวนการ์ดบนมือเรา 1 ใบ จนจบการต่อสู้ <br> <span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> จ่าย 3 DP + กำหนด Creature มีปีก ตัวอื่นฝ่ายเรา และ Creature ที่ไม่ได้รวมร่างของคู่แข่งอย่างละ 1 เป้าหมาย : นำเป้าหมายทั้งสองใบกลับขึ้นมือ`,
    image: "images/Fanmade/icefire/Edmanto Beta.png"
},
{
    id: "FM-PR06 EXC03 JU",
    nameTH: "ชูไคโอ รูปแบบเยือกแข็ง",
    nameEN: "Shukaio Glacier Mode",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "สองขา, มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนาม, หาก Master เราชื่อ [Chris] : สามารถทิ้งการ์ด 2 ใบ ถ้าทิ้ง, ค้นเด็ค > หาการ์ด [Final Fusion] หรือ [Frozen Throne] 1 ใบ กับ Creature DP 3 ที่เผ่าต่างกัน 2 ใบขึ้นมือ > เทิร์นนี้เรานำ Creature เข้าสนามจากมือไม่ได้ ยกเว้นโดยผลของ Master Skill เรา > สับเด็ค <br> • <span class="hlauto">Auto</span> ไม่ทำงานซ้ำซ้อน เมื่อเราเรียก [มอนสเตอร์ฟิวชั่น] จาก [เอ็กซ์ตร้าเด็ค] สำเร็จ : จั่วการ์ด 1 ใบ <br> • <span class="hlcont">Cont.</span> การ์ดนี้ไม่รับผลการ์ด [Frozen Throne] และ [Blizzard] และ Creature ที่รวมร่างอยู่ของเราจะไม่กลับขึ้นมือโดยผลสำแดงการ์ดคู่แข่ง`,
    image: "images/Fanmade/icefire/Shukaio Glacier Mode.png"
},
{
    id: "FM-PR06 EXC02 JU",
    nameTH: "เทอราชิกนัส รูปแบบฟีนิกซ์",
    nameEN: "Therazignus Phoenix Mode",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "สองขา, มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนามจาก [เอ็กซ์ตร้าเด็ค] : ค้นเด็ค > หา Action [Meteor] 1 ใบขึ้นมือ > สับเด็ค <br> • <span class="hlauto">Auto</span> เมื่อตกสุสานจากสนาม, สามารถแสดง Action ที่มีคำว่า [Meteor] ในชื่อจากมือเราได้ 1 ใบ : ร่ายการ์ดนั้นออกมาทันที (ในจังหวะนี้ร่ายได้โดยไม่มีเงื่อนไขการใช้งาน) <br> • <span class="hlauto">Auto</span> เทิร์นละครั้ง : ชื่อเดียวกัน [สุสาน] เมื่อเราร่ายการ์ด [Meteor Rain] สำเร็จ : เมื่อจบเทิร์นที่ร่าย, สามารถ [คืนชีพ] การ์ดนี้ได้ (นับเป็นการเรียกโดยอัญเชิญฟิวชั่น)`,
    image: "images/Fanmade/icefire/Therazignus Phoenix Mode.png"
},
{
    id: "FM-PR06 EXC05 JU",
    nameTH: "เอปไซรัมโฟ",
    nameEN: "Epsirampho",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "สัตว์น้ำ, มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนาม, กำหนด Creature ของเรา 1 ใบ : ในเทิร์นนี้, การ์ดนั้นใช้ Skill ได้โดยไม่เสีย DP 1 ครั้ง <br> • <span class="hlcont">Cont.</span> หากบนสนามมี Creature ติด [สภาวะผิดปกติ] และคู่แข่งไม่มี Creature ใน AT Line สามารถให้การ์ดนี้โจมตี Master ได้แม้คู่แข่งจะมี Creature ใน DF Line <br> <span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> จ่าย 2 DP + เลือก Creature สัตว์น้ำ หรือ มีปีก DP ไม่เกิน 2 ในสุสานเรา 1 ใบ : [คืนชีพ] การ์ดนั้น`,
    image: "images/Fanmade/icefire/Epsirampho.png"
},
{
    id: "FM-PR06 EXC01 JU",
    nameTH: "กิก้า เพนตัส",
    nameEN: "Giga Pentus",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "มีเขา, สองขา, มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> การ์ดนี้ไม่รับผลสำแดงการ์ดคู่แข่ง 1 เทิร์นนับจากเทิร์นที่เข้าสนาม, ไม่ตกเป็นเป้าหมายจาก Skill Creature ที่ AT น้อยกว่า, และ ตราบที่สวม Armor, จะไม่ตกเป็นเป้าหมายจาก Action <br> • <span class="hlauto">Auto</span> ตราบที่คู่แข่งมี Creature ที่รวมร่างอยู่, Creature รวมร่างของเรา AT+500 <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนาม : นำการ์ด [Critical Damage] 1 ใบจากมือ/เด็คมาสวมให้การ์ดนี้ทันที > หากค้นจากเด็คให้สับเด็ค <br> <span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> จ่าย 3 DP : รักษา [สภาวะผิดปกติ] ทุกชนิดให้ Creature ฝ่ายเราทุกใบ`,
    image: "images/Fanmade/icefire/Giga Pentus.png"
},
{
    id: "FM-PR06 EXC04 JU",
    nameTH: "กิก้า พี. โปรโตไทป์",
    nameEN: "Giga P. Prototype",
    dp: "ไร้DP",
    type: "Fusion_Monster",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "สองขา, มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> หากเราจะใช้การ์ดนี้เพื่อ [รวมร่าง] หรือ [อัญเชิญฟิวชั่นจากเอ็กซ์ตร้าเด็ค] แบบ 3 ตัว, ถือว่าการ์ดนี้เป็น [วัตถุดิบ] 2 ใบได้ (Creature สองขา และ มีเขา DP 4 อย่างละ 1 ตัว) (Effect นี้ไม่ถูกยกเลิก/ทำให้ไร้ผล) <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนาม, หาก Master เราชื่อ [Chris] สามารถทิ้งการ์ด 1 ใบ : เรียก Creature มีเขา DP 5 จากเด็ค 1 ใบ เข้าสนามได้ทันที (Effect/Skill ของการ์ดนั้นไร้ผล และสั่งการไม่ได้) <br> • <span class="hlcont">Cont.</span> ตราบที่การ์ดนี้สวม Armor อยู่, จำนวนครั้งที่โจมตีได้ +1`,
    image: "images/Fanmade/icefire/Giga P. Prototype.png"
},
			///////////////////

			{
    id: "FM-PR06 illus01 JU",
    nameTH: "เอปไซรัมโฟ",
    nameEN: "Epsirampho",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/Epsirampho_ill.png"
},
			{
    id: "FM-PR06 illus02 JU",
    nameTH: "เอ็ดมันโตเบต้า",
    nameEN: "Edmontobeta",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/Edmontobeta_ill.png"
},
			{
    id: "FM-PR06 illus03 JU",
    nameTH: "เทอราซิกนัส=รูปแบบฟินิกซ์=",
    nameEN: "Therazignus=Phoenix Mode=",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/Therazignus_ill.png"
},
			{
    id: "FM-PR06 illus04 JU",
    nameTH: "ชูไคโอ =รูปแบบเยือกแข็ง=",
    nameEN: "Shukaio =Glacier Mode=",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/Shukaio_ill.png"
},
			{
    id: "FM-PR06 illus05 JU",
    nameTH: "กิก้า พี. โปรโตไทป์",
    nameEN: "Giga P. Prototype",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/GigaP_ill.png"
},
			{
    id: "FM-PR06 illus06 JU",
    nameTH: "กิก้า เพนตัส",
    nameEN: "Guga Pentus",
    dp: "ไร้DP",
    type: "Illusion",
    set: "คู่หูเพลิงน้ำแข็ง",
    clan: "",
    ability: ``,
				image: "images/Fanmade/icefire/Gigapentus_ill.png"
},
		];