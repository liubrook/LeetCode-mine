// 1728. 猫和老鼠 II
// 一只猫和一只老鼠在玩一个叫做猫和老鼠的游戏。

// 它们所处的环境设定是一个 rows x cols 的方格 grid ，其中每个格子可能是一堵墙、一块地板、一位玩家（猫或者老鼠）或者食物。

// 玩家由字符 'C' （代表猫）和 'M' （代表老鼠）表示。
// 地板由字符 '.' 表示，玩家可以通过这个格子。
// 墙用字符 '#' 表示，玩家不能通过这个格子。
// 食物用字符 'F' 表示，玩家可以通过这个格子。
// 字符 'C' ， 'M' 和 'F' 在 grid 中都只会出现一次。
// 猫和老鼠按照如下规则移动：

// 老鼠 先移动 ，然后两名玩家轮流移动。
// 每一次操作时，猫和老鼠可以跳到上下左右四个方向之一的格子，他们不能跳过墙也不能跳出 grid 。
// catJump 和 mouseJump 是猫和老鼠分别跳一次能到达的最远距离，它们也可以跳小于最大距离的长度。
// 它们可以停留在原地。
// 老鼠可以跳跃过猫的位置。
// 游戏有 4 种方式会结束：

// 如果猫跟老鼠处在相同的位置，那么猫获胜。
// 如果猫先到达食物，那么猫获胜。
// 如果老鼠先到达食物，那么老鼠获胜。
// 如果老鼠不能在 1000 次操作以内到达食物，那么猫获胜。
// 给你 rows x cols 的矩阵 grid 和两个整数 catJump 和 mouseJump ，双方都采取最优策略，如果老鼠获胜，那么请你返回 true ，否则返回 false 。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/17/sample_111_1955.png

// 输入：grid = ["####F", "#C...", "M...."], catJump = 1, mouseJump = 2
// 输出：true
// 解释：猫无法抓到老鼠，也没法比老鼠先到达食物。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/17/sample_2_1955.png

// 输入：grid = ["M.C...F"], catJump = 1, mouseJump = 4
// 输出：true
// 示例 3：

// 输入：grid = ["M.C...F"], catJump = 1, mouseJump = 3
// 输出：false
// 示例 4：

// 输入：grid = ["C...#", "...#F", "....#", "M...."], catJump = 2, mouseJump = 5
// 输出：false
// 示例 5：

// 输入：grid = [".M...", "..#..", "#..#.", "C#.#.", "...#F"], catJump = 3, mouseJump = 1
// 输出：true


// 提示：

// rows == grid.length
// cols = grid[i].length
// 1 <= rows, cols <= 8
// grid[i][j] 只包含字符 'C' ，'M' ，'F' ，'.' 和 '#' 。
// grid 中只包含一个 'C' ，'M' 和 'F' 。
// 1 <= catJump, mouseJump <= 8

/**
 * @param {string[]} grid
 * @param {number} catJump
 * @param {number} mouseJump
 * @return {boolean}
 */
