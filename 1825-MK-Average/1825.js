// 1825. 求出 MK 平均值
// 给你两个整数 m 和 k ，以及数据流形式的若干整数。你需要实现一个数据结构，计算这个数据流的 MK 平均值 。

// MK 平均值 按照如下步骤计算：

// 如果数据流中的整数少于 m 个，MK 平均值 为 - 1 ，否则将数据流中最后 m 个元素拷贝到一个独立的容器中。
// 从这个容器中删除最小的 k 个数和最大的 k 个数。
// 计算剩余元素的平均值，并 向下取整到最近的整数 。
// 请你实现 MKAverage 类：

// MKAverage(int m, int k) 用一个空的数据流和两个整数 m 和 k 初始化 MKAverage 对象。
// void addElement(int num) 往数据流中插入一个新的元素 num 。
// int calculateMKAverage() 对当前的数据流计算并返回 MK 平均数 ，结果需 向下取整到最近的整数 。


// 示例 1：

// 输入：
// ["MKAverage", "addElement", "addElement", "calculateMKAverage", "addElement", "calculateMKAverage", "addElement", "addElement", "addElement", "calculateMKAverage"]
// [[3, 1], [3], [1], [], [10], [], [5], [5], [5], []]
// 输出：
// [null, null, null, -1, null, 3, null, null, null, 5]

// 解释：
// MKAverage obj = new MKAverage(3, 1);
// obj.addElement(3);        // 当前元素为 [3]
// obj.addElement(1);        // 当前元素为 [3,1]
// obj.calculateMKAverage(); // 返回 -1 ，因为 m = 3 ，但数据流中只有 2 个元素
// obj.addElement(10);       // 当前元素为 [3,1,10]
// obj.calculateMKAverage(); // 最后 3 个元素为 [3,1,10]
// // 删除最小以及最大的 1 个元素后，容器为 [3]
// // [3] 的平均值等于 3/1 = 3 ，故返回 3
// obj.addElement(5);        // 当前元素为 [3,1,10,5]
// obj.addElement(5);        // 当前元素为 [3,1,10,5,5]
// obj.addElement(5);        // 当前元素为 [3,1,10,5,5,5]
// obj.calculateMKAverage(); // 最后 3 个元素为 [5,5,5]
// // 删除最小以及最大的 1 个元素后，容器为 [5]
// // [5] 的平均值等于 5/1 = 5 ，故返回 5


// 提示：

// 3 <= m <= 10^5
// 1 <= k * 2 < m
// 1 <= num <= 10^5
// addElement 与 calculateMKAverage 总操作次数不超过 10^5 次。

/**
 * @param {number} m
 * @param {number} k
 */
var MKAverage = function (m, k) {
  this.m = m;
  this.k = k;
  this.set = new Treap((node, val) => {
    if (node == val) return 0;
    if (node > val) return 1;
    return -1;
  });
  this.size = 0;
  this.total = 0;

  this.store = new Array(m).fill(0);
  this.storeIndex = 0;
};

