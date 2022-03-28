const createTextFromTemplate = (title, url, template) => {
  let txt = template;

  txt = txt.replace(/%%title%%/g, title);
  txt = txt.replace(/%%URL%%/g, url);
  return txt;
}


const run = () => {
  //現在のウインドウのタブをすべて取得
  chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
    let txt = '';
    const delimiter = '\n';  //区切り文字
    const template = '%%title%%' + delimiter + '%%URL%%'; //テンプレ
    const tabList = [["",""]];//Google Spread Sheetへの投稿は一行空ける
    document.querySelector('#numOfTabs').value = tabs.length;

    tabs.forEach((tab, i) => {
      if (i != 0) txt += (delimiter + delimiter);  //最初は区切り文字不要
      console.log(tab.title + " " + tab.url);
      txt += createTextFromTemplate(tab.title, tab.url, template);
      tabList.push([tab.title, tab.url]);
    });

    document.querySelector('#txt').value = txt;
    postToGSS(tabList);
  });
}

const copy = () => {
  const copyText = document.querySelector('#txt');
  copyText.select();
  document.execCommand('copy');
}

const postToGSS = (data) => {
  const END_POINT = "https://script.google.com/macros/s/------google web apps url--------/exec";
  $.ajax({
    type: "POST",
    url: END_POINT,
    dataType: "json",
    data: { action: 'append', data: JSON.stringify(data) }
  })
    .then(
      (result) => { // 成功した時の処理
        console.log(JSON.stringify(result));
      },
      (error) => { // 失敗した時の処理
        alert('Error:' + JSON.stringify(error));
      }
    );
}

window.addEventListener('load', () => {
  run();
  document.querySelector("#copy").addEventListener("click", copy);
})
