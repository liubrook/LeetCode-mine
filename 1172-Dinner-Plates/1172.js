// 1172. 餐盘栈
// 我们把无限数量 ∞ 的栈排成一行，按从左到右的次序从 0 开始编号。每个栈的的最大容量 capacity 都相同。

// 实现一个叫「餐盘」的类 DinnerPlates：

// DinnerPlates(int capacity) - 给出栈的最大容量 capacity。
// void push(int val) - 将给出的正整数 val 推入 从左往右第一个 没有满的栈。
// int pop() - 返回 从右往左第一个 非空栈顶部的值，并将其从栈中删除；如果所有的栈都是空的，请返回 - 1。
// int popAtStack(int index) - 返回编号 index 的栈顶部的值，并将其从栈中删除；如果编号 index 的栈是空的，请返回 - 1。


// 示例：

// 输入：
// ["DinnerPlates", "push", "push", "push", "push", "push", "popAtStack", "push", "push", "popAtStack", "popAtStack", "pop", "pop", "pop", "pop", "pop"]
// [[2], [1], [2], [3], [4], [5], [0], [20], [21], [0], [2], [], [], [], [], []]
// 输出：
// [null, null, null, null, null, null, 2, null, null, 20, 21, 5, 4, 3, 1, -1]

// 解释：
// DinnerPlates D = DinnerPlates(2);  // 初始化，栈最大容量 capacity = 2
// D.push(1);
// D.push(2);
// D.push(3);
// D.push(4);
// D.push(5);         // 栈的现状为：    2  4
// 1  3  5
//                                     ﹈ ﹈ ﹈
// D.popAtStack(0);   // 返回 2。栈的现状为：      4
// 1  3  5
//                                           ﹈ ﹈ ﹈
// D.push(20);        // 栈的现状为：  20  4
// 1  3  5
//                                    ﹈ ﹈ ﹈
// D.push(21);        // 栈的现状为：  20  4 21
// 1  3  5
//                                    ﹈ ﹈ ﹈
// D.popAtStack(0);   // 返回 20。栈的现状为：       4 21
// 1  3  5
//                                             ﹈ ﹈ ﹈
// D.popAtStack(2);   // 返回 21。栈的现状为：       4
// 1  3  5
//                                             ﹈ ﹈ ﹈
// D.pop()            // 返回 5。栈的现状为：        4
// 1  3 
//                                             ﹈ ﹈
// D.pop()            // 返回 4。栈的现状为：    1  3 
//                                            ﹈ ﹈
// D.pop()            // 返回 3。栈的现状为：    1 
//                                            ﹈
// D.pop()            // 返回 1。现在没有栈。
// D.pop()            // 返回 -1。仍然没有栈。


// 提示：

// 1 <= capacity <= 20000
// 1 <= val <= 20000
// 0 <= index <= 100000
// 最多会对 push，pop，和 popAtStack 进行 200000 次调用。


/**
 * @param {number} capacity
 */
var DinnerPlates = function (capacity) {
  this.capacity = capacity;
  this.stack = [];
  this.top = [];
  this.poppedPos = new TreeSet();
};

/** 
 * @param {number} val
 * @return {void}
 */
DinnerPlates.prototype.push = function (val) {
  if (this.poppedPos.size === 0) {
    const pos = this.stack.length;
    this.stack.push(val);
    if (pos % this.capacity === 0) {
      this.top.push(0);
    }
    else {
      const stackPos = this.top.length - 1;
      const stackTop = this.top[stackPos];
      this.top.splice(stackPos, 1, stackTop + 1);
    }
  } else {
    const pos = this.poppedPos.pollFirst();
    this.stack.splice(pos, 1, val);
    const index = Math.floor(pos / this.capacity);
    const stackTop = this.top[index];
    this.top.splice(index, 1, stackTop + 1);
  }
};

/**
 * @return {number}
 */
DinnerPlates.prototype.pop = function () {
  while (this.stack.length !== 0 && this.poppedPos.has(this.stack.length - 1)) {
    this.stack.splice(this.stack.length - 1, 1);
    const pos = this.poppedPos.pollLast();
    if (pos % this.capacity === 0) {
      this.top.splice(this.top.length - 1, 1);
    }
  }
  if (this.stack.length === 0) {
    return -1;
  } else {
    const pos = this.stack.length - 1;
    const val = this.stack[pos];
    this.stack.splice(pos, 1);
    const index = this.top.length - 1;
    if (pos % this.capacity === 0) {
      this.top.splice(index, 1);
    } else {
      this.top.splice(index, 1, index - 1);
    }
    return val;
  }
};

/** 
 * @param {number} index
 * @return {number}
 */
DinnerPlates.prototype.popAtStack = function (index) {
  if (index >= this.top.length) {
    return -1;
  }
  const stackTop = this.top[index];
  if (stackTop < 0) {
    return -1;
  }
  this.top.splice(index, 1, stackTop - 1);
  const pos = index * this.capacity + stackTop;
  this.poppedPos.add(pos);
  return this.stack[pos];
};

class TreeSet {
  constructor(comparator) {
    this.set = new Set();
    this.comparator = comparator || ((a, b) => a - b);
    this.array = [];
  }

  add(item) {
    if (!this.set.has(item)) {
      this.set.add(item);
      this.array.push(item);
      this.array.sort(this.comparator);
    }
  }

  delete(item) {
    if (this.set.has(item)) {
      this.set.delete(item);
      this.array.splice(this.array.indexOf(item), 1);
    }
  }

  has(item) {
    return this.set.has(item);
  }

  get size() {
    return this.set.size;
  }

  toArray() {
    return [...this.array];
  }

  pollFirst() {
    const item = this.array.shift();
    this.set.delete(item);
    return item;
  }

  pollLast() {
    const item = this.array.pop();
    this.set.delete(item);
    return item;
  }
}

/**
 * Your DinnerPlates object will be instantiated and called as such:
 * var obj = new DinnerPlates(capacity)
 * obj.push(val)
 * var param_2 = obj.pop()
 * var param_3 = obj.popAtStack(index)
 */