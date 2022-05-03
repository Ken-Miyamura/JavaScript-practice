/**
 * GitHubのユーザー情報を取得するAPIを叩く
 */

// GitHubのユーザーDヲ所得し、getでHTTPリクエストを送信する関数
function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(res => {
        console.log(res.status);
        if (!res.ok) {
            console.error("エラーレスポンス", response);
        } else {
            return res.json().then(userInfo => {
                console.log(userInfo);      
            });
        }
    }).catch(err => {1
        console.error(err);
    });
}