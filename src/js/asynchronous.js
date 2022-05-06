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