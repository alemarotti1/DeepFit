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
            let token_acesso_relogio = "ya29.a0Ael9sCNOA2ukcv8hVyw122lld24Urv3ziKIKYlAe2Ca_9Ok21hkHvyq5er2WYt-IeyhIwqtD_5Oh0lL1oLBrJzboAH6bklR1eqLG-C3O5Nba80ekhJM8EsKl6wTZW4XLRYIsJlcO6q7SYaKKmYHvw0-s37hXaCgYKAUwSARISFQF4udJhlzxQrgdnS-MK07BsdwkGZQ0163";
            let data;
            return new Promise((resolve, reject) => {
                getDataFromGoogleFit.getDataFromGoogleFit(token_acesso_relogio, 1680318000000, 1681141293355, 86400000, 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:GoogleFitSyncHelper - heartrate').then((returned_data) => {
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
