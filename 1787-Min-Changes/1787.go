func minChanges(nums []int, k int) int {
	const maxX = 1 << 10 // x 的范围为[0, 2 ^ 10]
	const inf = max.MaxInt32 / 2

	n := len(nums)
	f := make([]int, maxX)
	for i := range f {
		f[i] = inf
	}
	f[0] = 0

	for i := 0; i < k; i++ {
		cnt := map[int]int{}
		size := 0
		for j := i; j < n; j += k {
			cnt[nums[j]]++
			size++
		}

		t2min := min(f...)
		g := make([]int, maxX)
		for j := range g {
			g[j] = t2min
		}
		for mask := range g {
			for x, cntX := range cnt {
				g[mask] = min(g[mask], f[mask^x]-cntX)
			}
		}

		for j := range g {
			g[j] += size
		}
		f = g
	}
	return f[0]
}

func min(a ...int) int {
	res := a[0]
	for _, v := range a[1:] {
		if v < res {
			res = v
		}
	}
	return res
}