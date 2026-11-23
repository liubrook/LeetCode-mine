// 1352. 最后 K 个数的乘积
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 设计一个算法，该算法接受一个整数流并检索该流中最后 k 个整数的乘积。

// 实现 ProductOfNumbers 类：

// ProductOfNumbers() 用一个空的流初始化对象。
// void add(int num) 将数字 num 添加到当前数字列表的最后面。
// int getProduct(int k) 返回当前数字列表中，最后 k 个数字的乘积。你可以假设当前列表中始终 至少 包含 k 个数字。
// 题目数据保证：任何时候，任一连续数字序列的乘积都在 32 位整数范围内，不会溢出。

// 示例：

// 输入：
// ["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
// [[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]

// 输出：
// [null,null,null,null,null,null,20,40,0,null,32]

// 解释：
// ProductOfNumbers productOfNumbers = new ProductOfNumbers();
// productOfNumbers.add(3);        // [3]
// productOfNumbers.add(0);        // [3,0]
// productOfNumbers.add(2);        // [3,0,2]
// productOfNumbers.add(5);        // [3,0,2,5]
// productOfNumbers.add(4);        // [3,0,2,5,4]
// productOfNumbers.getProduct(2); // 返回 20 。最后 2 个数字的乘积是 5 * 4 = 20
// productOfNumbers.getProduct(3); // 返回 40 。最后 3 个数字的乘积是 2 * 5 * 4 = 40
// productOfNumbers.getProduct(4); // 返回  0 。最后 4 个数字的乘积是 0 * 2 * 5 * 4 = 0
// productOfNumbers.add(8);        // [3,0,2,5,4,8]
// productOfNumbers.getProduct(2); // 返回 32 。最后 2 个数字的乘积是 4 * 8 = 32

// 提示：

// 0 <= num <= 100
// 1 <= k <= 4 * 10^4
// add 和 getProduct 最多被调用 4 * 10^4 次。
// 在任何时间点流的乘积都在 32 位整数范围内。

var ProductOfNumbers = function () {
  this.nums = [];
  this.zeroCount = [];
  this.prevNonOne = [];
  this.n = 0;
};

/**
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function (num) {
  this.n++;
  this.nums.push(num);

  this.prevNonOne.push(-1);
  if (this.n > 1) {
    if (this.nums[this.n - 2] !== 1 && this.nums[this.n - 2] !== 0) {
      this.prevNonOne[this.n - 1] = this.n - 2;
    } else {
      this.prevNonOne[this.n - 1] = this.prevNonOne[this.n - 2];
    }
  }

  this.zeroCount.push(num === 0 ? 1 : 0);
  if (this.n > 1) {
    this.zeroCount[this.n - 1] += this.zeroCount[this.n - 2];
  }
};

/**
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function (k) {
  let totalZeros = this.zeroCount[this.n - 1];
  if (this.n - k >= 1) {
    totalZeros -= this.zeroCount[this.n - 1 - k];
  }
  if (totalZeros > 0) {
    return 0;
  }

  let ans = 1;
  for (let i = this.n - 1; i >= this.n - k; ) {
    ans *= this.nums[i];
    i = this.prevNonOne[i];
  }
  return ans;
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */
