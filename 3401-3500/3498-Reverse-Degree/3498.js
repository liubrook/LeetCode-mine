// 3498. 字符串的反转度
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s，计算其 反转度。

// 反转度的计算方法如下：

// 对于每个字符，将其在 反转 字母表中的位置（'a' = 26, 'b' = 25, ..., 'z' = 1）与其在字符串中的位置（下标从1 开始）相乘。
// 将这些乘积加起来，得到字符串中所有字符的和。
// 返回 反转度。

// 示例 1：

// 输入： s = "abc"

// 输出： 148

// 解释：

// 字母	反转字母表中的位置	字符串中的位置	乘积
// 'a'	26	1	26
// 'b'	25	2	50
// 'c'	24	3	72
// 反转度是 26 + 50 + 72 = 148 。

// 示例 2：

// 输入： s = "zaza"

// 输出： 160

// 解释：

// 字母	反转字母表中的位置	字符串中的位置	乘积
// 'z'	1	1	1
// 'a'	26	2	52
// 'z'	1	3	3
// 'a'	26	4	104
// 反转度是 1 + 52 + 3 + 104 = 160 。

// 提示：

// 1 <= s.length <= 1000
// s 仅包含小写字母。
/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function (s) {
  const obj = {
    a: 26,
    b: 25,
    c: 24,
    d: 23,
    e: 22,
    f: 21,
    g: 20,
    h: 19,
    i: 18,
    j: 17,
    k: 16,
    l: 15,
    m: 14,
    n: 13,
    o: 12,
    p: 11,
    q: 10,
    r: 9,
    s: 8,
    t: 7,
    u: 6,
    v: 5,
    w: 4,
    x: 3,
    y: 2,
    z: 1,
  };
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    const val = obj[s[i]] * (i + 1);
    ans += val;
  }
  return ans;
};

var reverseDegree = function (s) {
  let ans = 0;
  for (let i = 1; i <= s.length; i++) {
    ans += (26 - (s.charCodeAt(i - 1) - 97)) * i;
  }
  return ans;
};
