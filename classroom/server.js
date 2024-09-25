const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
    secret: "mysupetsecretstring",
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionOption));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
        req.flash("error", "user not registered");
    } else{
    req.flash("success", "user rgistered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.render("page.ejs", {name: req.session.name});
});

app.get("/", (req, res) => {
    res.send("hi i am root");
});

app.get("/user", (req, res) => {
    res.send("get for users");
});

app.get("/user/:id", (req, res) => {
    res.send("get for show users by id");
});

app.post("/user", (req, res) => {
    res.send("get for users update");
});

app.delete("/user/:id", (req, res) => {
    res.send("get for delete for users");
});

app.listen(8000, () => {
    console.log("server is listening to 8000");
});