
/**
 * @param {number[][]} occupiedIntervals
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {number[][]}
 */
var filterOccupiedIntervals = function (occupiedIntervals, freeStart, freeEnd) {
    const filteredOccupiedIntervals = new Array();
    occupiedIntervals.sort((x, y) => x[0] - y[0]);

    for (let i = 0; i < occupiedIntervals.length; ++i) {

        let startIndex = i;
        let end = occupiedIntervals[i][1];

        while (i < occupiedIntervals.length && end + 1 >= occupiedIntervals[i][0]) {
            end = Math.max(end, occupiedIntervals[i][1]);
            ++i;
        }
        if (startIndex < i) {
            --i;
        }

        const start = occupiedIntervals[startIndex][0];
        updateFilteredOccupiedIntervals(filteredOccupiedIntervals, start, end, freeStart, freeEnd);
    }

    return filteredOccupiedIntervals;
};

/**
 * @param {number[][]} filteredOccupiedIntervals
 * @param {number} start
 * @param {number} end
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {void}
 */
function updateFilteredOccupiedIntervals(filteredOccupiedIntervals, start, end, freeStart, freeEnd) {
    if (toIncludeCompletely(start, end, freeStart, freeEnd)) {
        filteredOccupiedIntervals.push([start, end]);
        return;
    }

    if (toCorrectStart(start, end, freeStart, freeEnd)) {
        filteredOccupiedIntervals.push([freeEnd + 1, end]);
        return;
    }

    if (toCorrectEnd(start, end, freeStart, freeEnd)) {
        filteredOccupiedIntervals.push([start, freeStart - 1]);
        return;
    }

    if (toCorrectBothStartAndEnd(start, end, freeStart, freeEnd)) {
        filteredOccupiedIntervals.push([start, freeStart - 1]);
        filteredOccupiedIntervals.push([freeEnd + 1, end]);
    }
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {boolean}
 */
function toIncludeCompletely(start, end, freeStart, freeEnd) {
    return start > freeEnd || end < freeStart;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {boolean}
 */
function toCorrectStart(start, end, freeStart, freeEnd) {
    return start >= freeStart && end > freeEnd;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {boolean}
 */
function toCorrectEnd(start, end, freeStart, freeEnd) {
    return start < freeStart && end <= freeEnd;
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} freeStart
 * @param {number} freeEnd
 * @return {boolean}
 */
function toCorrectBothStartAndEnd(start, end, freeStart, freeEnd) {
    return start < freeStart && end > freeEnd;
}
