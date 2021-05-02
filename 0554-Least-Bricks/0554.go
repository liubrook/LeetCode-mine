func leastBricks(wall [][]int) int {
	cnt := map[int]int{}
	for _, widths := range wall {
		sum := 0
		for _, width := range widths[:len(widths)-1] {
			sum += width
			cnt[sum]++
		}
	}
	maxCnt := 0
	for _, c := range cnt {
		if c > maxCnt {
			maxCnt = c
		}
	}
	return len(wall) - maxCnt
}