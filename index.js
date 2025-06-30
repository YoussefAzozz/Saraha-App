
import express from "express";
import boostrap from "./src/index.Router.js";
const app = express();


boostrap(app,express);

app.listen(port,()=>{
    console.log(`Server is listening on port.......... ${port}`);
});
