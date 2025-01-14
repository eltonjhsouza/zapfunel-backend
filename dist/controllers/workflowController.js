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
exports.workFlowReceiveHandler = exports.getWorkflows = exports.createWorkflowHandler = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const workflowService_1 = require("../services/workflowService");
const client_1 = require("@prisma/client");
const errorHandler_1 = require("../middlewares/errorHandler");
const platformService_1 = require("../services/platformService");
const createWorkflowHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const workflowData = req.body;
        if (!workflowData[0].trigger && ((_a = workflowData[0].trigger) === null || _a === void 0 ? void 0 : _a.type) === 'integration') {
            // criar webhook
        }
        workflowData.userId = 1;
        // Validação básica
        if (!workflowData.name) {
            return res.status(400).json((0, errorHandler_1.defaultErrorHandler)('Name and user are required', 400));
        }
        const workflow = yield (0, workflowService_1.createWorkflow)(workflowData);
        res.status(201).json(workflow);
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // Tratamento de erros específicos do Prisma
            if (error.code === 'P2002') {
                return res.status(400).json((0, errorHandler_1.defaultErrorHandler)('User not found', 400));
            }
        }
        res.status(500).json((0, errorHandler_1.defaultErrorHandler)('Error creating workflow', 400));
    }
});
exports.createWorkflowHandler = createWorkflowHandler;
const getWorkflows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    if (!userId || Array.isArray(userId)) {
        return res.status(400).json((0, errorHandler_1.defaultErrorHandler)('Valid user ID is required', 400));
    }
    try {
        const workflows = yield (0, workflowService_1.getWorkflowsByUserId)(Number(userId));
        res.json(workflows);
    }
    catch (error) {
        res.status(500).json((0, errorHandler_1.defaultErrorHandler)('Error fetching workflows', 400));
    }
});
exports.getWorkflows = getWorkflows;
const workFlowReceiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { workflowid } = req.params;
    if (!workflowid) {
        return res.status(400).json((0, errorHandler_1.defaultErrorHandler)('Workflow ID is required', 400));
    }
    const workflow = yield prisma_1.default.workflow.findMany({
        where: {
            workflowId: workflowid === null || workflowid === void 0 ? void 0 : workflowid.toString(),
        }
    });
    try {
        yield (0, platformService_1.handlePlatformEvent)(platform, workflowid, normalizedData);
        res.json(workflow);
    }
    catch (error) {
        res.status(500).json((0, errorHandler_1.defaultErrorHandler)('Error updating workflow', 400));
    }
});
exports.workFlowReceiveHandler = workFlowReceiveHandler;
//# sourceMappingURL=workflowController.js.map