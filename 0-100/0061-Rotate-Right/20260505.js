var rotateRight = function (head, k) {
  if (head === null) {
    return null;
  }

  // 1. 计算链表长度，并找到尾节点
  let length = 1;
  let tail = head;
  while (tail.next !== null) {
    length++;
    tail = tail.next;
  }
  k %= length;

  // 2. 首尾相连
  tail.next = head;

  // 3. 找倒数第 k+1 个节点，作为新链表的尾节点
  let newTail = head;
  for (let i = 0; i < length - k - 1; i++) {
    newTail = newTail.next;
  }

  // 4. 断开倒数第 k+1 个节点（newTail）和倒数第 k 个节点（newHead）
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
};
