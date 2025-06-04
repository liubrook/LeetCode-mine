// 870. 优势洗牌
// 给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums 的优势可以用满足 nums1[i] > nums2[i] 的索引 i 的数目来描述。

// 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。



// 示例 1：

// 输入：nums1 = [2, 7, 11, 15], nums2 = [1, 10, 4, 11]
// 输出：[2, 11, 7, 15]
// 示例 2：

// 输入：nums1 = [12, 24, 8, 32], nums2 = [13, 25, 32, 11]
// 输出：[24, 32, 8, 12]


// 提示：

// 1 <= nums1.length <= 105
// nums2.length == nums1.length
// 0 <= nums1[i], nums2[i] <= 109


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var advantageCount = function (nums1, nums2) {
  const n = nums1.length;
  const idx1 = new Array(n).fill(0);
  const idx2 = new Array(n).fill(0);
  for (let i = 0; i < n; ++i) {
    idx1[i] = i;
    idx2[i] = i;
  }
  idx1.sort((i, j) => nums1[i] - nums1[j]);
  idx2.sort((i, j) => nums2[i] - nums2[j]);

  const ans = new Array(n).fill(0);
  let left = 0, right = n - 1;
  for (let i = 0; i < n; ++i) {
    if (nums1[idx1[i]] > nums2[idx2[left]]) {
      ans[idx2[left]] = nums1[idx1[i]];
      ++left;
    } else {
      ans[idx2[right]] = nums1[idx1[i]];
      --right;
    }
  }
  return ans;
};