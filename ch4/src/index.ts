// 呼叫特徵式
type Log = {
    (message: string, userId?: string): void
}

// 簡寫的呼叫特徵式
type Log2 = (message: string, userId?: string) => void

/**
 * ********好難，尚未搞懂**********
 * 一般優先選用簡寫
 * 更複雜的函式選用完整，他會帶來好處，其中之一為：
 * 
 * 重載的函式（Overloaded function）
 * 具有多個呼叫特徵式的函式
 */
type Reservation = (from: Date, to: Date, destination?: string ) => Date
type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}
// let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
//     // ...
// }
/******************************* */

