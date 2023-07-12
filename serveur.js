"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des modules nécessaires au fichier serveur.ts
const express_1 = __importDefault(require("express"));
//import express from "express";
// import { NextFunction, Request, Response } from "express";
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// import { controleurFilms } from "./app/src/serveur/film/controleurFilm";
const controleurFilm_1 = require("./app/src/serveur/Film/controleurFilm");
// Création d'un serveur Node dont les requêtes entrantes
// et sortantes sont gérées par express.
const exp = (0, express_1.default)();
const serveur = http_1.default.createServer(exp);
const porte = 8080;
serveur.listen(porte); // Famille des 8080-8888
console.log(`\nServeur démarré sur le port ${porte}`);
// Pour obtenir les ressources statiques css, js, images, ...
// qui partiront avec vos pages web via les balises link, script, <img src=
const clientFolderPath = path_1.default.join(__dirname, 'app', 'src', 'client');
exp.use('/client', express_1.default.static(clientFolderPath));
// Support json encoded bodies
exp.use(body_parser_1.default.json());
// Support text encoded bodies
exp.use(body_parser_1.default.text());
// Support text encoded bodies
exp.use(express_1.default.urlencoded({ extended: true }));
//Traiter les requêtes provenant du client et les réponses à retourner au client
exp.get("/", async (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/app/src/index.html"));
});
exp.all("/film", async (req, res) => {
    let reponse = await (0, controleurFilm_1.Ctl_Films_gestionActions)(req);
    res.send(reponse);
});
