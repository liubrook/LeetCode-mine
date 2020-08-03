// 415. 字符串相加
// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

// 注意：

// num1 和num2 的长度都小于 5100.
// num1 和num2 都只包含数字 0 - 9.
// num1 和num2 都不包含任何前导零。
// 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。
var addStrings = function(num1, num2) {
    let res = ''
    let i = num1.length - 1
    let j = num2.length - 1
    let sum = 0
    let flag = 0
    while (i >= 0 || j >= 0 || flag) {
        let n1 = +num1[i--] || 0
        let n2 = +num2[j--] || 0
        sum = n1 + n2 + flag
        if (sum >= 10) {
            flag = 1
            sum = sum - 10
        } else {
            flag = 0
        }
        res = sum + '' + res
    }
    return res;
}
