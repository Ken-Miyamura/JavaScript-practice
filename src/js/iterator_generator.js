/**
 * iterator（反復子）
 */

// 配列（反復可能なオブジェクト
const movie = [
    "Harry Potter",
    "Alice in WonderLand",
    "Star Wars",
    "Avengers",
];

for(let num of movie) {
    console.log(num);
}

// movieをイテレータに変換し、定数itにイテレータ代入
const it = movie.values();
// イテレータを使用
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}

// メッセージにタイムスタンプを付加して記憶していくロギング用のクラスlog
class Log {
    constructor() {
        this.messages = [];
    }
    // ログにメッセージを記録するメソッド
    add(message) {
        const now = Date.now();
        console.log(`ログ追加: ${message}(${now})`);
        this.messages.push({message, timestamp: now});
    }
    // イテレータプロトコルを実装し、ログをエントリー順に処理したい
    [Symbol.iterator]() {
        return this.messages.values();
    }
}

const log = new Log();
log.add('海の監視初日');
// 　時間の経過をシミュレート
setTimeout(function(){log.add('クジラ発見！');}, 3*1000);
setTimeout(function(){log.add('船を見た！');}, 7*1000);
setTimeout(function(){
    console.log(`本日の業務報告: ${new Date()}`);
    for(entry of log) {
        const date = new Date(entry.timestamp);
        console.log(`${entry.message} (${date})`);
    }
}, 10*1000);

/**
 * generator（反復子）
 */

// 虹の７色を順番に返すジェネレータ
function* rainbow() {
    yield '赤';
    yield '橙';
    yield '青';
    yield '黄';
    yield '緑';
    yield '水色';
    yield '紫';
}

// const it2 = rainbow();
// let colors = it2.next();
// while(!colors.done) {
//     console.log(colors);
//     colors = it2.next();
// }

for(let color of rainbow()) {
    console.log(color);
}

// 呼び出し側との双方向コミュニケーション
function* interrogate() {
    const name = yield "お名前は?";
    const color = yield "お好きな色は何ですか？";
    return `${name}さんの好きな色は${color}だそうです`;
}

const it3 = interrogate();
console.log(it3.next());
console.log(it3.next('さゆ'));
console.log(it3.next('ピンク'));



