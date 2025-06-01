// 146. LRU 缓存
// 中等
// 2.9K
// 相关企业
// 请你设计并实现一个满足  LRU(最近最少使用) 缓存 约束的数据结构。
// 实现 LRUCache 类：
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 - 1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key - value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。



// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// 解释
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // 缓存是 {1=1}
// lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
// lRUCache.get(1);    // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2);    // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1);    // 返回 -1 (未找到)
// lRUCache.get(3);    // 返回 3
// lRUCache.get(4);    // 返回 4


// 提示：

// 1 <= capacity <= 3000
// 0 <= key <= 10000
// 0 <= value <= 1^05
// 最多调用 2 * 10^5 次 get 和 put

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.hash = {};
  this.count = 0;
  this.dummyHead = new ListNode();
  this.dummyTail = new ListNode();
  this.dummyHead.next = this.dummyTail;
  this.dummyTail.prev = this.dummyHead;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let node = this.hash[key];
  if (node == null) return -1;
  this.moveToHead(node);
  return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.hash[key];
  if (node == null) {
    if (this.count == this.capacity) {
      this.removeLRUItem();
    }
    let newNode = new ListNode(key, value);
    this.hash[key] = newNode;
    this.addToHead(newNode);
    this.count++;
  } else {
    node.value = value;
    this.moveToHead(node);
  }
};

LRUCache.prototype.moveToHead = function (node) {
  this.removeFromList(node);
  this.addToHead(node);
}

LRUCache.prototype.removeFromList = function (node) {
  let temp1 = node.prev;
  let temp2 = node.next;
  temp1.next = temp2;
  temp2.prev = temp1;
}

LRUCache.prototype.addToHead = function (node) {
  node.prev = this.dummyHead;
  node.next = this.dummyHead.next;
  this.dummyHead.next.prev = node;
  this.dummyHead.next = node;
}

LRUCache.prototype.removeLRUItem = function () {
  let tail = this.popTail();
  delete this.hash[tail.key];
  this.count--;
}

LRUCache.prototype.popTail = function () {
  let tail = this.dummyTail.prev;
  this.removeFromList(tail);
  return tail;
}

class ListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */