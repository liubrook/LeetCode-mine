// 剑指 Offer 37. 序列化二叉树
// 请实现两个函数，分别用来序列化和反序列化二叉树。

// 你需要设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

// 提示：输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。



// 示例：

// https://assets.leetcode.com/uploads/2020/09/15/serdeser.jpg
// 输入：root = [1, 2, 3, null, null, 4, 5]
// 输出：[1, 2, 3, null, null, 4, 5]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  return rserialize(root, '');
};

var deserialize = function (data) {
  const dataArray = data.split(",");
  return rdeserialize(dataArray);
};

const rserialize = (root, str) => {
  if (root === null) {
    str += "None,";
  } else {
    str += root.val + '' + ",";
    str = rserialize(root.left, str);
    str = rserialize(root.right, str);
  }
  return str;
}

const rdeserialize = (dataList) => {
  if (dataList[0] === "None") {
    dataList.shift();
    return null;
  }

  const root = new TreeNode(parseInt(dataList[0]));
  dataList.shift();
  root.left = rdeserialize(dataList);
  root.right = rdeserialize(dataList);

  return root;
}