const MOUSE_TURN = 0, CAT_TURN = 1;
const UNKNOWN = 0, MOUSE_WIN = 1, CAT_WIN = 2;
const MAX_MOVES = 1000;
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var canMouseWin = function (grid, catJump, mouseJump) {
  this.rows = grid.length;
  this.cols = grid[0].length;
  let startMouse = -1, startCat = -1;

  const getPos = (row, col) => {
    return row * this.cols + col;
  };

  const getPrevStates = (mouse, cat, turn) => {
    const prevStates = [];
    const mouseRow = Math.floor(mouse / this.cols), mouseCol = mouse % this.cols;
    const catRow = Math.floor(cat / this.cols), catCol = cat % this.cols;
    const prevTurn = turn === MOUSE_TURN ? CAT_TURN : MOUSE_TURN;
    const maxJump = prevTurn === MOUSE_TURN ? mouseJump : catJump;
    const startRow = prevTurn === MOUSE_TURN ? mouseRow : catRow;
    const startCol = prevTurn === MOUSE_TURN ? mouseCol : catCol;
    prevStates.push([mouse, cat, prevTurn]);
    for (const dir of dirs) {
      for (let i = startRow + dir[0], j = startCol + dir[1], jump = 1; i >= 0 && i < rows && j >= 0 && j < this.cols && grid[i].charAt(j) !== '#' && jump <= maxJump; i += dir[0], j += dir[1], jump++) {
        const prevMouseRow = prevTurn === MOUSE_TURN ? i : mouseRow;
        const prevMouseCol = prevTurn === MOUSE_TURN ? j : mouseCol;
        const prevCatRow = prevTurn === MOUSE_TURN ? catRow : i;
        const prevCatCol = prevTurn === MOUSE_TURN ? catCol : j;
        const prevMouse = getPos(prevMouseRow, prevMouseCol);
        const prevCat = getPos(prevCatRow, prevCatCol);
        prevStates.push([prevMouse, prevCat, prevTurn]);
      }
    }
    return prevStates;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      const c = grid[i][j];
      if (c === 'M') {
        startMouse = getPos(i, j);
      } else if (c === 'C') {
        startCat = getPos(i, j);
      } else if (c === 'F') {
        food = getPos(i, j);
      }
    }
  }
  const total = rows * this.cols;
  const degrees = new Array(total).fill(0).map(() => new Array(total).fill(0).map(() => new Array(2).fill(0)));
  const results = new Array(total).fill(0).map(() => new Array(total).fill(0).map(() => new Array(2).fill(0).map(() => new Array(2).fill(0))));
  const queue = [];
  // 计算每个状态的度
  for (let mouse = 0; mouse < total; mouse++) {
    let mouseRow = Math.floor(mouse / this.cols), mouseCol = mouse % this.cols;
    if (grid[mouseRow][mouseCol] === '#') {
      continue;
    }
    for (let cat = 0; cat < total; cat++) {
      let catRow = Math.floor(cat / this.cols), catCol = cat % this.cols;
      if (grid[catRow][catCol] === '#') {
        continue;
      }
      degrees[mouse][cat][MOUSE_TURN]++;
      degrees[mouse][cat][CAT_TURN]++;
      for (const dir of dirs) {
        for (let row = mouseRow + dir[0], col = mouseCol + dir[1], jump = 1; row >= 0 && row < rows && col >= 0 && col < this.cols && grid[row][col] !== '#' && jump <= mouseJump; row += dir[0], col += dir[1], jump++) {
          const nextMouse = getPos(row, col), nextCat = getPos(catRow, catCol);
          degrees[nextMouse][nextCat][MOUSE_TURN]++;
        }
        for (let row = catRow + dir[0], col = catCol + dir[1], jump = 1; row >= 0 && row < rows && col >= 0 && col < this.cols && grid[row][col] !== '#' && jump <= catJump; row += dir[0], col += dir[1], jump++) {
          const nextMouse = getPos(mouseRow, mouseCol), nextCat = getPos(row, col);
          degrees[nextMouse][nextCat][CAT_TURN]++;
        }
      }
    }
  }
  // 猫和老鼠在同一个单元格，猫获胜
  for (let pos = 0; pos < total; pos++) {
    const row = Math.floor(pos / this.cols), col = pos % this.cols;
    if (grid[row][col] === '#') {
      continue;
    }
    results[pos][pos][MOUSE_TURN][0] = CAT_WIN;
    results[pos][pos][MOUSE_TURN][1] = 0;
    results[pos][pos][CAT_TURN][0] = CAT_WIN;
    results[pos][pos][CAT_TURN][1] = 0;
    queue.push([pos, pos, MOUSE_TURN]);
    queue.push([pos, pos, CAT_TURN]);
  }
  // 猫和食物在同一个单元格，猫获胜
  for (let mouse = 0; mouse < total; mouse++) {
    const mouseRow = Math.floor(mouse / this.cols), mouseCol = mouse % this.cols;
    if (grid[mouseRow][mouseCol] === '#' || mouse === food) {
      continue;
    }
    results[mouse][food][MOUSE_TURN][0] = CAT_WIN;
    results[mouse][food][MOUSE_TURN][1] = 0;
    results[mouse][food][CAT_TURN][0] = CAT_WIN;
    results[mouse][food][CAT_TURN][1] = 0;
    queue.push([mouse, food, MOUSE_TURN]);
    queue.push([mouse, food, CAT_TURN]);
  }
  // 老鼠和食物在同一个单元格且猫和食物不在同一个单元格，老鼠获胜
  for (let cat = 0; cat < total; cat++) {
    const catRow = Math.floor(cat / this.cols), catCol = cat % this.cols;
    if (grid[catRow][catCol] === '#' || cat === food) {
      continue;
    }
    results[food][cat][MOUSE_TURN][0] = MOUSE_WIN;
    results[food][cat][MOUSE_TURN][1] = 0;
    results[food][cat][CAT_TURN][0] = MOUSE_WIN;
    results[food][cat][CAT_TURN][1] = 0;
    queue.push([food, cat, MOUSE_TURN]);
    queue.push([food, cat, CAT_TURN]);
  }
  // 拓扑排序
  while (queue.length) {
    const state = queue.shift();
    const mouse = state[0], cat = state[1], turn = state[2];
    const result = results[mouse][cat][turn][0];
    const moves = results[mouse][cat][turn][1];
    const prevStates = getPrevStates(mouse, cat, turn);
    for (const prevState of prevStates) {
      const prevMouse = prevState[0], prevCat = prevState[1], prevTurn = prevState[2];
      if (results[prevMouse][prevCat][prevTurn][0] === UNKNOWN) {
        const canWin = (result === MOUSE_WIN && prevTurn === MOUSE_TURN) || (result === CAT_WIN && prevTurn === CAT_TURN);
        if (canWin) {
          results[prevMouse][prevCat][prevTurn][0] = result;
          results[prevMouse][prevCat][prevTurn][1] = moves + 1;
          queue.push([prevMouse, prevCat, prevTurn]);
        } else {
          degrees[prevMouse][prevCat][prevTurn]--;
          if (degrees[prevMouse][prevCat][prevTurn] === 0) {
            const loseResult = prevTurn === MOUSE_TURN ? CAT_WIN : MOUSE_WIN;
            results[prevMouse][prevCat][prevTurn][0] = loseResult;
            results[prevMouse][prevCat][prevTurn][1] = moves + 1;
            queue.push([prevMouse, prevCat, prevTurn]);
          }
        }
      }
    }
  }

  return results[startMouse][startCat][MOUSE_TURN][0] === MOUSE_WIN && results[startMouse][startCat][MOUSE_TURN][1] <= MAX_MOVES;
}