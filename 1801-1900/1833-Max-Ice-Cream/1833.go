func maxIceCream(costs []int, coins int) (ans int) {
	sort.Ints(costs)
	for _, c := range costs {
		if coins < c {
			break
		}
		coins -= c
		ans++
	}
	return
}