// 530. 二叉搜索树的最小绝对差
// 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。

 

// 示例：

// 输入：

//    1
//     \
//      3
//     /
//    2

// 输出：
// 1

// 解释：
// 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。

var getMinimumDifference = function(root) {
    let ans = Number.MAX_SAFE_INTEGER, pre = -1;
    const dfs = (root) => {
        if (root === null) {
            return;
        }
        dfs(root.left);
        if (pre == -1) {
            pre = root.val;
        } else {
            ans = Math.min(ans, root.val - pre);
            pre = root.val;
        }
        dfs(root.right);
    }
    dfs(root);
    return ans;
}