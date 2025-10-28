let qrData;
let url = 'google.com';//初期表示のURL
let input;//入力欄
let inputcolor;


function setup() {
  createCanvas(1000, 1000);
  frameRate(15);
  qrData = qr.encodeQR(url, 'raw');//QRコードのデータを入れる
  input = select('#url')//入力欄を取得
  inputcolor = select('#url');//入力欄の色を取得
  inputcolor.style('background-color', '#ff6600ff');//入力欄の背景色を変更
}

function draw() {
  background(25, 24, 230);
  textSize(18);
  text(input.value(), 50, 398)

  qrData = qr.encodeQR(input.value(), 'raw')

  fill(170, 100, 10.)//塗りの色
  for (let y = 0; y < qrData.length; y++) {
    let line = qrData[y];//y番目の列
    for (let x = 0; x < line.length; x++) {

      let cell = line[x];
      if (cell) {
        rect(x * 5, y * 5, 5)   
        //text('◾️', x * 15, y * 15);
      }
    }
  }
}

