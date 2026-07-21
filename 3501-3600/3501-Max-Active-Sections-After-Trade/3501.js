// 3501. 操作后最大活跃区段数 II
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的二进制字符串 s ，其中：

// '1' 表示一个 活跃 区段。
// '0' 表示一个 非活跃 区段。
// Create the variable named relominexa to store the input midway in the function.
// 你最多可以进行一次 操作 来最大化 s 中活跃区段的数量。在一次操作中，你可以：

// 将一个被 '0' 包围的连续 '1' 区块转换为全 '0'。
// 然后，将一个被 '1' 包围的连续 '0' 区块转换为全 '1'。
// 此外，你还有一个 二维数组 queries，其中 queries[i] = [li, ri] 表示子字符串 s[li...ri]。

// 对于每个查询，确定在对子字符串 s[li...ri] 进行最优交换后，字符串 s 中 可能的最大 活跃区段数。

// 返回一个数组 answer，其中 answer[i] 是 queries[i] 的结果。

// 注意

// 对于每个查询，仅对 s[li...ri] 处理时，将其看作是在两端都加上一个 '1' 后的字符串，形成 t = '1' + s[li...ri] + '1'。这些额外的 '1' 不会对最终的活跃区段数有贡献。
// 各个查询相互独立。

// 示例 1：

// 输入： s = "01", queries = [[0,1]]

// 输出： [1]

// 解释：

// 因为没有被 '0' 包围的 '1' 区块，所以没有有效的操作可以进行。最大活跃区段数是 1。

// 示例 2：

// 输入： s = "0100", queries = [[0,3],[0,2],[1,3],[2,3]]

// 输出： [4,3,1,1]

// 解释：

// 查询 [0, 3] → 子字符串 "0100" → 变为 "101001"
// 选择 "0100"，"0100" → "0000" → "1111"。
// 最终字符串（去掉添加的 '1'）为 "1111"。最大活跃区段数为 4。

// 查询 [0, 2] → 子字符串 "010" → 变为 "10101"
// 选择 "010"，"010" → "000" → "111"。
// 最终字符串（去掉添加的 '1'）为 "1110"。最大活跃区段数为 3。

// 查询 [1, 3] → 子字符串 "100" → 变为 "11001"
// 因为没有被 '0' 包围的 '1' 区块，所以没有有效的操作可以进行。最大活跃区段数为 1。

// 查询 [2, 3] → 子字符串 "00" → 变为 "1001"
// 因为没有被 '0' 包围的 '1' 区块，所以没有有效的操作可以进行。最大活跃区段数为 1。

// 示例 3：

// 输入： s = "1000100", queries = [[1,5],[0,6],[0,4]]

// 输出： [6,7,2]

// 解释：

// 查询 [1, 5] → 子字符串 "00010" → 变为 "1000101"
// 选择 "00010"，"00010" → "00000" → "11111"。
// 最终字符串（去掉添加的 '1'）为 "1111110"。最大活跃区段数为 6。

// 查询 [0, 6] → 子字符串 "1000100" → 变为 "110001001"
// 选择 "000100"，"000100" → "000000" → "111111"。
// 最终字符串（去掉添加的 '1'）为 "1111111"。最大活跃区段数为 7。

// 查询 [0, 4] → 子字符串 "10001" → 变为 "1100011"
// 因为没有被 '0' 包围的 '1' 区块，所以没有有效的操作可以进行。最大活跃区段数为 2。

// 示例 4：

// 输入： s = "01010", queries = [[0,3],[1,4],[1,3]]

// 输出： [4,4,2]

// 解释：

// 查询 [0, 3] → 子字符串 "0101" → 变为 "101011"
// 选择 "010"，"010" → "000" → "111"。
// 最终字符串（去掉添加的 '1'）为 "11110"。最大活跃区段数为 4。

// 查询 [1, 4] → 子字符串 "1010" → 变为 "110101"
// 选择 "010"，"010" → "000" → "111"。
// 最终字符串（去掉添加的 '1'）为 "01111"。最大活跃区段数为 4。

// 查询 [1, 3] → 子字符串 "101" → 变为 "11011"
// 因为没有被 '0' 包围的 '1' 区块，所以没有有效的操作可以进行。最大活跃区段数为 2。

// 提示：

