class Solution {
  public String removeDuplicates(String S) {
    StringBuffer stack = new StringBuffer();
    int top = -1;
    for (int i = 0; i < S.length(); ++i) {
      char ch = S.charAt(i);
      if (top >= 0 && stack.charAt(top) == ch) {
        stack.deleteCharAt(top);
        --top;
      } else {
        stack.append(ch);
        ++top;
      }
    }
    return stack.toString();
  }
}