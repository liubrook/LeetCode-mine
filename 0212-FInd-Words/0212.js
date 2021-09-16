// 212. 单词搜索 II
// 给定一个 m x n 二维字符网格 board 和一个单词（字符串）列表 words，找出所有同时在二维网格和字典中出现的单词。

// 单词必须按照字母顺序，通过 相邻的单元格 内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。



// 示例 1：

// https://assets.leetcode.com/uploads/2020/11/07/search1.jpg
// 输入：board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], words = ["oath", "pea", "eat", "rain"]
// 输出：["eat", "oath"]
// 示例 2：

// https://assets.leetcode.com/uploads/2020/11/07/search2.jpg
// 输入：board = [["a", "b"], ["c", "d"]], words = ["abcb"]
// 输出：[]


// 提示：

// m == board.length
// n == board[i].length
// 1 <= m, n <= 12
// board[i][j] 是一个小写英文字母
// 1 <= words.length <= 3 * 104
// 1 <= words[i].length <= 10
// words[i] 由小写英文字母组成
// words 中的所有字符串互不相同

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  // 构建字典树
  class TrieNode {
    constructor() {
      this.END = false;
      this.children = {};
    }
  }
  let root = null;
  let Trie = function () {
    root = new TrieNode();
  }
  Trie.prototype.insert = function (word) {
    let currNode = root;
    for (let i = 0; i < word.length; i++) {
      if (currNode.children[word[i]] == undefined) {
        currNode.children[word[i]] = new TrieNode();
      }
      currNode = currNode.children[word[i]];
    }
    currNode.END = true;
  };
  // 初始化变量
  let m = board.length;
  let n = board[0].length;
  // 初始化字典树
  let wordsTrie = new Trie();
  for (let i = 0; i < words.length; i++) {
    wordsTrie.insert(words[i]);
  }
  // DFS搜索
  let boardDFS = (i, j, curStr, currNode) => {
    // 字典树中找到了
    if (currNode.END) {
      result.push(curStr);
      currNode.END = false;
    }
    if (i < 0 || j < 0 || i == m || j == n) {
      return;
    }
    const restore = board[i][j];
    if (restore == '#' || !currNode.children[restore]) {
      return;
    }
    // 前进
    board[i][j] = '#';
    curStr += restore;
    boardDFS(i - 1, j, curStr, currNode.children[restore]);
    boardDFS(i + 1, j, curStr, currNode.children[restore]);
    boardDFS(i, j - 1, curStr, currNode.children[restore]);
    boardDFS(i, j + 1, curStr, currNode.children[restore]);
    // 还原(回溯)
    board[i][j] = restore;
  }
  // 寻找结果
  let result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      boardDFS(i, j, '', root);
    }
  }
  return result;
}