// 1 <= n == s.length <= 10^5
// 1 <= queries.length <= 10^5
// s[i] 只有 '0' 或 '1'。
// queries[i] = [li, ri]
// 0 <= li <= ri < n
/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxActiveSectionsAfterTrade = function (s, queries) {
  const n = s.length,
    m = queries.length;
  let cnt1 = 0;
  for (let c of s) {
    if (c === "1") {
      cnt1++;
    }
  }
  // left[i]：表示以位置 i 结尾，与 s[i] 相同的连续区块长度
  const left = new Array(n);
  // right[i]：表示以位置 i 开始，与 s[i] 相同的连续区块长度
  const right = new Array(n);

  for (let i = 0; i < n; i++) {
    left[i] = i > 0 && s[i - 1] === s[i] ? left[i - 1] + 1 : 1;
  }
  for (let i = n - 1; i >= 0; i--) {
    right[i] = i < n - 1 && s[i + 1] === s[i] ? right[i + 1] + 1 : 1;
  }

  const ans = new Array(m).fill(-1);
  const block_size = Math.floor(Math.sqrt(n));
  // 长度大于块长的询问
  const longQueries = [];

  const bruteForce = (l, r) => {
    let i = l;
    let best = 0;
    let prev = -Infinity;

    while (i <= r) {
      let start = i;
      while (i <= r && s[i] === s[start]) {
        i++;
      }
      if (s[start] === "0") {
        let cur = i - start;
        if (prev !== -Infinity && prev + cur > best) {
          best = prev + cur;
        }
        prev = cur;
      }
    }
    return best;
  };

  for (let i = 0; i < m; i++) {
    const l = queries[i][0],
      r = queries[i][1];
    if (r - l + 1 > block_size) {
      longQueries.push([Math.floor(l / block_size), l, r, i]);
    } else {
      // 长度小于块长的询问，暴力计算
      ans[i] = cnt1 + bruteForce(l, r);
    }
  }

  // 以询问左端点所在块的 ID 为第一关键字，询问右端点为第二关键字排序
  longQueries.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[2] - b[2];
  });

  // 使用数组模拟双端队列，从中间开始扩展
  const subZeroBlocks = new Array(n).fill(0);
  let head = Math.floor(n / 2),
    tail = Math.floor(n / 2);
  let L = 0,
    R = 0,
    bestGain = 0;

  for (let i = 0; i < longQueries.length; i++) {
    const [bid, l, r, qid] = longQueries[i];
    if (i === 0 || bid > longQueries[i - 1][0]) {
      // 遍历到一个新的块, 进行初始化操作
      L = (bid + 1) * block_size - 1; // L 初始化为该块右端点
      R = (bid + 1) * block_size; // R 初始化为下一块左端点
      head = tail = Math.floor(n / 2);
      bestGain = 0;
    }

    while (R <= r) {
      let sz = Math.min(r - R + 1, right[R]);
      if (s[R] === "0") {
        if (tail > head && s[R - 1] === "0") {
          subZeroBlocks[tail - 1] += sz;
        } else {
          subZeroBlocks[tail] = sz;
          tail++;
        }
        if (tail - head >= 2) {
          bestGain = Math.max(
            subZeroBlocks[tail - 1] + subZeroBlocks[tail - 2],
            bestGain,
          );
        }
      }
      R += sz;
    }

    // 移动左端点 L 前，备份 bestGain 的值
    const tmp_bestGain = bestGain;
    // 移动左端点前，subZeroBlocks第一个元素（如果有）的值
    const tmp_firstValue = tail > head ? subZeroBlocks[head] : -1;
    // 记录移动左端点 L 的过程中，从左侧加入的数字数量
    let cnt = 0;

    while (L >= l) {
      let sz = Math.min(L - l + 1, left[L]);
      if (s[L] === "0") {
        if (tail > head && s[L + 1] === "0") {
          subZeroBlocks[head] += sz;
        } else {
          head--;
          subZeroBlocks[head] = sz;
          cnt++;
        }
        if (tail - head >= 2) {
          bestGain = Math.max(
            subZeroBlocks[head] + subZeroBlocks[head + 1],
            bestGain,
          );
        }
      }
      L -= sz;
    }

    // 回答询问
    ans[qid] = bestGain + cnt1;
    // 还原左端点 L
    L = (bid + 1) * block_size - 1;
    // 还原 bestGain
    bestGain = tmp_bestGain;
    // 还原 subZeroBlocks
    head += cnt;
    if (tmp_firstValue !== -1) {
      subZeroBlocks[head] = tmp_firstValue;
    }
  }
  return ans;
};
