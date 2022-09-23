// 707. 设计链表
// 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针 / 引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0 - index 的。

// 在链表类中实现这些功能：

// get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回 - 1。
// addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
// addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
// addAtIndex(index, val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
// deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。


// 示例：

// MyLinkedList linkedList = new MyLinkedList();
// linkedList.addAtHead(1);
// linkedList.addAtTail(3);
// linkedList.addAtIndex(1, 2);   //链表变为1-> 2-> 3
// linkedList.get(1);            //返回2
// linkedList.deleteAtIndex(1);  //现在链表是1-> 3
// linkedList.get(1);            //返回3


// 提示：

// 所有val值都在[1, 1000] 之内。
// 操作次数将在[1, 1000] 之内。
// 请不要使用内置的 LinkedList 库。

var MyLinkedList = function () {
  this.size = 0;
  this.head = new ListNode(0);
  this.tail = new ListNode(0);
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) {
    return -1;
  }
  let curr;
  if (index + 1 < this.size - index) {
    curr = this.head;
    for (let i = 0; i <= index; i++) {
      curr = curr.next;
    }
  } else {
    curr = this.tail;
    for (let i = 0; i < this.size - index; i++) {
      curr = curr.prev;
    }
  }
  return curr.val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.size) {
    return;
  }
  index = Math.max(0, index);
  let pred, succ;
  if (index < this.size - index) {
    pred = this.head;
    for (let i = 0; i < index; i++) {
      pred = pred.next;
    }
    succ = pred.next;
  } else {
    succ = this.tail;
    for (let i = 0; i < this.size - index; i++) {
      succ = succ.prev;
    }
    pred = succ.prev;
  }
  this.size++;
  const toAdd = new ListNode(val);
  toAdd.prev = pred;
  toAdd.next = succ;
  pred.next = toAdd;
  succ.prev = toAdd;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) {
    return;
  }
  let pred, succ;
  if (index < this.size - index) {
    pred = this.head;
    for (let i = 0; i < index; i++) {
      pred = pred.next;
    }
    succ = pred.next.next;
  } else {
    succ = this.tail;
    for (let i = 0; i < this.size - index - 1; i++) {
      succ = succ.prev;
    }
    pred = succ.prev.prev;
  }
  this.size--;
  pred.next = succ;
  succ.prev = pred;
};

function ListNode(val, next, prev) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
  this.prev = (prev === undefined ? null : next)
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */