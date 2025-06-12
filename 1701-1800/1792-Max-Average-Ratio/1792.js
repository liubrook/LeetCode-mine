// 1792. 最大平均通过率
// 一所学校里有一些班级，每个班级里有一些学生，现在每个班都会进行一场期末考试。给你一个二维数组 classes ，其中 classes[i] = [passi, totali] ，表示你提前知道了第 i 个班级总共有 totali 个学生，其中只有 passi 个学生可以通过考试。

// 给你一个整数 extraStudents ，表示额外有 extraStudents 个聪明的学生，他们 一定 能通过任何班级的期末考。你需要给这 extraStudents 个学生每人都安排一个班级，使得 所有 班级的 平均 通过率 最大 。

// 一个班级的 通过率 等于这个班级通过考试的学生人数除以这个班级的总人数。平均通过率 是所有班级的通过率之和除以班级数目。

// 请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10 ^- 5 以内的结果都会视为正确结果。



// 示例 1：

// 输入：classes = [[1, 2], [3, 5], [2, 2]], extraStudents = 2
// 输出：0.78333
// 解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为(3 / 4 + 3 / 5 + 2 / 2) / 3 = 0.78333 。
// 示例 2：

// 输入：classes = [[2, 4], [3, 9], [4, 5], [2, 10]], extraStudents = 4
// 输出：0.53485


// 提示：

// 1 <= classes.length <= 10^5
// classes[i].length == 2
// 1 <= passi <= totali <= 10^5
// 1 <= extraStudents <= 10^5

/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function (classes, extraStudents) {
  let heapSize = classes.length;
  // 从最后一个非叶子节点，自底向上，构建大顶堆
  let maxHeap = new Heap(classes);
  for (let i = (heapSize >> 1) - 1; i >= 0; i--) {
    maxHeap.down(i, heapSize);
  }
  console.log(maxHeap.heap);
  // 调整extraStudents次，并记录
  while (extraStudents--) {
    let [d, x, y] = maxHeap.heap[0];
    maxHeap.sum += d;
    maxHeap.heap[0] = [diff(x + 1, y + 1), x + 1, y + 1];
    maxHeap.down(0, heapSize);
  }
  // 返回
  return maxHeap.sum / heapSize;
};

// 带cmp的堆模板
let swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];
var defaultCmp = (a, b) => a[0] < b[0];
// 通过率的增加量
let diff = (x, y) => { return (x + 1) / (y + 1) - x / y; }
class Heap {
  constructor(nums, cmp = defaultCmp) { // 大顶堆
    this.heap = [];
    this.sum = 0;
    for (let num of nums) {
      this.heap.push([diff(num[0], num[1]), num[0], num[1]]);
      this.sum += num[0] / num[1];
    }
    this.cmp = cmp;
  }

  // 从位置i自底向上调整堆，此题不用可删除
  up(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.cmp(this.heap[parent], this.heap[i])) {
        swap(this.heap, parent, i);
        i = parent;
      } else {
        break;
      }
    }
  }

  // 从位置i自上而下调整堆（大小为heapSize）
  down(i, heapSize) {
    while (2 * i + 1 < heapSize) {
      let child = 2 * i + 1;
      // 下沉到左右孩子较小的结点
      if (child + 1 < heapSize && this.cmp(this.heap[child], this.heap[child + 1])) {
        child++;
      }
      if (this.cmp(this.heap[i], this.heap[child])) {
        swap(this.heap, child, i);
        i = child;
      } else {
        break;
      }
    }
  }
}