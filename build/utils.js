"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = void 0;
const axios_1 = __importDefault(require("axios"));
function fetch(url, config) {
    return axios_1.default.get(url, config);
}
exports.fetch = fetch;
//# sourceMappingURL=utils.js.map