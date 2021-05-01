class Solution:
  def getImportance(self, employees: List['Employee'], idx: int) -> int:
    mp = {employee.id: employee for employee in employees}

    def dfs(idx: int) -> int:
      employee = mp[idx]
      total = employee.importance + sum(dfs(subIdx) for subIdx in employee.subordinates)
      return total

    return dfs(idx)