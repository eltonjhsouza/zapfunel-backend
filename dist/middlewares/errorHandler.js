"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultErrorHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
};
exports.errorHandler = errorHandler;
const defaultErrorHandler = (message, errorCode) => {
    return (req, res, next) => {
        res.status(errorCode).json({ message });
    };
};
exports.defaultErrorHandler = defaultErrorHandler;
//# sourceMappingURL=errorHandler.js.map