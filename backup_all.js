// =========================================================
//  backup_all.js — สำรอง / กู้คืนข้อมูลทั้งหมดของผู้เล่นเป็นไฟล์เดียว (.json)
//
//  ข้อมูลทุกอย่างของเว็บเก็บอยู่ในเบราว์เซอร์ (localStorage) ถ้าล้างเบราว์เซอร์หรือเปลี่ยนเครื่องจะหาย
//  ไฟล์สำรองนี้รวม: คอลเล็คชั่นเด็ค, เด็คที่กำลังจัด, จำนวนการ์ดที่นับไว้ (นับการ์ดที่มี),
//                   ฟอร์แมตที่เลือก, ชื่อในเซิร์ฟเวอร์ (ใบลงทะเบียน), การตั้งค่ามุมมอง
//  ไม่รวม: คีย์ AI ส่วนตัว (dinomaster_groq_key) — เพื่อความปลอดภัย
//
//  กู้คืนได้ 2 แบบ
//    - รวมกับของเดิม (แนะนำ): เพิ่มเด็คที่ยังไม่มี, เด็คชื่อซ้ำแต่เนื้อหาต่างจะเก็บไว้ทั้งคู่,
//      จำนวนการ์ดที่นับไว้เอาค่าที่มากกว่า, เด็คที่กำลังจัด/การตั้งค่าเดิมไม่ถูกแตะ
//    - แทนที่ทั้งหมด: ใช้ข้อมูลในไฟล์แทนของเดิมทั้งหมด
// =========================================================

