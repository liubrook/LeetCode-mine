func xorOperation(n, start int) (ans int) {
	for i := 0; i < n; i++ {
		ans ^= start + i*2
	}
	return
}