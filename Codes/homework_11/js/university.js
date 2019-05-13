"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function logging(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("wrapper function: before invoking " + propertyKey);
        var result = originalMethod.apply(this, args);
        console.log("wrapped function: after invoking " + propertyKey);
        return result;
    };
}
var University = /** @class */ (function () {
    function University(n, d) {
        this.name = n;
        this.dept = d;
    }
    University.prototype.graduation = function (year) {
        console.log("Graduating " + this.dept + " " + year + " students");
    };
    __decorate([
        logging
    ], University.prototype, "graduation", null);
    return University;
}());
exports.University = University;
