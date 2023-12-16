// 2276. 统计区间中的整数数目
// 提示
// 困难
// 60
// 相关企业
// 给你区间的 空 集，请你设计并实现满足要求的数据结构：

// 新增：添加一个区间到这个区间集合中。
// 统计：计算出现在 至少一个 区间中的整数个数。
// 实现 CountIntervals 类：

// CountIntervals() 使用区间的空集初始化对象
// void add(int left, int right) 添加区间[left, right] 到区间集合之中。
// int count() 返回出现在 至少一个 区间中的整数个数。
// 注意：区间[left, right] 表示满足 left <= x <= right 的所有整数 x 。



// 示例 1：

// 输入
// ["CountIntervals", "add", "add", "count", "add", "count"]
// [[], [2, 3], [7, 10], [], [5, 8], []]
// 输出
// [null, null, null, 6, null, 8]

// 解释
// CountIntervals countIntervals = new CountIntervals(); // 用一个区间空集初始化对象
// countIntervals.add(2, 3);  // 将 [2, 3] 添加到区间集合中
// countIntervals.add(7, 10); // 将 [7, 10] 添加到区间集合中
// countIntervals.count();    // 返回 6
// // 整数 2 和 3 出现在区间 [2, 3] 中
// // 整数 7、8、9、10 出现在区间 [7, 10] 中
// countIntervals.add(5, 8);  // 将 [5, 8] 添加到区间集合中
// countIntervals.count();    // 返回 8
// // 整数 2 和 3 出现在区间 [2, 3] 中
// // 整数 5 和 6 出现在区间 [5, 8] 中
// // 整数 7 和 8 出现在区间 [5, 8] 和区间 [7, 10] 中
// // 整数 9 和 10 出现在区间 [7, 10] 中


// 提示：

// 1 <= left <= right <= 10^9
// 最多调用  add 和 count 方法 总计 10^5 次
// 调用 count 方法至少一次


var CountIntervals = function () {
  this.tree = new SegmentTree(0, 1e9);
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
CountIntervals.prototype.add = function (left, right) {
  this.tree.update(left, right);
};

/**
 * @return {number}
 */
CountIntervals.prototype.count = function () {
  return this.tree.query(0, 1e9);
};

/**
 * Your CountIntervals object will be instantiated and called as such:
 * var obj = new CountIntervals()
 * obj.add(left,right)
 * var param_2 = obj.count()
 */

function Node(start, end) {
  this.val = 0
  this.start = start
  this.end = end
  this.left = null
  this.right = null
}

function SegmentTree(start, end) {
  this.root = new Node(start, end)
}

SegmentTree.prototype.update = function (start, end) {
  this.updateNode(this.root, start, end)
}

SegmentTree.prototype.updateNode = function (node, start, end) {
  if (!node) {
    return
  }
  if (start > node.end || end < node.start) {
    return
  } else if (start <= node.start && end >= node.end) {
    node.val = node.end - node.start + 1
    return
  } else {
    this.pushdown(node);
    this.updateNode(node.left, start, end);
    this.updateNode(node.right, start, end);
    this.pushup(node);
  }
}

SegmentTree.prototype.pushdown = function (node) {
  if (!node) {
    return
  }
  const mid = Math.floor((node.start + node.end) / 2)
  if (!node.left) {
    node.left = new Node(node.start, mid)
  }
  if (!node.right) {
    node.right = new Node(mid + 1, node.end)
  }
  if (node.val === (node.end - node.start + 1)) {
    node.left.val = mid - node.start + 1
    node.right.val = node.end - mid
  }
}

SegmentTree.prototype.pushup = function (node) {
  node.val = node.left.val + node.right.val
}

SegmentTree.prototype.query = function (start, end) {
  return this.queryNode(this.root, start, end)
}

SegmentTree.prototype.queryNode = function (node, start, end) {
  if (!node) {
    return 0;
  }
  if (start > node.end || end < node.start) {
    return 0;
  } else if (start <= node.start && end >= node.end) {
    return node.val;
  } else {
    this.pushdown(node);
    return this.queryNode(node.left, start, end) + this.queryNode(node.right, start, end);
  }
}