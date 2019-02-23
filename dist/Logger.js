"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static log(...args) {
        console.log(`${new Date().toISOString()}: ${args}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map