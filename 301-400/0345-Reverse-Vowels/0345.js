// 345. 反转字符串中的元音字母
// 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。



// 示例 1：

// 输入："hello"
// 输出："holle"
// 示例 2：

// 输入："leetcode"
// 输出："leotcede"


// 提示：

// 元音字母不包含字母 "y" 。


/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const n = s.length;
  const arr = Array.from(s);
  let i = 0, j = n - 1;
  while (i < j) {
    while (i < n && !isVowel(arr[i])) {
      ++i;
    }
    while (j > 0 && !isVowel(s[j])) {
      --j;
    }
    if (i < j) {
      swap(arr, i, j);
      ++i;
      --j;
    }
  }
  return arr.join('');
}

const isVowel = (ch) => {
  return 'aeiouAEIOU'.indexOf(ch) >= 0;
}

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}