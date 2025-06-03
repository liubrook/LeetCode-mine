// 658. 找到 K 个最接近的元素
// 给定一个 排序好 的数组 arr ，两个整数 k 和 x ，从数组中找到最靠近 x（两数之差最小）的 k 个数。返回的结果必须要是按升序排好的。

// 整数 a 比整数 b 更接近 x 需要满足：

// | a - x | < | b - x | 或者
//   | a - x | == | b - x | 且 a < b


// 示例 1：

// 输入：arr = [1, 2, 3, 4, 5], k = 4, x = 3
// 输出：[1, 2, 3, 4]
// 示例 2：

// 输入：arr = [1, 2, 3, 4, 5], k = 4, x = -1
// 输出：[1, 2, 3, 4]


// 提示：

// 1 <= k <= arr.length
// 1 <= arr.length <= 104
// arr 按 升序 排列
//   - 104 <= arr[i], x <= 104


/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let right = binarySearch(arr, x);
  let left = right - 1;
  while (k-- > 0) {
    if (left < 0) {
      right++;
    } else if (right >= arr.length) {
      left--;
    } else if (x - arr[left] <= arr[right] - x) {
      left--;
    } else {
      right++;
    }
  }
  const ans = [];
  for (let i = left + 1; i < right; i++) {
    ans.push(arr[i]);
  }
  return ans;
}

const binarySearch = (arr, x) => {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] >= x) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}