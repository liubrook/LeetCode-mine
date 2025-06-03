func findMaxLength(nums []int) (maxLength int) {
	mp := map[int]int{0: -1}
	counter := 0
	for i, num := range nums {
		if num == 1 {
			counter++
		} else {
			counter--
		}
		if prevIndex, has := mp[counter]; has {
			maxLength = max(maxLength, i-prevIndex)
		} else {
			mp[counter] = i
		}
	}
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}