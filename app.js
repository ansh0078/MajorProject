const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Listing = require("./models/listing.js");
const app = express();
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(() =>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});


app.get("/", (req, res) =>{
    res.send("Hi, i'm root..");
});

app.get("/listings", async (req,res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", {allListing});
});

app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});

app.get("/listings/:id", async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

app.post("/listings", async(req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit", async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

app.put("/listings/:id", async(req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async(req,res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
});


// app.get("/testListing", async(req, res) =>{
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "by the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });