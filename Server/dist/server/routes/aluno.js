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
const config_1 = __importDefault(require("../config"));
const TreinadorController_1 = require("../features/base/TreinadorController");
const AlunoRouter = express.Router();
AlunoRouter.post('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello World!');
}));
AlunoRouter.get('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const trainer_id = req.body.user;
    console.log("trainerid: " + trainer_id);
    const alunos = yield config_1.default.aluno.findMany({
        where: {
            treinador_usuario: trainer_id
        }
    });
    config_1.default.$disconnect();
    res.send(alunos);
}));
AlunoRouter.get('/:tokenAcesso', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const aluno = yield config_1.default.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcesso
        }
    });
    config_1.default.$disconnect();
    res.send(aluno);
}));
AlunoRouter.put('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        config_1.default.$connect();
        if (req.body.token_acesso) {
            let aluno = config_1.default.aluno.findFirst({
                where: {
                    token_acesso: req.body.token_acesso
                }
            });
            if (!aluno)
                res.status(400).send("Aluno não encontrado");
            else {
                let aluno = yield config_1.default.aluno.update({
                    where: {
                        token_acesso: req.body.token_acesso
                    },
                    data: {
                        nome: req.body.nome,
                        nascimento: req.body.nascimento,
                        objetivo: req.body.objetivo,
                    }
                });
                res.send(aluno);
            }
        }
        else {
            let birth = req.body.nascimento ? req.body.nascimento : null;
            if (birth) {
                let birth_split = birth.includes('/') ? birth.split('/') : birth.split('-');
                birth = new Date(parseInt(birth_split[2]), parseInt(birth_split[1]) - 1, parseInt(birth_split[0])).toISOString();
            }
            console.log(birth);
            let aluno = yield config_1.default.aluno.create({
                data: {
                    nome: req.body.nome ? req.body.nome : null,
                    nascimento: birth,
                    objetivo: req.body.objetivo ? req.body.objetivo : null,
                    professor_usuario: {
                        connect: {
                            usuario: req.body.user
                        }
                    }
                }
            });
            res.send(aluno);
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
        config_1.default.$disconnect();
    }
}));
exports.default = AlunoRouter;
