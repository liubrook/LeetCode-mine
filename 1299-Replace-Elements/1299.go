func replaceElements(arr []int) []int {
	if len(arr) == 0 {
		return arr
	}
	max := arr[len(arr)-1]
	arr[len(arr)-1] = -1
	for i := len(arr) - 2; i >= 0; i-- {
		cur := arr[i]
		arr[i] = max
		if cur > max {
			max = cur
		}
	}
	return arr
}