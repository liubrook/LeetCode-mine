func reverseParentheses(s string) string {
	stack := [][]byte{}
	str := []byte{}
	for i := range s {
		if s[i] == '(' {
			stack = append(stack, str)
			str = []byte{}
		} else if s[i] == ')' {
			for j, n := 0, len(str); j < n/2; j++ {
				str[j], str[n-1-j] = str[n-1-j], str[j]
			}
			str = append(stack[len(stack)-1], str...)
			stack = stack[:len(stack)-1]
		} else {
			str = append(str, s[i])
		}
	}
	return string(str)
}