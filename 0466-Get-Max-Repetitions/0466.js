// 466. 统计重复个数
// 困难
// 215
// 相关企业
// 定义 str = [s, n] 表示 str 由 n 个字符串 s 连接构成。

// 例如，str == ["abc", 3] == "abcabcabc" 。
// 如果可以从 s2 中删除某些字符使其变为 s1，则称字符串 s1 可以从字符串 s2 获得。

// 例如，根据定义，s1 = "abc" 可以从 s2 = "abdbec" 获得，仅需要删除加粗且用斜体标识的字符。
// 现在给你两个字符串 s1 和 s2 和两个整数 n1 和 n2 。由此构造得到两个字符串，其中 str1 = [s1, n1]、str2 = [s2, n2] 。

// 请你找出一个最大整数 m ，以满足 str = [str2, m] 可以从 str1 获得。



// 示例 1：

// 输入：s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
// 输出：2
// 示例 2：

// 输入：s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
// 输出：1


// 提示：

// 1 <= s1.length, s2.length <= 100
// s1 和 s2 由小写英文字母组成
// 1 <= n1, n2 <= 10^6

/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
  //保存s2p的记录和对应的countS1,countS2
  let indexMap = new Map()
  let countS1 = 0,
    countS2 = 0
  let s2p = 0
  //循环条件不变
  while (countS1 < n1) {
    //先把0，0，0这个开始的点，放在map中，以后的每次循环也会检查是否重复了s2p
    let preCount = indexMap.get(s2p)
    if (preCount == undefined)
      //没有就记录
      indexMap.set(s2p, [countS1, countS2])
    else {
      //有的话，拿出count，刨除掉那个可恶的不重复的前缀，计算重复次数
      let t = ((n1 - preCount[0]) / (countS1 - preCount[0])) | 0
      //更新两个count
      countS2 = preCount[1] + t * (countS2 - preCount[1])
      countS1 = preCount[0] + (countS1 - preCount[0]) * t
      //如果count正好是n1，退出循环。如果还有，还要继续走下去
      //为了避免重复读取map和计算，计算完重复就把map清除掉，来一手过河拆桥
      indexMap.clear()
      if (countS1 == n1)
        break
    }

    for (let i = 0; i < s1.length; i++) {
      if (s1[i] === s2[s2p]) {
        s2p++
        if (s2p === s2.length) {
          s2p = 0
          countS2++
        }
      }
    }
    countS1++
  }
  // 取整
  return countS2 / n2 | 0
};