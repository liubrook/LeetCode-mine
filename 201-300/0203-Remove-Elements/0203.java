class Solution {
  public ListNode removeElements(ListNode head, int val) {
    ListNode dummyHead = new ListNode(0);
    dummyHead.next = head;
    ListNode temp = dummyHead;
    while (temp.next != null) {
      if (temp.next.val == val) {
        temp.next = temp.next.next;
      } else {
        temp = temp.next;
      }
    }
    return dummyHead.next;
  }
}