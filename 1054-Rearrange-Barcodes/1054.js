// 1054. 距离相等的条形码
// 在一个仓库里，有一排条形码，其中第 i 个条形码为 barcodes[i]。

// 请你重新排列这些条形码，使其中任意两个相邻的条形码不能相等。 你可以返回任何满足该要求的答案，此题保证存在答案。



// 示例 1：

// 输入：barcodes = [1, 1, 1, 2, 2, 2]
// 输出：[2, 1, 2, 1, 2, 1]
// 示例 2：

// 输入：barcodes = [1, 1, 1, 1, 2, 2, 3, 3]
// 输出：[1, 3, 1, 3, 2, 1, 2, 1]


// 提示：

// 1 <= barcodes.length <= 10000
// 1 <= barcodes[i] <= 10000

/**
 * @param {number[]} barcodes
 * @return {number[]}
 */
var rearrangeBarcodes = function (barcodes) {
  const length = barcodes.length;
  if (length < 2) {
    return barcodes;
  }

  const counts = new Map();
  let maxCount = 0;
  for (const b of barcodes) {
    counts.set(b, (counts.get(b) || 0) + 1);
    maxCount = Math.max(maxCount, counts.get(b));
  }

  let evenIndex = 0;
  let oddIndex = 1;
  let halfLength = Math.floor(length / 2);
  const res = _.fill(Array(length), 0);
  for (let [x, count] of counts.entries()) {
    while (count > 0 && count <= halfLength && oddIndex < length) {
      res[oddIndex] = x;
      count--;
      oddIndex += 2;
    }
    while (count > 0) {
      res[evenIndex] = x;
      count--;
      evenIndex += 2;
    }
  }
  return res;
};