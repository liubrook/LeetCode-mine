// 850. 矩形面积 II
// 我们给出了一个（轴对齐的）二维矩形列表 rectangles 。 对于 rectangle[i] = [x1, y1, x2, y2]，其中（x1，y1）是矩形 i 左下角的坐标， (xi1, yi1) 是该矩形 左下角 的坐标， (xi2, yi2) 是该矩形 右上角 的坐标。

// 计算平面中所有 rectangles 所覆盖的 总面积 。任何被两个或多个矩形覆盖的区域应只计算 一次 。

// 返回 总面积 。因为答案可能太大，返回 109 + 7 的 模 。



// 示例 1：

// https://s3-lc-upload.s3.amazonaws.com/uploads/2018/06/06/rectangle_area_ii_pic.png

// 输入：rectangles = [[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]
// 输出：6
// 解释：如图所示，三个矩形覆盖了总面积为6的区域。
// 从(1, 1)到(2, 2)，绿色矩形和红色矩形重叠。
// 从(1, 0)到(2, 3)，三个矩形都重叠。
// 示例 2：

// 输入：rectangles = [[0, 0, 1000000000, 1000000000]]
// 输出：49
// 解释：答案是 1018 对(109 + 7) 取模的结果， 即 49 。


// 提示：

// 1 <= rectangles.length <= 200
// rectanges[i].length = 4
// 0 <= xi1, yi1, xi2, yi2 <= 109
// 矩形叠加覆盖后的总面积不会超越 2 ^ 63 - 1 ，这意味着可以用一个 64 位有符号整数来保存面积结果。

/**
 * @param {number[][]} rectangles
 * @return {number}
 */
var rectangleArea = function (rectangles) {
  const sides = [];
  for (const [x1, y1, x2, y2] of rectangles) {
    const segment = [y1, y2];
    sides.push({ isLeft: true, x: x1, segment });
    sides.push({ isLeft: false, x: x2, segment });
  }
  sides.sort((s1, s2) => s1.x - s2.x);

  const segments = [];
  let area = 0n;
  let prevX = 0;
  for (const { isLeft, x, segment } of sides) {
    if (x != prevX) {
      area += calcPartArea(x);
      prevX = x;
    }
    if (isLeft) {
      insertSegment(segment);
    }
    else {
      removeSegment(segment);
    }
  }

  return area % 1000000007n;

  function insertSegment(segment) {
    const [start, end] = segment;
    const i = segments.findIndex(segment => start < segment[0] || (start == segment[0] && end > segment[1]));
    if (i == -1) {
      segments.push(segment);
    }
    else {
      segments.splice(i, 0, segment);
    }
  }

  function removeSegment(segment) {
    const i = segments.indexOf(segment);
    if (i != -1) {
      segments.splice(i, 1);
    }
  }

  function calcPartArea(x) {
    const combinedSegments = [];
    for (const segment of segments) {
      if (combinedSegments.length == 0) {
        combinedSegments.push(segment.slice());
      }
      else {
        const prevSegment = combinedSegments[combinedSegments.length - 1];
        const end1 = prevSegment[1];
        const [start2, end2] = segment;
        switch (true) {
          case start2 < end1:
            prevSegment[1] = Math.max(end1, end2);
            break;
          case start2 == end1:
            prevSegment[1] = end2;
            break;
          case start2 > end1:
            combinedSegments.push(segment.slice());
            break;
        }
      }
    }
    const width = BigInt(x - prevX);
    return combinedSegments
      .map(([start, end]) => BigInt(end - start))
      .reduce((area, height) => area + width * height, 0n);
  }
};