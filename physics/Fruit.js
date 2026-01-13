import { drawBody,scaleShape } from './util.js';
import { ShapeBerry } from './shapes.js';


let { Engine, Bodies, Composite } = Matter; // モジュールを変数化

class Fruit {
  constructor(type, x, y, world) {
    console.log("果物" + type + 'ができました');
    this.merged = false;//合体済みかどうか
    this.type = type;
    this.data = data[type];

    if (this.data.shape) {
      this.body = Bodies.fromVertices(x, y,this.data.shape);
    } else {
      this.body = Bodies.circle(x, y, this.data.size, { isStatic: false });//物理的な実態

    }


    this.body.fruit = this;
    this.world = world;

    Composite.add(world, this.body);
  }
  draw() {
    push();
    fill(this.data.color);
    drawBody(this.body);
    pop();
  }
  hit(b, fruit) {
    if (this.merged) return;//すでに合体済みなら何もしない
    if (fruit) {
      console.log('fruit.type' + 'に当たった');

      if (this.type == fruit.type) {
        //aitega同じ種類なら
        this.merged = true;
        this.merge(b);//bと合体する
      }
    }
  }
  //他のfruitと合体する
  merge(b) {
    let ax = this.body.position.x;
    let ay = this.body.position.y;
    //Aの中心点
    let bx = b.position.x;
    let by = b.position.y;
    //Bの中心点
    let dx = (bx - ax) / 2;
    let dy = (by - ay) / 2;
    //Aからみた衝突位置
    let x = ax + dx;
    let y = ay + dy;
    //新しい果物の位置
    Composite.remove(this.world, this.body);
    Composite.remove(this.world, b);
    //古い果物を削除


    let nextType = data[this.type].next;

    //新しい果物を生成
    if (data[nextType]) {
      new Fruit(nextType, x, y, this.world);
    }
  }
}

let data = {
  berry: {
    color: 'crimson',
    size: 20,
    shape: scaleShape(ShapeBerry, 0.5),
    next: 'grape'
  },
  grape: {
    color: 'purple',
    size: 30,
    next: 'orange'
  },
  orange: {
    color: 'orange',
    size: 40,
    next: 'kaki'
  },
  kaki: {
    color: 'darkorange',
    size: 50,
    next: 'momo'
  },
  momo: {
    color: 'red',
    size: 60,
    next: 'nashi'
  },
  nashi: {
    color: 'yellow',
    size: 70,
    next: 'meronn'
  },
  meronn: {
    color: 'lightgreen',
    size: 80,
    next: 'suika'
  },
  suika: {
    color: 'green',
    size: 90,
    next: 'x'
  }
}
export { Fruit };