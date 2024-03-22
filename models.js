import { Schema, model } from "mongoose";

const DogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isGoodBoy: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Dog = model("Dog", DogSchema);

export { Dog }; // Exportez le modèle Dog en tant qu'élément nommé
