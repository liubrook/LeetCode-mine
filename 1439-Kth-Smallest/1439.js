// 1439. 有序矩阵中的第 k 个最小数组和
// 给你一个 m * n 的矩阵 mat，以及一个整数 k ，矩阵中的每一行都以非递减的顺序排列。

// 你可以从每一行中选出 1 个元素形成一个数组。返回所有可能数组中的第 k 个 最小 数组和。



// 示例 1：

// 输入：mat = [[1, 3, 11], [2, 4, 6]], k = 5
// 输出：7
// 解释：从每一行中选出一个元素，前 k 个和最小的数组分别是：
// [1, 2], [1, 4], [3, 2], [3, 4], [1, 6]。其中第 5 个的和是 7 。  
// 示例 2：

// 输入：mat = [[1, 3, 11], [2, 4, 6]], k = 9
// 输出：17
// 示例 3：

// 输入：mat = [[1, 10, 10], [1, 4, 5], [2, 3, 6]], k = 7
// 输出：9
// 解释：从每一行中选出一个元素，前 k 个和最小的数组分别是：
// [1, 1, 2], [1, 1, 3], [1, 4, 2], [1, 4, 3], [1, 1, 6], [1, 5, 2], [1, 5, 3]。其中第 7 个的和是 9 。 
// 示例 4：

// 输入：mat = [[1, 1, 10], [2, 2, 9]], k = 7
// 输出：12


// 提示：

// m == mat.length
// n == mat.length[i]
// 1 <= m, n <= 40
// 1 <= k <= min(200, n ^ m)
// 1 <= mat[i][j] <= 5000
// mat[i] 是一个非递减数组


/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (mat, k) {
  const m = mat.length;
  let prev = mat[0];
  for (let i = 1; i < m; ++i) {
    prev = merge(prev, mat[i], k);
  }
  return prev[k - 1];
}

const merge = (f, g, k) => {
  let left = f[0] + g[0], right = f[f.length - 1] + g[g.length - 1], thres = 0;
  k = Math.min(k, f.length * g.length);
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let rptr = g.length - 1, cnt = 0;
    for (let lptr = 0; lptr < f.length; ++lptr) {
      while (rptr >= 0 && f[lptr] + g[rptr] > mid) {
        --rptr;
      }
      cnt += rptr + 1;
    }
    if (cnt >= k) {
      thres = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  const list = [];
  let index = 0;
  for (let i = 0; i < f.length; ++i) {
    for (let j = 0; j < g.length; ++j) {
      let sum = f[i] + g[j];
      if (sum < thres) {
        list.push(sum);
      } else {
        break;
      }
    }
  }
  while (list.length < k) {
    list.push(thres);
  }
  const ans = new Array(list.length).fill(0);
  for (let i = 0; i < list.length; ++i) {
    ans[i] = list[i];
  }
  ans.sort((a, b) => a - b);
  return ans;
};