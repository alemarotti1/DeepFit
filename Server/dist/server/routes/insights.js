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
const express = __importStar(require("express"));
const HeartRateInsightController_1 = __importDefault(require("../features/insights/heart_rate_insight/HeartRateInsightController"));
const InsightsRouter = express.Router();
InsightsRouter.get('/', function (req, res) {
    //TODO IMPLEMENT THIS
    res.send('Under development');
});
InsightsRouter.get('/sleep_insight', function (req, res) {
    //get the sleep data from the database
    //receive the data from the client: {JWT_token:”token”, token_aluno : “token de acesso do aluno”, date:”dia do insight”}
    console.log(req.body);
    // SleepInsightController.getInsight(req.body.date, req.body.token_aluno, req.body.JWT_token).then(
    //   (required_insight : SleepInsight) => {
    //     res.send({
    //       "title": required_insight,
    //       "description": required_insight.description,
    //       "grade": required_insight.grade,
    //       "sleep_hours": required_insight.sleep_hours
    //   });
    // }).catch((err : any) => {
    //   console.log(err);
    //   res.send(err);
    // });
});
InsightsRouter.get('/heart_rate_insight/:numeroAluno', function (req, res) {
    //get the heart rate data from the database
    const token_relogio = req.body.token_relogio || "0";
    const numero_aluno = req.params.numeroAluno;
    HeartRateInsightController_1.default.getInsight("0", req.body.usuarioTreinador, numero_aluno, token_relogio).then((required_insight) => {
        res.send(required_insight);
    });
});
InsightsRouter.post('/load/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token_relogio = req.body.token_relogio || "0";
        const token_aluno = req.body.token_aluno || "0";
        if (token_aluno == "0") {
            res.status(400).send("Aluno não informado");
            return;
        }
        if (token_relogio == "0") {
            res.status(400).send("Relógio não autorizado");
            return;
        }
        // db.$connect();
        // //check if aluno exists
        // const aluno = await db.aluno.findFirst({
        //   where: {
        //     token_acesso: token_aluno
        //   }
        // });
        // if (!aluno) {
        //   res.status(403).send("Não autorizado");
        //   return;
        // }
        //get data from the api
        const heart_rate_data = yield HeartRateInsightController_1.default.loadAllInsights(token_aluno, token_relogio);
        // db.$disconnect();
        res.send(heart_rate_data);
    });
});
exports.default = InsightsRouter;
