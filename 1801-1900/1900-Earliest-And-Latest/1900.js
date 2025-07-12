// 1900. 最佳运动员的比拼回合
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// n 名运动员参与一场锦标赛，所有运动员站成一排，并根据 最开始的 站位从 1 到 n 编号（运动员 1 是这一排中的第一个运动员，运动员 2 是第二个运动员，依此类推）。

// 锦标赛由多个回合组成（从回合 1 开始）。每一回合中，这一排从前往后数的第 i 名运动员需要与从后往前数的第 i 名运动员比拼，获胜者将会进入下一回合。如果当前回合中运动员数目为奇数，那么中间那位运动员将轮空晋级下一回合。

// 例如，当前回合中，运动员 1, 2, 4, 6, 7 站成一排
// 运动员 1 需要和运动员 7 比拼
// 运动员 2 需要和运动员 6 比拼
// 运动员 4 轮空晋级下一回合
// 每回合结束后，获胜者将会基于最开始分配给他们的原始顺序（升序）重新排成一排。

// 编号为 firstPlayer 和 secondPlayer 的运动员是本场锦标赛中的最佳运动员。在他们开始比拼之前，完全可以战胜任何其他运动员。而任意两个其他运动员进行比拼时，其中任意一个都有获胜的可能，因此你可以 裁定 谁是这一回合的获胜者。

// 给你三个整数 n、firstPlayer 和 secondPlayer 。返回一个由两个值组成的整数数组，分别表示两位最佳运动员在本场锦标赛中比拼的 最早 回合数和 最晚 回合数。



// 示例 1：

// 输入：n = 11, firstPlayer = 2, secondPlayer = 4
// 输出：[3,4]
// 解释：
// 一种能够产生最早回合数的情景是：
// 回合 1：1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
// 回合 2：2, 3, 4, 5, 6, 11
// 回合 3：2, 3, 4
// 一种能够产生最晚回合数的情景是：
// 回合 1：1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
// 回合 2：1, 2, 3, 4, 5, 6
// 回合 3：1, 2, 4
// 回合 4：2, 4
// 示例 2：

// 输入：n = 5, firstPlayer = 1, secondPlayer = 5
// 输出：[1,1]
// 解释：两名最佳运动员 1 和 5 将会在回合 1 进行比拼。
// 不存在使他们在其他回合进行比拼的可能。


// 提示：

// 2 <= n <= 28
// 1 <= firstPlayer < secondPlayer <= n

/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
var earliestAndLatest = function (n, firstPlayer, secondPlayer) {
  F = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () =>
      Array(30).fill(0)));
  G = Array.from({ length: 30 }, () =>
    Array.from({ length: 30 }, () =>
      Array(30).fill(0)));

  const dp = (n, f, s) => {
    if (this.F[n][f][s]) {
      return [F[n][f][s], G[n][f][s]];
    }
    if (f + s === n + 1) {
      return [1, 1];
    }
    // F(n,f,s)=F(n,n+1-s,n+1-f)
    if (f + s > n + 1) {
      const [x, y] = dp(n, n + 1 - s, n + 1 - f);
      F[n][f][s] = x;
      G[n][f][s] = y;
      return [x, y];
    }

    let earlist = Infinity;
    let latest = -Infinity;
    const n_half = Math.floor((n + 1) / 2);
    if (s <= n_half) {
      // 在左侧或者中间
      for (let i = 0; i < f; i++) {
        for (let j = 0; j < s - f; j++) {
          const [x, y] = dp(n_half, i + 1, i + j + 2);
          earlist = Math.min(earlist, x);
          latest = Math.max(latest, y);
        }
      }
    } else {
      // s 在右侧
      const s_prime = n + 1 - s;
      const mid = Math.floor((n - 2 * s_prime + 1) / 2);
      for (let i = 0; i < f; i++) {
        for (let j = 0; j < s_prime - f; j++) {
          const [x, y] = dp(n_half, i + 1, i + j + mid + 2);
          earlist = Math.min(earlist, x);
          latest = Math.max(latest, y);
        }
      }
    }

    F[n][f][s] = earlist + 1;
    G[n][f][s] = latest + 1;
    return [F[n][f][s], G[n][f][s]];
  };

  // F(n,f,s) = F(n,s,f)
  if (firstPlayer > secondPlayer) {
    [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
  }
  const [earlist, latest] = dp(n, firstPlayer, secondPlayer);
  return [earlist, latest];
};