class Solution:
    def checkRecord(self, s: str) -> bool:
        absents = lates = 0
        for i, c in enumerate(s):
            if c == "A":
                absents += 1
                if absents >= 2:
                    return False
            if c == "L":
                lates += 1
                if lates >= 3:
                    return False
            else:
                lates = 0
        
        return True