/**
 * Async Function
 */
 async function doAsync() {
    return "値";
}
// doAsync関数はPromiseを返す
doAsync().then(value => {
    console.log(value);
})

// 通常の関数ではPromiseインスタンスを返している
// function doAsync() {
//     return new Promise((resolve, reject) => {
//         try {
//             resolve("値");
//         } catch (e) {
//             reject(new Error(e.message));
//         }
//     });
// }

// doAsync().then(value => {
//     console.log(value);
// })


// function dummyFetch(path) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (path.startsWith("/src")) {
//                 resolve({body: `response body of ${path}`});
//             } else {
//                 reject(new Error("Not Found"));
//             }
//         }, 1000 * (Math.random));
//     });
// }

// // srcAとbを順番に取得する
// function fetchAB() {
//     const result = [];
//     return dummyFetch("/src/A")
//     .then((res) => {
//         result.push(res.body);
//         return dummyFetch("/src/B");
//     }).then((res) => {
//         result.push(res.body);
//         return result;
//     }).catch((err) => {
//         console.error(err.message);
//     });
// }

// // リソースを取得して出力する
// fetchAB().then(result => {
//     console.log(result);
// });

// 上記コメントアウト処理をasync/awaitを使って書く
function dummyFetch(path) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (path.startsWith('/src')) {
                resolve({body: `response body of ${path}`});
            } else {
                reject(new Error("Not Found"));
            }
        }, 1000 * (Math.random));
    })
}

async function fetchAB() {
    const result = [];
    const resA = await dummyFetch("/src/A");
    result.push(resA.body);
    const resB = await dummyFetch("/src/B");
    result.push(resB.body);
    return result;
}

fetchAB().then(value => {
    console.log(value);
})

/**
 * Async Functionと反復処理
 * 指定したsrcのパスの配列を渡して、それらを順番に取得するfetchSrc関数を実装
 * Async Function内でfor文を使った反復処理を行い、forループの中でawait文を使ってリソースの取得を待ち、その結果を追加
 * 上で定義したdummyFetch関数を使う
 */
async function fetchSrc(src) {
    const result = [];
    for (let i = 0; i < src.length; i++) {
        const array = src[i];
        // ループ内で非同期処理の完了を待つ
        const res = await dummyFetch(array);
        result.push(res.body);
    }
    // 反復処理が全て終わり次第resultを返す（返り値となるPromiseを`result`でresolveする）
    return result;
}

const src = [
    "/src/A",
    "/src/B",
    "/src/C",
    "/src/D",
    "/src/E",
];

fetchSrc(src).then(result => {
    console.log(result);
});

/**
 * Promise APIとAsync Functionを組み合わせる
 * Promise.allメソッドとAsync Functionを組み合わせて、同時にsrcを取得するfetchAllSrc関数を実装
 * Promise.allメソッドの返すPromiseインスタンスをawaitすることで、非同期処理の結果を配列としてまとめて取得
 * 上で定義したdummyFetch関数を使う
 */

async function fetchAllSrc(src) {
    // srcを同時に取得する
    const promises = src.map(currentValue => {
        return dummyFetch(currentValue);
    });
    // 全てのsrcが取得できるまで待つ
    // Promise.allは[resA, resB]のように結果が配列となる
    const res = await Promise.all(promises);
    // 取得した結果からresのbodyを返す
    return res.map(currentValue => {
        return currentValue.body;
    })
}

// 上で定義した定数srcを使う。
fetchAllSrc(src).then(result => {
    console.log(result);
})

