async function main() {
    try {
        const userId = document.getElementById('userId').value;
        // Promiseに解決されたJSONオブジェクトを定数に代入
        const userInfo = await fetchUserInfo(userId);
        const view = createView(userInfo);
        displayView(view);
    } catch (err) {
        console.error(`エラーが発生：${err}`);
    }

    /**
     * Promiseチェーンで処理分割した形跡
     */
    // fetchUserInfo('Ken-Miyamura')
    // JSONオブジェクトで解決されるPromise
    // .then((userInfo) => createView(userInfo))
    // HTML文字列で解決されるPromise
    // .then((view) => displayView(view))
    // Promiseチェーンの中でエラー発生した場合、キャッチ
    // .catch(err => {
    //     console.log(`エラーが発生${err}`);
    // });
}

/**
 * GitHubのユーザー情報を取得するAPIを叩く
 */
function fetchUserInfo(userId) {
    // fetchの返り血のPromiseを返す。これによって、fetchUserInfo関数を呼び出すmain関数で非同期処理の結果を扱えるようになる。
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(res => {
        if(!res.ok) {
            // エラーレスポンスからrejectedなPromiseを作成して返す
            return Promise.reject(new Error(`${res.status}: ${res.statusText}`));
        } else {
            // JSONオブジェクトでPromiseを返す
            return res.json();
        }
    });
}

// HTMLの組み立てを行う関数
function createView(userInfo) {
    return escapeHtml`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

// HTMLに表示する関数
function displayView(view) {
    const result = document.getElementById('result');
    result.innerHTML = view;
}

// 特殊な記号に対するエスケープ処理
function escapeSpecialChars(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// 文字列リテラルと値が元の順番どおりに並ぶように文字列を組み立てつつ、 値が文字列型であればエスケープするタグ関数
function escapeHtml(strings, ...values) {
    // console.log(values);
    return strings.reduce((result, str, i) => {
        // console.log(result);
        const value = values[i - 1];
        if(typeof value === 'string') {
            return result + escapeSpecialChars(value) + str;
        } else {
            return result + String(value) + str;
        }
    })
}