/** 
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  let willBeDelete = this.store[this.storeIndex];
  if (willBeDelete !== 0) {
    this.total -= willBeDelete;
    this.set.remove(willBeDelete);
  }
  this.store[this.storeIndex] = num;
  this.storeIndex++;
  this.storeIndex = this.storeIndex % this.store.length;
  this.total += num;
  this.set.insert(num);

  this.size++;
};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  if (this.size < this.m) {
    return -1;
  }
  let ret = this.total;

  let now = -Infinity;
  let k = this.k;
  while (k) {
    let next = this.set.getNext(now);
    now = next;
    let tmp = this.set.find(now);

    let min = Math.min(k, tmp.cnt);
    ret -= now * min;
    k -= min;
  }

  now = Infinity;
  k = this.k;
  while (k) {
    let prev = this.set.getPrev(now);
    now = prev;
    let tmp = this.set.find(prev);

    let min = Math.min(k, tmp.cnt);
    ret -= now * min;
    k -= min;
  }
  return Math.floor(ret / (this.m - this.k * 2));
};

class Node {
  constructor(val) {
    this.val = val;
    this.cnt = 1;
    this.size = 1;
    this.fac = Math.random();
    this.left = null;
    this.right = null;
  }
  push_up() {
    let tmp = this.cnt;
    tmp += Node.getSize(this.left);
    tmp += Node.getSize(this.right);
    this.size = tmp;
  }
  rotate_right() {
    let node = this;
    let left = node.left;
    node.left = left.right;
    left.right = node;
    node = left;
    node.right.push_up();
    node.push_up();
    return node;
  }
  rotate_left() {
    let node = this;
    let right = node.right;
    node.right = right.left;
    right.left = node;
    node = right;
    node.left.push_up();
    node.push_up();
    return node;
  }
  static getSize(node) {
    // return node?.size || 0;
    return ((node && node.size) || 0);
  }
  static getFac(node) {
    return ((node && node.fac) || 0);
  }
}
class Treap {
  constructor(compare, left = -Infinity, right = Infinity) {
    this.root = new Node(right);
    this.root.fac = Infinity;
    this.root.left = new Node(left);
    this.root.left.fac = -Infinity;
    this.root.push_up();

    this.compare = compare;
  }
  get size() {
    return this.root.size - 2;
  }
  get height() {
    function getHeight(node) {
      if (node === null) return 0;
      return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }
    return getHeight(this.root);
  }
  get all() {
    var inorderTraversal = function (root) {
      let ret = [];
      function dfs(node) {
        node.left && dfs(node.left);
        ret.push(node.val);
        node.right && dfs(node.right);
      }
      root && dfs(root);
      return ret;
    };
    return inorderTraversal(this.root);
  }
  insert(val) {
    let compare = this.compare;
    // js 里没 & 这种引用  所以要带着parent和上次的方向  在c++里直接 Tree &rt 就可以了
    function dfs(node, val, parent, direction) {
      if (compare(node.val, val) === 0) {
        node.cnt++;
        node.push_up();
      } else if (compare(node.val, val) === 1) {
        if (node.left) {
          dfs(node.left, val, node, 'left');
        } else {
          node.left = new Node(val);
          node.push_up();
        }

        if (Node.getFac(node.left) > node.fac) {
          parent[direction] = node.rotate_right();
        }
      } else if (compare(node.val, val) === -1) {
        if (node.right) {
          dfs(node.right, val, node, 'right');
        } else {
          node.right = new Node(val);
          node.push_up();
        }

        if (Node.getFac(node.right) > node.fac) {
          parent[direction] = node.rotate_left();
        }
      }
      parent.push_up();
    }
    dfs(this.root.left, val, this.root, 'left');
  }
  remove(val) {
    let compare = this.compare;
    function dfs(node, val, parent, direction) {
      if (node === null) return;

      if (compare(node.val, val) === 0) {
        if (node.cnt > 1) {
          node.cnt--;
          node.push_up();
        } else if (node.left === null && node.right === null) {
          parent[direction] = null;
        } else {
          // 旋到根节点
          if (node.right === null || Node.getFac(node.left) > Node.getFac(node.right)) {
            parent[direction] = node.rotate_right();
            dfs(parent[direction].right, val, parent[direction], 'right');
          } else {
            parent[direction] = node.rotate_left();
            dfs(parent[direction].left, val, parent[direction], 'left');
          }
        }
      } else if (compare(node.val, val) === 1) {
        dfs(node.left, val, node, 'left');
      } else if (compare(node.val, val) === -1) {
        dfs(node.right, val, node, 'right');
      }
      parent.push_up();
    }
    dfs(this.root.left, val, this.root, 'left');
  }
  getRankByVal(val) {
    if (val === void 0) return 0;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return 0;

      if (compare(node.val, val) === 0) {
        // return ((node.left && node.left.size) || 0) + 1;
        return Node.getSize(node.left) + 1;
      } else if (compare(node.val, val) === 1) {
        return dfs(node.left, val);
      } else if (compare(node.val, val) === -1) {
        // return dfs(node.right, val) + ((node.left && node.left.size) || 0) + node.cnt;
        return dfs(node.right, val) + Node.getSize(node.left) + node.cnt;
      }
    }
    // 因为有个-Infinity 所以-1
    return dfs(this.root, val) - 1;
  }
  getValByRank(rank) {
    if (rank === void 0) return Infinity;
    function dfs(node, rank) {
      if (node === null) return Infinity;

      if (Node.getSize(node.left) >= rank) {
        return dfs(node.left, rank);
      } else if (Node.getSize(node.left) + node.cnt >= rank) {
        return node.val;
      } else {
        return dfs(node.right, rank - Node.getSize(node.left) - node.cnt);
      }
    }
    // 因为有个-Infinity 所以 + 1
    return dfs(this.root, rank + 1);
  }
  // lower_bound - 1
  getPrev(val) {
    if (val === void 0) return -Infinity;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return -Infinity;
      if (compare(node.val, val) >= 0) return dfs(node.left, val);

      let tmp = dfs(node.right, val);
      if (compare(node.val, tmp) == 1) {
        return node.val;
      } else {
        return tmp;
      }
    }
    return dfs(this.root, val);
  }
  // upper_bound
  getNext(val) {
    if (val === void 0) return Infinity;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return Infinity;
      if (compare(node.val, val) <= 0) return dfs(node.right, val);

      let tmp = dfs(node.left, val);
      if (compare(node.val, tmp) == -1) {
        return node.val;
      } else {
        return tmp;
      }
    }
    return dfs(this.root, val);
  }
  // 小于等于
  getPrevPlus(val) {
    if (val === void 0) return -Infinity;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return -Infinity;
      if (compare(node.val, val) === 0) return node.val;
      if (compare(node.val, val) >= 0) return dfs(node.left, val);

      let tmp = dfs(node.right, val);
      if (compare(node.val, tmp) == 1) {
        return node.val;
      } else {
        return tmp;
      }
    }
    return dfs(this.root, val);
  }
  // 大于等于
  getNextPlus(val) {
    if (val === void 0) return Infinity;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return Infinity;
      if (compare(node.val, val) === 0) return node.val;
      if (compare(node.val, val) <= 0) return dfs(node.right, val);

      let tmp = dfs(node.left, val);
      if (compare(node.val, tmp) == -1) {
        return node.val;
      } else {
        return tmp;
      }
    }
    return dfs(this.root, val);
  }
  find(val) {
    if (val === void 0) return null;
    let compare = this.compare;
    function dfs(node, val) {
      if (node === null) return null;
      if (compare(node.val, val) === 0) return node;
      if (compare(node.val, val) < 0) return dfs(node.right, val);
      return dfs(node.left, val);
    }
    return dfs(this.root, val);
  }
}

/**
 * Your MKAverage object will be instantiated and called as such:
 * var obj = new MKAverage(m, k)
 * obj.addElement(num)
 * var param_2 = obj.calculateMKAverage()
 */