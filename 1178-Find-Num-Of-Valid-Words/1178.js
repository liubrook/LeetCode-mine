// 1178. 猜字谜
// 外国友人仿照中国字谜设计了一个英文版猜字谜小游戏，请你来猜猜看吧。

// 字谜的迷面 puzzle 按字符串形式给出，如果一个单词 word 符合下面两个条件，那么它就可以算作谜底：

// 单词 word 中包含谜面 puzzle 的第一个字母。
// 单词 word 中的每一个字母都可以在谜面 puzzle 中找到。
// 例如，如果字谜的谜面是 "abcdefg"，那么可以作为谜底的单词有 "faced", "cabbage", 和 "baggage"；而 "beefed"（不含字母 "a"）以及 "based"（其中的 "s" 没有出现在谜面中）。
// 返回一个答案数组 answer，数组中的每个元素 answer[i] 是在给出的单词列表 words 中可以作为字谜迷面 puzzles[i] 所对应的谜底的单词数目。

 

// 示例：

// 输入：
// words = ["aaaa","asas","able","ability","actt","actor","access"], 
// puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
// 输出：[1,1,3,2,4,0]
// 解释：
// 1 个单词可以作为 "aboveyz" 的谜底 : "aaaa" 
// 1 个单词可以作为 "abrodyz" 的谜底 : "aaaa"
// 3 个单词可以作为 "abslute" 的谜底 : "aaaa", "asas", "able"
// 2 个单词可以作为 "absoryz" 的谜底 : "aaaa", "asas"
// 4 个单词可以作为 "actresz" 的谜底 : "aaaa", "asas", "actt", "access"
// 没有单词可以作为 "gaswxyz" 的谜底，因为列表中的单词都不含字母 'g'。
 

// 提示：

// 1 <= words.length <= 10^5
// 4 <= words[i].length <= 50
// 1 <= puzzles.length <= 10^4
// puzzles[i].length == 7
// words[i][j], puzzles[i][j] 都是小写英文字母。
// 每个 puzzles[i] 所包含的字符都不重复。

var findNumOfValidWords = function(words, puzzles) {
  const frequency = new Map();

  for (const word of words) {
    let mask = 0;
    for (const ch of word) {
      mask |= (1 << (ch.charCodeAt() - 'a'.charCodeAt()));
    }
    if (CountOne(mask) <= 7) {
      frequency.set(mask, (frequency.get(mask) || 0) + 1);
    }
  }

  const ans = [];
  for (const puzzle of puzzles) {
    let total = 0;
    // 枚举子集方法
    let mask = 0;
    for (let i = 1; i < 7; i++) {
      mask |= (1 << (puzzle[i].charCodeAt() - 'a'.charCodeAt()));
    }
    let subset = mask;
    while(subset) {
      let s = subset | (1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
      if (frequency.has(s)) {
        total += frequency.get(s);
      }
      subset = (subset - 1) & mask;
    }
    // 在枚举子集的过程中，要么会漏掉全集 mask，要么会漏掉空集
    // 这里会漏掉空集，因此需要额外判断空集
    if (frequency.has(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()))) {
      total += frequency.get(1 << (puzzle[0].charCodeAt() - 'a'.charCodeAt()));
    }
    ans.push(total);
  }
  return ans;
}


function CountOne(n) {
  const str = n.toString(2);
  let count = 0;
  for (const ch of str) {
    if (parseInt(ch) === 1) {
      count++;
    }
  }
  return count;
}