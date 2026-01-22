		const C_originalData = [
           // ---Original---
				// ---Creature---
			{
				id: "D001 JU",
				nameTH: "แบมบิแรปเตอร์",
				nameEN: "Bambiraptor",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา", // เพิ่มตรงนี้
				ability:`<span class="hlabi">Effect :</span><br> 
				<span class="hlauto">Auto</span>
เมื่อเข้ามาในสนาม, ค้นเด็ค > หา "Bambiraptor" 1 ใบขึ้นมือ > สับเด็ค`,
				image: "images/Original/Bambiraptor.jpg"
			},
{
				id: "D002 JU",
				nameTH: "บารีโอนิกซ์",
				nameEN: "Baryonyx",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi"> Effect :</span> <br> 
				<span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้โจมตี จะโจมตีที่ค่า DF ของการ์ดฝั่งตรงข้าม`
				,
				image: "images/Original/Baryonyx.jpg"
			},
{
				id: "D003 JU",
				nameTH: "คาร์โนทอรัส",
				nameEN: "Carnotaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP และทิ้งการ์ดเผ่าสองขา 1 ใบ Creature 1 ใบ ลด AT-300 จนจบ Turn`
				,
				image: "images/Original/Carnotaurus.jpg"
			},
{
				id: "D004 JU",
				nameTH: "คอมซอกนาทัส",
				nameEN: "Compsognathus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อมีการ์ดฝ่ายตรงข้ามกลับขึ้นมือจากสนาม ให้ Creature 1 ใบได้พลังโจมตี AT+200 จนจบเทิร์น`
				,
				image: "images/Original/Compsognathus.jpg"
			},
{
				id: "D005 JU",
				nameTH: "ไดโลโฟซอรัส",
				nameEN: "Dilophosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี Creature ที่โจมตีมาติดสภาวะผิดปกติชนิดบาดเจ็บ ลด AT-100.`
				,
				image: "images/Original/Dilophosaurus.jpg"
			},
{
				id: "D006 JU",
				nameTH: "จิกแกนโนโตซอรัส",
				nameEN: "Giganotosaurus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> Fast run (เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถใช้งานได้ทันที) <br> 
				<span class="hlcont">Cont.</span> การ์ดใบนี้ ไม่ตกเป็นเป้าหมาย Skill จาก Creature ที่มี AT น้อยกว่า`
				,
				image: "images/Original/Giganotosaurus.jpg"
			}, 
			
			{
    id: "D007 JU",
    nameTH: "สไปโนซอรัส",
    nameEN: "Spinosaurus",
    dp: 4,
    type: "Creature",
    set: "ออริจินอล",
    clan:"สองขา",
    ability: `<span class="hlabi">Effect :</span><br>
	• <span class="hlauto">Auto</span>เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี สลับ AT และ DF ของการ์ดใบนี้จนจบเทิร์น <br>
	• <span class="hlauto">Auto</span>เมื่อการ์ดใบนี้เข้ามาในสนาม Dino Card ของผู้เล่นคนอื่นทุกคนที่ DF ต่ำกว่าการ์ดใบนี้ ลด AT-500 จนจบเทิร์น`,
    image: "images/Original/Spinosaurus.jpg"
},
	
{
				id: "D008 JU",
				nameTH: "เทอริซิโนซอรัส",
				nameEN: "Therizinosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP สั่งให้ Creature 1 ใบลด AT-200 จนจบเทิร์น`
				,
				image: "images/Original/Therizinosaurus.jpg"
			},
{
				id: "D009 JU",
				nameTH: "ไทแรนโนซอรัส",
				nameEN: "Tyrannosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Effect :</span> <br> 
				• <span class="hlcont">Cont.</span> Fast run (เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถใช้งานได้ทันที) <br> 
				• <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้สั่งโจมตี การ์ดเผ่าสองขาทุกใบฝ่ายเราเพิ่ม AT+200 จนจบเทิร์น.`
				,
				image: "images/Original/Tyrannosaurus.jpg"
			},
{
				id: "D010 JU",
				nameTH: "ยูทาห์แรปเตอร์",
				nameEN: "Utahraptor",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlmanual">Manual</span> ทิ้ง Creature 1 ใบของเรา สั่งให้การ์ด 1 ใบเพิ่ม AT+200 จนจบเทิร์น`
				,
				image: "images/Original/Utahraptor.png"
			},
{
				id: "D011 JU",
				nameTH: "แองคิเซราทอปส์",
				nameEN: "Anchiceratops",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม การ์ดเผ่ามีเขา 1 ใบ ที่สวมใส่ Armor Card เพิ่ม AT+200`
				,
				image: "images/Original/Anchiceratops.jpg"
			},
{
				id: "D012 JU",
				nameTH: "เซนโทรซอรัส",
				nameEN: "Centrosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP และทิ้ง Creature 1 ใบในมือ สามารถจั่วการ์ดเพิ่มได้ 1 ใบ`
				,
				image: "images/Original/Centrosaurus.png"
			},
{
				id: "D013 JU",
				nameTH: "แชสโมซอรัส",
				nameEN: "Chasmosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> ถ้ามีการ์ดที่ติดสภาวะผิดปกติอยู่ในสนาม การ์ดใบนี้สามารถสั่งโจมตีค่า DF ของ Creature เป้าหมายได้`
				,
				image: "images/Original/Chasmosaurus.jpg"
			},
{
				id: "D014 JU",
				nameTH: "ไอนิโอซอรัส",
				nameEN: "Einiosaurus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> ตราบเท่าที่มี Armor Card ในสนาม เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถจั่วการ์ดเพิ่มได้ 1 ใบ`
				,
				image: "images/Original/Einiosaurus.jpg"
			},
{
				id: "D015 JU",
				nameTH: "จูกาโลเซราทอปส์",
				nameEN: "Jugaloceratops",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> การ์ดใบนี้สามารถโจมตี Creature ที่ติดสภาวะผิดปกติใน DF line ได้ แม้ว่าจะมี Creature ที่ AT line`
				,
				image: "images/Original/Jugaloceratops.jpg"
			},
{
				id: "D016 JU",
				nameTH: "แพคคีไรโนซอรัส",
				nameEN: "Pachyrhinosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP ทิ้งการ์ด Magic 1 ใบ ทำลายการ์ด Magic 1 ใบสนามได้`
				,
				image: "images/Original/Pachyrhinosaurus.jpg"
			},
{
				id: "D017 JU",
				nameTH: "เพนตาเซราทอปส์",
				nameEN: "Pentaceratops",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อมี Armor สวมใส่อยู่ การ์ดใบนี้ไม่ตกเป็นเป้าหมายจาก Action Card <br>   <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP ทำลาย Armor ที่ติดอยู่ 1 ใบ Creature เป้าหมายได้รับสภาวะสับสน 2 เทิร์น`
				,
				image: "images/Original/Pentaceratops.jpg"
			},
{
				id: "D018 JU",
				nameTH: "สไตราโคซอรัส",
				nameEN: "Styracosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อมี Armor สวมใส่อยู่ การ์ดใบนี้สามารถเข้าไปโจมตีการ์ดใน DF line ได้แม้ว่าจะมีการ์ดใน AT Line`
				,
				image: "images/Original/Styracosaurus.jpg"
			},
{
				id: "D019 JU",
				nameTH: "โทโรซอรัส",
				nameEN: "Torosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้าสนามเราสามารถนำ Armor Card ในมือมาสวมใส่ได้ทันที <br> 
				<span class="hlcont">Cont.</span> การ์ดใบนี้จะเพิ่ม AT 200 ตามจำนวน Armor Card ในสนามฝ่ายเรา ` ,
				image: "images/Original/Torosaurus.jpg"
			},

			{
				id: "D020 JU",
				nameTH: "ไทรเซราทอปส์",
				nameEN: "Triceratops",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				specialCommander: true,
				ability: `<span class="hlabi">Effect :</span> <br> 
				• <span class="hlcont">Cont.</span> เมื่อสวมใส่ Armor Card สามารถสั่งโจมตีได้ 2 ครั้ง <br> 
				• <span class="hlauto">Auto</span> เมื่อมี Armor Card ของเราเข้ามาในสนามจั่วการ์ดเพิ่มได้อีก 1 ใบ <br>   
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ 2 DP การ์ดใบนี้ เพิ่ม AT + 300 จนจบเทิร์น และยังสามารถโจมตีหรือป้องกันได้จนจบเทิร์นนี้`
				,
				image: "images/Original/Triceratops.jpg"
			},
			
{
				id: "D021 JU",
				nameTH: "อามัลก้าซอรัส",
				nameEN: "Amargasaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน สั่งทำลายการ์ด 1 ใบ ที่มีค่าร่ายไม่เกิน 3`
				,
				image: "images/Original/Amargasaurus.jpg"
			},			
			
{
				id: "D022 JU",
				nameTH: "อแพทโตซอรัส",
				nameEN: "Apatosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นเป้าหมายการโจมตีการ์ดทีโจมตีได้รับสภาวะหลับ 2 เทิร์นเมื่อจบการต่อสู้`
				,
				image: "images/Original/Apatosaurus.jpg"
			},
{
				id: "D023 JU",
				nameTH: "อาร์เจนติโนซอรัส",
				nameEN: "Argentinosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน สามารถหา Creature เผ่าคอยาวที่มีค่าร่ายไม่เกิน 3 จากในกองการ์ด แสดง แล้วนำขึ้นมือ`
				,
				image: "images/Original/Argentinosaurus.jpg"
			},
{
				id: "D024 JU",
				nameTH: "แบรคคีโอซอรัส",
				nameEN: "Brachiosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability:
				`<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี Creature ใบอื่น 1 ใบ ได้รับสภาวะสับสน 1 Turn (ไม่สามารถสั่งโจมตีได้ ถ้าไม่มี Creature ใบอื่นอยู่ในสนาม) <br>
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ค่าร่าย 3 สามารถหา Creature เผ่าคอยาว ที่มีพลังโจมตีไม่เกิน 800 จากสุสาน แล้วนำกลับขึ้นมือได้ 1 ใบ`
				,
				image: "images/Original/Brachiosaurus.jpg"
			},
{
				id: "D025 JU",
				nameTH: "ดิพโพลโดคัส",
				nameEN: "Diplodocus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้มีสภาวะผิดปกติ จะไม่สามารถเป็นตกเป้าหมายการโจมตีได้`
				,
				image: "images/Original/Diplodocus.jpg"
			},
{
				id: "D026 JU",
				nameTH: "มาเมนชิซอรัส",
				nameEN: "Mamenchisaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ฝ่ายเราโดนโจมตี การ์ดใบนี้ได้พลังป้องกันเพิ่มขึ้น 100`
				,
				image: "images/Original/Mamenchisaurus.jpg"
			},
{
				id: "D027 JU",
				nameTH: "ซัลต้าซอรัส",
				nameEN: "Saltasaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน สั่งให้ Creature 1 ใบ ได้รับเพิ่ม AT+100 และ DF+200`
				,
				image: "images/Original/Saltasaurus.jpg"
			},
{
				id: "D028 JU",
				nameTH: "ไซโมสซอรัส",
				nameEN: "Seismosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability:
				`<span class="hlabi">Effect :</span><br> 
				<span class="hlauto">Auto</span> เมื่อจบ Turn ป้องกัน ถ้าการ์ดใบนี้ไม่ตกเป็นเป้าหมายการโจมตี การ์ดใบนี้ได้รับ พลังโจมตี +100 <br>
				<span class="hlabi">Skill :</span><br>
				<span class="hlmanual">Manual</span> ใช้ 3 DP รักษาสภาวะผิดปกติทุกชนิดของ Creature ทุกใบของเรา`
				,
				image: "images/Original/Seismosaurus.jpg"
			},
{
				id: "D029 JU",
				nameTH: "ชูโนซอรัส",
				nameEN: "Shunosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature เผ่าคอยาว ตกสุสาน การ์ดใบนี้ได้รับเพิ่ม AT+100`
				,
				image: "images/Original/Shunosaurus.jpg"
			},
{
				id: "D030 JU",
				nameTH: "ไตตันโนซอรัส",
				nameEN: "Titanosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นหมายการโจมตี นําการ์ดใบนี้เเละ Creature ที่โจมตีกลับขึ้นมือ`
				,
				image: "images/Original/Titanosaurus.jpg"
			},	

{
				id: "D031 JU",
				nameTH: "อีแลสโมซอรัส",
				nameEN: "Elasmosaurus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlcont">Cont.</span> ถ้ามีการ์ดอีกฝ่ายติดสภาวะผิดปกติ และไม่มีการ์ดใน Attack line ของผู้เล่นคนอีกฝ่าย การ์ดใบนี้ข้ามไปโจมตี Master Card ได้ <br>   <span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ค่าร่าย 3 ย้ายสภาวะผิดปกติทุกอย่างจากการ์ดทุกใบในสนามไปไว้ที่การ์ดเป้าหมาย 1 ใบ`
				,
				image: "images/Original/Elasmosaurus.jpg"
			},
{
				id: "D032 JU",
				nameTH: "ไฮโบดัส",
				nameEN: "Hybodus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ค่าร่าย 2 สั่งให้การ์ด 1 ใบติดสภาวะบาดเจ็บ ลดพลังโจมตีลง 200`
				,
				image: "images/Original/Hybodus.jpg"
			},
{
				id: "D033 JU",
				nameTH: "ไฮโดรทีโอซอรัส",
				nameEN: "Hydrotherosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Effect :</span> <br>
				<span class="hlcont">Cont.</span> ถ้ามีการ์ดที่ติดสภาวะผิดปกติอยู่ในสนาม สามารถข้ามไปโจมตีการ์ดที่ Defense Line ได้ แม้ว่าจะมีการ์ดที่ Attack Line`
				,
				image: "images/Original/Hydrotherosaurus.jpg"
			},
{
				id: "D034 JU",
				nameTH: "อิกธิโอซอรัส",
				nameEN: "Ichthyosaurus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Effect :</span> <br>
				<span class="hlcont">Cont.</span> ตราบเท่าที่มีการ์ดชื่อ ( Ichthyosaurus ) ในสนามฝ่ายเรา 2 ใบขึ้นไป เผ่า Aquatic ลดค่า DP 1`
				,
				image: "images/Original/Ichthyosaurus.jpg"
			},
{
				id: "D035 JU",
				nameTH: "โครโนซอรัส",
				nameEN: "Kronosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี หรือเป็นเป้าหมายการโจมตี การ์ดที่ต่อสู้กับการ์ดใบนี้ได้รับสภาวะบาดเจ็บ ลดพลังโจมตีลง 200 <br>   
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ 3 DP สั่งให้ Creature 1 ใบได้รับสภาวะบาดเจ็บลด AT-200`
				,
				image: "images/Original/Kronosaurus.jpg"
			},
{
				id: "D036 JU",
				nameTH: "ไลโอโพลโลดอน",
				nameEN: "Liopleurodon",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> ถ้ามี Creature ติดสภาวะผิดปกติอยู่ในสนาม เมื่อการ์ดใบนี้โจมตี สั่งให้ Creature เป้าหมาย 1 ใบได้รับสภาวะสับสน 1 Turn`
				,
				image: "images/Original/Liopleurodon.jpg"
			},
{
				id: "D037 JU",
				nameTH: "โมซาซอรัส",
				nameEN: "Mosasaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ DP 1 และทิ้ง Creature เผ่าสัตว์น้ำ 1 ใบในมือ สั่งให้ Creature 1 ใบที่กำลังโจมตีติดสภาวะหลับ 1 Turn`
				,
				image: "images/Original/Mosasaurus.jpg"
			},
			{
				id: "D038 JU",
				nameTH: "มูเรโนซอรัส",
				nameEN: "Muraenosaurus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 2 ให้การ์ด 1 ใบ ได้รับสภาวะหลับ 1 เทิร์น`
				,
				image: "images/Original/Muraenosaurus.jpg"
			},
{
				id: "D039 JU",
				nameTH: "ออปทัลโมซอรัส",
				nameEN: "Ophthalmosaurus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ DP 2 รักษาสภาวะผิดปกติ 1 ชนิดของ Creature 1 ใบ`
				,
				image: "images/Original/Ophthalmosaurus.jpg"
			},
{
				id: "D040 JU",
				nameTH: "โรเมลโอซอรัส",
				nameEN: "Rhomaleosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อมีการ์ดของผู้เล่นคนอื่นกลับขึ้นมือจากสนาม ให้การ์ด 1 ใบติดสภาวะหลับ 1 เทิร์น และลดพลังป้องกันลง 300 จนจบเทิร์น`
				,
				image: "images/Original/Rhomaleosaurus.jpg"
			},	

{
				id: "D041 JU",
				nameTH: "อนูรอคนาทัส",
				nameEN: "Anurognathus",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม ให้การ์ด 1 ใบเพิ่ม AT+100 และ ลด DF-400 จนจบเทิร์น`
				,
				image: "images/Original/Anurognathus.jpg"
			},
{
				id: "D042 JU",
				nameTH: "ไดมอร์โฟดอน",
				nameEN: "Dimorphodon",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม ทิ้งการ์ดเผ่า Aquatic 1 ใบ สั่งให้ Creature 1 ใบ ลด DF-300 และได้รับสภาวะหลับ 1 Turn`
				,
				image: "images/Original/Dimorphodon.jpg"
			},
{
				id: "D043 JU",
				nameTH: "ยูดิมอร์โฟดอน",
				nameEN: "Eudimorphodon",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 2 DP สั่งทำลาย Magic Card 1 ใบ ในสนาม`
				,
				image: "images/Original/Eudimorphodon.jpg"
			},
{
				id: "D044 JU",
				nameTH: "นิกโตซอรัส",
				nameEN: "Nyctosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นเป้าหมายการโจมตี นำ Creature ที่โจมตีขึ้นมือ หลังจบการต่อสู้`
				,
				image: "images/Original/Nyctosaurus.jpg"
			},
{
				id: "D045 JU",
				nameTH: "เทอราโนดอน",
				nameEN: "Pteranodon",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				specialCommander: true,				
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม นำการ์ด [Tornado] จากสุสาน กลับขึ้นมือได้ 1 ใบ`
				,
				image: "images/Original/Pteranodon.jpg"
			},
{
				id: "D046 JU",
				nameTH: "เควตซัลโคเเอตลัส",
				nameEN: "Quetzalcoatlus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlcont">Cont.</span> Fast Run (เมื่อการ์ดใบนี้เข้ามาในสนามสามารถใช้งานได้ทันที) <br> 
				<span class="hlcont">Cont.</span> สามารถโจมตี Creature ใน DF Line ได้ถึงแม้จะมี Creature ใน AT Line <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม นำการ์ด เผ่ามีปีก 1 ใบในสนามฝ่ายเราขึ้นมือ  <br><br>
				(ไม่สามารถลงการ์ดใบนี้ได้หากไม่มี Creature เผ่ามีปีกในสนาม)`
				,
				image: "images/Original/Quetzalcoatlus.jpg"
			},
{
				id: "D047 JU",
				nameTH: "แรมโฟริงคัส",
				nameEN: "Rhamphorhynchus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ใช้ 3 DP สั่งให้ Creature ฝ่ายเรา 1 ใบได้รับ สภาวะหลับ 2 Turn แล้วนำ Creature เป้าหมาย 1 ใบกลับขึ้นมือ`
				,
				image: "images/Original/Rhamphorhynchus.jpg"
			},
{
				id: "D048 JU",
				nameTH: "ซอลเดส",
				nameEN: "Soldes",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อมี Creature กลับขึ้นมือ สั่งให้ผู้เล่นเป้าหมายทิ้งการ์ด 1 ใบ`
				,
				image: "images/Original/Soldes.jpg"
			},
{
				id: "D049 JU",
				nameTH: "ทาเปจารา อิมเพอเรเตอร์",
				nameEN: "Tapejara imperator",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม ผู้เล่น 1 คน แสดงการ์ดทุกใบใบมือ จากนั้นเราเลือกทิ้งการ์ด 1 ใบจากที่ดูนั้น <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสาน : ค้นเด็ค > หา Creature เผ่ามีปีก 1 ใบที่ค่า DP ไม่เกิน 3  ขึ้นมือ > สับเด็ค.`
				,
				image: "images/Original/Tapejara_imperator.jpg"
			},
{
				id: "D050 JU",
				nameTH: "ทูพูซัวรา",
				nameEN: "Tupuxuara",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				ability: `<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ 3 DP + ทิ้งการ์ดนี้จากมือ :  สามารถค้นเด็ค > หาการ์ด "Tornado" 1 ใบขึ้นมือ > สับเด็ค.`
				,
				image: "images/Original/Tupuxuara.jpg"
			},
			
{
				id: "D051 JU",
				nameTH: "แองคิโลซอรัส",
				nameEN: "Ankylosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				specialCommander: true,
				ability:`<span class="hlabi">Effect :</span> <br>
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นเป้าหมายจากการโจมตีจาก Creature ที่มี DF น้อยกว่า สั่งทำลาย Creature ได้ 1 ใบ <br>
				<span class="hlabi">Skill :</span> <br>
				<span class="hlmanual">Manual</span> ใช้ 3 DP และทิ้ง Creature เผ่ามีเกราะหางหนาม สั่งให้ Creature 1 ใบ ลด DF ตามจำนวนการ์ดที่ทิ้ง x100.`
				,
				image: "images/Original/Ankylosaurus.jpg"
			},
{
				id: "D052 JU",
				nameTH: "ดราวิโดซอรัส",
				nameEN: "Dravidosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature เผ่ามีเกราะหางหนาม ตกเป็นเป้าหมายการโจมตี Creature เผ่ามีเกราะหางหนาม 1 ใบ ได้รับเพิ่ม AT+100`
				,
				image: "images/Original/Dravidosaurus.jpg"
			},
{
				id: "D053 JU",
				nameTH: "เอ็ดมันโตเนีย",
				nameEN: "Edmontonia",
				dp: 2,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสานด้วยผลของ Centrosaurus ให้นำการ์ดใบนี้กลับขึ้นมือ`
				,
				image: "images/Original/Edmontonia.jpg"
			},
{
				id: "D054 JU",
				nameTH: "ยูโอโพลเซฟาลัส",
				nameEN: "Euoplocephalus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlcont">Cont.</span> เมื่อการ์ดใบนี้โจมตี Creature ที่ DF น้อยกว่าสามารถโจมตีที่ค่า DF ของ Creature ใบนั้นได้.`
				,
				image: "images/Original/Euoplocephalus.jpg"
			},
{
				id: "D055 JU",
				nameTH: "แกสโตเนีย",
				nameEN: "Gastonia",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature เผ่ามีเกราะหางหนามเป็นเป้าหมายการโจมตีแบบรวมฝูง สามารถสั่งให้ Creature 1 ใบ ปรับ AT+300/DF-200`
				,
				image: "images/Original/Gastonia.jpg"
			},
{
				id: "D056 JU",
				nameTH: "ฮัวหยางโกซอรัส",
				nameEN: "Huayangosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เป็นเป้าหมายจากการโจมตี Creature ที่โจมตีได้รับสภาวะบาดเจ็บ ลด AT-200 เมื่อจบการต่อสู้`
				,
				image: "images/Original/Huayangosaurus.jpg"
			},
{
				id: "D057 JU",
				nameTH: "เคนโตรซอรัส",
				nameEN: "Kentrosaurus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตีหรือตกเป็นเป้าหมายการโจมตีจาก Creature ที่มี DF น้อยกว่า การ์ดใบนี้ เพิ่ม AT+200 จนจบเทิร์น`
				,
				image: "images/Original/Kentrosaurus.jpg"
			},
{
				id: "D058 JU",
				nameTH: "มินมิ",
				nameEN: "Minmi",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบน้เป็นเป้าหมายการโจมตี Creature ที่โจมตีได้รับสภาวะบาดเจ็บ DF-200 เมื่อจบการต่อสู้`
				,
				image: "images/Original/Minmi.jpg"
			},
{
				id: "D059 JU",
				nameTH: "สเตโกซอรัส",
				nameEN: "Stegosaurus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ออกโจมตี สามารถ Creature เผ่ามีเกราะหางหนามในสุสาน 1 ใบออกจากเกมแล้วการ์ดใบนี้เพิ่ม AT+1000 จนจบ Turn. <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี Creature ที่โจมตีมาได้รับ สภาวะบาดเจ็บ ลด AT-200.`
				,
				image: "images/Original/Stegosaurus.jpg"
			},
{
				id: "D060 JU",
				nameTH: "ตูเจียงโกซอรัส",
				nameEN: "Tuojiangosaurus",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อสั่งโจมตี เพิ่ม AT ตามจำนวน Creature เผ่ามีเกราะหางหนามทุกใบในสนามฝ่ายเรา x 100 จนจบเทิร์น`
				,
				image: "images/Original/Tuojiangosaurus.jpg"
			},
	


{
				id: "D035 JU",
				nameTH: "โครโนซอรัส",
				nameEN: "Kronosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สัตว์น้ำ",
				rarity:"Golden_Rare",
				ability: `<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี หรือเป็นเป้าหมายการโจมตี การ์ดที่ต่อสู้กับการ์ดใบนี้ได้รับสภาวะบาดเจ็บ ลดพลังโจมตีลง 200 <br>   
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ 3 DP สั่งให้ Creature 1 ใบได้รับสภาวะบาดเจ็บลด AT-200`
				,
				image: "images/Original/Kronosaurus_spe.jpg"
			},	
{
				id: "D045 JU",
				nameTH: "เทอราโนดอน",
				nameEN: "Pteranodon",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีปีก",
				rarity:"Golden_Rare",
				specialCommander: true,				
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้เข้ามาในสนาม นำการ์ด [Tornado] จากสุสาน กลับขึ้นมือได้ 1 ใบ`
				,
				image: "images/Original/Pteranodon_spe.jpg"
			},	
{
				id: "D007 JU",
				nameTH: "สไปโนซอรัส",
				nameEN: "Spinosaurus",
			dp: 4,
			type: "Creature",
				set: "ออริจินอล",
				clan:"สองขา",
				rarity:"Golden_Rare",
				ability: `<span class="hlabi">Effect :</span><br>
				• <span class="hlauto">Auto</span>เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี สลับ AT และ DF ของการ์ดใบนี้จนจบเทิร์น <br>
				• <span class="hlauto">Auto</span>เมื่อการ์ดใบนี้เข้ามาในสนาม Dino Card ของผู้เล่นคนอื่นทุกคนที่ DF ต่ำกว่าการ์ดใบนี้ ลด AT-500 จนจบเทิร์น`,
				image: "images/Original/Spinosaurus_spe.jpg"
			},	
{
				id: "D059 JU",
				nameTH: "สเตโกซอรัส",
				nameEN: "Stegosaurus",
				dp: 4,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเกราะหางหนาม",
				rarity:"Golden_Rare",
				ability: `<span class="hlabi">Effect :</span> <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ออกโจมตี สามารถ Creature เผ่ามีเกราะหางหนามในสุสาน 1 ใบออกจากเกมแล้วการ์ดใบนี้เพิ่ม AT+1000 จนจบ Turn. <br> <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกเป็นเป้าหมายการโจมตี Creature ที่โจมตีมาได้รับ สภาวะบาดเจ็บ ลด AT-200.`
				,
				image: "images/Original/Stegosaurus_spe.jpg"
			},
			{
				id: "D020 JU",
				nameTH: "ไทรเซราทอปส์",
				nameEN: "Triceratops",
				dp: 3,
				type: "Creature",
				set: "ออริจินอล",
				clan: "มีเขา",
				specialCommander: true,
				rarity:"Golden_Rare",
				ability: `<span class="hlabi">Effect :</span> <br> 
				• <span class="hlcont">Cont.</span> เมื่อสวมใส่ Armor Card สามารถสั่งโจมตีได้ 2 ครั้ง <br> 
				• <span class="hlauto">Auto</span> เมื่อมี Armor Card ของเราเข้ามาในสนามจั่วการ์ดเพิ่มได้อีก 1 ใบ <br>   
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ 2 DP การ์ดใบนี้ เพิ่ม AT + 300 จนจบเทิร์น และยังสามารถโจมตีหรือป้องกันได้จนจบเทิร์นนี้`
				,
				image: "images/Original/Triceratops_spe.jpg"
			},
{
				id: "D009 JU",
				nameTH: "ไทแรนโนซอรัส",
				nameEN: "Tyrannosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "สองขา",
				rarity:"Golden_Rare",
				ability: `<span class="hlabi">Effect :</span> <br> 
				• <span class="hlcont">Cont.</span> Fast run (เมื่อการ์ดใบนี้เข้ามาในสนาม สามารถใช้งานได้ทันที) <br> 
				• <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้สั่งโจมตี การ์ดเผ่าสองขาทุกใบฝ่ายเราเพิ่ม AT+200 จนจบเทิร์น.`
				,
				image: "images/Original/Tyrannosaurus_spe.jpg"
			},			
{
				id: "D024 JU",
				nameTH: "แบรคคีโอซอรัส",
				nameEN: "Brachiosaurus",
				dp: 5,
				type: "Creature",
				set: "ออริจินอล",
				clan: "คอยาว",
				rarity:"Golden_Rare",
				ability:
				`<span class="hlabi">Effect :</span> <br> 
				<span class="hlauto">Auto</span> เมื่อการ์ดใบนี้โจมตี Creature ใบอื่น 1 ใบ ได้รับสภาวะสับสน 1 Turn (ไม่สามารถสั่งโจมตีได้ ถ้าไม่มี Creature ใบอื่นอยู่ในสนาม) <br>
				<span class="hlabi">Skill :</span> <br> 
				<span class="hlmanual">Manual</span> ใช้ค่าร่าย 3 สามารถหา Creature เผ่าคอยาว ที่มีพลังโจมตีไม่เกิน 800 จากสุสาน แล้วนำกลับขึ้นมือได้ 1 ใบ`
				,
				image: "images/Original/Brachiosaurus_spe.jpg"
			},
		];