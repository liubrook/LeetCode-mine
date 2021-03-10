class Solution:
  def calculate(self, s: str) -> int:
    res = 0
    stack = []
    sign = 1
    i = 0
    n = len(s)
    while i < n:
      if s[i] == " ":
        i += 1
      elif s[i] == "-":
        sign = -1
        i += 1
      elif s[i] == "+":
        sign = 1
        i += 1
      elif s[i] == "(":
        stack.append(res)
        stack.append(sign)
        res = 0
        sign = 1
        i += 1
      elif s[i] == ")":
        res = res * stack.pop() + stack.pop()
        i += 1
      elif s[i].isdigit():
        tmp = int(s[i])
        i += 1
        while i < n and s[i].isdigit():
          tmp = tmp * 10 + int(s[i])
          i += 1
        res += tmp * sign
    return res