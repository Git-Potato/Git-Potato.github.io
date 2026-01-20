import { Fruit } from './Fruit.js';//Fruit.jsを輸入する
import { ShapeStage } from './shapes.js';
import { drawBody, isOutOfBounds } from './util.js';

let { Engine, Bodies, Composite, Events } = Matter; // モジュールを変数化
let engine; // 物理エンジン
let delta = 1000 / 60;

//効果音集
let se = {};
Fruit.se = se;
let scene = 'title'

function setup() {
  createCanvas(400, 400);


  loadSound('./assets/star.wav', data => {
    se.star = data;
  });
  // pon=data
  //   })
  // console.log("shapeStage")

  console.log("Setup")


  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  let stage = Bodies.fromVertices(200, 300, ShapeStage, { isStatic: true });


  // 箱を世界に配置
  Composite.add(engine.world, stage);

  //物体同士がぶつかったとき、コールバックを実行イベント
  Events.on(engine, 'collisionStart', ev => {
    console.log('衝突しました', ev.pairs)
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i];//衝突したペア
      let a = pair.bodyA.parent;
      let b = pair.bodyB.parent;
      if (a.fruit) {
        a.fruit.hit(b, b.fruit);
      }

    };
  });
}

function draw() {
  background(220, 220, 255);

  // 世界に配置された全ての物体を取得（配列） 
  let bodies = Composite.allBodies(engine.world);

  // 全ての物体を描画（配列をスキャン）
  fill(255, 255, 255)
  noStroke();
  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].fruit) {
      bodies[i].fruit.draw();
      if (isOutOfBounds(bodies[i], 0, 0, width, height)) {
        //物体が画面外に出たら
        scene = 'gameover';//ゲームオーバーに移行
        delta = 1000 / (60 * 4); //スローモーションにする
      }
    } else drawBody(bodies[i]);
  }

  // 世界の更新（1 フレーム時間を進める）
  Engine.update(engine, delta);


  if (scene == 'title') {
    textSize(32);
    text('game', 200, 200);

  } else if (scene == 'game') {

  } else if (scene == 'gameover') {
    textSize(32);
    text('gameover', 200, 200)
  }
}

function mousePressed() {
  if (scene == 'title') {
    scene = 'game';

  } else if (scene == 'game') {
    new Fruit('berry', mouseX, mouseY, engine.world);

  }
}




window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
