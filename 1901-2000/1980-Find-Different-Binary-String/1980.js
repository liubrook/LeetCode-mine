// 1980. 找出不同的二进制字符串
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串数组 nums ，该数组由 n 个 互不相同 的二进制字符串组成，且每个字符串长度都是 n 。请你找出并返回一个长度为 n 且 没有出现 在 nums 中的二进制字符串。如果存在多种答案，只需返回 任意一个 即可。

// 示例 1：

// 输入：nums = ["01","10"]
// 输出："11"
// 解释："11" 没有出现在 nums 中。"00" 也是正确答案。
// 示例 2：

// 输入：nums = ["00","01"]
// 输出："11"
// 解释："11" 没有出现在 nums 中。"10" 也是正确答案。
// 示例 3：

// 输入：nums = ["111","011","001"]
// 输出："101"
// 解释："101" 没有出现在 nums 中。"000"、"010"、"100"、"110" 也是正确答案。

// 提示：

// n == nums.length
// 1 <= n <= 16
// nums[i].length == n
// nums[i] 为 '0' 或 '1'
// nums 中的所有字符串 互不相同
/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function (nums) {
  const n = nums.length;
  // 预处理对应整数的哈希集合
  const vals = new Set();
  for (const num of nums) {
    vals.add(parseInt(num, 2));
  }
  // 寻找第一个不在哈希集合中的整数
  let val = 0;
  while (vals.has(val)) {
    ++val;
  }
  // 将整数转化为二进制字符串返回
  let binary = val.toString(2);
  // 补齐前导0
  while (binary.length < n) {
    binary = "0" + binary;
  }
  return binary;
};
