
class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        int n = arr.size();
        sort(arr.begin(), arr.end());

        int best = INT_MAX;
        vector<vector<int>> ans;
        for (int i = 0; i < n - 1; ++i) {
            if (int delta = arr[i + 1] - arr[i]; delta < best) {
                best = delta;
                ans = {{arr[i], arr[i + 1]}};
            }
            else if (delta == best) {
                ans.emplace_back(initializer_list<int>{arr[i], arr[i + 1]});
            }
        }

        return ans;
    }
};