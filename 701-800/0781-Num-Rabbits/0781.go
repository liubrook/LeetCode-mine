func numRabbits(answers []int) (ans int) {
	count := map[int]int{}
	for _, y := range answers {
		count[y]++
	}
	for y, x := range count {
		ans += (x + y) / (y + 1) * (y + 1)
	}
	return
}