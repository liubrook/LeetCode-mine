// 309. 最佳买卖股票时机含冷冻期
// 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

// 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

// 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
// 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
// 示例:

// 输入: [1,2,3,0,2]
// 输出: 3 
// 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]

// 递归的思路
// 每一天都有三种选择：1、卖出；2、买进；3、休息。（严格的说不准确，因为题目有限制）
// 一个选择是一个分支，形成一个「不完整」的「三叉树」，遍历它，求出所有路径对应的收益，比较出最大
// 用递归，遍历所有节点：时间复杂度 O(3^n)，空间复杂度：递归栈占用的空间：O(n)
// 可以向递归加入记忆化，降低时间复杂度
// DP 状态的选择
// 可以用一个三维数组，i 表示天，j表示是否持有股票，k表示是否是冷冻期
// 也可以用一个二维数组，dp[i][j]：i 表示天，j为 0，1，2：0表示持股，1表示不持股，2表示处于冷冻天
// 也可以用三个一维数组，分别代表第i天，3种选择：卖出、买进、休息，对应的最大收益。
// 也可以按手中是否持有股票，用两个一维数组，分别代表第 i 天，持有 / 没持有 的最大收益
// 也就是说，在选择DP状态的定义时，可以尝试着降维。

// 状态转移
// hold[i] : 在第 i 天的结束时，手中持有股票，此时的最大收益
// 分为两种情况：今天休息或者买了股票
// 可能是昨天持有了，今天休息，也可能是前天卖了，今天买的
// hold[i] = Math.max(hold[i - 1], unhold[i - 2] - prices[i])
// unhold[i] : 第 i 天的结束时，手中没有股票，此时的最大收益
// 分为两种情况：今天休息或者卖了股票
// 可能是昨天也没持有，今天休息，也可能是昨天持有，今天卖了
// unhold[i] = Math.max(unhold[i - 1], hold[i - 1] + prices[i])
// 目标是求 unhold[n-1] ( n：0 1 2 3 ... )
// base case
// hold[0] = -prices[0] 第0天买股票，收益-prices[0]元
// hold[1] = Math.max(-prices[0], -prices[1]) 第1天持有着股票，可能是昨天买的，今天休息，也可能是昨天休息，今天买的
// unhold[0] = 0 第0天没有持有股票，就是休息，收益 0 元
// 代码
// 时间复杂度：两个dp数组发生状态转移，花费 O(2n) ，总的来说是 O(n)

const maxProfit = (prices) => {
    const n = prices.length; // n天
    if (n === 0) return 0;
    let hold = new Array(n); // 第i天持有股票的最大收益
    let unhold = new Array(n); // 第i天不持有股票的最大收益
    hold[0] = -prices[0]; // 第0天 买了股票的收益
    unhold[0] = 0;
    for (let i = 1; i < n; i++) {
        if (n === 1) {
            hold[i] = Math.max(hold[i - 1], -prices[1]);
        } else {
            hold[i] = Math.max(hold[i - 1], unhold[i - 2] - prices[i]);
        }
        unhold[i] = Math.max(unhold[i - 1], hold[i - 1] + prices[i]);
    }
    return unhold[n -1];
}

const maxProfit2 = (prices) => {
    let rest = 0;
    let sold = 0;
    let hold = -Infinity; // 还没买入
    for (let price of prices) {
        let preSold = sold;
        let preHold = hold;
        hold = Math.max(preHold, rest - price);
        sold = preHold + price;
        rest = Math.max(rest, preSold);
    }
    return Math.max(rest, sold);
}