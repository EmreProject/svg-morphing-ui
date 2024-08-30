//my svg morphing lib
import * as mySvgMorph from "./svgMorph" //my lib


let svgFrom_,svgTo_;

let backUp={
    BezierFrom:undefined,
    BezierTo:undefined
};


function setSvgResult(svgFrom,svgTo){

    svgFrom_=svgFrom;
    svgTo_=svgTo;

   backUp.BezierFrom=[...svgFrom_.morphing.bezierPoints];
   backUp.BezierTo=[...svgTo_.morphing.bezierPoints];

}


const startButton=document.querySelector("button.start-morph");
const resultDiv=document.querySelector(".result-svg");
const backButton=resultDiv.querySelector(".back");;
const easingSelector=resultDiv.querySelector("select#easing");


function loadEasingFunctions(){

    [...easingSelector.children].forEach(a=>a.remove());


    mySvgMorph.easingFuncs.forEach((value,key)=>{

        const opt=`<option value="${key}">${key}</option>`
        easingSelector.insertAdjacentHTML("beforeend",opt);

    });

}
loadEasingFunctions();


const codeOutput={
htmlTexArea:resultDiv.querySelector(".html-part"),
jsTexArea:resultDiv.querySelector(".js-part"),
html:"",
js:""

};

startButton.addEventListener("click",()=>{

   
    svgFrom_.morphing.bezierPoints=[...backUp.BezierFrom];
    svgTo_.morphing.bezierPoints=[...backUp.BezierTo];
    

    const duration=Number(resultDiv.querySelector(".duration").value);
    console.log(duration);

    const resultDivChilds=[...resultDiv.children];
    resultDivChilds.forEach(a=> {if(a.tagName=="svg"){a.remove();}});

    const easingFuncResult=mySvgMorph.easingFuncs.get(easingSelector.value);
    console.log(easingFuncResult(0.5));

        console.log(svgFrom_.svgElement);
        console.log(svgTo_.svgElement);

    const resultSvg=svgFrom_.svgElement.cloneNode(true);;
    resultSvg.classList.add("svg-end-result")
    const resultSvgPath=resultSvg.querySelector("path");
    resultSvgPath.classList.add("path-end-result")
    
    resultDiv.insertBefore(resultSvg, resultDiv.firstChild);
    const eraseCircles=[...resultSvg.querySelectorAll("circle")];
    const eraseTexts=[...resultSvg.querySelectorAll("text")];
    eraseCircles.forEach(circ=>circ.remove());
    eraseTexts.forEach(text=>text.remove());

       // console.log(resultSvg.outerHTML);

       codeOutput.htmlTexArea.textContent=resultSvg.outerHTML
       codeOutput.html=resultSvg.outerHTML;


    let pointNumberFrom=svgFrom_.morphing.bezierLength;
    let pointNumberTo=svgTo_.morphing.bezierLength;
   
        const difference=Math.abs(pointNumberFrom-pointNumberTo);

    if(pointNumberFrom<pointNumberTo){
        mySvgMorph.addNewPoints(svgFrom_.morphing.bezierPoints,difference);
    }else{

        mySvgMorph.addNewPoints(svgTo_.morphing.bezierPoints,difference);
    }

    const widthFrom=Number(resultSvg.getAttribute("width").slice(0,-2));
    const heightFrom=Number(resultSvg.getAttribute("height").slice(0,-2));
    console.log(widthFrom,heightFrom);


    const widthTo=Number(svgTo_.svgElement.getAttribute("width").slice(0,-2));
    const heightTo=Number(svgTo_.svgElement.getAttribute("height").slice(0,-2));

    let viewBoxFrom= String(svgFrom_.svgElement.getAttribute("viewBox")).split(" ");
    let viewBoxTo=String(svgTo_.svgElement.getAttribute("viewBox")).split(" ");

    const convertToNumber=function(arr){

        return arr.map(a=>Number(a));

    }
    viewBoxFrom=convertToNumber(viewBoxFrom)
    viewBoxTo=convertToNumber(viewBoxTo)
    console.log(viewBoxFrom,viewBoxTo)

    //from and to svg elements attributes from html svg element
    const svgAttribs=mySvgMorph.getSvgAttributes(
        [widthFrom,widthTo], //width
        [heightFrom,heightTo], //height
         [viewBoxFrom[0],viewBoxTo[0]], //viewx
        [viewBoxFrom[1],viewBoxTo[1]], //viewy
        [viewBoxFrom[2],viewBoxTo[2]], //viewwidth
        [viewBoxFrom[3],viewBoxTo[3]] //viewheight
    );

    console.log(svgAttribs);


const jsonParameters={
svgfrom:[...svgFrom_.morphing.bezierPoints],
svgto:[...svgTo_.morphing.bezierPoints],
duration:duration,
svgAttribs:svgAttribs,

}


const jsonToString=JSON.stringify(jsonParameters);
console.log(JSON.parse(jsonToString),jsonParameters);

    codeOutput.js=
    `

    const resultSvg=document.querySelector(".svg-end-result");
    const resultSvgPath=document.querySelector(".path-end-result");
    const svgJson=\`${jsonToString}\`;
    const svgParams = JSON.parse(svgJson);
    svgParams.easing=${mySvgMorph.easingFuncsString.get(easingSelector.value)};


    mySvgMorph.animate(svgParams.svgfrom,svgParams.svgto,{svgElement: resultSvg,svgPathElement:resultSvgPath, timing:svgParams.easing, duration:svgParams.duration},svgParams.svgAttribs);
    `;


    codeOutput.jsTexArea.textContent=codeOutput.js;
    
    mySvgMorph.animate(svgFrom_.morphing.bezierPoints,svgTo_.morphing.bezierPoints,{svgElement: resultSvg,svgPathElement:resultSvgPath, timing:easingFuncResult, duration:duration},svgAttribs);
    //console.log(mySvgMorph.pointsToString(newBezierPoints));

});


backButton.addEventListener("click",function(){

    svgFrom_.morphing.bezierPoints=[...backUp.BezierFrom];
    svgTo_.morphing.bezierPoints=[...backUp.BezierTo];

});



export {setSvgResult}
