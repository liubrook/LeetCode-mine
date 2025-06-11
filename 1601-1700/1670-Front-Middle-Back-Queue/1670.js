// 1670. 设计前中后队列
// 提示
// 中等
// 87
// 相关企业
// 请你设计一个队列，支持在前，中，后三个位置的 push 和 pop 操作。

// 请你完成 FrontMiddleBack 类：

// FrontMiddleBack() 初始化队列。
// void pushFront(int val) 将 val 添加到队列的 最前面 。
// void pushMiddle(int val) 将 val 添加到队列的 正中间 。
// void pushBack(int val) 将 val 添加到队里的 最后面 。
// int popFront() 将 最前面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 - 1 。
// int popMiddle() 将 正中间 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 - 1 。
// int popBack() 将 最后面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 - 1 。
// 请注意当有 两个 中间位置的时候，选择靠前面的位置进行操作。比方说：

// 将 6 添加到[1, 2, 3, 4, 5] 的中间位置，结果数组为[1, 2, 6, 3, 4, 5] 。
// 从[1, 2, 3, 4, 5, 6] 的中间位置弹出元素，返回 3 ，数组变为[1, 2, 4, 5, 6] 。


// 示例 1：

// 输入：
// ["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
// [[], [1], [2], [3], [4], [], [], [], [], []]
// 输出：
// [null, null, null, null, null, 1, 3, 4, 2, -1]

// 解释：
// FrontMiddleBackQueue q = new FrontMiddleBackQueue();
// q.pushFront(1);   // [1]
// q.pushBack(2);    // [1, 2]
// q.pushMiddle(3);  // [1, 3, 2]
// q.pushMiddle(4);  // [1, 4, 3, 2]
// q.popFront();     // 返回 1 -> [4, 3, 2]
// q.popMiddle();    // 返回 3 -> [4, 2]
// q.popMiddle();    // 返回 4 -> [2]
// q.popBack();      // 返回 2 -> []
// q.popFront();     // 返回 -1 -> [] （队列为空）


// 提示：

// 1 <= val <= 10^9
// 最多调用 1000 次 pushFront， pushMiddle， pushBack， popFront， popMiddle 和 popBack 。


var FrontMiddleBackQueue = function () {
  this.left = new Deque();
  this.right = new Deque();
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {
  this.left.pushFront(val);
  if (this.left.length() == this.right.length() + 2) {
    this.right.pushFront(this.left.popBack());
  }
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
  if (this.left.length() == this.right.length() + 1) {
    this.right.pushFront(this.left.popBack());
  }
  this.left.pushBack(val);
};

/** 
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
  this.right.pushBack(val);
  if (this.left.length() + 1 == this.right.length()) {
    this.left.pushBack(this.right.popFront());
  }
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
  if (this.left.isEmpty()) {
    return -1;
  }
  var val = this.left.popFront();
  if (this.left.length() + 1 == this.right.length()) {
    this.left.pushBack(this.right.popFront());
  }
  return val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
  if (this.left.isEmpty()) {
    return -1;
  }
  var val = this.left.popBack();
  if (this.left.length() + 1 == this.right.length()) {
    this.left.pushBack(this.right.popFront());
  }
  return val;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
  if (this.left.isEmpty()) {
    return -1;
  }
  var val = 0;
  if (this.right.isEmpty()) {
    val = this.left.popBack();
  } else {
    val = this.right.popBack();
    if (this.left.length() == this.right.length() + 2) {
      this.right.pushFront(this.left.popBack());
    }
  }
  return val;
};

function DLNode(val, next = null, prev = null) {
  this.val = val;
  this.next = next;
  this.prev = prev;
}

function Deque() {
  this.head = new DLNode(-1)
  this.tail = new DLNode(-1);
  this.head.next = this.tail;
  this.tail.prev = this.head;
  this.count = 0;
  this.pushFront = function (val) {
    node = new DLNode(val);
    node.prev = this.head;
    node.next = this.head.next;
    node.next.prev = node;
    this.head.next = node;
    this.count++;
  }

  this.pushBack = function (val) {
    node = new DLNode(val);
    node.prev = this.tail.prev;
    node.next = this.tail;
    node.prev.next = node;
    this.tail.prev = node;
    this.count++;
  }

  this.popFront = function () {
    if (this.isEmpty()) {
      return -1;
    }
    var val = this.head.next.val;
    this.head.next = this.head.next.next;
    this.head.next.prev = this.head;
    this.count--;
    return val;
  }
  this.popBack = function () {
    if (this.isEmpty()) {
      return -1;
    }
    var val = this.tail.prev.val;
    this.tail.prev = this.tail.prev.prev;
    this.tail.prev.next = this.tail;
    this.count--;
    return val;
  }

  this.length = function () {
    return this.count;
  }

  this.isEmpty = function () {
    return this.count == 0;
  }
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */