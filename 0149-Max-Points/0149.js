// 149. 直线上最多的点数
// 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X - Y 平面上的一个点。求最多有多少个点在同一条直线上。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg
// 输入：points = [[1, 1], [2, 2], [3, 3]]
// 输出：3
// 示例 2：

// https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg
// 输入：points = [[1, 1], [3, 2], [5, 3], [4, 1], [2, 3], [1, 4]]
// 输出：4


// 提示：

// 1 <= points.length <= 300
// points[i].length == 2
//   - 104 <= xi, yi <= 104
// points 中的所有点 互不相同

/**
 * @param {number[][]} points
 * @return {number}
 */

var maxPoints = function (points) {
  const n = points.length;
  if (n <= 2) {
    return n;
  }
  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (ret >= n - i || ret > n / 2) {
      break;
    }
    const map = new Map();
    for (let j = i + 1; j < n; j++) {
      let x = points[i][0] - points[j][0];
      let y = points[i][1] - points[j][1];
      if (x === 0) {
        y = 1;
      } else if (y === 0) {
        x = 1;
      } else {
        if (y < 0) {
          x = -x;
          y = -y;
        }
        const gcdXY = gcd(Math.abs(x), Math.abs(y));
        x /= gcdXY;
        y /= gcdXY;
      }
      const key = y + x * 20001;
      map.set(key, (map.get(key) || 0) + 1);
    }
    let maxn = 0;
    for (const num of map.values()) {
      maxn = Math.max(maxn, num + 1);
    }
    ret = Math.max(ret, maxn);
  }
  return ret;
}

const gcd = (a, b) => {
  return b != 0 ? gcd(b, a % b) : a;
}