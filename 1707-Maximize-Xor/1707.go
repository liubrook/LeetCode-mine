const L = 30

type trie struct {
	children [2]*trie
	min      int
}

func (t *trie) insert(val int) {
	node := t
	if val < node.min {
		node.min = val
	}
	for i := L - 1; i >= 0; i-- {
		bit := val >> i & 1
		if node.children[bit] == nil {
			node.children[bit] = &trie{min: val}
		}
		node = node.children[bit]
		if val < node.min {
			node.min = val
		}
	}
}

func (t *trie) getMaxXorWithLimit(val, limit int) (ans int) {
	node := t
	if node.min > limit {
		return -1
	}
	for i := L - 1; i >= 0; i-- {
		bit := val >> i & 1
		if node.children[bit^1] != nil && node.children[bit^1].min <= limit {
			ans |= 1 << i
			bit ^= 1
		}
		node = node.children[bit]
	}
	return
}

func maximizeXor(nums []int, queries [][]int) []int {
	t := &trie{min: math.MaxInt32}
	for _, val := range nums {
		t.insert(val)
	}
	ans := make([]int, len(queries))
	for i, q := range queries {
		ans[i] = t.getMaxXorWithLimit(q[0], q[1])
	}
	return ans
}