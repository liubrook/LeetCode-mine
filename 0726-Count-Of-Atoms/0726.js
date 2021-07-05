// 726. 原子的数量
// 给定一个化学式formula（作为字符串），返回每种原子的数量。

// 原子总是以一个大写字母开始，接着跟随0个或任意个小写字母，表示原子的名字。

// 如果数量大于 1，原子后会跟着数字表示原子的数量。如果数量等于 1 则不会跟数字。例如，H2O 和 H2O2 是可行的，但 H1O2 这个表达是不可行的。

// 两个化学式连在一起是新的化学式。例如 H2O2He3Mg4 也是化学式。

// 一个括号中的化学式和数字（可选择性添加）也是化学式。例如(H2O2) 和(H2O2)3 是化学式。

// 给定一个化学式，输出所有原子的数量。格式为：第一个（按字典序）原子的名子，跟着它的数量（如果数量大于 1），然后是第二个原子的名字（按字典序），跟着它的数量（如果数量大于 1），以此类推。

// 示例 1:

// 输入:
// formula = "H2O"
// 输出: "H2O"
// 解释:
// 原子的数量是 { 'H': 2, 'O': 1 }。
// 示例 2:

// 输入:
// formula = "Mg(OH)2"
// 输出: "H2MgO2"
// 解释:
// 原子的数量是 { 'H': 2, 'Mg': 1, 'O': 2 }。
// 示例 3:

// 输入:
// formula = "K4(ON(SO3)2)2"
// 输出: "K4N2O14S4"
// 解释:
// 原子的数量是 { 'K': 4, 'N': 2, 'O': 14, 'S': 4 }。
// 注意:

// 所有原子的第一个字母为大写，剩余字母都是小写。
// formula的长度在[1, 1000]之间。
// formula只包含字母、数字和圆括号，并且题目中给定的是合法的化学式。


/**
 * @param {string} formula
 * @return {string}
 */
var countOfAtoms = function (formula) {
  let i = 0;
  const n = formula.length;

  const stack = [new Map()];
  while (i < n) {
    const ch = formula[i];

    const parseAtom = () => {
      const sb = [];
      sb.push(formula[i++]); // 扫描首字母
      while (i < n && formula[i] >= 'a' && formula[i] <= 'z') {
        sb.push(formula[i++]); // 扫描首字母后的小写字母
      }
      return sb.join('');
    }

    const parseNum = () => {
      if (i === n || isNaN(Number(formula[i]))) {
        return 1; // 不是数字，视作 1
      }
      let num = 0;
      while (i < n && !isNaN(Number(formula[i]))) {
        num = num * 10 + formula[i++].charCodeAt() - '0'.charCodeAt(); // 扫描数字
      }
      return num;
    }

    if (ch === '(') {
      i++;
      stack.unshift(new Map()); // 将一个空的哈希表压入栈中，准备统计括号内的原子数量
    } else if (ch === ')') {
      i++;
      const num = parseNum(); // 括号右侧数字
      const popMap = stack.shift(); // 弹出括号内的原子数量
      const topMap = stack[0];
      for (const [atom, v] of popMap.entries()) {
        topMap.set(atom, (topMap.get(atom) || 0) + v * num); // 将括号内的原子数量乘上 num，加到上一层的原子数量中
      }
    } else {
      const atom = parseAtom();
      const num = parseNum();
      const topMap = stack[0];
      topMap.set(atom, (topMap.get(atom) || 0) + num); // 统计原子数量

    }
  }

  let map = stack.pop();
  map = Array.from(map);
  map.sort();
  const sb = [];
  for (const [atom, count] of map) {
    sb.push(atom);
    if (count > 1) {
      sb.push(count);
    }
  }
  return sb.join('');
}