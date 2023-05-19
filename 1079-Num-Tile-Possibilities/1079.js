// 1079. 活字印刷
// 你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。

// 注意：本题中，每个活字字模只能使用一次。



// 示例 1：

// 输入："AAB"
// 输出：8
// 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
// 示例 2：

// 输入："AAABBC"
// 输出：188
// 示例 3：

// 输入："V"
// 输出：1


// 提示：

// 1 <= tiles.length <= 7
// tiles 由大写英文字母组成


/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {
  const count = new Map()
  for (let t of tiles) {
    count.set(t, (count.get(t) || 0) + 1)
  }
  const tile = new Set(tiles)
  const n = tiles.length

  function dfs(i) {
    if (i == n) {
      return 1
    }
    let res = 1
    for (let t of tile) {
      if (count.get(t) > 0) {
        count.set(t, count.get(t) - 1)
        res += dfs(i + 1)
        count.set(t, count.get(t) + 1)
      }
    }
    return res
  }

  return dfs(0) - 1
};