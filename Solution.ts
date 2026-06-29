
function filterOccupiedIntervals(occupiedIntervals: number[][], freeStart: number, freeEnd: number): number[][] {
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

function updateFilteredOccupiedIntervals(filteredOccupiedIntervals: number[][], start: number, end: number, freeStart: number, freeEnd: number): void {
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

function toIncludeCompletely(start: number, end: number, freeStart: number, freeEnd: number): boolean {
    return start > freeEnd || end < freeStart;
}

function toCorrectStart(start: number, end: number, freeStart: number, freeEnd: number): boolean {
    return start >= freeStart && end > freeEnd;
}

function toCorrectEnd(start: number, end: number, freeStart: number, freeEnd: number): boolean {
    return start < freeStart && end <= freeEnd;
}

function toCorrectBothStartAndEnd(start: number, end: number, freeStart: number, freeEnd: number): boolean {
    return start < freeStart && end > freeEnd;
}
