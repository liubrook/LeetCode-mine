// 2094. 找出 3 位偶数
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 digits ，其中每个元素是一个数字（0 - 9）。数组中可能存在重复元素。

// 你需要找出 所有 满足下述条件且 互不相同 的整数：

// 该整数由 digits 中的三个元素按 任意 顺序 依次连接 组成。
// 该整数不含 前导零
// 该整数是一个 偶数
// 例如，给定的 digits 是[1, 2, 3] ，整数 132 和 312 满足上面列出的全部条件。

// 将找出的所有互不相同的整数按 递增顺序 排列，并以数组形式返回。



// 示例 1：

// 输入：digits = [2, 1, 3, 0]
// 输出：[102, 120, 130, 132, 210, 230, 302, 310, 312, 320]
// 解释：
// 所有满足题目条件的整数都在输出数组中列出。
// 注意，答案数组中不含有 奇数 或带 前导零 的整数。
// 示例 2：

// 输入：digits = [2, 2, 8, 8, 2]
// 输出：[222, 228, 282, 288, 822, 828, 882]
// 解释：
// 同样的数字（0 - 9）在构造整数时可以重复多次，重复次数最多与其在 digits 中出现的次数一样。
// 在这个例子中，数字 8 在构造 288、828 和 882 时都重复了两次。 
// 示例 3：

// 输入：digits = [3, 7, 5]
// 输出：[]
// 解释：
// 使用给定的 digits 无法构造偶数。


// 提示：

// 3 <= digits.length <= 100
// 0 <= digits[i] <= 9

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
  const res = [];
  const freq = new Map();
  // 统计数字数组中各数字的出现次数
  for (const d of digits) {
    freq.set(d, (freq.get(d) || 0) + 1);
  }
  // 枚举所有三位偶数
  for (let i = 100; i < 1000; i += 2) {
    const freq1 = new Map();
    let num = i;
    // 统计当前偶数的每一位数字的出现次数
    while (num > 0) {
      const d = num % 10;
      freq1.set(d, (freq1.get(d) || 0) + 1);
      num = Math.floor(num / 10);
    }
    // 检查是否满足条件
    let isValid = true;
    for (const [d, count] of freq1.entries()) {
      if ((freq.get(d) || 0) < count) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      res.push(i);
    }
  }
  return res;
};