"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkflow = exports.getWorkflowsByUserId = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const crypto_1 = __importDefault(require("crypto"));
const getWorkflowsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.workflow.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'asc',
        }
    });
});
exports.getWorkflowsByUserId = getWorkflowsByUserId;
const createWorkflow = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.updatedAt = new Date();
    data.workflowId = crypto_1.default.randomBytes(16).toString('hex').toUpperCase();
    return yield prisma_1.default.workflow.create({
        data,
    });
});
exports.createWorkflow = createWorkflow;
//# sourceMappingURL=workflowService.js.map