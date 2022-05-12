// コールバック
console.log("setTimeoutの前：" + new Date());
setTimeout(() => console.log("アロー関数の中：" + new Date()), 10*1000);
console.log("setTimeoutの後");
console.log("これもsetTimeoutの後");

// 5秒ごとに１０回、現在時刻を示す
const start = new Date();
let i = 0;
const interValid = setInterval(() => {
    let now = new Date();
    if(now.getMinutes() !== start.getMinutes() || ++i > 10) {
        return clearInterval(interValid);
    }
    console.log(`${i}: ${now}`);
}, 5*1000);


/** スコープと非同期の実行
 * コールバックはスコープ（クロージャ）の全てにアクセスできることに注意
 */
function countDown() {
    // let i;
    console.log('カウントダウン：');
    for(let i=5; i>=0; i--) {
        setTimeout(function() {
            console.log(i === 0 ? 'GO!!' : i);
        }, (5 - i)*1000)
    }
}

countDown();

/** エラーファーストコールバック
 * 1000ミリ秒未満のランダムなタイミングでレスポンスを疑似的にデータ取得する関数
 * 指定した`path`にデータがある場合は`callback(null, レスポンス)`を呼ぶ
 * 指定した`path`にデータがない場合は`callback(エラー)`を呼ぶ
 */
function dummyFetch(path, callback) {
    setTimeout(() => {
        if(path.startsWith("/js")) {
            callback(null, {body: `response body of ${path}`});
        } else {
            callback(new Error("Not Found"))
        }
    }, 1000 * Math.random());
}

dummyFetch("/js/ajax.js", (err, res) => {
    if(err) {
        console.error(err);
    } else {
        console.log(res);
    }
})

dummyFetch("/ts/index.ts", (err, res) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log(res);
    }
})

// Promise
