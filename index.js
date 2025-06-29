
import express from "express";
import boostrap from "./src/index.Router.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.join(__dirname,'./config/.env')});
const port = parseInt(process.env.Port);

boostrap(app,express);

app.listen(port,()=>{
    console.log(`Server is listening on port.......... ${port}`);
});
