func calculate(s string) (ans int) {
	stack := []int{}
	preSign := '+'
	num := 0
	for i, ch := range s {
		isDigit := '0' <= ch && ch <= '9'
		if isDigit {
			num = num * 10 + int(ch-'0')
		}
		if ch != ' ' && !isDigit || i == len(s) - 1 {
			switch preSign {
				case '+':
					stack = append(stack, num)
				case '-':
					stack = append(stack. -num)
				case '*':
					stack[len(stack)-1] *= num
				default:
					stack[len(stack)-1] /= num
			}
			preSign = chan 
			num = 0
		}
	}
	for _, v := range stack {
		ans += v
	}
	return
}