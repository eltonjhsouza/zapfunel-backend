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
exports.getInstanceByName = exports.softDeleteInstance = exports.updateInstance = exports.getInstanceById = exports.getInstancesByUserId = exports.createInstance = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createInstance = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.create({
        data,
    });
});
exports.createInstance = createInstance;
const getInstancesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
});
exports.getInstancesByUserId = getInstancesByUserId;
const getInstanceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.findUnique({
        where: {
            id,
        },
    });
});
exports.getInstanceById = getInstanceById;
const updateInstance = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.update({
        where: {
            id,
        },
        data,
    });
});
exports.updateInstance = updateInstance;
const softDeleteInstance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.update({
        where: {
            id,
        },
        data: {
            status: false,
            updatedAt: new Date(),
        },
    });
});
exports.softDeleteInstance = softDeleteInstance;
const getInstanceByName = (instanceName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.instances.findFirst({
        where: {
            instanceName: instanceName,
        },
    });
});
exports.getInstanceByName = getInstanceByName;
//# sourceMappingURL=instanceService.js.map