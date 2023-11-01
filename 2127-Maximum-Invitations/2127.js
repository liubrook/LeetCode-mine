// 2127. 参加会议的最多员工数
// 提示
// 困难
// 134
// 相关企业
// 一个公司准备组织一场会议，邀请名单上有 n 位员工。公司准备了一张 圆形 的桌子，可以坐下 任意数目 的员工。

// 员工编号为 0 到 n - 1 。每位员工都有一位 喜欢 的员工，每位员工 当且仅当 他被安排在喜欢员工的旁边，他才会参加会议。每位员工喜欢的员工 不会 是他自己。

// 给你一个下标从 0 开始的整数数组 favorite ，其中 favorite[i] 表示第 i 位员工喜欢的员工。请你返回参加会议的 最多员工数目 。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/12/14/ex1.png

// 输入：favorite = [2, 2, 1, 2]
// 输出：3
// 解释：
// 上图展示了公司邀请员工 0，1 和 2 参加会议以及他们在圆桌上的座位。
// 没办法邀请所有员工参与会议，因为员工 2 没办法同时坐在 0，1 和 3 员工的旁边。
// 注意，公司也可以邀请员工 1，2 和 3 参加会议。
// 所以最多参加会议的员工数目为 3 。
// 示例 2：

// 输入：favorite = [1, 2, 0]
// 输出：3
// 解释：
// 每个员工都至少是另一个员工喜欢的员工。所以公司邀请他们所有人参加会议的前提是所有人都参加了会议。
// 座位安排同图 1 所示：
// - 员工 0 坐在员工 2 和 1 之间。
// - 员工 1 坐在员工 0 和 2 之间。
// - 员工 2 坐在员工 1 和 0 之间。
// 参与会议的最多员工数目为 3 。
// 示例 3：

// https://assets.leetcode.com/uploads/2021/12/14/ex2.png

// 输入：favorite = [3, 0, 1, 4, 1]
// 输出：4
// 解释：
// 上图展示了公司可以邀请员工 0，1，3 和 4 参加会议以及他们在圆桌上的座位。
// 员工 2 无法参加，因为他喜欢的员工 0 旁边的座位已经被占领了。
// 所以公司只能不邀请员工 2 。
// 参加会议的最多员工数目为 4 。


// 提示：

// n == favorite.length
// 2 <= n <= 10^5
// 0 <= favorite[i] <= n - 1
// favorite[i] != i

/**
 * @param {number[]} favorite
 * @return {number}
 */
var maximumInvitations = function (favorite) {
  const n = favorite.length;
  // 统计入度，便于进行拓扑排序
  const indeg = new Array(n).fill(0);
  for (x of favorite) {
    indeg[x]++;
  }

  const used = new Array(n).fill(false)
  const f = new Array(n).fill(1)
  const q = []
  for (let i = 0; i < n; i++) {
    if (!indeg[i]) {
      q.push(i);
    }
  }
  while (q.length) {
    let u = q.pop();
    used[u] = true;
    let v = favorite[u];
    // 状态转移
    f[v] = Math.max(f[v], f[u] + 1);
    indeg[v]--;
    if (!indeg[v]) {
      q.unshift(v);
    }
  }
  // ring 表示最大的环的大小
  // total 表示所有环大小为 2 的「基环内向树」上的最长的「双向游走」路径之和
  let ring = 0, total = 0;
  for (let i = 0; i < n; i++) {
    if (!used[i]) {
      let j = favorite[i];
      // favorite[favorite[i]] = i 说明环的大小为 2
      if (favorite[j] == i) {
        total += f[i] + f[j]
        used[i] = used[j] = true;
      } else {
        // 否则环的大小至少为 3，我们需要找出环
        let u = i, cnt = 0;
        while (true) {
          cnt++;
          u = favorite[u];
          used[u] = true;
          if (u == i) {
            break;
          }
        }
        ring = Math.max(ring, cnt);
      }
    }
  }
  return Math.max(ring, total);
};