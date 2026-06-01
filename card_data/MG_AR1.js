const MG_AR1Data = [

{
    id: "2018NE-ARDE604",
    nameTH: "แกสโตเนีย ลอร์เรียมวินนีเย",
    nameEN: "Gastonia lorriemcwhinneyae",
    dp: 3,
    type: "Creature",
    set: "AR1",
    clan: "มีเกราะหางหนาม",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อเข้ามาในสนาม : Creature ฝ่ายตรงข้ามที่อยู่ใน DF Line ปรับค่า DF-300 เป็นเวลา 2 เทิร์น. <br> • <span class="hlauto">Auto</span> เมื่อมีการ์ดที่มีคำว่า "Pelta" อยู่ในชื่อเข้าสนาม : นำการ์ดลำดับบนสุดเด็คเป้าหมายเข้าสุสาน 2 ใบ`,
    image: "images/C_AR1/Gastonia lorriemcwhinneyae.jpg"
},
{
    id: "2018NE-ARDE203",
    nameTH: "นาซูโทเซราทอปส์ ทิทูซิ",
    nameEN: "Nasutoceratops titusi",
    dp: 3,
    type: "Creature",
    set: "AR1",
    clan: "มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้สวม Armor สำเร็จ กำหนด Creature 1 เป้าหมายติดสภาวะสับสน 1 เทิร์น. <br> <span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> ทำลาย Armor Card ที่การ์ดใบนี้สวมใส่ : กำหนด Creature 1 เป้าหมาย > Creature ใบดังกล่าวรับสภาวะสับสน 1 เทิร์น และ ลด DF 400.`,
    image: "images/C_AR1/Nasutoceratops titusi.jpg"
},

    //////////////////////
{
    id: "2018NE-AR-AC001",
    nameTH: "พายุทราย",
    nameEN: "Sand Storm",
    dp: 3,
    type: "Action",
    set: "AR1",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> Creature ทุกใบในสนามไม่สามารถสั่งโจมตีได้เป็นเวลา 1 เทิร์น`,
    image: "images/AR1MG/Sand Storm.jpg"
},
{
    id: "2018NE-AR-AC002",
    nameTH: "แสงเหนือ",
    nameEN: "Aurora Borealis",
    dp: 3,
    type: "Action",
    set: "AR1",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> Creature เป้าหมายเพิ่ม AT ตาม DP ของ Creature ดังกล่าว x 200`,
    image: "images/AR1MG/Aurora Borealis.jpg"
},
{
    id: "2018NE-AR-AC003",
    nameTH: "ลมเฉือน",
    nameEN: "Wind Shear",
    dp: 4,
    type: "Action",
    set: "AR1",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlmanual">Manual</span> ทำลาย Action Card ที่กำลังใช้งานอยู่ 1 ใบ และ สร้างความเสียหาย 700 จุด แก่ Creature 1 เป้าหมายที่อยู่ใน AT Line`,
    image: "images/AR1MG/Wind Shear.jpg"
},
{
    id: "2018NE-AR-AC004",
    nameTH: "เสาเพลิงหมุน",
    nameEN: "Fire Whirl",
    dp: 5,
    type: "Action",
    set: "AR1",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlmanual">Manual</span> สร้างความเสียหาย 600 จุดแก่ Creature ทุกใบที่ DF Line (เกิดผลแก่ทุกฝ่าย)`,
    image: "images/AR1MG/Fire Whirl.jpg"
},
{
    id: "2018NE-AR-AC005",
    nameTH: "เฮอริเคน",
    nameEN: "Hurricane",
    dp: 4,
    type: "Action",
    set: "AR1",
    clan: "",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlmanual">Manual</span> นำ Creature 1 ใบ พร้อมทั้ง Armor ที่การ์ดนั้นสวมใส่กลับขึ้นมือเจ้าของ`,
    image: "images/AR1MG/Hurricane.jpg"
},
{
    id: "2018NE-AR-FC001",
    nameTH: "พื้นที่ภูเขา",
    nameEN: "Mountain Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "สองขา",
    ability: `<span class="hlabi">Effect :</span> <br> 
    • <span class="hlcont">Cont.</span> เพิ่มค่า AT 400 ให้กับ สองขา ที่เราควบคุมทุกใบใน AT Line.`,
    image: "images/AR1MG/Mountain Field.jpg"
},
{
    id: "2018NE-AR-FC002",
    nameTH: "ทุ่งเฟิร์น",
    nameEN: "Fern Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> ลดการจ่าย DP 1 จุด เมื่อสวม Armor Card ให้ มีเขา.`,
    image: "images/AR1MG/Fern Field.jpg"
},
{
    id: "2018NE-AR-FC003",
    nameTH: "ป่าต้นไม้ยักษ์",
    nameEN: "Redwood Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "เผ่าคอยาว",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เผ่าคอยาว ที่เราควบคุมทุกใบ AT+400 เมื่อเข้าสนามจากสุสาน.`,
    image: "images/AR1MG/Redwood Field.jpg"
},
{
    id: "2018NE-AR-FC004",
    nameTH: "พื้นที่ทะเลเปิด",
    nameEN: "Pelagic Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "สัตว์น้ำ",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> สัตว์น้ำ ที่เราควบคุมทุกใบ เมื่อเข้ามาในสนาม ลด DP ค่าเรียก ลง 1 จุด.`,
    image: "images/AR1MG/Pelagic Field.jpg"
},
{
    id: "2018NE-AR-FC005",
    nameTH: "หน้าผา",
    nameEN: "Cliff Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlauto">Auto</span> เมื่อเรียก Creature เผ่ามีปีก ลงมาในสนามที่ AT Line สร้างความเสียหาย 200 ให้กับ Creature 1 ใบ.`,
    image: "images/AR1MG/Cliff Field.jpg"
},
{
    id: "2018NE-AR-FC006",
    nameTH: "พื้นที่ทะเลทราย",
    nameEN: "Desert Field",
    dp: 3,
    type: "Action_Field",
    set: "AR1",
    clan: "มีเกราะหางหนาม",
    ability: `<span class="hlabi">Effect :</span> <br> • <span class="hlcont">Cont.</span> Creature ที่โจมตี มีเกราะหางหนาม -AT 500 จนจบเทิร์น.`,
    image: "images/AR1MG/Desert Field.jpg"
},
  {
    id: "2018NE-AR-AR001",
    nameTH: "สนับจันทร์เสี้ยว",
    nameEN: "Crescent Gaiter",
    dp: 4,
    type: "Armor",
    set: "AR1",
    clan: "สองขา, มีเขา",
    ability: `<span class="hlabi">Effect :</span> <br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่ปรับค่า AT +1000/DF +1000.<br>
    • <span class="hlauto">Auto</span> เมื่อการ์ดใบนี้ตกสุสานจากกองการ์ดหรือจากมือ : นำการ์ดใบนี้กลับขึ้นมือเจ้าของใน ช่วงจบเทิร์น.`,
    image: "images/AR1MG/Crescent_Gaiter.jpg"
  },
  {
    id: "2018NE-AR-AR002",
    nameTH: "ชุดสะสมพลังงาน",
    nameEN: "Energy Storage Suit",
    dp: 3,
    type: "Armor",
    set: "AR1",
    clan: "สองขา, มีเกราะหางหนาม, สัตว์น้ำ, มีเขา, มีปีก, คอยาว",
    ability: `<span class="hlabi">Effect :</span> <br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่เพิ่ม AT 300<br>
    • <span class="hlcont">Cont.</span> หากมีการใช้งาน Action Card เกิดขึ้น : Creature ที่สวมปรับเพิ่ม AT 100 ต่อ Action Card 1 ใบที่ประกาศใช้งาน.`,
    image: "images/AR1MG/Energy_Storage_Suit.jpg"
  },
  {
    id: "2018NE-AR-AR003",
    nameTH: "กรงเล็บโลหะ",
    nameEN: "Metal Claw",
    dp: 4,
    type: "Armor",
    set: "AR1",
    clan: "สองขา, มีปีก",
    ability: `<span class="hlabi">Effect :</span> <br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่เพิ่ม AT+X (X=DP ของ Creature ที่สวมใส่ x200).`,
    image: "images/AR1MG/Metal_Claw.jpg"
  },
  {
    id: "2018NE-AR-AR004",
    nameTH: "หมวกกันน็อค",
    nameEN: "Safety Helmet",
    dp: 4,
    type: "Armor",
    set: "AR1",
    clan: "คอยาว, มีเกราะหางหนาม",
    ability: `<span class="hlabi">Effect :</span> <br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่เพิ่ม DF 400 และไม่ถูกทำลายจากการต่อสู้ 1 ครั้ง.<br>
    • <span class="hlauto">Auto</span> เมื่อจบการต่อสู้นำ Armor ชิ้นนี้ลงสุสาน และ เราจั่วการ์ด 1 ใบ.`,
    image: "images/AR1MG/Safety_Helmet.jpg"
  },
  {
    id: "2018NE-AR-AR005",
    nameTH: "ผ้าคลุมไททัน",
    nameEN: "Titan Rope",
    dp: 3,
    type: "Armor",
    set: "AR1",
    clan: "คอยาว, สัตว์น้ำ",
    ability: `<span class="hlabi">Effect :</span> <br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่เพิ่ม ไม่ติดสภาวะสับสน เมื่ออยู่ใน AT Line.<br>
    • <span class="hlcont">Cont.</span> Creature ที่สวมใส่จะไม่รับผลสำแดงจาก Action Card ของฝ่ายตรงข้าม.`,
    image: "images/AR1MG/Titan_Rope.jpg"
  }

];