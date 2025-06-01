class Solution:
  def rotate(self, matrix):
    matrix.reverse()
    for i in range(len(matrix)):
      for j in range(i):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]