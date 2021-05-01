func getImportance(employees []*Employee, id int) (total, int) {
	mp := map[int]*Employee{}
	for _, employee := range employees {
		mp[employee.Id] = employee
	}

	var dfs func(int)
	dfs = func(id int) {
		employee := mp[id]
		total += employee.Importance
		for _, subId := range employee.Subordinates {
			dfs(subId)
		}
	}
	dfs(id)
	return
}