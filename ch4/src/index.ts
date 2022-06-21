let a = 1 + 2
let b = a + 3
let c = {
    apple: a,
    banana: b
}
let d = c.apple * 4
let g = 1 + NaN


/** */
function booleanEx() {
    let a = true
    var b = false
    const c = true
    let d: boolean = true
    let e: true = true // 型別字面值：type literal（僅代表單一值的型別）
    // let f: true = false
}

function numberEx() {
    let a = 1234
    var b = Infinity * 0.10
    const c = 45678
    let d = a < b
    let e: number = 100
    let f: 26.218 = 26.218
    // let g: 26.218 = 10
    let oneMillion = 1_000_000
    let twoMillion: 2_000_000 = 2_000_000
}

function bigintEx() {
    let a = 1234n
    const b = 5678n
    var c = a + b
    let d = a < 1235
    // let e = 88.5n
    let f: bigint = 100n
    let g: 100n = 100n
    // let h: bigint = 100
}

/**
 * 用const跟let宣告變數會影響TypeScript推論型別！
 */
function stringEx() {
    let a = 'hello'
    var b = 'billy'
    const c = '!'
    let d = a + ' ' + b + c
    let e: string = 'zoom'
    let f: 'john' = 'john'
    // let g: 'john' = 'zoe'
}

/** 難以理解，先跳過 */
function symbolEx() {

}

function objectEx() {
    // 結構定型（structurally typed），非名義定型（nominally typed）
    let a: object = {
        b: 'x'
    }
    // a.b // 類型 'object' 沒有屬性 'b'。ts(2339)

    // 讓typescript幫你推論型別
    let b = {
        c: {
            d: 'f'
        }
    } // {c: {d: string}} object literal syntax（物件字面值語法）

    // 或自行在{}內明確描述型別
    let c: {b: number} = {
        b: 12
    }

    let e: {b: number} = {
        b: 12
    }

    const d: {b: number} = {
        b: 12
    }

    /**
     * object literal syntax（物件字面值語法）
     * 要表達的是：「此處的這個東西有這種形狀」，這個東西可以是一個物件字面值，也可以是一個類別（class）
     */
    let f: {
        firstName: string,
        lastName: string
    } = {
        firstName: 'john',
        lastName: 'barrowman'
    }

    class Person {
        constructor(
            public firstName: string, // public是this.firstName = firstName的簡寫
            public lastName: string
        ) {}
    }
    f = new Person('matt', 'smith');

    let g: {
        b: number
        c?: string
        [key: number]: boolean
    }
    g = {b: 1}
    g = {b: 1, c: undefined}
    g = {b: 1, c: 'd'}
    g = {b: 1, 10: true}
    g = {b: 1, 10: true, 20: false}
    // g = {10: true} // Property 'b' is missing in type '{ 10: true; }' but required in type '{ [key: number]: boolean; b: number; c?: string | undefined; }'.ts(2741)
    // g = {b: 1, 33: 'red'} // 類型 'string' 不可指派給類型 'boolean'。ts(2322)
}

/**
 * 索引特徵式（index signature）
 * [key: T]: U
 * 
 * 規則：鍵值之型別T必須可被指定給number or string
 * 
 * 鍵值名稱不必一定要是key:
 */
function indexSignature() {
    let airplanSeatingAssignments: {
        [seatNumber: string]: string
    } = {
        '34D': 'Boris cherny',
        '34E': 'Bill Gates'
    }
}

/**
 * 「?」修飾詞並不是唯一可以使用的修飾詞。
 * 也可以把欄位標示成唯獨（宣告指定了初始值之後不能再修改的欄位，類似物件特性的const），用readonly
 * 
 * 總結，TypeScript中宣告物件的方法有四種：
 * 1. 物件字面值語法，也稱為一種形狀，如果你知道物件會有哪些欄位，就用這個
 * 2. 空的物件字面值語法（{}）。試著避免！
 * 3. object型別。當你只是想要一個物件，而不在意他有什麼欄位，就用這個。
 * 4. Object型別。試著避免！
 * 
 * 應該使用1或3，勁量避免2或4
 */
function objectCaution() {
    let user: {
        readonly firstName: string
    } = {
        firstName: 'abby'
    }

    user.firstName // string
    // user.firstName = 'abbey with an e' // Cannot assign to 'firstName' because it is a read-only property.ts(2540)

    let danger: {}
    danger = {}
    danger = {x: 1}
    danger = []
    danger = 2
    // danger = null
    // danger = undefined

    let danger2: Object
    danger2 = {}
    danger2 = {x: 1}
    danger2 = []
    danger2 = 2
    // danger = null
    // danger = undefined


}

function typeAlias() {
    type Age = number
    
    type Person = {
        name: string
        age: Age
    }
}

function typeUnionAndIntersection() {
    type Cat = {name: string, purrs: boolean}
    type Dog = {name: string, barks: boolean, wags: boolean}
    type CatOrDogOrBoth = Cat | Dog
    type CatAndDog = Cat & Dog

    // Cat
    let a: CatOrDogOrBoth = {
        name: 'Bonkers',
        purrs: true
    }

    // Dog
    a = {
        name:'Domino',
        barks: true,
        wags: true
    }

    // Both
    a = {
        name: 'Donkers',
        barks: true,
        purrs: true,
        wags: true
    }
}

