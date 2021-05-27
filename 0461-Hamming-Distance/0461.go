func hammingDistance(x, y int) (ans int) {
	for s := x ^ y; s > 0; s &= s - 1 {
		ans++
	}
	return
}