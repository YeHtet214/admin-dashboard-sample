import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from "path";
import * as CustomerServices from "./customerServices.js";

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'yehtet201228',
    port: '5432',
    database: 'posadmin'
})

export const client = await pool.connect();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/customers', async (req, res) => {
    const customers = await CustomerServices.getAllCustomers();
    res.json(customers);
})

app.post('/customers', async (req, res) => {
    console.log(req.body);
    const newCustomer = await CustomerServices.addNewCustomer(req.body);
    res.json(newCustomer);
})

app.delete('/customers/:email', async (req, res) => {
    const email = req.params.email;
    console.log("delete email", email);
    const deletedCus = await CustomerServices.deleteCustomer(email);
    res.json(deletedCus);
})

app.listen(PORT, () => console.log("Server is running on port: ", PORT));