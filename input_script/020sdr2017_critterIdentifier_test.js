var Nightmare = require("nightmare");
require('nightmare-upload')(Nightmare);
var nightmare = Nightmare({ show: true });
nightmare
    .goto("http://fierce-meadow-35168.herokuapp.com")
    .wait(1000)
    .click("#finger")
    .wait(1000)
    .type("#inputEmail", 'testemail@testit.com')
    .type("#zipCode", "55555")
    .select("#critterColor", "yellow")
    .wait(1000)
    .select("#critterSize", "medium")
    .wait(1000)
    .select("#critterHairy", "true")
    .wait(1000)
    .select("#critterWeb", "true")
    .wait(1000)
    // .checkOption("#checkNo")
    // .wait(1000)
    // .upload("#imageFile", "../views/images/testImage.JPG")
    // .wait(12000)
    // .click("#submitButton")
    // .wait(60000)
    // .wait(1000)
    .click("#logoImage")
    .wait(1000)
    .click(".image")
    .wait(1000)
    .type(".userComment", "Test comment submitted.")
    .wait(1000)
    .click(".commentButton")
    .wait(1000)
    // .type("#submitName", "Test that this field works")
    // .wait(1000)
    // .click("#closeButton")
    .wait(3000)
    .evaluate(function() {
        return document.title;
    })
    .end()
    .then(function(title) {
        console.log("Web page tested: " + title);
        console.log("URL opened.");
        console.log("Navagated to submit page.")
        console.log("Test email inputed.");
        console.log("Zip Code inputed.");
        console.log("Color selected.");
        console.log("size selected.");
        console.log("Hairy selected.");
        console.log("Spider has a web selected.");
        console.log("Navagated to the landing page.");
        console.log("Navagated to image modal.");
        console.log("Test commment submitted");
    })
    .catch(function(error) {
        console.error("Search failed:", error);
    });