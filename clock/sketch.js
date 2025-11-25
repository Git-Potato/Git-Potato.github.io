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
  getData();
}


function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  textAlign(CENTER);
  let date = new Date(); //Dateオブジェクトを取得
  let year = date.getFullYear();//現在の西暦を表示
  let month = date.getMonth() + 1;//現在の月を表示
  let day = date.getDate();//現在の日を表示
  let dow = date.getDay();//現在の曜日を表示
  let h = date.getHours();//時
  let m = date.getMinutes();//分
  let s = date.getSeconds();//秒

  textSize(40);

  textFont('Futura');
  text(year + '/' + month + '/' + day + '(' + week[dow] + ')', 200, 200);
  text(h + ':' + m + ':' + s, 200, 300);

  text(data.current.temperature_2m + '°C', 200, 400);
}

async function getData() {
  
  data = await loadJSON( "https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation_probability&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,precipitation&timezone=Asia%2FTokyo&forecast_days=1");
  console.log(data);


}

