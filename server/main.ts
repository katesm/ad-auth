// @ts-nocheck

import dotenv from "dotenv";
dotenv.config();

// express server
import express from "express";
import session from "express-session";
// import cookieParser from 'cookie-parser'
import * as path from "path";
import router from "./auth";
import msgraph from "./msGraph";

// import * as cookieParser from "cookie-parser";

const app = express();

/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
// @ts-ignore
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set this to true on production
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// @ts-ignore
// app.use(cookieParser());
const app_path = path.join(__dirname, "../dist");
console.log(app_path);
// Point static path to dist
app.use(express.static(app_path));
// Guard routes
// You can use this to protect routes by checking if the user is authenticated or role lookup
function isAuthenticated(req, res, next) {
  if (!req.session.isAuthenticated) {
    return res.redirect("/auth/signin"); // redirect to sign-in route
  }

  next();
}

// send to SPA
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(app_path, "/index.html"));
});
app.get(
  "/user",
  isAuthenticated,
  (req: express.Request, res: express.Response) => {
    // check if user is authenticated

    if (req.session && req.session["isAuthenticated"]) {
      const accessToken = req.session["accessToken"];
      msgraph(accessToken)
        .then((response) => {
          res.json({
            username: req.session["username"],
            name: req.session["name"],
            isAdmin: req.session["isAdmin"],
            isAuthenticated: req.session["isAuthenticated"],
            //Will have mail and other properties from msgraph
            ...response,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({ error: "User is not authenticated" });
    }
  }
);

app.get("user/msgraph", (req: express.Request, res: express.Response) => {
  const accessToken = req.session["access_token"];
  msgraph(accessToken).then((response) => {
    res.json(response);
  });
});
// using auth router
app.use("/auth", router);

// Set Port
const port = process.env.PORT || "3000";
app.set("port", port);

app.listen(port, () => console.log(`API running on localhost:${port}`));
