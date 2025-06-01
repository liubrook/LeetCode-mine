class MinStack(object):

    def __init__(self):
        """
        initialize your data structure here.
        """
        self.data = []
        self.min_val = float('inf')

    def push(self, x):
        """
        :type x: int
        :rtype: None
        """
        if x <= self.min_val:
          self.data.append(self.min_val)
          self.min_val = x

        self.data.append(x)

    def pop(self):
        """
        :rtype: None
        """
        if self.data[-1] == self.min_val:
          self.data.pop()
          self.min_val = self.data[-1]
          self.data.pop()
        else:
          self.data.pop()

    def top(self):
        """
        :rtype: int
        """
        return self.data[-1]

    def getMin(self):
        """
        :rtype: int
        """
        return self.min_val


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(x)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()