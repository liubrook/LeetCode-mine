// 715. Range 模块
// Range模块是跟踪数字范围的模块。设计一个数据结构来跟踪表示为 半开区间 的范围并查询它们。

// 半开区间[left, right) 表示所有 left <= x < right 的实数 x 。

// 实现 RangeModule 类:

// RangeModule() 初始化数据结构的对象。
// void addRange(int left, int right) 添加 半开区间[left, right)，跟踪该区间中的每个实数。添加与当前跟踪的数字部分重叠的区间时，应当添加在区间[left, right) 中尚未跟踪的任何数字到该区间中。
// boolean queryRange(int left, int right) 只有在当前正在跟踪区间[left, right) 中的每一个实数时，才返回 true ，否则返回 false 。
// void removeRange(int left, int right) 停止跟踪 半开区间[left, right) 中当前正在跟踪的每个实数。


// 示例 1：

// 输入
// ["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
// [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
// 输出
// [null, null, null, true, false, true]

// 解释
// RangeModule rangeModule = new RangeModule();
// rangeModule.addRange(10, 20);
// rangeModule.removeRange(14, 16);
// rangeModule.queryRange(10, 14); 返回 true （区间[10, 14) 中的每个数都正在被跟踪）
// rangeModule.queryRange(13, 15); 返回 false（未跟踪区间[13, 15) 中像 14, 14.03, 14.17 这样的数字）
// rangeModule.queryRange(16, 17); 返回 true （尽管执行了删除操作，区间[16, 17) 中的数字 16 仍然会被跟踪）


// 提示：

// 1 <= left < right <= 109
// 在单个测试用例中，对 addRange 、  queryRange 和 removeRange 的调用总数不超过 104 次
const MAX_RANGE = 1e9 + 7;
var RangeModule = function () {
  this.st = new SegmentTree();
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.addRange = function (left, right) {
  this.st.update(this.st.root, 1, MAX_RANGE, left, right - 1, true);
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {boolean}
 */
RangeModule.prototype.queryRange = function (left, right) {
  return this.st.query(this.st.root, 1, MAX_RANGE, left, right - 1);
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.removeRange = function (left, right) {
  this.st.update(this.st.root, 1, MAX_RANGE, left, right - 1, false);
};

/**
 * Your RangeModule object will be instantiated and called as such:
 * var obj = new RangeModule()
 * obj.addRange(left,right)
 * var param_2 = obj.queryRange(left,right)
 * obj.removeRange(left,right)
 */

class SegNode {
  constructor() {
    this.ls = this.rs = null;
    this.val = this.add = false;
  }
}

class SegmentTree {
  constructor() {
    this.root = new SegNode();
  }
  update(node, lc, rc, l, r, v) {
    if (l <= lc && rc <= r) {
      node.val = v
      node.add = true
      return
    }
    this.pushdown(node)
    const mid = lc + rc >> 1
    if (l <= mid) {
      this.update(node.ls, lc, mid, l, r, v)
    }
    if (r > mid) {
      this.update(node.rs, mid + 1, rc, l, r, v)
    }
    this.pushup(node)
  }
  query(node, lc, rc, l, r) {
    if (l <= lc && rc <= r) {
      return node.val
    }
    this.pushdown(node)
    let ans = true
    const mid = lc + rc >> 1
    if (l <= mid) {
      ans = ans && this.query(node.ls, lc, mid, l, r)
    }
    if (r > mid) {
      ans = ans && this.query(node.rs, mid + 1, rc, l, r)
    }
    return ans
  }

  pushup(node) {
    node.val = node.ls.val && node.rs.val
  }

  pushdown(node) {
    if (node.ls == null) {
      node.ls = new SegNode()
    }
    if (node.rs == null) {
      node.rs = new SegNode()
    }
    if (!node.add) {
      return
    }
    node.ls.add = node.rs.add = true
    node.ls.val = node.rs.val = node.val
    node.add = false
  }
}