describe('dc.filters', function () {
    describe('RangedFilter', function () {
        var filter;
        beforeEach(function () {
            filter = dc.filters.RangedFilter(0, 10);
        });

        it('should act like an array', function () {
            expect([filter[0], filter[1]]).toEqual([0, 10]);
        });

        describe("isFiltered", function () {
            it('should return false when the number is out of range', function () {
                expect(filter.isFiltered(1234)).toBeFalsy();
            });

            it('should return true when the number is in range', function () {
                expect(filter.isFiltered(8.1)).toBeTruthy();
            });

            it('should include the left bounds', function () {
                expect(filter.isFiltered(0)).toBeTruthy();
            });

            it('should exclude the right bounds', function () {
                expect(filter.isFiltered(10)).toBeFalsy();
            });
        });
    });

    describe('TwoDimensionalFilter', function () {
        var filter;
        beforeEach(function () {
            filter = dc.filters.TwoDimensionalFilter([1,2]);
        });

        describe('isFiltered', function () {
            it('should return true if both dimensions are equal', function () {
                expect(filter.isFiltered([1,2])).toBeTruthy();
            });

            it('should return false if either dimension is not equal to the filter', function () {
                expect(filter.isFiltered([1,5])).toBeFalsy();
            });

            it('should return false if the dimensionality is less', function () {
                expect(filter.isFiltered([1])).toBeFalsy();
            });

            it('should return false if the dimensionality is more', function () {
                expect(filter.isFiltered([1,2,3])).toBeFalsy();
            });

            it('should return false if the value is not an array', function () {
                expect(filter.isFiltered(1)).toBeFalsy();
            });
        });
    });

    describe('RangedTwoDimensionalFilter', function () {
        var filter;


        it('should return null if filtered with null', function () {
            expect(dc.filters.RangedTwoDimensionalFilter(null)).toBe(null);
        });

        describe('two-dimensional filtering', function () {
            beforeEach(function () {
                filter = dc.filters.RangedTwoDimensionalFilter([[0, 1],[10, 20]])
            });

            it('should return false if on top left of filter rectangle', function () {
                expect(filter.isFiltered([0,1])).toBeTruthy();
            });

            it('should return false if on top right of filter rectangle', function () {
                expect(filter.isFiltered([10,1])).toBeFalsy();
            });

            it('should return false for the bottom left of filter rectangle', function () {
                expect(filter.isFiltered([0,20])).toBeFalsy();
            });

            it('should return true for the bottom right of filter rectangle', function () {
                expect(filter.isFiltered([10,20])).toBeFalsy();
            });

            it('should return true for a point inside the filter rectangle', function () {
                expect(filter.isFiltered([5,5])).toBeTruthy();
            });

            it('should return false for a point to the right and below the filter rectangle', function () {
                expect(filter.isFiltered([11,21])).toBeFalsy();
            });

            it('should return false for a point to the left and above the filter rectangle', function () {
                expect(filter.isFiltered([-1,-1])).toBeFalsy();
            });
        });
    });
});
