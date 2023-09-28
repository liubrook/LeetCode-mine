// 2251. 花期内花的数目
// 提示
// 困难
// 128
// 相关企业
// 给你一个下标从 0 开始的二维整数数组 flowers ，其中 flowers[i] = [starti, endi] 表示第 i 朵花的 花期 从 starti 到 endi （都 包含）。同时给你一个下标从 0 开始大小为 n 的整数数组 people ，people[i] 是第 i 个人来看花的时间。

// 请你返回一个大小为 n 的整数数组 answer ，其中 answer[i]是第 i 个人到达时在花期内花的 数目 。



// 示例 1：



// 输入：flowers = [[1, 6], [3, 7], [9, 12], [4, 13]], people = [2, 3, 7, 11]
// 输出：[1, 2, 2, 2]
// 解释：上图展示了每朵花的花期时间，和每个人的到达时间。
// 对每个人，我们返回他们到达时在花期内花的数目。
// 示例 2：



// 输入：flowers = [[1, 10], [3, 3]], people = [3, 3, 2]
// 输出：[2, 2, 1]
// 解释：上图展示了每朵花的花期时间，和每个人的到达时间。
// 对每个人，我们返回他们到达时在花期内花的数目。


// 提示：

// 1 <= flowers.length <= 5 * 10^4
// flowers[i].length == 2
// 1 <= starti <= endi <= 10^9
// 1 <= people.length <= 5 * 10^4
// 1 <= people[i] <= 10^9

/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
var fullBloomFlowers = function (flowers, people) {
  const cnt = new Map();
  for (const [start, end] of flowers) {
    cnt.set(start, cnt.has(start) ? cnt.get(start) + 1 : 1);
    cnt.set(end + 1, cnt.has(end + 1) ? cnt.get(end + 1) - 1 : -1);
  }
  const arr = [];
  for (let item of cnt.entries()) {
    arr.push([item[0], item[1]]);
  }
  arr.sort((a, b) => a[0] - b[0]);
  let m = people.length;
  indices = Array.from(new Array(m).keys())
  indices.sort((a, b) => people[a] - people[b]);
  let j = 0, curr = 0;
  let ans = new Array(m).fill(0);
  for (const i of indices) {
    while (j < arr.length && arr[j][0] <= people[i]) {
      curr += arr[j][1];
      j += 1;
    }
    ans[i] = curr;
  }
  return ans;
};