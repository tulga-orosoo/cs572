"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var University = /** @class */ (function () {
    function University(n, d) {
        this.name = n;
        this.dept = d;
    }
    University.prototype.graduation = function (year) {
        console.log("Graduating " + this.dept + " " + year + " students");
    };
    return University;
}());
exports.University = University;
