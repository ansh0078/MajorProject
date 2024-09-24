const express = require("express");
const app = express();

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