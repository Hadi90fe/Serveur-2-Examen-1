// Importation des modules nécessaires au fichier serveur.ts
import express from "express";
import { Request } from "express";
import { Response } from "express";
//import express from "express";
// import { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
// import { controleurFilms } from "./app/src/serveur/film/controleurFilm";
import { Ctl_Films_gestionActions } from "./app/src/serveur/Film/controleurFilm";

// Création d'un serveur Node dont les requêtes entrantes
// et sortantes sont gérées par express.

const exp = express();
const serveur = http.createServer(exp);
const porte = 8080;
serveur.listen(porte); // Famille des 8080-8888
console.log(`\nServeur démarré sur le port ${porte}`);

// Pour obtenir les ressources statiques css, js, images, ...
// qui partiront avec vos pages web via les balises link, script, <img src=
const clientFolderPath = path.join(__dirname, 'app', 'src', 'client');
exp.use('/client', express.static(clientFolderPath));
// Support json encoded bodies
exp.use(bodyParser.json());
// Support text encoded bodies
exp.use(bodyParser.text());
// Support text encoded bodies
exp.use(express.urlencoded({ extended: true }));

//Traiter les requêtes provenant du client et les réponses à retourner au client
exp.get("/", async (req: Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "/app/src/index.html"));
});

exp.all("/film", async (req: express.Request, res: express.Response) => {
  let reponse = await Ctl_Films_gestionActions(req);
  res.send(reponse);
});


