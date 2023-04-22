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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const getDataFromGoogleFit = __importStar(require("../../../Api/getDataFromGoogleFit"));
class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static getInsight(desired_day, user_id, client_token, token_relogio) {
        return __awaiter(this, void 0, void 0, function* () {
            //const heart_rate_data = await db.
            let token_acesso_relogio = "ya29.a0Ael9sCP8aHOtjj1IpS8uG0ShdY65ecoErrjbKdeFcxM4JJ7_1EuQiyhnDMvN1U81ZhyNdb8IAintf-SzlgxJylltJGZchrwZttsDSTn0VkXybhwx6B28e11R2T2usjOd5-nb0BGlsjcAnBiF6fKrFfWn0cpGaCgYKAXsSARMSFQF4udJhd08hJI7Hqr3LJRfrhOTWDA0163";
            let data;
            return new Promise((resolve, reject) => {
                const start_time = new Date(desired_day).getTime();
                const end_time = new Date(desired_day).getTime() + 86400000;
                getDataFromGoogleFit.getDataFromGoogleFit(token_acesso_relogio, start_time, end_time, 60000, 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm').then((returned_data) => {
                    data = returned_data;
                    resolve(new HeartRateInsight_1.default(desired_day, user_id, client_token, data));
                }).catch((err) => {
                    data = err;
                    reject(new HeartRateInsight_1.default(desired_day, user_id, client_token, data));
                });
            });
        });
    }
}
exports.default = HeartRateInsightController;
