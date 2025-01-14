"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.logoutInstance = exports.deleteInstance = exports.updateInstance = exports.getInstance = exports.getInstances = exports.connectionState = exports.createInstance = void 0;
const instanceService = __importStar(require("../services/instanceService"));
const evolutionApiService = __importStar(require("../services/evolutionApiService"));
const userService = __importStar(require("../services/userService"));
const crypto_1 = __importDefault(require("crypto"));
const generateHash = () => {
    return crypto_1.default.randomBytes(16).toString('hex').toUpperCase();
};
const createInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, instanceName, owner, profileName, status, serverUrl } = req.body;
        // Check if the user exists
        const user = yield userService.getUserById(Number(userId));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Create the instance data
        const data = {
            userId: user.id,
            instanceName,
            owner,
            profileName,
            status,
            serverUrl,
            updatedAt: new Date(),
        };
        // Create the local instance
        const localInstance = yield instanceService.createInstance(data);
        const payloadInstance = {
            instanceName: localInstance.instanceName,
            token: generateHash(),
            qrcode: true,
        };
        // Create instance in Evolution API
        const evolutionInstance = yield evolutionApiService.createEvolutionInstance(payloadInstance);
        console.log(evolutionInstance);
        // Update the local instance with information from Evolution API
        const updatedInstance = yield instanceService.updateInstance(localInstance.id, {
            instanceId: evolutionInstance.instance.instanceId,
            apiKey: evolutionInstance.hash.apikey,
            userId: localInstance.userId,
            updatedAt: new Date(),
        });
        res.status(201).json(evolutionInstance);
    }
    catch (error) {
        console.error('Error creating instance:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating instance', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Error creating instance', error: 'An unknown error occurred' });
        }
    }
});
exports.createInstance = createInstance;
const connectionState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instanceName } = req.params;
        const instance = yield instanceService.getInstanceByName(instanceName);
        if (!instance) {
            return res.status(404).json({ message: 'Instance not found' });
        }
        const response = yield evolutionApiService.getConnectionState(instance.instanceName, instance.apiKey);
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching instance state:', error);
        res.status(500).json({ message: 'Error fetching instance state', error });
    }
});
exports.connectionState = connectionState;
const getInstances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId || Array.isArray(userId)) {
            return res.status(400).json({ message: 'Valid user ID is required' });
        }
        const instances = yield instanceService.getInstancesByUserId(Number(userId));
        res.json(instances);
    }
    catch (error) {
        console.error('Error fetching instances:', error);
        res.status(500).json({ message: 'Error fetching instances', error });
    }
});
exports.getInstances = getInstances;
const getInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const instance = yield instanceService.getInstanceById(Number(id));
        if (!instance) {
            return res.status(404).json({ message: 'Instance not found' });
        }
        res.json(instance);
    }
    catch (error) {
        console.error('Error fetching instance:', error);
        res.status(500).json({ message: 'Error fetching instance', error });
    }
});
exports.getInstance = getInstance;
const updateInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedInstance = yield instanceService.updateInstance(Number(id), updateData);
        res.json(updatedInstance);
    }
    catch (error) {
        console.error('Error updating instance:', error);
        res.status(500).json({ message: 'Error updating instance', error });
    }
});
exports.updateInstance = updateInstance;
const deleteInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instanceName } = req.params;
        const instance = yield instanceService.getInstanceByName(instanceName);
        if (!instance) {
            return res.status(404).json({ message: 'Instance not found' });
        }
        yield instanceService.softDeleteInstance(instance.id);
        yield evolutionApiService.deleteInstance(instance === null || instance === void 0 ? void 0 : instance.instanceName, instance === null || instance === void 0 ? void 0 : instance.apiKey);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting instance:', error);
        res.status(500).json({ message: 'Error deleting instance', error });
    }
});
exports.deleteInstance = deleteInstance;
const logoutInstance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instanceName } = req.params;
        const instance = yield instanceService.getInstanceByName(instanceName);
        if (!instance) {
            return res.status(404).json({ message: 'Instance not found' });
        }
        const response = yield evolutionApiService.logoutInstance(instance.instanceName, instance.apiKey);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting instance:', error);
        res.status(500).json({ message: 'Error deleting instance', error });
    }
});
exports.logoutInstance = logoutInstance;
//# sourceMappingURL=instanceController.js.map