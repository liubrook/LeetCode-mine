// 131. 分割回文串
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

// 回文串 是正着读和反着读都一样的字符串。

 

// 示例 1：

// 输入：s = "aab"
// 输出：[["a","a","b"],["aa","b"]]
// 示例 2：

// 输入：s = "a"
// 输出：[["a"]]
 

// 提示：

// 1 <= s.length <= 16
// s 仅由小写英文字母组成

var partition = function(s) {
  const dfs = (i) => {
    if (i === n) {
      ret.push(ans.slice());
      return
    }
    for (let j = i; j < n; ++j) {
      if (isPalindrome(i, j) === 1) {
        ans.push(s.slice(i, j + 1));
        dfs(j+1);
        ans.pop();
      }
    }
  }

  const isPalindrome = (i, j) => {
    if (f[i][j] !== 0) {
      return f[i][j];
    }
    if (i >= j) {
      f[i][j] = 1;
    } else if (s[i] === s[j]) {
      f[i][j] = isPalindrome(i+1, j - 1);
    } else {
      f[i][j] = -1;
    }
    return f[i][j];
  }

  const n = s.length;
  const ret = [], ans = [];
  const f = new Array(n).fill(0).map(() => new Array(n).fill(0))

  dfs(0);
  return ret;
}