/**
 * TypeScript支援陣列的兩種語法：T[] & Array<T>
 */
function array() {
    let a = [1,2,3] // number[]
    var b = ['a', 'b'] // string[]
    let c: string[] = ['a']
    let d = [1, 'a'] // (string | number)[]
    const e = [2, 'b'] // (string | number)[]

    let f = ['red']
    f.push('blue')
    // f.push(true) // 類型 'true' 的引數不可指派給類型 'string' 的參數。ts(2345)

    let g = []
    g.push(1) // number[]
    g.push('red') // (string | number)[]

    let h: number[] = []
    h.push(1)
    // h.push('red') // 類型 '"red"' 的引數不可指派給類型 'number' 的參數。ts(2345)

    let i: Array<string> = ['red']
}

function tuple() {
    let a: [number] = [1]

    // 像[first name, last name, birth year]這樣的元組
    let b: [string, string, number] = ['malcolm', 'gladwell', 1963]
    // b = ['queen', 'elizabeth', 'ii', 1926] // 類型 'string' 不可指派給類型 'number'。ts(2322)
    
    let trainFares: [number, number?][] = [[3.75], [8.25, 7.70], [10.50]]
    // 等效於
    let moreTrainFares: ([number] | [number, number])[] = [[2.22]]

    // 其餘元素 rest elements 
    let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire']
    let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c']
}

/**
 * 唯讀陣列與元組
 * 更新一個唯獨陣列，就使用非變動式的方法（nonmutatiing methods）：.concat, .slice，而非變動式的（mutating），像是.push, .splice
 */
function readonlyArrayAndTuple() {
    let as: readonly number[] = [1, 2, 3]
    let bs: readonly number[] = as.concat(4)
    let three = bs[2]
    // as[4] = 5 // 類型 'readonly number[]' 中的索引簽章只允許讀取。ts(2542)
    // as.push(6) // 類型 'readonly number[]' 沒有屬性 'push'。ts(2339)

    // 形式較長的語法宣告
    type A = readonly string[]
    type B = ReadonlyArray<string>
    type C =  Readonly<string[]>

    type D = readonly [number, string]
    type E = Readonly<[number, string]>
}

function null_undefinded_void_never() {
    // 回傳數字或null
    function a(x: number) {
        if (x < 10) {
            return x
        }
        return null
    }

    // 回傳undefined
    function b() {
        return undefined
    }

    // 回傳void
    function c() {
        let a = 2 + 2
        let b = a * a
    }

    // 永不回傳never
    function d() {
        throw TypeError('I always error')
    }

    // 回傳never
    function e() {
        while(true) {
            doSomething()
        }
    }

}

/**
 * 嚴格的null檢查
 * TSC的strictNullChecks = false時，null的行為稍有不同：他是所有型別的子型別，除了never之外。表示每個型別都是可以null的（nullable），然而在檢查是否為null之前，你永遠無法真正相信任何東西的型別。
 * 例如下面範例，你得先檢查pizza是否為null，然後才能把anchovy加上去
 */
function strictNullChecks() {
    type Pizza = null // 
    function addDeliciousFish(pizza: Pizza) {
        return pizza.addAnchovies()
    }
    // typescript藉由 strictNullChecks = false來讓函式得以運行
    addDeliciousFish(null)
}

function enums() {
    // 自動推論成員的值
    enum Language {
        English,
        Spanish,
        Russian
    }

    enum Language {
        English2 = 0,
        Spanish2 = 1,
        Russian2 = 2
    }

    // 取值的方式
    let myFirstLanguage = Language.Russian
    let mySecondLanguage = Language['English']

    enum Language {
        English3 = 100,
        Spanish3 = 200 + 300,
        Russian3 // (enum member) Language.Russian3 = 501 (typescript推論出)
    }

    // 使用字串，或混合字串與數值
    enum Color {
        Red = '#c10000',
        Blue = '#007ac1',
        Pink = 0xc10050,
        White = 255
    }

    let red = Color.Red
    let pink = Color.Pink

    // 可藉由值或鍵值來存取enums，但不安全
    let a = Color.Red
    // let b = Color.Green // 類型 'typeof Color' 沒有屬性 'Green'。ts(2339)

    let c = Color[255]
    let d = Color[6] // string !!!!!!!!!!，不應該能夠存取，但TypeScript不會阻止，可用較安全的寫法：const enum



}

/**
 * 在使用處將enum成員的值置於行內（inline），例如：TypeScript會把Language.Spanish出現的每個地方取代為他的值（也就是1）
 * enum路上常有許多陷阱，建議避開
 * 
 * 啟用const enum的執行期程式碼產生（runtime code generation）
 * {
 *  "compilerOptions": {
 *      "preserveConstEnums": true
 *  }
 * }
 */
function const_enum() {
    const enum Language {
        English,
        Spanish,
        Russian
    }

    let a = Language.English
    let b = Language.Tagalog // 類型 'typeof Language' 沒有屬性 'Tagalog'。ts(2339)

    let c = Language[0] // 若要存取常數列舉成員，必須透過字串常值。ts(2476)
    let d = Language[6] // 若要存取常數列舉成員，必須透過字串常值。ts(2476)
}

/**
 * 總結：
 * const會推論出更狹隘的型別
 * let, var型別更廣泛
 */
