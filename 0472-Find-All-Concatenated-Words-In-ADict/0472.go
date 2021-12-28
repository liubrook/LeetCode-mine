// 472. 连接词
// 给你一个 不含重复 单词的字符串数组 words ，请你找出并返回 words 中的所有 连接词 。

// 连接词 定义为：一个完全由给定数组中的至少两个较短单词组成的字符串。

// 示例 1：

// 输入：words = ["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"]
// 输出：["catsdogcats", "dogcatsdog", "ratcatdogcat"]
// 解释："catsdogcats" 由 "cats", "dog" 和 "cats" 组成;
// "dogcatsdog" 由 "dog", "cats" 和 "dog" 组成;
// "ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
// 示例 2：

// 输入：words = ["cat", "dog", "catdog"]
// 输出：["catdog"]

// 提示：

// 1 <= words.length <= 104
// 0 <= words[i].length <= 1000
// words[i] 仅由小写字母组成
// 0 <= sum(words[i].length) <= 105

type trie struct {
	children [26]*trie
	isEnd    bool
}

func (root *trie) insert(word string) {
	node := root
	for _, ch := range word {
		ch -= 'a'
		if node.children[ch] == nil {
			node.children[ch] = &trie{}
		}
		node = node.children[ch]
	}
	node.isEnd = true
}

func (root *trie) dfs(word string) bool {
	if word == "" {
		return true
	}
	node := root
	for i, ch := range word {
		node = node.children[ch-'a']
		if node == nil {
			return false
		}
		if node.isEnd && root.dfs(word[i+1:]) {
			return true
		}
	}
	return false
}

func findAllConcatenatedWordsInADict(words []string) (ans []string) {
	sort.Slice(words, func(i, j int) bool { return len(words[i]) < len(words[j]) })

	root := &trie{}
	for _, word := range words {
		if word == "" {
			continue
		}
		if root.dfs(word) {
			ans = append(ans, word)
		} else {
			root.insert(word)
		}
	}
	return
}