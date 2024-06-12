
// 示例 1：

// 输入：items = [[3, 2], [5, 1], [10, 1]], k = 2
// 输出：17
// 解释：
// 在这个例子中，我们需要选出长度为 2 的子序列。
// 其中一种方案是 items[0] = [3, 2] 和 items[2] = [10, 1] 。
// 子序列的总利润为 3 + 10 = 13 ，子序列包含 2 种不同类别[2, 1] 。
// 因此，优雅度为 13 + 22 = 17 ，可以证明 17 是可以获得的最大优雅度。 
// 示例 2：

// 输入：items = [[3, 1], [3, 1], [2, 2], [5, 3]], k = 3
// 输出：19
// 解释：
// 在这个例子中，我们需要选出长度为 3 的子序列。 
// 其中一种方案是 items[0] = [3, 1] ，items[2] = [2, 2] 和 items[3] = [5, 3] 。
// 子序列的总利润为 3 + 2 + 5 = 10 ，子序列包含 3 种不同类别[1, 2, 3] 。
// 因此，优雅度为 10 + 32 = 19 ，可以证明 19 是可以获得的最大优雅度。
// 示例 3：

// 输入：items = [[1, 1], [2, 1], [3, 1]], k = 3
// 输出：7
// 解释：
// 在这个例子中，我们需要选出长度为 3 的子序列。
// 我们需要选中所有项目。
// 子序列的总利润为 1 + 2 + 3 = 6，子序列包含 1 种不同类别[1] 。
// 因此，最大优雅度为 6 + 12 = 7 。


// 提示：

// 1 <= items.length == n <= 10^5
// items[i].length == 2
// items[i][0] == profiti
// items[i][1] == categoryi
// 1 <= profiti <= 10^9
// 1 <= categoryi <= n
// 1 <= k <= n

/**
 * @param {number[][]} items
 * @param {number} k
 * @return {number}
 */
var findMaximumElegance = function (items, k) {
  items.sort((item0, item1) => item1[0] - item0[0])
  let categorySet = new Set();
  let profit = 0, res = 0;
  let st = [];
  for (let i = 0; i < items.length; i++) {
    if (i < k) {
      profit += items[i][0];
      if (!categorySet.has(items[i][1])) {
        categorySet.add(items[i][1]);
      } else {
        st.push(items[i][0]);
      }
    } else if (st.length > 0 && !categorySet.has(items[i][1])) {
      profit += items[i][0] - st.pop();
      categorySet.add(items[i][1]);
    }
    res = Math.max(res, profit + categorySet.size * categorySet.size);
  }
  return res;
};