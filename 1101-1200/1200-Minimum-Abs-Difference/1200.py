class Solution:
  def minimumAbsDifference(self, arr: List[int]) -> List[List[int]]:
    arr.sort()
    Hash = {}
    for i in range(len(arr) - 1):
      distance = arr[i + 1] - arr[i]
      if Hash.get(distance) is None:
        Hash[distance] = [[arr[i], arr[i+1]]]
      else:
        Hash[distance].append([arr[i], arr[i+1]])
    return Hash[min(Hash.keys())]