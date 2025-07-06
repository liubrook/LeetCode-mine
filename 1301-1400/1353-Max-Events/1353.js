// 1353. 最多可以参加的会议数目
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个数组 events，其中 events[i] = [startDayi, endDayi] ，表示会议 i 开始于 startDayi ，结束于 endDayi 。

// 你可以在满足 startDayi <= d <= endDayi 中的任意一天 d 参加会议 i 。在任意一天 d 中只能参加一场会议。

// 请你返回你可以参加的 最大 会议数目。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/16/e1.png

// 输入：events = [[1,2],[2,3],[3,4]]
// 输出：3
// 解释：你可以参加所有的三个会议。
// 安排会议的一种方案如上图。
// 第 1 天参加第一个会议。
// 第 2 天参加第二个会议。
// 第 3 天参加第三个会议。
// 示例 2：

// 输入：events= [[1,2],[2,3],[3,4],[1,2]]
// 输出：4


// 提示：​​​​​​

// 1 <= events.length <= 10^5
// events[i].length == 2
// 1 <= startDayi <= endDayi <= 10^5

/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function (events) {
  const n = events.length;
  let maxDay = 0;
  for (const e of events) {
    maxDay = Math.max(maxDay, e[1]);
  }
  events.sort((a, b) => a[0] - b[0]);
  const pq = new MinPriorityQueue();
  let ans = 0;
  for (let i = 1, j = 0; i <= maxDay; i++) {
    while (j < n && events[j][0] <= i) {
      pq.enqueue(events[j][1]);
      j++;
    }
    while (!pq.isEmpty() && pq.front() < i) {
      pq.dequeue();
    }
    if (!pq.isEmpty()) {
      pq.dequeue();
      ans++;
    }
  }
  return ans;
};