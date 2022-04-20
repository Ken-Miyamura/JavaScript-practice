$(function() {
  'use strict';
  paper.install(window);
  paper.setup(document.getElementById('main-canvas'));

  let c = Shape.Circle(200, 200, 80);
  c.fillColor = 'green';

  let text = new PointText(200, 200);
  text.justification = 'center';
  text.fillColor = 'white';
  text.fontSize = 20;
  text.content = 'Hello';

  let tool = new Tool();

  tool.onMouseDown = (e) => {
    let c = Shape.Circle(e.point.x, e.point.y, 20);
    c.fillColor = 'black';
  }
  paper.view.draw();

  // currentTypeは識別子、16はリテラル
  let currentType = 16;
  console.log(currentType);
});

function getSentence({subject, verb, object}) {
  return `${subject} ${verb} ${object}`;
}
const obj = {
  subject: "I",
  verb: "Love",
  object: "Japan"
}

console.log(getSentence(obj));

function addPrefix(prefix, ...words) {
  const prefixWord = [];
  for(i = 0; i < words.length; i++) {
    prefixWord[i] = prefix + words[i];
  }
  return prefixWord;
}

console.log(addPrefix("非", "同期", "デザイナー", "エンジニア"));

const o = {
  name: "Julia",
  greetBackWards: function() { 
    // thisをoに向くように覚えておく。
    const self = this;
    function getReverseName() {
      let nameBackWards = '';
      for(let i = self.name.length - 1; i >= 0; i--) {
        nameBackWards += self.name[i];
      }
      return nameBackWards;
    }
    return `${getReverseName()} si eman`;
  },
};

console.log(o.greetBackWards());

const cart = [
  {
    name: "iphone",
    price: 54800
  },
  {
    name: "Android",
    price: 49800
  }
];

// 各オブジェクトのnameからなる配列を新たに生成
const names = cart.map(x => x.name);
const price = cart.map(x => x.price);
console.log(names);
console.log(price);
const carts = names.map((x, y) => ({ name: x, price: price[y] }));
console.log(carts);

// filter
const array =[1, 2, 3];

// 奇数の値をもつ要素だけ集めた配列を返す
const newArray = array.filter((c, i, a) => {
  return c % 2 === 1;
});
console.log(newArray);

// reduce
const arr = [5, 7, 3, 4];
// a(アキュムレータの初期値は0)
const sum = arr.reduce((a, c, i, arr) => {
  return a += c;
}, 0);
console.log(sum);

const words = ["Beachball", "Rodeo", "Angel", "Joker", "Clover"];
const alphabetical = words.reduce((a, c) => {
  // 先頭文字のプロパティがあるかチェック
  if(!a[c[0]]) {
     // なければ空の配列作成
     a[c[0]] = [];
  }
  // 現在の要素を記憶
  a[c[0]].push(c);
  console.log(a[c[0]]);
  return a;
}, {});
console.log(alphabetical);

// オブジェクトのプロパティ列挙(filterと組み合わせて)
const o2 = {
  apple: 1,
  banana: 2,
  balloon: 3,
  guitar: 4,
  tomato: 5
};

// プロパティ名取得
const property = Object.keys(o2);
const list = property.filter(prop => prop.match(/^b/));
list.forEach(prop => console.log(`${prop}: ${o2[prop]}`));

/**
 * 車のメーカーやモデルプロパティを持つクラスオブジェクトCarを作成
 * 即時関数を使ってWeakMapををクロージャに隠す
 * 
 */ 
const Car = (function() {
  const carProps = new WeakMap();

  class Car {
    constructor(make, model) {
      this.make = make;
      this.model = model;
      this.userGears = ['p', 'n', 'r', 'd'];
      carProps.set(this, {userGear: this.userGears[0]})
    }
    // アクセッサプロパティ
    get userGear(){return carProps.get(this).userGear;}
    set userGear(value) {
      if(this.userGears.indexOf(value) < 0) {
        // 例外をスローしてエラーを示す
        throw new Error(`ギアの設定が正しくない: ${value}`);
      }
      carProps.get(this).userGear = value;
    }
    // ギアをshiftするメソッド。shiftはプロトタイプメソッド（Car.prototype.shift）
    shift(gear) {this.userGear = gear;}
  }

  return Car;
})();

const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");

console.log(car1);

car1.shift('x');
console.log(car1.userGear);
