// 3454. 分割正方形 II
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二维整数数组 squares ，其中 squares[i] = [xi, yi, li] 表示一个与 x 轴平行的正方形的左下角坐标和正方形的边长。

// 找到一个最小的 y 坐标，它对应一条水平线，该线需要满足它以上正方形的总面积 等于 该线以下正方形的总面积。

// 答案如果与实际答案的误差在 10-5 以内，将视为正确答案。

// 注意：正方形 可能会 重叠。重叠区域只 统计一次 。

// 示例 1：

// 输入： squares = [[0,0,1],[2,2,1]]

// 输出： 1.00000

// 解释：

// https://pic.leetcode.cn/1739609602-zhNmeC-4065example1drawio.png

// 任何在 y = 1 和 y = 2 之间的水平线都会有 1 平方单位的面积在其上方，1 平方单位的面积在其下方。最小的 y 坐标是 1。

// 示例 2：

// 输入： squares = [[0,0,2],[1,1,1]]

// 输出： 1.00000

// 解释：

// https://pic.leetcode.cn/1739609605-ezeVgk-4065example2drawio.png

// 由于蓝色正方形和红色正方形有重叠区域且重叠区域只统计一次。所以直线 y = 1 将正方形分割成两部分且面积相等。

// 提示：

// 1 <= squares.length <= 5 * 10^4
// squares[i] = [xi, yi, li]
// squares[i].length == 3
// 0 <= xi, yi <= 10^9
// 1 <= li <= 10^9
// 所有正方形的总面积不超过 10^15。
/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
  // 存储事件: [y坐标, 类型, 左边界, 右边界]
  const events = [];
  const xsSet = new Set();

  for (const sq of squares) {
    const [x, y, l] = sq;
    const xr = x + l;
    events.push([y, 1, x, xr]);
    events.push([y + l, -1, x, xr]);
    xsSet.add(x);
    xsSet.add(xr);
  }

  // 按y坐标排序事件
  events.sort((a, b) => a[0] - b[0]);
  // 离散化坐标
  const xs = Array.from(xsSet).sort((a, b) => a - b);
  // 初始化线段树
  const segTree = new SegmentTree(xs);

  const psum = [];
  const widths = [];
  let total_area = 0;
  let prev = events[0][0];

  // 扫描：计算总面积和记录中间状态
  for (const event of events) {
    const [y, delta, xl, xr] = event;
    const length = segTree.query();
    total_area += length * (y - prev);
    segTree.update(xl, xr, delta, 0, segTree.n - 1, 0);
    // 记录前缀和和宽度
    psum.push(total_area);
    widths.push(segTree.query());
    prev = y;
  }

  // 计算目标面积（向上取整的一半）
  const target = Math.floor((total_area + 1) / 2);
  // 二分查找第一个大于等于target的位置
  let left = 0,
    right = psum.length - 1;
  let i = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (psum[mid] < target) {
      i = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // 获取对应的面积、宽度和高度
  const area = psum[i];
  const width = widths[i];
  const height = events[i][0];

  return height + (total_area - area * 2) / (width * 2.0);
};

class SegmentTree {
  constructor(xs) {
    this.xs = xs; // sorted x coordinates
    this.n = xs.length - 1;
    this.count = new Array(4 * this.n).fill(0);
    this.covered = new Array(4 * this.n).fill(0);
  }

  update(qleft, qright, qval, left, right, pos) {
    if (this.xs[right + 1] <= qleft || this.xs[left] >= qright) {
      return; // no overlap
    }
    if (qleft <= this.xs[left] && this.xs[right + 1] <= qright) {
      this.count[pos] += qval;
    } else {
      const mid = Math.floor((left + right) / 2);
      this.update(qleft, qright, qval, left, mid, pos * 2 + 1);
      this.update(qleft, qright, qval, mid + 1, right, pos * 2 + 2);
    }

    if (this.count[pos] > 0) {
      this.covered[pos] = this.xs[right + 1] - this.xs[left];
    } else {
      if (left === right) {
        this.covered[pos] = 0;
      } else {
        this.covered[pos] =
          this.covered[pos * 2 + 1] + this.covered[pos * 2 + 2];
      }
    }
  }

  query() {
    return this.covered[0];
  }
}
