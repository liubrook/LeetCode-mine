// 1156. 单字符重复子串的最大长度
// 如果字符串中的所有字符都相同，那么这个字符串是单字符重复的字符串。

// 给你一个字符串 text，你只能交换其中两个字符一次或者什么都不做，然后得到一些单字符重复的子串。返回其中最长的子串的长度。



// 示例 1：

// 输入：text = "ababa"
// 输出：3
// 示例 2：

// 输入：text = "aaabaaa"
// 输出：6
// 示例 3：

// 输入：text = "aaabbaaa"
// 输出：4
// 示例 4：

// 输入：text = "aaaaa"
// 输出：5
// 示例 5：

// 输入：text = "abcdef"
// 输出：1


// 提示：

// 1 <= text.length <= 20000
// text 仅由小写英文字母组成。


/**
 * @param {string} text
 * @return {number}
 */
var maxRepOpt1 = function (text) {
  const count = new Map();
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    count.set(c, (count.get(c) || 0) + 1);
  }

  let res = 0;
  for (let i = 0; i < text.length;) {
    // step1: 找出当前连续的一段 [i, j)
    let j = i;
    while (j < text.length && text[j] === text[i]) {
      j++;
    }
    let curCnt = j - i;

    // step2: 如果这一段长度小于该字符出现的总数，并且前面或后面有空位，则使用 curCnt + 1 更新答案
    if (curCnt < (count.get(text[i] || 0)) && (j < text.length || i > 0)) {
      res = Math.max(res, curCnt + 1);
    }

    // step3: 找到这一段后面与之相隔一个不同字符的另一段 [j + 1, k)，如果不存在则 k = j + 1 
    let k = j + 1;
    while (k < text.length && text[k] === text[i]) {
      k++;
    }
    res = Math.max(res, Math.min(k - i, (count.get(text[i]) || 0)));
    i = j;
  }
  return res;
};