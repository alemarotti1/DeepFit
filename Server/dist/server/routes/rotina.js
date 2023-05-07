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
const RotinaRouter = express.Router();
RotinaRouter.post('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    if (!(req.body.nome_rotina && req.body.token_acesso)) {
        res.status(400).send("Bad Request");
        return;
    }
    let aluno = null;
    try {
        aluno = yield config_1.default.aluno.findFirst({
            where: {
                token_acesso: req.body.token_acesso,
                treinador_usuario: req.body.user
            }
        });
        if (!aluno)
            res.status(400).send("Aluno não encontrado");
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }
    const rotina = yield config_1.default.rotina.create({
        data: {
            nome_rotina: req.body.nome_rotina,
            token_acesso: req.body.token_acesso,
        }
    });
    config_1.default.$disconnect();
    res.status(201).json(rotina);
}));
RotinaRouter.get('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const trainer_id = req.body.user;
    let alunos = null;
    try {
        alunos = yield config_1.default.aluno.findMany({
            where: {
                treinador_usuario: trainer_id
            },
            include: {
                rotina: true
            }
        });
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }
    config_1.default.$disconnect();
    res.send(alunos);
}));
RotinaRouter.get('/:tokenAcessoAluno/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const aluno = yield config_1.default.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcessoAluno
        },
        include: {
            rotina: true
        }
    });
    config_1.default.$disconnect();
    res.send(aluno === null || aluno === void 0 ? void 0 : aluno.rotina);
}));
RotinaRouter.get('/:tokenAcessoAluno/:nomeRotina', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const aluno = yield config_1.default.aluno.findFirst({
        where: {
            token_acesso: req.params.tokenAcessoAluno
        }
    });
    if (!aluno) {
        res.status(400).send("Aluno não encontrado");
        return;
    }
    const rotina = yield config_1.default.rotina.findFirst({
        where: {
            aluno: {
                token_acesso: req.params.tokenAcessoAluno
            },
            nome_rotina: req.params.nomeRotina
        }
    });
    config_1.default.$disconnect();
    res.send(rotina);
}));
RotinaRouter.delete('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    if (!(req.body.nome_rotina && req.body.token_acesso)) {
        res.status(400).send("Bad Request");
        return;
    }
    let aluno = null;
    try {
        aluno = yield config_1.default.aluno.findFirst({
            where: {
                token_acesso: req.body.token_acesso,
                treinador_usuario: req.body.user
            }
        });
        if (!aluno)
            res.status(400).send("Aluno não encontrado");
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
        return;
    }
    const rotina = yield config_1.default.rotina.delete({
        where: {
            nome_rotina_token_acesso: {
                nome_rotina: req.body.nome_rotina,
                token_acesso: req.body.token_acesso
            }
        }
    });
    res.status(200).json(rotina);
}));
exports.default = RotinaRouter;
