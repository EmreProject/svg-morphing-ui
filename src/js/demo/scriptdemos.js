import "@styles/styledemo1.css"
//import img1 from "/images/purplegradient.jpg"
import svgLoader from "@scripts/demo/svgLoader.js";
import * as hamburgerTransition from "@scripts/demo/hamburgerTransition.js";


//debug-test-loading svgs
svgLoader.shapesLoadPromise.then(()=>{

   svgLoader.shapeList.forEach(element => {
      svgDiv.insertAdjacentHTML("beforeend",element);
   });
   
   });
const svgDiv=document.querySelector(".svg-shapes");

//debug button
const debugButton=document.querySelector(".debug");
debugButton.addEventListener("click",()=>{window.location="debugMenu.html"})



//loading hamburger svg
const hamburgerDiv=document.querySelector(".menu .hamburger")
hamburgerDiv.getAttribute("isOpen");
svgLoader.shapesLoadPromise.then(()=>{

   hamburgerDiv.insertAdjacentHTML("beforeend",svgLoader.shapeList[3]);

   const hamburger=hamburgerDiv.querySelector("svg");

   //hamburger menu lines
   const [up,middle,bottom]=hamburger.querySelectorAll("path");
   //console.log(up,middle,bottom)

   hamburgerTransition.loadHamburgerTransition(hamburgerDiv,up,middle,bottom);


});


