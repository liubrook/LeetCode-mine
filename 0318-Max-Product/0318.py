# 318. 最大单词长度乘积
# 中等
# 485
# 相关企业
# 给你一个字符串数组 words ，找出并返回 length(words[i]) * length(words[j]) 的最大值，并且这两个单词不含有公共字母。如果不存在这样的两个单词，返回 0 。

 

# 示例 1：

# 输入：words = ["abcw","baz","foo","bar","xtfn","abcdef"]
# 输出：16 
# 解释：这两个单词为 "abcw", "xtfn"。
# 示例 2：

# 输入：words = ["a","ab","abc","d","cd","bcd","abcd"]
# 输出：4 
# 解释：这两个单词为 "ab", "cd"。
# 示例 3：

# 输入：words = ["a","aa","aaa","aaaa"]
# 输出：0 
# 解释：不存在这样的两个单词。
 

# 提示：

# 2 <= words.length <= 1000
# 1 <= words[i].length <= 1000
# words[i] 仅包含小写字母

class Solution:
    def maxProduct(self, words: List[str]) -> int:
        masks = [reduce(lambda a, b: a | (1 << (ord(b) - ord('a'))), word, 0) for word in words]
        return max((len(x[1]) * len(y[1]) for x, y in product(zip(masks, words), repeat=2) if x[0] & y[0] == 0), default=0)