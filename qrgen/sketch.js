let qrData;
let url = 'goog';
let input;//入力欄


function setup() {
  createCanvas(1000, 1000);
  frameRate(15);
  qrData = qr.encodeQR(url, 'raw');//QRコードのデータを入れる
  input = select('#url')//入力欄を取得

}

function draw() {
  background(303
  );
  textSize(18);
  text(input.value(), 50, 398)

  qrData = qr.encodeQR(input.value(), 'raw')

  fill(10, 10, 10.)//塗りの色
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

