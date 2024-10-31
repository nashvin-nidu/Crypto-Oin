//Imported Required Pakages
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {log} from "console";
import { builtinModules } from "module";
import exp from "constants";

//Started Express 
const app = express();
const port = 30000;

//API Specifications
const API_URL = "https://coinlib.io/api/v1"
const API_KEY = ""

//Enabled Body-Parser Middile Ware
app.use(bodyParser.urlencoded({ extended:true }));

//Set Public Folder as static
app.use(express.static("Public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    const symbol = req.body.Symbol;
    log(symbol);
    
    try{
        const result = await axios.get(`https://coinlib.io/api/v1/coin?key=${API_KEY}&pref=USD&symbol=${symbol}`);
        log(result.data)
        res.render("index.ejs", {
            data: result.data,
            // name: result.data.name,
            // symbol: result.data.symbol,
            // rank: result.data.rank,
            // price: result.data.price,
            // market_cap: result.data["market_cap"],
            // high_24: result.data["high_24h"],
            // low_24: result.data["low_24h"]
            
        })
    } catch (error){
        res.render("index.ejs", {
            error: error.response.data.detail
        });
    }
});

app.post("/clear", (req, res) => {
    res.redirect("/");
})

app.listen(port, () =>{
    log("The Server Is Started: ", port)
})