(function () {
    const KEYS = {
        collections: 'dinomaster_collections',
        deck: 'dinomaster_deck',
        format: 'dinomaster_banlist_format',
        sort: 'dinomaster_card_sort',
        owned: 'lc_owned_counts_v2',
        ownedView: 'lc_owned_view',
        serverName: 'lc_register_server_name',
        showcaseView: 'lc_showcase_view'
    };
    const LAST_BACKUP_KEY = 'lc_last_backup_at';

    const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
    const set = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} };
    const parse = (v, d) => { try { return v == null ? d : JSON.parse(v); } catch (e) { return d; } };
    const toast = (msg, color) => {
        if (typeof showQuickFeedback === 'function') showQuickFeedback(null, msg, color || '#2ecc71');
    };

    // ---------- สำรอง ----------
    function exportAllData() {
        const data = {};
        Object.entries(KEYS).forEach(([name, key]) => { data[name] = get(key); });
        const collections = parse(data.collections, []);
        const payload = {
            app: 'LifeCrystal',
            kind: 'full-backup',
            version: 1,
            exportedAt: new Date().toISOString(),
            summary: { decks: collections.length },
            data
        };
        const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
        const d = new Date();
        const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `LifeCrystal-backup-${stamp}.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);

        set(LAST_BACKUP_KEY, new Date().toISOString());
        renderBackupStatus();
        toast(`สำรองข้อมูลแล้ว (${collections.length} เด็ค)`);
    }

    // ---------- กู้คืน ----------
    function pickBackupFile() {
        const input = document.getElementById('backupFileInput');
        if (input) { input.value = ''; input.click(); }
    }

    function onBackupFileChosen(ev) {
        const file = ev.target.files && ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            let payload;
            try { payload = JSON.parse(reader.result); } catch (e) { payload = null; }
            if (!payload || payload.kind !== 'full-backup' || !payload.data) {
                alert('❌ ไฟล์นี้ไม่ใช่ไฟล์สำรองของ Life Crystal\n(ถ้าเป็นไฟล์เด็คเดี่ยว ให้ใช้ "นำเข้าไฟล์ .json" ในหน้าจัดเด็คแทน)');
                return;
            }
            openRestoreDialog(payload);
        };
        reader.readAsText(file);
    }

    function closeRestoreDialog() {
        const d = document.getElementById('restoreDialog');
        if (d) d.remove();
    }

    function openRestoreDialog(payload) {
        closeRestoreDialog();
        const decks = parse(payload.data.collections, []).length;
        const when = payload.exportedAt ? new Date(payload.exportedAt).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }) : '-';
        const wrap = document.createElement('div');
        wrap.id = 'restoreDialog';
        wrap.className = 'lc-dialog-backdrop';
        wrap.innerHTML = `
            <div class="lc-dialog" role="dialog" aria-labelledby="restoreTitle">
                <div class="lc-dialog-head">
                    <h3 id="restoreTitle">📂 กู้คืนข้อมูล</h3>
                    <button type="button" class="lc-dialog-x" aria-label="ปิด">✕</button>
                </div>
                <p class="lc-dialog-sub">ไฟล์สำรองเมื่อ <b>${when}</b> · มี <b>${decks}</b> เด็ค</p>
                <div class="restore-options">
                    <button type="button" class="restore-opt is-recommended" data-mode="merge">
                        <b>➕ รวมกับของเดิม</b> <span class="restore-tag">แนะนำ</span>
                        <small>เพิ่มเด็คจากไฟล์เข้าไป เด็คเดิมอยู่ครบ</small>
                    </button>
                    <button type="button" class="restore-opt is-danger" data-mode="replace">
                        <b>♻️ แทนที่ทั้งหมด</b>
                        <small>ลบข้อมูลในเครื่องนี้ แล้วใช้ข้อมูลในไฟล์แทน</small>
                    </button>
                </div>
            </div>`;
        wrap.addEventListener('click', e => {
            if (e.target === wrap || e.target.closest('.lc-dialog-x')) { closeRestoreDialog(); return; }
            const opt = e.target.closest('.restore-opt');
            if (!opt) return;
            if (opt.dataset.mode === 'replace' &&
                !confirm('ยืนยันแทนที่ข้อมูลทั้งหมดในเครื่องนี้?\n(เด็คที่ไม่มีในไฟล์สำรองจะหายไป)')) return;
            applyRestore(payload, opt.dataset.mode);
            closeRestoreDialog();
        });
        document.body.appendChild(wrap);
    }

    const deckSignature = d => JSON.stringify({ n: d.name, c: (d.cards || []).map(c => [c.id, c.image, !!c.isCommander]) });

    function applyRestore(payload, mode) {
        const src = payload.data;
        let added = 0;

        if (mode === 'replace') {
            Object.entries(KEYS).forEach(([name, key]) => set(key, src[name] == null ? null : src[name]));
            added = parse(src.collections, []).length;
        } else {
            // เด็ค: เพิ่มเฉพาะที่ยังไม่มี (เทียบจากชื่อ + รายการการ์ด)
            const cur = parse(get(KEYS.collections), []);
            const sigs = new Set(cur.map(deckSignature));
            const ids = new Set(cur.map(d => String(d.id)));
            parse(src.collections, []).forEach(d => {
                if (sigs.has(deckSignature(d))) return;
                const copy = { ...d };
                if (ids.has(String(copy.id))) copy.id = Date.now() + Math.floor(Math.random() * 100000);
                ids.add(String(copy.id));
                cur.push(copy);
                added++;
            });
            set(KEYS.collections, JSON.stringify(cur));

            // จำนวนการ์ดที่นับไว้: เอาค่าที่มากกว่า
            const own = parse(get(KEYS.owned), {});
            Object.entries(parse(src.owned, {})).forEach(([id, n]) => {
                own[id] = Math.max(parseInt(own[id], 10) || 0, parseInt(n, 10) || 0);
            });
            set(KEYS.owned, JSON.stringify(own));

            // ค่าที่ยังว่างในเครื่องนี้ → ใช้จากไฟล์
            ['serverName', 'showcaseView', 'ownedView', 'sort'].forEach(name => {
                if (get(KEYS[name]) == null && src[name] != null) set(KEYS[name], src[name]);
            });
        }

        // โหลดใหม่เพื่อให้ทุกส่วนของเว็บใช้ข้อมูลชุดใหม่
        alert(mode === 'replace'
            ? `✅ กู้คืนเรียบร้อย (${added} เด็ค)\nเว็บจะโหลดใหม่`
            : `✅ รวมข้อมูลเรียบร้อย เพิ่มเด็คใหม่ ${added} เด็ค\nเว็บจะโหลดใหม่`);
        window.location.reload();
    }

    // ---------- สถานะการสำรองล่าสุด ----------
    function renderBackupStatus() {
        const el = document.getElementById('backupStatus');
        if (!el) return;
        const last = get(LAST_BACKUP_KEY);
        const decks = parse(get(KEYS.collections), []).length;
        if (last) {
            const days = Math.floor((Date.now() - new Date(last).getTime()) / 86400000);
            el.textContent = `สำรองล่าสุด: ${days <= 0 ? 'วันนี้' : days + ' วันก่อน'}`;
            el.classList.toggle('is-warn', days >= 30 && decks > 0);
        } else {
            el.textContent = decks > 0 ? '⚠️ ยังไม่เคยสำรอง — ข้อมูลอยู่ในเบราว์เซอร์นี้เท่านั้น' : 'ข้อมูลเก็บอยู่ในเบราว์เซอร์นี้';
            el.classList.toggle('is-warn', decks > 0);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const input = document.getElementById('backupFileInput');
        if (input) input.addEventListener('change', onBackupFileChosen);
        renderBackupStatus();
        // อัปเดตสถานะทุกครั้งที่เปิดหน้าคอลเล็คชั่น
        if (typeof window.renderCollection === 'function' && !window.renderCollection._lcBackup) {
            const orig = window.renderCollection;
            window.renderCollection = function () { const r = orig.apply(this, arguments); renderBackupStatus(); return r; };
            window.renderCollection._lcBackup = true;
        }
    });

    window.exportAllData = exportAllData;
    window.pickBackupFile = pickBackupFile;
    window.renderBackupStatus = renderBackupStatus;
})();
