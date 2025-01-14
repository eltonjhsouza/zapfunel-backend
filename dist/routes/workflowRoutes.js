"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowRouter = void 0;
const express_1 = __importDefault(require("express"));
const workflowController_1 = require("../controllers/workflowController");
const router = express_1.default.Router();
exports.workflowRouter = router;
router.post('/create', workflowController_1.createWorkflowHandler);
router.get('/', workflowController_1.getWorkflows);
router.post('/receive/:workflowid', workflowController_1.workFlowReceiveHandler);
//# sourceMappingURL=workflowRoutes.js.map