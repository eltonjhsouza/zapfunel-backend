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
exports.createEvolutionInstance = void 0;
exports.getConnectionState = getConnectionState;
exports.logoutInstance = logoutInstance;
exports.deleteInstance = deleteInstance;
const evolutionApi_1 = __importDefault(require("../lib/evolutionApi"));
const createEvolutionInstance = (instanceData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield evolutionApi_1.default.post('/instance/create', instanceData);
        return response.data;
    }
    catch (error) {
        console.error('Error creating Evolution API instance:', error);
        throw error;
    }
});
exports.createEvolutionInstance = createEvolutionInstance;
function getConnectionState(instanceName, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield evolutionApi_1.default.get(`/instance/connectionState/${instanceName}`, {
                headers: {
                    "apiKey": apiKey
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Error creating Evolution API instance:', error);
            throw error;
        }
    });
}
function logoutInstance(instanceName, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield evolutionApi_1.default.delete(`/instance/logout/${instanceName}`, {
                headers: {
                    "apiKey": apiKey
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Error creating Evolution API instance:', error);
            throw error;
        }
    });
}
function deleteInstance(instanceName, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield evolutionApi_1.default.delete(`/instance/delete/${instanceName}`, {
                headers: {
                    "apiKey": apiKey
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Error creating Evolution API instance:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=evolutionApiService.js.map