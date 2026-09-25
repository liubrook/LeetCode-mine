class Solution:
    def braceExpansionII(self, expression: str) -> List[str]:
        op = []  # 运算符栈
        stk = []  # 集合栈
        
        # 弹出栈顶运算符，并进行计算
        def ope():
            l, r = len(stk) - 2, len(stk) - 1
            if op[-1] == '+':
                # 并集操作
                stk[l] |= stk[r]
            else:
                # 笛卡尔积操作
                tmp = set()
                for left in stk[l]:
                    for right in stk[r]:
                        tmp.add(left + right)
                stk[l] = tmp
            op.pop()
            stk.pop()
        
        for i, ch in enumerate(expression):
            if ch == ',':
                # 不断地弹出栈顶运算符，直到栈为空或者栈顶不为乘号
                while op and op[-1] == '*':
                    ope()
                op.append('+')
            elif ch == '{':
                # 首先判断是否需要添加乘号，再将 { 添加到运算符栈中
                if i > 0 and (expression[i-1] == '}' or expression[i-1].isalpha()):
                    op.append('*')
                op.append('{')
            elif ch == '}':
                # 不断地弹出栈顶运算符，直到栈顶为 {
                while op and op[-1] != '{':
                    ope()
                op.pop()
            else:
                # 首先判断是否需要添加乘号，再将新构造的集合添加到集合栈中
                if i > 0 and (expression[i-1] == '}' or expression[i-1].isalpha()):
                    op.append('*')
                stk.append({ch})
        
        while op:
            ope()
        
        return sorted(stk[-1])