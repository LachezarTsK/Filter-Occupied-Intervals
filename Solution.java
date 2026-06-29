
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {

    private int freeStart;
    private int freeEnd;

    public List<List<Integer>> filterOccupiedIntervals(int[][] occupiedIntervals, int freeStart, int freeEnd) {
        this.freeStart = freeStart;
        this.freeEnd = freeEnd;

        List<List<Integer>> filteredOccupiedIntervals = new ArrayList<>();
        Arrays.sort(occupiedIntervals, (x, y) -> x[0] - y[0]);

        for (int i = 0; i < occupiedIntervals.length; ++i) {

            int startIndex = i;
            int end = occupiedIntervals[i][1];

            while (i < occupiedIntervals.length && end + 1 >= occupiedIntervals[i][0]) {
                end = Math.max(end, occupiedIntervals[i][1]);
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

    private void updateFilteredOccupiedIntervals(List<List<Integer>> filteredOccupiedIntervals, int start, int end) {
        if (toIncludeCompletely(start, end)) {
            filteredOccupiedIntervals.add(List.of(start, end));
            return;
        }

        if (toCorrectStart(start, end)) {
            filteredOccupiedIntervals.add(List.of(freeEnd + 1, end));
            return;
        }

        if (toCorrectEnd(start, end)) {
            filteredOccupiedIntervals.add(List.of(start, freeStart - 1));
            return;
        }

        if (toCorrectBothStartAndEnd(start, end)) {
            filteredOccupiedIntervals.add(List.of(start, freeStart - 1));
            filteredOccupiedIntervals.add(List.of(freeEnd + 1, end));
        }
    }

    private boolean toIncludeCompletely(int start, int end) {
        return start > freeEnd || end < freeStart;
    }

    private boolean toCorrectStart(int start, int end) {
        return start >= freeStart && end > freeEnd;
    }

    private boolean toCorrectEnd(int start, int end) {
        return start < freeStart && end <= freeEnd;
    }

    private boolean toCorrectBothStartAndEnd(int start, int end) {
        return start < freeStart && end > freeEnd;
    }
}
