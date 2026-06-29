
#include <ranges>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {

    int freeStart{};
    int freeEnd{};

public:
    vector<vector<int>> filterOccupiedIntervals(vector<vector<int>>& occupiedIntervals, int freeStart, int freeEnd) {
        this->freeStart = freeStart;
        this->freeEnd = freeEnd;

        /*
         ranges::sort(occupiedIntervals) will also work.
         However, for this particular problem sorting only 
         by start is enough. There is no need to sort by both start and end.
        */
        vector<vector<int>> filteredOccupiedIntervals;
        ranges::sort(occupiedIntervals, [](const auto& x, const auto& y) {return x[0] < y[0]; });

        for (int i = 0; i < occupiedIntervals.size(); ++i) {

            int startIndex = i;
            int end = occupiedIntervals[i][1];

            while (i < occupiedIntervals.size() && end + 1 >= occupiedIntervals[i][0]) {
                end = max(end, occupiedIntervals[i][1]);
                ++i;
            }
            if (startIndex < i) {
                --i;
            }

            int start = occupiedIntervals[startIndex][0];
            updateFilteredOccupiedIntervals(filteredOccupiedIntervals, start, end);
        }

        return filteredOccupiedIntervals;
    }

private:
    void updateFilteredOccupiedIntervals(vector<vector<int>>& filteredOccupiedIntervals, int start, int end) const {
        if (toIncludeCompletely(start, end)) {
            filteredOccupiedIntervals.push_back({ start, end });
            return;
        }

        if (toCorrectStart(start, end)) {
            filteredOccupiedIntervals.push_back({ freeEnd + 1, end });
            return;
        }

        if (toCorrectEnd(start, end)) {
            filteredOccupiedIntervals.push_back({ start, freeStart - 1 });
            return;
        }

        if (toCorrectBothStartAndEnd(start, end)) {
            filteredOccupiedIntervals.push_back({ start, freeStart - 1 });
            filteredOccupiedIntervals.push_back({ freeEnd + 1, end });
        }
    }

    bool toIncludeCompletely(int start, int end)const {
        return start > freeEnd || end < freeStart;
    }

    bool toCorrectStart(int start, int end) const {
        return start >= freeStart && end > freeEnd;
    }

    bool toCorrectEnd(int start, int end) const {
        return start < freeStart && end <= freeEnd;
    }

    bool toCorrectBothStartAndEnd(int start, int end) const {
        return start < freeStart && end > freeEnd;
    }
};
