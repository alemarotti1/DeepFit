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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importStar(require("../config"));
const jwt = __importStar(require("jsonwebtoken"));
const AuthRouter = express.Router();
AuthRouter.get('/', function (req, res) {
    //cannot GET
    res.status(301).send('Cannot GET');
});
AuthRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.usuario || !req.body.senha) {
            res.status(400).send('Bad Request');
            console.log(req.body);
            return;
        }
        let user = req.body.usuario;
        let password = req.body.senha ? req.body.senha : ``;
        config_1.default.$connect();
        const trainer = yield config_1.default.treinador.findUnique({
            where: {
                usuario: user
            }
        });
        let password_hashed = (trainer === null || trainer === void 0 ? void 0 : trainer.senha) ? trainer.senha : ``;
        let logged = bcrypt.compareSync(password, password_hashed);
        if (logged && trainer)
            jwt.sign({
                user: trainer.usuario,
                CREF: trainer.CREF ? trainer.CREF : null,
                nome: trainer.nome ? trainer.nome : null,
                email: trainer.email ? trainer.email : null,
            }, config_1.secret_key, (err, token) => {
                if (err)
                    res.status(500).send('Internal Server Error');
                else {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(200).send('Logged in');
                }
            });
        else
            res.status(401).send('Unauthorized');
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
}));
AuthRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //check if user exists
    //if exists, update, except for password
    //if not, create
    try {
        config_1.default.$connect();
        if (!req.body.usuario) {
            console.log(req);
            res.status(400).send('Bad Request');
            return;
        }
        let user = yield config_1.default.treinador.findUnique({
            where: {
                usuario: req.body.usuario
            }
        });
        if (user) {
            config_1.default.treinador.update({
                where: {
                    usuario: req.body.usuario
                },
                data: {
                    nome: req.body.nome ? req.body.nome : user.nome,
                    email: req.body.email ? req.body.email : user.email,
                    CREF: req.body.CREF ? req.body.CREF : user.CREF,
                    usuario: req.body.usuario,
                }
            });
            res.status(200).send('Updated');
        }
        else {
            config_1.default.treinador.createMany({
                data: [{
                        nome: req.body.nome ? req.body.nome : null,
                        email: req.body.email ? req.body.email : null,
                        CREF: req.body.CREF ? req.body.CREF : null,
                        usuario: req.body.usuario,
                        senha: bcrypt.hashSync(req.body.senha, config_1.hashNumber),
                    }]
            }).then(() => {
                res.status(200).send('Updated');
            }).catch((err) => {
                res.status(500).send('Internal Server Error');
                console.log(err);
            });
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
}));
exports.default = AuthRouter;
