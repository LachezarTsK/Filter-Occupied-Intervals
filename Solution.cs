
using System;
using System.Collections.Generic;

public class Solution
{
    private int freeStart;
    private int freeEnd;

    public IList<IList<int>> FilterOccupiedIntervals(int[][] occupiedIntervals, int freeStart, int freeEnd)
    {
        this.freeStart = freeStart;
        this.freeEnd = freeEnd;

        IList<IList<int>> filteredOccupiedIntervals = [];
        Array.Sort(occupiedIntervals, (x, y) => x[0] - y[0]);

        for (int i = 0; i < occupiedIntervals.Length; ++i)
        {
            int startIndex = i;
            int end = occupiedIntervals[i][1];

            while (i < occupiedIntervals.Length && end + 1 >= occupiedIntervals[i][0])
            {
                end = Math.Max(end, occupiedIntervals[i][1]);
                ++i;
            }
            if (startIndex < i)
            {
                --i;
            }

            int start = occupiedIntervals[startIndex][0];
            UpdateFilteredOccupiedIntervals(filteredOccupiedIntervals, start, end);
        }

        return filteredOccupiedIntervals;
    }

    private void UpdateFilteredOccupiedIntervals(IList<IList<int>> filteredOccupiedIntervals, int start, int end)
    {
        if (ToIncludeCompletely(start, end))
        {
            filteredOccupiedIntervals.Add([start, end]);
            return;
        }

        if (ToCorrectStart(start, end))
        {
            filteredOccupiedIntervals.Add([freeEnd + 1, end]);
            return;
        }

        if (ToCorrectEnd(start, end))
        {
            filteredOccupiedIntervals.Add([start, freeStart - 1]);
            return;
        }

        if (ToCorrectBothStartAndEnd(start, end))
        {
            filteredOccupiedIntervals.Add([start, freeStart - 1]);
            filteredOccupiedIntervals.Add([freeEnd + 1, end]);
        }
    }

    private bool ToIncludeCompletely(int start, int end)
    {
        return start > freeEnd || end < freeStart;
    }

    private bool ToCorrectStart(int start, int end)
    {
        return start >= freeStart && end > freeEnd;
    }

    private bool ToCorrectEnd(int start, int end)
    {
        return start < freeStart && end <= freeEnd;
    }

    private bool ToCorrectBothStartAndEnd(int start, int end)
    {
        return start < freeStart && end > freeEnd;
    }
}
