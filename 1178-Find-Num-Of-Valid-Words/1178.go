func findNumOfValidWords(words []string, puzzles []string) []int {
	const puzzleLength = 7
	cnt := map[int]int{}
	for _, s := range words {
		mask := 0
		for _, ch := range s {
			mask |= 1 << (ch - 'a')
		}
		if bits.OnesCount(uint(mask)) <= puzzleLength {
			cnt[mask]++
		}
	}

	ans := make([]int, len(puzzles))
	for i, s := range puzzles {
		first := 1 << (s[0] - 'a')

		// 枚举子集
		mask := 0
		for _, ch := range s[1:] {
			mask |= 1 << (ch - 'a')
		}
		subset := mask
		for {
			ans[i] += cnt[subset|first]
			subset = (subset - 1) & mask
			if subset == mask {
				break
			}
		}
	}
	return ans
}