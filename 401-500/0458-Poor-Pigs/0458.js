// 458. 可怜的小猪
// 有 buckets 桶液体，其中 正好 有一桶含有毒药，其余装的都是水。它们从外观看起来都一样。为了弄清楚哪只水桶含有毒药，你可以喂一些猪喝，通过观察猪是否会死进行判断。不幸的是，你只有 minutesToTest 分钟时间来确定哪桶液体是有毒的。

// 喂猪的规则如下：

// 选择若干活猪进行喂养
// 可以允许小猪同时饮用任意数量的桶中的水，并且该过程不需要时间。
// 小猪喝完水后，必须有 minutesToDie 分钟的冷却时间。在这段时间里，你只能观察，而不允许继续喂猪。
// 过了 minutesToDie 分钟后，所有喝到毒药的猪都会死去，其他所有猪都会活下来。
// 重复这一过程，直到时间用完。
// 给你桶的数目 buckets ，minutesToDie 和 minutesToTest ，返回在规定时间内判断哪个桶有毒所需的 最小 猪数。



// 示例 1：

// 输入：buckets = 1000, minutesToDie = 15, minutesToTest = 60
// 输出：5
// 示例 2：

// 输入：buckets = 4, minutesToDie = 15, minutesToTest = 15
// 输出：2
// 示例 3：

// 输入：buckets = 4, minutesToDie = 15, minutesToTest = 30
// 输出：2


// 提示：

// 1 <= buckets <= 1000
// 1 <= minutesToDie <= minutesToTest <= 100

/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function (buckets, minutesToDie, minutesToTest) {
  if (buckets === 1) {
    return 0;
  }
  const combinations = new Array(buckets + 1).fill(0).map(() => new Array(buckets + 1).fill(0));
  combinations[0][0] = 1;
  const iterations = Math.floor(minutesToTest / minutesToDie);
  const f = new Array(buckets).fill(0).map(() => new Array(iterations + 1).fill(0));
  for (let i = 0; i < buckets; i++) {
    f[i][0] = 1;
  }
  for (let j = 0; j <= iterations; j++) {
    f[0][j] = 1;
  }
  for (let i = 1; i < buckets; i++) {
    combinations[i][0] = 1;
    combinations[i][i] = 1;
    for (let j = 1; j < i; j++) {
      combinations[i][j] = combinations[i - 1][j - 1] + combinations[i - 1][j];
    }
    for (let j = 1; j <= iterations; j++) {
      for (let k = 0; k <= i; k++) {
        f[i][j] += f[k][j - 1] * combinations[i][i - k];
      }
    }
    if (f[i][iterations] >= buckets) {
      return i;
    }
  }
  return 0;
}