// =========================================================
//  deck_register.js — ใบลงทะเบียนเด็คสำหรับทัวร์นาเมนต์ (พิมพ์ / บันทึกเป็น PDF)
//
//  ขั้นตอน: กดปุ่ม "ใบลงทะเบียน" → กรอกชื่อที่ใช้ในเซิร์ฟเวอร์ → เปิดแท็บใหม่เป็นหน้า A4
//           → กด "พิมพ์ / บันทึก PDF" (ลิงก์เด็คในไฟล์ PDF กดได้)
//  ข้อมูลในใบ: ชื่อในเซิร์ฟเวอร์ + คำเตือนห้ามเปลี่ยนชื่อ, ชื่อเด็ค, ฟอร์แมต, ผลตรวจเด็ค,
//              ลิงก์เด็ค, จำนวนการ์ดแบบหน้า Showcase, รายการการ์ด, วันเวลาที่ทำใบ
// =========================================================

(function () {
    const NAME_KEY = 'lc_register_server_name';
    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const WARNING_TEXT = 'เมื่อลงทะเบียนด้วยชื่อนี้แล้ว ห้ามเปลี่ยนชื่อในเซิร์ฟเวอร์ ' +
        'หากเปลี่ยนชื่อ ต้องกลับมาแก้ชื่อแล้วทำใบลงทะเบียนใหม่';

    function loadName() { try { return localStorage.getItem(NAME_KEY) || ''; } catch (e) { return ''; } }
    function saveName(v) { try { localStorage.setItem(NAME_KEY, v); } catch (e) {} }

    function deckName() {
        const el = document.getElementById('deckNameInput');
        return (el && el.value.trim()) || 'เด็คไร้ชื่อ';
    }

    // ---------- หน้าต่างกรอกชื่อ ----------
    function closeRegisterDialog() {
        const d = document.getElementById('registerDialog');
        if (d) d.remove();
    }

    function openRegisterDialog() {
        if (typeof myDeck === 'undefined' || myDeck.length === 0) {
            alert('ยังไม่มีการ์ดในเด็ค');
            return;
        }
        closeRegisterDialog();
        const v = (typeof validateDeck === 'function') ? validateDeck() : null;

        const wrap = document.createElement('div');
        wrap.id = 'registerDialog';
        wrap.className = 'lc-dialog-backdrop';
        wrap.innerHTML = `
            <div class="lc-dialog" role="dialog" aria-labelledby="registerDialogTitle">
                <div class="lc-dialog-head">
                    <h3 id="registerDialogTitle">📝 ใบลงทะเบียนเด็ค</h3>
                    <button type="button" class="lc-dialog-x" aria-label="ปิด" onclick="closeRegisterDialog()">✕</button>
                </div>
                <p class="lc-dialog-sub">เด็ค <strong>${esc(deckName())}</strong>
                    · ฟอร์แมต <strong>${esc(v ? v.formatName : '')}</strong></p>
                <label class="lc-field">
                    <span>ชื่อที่ใช้ในเซิร์ฟเวอร์ (Discord)</span>
                    <input type="text" id="registerServerName" maxlength="60" autocomplete="nickname"
                           placeholder="พิมพ์ชื่อให้ตรงกับในเซิร์ฟเวอร์" value="${esc(loadName())}">
                </label>
                <p class="lc-warning">⚠️ ${esc(WARNING_TEXT)}</p>
                ${v && typeof deckValidationHTML === 'function' ? deckValidationHTML(v, { open: !v.ok }) : ''}
                ${v && !v.ok ? `<p class="lc-warning is-red">เด็คยังไม่ผ่านการตรวจ ใบลงทะเบียนจะมีหมายเหตุสีแดงกำกับ — แนะนำให้แก้ก่อน</p>` : ''}
                <div class="lc-dialog-actions">
                    <button type="button" class="lc-btn-ghost" onclick="closeRegisterDialog()">ยกเลิก</button>
                    <button type="button" class="lc-btn-primary" onclick="generateRegisterSheet()">สร้างใบลงทะเบียน</button>
                </div>
            </div>`;
        wrap.addEventListener('click', e => { if (e.target === wrap) closeRegisterDialog(); });
        document.body.appendChild(wrap);
        const input = document.getElementById('registerServerName');
        if (input) {
            input.focus();
            input.addEventListener('keydown', e => { if (e.key === 'Enter') generateRegisterSheet(); });
        }
    }

    // ---------- ข้อมูลรายการการ์ด ----------
    const TYPE_TH = {
        Creature: 'ครีเจอร์', Action: 'แอ็คชั่น', Armor: 'อาร์เมอร์', Field: 'ฟิลด์', Action_Field: 'แอ็คชั่นฟิลด์',
        Master: 'มาสเตอร์', Boost_Master: 'บูสมาสเตอร์', Boost_Creature: 'บูสครีเจอร์', Fusion_Monster: 'ฟิวชั่น',
        Armored_Dino: 'ครีเจอร์ติดเกราะ', Illusion: 'อิลูชั่น', LC: 'ไลฟ์คริสตัล', Legend: 'เลเจนด์'
    };
    const typeText = c => (Array.isArray(c.type) ? c.type : [c.type]).map(t => TYPE_TH[t] || t).join(' / ');
    const absUrl = p => { try { return new URL(p, window.location.href).href; } catch (e) { return p; } };

    function groupRows(list) {
        const rows = [], byId = {};
        list.forEach(c => {
            const id = String(c.id);
            if (!byId[id]) { byId[id] = { card: c, n: 0, cmd: false }; rows.push(byId[id]); }
            byId[id].n++;
            if (c.isCommander) byId[id].cmd = true;
        });
        return rows;
    }

    function sectionHTML(title, list, showQty) {
        if (!list.length) return '';
        const rows = groupRows(list);
        return `
        <h3>${esc(title)} <small>${list.length} ใบ</small></h3>
        <table class="cards">
            <thead><tr><th class="q">จำนวน</th><th class="img"></th><th>รหัส</th><th>ชื่อการ์ด</th><th>ประเภท</th><th class="dp">DP</th></tr></thead>
            <tbody>
            ${rows.map(r => `
                <tr>
                    <td class="q">${showQty ? '×' + r.n : (r.cmd ? '👑' : '—')}</td>
                    <td class="img"><img src="${esc(absUrl(r.card.image))}" alt=""></td>
                    <td class="id">${esc(r.card.id)}</td>
                    <td><b>${esc(r.card.nameTH || r.card.nameEN)}</b>${r.card.nameEN && r.card.nameEN !== r.card.nameTH ? `<br><span class="en">${esc(r.card.nameEN)}</span>` : ''}${r.cmd ? ' <span class="tag">Commander</span>' : ''}</td>
                    <td>${esc(typeText(r.card))}</td>
                    <td class="dp">${esc(r.card.dp)}</td>
                </tr>`).join('')}
            </tbody>
        </table>`;
    }

    function sheetHTML(data) {
        const { serverName, name, v, url, createdAt } = data;
        const s = v.counts.sections;
        const mainLimit = (typeof getMainDeckLimitLabel === 'function') ? getMainDeckLimitLabel(v.formatKey)
            : (v.rules.mainExact ? `${v.rules.mainExact} พอดี` : v.rules.mainMax);
        // หมวด Starter (ตามหน้า Showcase): Commander ที่ซ้ำหลายใบ นับ 1 ใบใน Starter ที่เหลืออยู่ใน Main
        return `<!doctype html>
<html lang="th"><head><meta charset="utf-8">
<title>ใบลงทะเบียน - ${esc(name)} - ${esc(serverName)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 12mm; }
  * { box-sizing: border-box; }
  body { font-family: 'Kanit', sans-serif; color: #1b1b1f; margin: 0; background: #e9e9ef; font-size: 13px; }
  .page { max-width: 190mm; margin: 16px auto; background: #fff; padding: 14mm 12mm; box-shadow: 0 4px 20px rgba(0,0,0,.12); }
  .toolbar { position: sticky; top: 0; background: #1e1e2e; color: #fff; padding: 10px 16px; display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; z-index: 5; }
  .toolbar button { font: inherit; background: #6c5ce7; color: #fff; border: 0; border-radius: 8px; padding: 8px 18px; cursor: pointer; }
  .toolbar span { font-size: 12px; opacity: .8; }
  header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #1e1e2e; padding-bottom: 8px; margin-bottom: 12px; gap: 12px; }
  header h1 { font-size: 22px; margin: 0; font-weight: 600; }
  header .brand { font-size: 12px; color: #666; text-align: right; }
  .info { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
  .info th { text-align: left; width: 34mm; color: #555; font-weight: 500; padding: 6px 8px; background: #f3f3f7; border: 1px solid #ddd; vertical-align: top; }
  .info td { padding: 6px 8px; border: 1px solid #ddd; }
  .server-name { font-size: 18px; font-weight: 600; }
  .warn { margin: 6px 0 0; padding: 6px 8px; border-left: 4px solid #e67e22; background: #fff5e6; font-size: 12px; }
  .bad { margin: 8px 0; padding: 8px 10px; border: 2px solid #d63031; color: #d63031; background: #fff0f0; border-radius: 6px; }
  .bad ul { margin: 4px 0 0 18px; padding: 0; }
  .ok { color: #1e8449; font-weight: 500; }
  a.link { color: #1a4a9e; word-break: break-all; font-size: 11px; }
  .counts { display: flex; gap: 8px; margin: 10px 0 4px; }
  .counts div { flex: 1; text-align: center; border: 1px solid #ddd; border-radius: 8px; padding: 6px; }
  .counts b { display: block; font-size: 20px; }
  .counts small { color: #666; }
  .counts .c1 b { color: #e67e22; } .counts .c2 b { color: #0097a7; } .counts .c3 b { color: #1a4a9e; }
  h3 { font-size: 14px; margin: 14px 0 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
  h3 small { color: #777; font-weight: 400; }
  table.cards { width: 100%; border-collapse: collapse; }
  table.cards th { font-weight: 500; font-size: 11px; color: #666; text-align: left; padding: 3px 6px; border-bottom: 1px solid #ccc; }
  table.cards td { padding: 3px 6px; border-bottom: 1px solid #eee; vertical-align: middle; }
  table.cards tr { break-inside: avoid; }
  td.q, th.q { width: 13mm; text-align: center; font-weight: 600; font-size: 14px; }
  td.img, th.img { width: 11mm; padding: 2px; }
  td.img img { width: 9mm; border-radius: 2px; display: block; }
  td.id { font-size: 11px; color: #555; white-space: nowrap; }
  td.dp, th.dp { width: 10mm; text-align: center; }
  .en { color: #777; font-size: 11px; }
  .tag { font-size: 10px; background: #ffe7b3; color: #7a4b00; border-radius: 4px; padding: 0 4px; }
  footer { margin-top: 14px; padding-top: 8px; border-top: 1px dashed #aaa; display: flex; justify-content: space-between; font-size: 11px; color: #555; gap: 10px; flex-wrap: wrap; }
  @media print {
    body { background: #fff; }
    .toolbar { display: none; }
    .page { box-shadow: none; margin: 0; padding: 0; max-width: none; }
    a.link { color: #1a4a9e; }
  }
</style></head>
<body>
<div class="toolbar">
  <button onclick="window.print()">🖨️ พิมพ์ / บันทึกเป็น PDF</button>
  <span>ตอนบันทึก PDF เลือกเครื่องพิมพ์ "Save as PDF" — ลิงก์เด็คในไฟล์จะกดได้</span>
</div>
<div class="page">
  <header>
    <div><h1>ใบลงทะเบียนเด็ค</h1><div>Dinomaster TCG</div></div>
    <div class="brand">Life Crystal<br>${esc(window.location.host || '')}</div>
  </header>

  <table class="info">
    <tr><th>ชื่อในเซิร์ฟเวอร์</th><td><div class="server-name">${esc(serverName)}</div>
      <p class="warn">⚠️ ${esc(WARNING_TEXT)}</p></td></tr>
    <tr><th>ชื่อเด็ค</th><td>${esc(name)}</td></tr>
    <tr><th>ฟอร์แมต</th><td>${esc(v.formatName)}</td></tr>
    <tr><th>ผลตรวจเด็ค</th><td>${v.ok
        ? `<span class="ok">✅ ผ่านกฎของฟอร์แมต ${esc(v.formatName)}</span>`
        : `<span style="color:#d63031;font-weight:500">❌ ยังไม่ผ่าน ${v.issues.length} ข้อ (ดูด้านล่าง)</span>`}</td></tr>
    <tr><th>ลิงก์เด็ค</th><td><a class="link" href="${esc(url)}">${esc(url)}</a></td></tr>
  </table>

  ${v.ok ? '' : `<div class="bad"><b>หมายเหตุ: เด็คนี้ยังไม่ผ่านการตรวจของเว็บ</b><ul>${v.issues.map(i => `<li>${esc(i.text)}${i.detail ? ` — ${esc(i.detail)}` : ''}</li>`).join('')}</ul></div>`}

  <div class="counts">
    <div class="c1"><small>STARTER</small><b>${v.counts.starter}</b></div>
    <div class="c2"><small>MAIN DECK</small><b>${v.counts.main}</b><small>/ ${mainLimit}</small></div>
    <div class="c3"><small>EXTRA DECK</small><b>${v.counts.extra}</b><small>/ ${v.rules.extraMax}</small></div>
  </div>

  ${sectionHTML('STARTER / COMMANDER', s.starterList, false)}
  ${sectionHTML('MAIN DECK', s.mainList.concat(s.commanderList.filter(c => !s.mainList.includes(c))), true)}
  ${sectionHTML('EXTRA DECK', s.extraList, true)}

  <footer>
    <span>ทำใบลงทะเบียนเมื่อ: <b>${esc(createdAt)}</b></span>
    <span>สร้างจาก Life Crystal │ Dinomaster TCG</span>
  </footer>
</div>
</body></html>`;
    }

    async function generateRegisterSheet() {
        const input = document.getElementById('registerServerName');
        const serverName = (input && input.value.trim()) || '';
        if (!serverName) {
            alert('กรุณากรอกชื่อที่ใช้ในเซิร์ฟเวอร์');
            if (input) input.focus();
            return;
        }
        saveName(serverName);

        // เปิดแท็บทันทีตอนกด (กันเบราว์เซอร์บล็อก popup) แล้วค่อยเติมเนื้อหา
        const win = window.open('', '_blank');
        if (!win) {
            alert('เบราว์เซอร์บล็อกหน้าต่างใหม่ — กรุณาอนุญาต Pop-up สำหรับเว็บนี้แล้วลองอีกครั้ง');
            return;
        }
        win.document.write('<p style="font-family:sans-serif;padding:20px">กำลังสร้างใบลงทะเบียน...</p>');

        try {
            const v = validateDeck();
            const url = await buildDeckShareURL();
            const now = new Date();
            const createdAt = now.toLocaleString('th-TH', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
            }) + ' น.';
            const html = sheetHTML({ serverName, name: deckName(), v, url, createdAt });
            win.document.open();
            win.document.write(html);
            win.document.close();
            closeRegisterDialog();
        } catch (e) {
            console.error(e);
            win.close();
            alert('สร้างใบลงทะเบียนไม่สำเร็จ ลองใหม่อีกครั้ง');
        }
    }

    window.openRegisterDialog = openRegisterDialog;
    window.closeRegisterDialog = closeRegisterDialog;
    window.generateRegisterSheet = generateRegisterSheet;
})();
