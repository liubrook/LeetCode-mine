from sortedcontainers import SortedDict

class MyCalendarTwo:
    def __init__(self):
        self.cnt = SortedDict()

    def book(self, start: int, end: int) -> bool:
        self.cnt[start] = self.cnt.get(start, 0) + 1
        self.cnt[end] = self.cnt.get(end, 0) - 1
        maxBook = 0
        for c in self.cnt.values():
            maxBook += c
            if maxBook > 2:
                self.cnt[start] = self.cnt.get(start, 0) - 1
                self.cnt[end] = self.cnt.get(end, 0) + 1
                return False
        return True