"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceRouter = void 0;
const express_1 = __importDefault(require("express"));
const instanceController_1 = require("../controllers/instanceController");
const router = express_1.default.Router();
exports.instanceRouter = router;
router.post('/create', instanceController_1.createInstance);
router.get('/connectionState/:instanceName', instanceController_1.connectionState);
router.delete('/logout/:instanceName', instanceController_1.logoutInstance);
router.delete('/delete/:instanceName', instanceController_1.deleteInstance);
//# sourceMappingURL=instanceRoutes.js.map