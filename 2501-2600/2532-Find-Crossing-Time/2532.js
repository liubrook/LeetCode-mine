// 2532. 过桥的时间
// 共有 k 位工人计划将 n 个箱子从旧仓库移动到新仓库。给你两个整数 n 和 k，以及一个二维整数数组 time ，数组的大小为 k x 4 ，其中 time[i] = [leftToRighti, pickOldi, rightToLefti, putNewi] 。

// 一条河将两座仓库分隔，只能通过一座桥通行。旧仓库位于河的右岸，新仓库在河的左岸。开始时，所有 k 位工人都在桥的左侧等待。为了移动这些箱子，第 i 位工人（下标从 0 开始）可以：

// 从左岸（新仓库）跨过桥到右岸（旧仓库），用时 leftToRighti 分钟。
// 从旧仓库选择一个箱子，并返回到桥边，用时 pickOldi 分钟。不同工人可以同时搬起所选的箱子。
// 从右岸（旧仓库）跨过桥到左岸（新仓库），用时 rightToLefti 分钟。
// 将箱子放入新仓库，并返回到桥边，用时 putNewi 分钟。不同工人可以同时放下所选的箱子。
// 如果满足下面任一条件，则认为工人 i 的 效率低于 工人 j ：

// leftToRighti + rightToLefti > leftToRightj + rightToLeftj
// leftToRighti + rightToLefti == leftToRightj + rightToLeftj 且 i > j
// 工人通过桥时需要遵循以下规则：

// 如果工人 x 到达桥边时，工人 y 正在过桥，那么工人 x 需要在桥边等待。
// 如果没有正在过桥的工人，那么在桥右边等待的工人可以先过桥。如果同时有多个工人在右边等待，那么 效率最低 的工人会先过桥。
// 如果没有正在过桥的工人，且桥右边也没有在等待的工人，同时旧仓库还剩下至少一个箱子需要搬运，此时在桥左边的工人可以过桥。如果同时有多个工人在左边等待，那么 效率最低 的工人会先过桥。
// 所有 n 个盒子都需要放入新仓库，请你返回最后一个搬运箱子的工人 到达河左岸 的时间。



// 示例 1：

// 输入：n = 1, k = 3, time = [[1, 1, 2, 1], [1, 1, 3, 1], [1, 1, 4, 1]]
// 输出：6
// 解释：
// 从 0 到 1 ：工人 2 从左岸过桥到达右岸。
// 从 1 到 2 ：工人 2 从旧仓库搬起一个箱子。
// 从 2 到 6 ：工人 2 从右岸过桥到达左岸。
// 从 6 到 7 ：工人 2 将箱子放入新仓库。
// 整个过程在 7 分钟后结束。因为问题关注的是最后一个工人到达左岸的时间，所以返回 6 。
// 示例 2：

// 输入：n = 3, k = 2, time = [[1, 9, 1, 8], [10, 10, 10, 10]]
// 输出：50
// 解释：
// 从 0 到 10 ：工人 1 从左岸过桥到达右岸。
// 从 10 到 20 ：工人 1 从旧仓库搬起一个箱子。
// 从 10 到 11 ：工人 0 从左岸过桥到达右岸。
// 从 11 到 20 ：工人 0 从旧仓库搬起一个箱子。
// 从 20 到 30 ：工人 1 从右岸过桥到达左岸。
// 从 30 到 40 ：工人 1 将箱子放入新仓库。
// 从 30 到 31 ：工人 0 从右岸过桥到达左岸。
// 从 31 到 39 ：工人 0 将箱子放入新仓库。
// 从 39 到 40 ：工人 0 从左岸过桥到达右岸。
// 从 40 到 49 ：工人 0 从旧仓库搬起一个箱子。
// 从 49 到 50 ：工人 0 从右岸过桥到达左岸。
// 从 50 到 58 ：工人 0 将箱子放入新仓库。
// 整个过程在 58 分钟后结束。因为问题关注的是最后一个工人到达左岸的时间，所以返回 50 。


// 提示：

// 1 <= n, k <= 10^4
// time.length == k
// time[i].length == 4
// 1 <= leftToRighti, pickOldi, rightToLefti, putNewi <= 1000


/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} time
 * @return {number}
 */
var findCrossingTime = function (n, k, time) {
  time.sort((a, b) => (a[0] + a[2]) - (b[0] + b[2])); // 稳定排序

  let workL = new MinPriorityQueue({ priority: (e) => e[1] });
  let workR = new MinPriorityQueue({ priority: (e) => e[1] });
  let waitL = new MaxPriorityQueue({ priority: (e) => e[0] });
  let waitR = new MaxPriorityQueue({ priority: (e) => e[0] });
  for (let i = k - 1; i >= 0; i--)
    waitL.enqueue([i, 0]); // 下标越大效率越低

  let cur = 0;
  while (n) {
    while (!workL.isEmpty() && workL.front().element[1] <= cur)
      waitL.enqueue(workL.dequeue().element); // 左边完成放箱
    while (!workR.isEmpty() && workR.front().element[1] <= cur)
      waitR.enqueue(workR.dequeue().element); // 右边完成搬箱
    if (!waitR.isEmpty()) { // 右边过桥，注意加到 waitR 中的都是 <= cur 的（下同）
      let p = waitR.dequeue().element;
      cur += time[p[0]][2];
      p[1] = cur + time[p[0]][3];
      workL.enqueue(p); // 放箱
    } else if (!waitL.isEmpty()) { // 左边过桥
      let p = waitL.dequeue().element;
      cur += time[p[0]][0];
      p[1] = cur + time[p[0]][1];
      workR.enqueue(p); // 搬箱
      n--;
    } else if (workL.isEmpty()) { // cur 过小，下面找个最小的放箱/搬箱完成时间来更新 cur
      cur = workR.front().element[1];
    } else if (workR.isEmpty()) {
      cur = workL.front().element[1];
    } else {
      cur = Math.min(workL.front().element[1], workR.front().element[1]);
    }
  }

  while (!workR.isEmpty()) {
    const [i, t] = workR.dequeue().element; // 右边完成搬箱
    // 如果没有排队，直接过桥；否则由于无论谁先过桥，最终完成时间都一样，所以也可以直接计算
    cur = Math.max(t, cur) + time[i][2];
  }
  return cur; // 最后一个过桥的时间
};