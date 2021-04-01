func clumsy(N int) (ans int) {
	stk := []int{N}
	N--

	index := 0
	for N > 0 {
		switch index % 4 {
		case 0:
			stk[len(stk)-1] *= N
		case 1:
			stk[len(stk)-1] /= N
		case 2:
			stk = append(stk, N)
		default:
			stk = append(stk, -N)
		}
		N--
		index++
	}

	for _, v := range stk {
		ans += v
	}
	return
}