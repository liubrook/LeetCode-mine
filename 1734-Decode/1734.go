func decode(encoded []int) []int {
	n := len(encoded)
	total := 0
	for i := 1; i <= n+1; i++ {
		total ^= i
	}
	odd := 0
	for i := 1; i < n; i += 2 {
		odd ^= encoded[i]
	}
	perm := make([]int, n+1)
	perm[0] = total ^ odd
	for i, v := range encoded {
		perm[i+1] = perm[i] ^ v
	}
	return perm
}