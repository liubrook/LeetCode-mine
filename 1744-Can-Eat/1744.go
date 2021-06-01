func canEat(candiesCount []int, queries [][]int) []bool {
	n := len(candiesCount)

	// 前缀和
	sum := make([]int, n)
	sum[0] = candiesCount[0]
	for i := 1; i < n; i++ {
		sum[i] = sum[i-1] + candiesCount[i]
	}

	ans := make([]bool, len(queries))
	for i, q := range queries {
		favoriteType, favoriteDay, dailyCap := q[0], q[1], q[2]

		x1 := favoriteDay + 1
		y1 := (favoriteDay + 1) * dailyCap
		x2 := 1
		if favoriteType > 0 {
			x2 = sum[favoriteType-1] + 1
		}
		y2 := sum[favoriteType]

		ans[i] = !(x1 > y2 || y1 < x2)
	}
	return ans
}