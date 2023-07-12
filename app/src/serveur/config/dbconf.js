"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenirConnexion = void 0;
//import mysql from 'mysql';
const promise_1 = __importDefault(require("mysql2/promise"));
//export const mysql = mod_mysql;
//Pas de default puisque interdit sur des variables. On récupére par { connexion }
let obtenirConnexion = async () => {
    return promise_1.default
        .createPool({
        connectionLimit: 5,
        waitForConnections: true,
        host: "db4free.net",
        port: 3306,
        user: "elhadiii90",
        password: "Danidani@1990",
        database: "bdexamenfilms",
    });
};
exports.obtenirConnexion = obtenirConnexion;
