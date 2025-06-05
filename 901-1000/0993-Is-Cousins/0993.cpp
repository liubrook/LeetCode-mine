class Solution {
private:
    // x 的信息
    int x;
    TreeNode* x_parent;
    int x_depth;
    bool x_found = false;

    // y 的信息
    int y;
    TreeNode* y_parent;
    int y_depth;
    bool y_found = false;

public:
    void dfs(TreeNode* node, int depth, TreeNode* parent) {
        if (!node) {
            return;
        }

        if (node->val == x) {
            tie(x_parent, x_depth, x_found) = tuple{parent, depth, true};
        }
        else if (node->val == y) {
            tie(y_parent, y_depth, y_found) = tuple{parent, depth, true};
        }

        // 如果两个节点都找到了，就可以提前退出遍历
        // 即使不提前退出，对最坏情况下的时间复杂度也不会有影响
        if (x_found && y_found) {
            return;
        }

        dfs(node->left, depth + 1, node);

        if (x_found && y_found) {
            return;
        }

        dfs(node->right, depth + 1, node);
    }

    bool isCousins(TreeNode* root, int x, int y) {
        this->x = x;
        this->y = y;
        dfs(root, 0, nullptr);
        return x_depth == y_depth && x_parent != y_parent;
    }
};