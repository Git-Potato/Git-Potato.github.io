let data;
//各曜日の配列
let week = [
  '日',
  '月',
  '火',
  '水',
  '木',
  '金',
  '土',
];
async function preload() {
 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // loadImage();
  getData();//天気情報を取得する関数を実行
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  colorMode(RGB);
  fill(253,179,0);
  textAlign(CENTER);
  let date = new Date(); //Dateオブジェクトを取得
  let year = date.getFullYear();//現在の西暦を表示
  let month = date.getMonth() + 1;//現在の月を表示
  let day = date.getDate();//現在の日を表示
  let dow = date.getDay();//現在の曜日を表示
  let h = date.getHours();//時
  let m = date.getMinutes();//分
  let s = date.getSeconds();//秒

  textSize(50);

  textFont('Futura');
  text(year + '/' + month + '/' + day + '(' + week[dow] + ')', 200, 200);
  text(h + ':' + m + ':' + s, 200, 300);

  if (data) {
  text(data.current.temperature_2m + '°C', 200, 400);//気温表示 
}


}

//天気情報を取得する
function getData() {
  
  loadJSON( "https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation_probability&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&timezone=Asia%2FTokyo&forecast_days=1", newdata =>{
    data = newdata;//データ取得完了
    console.log(data);
  });
}