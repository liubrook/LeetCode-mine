// 1146. 快照数组
// 中等
// 相关标签
// 相关企业
// 提示
// 实现支持下列接口的「快照数组」- SnapshotArray：

// SnapshotArray(int length) - 初始化一个与指定长度相等的 类数组 的数据结构。初始时，每个元素都等于 0。
// void set(index, val) - 会将指定索引 index 处的元素设置为 val。
// int snap() - 获取该数组的快照，并返回快照的编号 snap_id（快照号是调用 snap() 的总次数减去 1）。
// int get(index, snap_id) - 根据指定的 snap_id 选择快照，并返回该快照指定索引 index 的值。


// 示例：

// 输入：["SnapshotArray", "set", "snap", "set", "get"]
// [[3], [0, 5], [], [0, 6], [0, 0]]
// 输出：[null, null, 0, null, 5]
// 解释：
// SnapshotArray snapshotArr = new SnapshotArray(3); // 初始化一个长度为 3 的快照数组
// snapshotArr.set(0, 5);  // 令 array[0] = 5
// snapshotArr.snap();  // 获取快照，返回 snap_id = 0
// snapshotArr.set(0, 6);
// snapshotArr.get(0, 0);  // 获取 snap_id = 0 的快照中 array[0] 的值，返回 5


// 提示：

// 1 <= length <= 50000
// 题目最多进行50000 次set，snap，和 get的调用 。
// 0 <= index < length
// 0 <= snap_id < 我们调用 snap() 的总次数
// 0 <= val <= 10 ^ 9

/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.snap_cnt = 0;
  this.data = Array.from({ length }, () => []);
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  this.data[index].push([this.snap_cnt, val]);
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  return this.snap_cnt++;
};

/** 
 * @param {number} index 
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  const idx = binarySearch(index, snap_id, this.data);
  if (idx === 0) {
    return 0;
  }
  return this.data[index][idx - 1][1];
};

const binarySearch = (index, snap_id, data) => {
  let low = 0, high = data[index].length;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    const [x, y] = data[index][mid];
    if (x > snap_id + 1 || (x == snap_id + 1 && y >= 0)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */