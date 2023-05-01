// 1376. 通知所有员工所需的时间
// 公司里有 n 名员工，每个员工的 ID 都是独一无二的，编号从 0 到 n - 1。公司的总负责人通过 headID 进行标识。

// 在 manager 数组中，每个员工都有一个直属负责人，其中 manager[i] 是第 i 名员工的直属负责人。对于总负责人，manager[headID] = -1。题目保证从属关系可以用树结构显示。

// 公司总负责人想要向公司所有员工通告一条紧急消息。他将会首先通知他的直属下属们，然后由这些下属通知他们的下属，直到所有的员工都得知这条紧急消息。

// 第 i 名员工需要 informTime[i] 分钟来通知它的所有直属下属（也就是说在 informTime[i] 分钟后，他的所有直属下属都可以开始传播这一消息）。

// 返回通知所有员工这一紧急消息所需要的 分钟数 。



// 示例 1：

// 输入：n = 1, headID = 0, manager = [-1], informTime = [0]
// 输出：0
// 解释：公司总负责人是该公司的唯一一名员工。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/03/08/graph.png

// 输入：n = 6, headID = 2, manager = [2, 2, -1, 2, 2, 2], informTime = [0, 0, 1, 0, 0, 0]
// 输出：1
// 解释：id = 2 的员工是公司的总负责人，也是其他所有员工的直属负责人，他需要 1 分钟来通知所有员工。
// 上图显示了公司员工的树结构。


// 提示：

// 1 <= n <= 10 ^ 5
// 0 <= headID < n
// manager.length == n
// 0 <= manager[i] < n
// manager[headID] == -1
// informTime.length == n
// 0 <= informTime[i] <= 1000
// 如果员工 i 没有下属，informTime[i] == 0 。
// 题目 保证 所有员工都可以收到通知。


/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  // 构建树的邻接表，使用 Map 存储
  const g = new Map();

  // 定义深度优先遍历函数
  const dfs = (cur, informTime, g) => {
    // res 存储当前节点的所有下属中，最大的通知时间
    let res = 0;

    // 遍历当前节点的每个下属
    for (const neighbor of g.get(cur) || []) {
      // 递归计算下属的通知时间，并更新 res
      res = Math.max(res, dfs(neighbor, informTime, g));
    }

    // 返回当前节点的通知时间（加上下属中最大的通知时间）
    return informTime[cur] + res;
  };

  // 遍历每个员工，将其加入其直接负责人的下属列表
  for (let i = 0; i < n; i++) {
    if (!g.has(manager[i])) {
      g.set(manager[i], []);
    }
    g.get(manager[i]).push(i);
  }

  // 从总负责人开始遍历整棵树，并计算总通知时间
  return dfs(headID, informTime, g);
};