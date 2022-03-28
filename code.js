// Google Spread Sheetのコンテナバインドスクリプト

var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();

function appendMultiRaws(array) {
  var endOfSheetRow = Number(sheet.getLastRow()) + 1;   //最終行の位置を取得
  var lastColumn = array[0].length;        //カラムの数を取得する
  var lastRow = array.length;            //行の数を取得する
  sheet.getRange(endOfSheetRow, 1, lastRow, lastColumn).setValues(array);
}

function doPost(e) {
  const reqParam = e.parameter;//パラメーターを取得
  const data = JSON.parse(reqParam.data);
  switch (reqParam.action) {//actionパラメーターの内容によって処理を分岐

    case "append": //パラメーターをそのまま返すアクション
      {
        appendMultiRaws(data);
        return ContentService.createTextOutput(JSON.stringify('done'));
      }
      break;

    //以下、case文を必要なだけ書く

    default:
      {
        const result = 'did nothing';
        return ContentService.createTextOutput(JSON.stringify(result));
      }
      break;
  }
}
