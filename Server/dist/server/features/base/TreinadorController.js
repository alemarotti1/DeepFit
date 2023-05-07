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
exports.validateJWT = void 0;
const Treinador_1 = __importDefault(require("../../../general_classes/Treinador"));
const config_1 = __importDefault(require("../../config"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const config_2 = require("../../config");
class TreinadorController {
    static getTreinador(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default.$connect();
            let senha = '';
            const treinador = yield config_1.default.treinador.findUnique({
                where: {
                    usuario: username
                }
            });
            if (treinador === null || treinador === void 0 ? void 0 : treinador.senha)
                senha = treinador.senha;
            if (bcrypt.compareSync(password, senha)) {
                if ((treinador === null || treinador === void 0 ? void 0 : treinador.email) && (treinador === null || treinador === void 0 ? void 0 : treinador.CPF) && (treinador === null || treinador === void 0 ? void 0 : treinador.nome) && (treinador === null || treinador === void 0 ? void 0 : treinador.CREF)) {
                    return new Treinador_1.default(username, treinador.CPF, treinador.email, treinador.nome, treinador.CREF);
                }
            }
            return false;
        });
    }
    static createTreinador(treinador, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default.$connect();
            const treinadorExists = yield config_1.default.treinador.findUnique({
                where: {
                    usuario: treinador.username
                }
            });
            if (treinadorExists)
                return false;
            let salt_rounds = 7;
            if (process.env.SALT_ROUNDS)
                salt_rounds = parseInt(process.env.SALT_ROUNDS);
            const hashedPassword = bcrypt.hashSync(password, salt_rounds);
            yield config_1.default.treinador.create({
                data: {
                    usuario: treinador.username,
                    senha: hashedPassword,
                    CPF: treinador.cpf,
                    email: treinador.email,
                    nome: treinador.nome,
                    CREF: treinador.cref
                }
            });
            config_1.default.$disconnect();
            return true;
        });
    }
    static updateTreinador(treinador) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default.$connect();
            const treinadorExists = yield config_1.default.treinador.findUnique({
                where: {
                    usuario: treinador.username
                }
            });
            if (!treinadorExists)
                return false;
            yield config_1.default.treinador.update({
                where: {
                    usuario: treinador.username
                },
                data: {
                    usuario: treinador.username,
                    CPF: treinador.cpf,
                    email: treinador.email,
                    nome: treinador.nome,
                    CREF: treinador.cref
                }
            });
            config_1.default.$disconnect();
            return true;
        });
    }
    static deleteTreinador(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            config_1.default.$connect();
            let pass = bcrypt.hashSync(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 7);
            let check = yield config_1.default.treinador.findFirst({
                where: {
                    usuario: username,
                    senha: pass
                }
            });
            if (!check)
                return false;
            const treinador = yield config_1.default.treinador.delete({
                where: {
                    usuario: username,
                }
            });
            config_1.default.$disconnect();
            return true;
        });
    }
    /***
     * @param username : string - username of the trainer
     * @param pass : string - password of the trainer
     * @returns token or false if login failed - token is a JWT token
     ***/
    static login(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = username;
            let password = pass ? pass : ``;
            config_1.default.$connect();
            const trainer = yield config_1.default.treinador.findUnique({
                where: {
                    usuario: user
                }
            });
            let password_hashed = (trainer === null || trainer === void 0 ? void 0 : trainer.senha) ? trainer.senha : ``;
            let logged = bcrypt.compareSync(password, password_hashed);
            return new Promise((resolve, reject) => {
                if (logged && trainer) {
                    let user = {
                        user: trainer.usuario,
                        CREF: trainer.CREF ? trainer.CREF : null,
                        nome: trainer.nome ? trainer.nome : null,
                        email: trainer.email ? trainer.email : null,
                    };
                    jwt.sign(user, config_2.secret_key, (err, token) => {
                        if (err)
                            reject('Internal Server Error');
                        else {
                            resolve(token);
                        }
                    });
                }
                else
                    resolve(false);
            });
        });
    }
}
function validateJWT(req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        token = req.headers.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
            return;
        }
    }
    jwt.verify(token, config_2.secret_key, (err, decoded) => {
        if (err) {
            res.status(401).send('Unauthorized: Invalid token');
            res.clearCookie('token');
            return;
        }
        else {
            req.body.user = decoded.user;
            req.body.trainer = decoded;
            next();
        }
    });
}
exports.validateJWT = validateJWT;
exports.default = TreinadorController;
