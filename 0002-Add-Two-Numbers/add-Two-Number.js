//2. 两数相加
//给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

//如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

//您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

//示例：

//输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
//输出：7 -> 0 -> 8
//原因：342 + 465 = 807

var addTwoNumbers1 = function(l1, l2) {
    let c = 0;
    let r = new ListNode();
    let p = r;
    let p1 = l1, p2 = l2;
    while(p1 || p2 || c) {
        c += ((p1 && p1.val) || 0) + ((p2 && p2.val) || 0)
        let node = new ListNode(c % 10);
        p.next = node;
        c = parseInt(c / 10);
        p1 && (p1 = p1.next);
        p2 && (p2 = p2.next)
        p = p.next
    }
    return r.next
}

var addTwoNumbers2 = function(l1, l2) {
    let node = new ListNode('head');
    let temp = node; // 哑节点
    let add = 0; // 是否进1
    let sum = 0; // 新链表当前未取余的值 = 链表1值 + 链表2值 + add

    // 遍历，直到最长的都为空
    while (l1 || l2) {
        sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + add;
        temp.next = new ListNode(sum % 10); // 取余则为新链表的值
        temp = temp.next;
        add = sum >= 10 ? 1 : 0;
        l1 && (l1 = l1.next)
        l2 && (l2 = l2.next)
    }
    add && (temp.next = new ListNode(add));
    return node.next
}