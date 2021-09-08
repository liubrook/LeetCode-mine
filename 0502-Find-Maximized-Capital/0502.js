// 502. IPO
// 假设 力扣（LeetCode）即将开始 IPO 。为了以更高的价格将股票卖给风险投资公司，力扣 希望在 IPO 之前开展一些项目以增加其资本。 由于资源有限，它只能在 IPO 之前完成最多 k 个不同的项目。帮助 力扣 设计完成最多 k 个不同项目后得到最大总资本的方式。

// 给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。

// 最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。

// 总而言之，从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。

// 答案保证在 32 位有符号整数范围内。



// 示例 1：

// 输入：k = 2, w = 0, profits = [1, 2, 3], capital = [0, 1, 1]
// 输出：4
// 解释：
// 由于你的初始资本为 0，你仅可以从 0 号项目开始。
// 在完成后，你将获得 1 的利润，你的总资本将变为 1。
// 此时你可以选择开始 1 号或 2 号项目。
// 由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
// 因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。
// 示例 2：

// 输入：k = 3, w = 0, profits = [1, 2, 3], capital = [0, 1, 2]
// 输出：6


// 提示：

// 1 <= k <= 105
// 0 <= w <= 109
// n == profits.length
// n == capital.length
// 1 <= n <= 105
// 0 <= profits[i] <= 104
// 0 <= capital[i] <= 109

const father = x => x === 0 ? 0 : Math.floor((x - 1) / 2);
const lc = x => 2 * x + 1;
const rc = x => 2 * x + 2;

// 优先级队列
class PQueue {
  constructor(ctor) {
    // 接收一个比较器函数，用于拓展队列功能，使得可以自定义队列的排序
    this.s = [];
    this.ctor = ctor;
  }
  get size() {
    return this.s.length;
  }
  heapInsert(item) {
    // 尾插入，并堆化
    const { s, ctor } = this;
    s.push(item);
    let offset = this.s.length - 1;
    let f = father(offset);
    while (ctor(s[offset], s[f]) < 0) {
      [s[f], s[offset]] = [s[offset], s[f]];
      offset = f;
      f = father(offset)
    }
  }
  heapify() {
    // 弹出顶部后，然后进行堆化
    if (this.size <= 1) return;
    const { s, ctor } = this;
    let offset = 0;
    while (lc(offset) < this.size) {
      let lcof = lc(offset);
      let rcof = rc(offset);
      let largest = rcof < this.size && ctor(s[rcof], s[lcof]) < 0 ? rcof : lcof;
      if (ctor(s[largest], s[offset]) >= 0) largest = offset;
      if (largest === offset) break;
      [s[offset], s[largest]] = [s[largest], s[offset]];
      offset = largest;
    }
  }
  add(item) {
    this.heapInsert(item);
  }
  pull() {
    if (this.size === 0) return null;
    const { s } = this;
    [s[0], s[s.length - 1]] = [s[s.length - 1], s[0]];
    const res = s.pop();
    this.heapify();
    return res;
  }
  peek() {
    return this.s[0];
  }
  toString() {
    return String(this.s);
  }
}

/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const minCostPQueue = new PQueue((a, b) => {
    if (capital[a] < capital[b]) return -1;
    return 1;
  })
  const maxProfitPQueue = new PQueue((a, b) => {
    if (profits[a] > profits[b]) return -1;
    return 1;
  })
  for (let i = 0; i < capital.length; i++) {
    minCostPQueue.add(i);
  }
  for (let i = 0; i < k; i++) {
    while (minCostPQueue.size !== 0 && capital[minCostPQueue.peek()] <= w) {
      maxProfitPQueue.add(minCostPQueue.pull());
    }
    if (maxProfitPQueue.size === 0) return w;
    w += profits[maxProfitPQueue.pull()];
  }
  return w;
}