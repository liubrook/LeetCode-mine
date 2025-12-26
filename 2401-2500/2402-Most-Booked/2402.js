// 2402. 会议室 III
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数 n ，共有编号从 0 到 n - 1 的 n 个会议室。

// 给你一个二维整数数组 meetings ，其中 meetings[i] = [starti, endi] 表示一场会议将会在 半闭 时间区间 [starti, endi) 举办。所有 starti 的值 互不相同 。

// 会议将会按以下方式分配给会议室：

// 每场会议都会在未占用且编号 最小 的会议室举办。
// 如果没有可用的会议室，会议将会延期，直到存在空闲的会议室。延期会议的持续时间和原会议持续时间 相同 。
// 当会议室处于未占用状态时，将会优先提供给原 开始 时间更早的会议。
// 返回举办最多次会议的房间 编号 。如果存在多个房间满足此条件，则返回编号 最小 的房间。

// 半闭区间 [a, b) 是 a 和 b 之间的区间，包括 a 但 不包括 b 。

// 示例 1：

// 输入：n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
// 输出：0
// 解释：
// - 在时间 0 ，两个会议室都未占用，第一场会议在会议室 0 举办。
// - 在时间 1 ，只有会议室 1 未占用，第二场会议在会议室 1 举办。
// - 在时间 2 ，两个会议室都被占用，第三场会议延期举办。
// - 在时间 3 ，两个会议室都被占用，第四场会议延期举办。
// - 在时间 5 ，会议室 1 的会议结束。第三场会议在会议室 1 举办，时间周期为 [5,10) 。
// - 在时间 10 ，两个会议室的会议都结束。第四场会议在会议室 0 举办，时间周期为 [10,11) 。
// 会议室 0 和会议室 1 都举办了 2 场会议，所以返回 0 。
// 示例 2：

// 输入：n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
// 输出：1
// 解释：
// - 在时间 1 ，所有三个会议室都未占用，第一场会议在会议室 0 举办。
// - 在时间 2 ，会议室 1 和 2 未占用，第二场会议在会议室 1 举办。
// - 在时间 3 ，只有会议室 2 未占用，第三场会议在会议室 2 举办。
// - 在时间 4 ，所有三个会议室都被占用，第四场会议延期举办。
// - 在时间 5 ，会议室 2 的会议结束。第四场会议在会议室 2 举办，时间周期为 [5,10) 。
// - 在时间 6 ，所有三个会议室都被占用，第五场会议延期举办。
// - 在时间 10 ，会议室 1 和 2 的会议结束。第五场会议在会议室 1 举办，时间周期为 [10,12) 。
// 会议室 1 和会议室 2 都举办了 2 场会议，所以返回 1 。

// 提示：

// 1 <= n <= 100
// 1 <= meetings.length <= 10^5
// meetings[i].length == 2
// 0 <= starti < endi <= 5 * 10^5
// starti 的所有值 互不相同
/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);
  const availRooms = new MinPriorityQueue({ compare: (a, b) => a - b });
  for (let i = 0; i < n; i++) {
    availRooms.enqueue(i);
  }
  const usedRooms = new MinPriorityQueue({
    compare: (a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]),
  });
  const usedCount = Array(n).fill(0);
  let curTime = 0;
  for (const [start, end] of meetings) {
    curTime = Math.max(curTime, start);
    while (!usedRooms.isEmpty() && usedRooms.front()[0] <= curTime) {
      availRooms.enqueue(usedRooms.dequeue()[1]);
    }
    if (availRooms.isEmpty()) {
      curTime = usedRooms.front()[0];
      while (!usedRooms.isEmpty() && usedRooms.front()[0] <= curTime) {
        availRooms.enqueue(usedRooms.dequeue()[1]);
      }
    }
    const room = availRooms.dequeue();
    usedCount[room]++;
    usedRooms.enqueue([curTime + end - start, room]);
  }
  let ans = 0;
  for (let i = 1; i < n; i++) {
    if (usedCount[i] > usedCount[ans]) {
      ans = i;
    }
  }
  return ans;
};
