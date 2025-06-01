// 210. 课程表 II
// 提示
// 中等
// 846
// 相关企业
// 现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。

// 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0, 1] 。
// 返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。



// 示例 1：

// 输入：numCourses = 2, prerequisites = [[1, 0]]
// 输出：[0, 1]
// 解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为[0, 1] 。
// 示例 2：

// 输入：numCourses = 4, prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
// 输出：[0, 2, 1, 3]
// 解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
// 因此，一个正确的课程顺序是[0, 1, 2, 3] 。另一个正确的排序是[0, 2, 1, 3] 。
// 示例 3：

// 输入：numCourses = 1, prerequisites = []
// 输出：[0]


// 提示：
// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= numCourses * (numCourses - 1)
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// ai != bi
// 所有[ai, bi] 互不相同

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  let inDegree = new Array(numCourses).fill(0) // 初始化入度数组
  let graph = {} // 哈希表
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++ // 构建入度数组
    if (graph[prerequisites[i][1]]) { // 构建哈希表
      graph[prerequisites[i][1]].push(prerequisites[i][0])
    } else {
      let list = []
      list.push(prerequisites[i][0])
      graph[prerequisites[i][1]] = list
    }
  }
  let res = [] // 结果数组
  let queue = [] // 存放 入度为0的课
  for (let i = 0; i < numCourses; i++) { // 起初推入所有入度为0的课
    if (inDegree[i] === 0) queue.push(i)
  }
  while (queue.length) { // 没有了入度为0的课，没课可选，结束循环
    let cur = queue.shift() // 出栈，代表选这门课
    res.push(cur) // 推入结果数组
    let toEnQueue = graph[cur] // 查看哈希表，获取对应的后续课程
    if (toEnQueue && toEnQueue.length) { // 确保有后续课程
      for (let i = 0; i < toEnQueue.length; i++) { // 遍历后续课程
        inDegree[toEnQueue[i]]-- // 将后续课程的入度 -1
        if (inDegree[toEnQueue[i]] == 0) { // 一旦减到0，让该课入列
          queue.push(toEnQueue[i])
        }
      }
    }
  }
  return res.length === numCourses ? res : [] // 选齐了就返回res，否则返回[]
};