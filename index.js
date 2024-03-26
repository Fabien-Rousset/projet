import express from "express";
import cors from "cors";
import { json, urlencoded } from "express";
import { connect } from "mongoose";

require('dotenv').config();

import { Dog } from "./models.js";

const app = express(); // Initialisation de l'application Express

app.use(cors()); // Utilisation du middleware CORS
app.use(json()); // Utilisation du middleware pour parser les requêtes JSON
app.use(urlencoded({ extended: true })); // Utilisation du middleware pour parser les données de formulaire

// GET route pour récupérer tous les chiens
app.get("/dogs", async (_req, res) => {
  try {
    const allDogs = await Dog.find();
    return res.status(200).json(allDogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la récupération des chiens" });
  }
});

// POST route pour ajouter un nouveau chien
app.post("/dogs", async (req, res) => {
  try {
    const { name, breed, age, isGoodBoy } = req.body;
    const newDog = new Dog({ name, breed, age, isGoodBoy });
    await newDog.save();
    return res.status(201).json(newDog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de l'ajout du chien" });
  }
});

//UPDATE un chien
app.put("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    await Dog.updateOne({ _id: id }, req.body);
    const updatedDog = await Dog.findById(id);
    return res.status(200).json(updatedDog);
  });


  //DELETE un Chien
  app.delete("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    const deletedDog = await Dog.findByIdAndDelete(id);
    return res.status(200).json(deletedDog);
  });
  




// sécurisation des données sensibles via process.env
const PORT = process.env.PORT || 3000;
const MONGODB_URI =process.env.MONGODB_URI || "mongodb+srv://fabienrousset1981:Mm2VsJR2BbC0Eal@cluster0.lwysolq.mongodb.net/";


//Connnexion à la BDD
const start = async () => {
  try {
    await connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
