class Solution {
  public boolean searchMatrix(int[][] matrix, int target) {
    int rowIndex = binarySearchFirstColumn(matrix, target);
    if (rowIndex < 0) {
      return false;
    } 
    return binarySearchRow(matrix[rowIndex], target);
  }

  public int binarySearchFirstColumn(int[][] matrix, int target) {
    int low = -1, high = matrix.length - 1;
    while (low < high) {
      int mid = (high - low + 1) / 2 + low;
      if (matrix[mid][0] <= target) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    return low;
  }

  public boolean binarySearchRow(int[] row, int target) {
    int low = 0, high = row.length - 1;
    while (low <= high) {
      int mid = (high - low) / 2 + low;
      if (row[mid] == target) {
        return true;
      } else if (row[mid] > target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return false;
  }
}