// 756. 金字塔转换矩阵
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 你正在把积木堆成金字塔。每个块都有一个颜色，用一个字母表示。每一行的块比它下面的行 少一个块 ，并且居中。

// 为了使金字塔美观，只有特定的 三角形图案 是允许的。一个三角形的图案由 两个块 和叠在上面的 单个块 组成。模式是以三个字母字符串的列表形式 allowed 给出的，其中模式的前两个字符分别表示左右底部块，第三个字符表示顶部块。

// 例如，"ABC" 表示一个三角形图案，其中一个 “C” 块堆叠在一个 'A' 块(左)和一个 'B' 块(右)之上。请注意，这与 "BAC" 不同，"B" 在左下角，"A" 在右下角。
// 你从作为单个字符串给出的底部的一排积木 bottom 开始，必须 将其作为金字塔的底部。

// 在给定 bottom 和 allowed 的情况下，如果你能一直构建到金字塔顶部，使金字塔中的 每个三角形图案 都是在 allowed 中的，则返回 true ，否则返回 false 。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/08/26/pyramid1-grid.jpg

// 输入：bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
// 输出：true
// 解释：允许的三角形图案显示在右边。
// 从最底层(第 3 层)开始，我们可以在第 2 层构建“CE”，然后在第 1 层构建“E”。
// 金字塔中有三种三角形图案，分别是 “BCC”、“CDE” 和 “CEA”。都是允许的。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/08/26/pyramid2-grid.jpg

// 输入：bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
// 输出：false
// 解释：允许的三角形图案显示在右边。
// 从最底层(即第 4 层)开始，创造第 3 层有多种方法，但如果尝试所有可能性，你便会在创造第 1 层前陷入困境。

// 提示：

// 2 <= bottom.length <= 6
// 0 <= allowed.length <= 216
// allowed[i].length == 3
// 所有输入字符串中的字母来自集合 {'A', 'B', 'C', 'D', 'E', 'F'}。
//  allowed 中所有值都是 唯一的
/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
  // 构建转换表，T[i][j] 表示底部为i和j时，顶部可能的字符位掩码
  const T = Array.from({ length: 7 }, () => new Array(7).fill(0));
  for (const a of allowed) {
    const left = a.charCodeAt(0) - "A".charCodeAt(0);
    const right = a.charCodeAt(1) - "A".charCodeAt(0);
    const top = a.charCodeAt(2) - "A".charCodeAt(0);
    T[left][right] |= 1 << top;
  }

  const seen = new Set();
  const N = bottom.length;
  // 金字塔状态数组
  const A = Array.from({ length: N }, () => new Array(N).fill(0));
  // 初始化底部行
  for (let i = 0; i < N; i++) {
    A[N - 1][i] = bottom.charCodeAt(i) - "A".charCodeAt(0);
  }

  /**
   * 递归解决金字塔构建问题
   * @param {number} R 当前行的状态编码（用于记忆化）
   * @param {number} N 当前处理的行号
   * @param {number} i 当前行中的位置索引
   * @return {boolean} 是否可以成功构建金字塔
   */
  const solve = (R, N, i) => {
    // 基本情况：成功构建到金字塔顶部
    if (N === 1 && i === 1) {
      return true;
    } else if (i === N) {
      // 当前行处理完成，准备处理下一行
      // 记忆化检查：如果已经处理过相同的行状态，直接返回失败
      if (seen.has(R)) {
        return false;
      }
      // 记录当前行状态
      seen.add(R);
      // 递归处理下一行
      return solve(0, N - 1, 0);
    } else {
      // 处理当前行的当前位置
      // 获取当前两个底部块对应的可能顶部块位掩码
      const w = T[A[N][i]][A[N][i + 1]];
      // 遍历所有可能的顶部块
      for (let b = 0; b < 7; b++) {
        if ((w >> b) & 1) {
          // 设置顶部块
          A[N - 1][i] = b;
          // 递归处理下一个位置，更新状态编码
          // 使用base-8编码来记录当前行的状态
          if (solve(R * 8 + (b + 1), N, i + 1)) {
            return true;
          }
        }
      }
      return false;
    }
  };

  return solve(0, N - 1, 0);
};
