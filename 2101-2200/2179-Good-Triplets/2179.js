// 2179. 统计数组中好三元组数目
// 困难
// 相关标签
// 相关企业
// 提示
// 给你两个下标从 0 开始且长度为 n 的整数数组 nums1 和 nums2 ，两者都是[0, 1, ..., n - 1] 的 排列 。

// 好三元组 指的是 3 个 互不相同 的值，且它们在数组 nums1 和 nums2 中出现顺序保持一致。换句话说，如果我们将 pos1v 记为值 v 在 nums1 中出现的位置，pos2v 为值 v 在 nums2 中的位置，那么一个好三元组定义为 0 <= x, y, z <= n - 1 ，且 pos1x < pos1y < pos1z 和 pos2x < pos2y < pos2z 都成立的(x, y, z) 。

// 请你返回好三元组的 总数目 。



// 示例 1：

// 输入：nums1 = [2, 0, 1, 3], nums2 = [0, 1, 2, 3]
// 输出：1
// 解释：
// 总共有 4 个三元组(x, y, z) 满足 pos1x < pos1y < pos1z ，分别是(2, 0, 1) ，(2, 0, 3) ，(2, 1, 3) 和(0, 1, 3) 。
// 这些三元组中，只有(0, 1, 3) 满足 pos2x < pos2y < pos2z 。所以只有 1 个好三元组。
// 示例 2：

// 输入：nums1 = [4, 0, 1, 3, 2], nums2 = [4, 1, 0, 2, 3]
// 输出：4
// 解释：总共有 4 个好三元组(4, 0, 3) ，(4, 0, 2) ，(4, 1, 3) 和(4, 1, 2) 。


// 提示：

// n == nums1.length == nums2.length
// 3 <= n <= 10^5
// 0 <= nums1[i], nums2[i] <= n - 1
// nums1 和 nums2 是[0, 1, ..., n - 1]的排列。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var goodTriplets = function (nums1, nums2) {
  const n = nums1.length;
  const pos2 = new Array(n), reversedIndexMapping = new Array(n);;
  for (let i = 0; i < n; i++) {
    pos2[nums2[i]] = i;
  }
  for (let i = 0; i < n; i++) {
    reversedIndexMapping[pos2[nums1[i]]] = i;
  }
  const tree = new FenwickTree(n);
  let res = 0;
  for (let value = 0; value < n; value++) {
    const pos = reversedIndexMapping[value];
    const left = tree.query(pos);
    tree.update(pos, 1);
    const right = (n - 1 - pos) - (value - left);
    res += left * right;
  }
  return res;
};

class FenwickTree {
  constructor(size) {
    this.tree = new Array(size + 1).fill(0);
  }

  update(index, delta) {
    index++;
    while (index < this.tree.length) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    index++;
    let res = 0;
    while (index > 0) {
      res += this.tree[index];
      index -= index & -index;
    }
    return res;
  }
}