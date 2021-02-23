func isToeplitzMatrix(matrix [][]int) bool {
	n, m := len(matrix), len(matrix[0])
	for i := 1; i < n; i++ {
		for j := 1; j < m; j++ {
			if matrix[i][j] != matrix[i - 1][j - 1] {
				return false
			}
		}
	}
	return true
}