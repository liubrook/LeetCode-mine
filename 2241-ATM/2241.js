// 2241. 设计一个 ATM 机器
// 中等
// 相关标签
// 相关企业
// 提示
// 一个 ATM 机器，存有 5 种面值的钞票：20 ，50 ，100 ，200 和 500 美元。初始时，ATM 机是空的。用户可以用它存或者取任意数目的钱。

// 取款时，机器会优先取 较大 数额的钱。

// 比方说，你想取 $300 ，并且机器里有 2 张 $50 的钞票，1 张 $100 的钞票和1 张 $200 的钞票，那么机器会取出 $100 和 $200 的钞票。
// 但是，如果你想取 $600 ，机器里有 3 张 $200 的钞票和1 张 $500 的钞票，那么取款请求会被拒绝，因为机器会先取出 $500 的钞票，然后无法取出剩余的 $100 。注意，因为有 $500 钞票的存在，机器 不能 取 $200 的钞票。
// 请你实现 ATM 类：

// ATM() 初始化 ATM 对象。
// void deposit(int[] banknotesCount) 分别存入 $20 ，$50，$100，$200 和 $500 钞票的数目。
// int[] withdraw(int amount) 返回一个长度为 5 的数组，分别表示 $20 ，$50，$100 ，$200 和 $500 钞票的数目，并且更新 ATM 机里取款后钞票的剩余数量。如果无法取出指定数额的钱，请返回[-1] （这种情况下 不 取出任何钞票）。


// 示例 1：

// 输入：
// ["ATM", "deposit", "withdraw", "deposit", "withdraw", "withdraw"]
// [[], [[0, 0, 1, 2, 1]], [600], [[0, 1, 0, 1, 1]], [600], [550]]
// 输出：
// [null, null, [0, 0, 1, 0, 1], null, [-1], [0, 1, 0, 0, 1]]

// 解释：
// ATM atm = new ATM();
// atm.deposit([0, 0, 1, 2, 1]); // 存入 1 张 $100 ，2 张 $200 和 1 张 $500 的钞票。
// atm.withdraw(600);        // 返回 [0,0,1,0,1] 。机器返回 1 张 $100 和 1 张 $500 的钞票。机器里剩余钞票的数量为 [0,0,0,2,0] 。
// atm.deposit([0, 1, 0, 1, 1]); // 存入 1 张 $50 ，1 张 $200 和 1 张 $500 的钞票。
// // 机器中剩余钞票数量为 [0,1,0,3,1] 。
// atm.withdraw(600);        // 返回 [-1] 。机器会尝试取出 $500 的钞票，然后无法得到剩余的 $100 ，所以取款请求会被拒绝。
// // 由于请求被拒绝，机器中钞票的数量不会发生改变。
// atm.withdraw(550);        // 返回 [0,1,0,0,1] ，机器会返回 1 张 $50 的钞票和 1 张 $500 的钞票。


// 提示：

// banknotesCount.length == 5
// 0 <= banknotesCount[i] <= 10^9
// 1 <= amount <= 10^9
// 总共 最多有 5000 次 withdraw 和 deposit 的调用。
// 函数 withdraw 和 deposit 至少各有 一次 调用。


var ATM = function () {
  this.cnt = [0, 0, 0, 0, 0]; // 每张钞票剩余数量
  this.value = [20, 50, 100, 200, 500]; // 每张钞票面额
};

/** 
 * @param {number[]} banknotesCount
 * @return {void}
 */
ATM.prototype.deposit = function (banknotesCount) {
  for (let i = 0; i < 5; ++i) {
    this.cnt[i] += banknotesCount[i];
  }
};

/** 
 * @param {number} amount
 * @return {number[]}
 */
ATM.prototype.withdraw = function (amount) {
  let res = new Array(5).fill(0);
  // 模拟尝试取出钞票的过程
  for (let i = 4; i >= 0; --i) {
    res[i] = Math.min(this.cnt[i], Math.floor(amount / this.value[i]));
    amount -= res[i] * this.value[i];
  }
  if (amount > 0) {
    // 无法完成该操作
    return [-1];
  } else {
    // 可以完成该操作
    for (let i = 0; i < 5; ++i) {
      this.cnt[i] -= res[i];
    }
    return res;
  }
};

/** 
 * Your ATM object will be instantiated and called as such:
 * var obj = new ATM()
 * obj.deposit(banknotesCount)
 * var param_2 = obj.withdraw(amount)
 */