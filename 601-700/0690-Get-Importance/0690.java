class Solution {
  Map<Integer, Employee> map = new HashMap(Integer, Employee)();

  public int getImportance(List<Employee> employees, int id) {
    for (Employee employee : employees) {
      map.put(employee.id, employee);
    }
    return dfs(id);
  }

  public int dfs(int id) {
    Employee employee = map.get(id);
    int total = employee.importance;
    List<Integer> subordinates = employee.subordinates;
    for (int subId : subordinates) {
      total += dfs(subId);
    }
    return total;
  }
}