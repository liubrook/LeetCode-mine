// 1851. 包含每个查询的最小区间
// 给你一个二维整数数组 intervals ，其中 intervals[i] = [lefti, righti] 表示第 i 个区间开始于 lefti 、结束于 righti（包含两侧取值，闭区间）。区间的 长度 定义为区间中包含的整数数目，更正式地表达是 righti - lefti + 1 。

// 再给你一个整数数组 queries 。第 j 个查询的答案是满足 lefti <= queries[j] <= righti 的 长度最小区间 i 的长度 。如果不存在这样的区间，那么答案是 - 1 。

// 以数组形式返回对应查询的所有答案。



// 示例 1：

// 输入：intervals = [[1, 4], [2, 4], [3, 6], [4, 4]], queries = [2, 3, 4, 5]
// 输出：[3, 3, 1, 4]
// 解释：查询处理如下：
// - Query = 2 ：区间[2, 4] 是包含 2 的最小区间，答案为 4 - 2 + 1 = 3 。
// - Query = 3 ：区间[2, 4] 是包含 3 的最小区间，答案为 4 - 2 + 1 = 3 。
// - Query = 4 ：区间[4, 4] 是包含 4 的最小区间，答案为 4 - 4 + 1 = 1 。
// - Query = 5 ：区间[3, 6] 是包含 5 的最小区间，答案为 6 - 3 + 1 = 4 。
// 示例 2：

// 输入：intervals = [[2, 3], [2, 5], [1, 8], [20, 25]], queries = [2, 19, 5, 22]
// 输出：[2, -1, 4, 6]
// 解释：查询处理如下：
// - Query = 2 ：区间[2, 3] 是包含 2 的最小区间，答案为 3 - 2 + 1 = 2 。
// - Query = 19：不存在包含 19 的区间，答案为 - 1 。
// - Query = 5 ：区间[2, 5] 是包含 5 的最小区间，答案为 5 - 2 + 1 = 4 。
// - Query = 22：区间[20, 25] 是包含 22 的最小区间，答案为 25 - 20 + 1 = 6 。


// 提示：

// 1 <= intervals.length <= 10^5
// 1 <= queries.length <= 10^5
// intervals[i].length == 2
// 1 <= lefti <= righti <= 10^7
// 1 <= queries[j] <= 10^7

class Heap {
  constructor() {
    this.A = [];
  }
  left(i) {
    if (i < 0) throw new Error("Index can't be negative.");
    return 2 * i + 1;
  }
  right(i) {
    if (i < 0) throw new Error("Index can't be negative.");
    return 2 * i + 2;
  }
  parent(i) {
    return i === 0 ? 0 : Math.floor((i - 1) >>> 1);
  }
  size() {
    return this.A.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this.isEmpty() ? null : this.A[0];
  }
  heapifyUp(i) {
    if (i === 0) return;  // 到达根节点
    const parent = this.parent(i);
    // i 优先级高于父节点，与其交换后，递归上升计算
    if (this.compare(this.A[i], this.A[parent])) {
      this.swap(i, parent);
      this.heapifyUp(parent);
    }
  }
  heapifyDown(i) {
    const l = this.left(i), r = this.right(i);
    let p = i;
    // 左节点优先级高
    if (l < this.size() && this.compare(this.A[l], this.A[p])) {
      p = l;
    }
    // 右节点优先级高
    if (r < this.size() && this.compare(this.A[r], this.A[p])) {
      p = r;
    }
    // 将 i 与更高优先级的孩子节点交换，再递归修改子树
    if (p !== i) {
      this.swap(i, p);
      this.heapifyDown(p);
    }
  }
  compare() {
    throw new Error("Must be implement!");
  }
  swap(i, j) {
    const tmp = this.A[i];
    this.A[i] = this.A[j];
    this.A[j] = tmp;
  }
}

class newPriorityQueue extends Heap {
  constructor(compare) {
    super();
    this.compare = compare;
  }
  enqueue(val) {
    // 将新元素推入堆，再将其 “上浮”
    this.A.push(val);
    this.heapifyUp(this.size() - 1);
  }
  dequeue() {
    if (this.isEmpty()) return;
    const first = this.peek();
    const last = this.A.pop();
    // 将最后一个元素放置堆顶，再将堆顶 “下沉”
    if (first !== last) {
      this.A[0] = last;
      this.heapifyDown(0);
    }
    return first;
  }
  peek() {
    return super.peek();
  }
}

/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
var minInterval = function (intervals, queries) {
  const N = intervals.length, M = queries.length;
  // 优先队列：区间长度小的优先级高
  const PQ = new newPriorityQueue((a, b) => (a[1] - a[0]) < (b[1] - b[0]));
  // 区间按开区间升序排序
  intervals.sort((a, b) => a[0] - b[0]);
  // 先记录待查询结果的索引，再将待查询结果按升序排序
  const mq = queries.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);

  // 将结果初始化为 -1
  const ans = new Array(M).fill(-1);
  let index = 0;   // 只需遍历一次 intervals
  for (let i = 0; i < M; i++) {
    // 1.推入左区间合法的区间
    while (index < N && mq[i][0] >= intervals[index][0]) {
      PQ.enqueue(intervals[index++]);
    }
    // 2.弹出右区间不合法的区间
    while (!PQ.isEmpty() && mq[i][0] > PQ.peek()[1]) {
      PQ.dequeue();
    }
    // 3.剩下两侧均符号的区间，堆顶的区间长度最小
    if (!PQ.isEmpty()) {
      const top = PQ.peek();
      ans[mq[i][1]] = top[1] - top[0] + 1;
    }
  }

  return ans;
};