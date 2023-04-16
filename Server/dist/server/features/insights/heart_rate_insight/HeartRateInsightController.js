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
const HeartRateInsight_1 = __importDefault(require("./HeartRateInsight"));
const config_1 = __importDefault(require("../../../config"));
class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static getInsight(desired_day, user_id, client_token, token_relogio) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.default.$connect();
            //const heart_rate_data = await db.
            return new HeartRateInsight_1.default(desired_day, user_id, client_token, []);
        });
    }
}
exports.default = HeartRateInsightController;
