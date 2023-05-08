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
    static loadAllInsights(token_aluno, token_relogio) {
        return __awaiter(this, void 0, void 0, function* () {
            //get now time in unix milis
            const now = new Date();
            const now_time = now.getTime();
            //get the last 30 days
            const last_30_days = {};
            for (let i = 30; i > 0; i--) {
                const time = now_time - i * 86400000;
                const date = new Date(time);
                //get the midnight of the day in unix milis
                const midnight = date.setHours(0, 0, 0, 0);
                const date_dd_mm_yyyy = new Date(midnight).toLocaleDateString('pt-BR');
                last_30_days[date_dd_mm_yyyy] = midnight;
            }
            console.log(last_30_days);
            //get the data from google fit for each day
            console.log("getting data from google fit");
            const data = {};
            for (const day in last_30_days) {
                const start_time = last_30_days[day];
                const end_time = last_30_days[day] + 86400000;
                try {
                    const data_watch = yield getDataFromGoogleFit.getDataFromGoogleFit(token_relogio, start_time, end_time, 60000, 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm');
                    data[day] = data_watch;
                }
                catch (err) {
                    console.log(err);
                }
            }
            const mean_heart_rate = {};
            for (const day in data) {
                let sum = 0;
                let count = 0;
                for (const heart_rate in data[day]) {
                    if (data[day][heart_rate]["value"].length > 0) {
                        sum += data[day][heart_rate]["value"][0]["fpVal"];
                        count++;
                    }
                }
                let val = sum / count;
                if (val)
                    mean_heart_rate[day] = val;
            }
            return mean_heart_rate;
        });
    }
}
exports.default = HeartRateInsightController;
