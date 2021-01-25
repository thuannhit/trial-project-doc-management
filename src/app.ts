import express from "express";

import dotenv from "dotenv";
import passport from "passport";
import logger from "morgan";
import path from "path";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';
import errorHandler from "errorhandler";
dotenv.config();
import routerIndex from "./routes"
import swagger from './_helpers/swagger'
// import "./handlers/passport";

// import environmental variables from our variables.env file

// Create Express server
const app = express();

app.use(helmet());
app.use(passport.initialize());
// view engine setup
app.set("views", path.join(__dirname, "../views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(compression());
app.use(cors());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "../public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerIndex);

// swagger docs route
// app.use('/api-docs', swagger);

app.get("*", (req: express.Request, res: express.Response) =>{
    return res.status(404).redirect("/404");
});

if (app.get("env") === "development") {
    app.use(errorHandler());
    app.locals.pretty = true;
}

export default app;