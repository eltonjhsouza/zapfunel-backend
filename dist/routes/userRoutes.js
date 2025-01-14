"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/', userController_1.userController.createUser.bind(userController_1.userController));
router.get('/:id', userController_1.userController.getUser.bind(userController_1.userController));
router.put('/:id', userController_1.userController.updateUser.bind(userController_1.userController));
router.delete('/:id', userController_1.userController.deleteUser.bind(userController_1.userController));
//# sourceMappingURL=userRoutes.js.map