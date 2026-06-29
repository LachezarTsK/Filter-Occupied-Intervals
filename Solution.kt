
import kotlin.math.max

class Solution {

    private var freeStart = 0
    private var freeEnd = 0

    fun filterOccupiedIntervals(occupiedIntervals: Array<IntArray>, freeStart: Int, freeEnd: Int): List<List<Int>> {
        this.freeStart = freeStart
        this.freeEnd = freeEnd

        val filteredOccupiedIntervals = mutableListOf<MutableList<Int>>()
        occupiedIntervals.sortWith() { x, y -> x[0] - y[0] }

        var i = 0
        while (i < occupiedIntervals.size) {

            val startIndex = i
            var end = occupiedIntervals[i][1]

            while (i < occupiedIntervals.size && end + 1 >= occupiedIntervals[i][0]) {
                end = max(end, occupiedIntervals[i][1])
                ++i
            }
            if (startIndex < i) {
                --i
            }

            val start = occupiedIntervals[startIndex][0]
            updateFilteredOccupiedIntervals(filteredOccupiedIntervals, start, end)
            ++i
        }

        return filteredOccupiedIntervals
    }

    private fun updateFilteredOccupiedIntervals(filteredOccupiedIntervals: MutableList<MutableList<Int>>, start: Int, end: Int) {
        if (toIncludeCompletely(start, end)) {
            filteredOccupiedIntervals.add(mutableListOf(start, end))
            return
        }

        if (toCorrectStart(start, end)) {
            filteredOccupiedIntervals.add(mutableListOf(freeEnd + 1, end))
            return
        }

        if (toCorrectEnd(start, end)) {
            filteredOccupiedIntervals.add(mutableListOf(start, freeStart - 1))
            return
        }

        if (toCorrectBothStartAndEnd(start, end)) {
            filteredOccupiedIntervals.add(mutableListOf(start, freeStart - 1))
            filteredOccupiedIntervals.add(mutableListOf(freeEnd + 1, end))
        }
    }

    private fun toIncludeCompletely(start: Int, end: Int): Boolean {
        return start > freeEnd || end < freeStart
    }

    private fun toCorrectStart(start: Int, end: Int): Boolean {
        return start >= freeStart && end > freeEnd
    }

    private fun toCorrectEnd(start: Int, end: Int): Boolean {
        return start < freeStart && end <= freeEnd
    }

    private fun toCorrectBothStartAndEnd(start: Int, end: Int): Boolean {
        return start < freeStart && end > freeEnd
    }
}
