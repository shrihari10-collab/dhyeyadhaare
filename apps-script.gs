// Google Apps Script: saves "I'm coming" sign-ups into a Google Sheet and returns the live count.
// Setup steps are in SETUP.md
const SHEET_NAME = 'RSVP';

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Time', 'Name', 'Ooru', 'People', 'Phone']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const name = String(d.name || '').slice(0, 60);
    const ooru = String(d.ooru || '').slice(0, 60);
    const count = Math.max(1, Math.min(20, parseInt(d.count, 10) || 1));
    const phone = String(d.phone || '').slice(0, 20);
    if (name && ooru) {
      // avoid duplicates: same name + ooru -> update the existing row
      const sh = sheet_();
      const rows = sh.getDataRange().getValues();
      let found = -1;
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][1]).toLowerCase() === name.toLowerCase() && String(rows[i][2]).toLowerCase() === ooru.toLowerCase()) { found = i + 1; break; }
      }
      if (found > 0) sh.getRange(found, 1, 1, 5).setValues([[new Date(), name, ooru, count, phone]]);
      else sh.appendRow([new Date(), name, ooru, count, phone]);
    }
    return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const sh = sheet_();
  const last = sh.getLastRow();
  let people = 0, entries = 0;
  if (last > 1) {
    const vals = sh.getRange(2, 4, last - 1, 1).getValues();
    entries = vals.length;
    vals.forEach(r => people += Number(r[0]) || 0);
  }
  return ContentService.createTextOutput(JSON.stringify({entries: entries, people: people})).setMimeType(ContentService.MimeType.JSON);
}
