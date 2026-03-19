function doGet(e) {
  var id = e.parameter.id;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var targetUrl = "https://www.sanyi.gov.tw/";

  if (id) {
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(id)) {
        targetUrl = data[i][1];
        break;
      }
    }
  }

  // 將回傳內容改為 JSON，前端拿到後再跳轉
  var result = {"url": targetUrl};
  
  // 要加上允許跨來源(CORS)的機制
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
