const MG_StepNextData = [
/////////////Action/////////////
{
id: "Berserk",
nameTH: "บ้าคลั่ง",
nameEN: "Berserk",
dp: 3,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> สร้างสภาวะต่างปกติชนิดคุ้มคลั่ง+ปรับค่า AT+800/DF+800 จุด แก่ Creature เป้าหมาย เป็นเวลา 1 เทิร์น เมื่อจบเทิร์น หาก Creature ดังกล่าวต่อสุ้สำเร็จแล้วในเทิร์นนี้ ทำลาย Creature ดังกล่าว.`
,
image: "images/StepNextMG/Berserk.jpg"
},

{
id: "Blood Out",
nameTH: "กระอักเลือด",
nameEN: "Blood Out",
dp: 3,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> สร้างความเสียหายชนิดประหลาด X จุด แก่ Creature เป้าหมาย ซึ่ง X เท่ากับ ค่า AT ล่าสุด ของ Creature ดังกล่าว (ค่า SH ไม่สามารถลดค่าความเสียหาย ชนิดประหลาด ได้).`
,
image: "images/StepNextMG/Blood Out.jpg"
},

{
id: "Call of Tyrant",
nameTH: "เสียงเรียกแห่งไทแรนท์",
nameEN: "Call of Tyrant",
dp: 5,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ทิ้ง Card 1 ใบ, ค้นเด็คของเราหา Card ประเภท Creature ที่มี วงศ์ - Tyrannosauridae 1 ใบ, นำมันเข้าสนาม และ สร้าง [พร้อมรบ] ให้มันเป็นเวลา 0 เทิร์น.`
,
image: "images/StepNextMG/Call of Tyrant.jpg"
},

{
id: "Chain Shocking Stunner",
nameTH: "ช็อกมึนลูกโซ่",
nameEN: "Chain Shocking Stunner",
dp: 4,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> สร้างความเสียหายชนิดความร้อน 200 จุด และ สภาวะต่างปกติ ชนิดมึนงง แก่ Unit เป้าหมายและ Unit ใน Line เดียวกับ Unit ดังกล่าวทั้งหมด เป็นเวลา 0 เทิร์น และเราไม่สามารถเรียก Card ชื่อ "Chain Shocking Stunner" เป็นเวลา 1 เทิร์น.`
,
image: "images/StepNextMG/Chain Shocking Stunner.jpg"
},

{
id: "Charge",
nameTH: "ชาร์จ",
nameEN: "Charge",
dp: 1,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> ปรับค่า AT+400 จุดแก่ Creature เป้าหมาย เป็นเวลา 0 เทิร์น.`
,
image: "images/StepNextMG/Charge.jpg"
},

{
id: "Cliff of Pterosauria",
nameTH: "ผาแห่งเทอโรซอเรีย",
nameEN: "Cliff of Pterosauria",
dp: 5,
type: "Action_Field",
set: "สเต็ปเน็ก",
clan: "มีปีก",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> สร้าง C.Skill [พร้อมรบ] แก่ Creature เผ่า ปีกเดิม และ ปีกใหม่ ที่เราควบคุมทั้งหมด.`
,
image: "images/StepNextMG/Cliff of Pterosauria.jpg"
},

{
id: "Combination Genus Attack",
nameTH: "สายพันธุ์โจมตีแบบคอมโบ",
nameEN: "Combination Genus Attack",
dp: 4,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> ปรับค่า AT + x จุด แก่ Creature เป้าหมาย ซึ่ง x เท่ากับจำนวน Action Card ที่เรียกสำเร็จในเทิร์นนี้คูณ 100 และปรับค่า AT เดียวกันนี้ให้กับ Creature ตัวอื่นที่มีชื่อเดียวกับเป้าหมายที่เราควบคุมทั้งหมด 0 เทิร์น<br> • <span class="hlauto">Auto</span> เมื่อเรียกสำเร็จ เราจั่วการ์ด 1 ใบ`
,
image: "images/StepNextMG/Combination Genus Attack.jpg"
},

{
id: "Disintegrate",
nameTH: "แตกสลาย",
nameEN: "Disintegrate",
dp: 2,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ทำลายเป้าหมาย`
,
image: "images/StepNextMG/Disintegrate.jpg"
},

{
id: "Flashing Bolt",
nameTH: "แฟลชชิ่งโบลท์",
nameEN: "Flashing Bolt",
dp: 1,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ยกเลิกกระบวนการเรียก Action เป้าหมาย (เจ้าของนำการ์ดที่ถูกยกเลิกเข้าสุสาน )`
,
image: "images/StepNextMG/Flashing Bolt.jpg"
},

{
id: "Frozen Bulb",
nameTH: "ดวงไฟแช่แข็ง",
nameEN: "Frozen Bulb",
dp: 4,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> ยกเลิกกระบวนการเรียกของการ์ดเป้าหมาย (การ์ดที่ถูกยกเลิกกระบวนการเรียกจะถูกส่งลงสุสาน)`
,
image: "images/StepNextMG/Frozen Bulb.jpg"
},

{
id: "Life Restoration",
nameTH: "ชีวิตหวนคืนกลับ",
nameEN: "Life Restoration",
dp: 3,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> เลือกนำการ์ดในสุสาน ของเรา 1 ถึง 3 ใบ สับเข้า Deck ของเจ้าของ<br> • <span class="hlauto">Auto</span> เมื่อเรียกสำเร็จ เราจั่วการ์ด 1 ใบ`
,
image: "images/StepNextMG/Life Restoration.jpg"
},

{
id: "LP Boost Up",
nameTH: "เพิ่มพลัง LP",
nameEN: "LP Boost Up",
dp: 1,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> ฟื้นฟู LP 500 จุดแก่เรา`
,
image: "images/StepNextMG/LP Boost Up.jpg"
},

{
id: "Megatech Cycling",
nameTH: "เมกาเทคไซคลิ่ง",
nameEN: "Megatech Cycling",
dp: 2,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> เราทิ้ง Card 1 ใบ, เราจั่วการ์ด 2 ใบ<br> • <span class="hlmanual">Manual</span> เราสามารถทิ้ง Card ประเภท Action 1 ใบ แล้วนำ Action ชิ้นนี้เข้ามือเจ้าของแทนการนำเข้าสุสาน และเราไม่สามารถเรียก Card ชื่อ "Megatech Cycling"เป็นเวลา 1 เทิร์น`
,
image: "images/StepNextMG/Megatech Cycling.jpg"
},

{
id: "Seal Creature",
nameTH: "ผนึกชีวธาตุ",
nameEN: "Seal Creature",
dp: 2,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlmanual">Manual</span> เลือก Dino Card เป้าหมาย 1 ใบ ผู้ควบคุม Dino Card ใบนั้นไม่สามารถสั่งการ Dino Card ใบนั้นได้<br> • <span class="hlauto">Auto</span> เมื่อ Dino Card ดังกล่าวออกจากสนาม นำ Action ใบนี้เข้าสุสานเจ้าของ<br> • <span class="hlcont">Cont.</span> เราไม่สามารถเรียกการ์ดชื่อ Seal Creature`
,
image: "images/StepNextMG/Seal Creature.jpg"
},

{
id: "Shocking Stunner",
nameTH: "ช็อกมึน",
nameEN: "Shocking Stunner",
dp: 2,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> สร้างความเสียหายชนิดความร้อน 200 จุด และสภาวะต่างปกติ ชนิดมึนงง แก่ Unit เป้าหมาย เป็นเวลา 0 เทิร์น และเราไม่ สามารถเรียก Card ชื่อ "Shocking Stunner" เป็นเวลา 1 เทิร์น (สภาวะต่างปกติชนิดมึนงง มีผลให้ Creature ที่มีไม่สามารถถูกสั่งการ, AT=0 เป็นเวลาตามที่กำหนด/ค่า SH ไม่สามารถลดค่าความเสียหาย ชนิดความร้อน).`
,
image: "images/StepNextMG/Shocking Stunner.jpg"
},

{
id: "Steal Power",
nameTH: "ขโมยพลัง",
nameEN: "Steal Power",
dp: "ไร้DP",
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> ปรับค่า AT- X จุด แก่ Creature เป้าหมายที่ 1 และ ปรับค่า AT+x จุด แก่ Creature เป้าหมายที่ 2 ซึ่ง X เท่ากับ 100 x DP ที่จ่ายขณะที่เรียก Action ชิ้นนี้ เป็นเวลา 0 เทิร์น.`
,
image: "images/StepNextMG/Steal Power.jpg"
},

{
id: "Super Incendiary Bomb",
nameTH: "ระเบิดไฟบรรลัยกัลป์",
nameEN: "Super Incendiary Bomb",
dp: 5,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlauto">Auto</span> สร้างความเสียหายชนิดความร้อน 10000 จุด แก่ Unit ในสนามทั้งหมด และเราไม่สามารถเรียก Card ชื่อ "Super Incendiary Bomb" เป็นเวลา 1 เทิร์น`
,
image: "images/StepNextMG/Super Incendiary Bomb.jpg"
},

{
id: "Tyrant's Stomp",
nameTH: "ไทแรนท์กระทืบ",
nameEN: "Tyrant's Stomp",
dp: 3,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlmanual">Manual</span> เลือก Unit บนสนามที่กำลังต่อสุ้กับ Creature ที่เลือก 1 ตัว > หาก Unit ดังกล่าวมี DP ค่าเรียกเท่ากับหรือต่ำกว่า Creature ดังกล่าว, ทำลาย Creature ดังกล่าว.`
,
image: "images/StepNextMG/Tyrant's Stomp.jpg"
},

{
id: "Unity Processor",
nameTH: "ดำเนินการกระชับ",
nameEN: "Unity Processor",
dp: 5,
type: "Action",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> เราไม่ตกเป็นเป้าหมายจากการโจมตีทุกรูปแบบเป็นเวลา 0 เทิร์น<br> • <span class="hlmanual">Manual</span> เราค้นเด็คของเราหา Card ชื่อ "Unity Processor" กี่ใบก็ได้เข้าเขตนอกเกม, สับเด็ค<br> • <span class="hlauto">Auto</span> เราจั่ว Card X ใบ ซึ่ง X เท่ากับจำนวน Card ชื่อ "Unity Processor" ที่นำเข้าเขตนอกเกมด้วยผลสำแดงของ Action ชิ้นนี้`
,
image: "images/StepNextMG/Unity Processor.jpg"
},
/////////////////////Armor///////////
{
id: "Lizard Claws",
nameTH: "กรงเล็บกิ้งก่า",
nameEN: "Lizard Claws",
dp: 1,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> เพิ่ม AT + 100 ให้ตัวที่สวมใส่`
,
image: "images/StepNextMG/Lizard Claws.jpg"
},

{
id: "Komodo Claws",
nameTH: "กรงเล็บโคโมโด",
nameEN: "Komodo Claws",
dp: 2,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> เพิ่ม AT + 500 ให้ตัวที่สวมใส่`
,
image: "images/StepNextMG/Komodo Claws.jpg"
},

{
id: "DP Fern",
nameTH: "ดีพีเฟิร์น",
nameEN: "DP Fern",
dp: 2,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> <span class="hlcont">Cont.</span> ค่า DP สูงสุดของเรา + 1 จุด ( ค่า DP สูงสุดคือค่าสูงสุดที่ Master คนหนึ่งฟื้นฟูได้ในแต่ละเทิร์น )`
,
image: "images/StepNextMG/DP Fern.jpg"
},

{
id: "DP Fern2",
nameTH: "ดีพีเฟิร์น",
nameEN: "DP Fern",
dp: 3,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Item ชิ้นนี้เข้าสนามเราฟื้นฟู DP 2 จุด และเราไ่ม่สามารถเรียกการ์ดชื่อ DP Fern ได้เป็นเวลา 0 เทิร์น<br> • <span class="hlcont">Cont.</span> ค่า DP สูงสุดของเรา + 2 จุด ( ค่า DP สูงสุดคือค่าสูงสุดที่ Master คนหนึ่งฟื้นฟูได้ในแต่ละเทิร์น )`
,
image: "images/StepNextMG/DP Fern2.jpg"
},

{
id: "Mega T-Rex Suit",
nameTH: "ชุดเกราะเมกาที-เร็กซ์",
nameEN: "Mega T-Rex Suit",
dp: 4,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "สองขา",
ability:`กำหนดเป้าหมาย : Creature เผ่า 2 ขา ที่มี DP 4-5 <br>
<span class="hlabi">Skill :</span> <br>
 • <span class="hlcont">Cont.</span> ปรับค่า AT + 1000 / DF + 1000 ให้ตัวที่สวมใส่<br>
  • <span class="hlcont">Cont.</span> Creature ที่สวมใส่ไม่สามารถถูกนำเข้ามือจากสนามได้<br>
   • <span class="hlauto">Auto</span> เมื่อ Item ชิ้นนี้เข้าสุสานจากการเรียก เราสามารถค้นเด็คหาการ์ดประเภท Armor ที่มี DP 5 หรือต่ำกว่า แสดง นำมาขึ้นมือ แล้วสับเด็ค`
,
image: "images/StepNextMG/Mega T-Rex Suit.jpg"
},

{
id: "Megatech Yoyo",
nameTH: "เมกาเทคโยโย่",
nameEN: "Megatech Yoyo",
dp: 4,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Item ชิ้นนี้เข้าสนามจากการเรียกสร้างความเสียหายชนิดคมแข็งแก่ Unit เป้าหมาย 2000 จุด หากเป้าหมายไม่ถูกทำลายให้นำ Unit ดังกล่าวเข้ามือเจ้าของ (ค่า SH สามารถลดความเสียหายชนิดคมแข็งได้)<br> • <span class="hlmanual">Manual</span> เมื่อ Item ชิ้นนี้เข้าสุสานจากสนาม เราสามารถจ่า LP 400 จุด นำ Item ชิ้นนี้เข้ามือเจ้าของ`
,
image: "images/StepNextMG/Megatech Yoyo.jpg"
},

{
id: "Zigzag Boots",
nameTH: "รองเท้าซิคแซ็ค",
nameEN: "Zigzag Boots",
dp: 2,
type: "Armor",
set: "สเต็ปเน็ก",
clan: "",
ability:`<span class="hlabi">Skill :</span> <br> • <span class="hlcont">Cont.</span> สร้าง C.Skill [ ซิคแซ็ค ] แก่ Creature ที่สวมใส่ เป็นเวลาตราบที่ยังสวม Armor ชิ้นนี้ ( Unit ที่มี [ ซิคแซ็ค ] ไม่สามารถถูกป้องกันด้วย Unit จำนวน 1 ตัวได้<br> • <span class="hlmanual">Manual</span> จ่าย DP 2 จุด + ทิ้งการ์ด 1 ใบ : นำ Item ชิ้นนี้เข้ามือเจ้าของ`
,
image: "images/StepNextMG/Zigzag Boots.jpg"
},


//////////////Master////////////////////
{
    id: "Master Chen",
    nameTH: "เชน",
    nameEN: "Master Chen",
    dp: "ไร้DP",
    type: "Master",
    set: "สเต็ปเน็ก",
    clan: "",
    ability: `<span class="hlabi">Master Skill :</span> <br> • <span class="hlauto">Auto</span> เมื่อ Master คนใดสับเด็ค : เราสามารถจั่วการ์ด 1 ใบ <br> • <span class="hlauto">Auto</span> เมื่อ Master คนใดจั่วการ์ดนอกช่วงจั่ว : เราสามารถสับเด็คของเรา <br> <span class="hlabi">Ultimate Master Skill :</span> <br> <span class="hlmanual">Manual</span> ท่าไม้ตาย ! "หยิน หยาง" <br> • จ่าย DP 5 จุด : สลับ Creature ทั้งหมดที่อยู่ใน Line เดิมไปยังอีก Line หนึ่ง > เราเลือกการ์ดในมือตามต้องการไว้ใต้เด็คของเราและมาสเตอร์คนอื่นทั้งหมดนำการ์ดในมือทั้งหมดไว้ใต้เด็คตน > Master ทุกคนจั่วการ์ดตามจำนวนการ์ดที่นำไว้ใต้เด็ค (ใช้ Ultimate Master Skill นี้ได้ตั้งแต่เทิร์นที่ 5 ขึ้นไป)`,
    image: "images/Stepnext/Master Chen.png"
},

{
    id: "Master Keiko",
    nameTH: "เคโกะ",
    nameEN: "Master Keiko",
    dp: "ไร้DP",
    type: "Master",
    set: "สเต็ปเน็ก",
    clan: "",
		handSize: 7,
    ability: `<span class="hlabi">Master Skill :</span> <br> • <span class="hlcont">Cont.</span> เราสามารถดูการ์ดลำดับบนสุดของเด็คเราได้ตลอดเวลา <br> • <span class="hlmanual">Manual</span> แสดงการ์ดลำดับบนสุดของเด็คของเรา : เราฟื้นฟู LP 100 จุด <br> <span class="hlabi">Ultimate Master Skill :</span> <br> <span class="hlmanual">Manual</span> ท่าไม้ตาย ! "บทละครที่เขียนไว้" <br> • จ่าย DP 5 จุด : เราดูการ์ดลำดับบนสุด 10 ใบบนเด็คของเรา, เราสามารถเลือกการ์ดประเภท Creature ที่มีค่าเรียก 5 จุดหรือต่ำกว่าไม่เกิน 2 ใบเข้าสนามในไลน์ใดก็ได้ในการควบคุมของเรา, นำการ์ดที่เหลือสับกลับเข้าเด็คของเรา, เราฟื้นฟู LP 1000 จุด (ใช้ Ultimate Master Skill นี้ได้ตั้งแต่เทิร์นที่ 5 ขึ้นไป)`,
    image: "images/Stepnext/Master Keiko.png"
},

{
    id: "Master Shino",
    nameTH: "ชิโนะ",
    nameEN: "Master Shino",
    dp: "ไร้DP",
    type: "Master",
    set: "สเต็ปเน็ก",
    clan: "",
    ability: `<span class="hlabi">Master Skill :</span> <br> • <span class="hlcont">Cont.</span> Master ฝ่ายตรงข้ามสามารถฟื้นฟูค่า LP ไม่เกิน 200 จุดต่อครั้ง <br> • <span class="hlmanual">Manual</span> จ่าย DP 2 จุด + ทิ้งการ์ด 1 ใบ : ค้นเด็คของเราหาการ์ดที่มีชื่อหรือส่วนหนึ่งของชื่อว่า Megatech 1 ใบ, แสดง, นำเข้ามือ, สับเด็คของเรา <br> <span class="hlabi">Ultimate Master Skill :</span> <br> <span class="hlmanual">Manual</span> ท่าไม้ตาย ! "เมกาเทค ดิ เอ็นด์" <br> • จ่าย DP 8 จุด : ค้นเด็คและในสุสานของเราหาการ์ดที่มีชื่อหรือส่วนหนึ่งของชื่อว่า Megatech รวมกันไม่เกิน 8 ใบ, แสดง, นำเข้ามือ, สับเด็คของเรา, เรารับ DP 4 จุด (ใช้ Ultimate Master Skill นี้ได้ตั้งแต่เทิร์นที่ 8 ขึ้นไป)`,
    image: "images/Stepnext/Master Shino.png"
},

{
    id: "Master Touch",
    nameTH: "ทัช",
    nameEN: "Master Touch",
    dp: "ไร้DP",
    type: "Master",
    set: "สเต็ปเน็ก",
    clan: "",
    ability: `<span class="hlabi">Master Skill :</span> <br> <span class="hlauto">Auto</span> เมื่อ Creature ที่เราควบคุมโจมตี > ปรับค่า AT+200 แก่ Creature เหล่านั้นเป็นเวลา 0 เทิร์น <br> <span class="hlabi">Ultimate Master Skill :</span> <br> <span class="hlmanual">Manual</span> ท่าไม้ตาย ! "ทัศนา คงกระพัน" <br> • จ่าย DP 5 จุด : สร้าง C.Skill [อมตะ] และปรับค่า AT+500 แก่ Creature เผ่า สองขา ทั้งหมดที่เราควบคุมเป็นเวลา 0 เทิร์น (Creature ที่มี [อมตะ] ไม่สามารถถูกทำลายได้) (ใช้ Ultimate Master Skill นี้ได้ตั้งแต่เทิร์นที่ 5 ขึ้นไป)`,
    image: "images/Stepnext/Master Touch.png"
},

];