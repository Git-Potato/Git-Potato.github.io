let px = 0;
let py = 0;
let colorInput;//カラーピッカーを入れる変数
let dataInput;//テキストエリアを入れる変数

function setup() {
  createCanvas(512, 512);
  pixelDensity(1);//
  background(220);

  let data = getItem('paint');

  console.log('読み込みました',data);

  decodePixels(data);
  noFill()

  colorInput = select('#color'); 
  dataInput = select('#data');
}

function draw() {


  strokeWeight(10);

  if (mouseIsPressed) {
    stroke(colorInput.value());
      line(px, py, mouseX, mouseY);
      px = mouseX;
      py = mouseY;
  }
}

function mousePressed() {
  point(mouseX, mouseY);
  px = mouseX;
  py = mouseY;
}
//マウスボタンを離した時に実行される
function mouseReleased() {
  console.log("離しましたね？");
  let data = encodePixels();//絵を文字列に変換
  console.log(data);
  storeItem('paint', data);
}

function encodeInput() {
  console.log("エンコード");
  let data = encodePixels();//絵を文字列に変換
  dataInput.value(data);
}

function decodeInput() {
  console.log("デコード");
  decodePixels(dataInput.value());
}
