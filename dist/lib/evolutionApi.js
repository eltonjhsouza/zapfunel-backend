"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const evolutionApiClient = axios_1.default.create({
    baseURL: process.env.EVOLUTION_API_URL || 'https://api2.zapime.com.br',
    headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.EVOLUTION_API_KEY
    },
});
exports.default = evolutionApiClient;
//# sourceMappingURL=evolutionApi.js.map