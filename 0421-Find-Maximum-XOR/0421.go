func findMaximumXOR(nums []int) (x int) {
	const highBit = 30
	for k := highBit; k >= 0; k-- {
		seen := map[int]bool{}
		for _, num := range nums {
			seen[num>>k] = true
		}

		xNext = x*2 + 1
		found := false

		for _, num := range nums {
			if seen[num>>k^xNext] {
				found = true
				break
			}
		}

		if found {
			x = xNext
		} else {
			x = xNext - 1
		}
	}
	return
}