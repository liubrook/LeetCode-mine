// 349. 两个数组的交集
// 给定两个数组，编写一个函数来计算它们的交集。

 

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]
 

// 说明：

// 输出结果中的每个元素一定是唯一的。
// 我们可以不考虑输出结果的顺序。

// 计算两个数组的交集，直观的方法是遍历数组 nums1，对于其中的每个元素，遍历数组 nums2 判断该元素是否在数组 nums2 中，如果存在，则将该元素添加到返回值。假设数组 nums1 和 nums2 的长度分别是 mm 和 nn，则遍历数组 nums1 需要 O(m)O(m) 的时间，判断 nums1 中的每个元素是否在数组 nums2 中需要 O(n)O(n) 的时间，因此总时间复杂度是 O(mn)O(mn)。

// 如果使用哈希集合存储元素，则可以在 O(1)O(1) 的时间内判断一个元素是否在集合中，从而降低时间复杂度。

// 首先使用两个集合分别存储两个数组中的元素，然后遍历较小的集合，判断其中的每个元素是否在另一个集合中，如果元素也在另一个集合中，则将该元素添加到返回值。该方法的时间复杂度可以降低到 O(m+n)O(m+n)。

var intersection = function(num1, num2) {
  const set1 = new Set(num1);
  const set2 = new Set(num2);
  return set_intersection(set1, set2);
}

const set_intersection = (set1, set2) => {
  if (set1.size > set2.size) {
    return set_intersection(set2, set1);
  }
  const intersection = new Set();
  for(const num of set1) {
    if (set2.has(num)) {
      intersection.add(num);
    }
  }
  return [...intersection]
}