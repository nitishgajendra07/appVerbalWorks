"use strict";
console.log("In appEntry.ts");
let option1 = document.getElementById("option1"); // Corrected ID for option1
if (option1) {
    option1.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked 1");
        window.location.href = "verbal.html";
    });
}
let option2 = document.getElementById("option2"); // Corrected ID for option2
if (option2) {
    option2.addEventListener("click", (e) => {
        console.log("clicked 2");
        window.location.href = "aptitude.html";
    });
}
let option3 = document.getElementById("option3");
if (option3) {
    option3.addEventListener("click", (e) => {
        console.log("clicked 3");
        window.location.href = "programming.html";
    });
}
