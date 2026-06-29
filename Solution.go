
package main
import "slices"

var freeStart int
var freeEnd int

func filterOccupiedIntervals(occupiedIntervals [][]int, free_Start int, free_End int) [][]int {
    freeStart = free_Start
    freeEnd = free_End

    filteredOccupiedIntervals := make([][]int, 0)
    slices.SortFunc(occupiedIntervals, func(x []int, y []int) int { return x[0] - y[0] })

    for i := 0; i < len(occupiedIntervals); i++ {

        startIndex := i
        end := occupiedIntervals[i][1]

        for i < len(occupiedIntervals) && end + 1 >= occupiedIntervals[i][0] {
            end = max(end, occupiedIntervals[i][1])
            i++
        }
        if startIndex < i {
            i--
        }

        start := occupiedIntervals[startIndex][0]
        updateFilteredOccupiedIntervals(&filteredOccupiedIntervals, start, end)
    }

    return filteredOccupiedIntervals
}

func updateFilteredOccupiedIntervals(filteredOccupiedIntervals *[][]int, start int, end int) {
    if toIncludeCompletely(start, end) {
        *filteredOccupiedIntervals = append(*filteredOccupiedIntervals, []int{start, end})
        return
    }

    if toCorrectStart(start, end) {
        *filteredOccupiedIntervals = append(*filteredOccupiedIntervals, []int{freeEnd + 1, end})
        return
    }

    if toCorrectEnd(start, end) {
        *filteredOccupiedIntervals = append(*filteredOccupiedIntervals, []int{start, freeStart - 1})
        return
    }

    if toCorrectBothStartAndEnd(start, end) {
        *filteredOccupiedIntervals = append(*filteredOccupiedIntervals, []int{start, freeStart - 1})
        *filteredOccupiedIntervals = append(*filteredOccupiedIntervals, []int{freeEnd + 1, end})
    }
}

func toIncludeCompletely(start int, end int) bool {
    return start > freeEnd || end < freeStart
}

func toCorrectStart(start int, end int) bool {
    return start >= freeStart && end > freeEnd
}

func toCorrectEnd(start int, end int) bool {
    return start < freeStart && end <= freeEnd
}

func toCorrectBothStartAndEnd(start int, end int) bool {
    return start < freeStart && end > freeEnd
}
