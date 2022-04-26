/**
 * 乗り物のクラス、オブジェクトを生成
 * 車のメーカーやモデルプロパティを持つクラスオブジェクトCarを作成
 * 即時関数を使ってWeakMapををクロージャに隠す
 */ 

class Vehicle {
    constructor() {
        // 乗客
        this.passenger = [];
        console.log("Vehicleが生成された");
    }

    // 乗客を追加
    addPassenger(p) {
        this.passenger.push(p);
    }
}

// オートバイのサブクラス
class MotorCycle extends Vehicle {};

const Car = (function() {
    const carProps = new WeakMap();

    class Car extends Vehicle {
        // 車両番号を知る
        static getNextVin() {
        // this.nextVinでもいいがクラス名推奨
            return Car.nextVin++;
        }

        constructor(make, model) {
            super(); // Vehicleクラスのコンストラクタを呼び出す
            this.make = make;
            this.model = model;
            this.vin = Car.getNextVin();
            this.userGears = ['p', 'n', 'r', 'd'];
            carProps.set(this, {userGear: this.userGears[0]})
        }

        // エアバッグ作動
        deployAirbags() {
            console.log('BAN!!!');
        }

        // メーカーとモデルが同じか
        static areSimilar(car1, car2) {
            return car1.make === car2.make && car1.model === car2.model;
        }

        // 車両番号が同じか
        static areSame(car1, car2) {
            return car1.vin === car2.vin;
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

    Car.nextVin = 0;
    return Car;
})();

const car1 = new Car("Tesla", "Model S");
const car2 = new Car("Mazda", "3i");
const car3 = new Car("Mazda", "3i");
const m = new MotorCycle();

console.log(car1.vin);
console.log(car2.vin);
console.log(car3.vin);
console.log(Car.areSimilar(car1, car2));
console.log(Car.areSimilar(car2, car3));
console.log(Car.areSame(car2, car3));
console.log(Car.areSame(car2, car2));

car1.shift('p');
console.log(car1.userGear);
console.log(m instanceof Car);
console.log(m instanceof MotorCycle);
console.log(m instanceof Vehicle);
