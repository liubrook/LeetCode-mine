// 1036. 逃离大迷宫
// 在一个 106 x 106 的网格中，每个网格上方格的坐标为(x, y) 。

// 现在从源方格 source = [sx, sy] 开始出发，意图赶往目标方格 target = [tx, ty] 。数组 blocked 是封锁的方格列表，其中每个 blocked[i] = [xi, yi] 表示坐标为(xi, yi) 的方格是禁止通行的。

// 每次移动，都可以走到网格中在四个方向上相邻的方格，只要该方格 不 在给出的封锁列表 blocked 上。同时，不允许走出网格。

// 只有在可以通过一系列的移动从源方格 source 到达目标方格 target 时才返回 true。否则，返回 false。



// 示例 1：

// 输入：blocked = [[0, 1], [1, 0]], source = [0, 0], target = [0, 2]
// 输出：false
// 解释：
// 从源方格无法到达目标方格，因为我们无法在网格中移动。
// 无法向北或者向东移动是因为方格禁止通行。
// 无法向南或者向西移动是因为不能走出网格。
// 示例 2：

// 输入：blocked = [], source = [0, 0], target = [999999, 999999]
// 输出：true
// 解释：
// 因为没有方格被封锁，所以一定可以到达目标方格。


// 提示：

// 0 <= blocked.length <= 200
// blocked[i].length == 2
// 0 <= xi, yi < 106
// source.length == target.length == 2
// 0 <= sx, sy, tx, ty < 106
// source != target
// 题目数据保证 source 和 target 不在封锁列表内

/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
// 在包围圈中
const BLOCKED = -1;
// 不在包围圈中
const VALID = 0;
// 无论在不在包围圈中，但在 n(n-1)/2 步搜索的过程中经过了 target
const FOUND = 1;

const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
const BOUNDARY = 1000000;

var isEscapePossible = function (blocked, source, target) {
  if (blocked.length < 2) {
    return true;
  }

  const hashBlocked = new Set();
  for (const pos of blocked) {
    hashBlocked.add([pos[0], pos[1]].toString());
  }

  let result = check(blocked, source, target, hashBlocked);
  if (result === FOUND) {
    return true;
  } else if (result === BLOCKED) {
    return false;
  } else {
    result = check(blocked, target, source, hashBlocked);
    return result !== BLOCKED;
  }
};

const check = (blocked, start, finish, hashBlocked) => {
  const sx = start[0], sy = start[1];
  const fx = finish[0], fy = finish[1];
  let countdown = Math.floor(blocked.length * (blocked.length - 1) / 2);
  const startPair = [sx, sy];
  const queue = [];
  queue.push(startPair);
  const visited = new Set();
  visited.add(startPair.toString());
  while (queue.length && countdown > 0) {
    const [x, y] = queue.shift();
    for (let d = 0; d < 4; ++d) {
      const nx = x + dirs[d][0], ny = y + dirs[d][1];
      const newPair = [nx, ny];
      if (nx >= 0 && nx < BOUNDARY && ny >= 0 && ny < BOUNDARY && !hashBlocked.has(newPair.toString()) && !visited.has(newPair.toString())) {
        if (nx === fx && ny === fy) {
          return FOUND;
        }
        --countdown;
        queue.push(newPair);
        visited.add(newPair.toString());
      }
    }
  }
  if (countdown > 0) {
    return BLOCKED;
  }
  return VALID;
}