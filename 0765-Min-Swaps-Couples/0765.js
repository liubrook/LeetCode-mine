// 765. 情侣牵手
// 提示
// 困难
// 477
// 相关企业
// n 对情侣坐在连续排列的 2n 个座位上，想要牵到对方的手。

// 人和座位由一个整数数组 row 表示，其中 row[i] 是坐在第 i 个座位上的人的 ID。情侣们按顺序编号，第一对是(0, 1)，第二对是(2, 3)，以此类推，最后一对是(2n - 2, 2n - 1)。

// 返回 最少交换座位的次数，以便每对情侣可以并肩坐在一起。 每次交换可选择任意两人，让他们站起来交换座位。



// 示例 1:

// 输入: row = [0, 2, 1, 3]
// 输出: 1
// 解释: 只需要交换row[1]和row[2]的位置即可。
// 示例 2:

// 输入: row = [3, 2, 0, 1]
// 输出: 0
// 解释: 无需交换座位，所有的情侣都已经可以手牵手了。


// 提示:

// 2n == row.length
// 2 <= n <= 30
// n 是偶数
// 0 <= row[i] < 2n
// row 中所有元素均无重复

/**
 * @param {number[]} row
 * @return {number}
 */
var minSwapsCouples = function (row) {
  const n = row.length;
  const tot = n / 2;
  const f = new Array(tot).fill(0).map((element, index) => index);

  for (let i = 0; i < n; i += 2) {
    const l = Math.floor(row[i] / 2);
    const r = Math.floor(row[i + 1] / 2);
    add(f, l, r);
  }
  const map = new Map();
  for (let i = 0; i < tot; i++) {
    const fx = getf(f, i);
    if (map.has(fx)) {
      map.set(fx, map.get(fx) + 1);
    } else {
      map.set(fx, 1)
    }
  }

  let ret = 0;
  for (const [f, sz] of map.entries()) {
    ret += sz - 1;
  }
  return ret;
};

const getf = (f, x) => {
  if (f[x] === x) {
    return x;
  }
  const newf = getf(f, f[x]);
  f[x] = newf;
  return newf;
}

const add = (f, x, y) => {
  const fx = getf(f, x);
  const fy = getf(f, y);
  f[fx] = fy;
}