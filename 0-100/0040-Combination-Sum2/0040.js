// 40. 组合总和 II
// 中等
// 相关标签
// 相关企业
// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用 一次 。

// 注意：解集不能包含重复的组合。 



// 示例 1:

// 输入: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8,
//   输出:
// [
//   [1, 1, 6],
//   [1, 2, 5],
//   [1, 7],
//   [2, 6]
// ]
// 示例 2:

// 输入: candidates = [2, 5, 2, 1, 2], target = 5,
//   输出:
// [
//   [1, 2, 2],
//   [5]
// ]


// 提示:

// 1 <= candidates.length <= 100
// 1 <= candidates[i] <= 50
// 1 <= target <= 30

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  const ans = [];
  const sequence = [];
  const freq = [];

  for (const num of candidates) {
    if (freq.length === 0 || num !== freq[freq.length - 1][0]) {
      freq.push([num, 1]);
    } else {
      freq[freq.length - 1][1]++;
    }
  }

  function dfs(pos, rest) {
    if (rest === 0) {
      ans.push([...sequence]);
      return;
    }
    if (pos === freq.length || rest < freq[pos][0]) {
      return;
    }

    dfs(pos + 1, rest);

    const most = Math.min(Math.floor(rest / freq[pos][0]), freq[pos][1]);
    for (let i = 1; i <= most; ++i) {
      sequence.push(freq[pos][0]);
      dfs(pos + 1, rest - i * freq[pos][0]);
    }
    for (let i = 1; i <= most; ++i) {
      sequence.pop();
    }
  }

  dfs(0, target);
  return ans;
};