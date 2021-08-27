// 295. 数据流的中位数
// 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

// 例如，

// [2, 3, 4] 的中位数是 3

// [2, 3] 的中位数是(2 + 3) / 2 = 2.5

// 设计一个支持以下两种操作的数据结构：

// void addNum(int num) - 从数据流中添加一个整数到数据结构中。
// double findMedian() - 返回目前所有元素的中位数。
// 示例：

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3)
// findMedian() -> 2
// 进阶:

// 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
// 如果数据流中 99 % 的整数都在 0 到 100 范围内，你将如何优化你的算法？

/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
  this.data = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (!this.data.length) {
    this.data.push(num);
    return;
  }

  let left = 0, right = this.data.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (this.data[mid] === num) {
      this.data.splice(mid, 0, num);
      return;
    } else if (this.data[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  this.data.splice(right + 1, 0, num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const length = this.data.length;
  if (!length) {
    return null;
  }

  const mid = Math.floor((length - 1) / 2);
  if (length % 2) {
    return this.data[mid]
  }
  return (this.data[mid] + this.data[mid + 1]) / 2;
};