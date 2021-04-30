func singleNumber(nums []int) int {
	freq := map[int]int{}
	for _, v := range nums {
		freq[v]++
	}
	for num, occ := range freq {
		if occ == 1 {
			return num
		}
	}
	return 0
}