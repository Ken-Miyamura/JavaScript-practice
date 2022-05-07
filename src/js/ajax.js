/**
 * GitHubのユーザー情報を取得するAPIを叩く
 */
function fetchUserInfo(userId) {
    fetch(
        `https://api.github.com/users/${encodeURIComponent(userId)}`
    ).then(res => {
        console.log(res.status);
        if(!res.ok) {
            console.log("エラーレスポンス", res);
        } else {
            return res.json()
            .then(userInfo => {
                // HTMLの組み立て
                const view = escapeHtml`
                    <h4>${userInfo.name} (@${userInfo.login})</h4>
                    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
                    <dl>
                        <dt>Location</dt>
                        <dd>${userInfo.location}</dd>
                        <dt>Repositories</dt>
                        <dd>${userInfo.public_repos}</dd>
                    </dl>
                `;
                // HTMLの挿入
                const result = document.getElementById('result');
                result.innerHTML = view;
            });
        }
    }).catch(err => {
        console.log(err);
    });
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