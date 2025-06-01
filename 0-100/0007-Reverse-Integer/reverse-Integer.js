//7. 整数反转
//给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

//示例 1:

//输入: 123
//输出: 321
// 示例 2:

//输入: -123
//输出: -321
//示例 3:

//输入: 120
//输出: 21
//注意:

//假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
var reverse1 = function(x) {
    var max = Math.pow(2, 31) - 1;
    var min = -Math.pow(2, 31)
    var y = 0;
    while(x != 0) {
        y = 10 * y + x % 10;
        x = ~~(x / 10);
    }
    if (y > max) return 0;
    if (y < min) return 0;
    return y;
}

var reverse2 = function(x) {
    let result = 0;
    while (x != 0) {
        result = result * 10 + x % 10;
        x = (x / 10) | 0;
    }
    return (result | 0) === result ? result : 0
}

// 暴力法 转成字符串反转
var reverse3 = function(x) {
    let now = Math.abs(x).toString().split("").reverse().join("");
    if (x < 0) {
        return now <= Math.pow(2, 31) ? -now : 0;
    } else {
        return now < Math.pow(2, 31) ? now : 0
    }
}
