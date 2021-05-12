func xorQueries(arr []int, queries [][]int) []int {
	xors := make([]int, len(arr)+1)
	for i, v := range arr {
		xors[i+1] = xors[i] ^ v
	}
	ans := make([]int, len(queries))
	for i, q := range queries {
		ans[i] = xors[q[0]] ^ xors[q[1]+1]
	}
	return ans
}