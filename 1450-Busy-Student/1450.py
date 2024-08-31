class Solution:
    def busyStudent(self, startTime: List[int], endTime: List[int], queryTime: int) -> int:
        startTime.sort()
        endTime.sort()
        return bisect_right(startTime, queryTime) - bisect_left(endTime, queryTime)