func numWays(n int, relation [][]int, k int) int {
	dp := make([]int, n)
	dp[0] = 1
	for i := 0; i < k; i++ {
		next := make([]int, n)
		for _, r := range relation {
			src, dst := r[0], r[1]
			next[dst] += dp[src]
		}
		dp = next
	}
	return dp[n-1]
}