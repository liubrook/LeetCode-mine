var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    const row = matrix[i];
    for (let j = i + 1; j < n; j++) {
      // 遍历对角线上方元素，做转置
      const tmp = row[j];
      row[j] = matrix[j][i];
      matrix[j][i] = tmp;
    }
    row.reverse(); // 行翻转
  }
};
