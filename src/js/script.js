
import "@styles/style.css" 


//my svg morphing lib

import borderAnim from "./borderAnimation.js"
import * as svgSettings from "./svgSettings.js"
import {setSvgResult} from "./result.js"

borderAnim();


const settingsPage=document.querySelector(".settings-svg")
const resultPage=document.querySelector(".result-svg");

const resultButton=document.querySelector("button.result");
resultButton.addEventListener("click",()=>{

    if(svgSettings.svgFrom.isChoosen && svgSettings.svgTo.isChoosen){
        setSvgResult(svgSettings.svgFrom,svgSettings.svgTo)

        settingsPage.classList.add("hidden");
        settingsPage.classList.remove("visible");
    
        resultPage.style.transform="translateX(00%)";
        resultPage.classList.add("visible");;
        resultPage.classList.remove("hidden");;
    
       
    }
})


resultPage.querySelector(".back").addEventListener("click",()=>{

    settingsPage.classList.add("visible");
        settingsPage.classList.remove("hidden");

        resultPage.classList.add("hidden");;
        resultPage.classList.remove("visible");;

        setTimeout(()=>{
            resultPage.style.transform="translateX(100%)";

        },1000);

});

window.addEventListener("load",function(){


 this.setTimeout(()=>{
    const cards=[...document.querySelectorAll(".card")];
    cards.forEach(card=>card.classList.add("visible"));
    console.log(cards);

    setTimeout(()=>{

        const resultButton=document.querySelector("button.result");
        resultButton.classList.add("visible");

    },2000)
 },100)

})

/*
//html elements
const svg_from1 =document.querySelector(".svg-shape-1");
const svg_from1_path=document.querySelector(".svg-shape-1 path");
const svg_to1=document.querySelector(".svg-shape-2");
const svg_to1_path=document.querySelector(".svg-shape-2 path");


//Converting path normalize absolute
const fromSvg=new mySvgMorph.AnimationSvgElement(svg_from1,svg_from1_path);
let bezierPoints=mySvgMorph.getBezierCoordinates(fromSvg.getSegments());//converts each bezier curves to list of points array, 93 points
console.log(bezierPoints.length);
bezierPoints=mySvgMorph.addNewPoints(bezierPoints,6); //randomly choosen bezier curves(6 is the number),  create a point at t=0.5
bezierPoints=mySvgMorph.reverseDirection(bezierPoints);
bezierPoints=mySvgMorph.changeStartingPoint(bezierPoints,2);
fromSvg.setPath(mySvgMorph.pointsToString(bezierPoints));


const toSvg=new mySvgMorph.AnimationSvgElement(svg_to1,svg_to1_path);
let bezierPoints2=mySvgMorph.getBezierCoordinates(toSvg.getSegments());//converts each bezier curves to list of points array
console.log(bezierPoints2.length);
bezierPoints2=mySvgMorph.reverseDirection(bezierPoints2);
bezierPoints2=mySvgMorph.changeStartingPoint(bezierPoints2,5);




//Animation
const easeInOutCubic = function (x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };
const resultSvg=document.querySelector(".svg-result .svg-shape-1");
const resultSvgPath=document.querySelector(".svg-result .svg-shape-1 path");


//from and to svg elements attributes from html svg element
const svgAttribs=mySvgMorph.getSvgAttributes(
    [200,200], //width
    [200,200], //height
    [0,0], //viewx
    [0,0], //viewy
    [512,200], //viewwidth
    [512,200] //viewheight
);

mySvgMorph.animate(bezierPoints,bezierPoints2,{svgElement: resultSvg,svgPathElement:resultSvgPath, timing:easeInOutCubic, duration:2000},svgAttribs);
//console.log(mySvgMorph.pointsToString(newBezierPoints));



//debugging points to look the direction of points
const svgDebug=new SvgDebugging();
    


svgDebug.set(svg_from1,bezierPoints);
svgDebug.fontSize="10rem";
svgDebug.radius=20;
svgDebug.drawPoints(0,8,13,16);

svgDebug.set(svg_to1,bezierPoints2);
svgDebug.fontSize="0.5rem";
svgDebug.radius=2;
svgDebug.drawPoints(0,8,13,16);

*/