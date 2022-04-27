/**
 * Map
 */

// ユーザーオブジェクト生成
const user1 = {name: 'Kazu'};
const user2 = {name: 'Hana'};
const user3 = {name: 'Kyoko'};
const user4 = {name: 'Tetsu'};

// ユーザーの役割を表すマップ生成
const userRoles = new Map();
// 新しい要素追加
userRoles
    .set(user1, 'user')
    .set(user2, 'user')
    .set(user3, 'admin');

// 役割の確認
console.log(userRoles.get(user2));

// マップにキーが含まれているかチェック
console.log(userRoles.has(user4));
// マップに何組の対応があるか確認
console.log(userRoles.size);

// Map内の全てのキーを返す
for(let u of userRoles.keys()) {
    console.log(u.name);
}

// Map内の全てのvalueを返す
for(let v of userRoles.values()) {
    console.log(v);
}

// Mapの全てのEntries(対応関係)を取得
for(let [u, r] of userRoles.entries()) {
    console.log(`${u.name}: ${r}`);
}

// 配列が欲しい場合は、スプレッド演算子
console.log([...userRoles.values()]);

// マップから要素を削除
userRoles.delete(user2);
console.log([...userRoles.values()]);

// マップから全要素を削除
userRoles.clear();
console.log([...userRoles.values()]);

// secretsは外から参照できなくなる
const SecretHolder = (function() {
    const secrets = new WeakMap();
    return class  {
        setSecret(secret) {
            secrets.set(this, secret);
        }
        getSecret() {
            return secrets.get(this);
        }
    }
})();

const a = new SecretHolder();
a.setSecret('秘密A');
console.log(a.getSecret());

/**
 * Set
 */

// オブジェクトsetのインスタンスを生成
const roles = new Set();
// ユーザーの役割追加
roles.add("ユーザー");
console.log(roles);
// setの要素数
console.log(roles.size);
