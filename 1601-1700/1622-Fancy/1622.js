// 1622. 奇妙序列
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 请你实现三个 API append，addAll 和 multAll 来实现奇妙序列。

// 请实现 Fancy 类 ：

// Fancy() 初始化一个空序列对象。
// void append(val) 将整数 val 添加在序列末尾。
// void addAll(inc) 将所有序列中的现有数值都增加 inc 。
// void multAll(m) 将序列中的所有现有数值都乘以整数 m 。
// int getIndex(idx) 得到下标为 idx 处的数值（下标从 0 开始），并将结果对 109 + 7 取余。如果下标大于等于序列的长度，请返回 -1 。

// 示例：

// 输入：
// ["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
// [[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
// 输出：
// [null, null, null, null, null, 10, null, null, null, 26, 34, 20]

// 解释：
// Fancy fancy = new Fancy();
// fancy.append(2);   // 奇妙序列：[2]
// fancy.addAll(3);   // 奇妙序列：[2+3] -> [5]
// fancy.append(7);   // 奇妙序列：[5, 7]
// fancy.multAll(2);  // 奇妙序列：[5*2, 7*2] -> [10, 14]
// fancy.getIndex(0); // 返回 10
// fancy.addAll(3);   // 奇妙序列：[10+3, 14+3] -> [13, 17]
// fancy.append(10);  // 奇妙序列：[13, 17, 10]
// fancy.multAll(2);  // 奇妙序列：[13*2, 17*2, 10*2] -> [26, 34, 20]
// fancy.getIndex(0); // 返回 26
// fancy.getIndex(1); // 返回 34
// fancy.getIndex(2); // 返回 20

// 提示：

// 1 <= val, inc, m <= 100
// 0 <= idx <= 10^5
// 总共最多会有 10^5 次对 append，addAll，multAll 和 getIndex 的调用。
const MOD = 1000000007n;
var Fancy = function () {
  this.v = [];
  this.a = 1n;
  this.b = 0n;
};

// 快速幂
Fancy.prototype.quickMul = function (x, y) {
  let ret = 1n;
  let cur = BigInt(x);
  let power = BigInt(y);
  while (power !== 0n) {
    if ((power & 1n) !== 0n) {
      ret = (ret * cur) % MOD;
    }
    cur = (cur * cur) % MOD;
    power >>= 1n;
  }
  return Number(ret);
};
// 乘法逆元
Fancy.prototype.inv = function (x) {
  return this.quickMul(x, MOD - 2n);
};

/**
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function (val) {
  const adjustedVal =
    (((BigInt(val) - this.b + MOD) % MOD) * BigInt(this.inv(Number(this.a)))) %
    MOD;
  this.v.push(Number(adjustedVal));
};

/**
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function (inc) {
  this.b = (this.b + BigInt(inc)) % MOD;
};

/**
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function (m) {
  this.a = (this.a * BigInt(m)) % MOD;
  this.b = (this.b * BigInt(m)) % MOD;
};

/**
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function (idx) {
  if (idx >= this.v.length) {
    return -1;
  }
  const ans = (((this.a * BigInt(this.v[idx])) % MOD) + this.b) % MOD;
  return Number(ans);
};

/**
 * Your Fancy object will be instantiated and called as such:
 * var obj = new Fancy()
 * obj.append(val)
 * obj.addAll(inc)
 * obj.multAll(m)
 * var param_4 = obj.getIndex(idx)
 */
