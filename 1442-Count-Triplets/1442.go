func countTriplets(arr []int) (ans int) {
	cnt := map[int]int{}
	total := map[int]int{}
	s := 0
	for k, val := range arr {
		if m, has := cnt[s^val]; has {
			ans += m*k - total[s^val]
		}
		cnt[s]++
		total[s] += k
		s ^= val
	}
	return
}