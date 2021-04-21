import { Router } from 'express';
import { getAllData , addData, saveData, getSpecificUser, updateData, deleteData } from "../controllers/controller.mjs";

export const router = Router();

router.get("/", getAllData);

router.get("/add", addData);

router.post("/save", saveData);

router.get("/edit/:userId", getSpecificUser);

router.post("/update", updateData);

router.get("/delete/:userId", deleteData);

