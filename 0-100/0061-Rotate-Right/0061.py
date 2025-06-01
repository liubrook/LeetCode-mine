class Solution:
  def rotateRight(self, head: ListNode, k: int) -> ListNode:
    if k == 0 or not head or not head.next:
      return head

    n = 1
    cur = head
    while cur.next:
      cur = cur.next
      n += 1

    if (add := n - k % n) == n:
      return head

    cur.next = head
    while add:
      cur = cur.next
      add -= 1

    ret = cur.next
    cur.next = None
    return ret