func longestSubstring(s string, k int) (ans int) {
	if s == "" {
		return
	}

	cnt := [26]int{}
	for _, ch := range s {
		cnt[ch-'a']++
	}

	var split byte
	for i, c := range cnt[:] {
		if 0 < c && c < k {
			split = 'a' + byte(i)
			break
		}
	}
	if split == 0 {
		return len(s)
	}
	for _, subStr := range strings.Split(s, string(split)) {
		ans = max(ans, longestSubstring(subStr, k))
	}
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}