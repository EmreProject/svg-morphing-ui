import * as mySvgMorph from "./svgMorph"
import SvgDebugging from "./svgMorphDebug.js"

const settingsButtons={

from:document.querySelector(".card.from button.settings"),
to:document.querySelector(".card.to button.settings")

}

const nextButton=document.querySelector("button.result");

settingsButtons.from.addEventListener("click",function(){

settingsButtons.to.classList.remove("clicked");

const nextSize=nextButton.getBoundingClientRect();
const topPx=nextSize.top+window.scrollY;
const heightPx=nextSize.bottom+window.scrollY;

const settingsDiv=document.querySelector("div.build-svg-from");
settingsDiv.style.top=`${topPx}px`;
settingsDiv.style.height=`${heightPx}px`;
settingsDiv.classList.toggle("clicked");

});

settingsButtons.to.addEventListener("click",function(){


    settingsButtons.from.classList.remove("clicked");

    const nextSize=nextButton.getBoundingClientRect();
    const heightPx=nextSize.bottom+window.scrollY;

    const settingsDiv=document.querySelector("div.build-svg-to");
   settingsDiv.style.top=`0px`;
   settingsDiv.style.height=`${heightPx}px`;
    settingsDiv.classList.toggle("clicked");
    
    });



//main parameter of loadsvgmorphing
const svgFrom={
    text:undefined,
    svgElement:undefined,
    path:undefined,
    isChoosen:false,

    morphing:{

        animationSvg:undefined,
        bezierPoints:undefined,
        bezierLength:-1,

    }
}


const svgTo={
    text:undefined,
    svgElement:undefined,
    path:undefined,
    isChoosen:false,

    morphing:{

        animationSvg:undefined,
        bezierPoints:undefined,
        bezierLength:-1,
    }
}


function loadSvgMorphing(main,svg,path){


    main.svgElement=svg;
    main.path=path;

    //Converting path normalize absolute
    main.morphing.animationSvg=new mySvgMorph.AnimationSvgElement( main.svgElement, main.path);
    main.morphing.bezierPoints=mySvgMorph.getBezierCoordinates( main.morphing.animationSvg.getSegments());//converts each bezier curves to list of points array,example: 93 points
    //console.log(bezierPoints.length);
    main.morphing.bezierLength= main.morphing.bezierPoints.length;
   
   
   // bezierPoints=mySvgMorph.addNewPoints(bezierPoints,6); //randomly choosen bezier curves(6 is the number),  create a point at t=0.5
    //bezierPoints=mySvgMorph.reverseDirection(bezierPoints);
    //bezierPoints=mySvgMorph.changeStartingPoint(bezierPoints,2);
    //fromSvg.setPath(mySvgMorph.pointsToString(bezierPoints));


}


let loadSettingsCallback={


isFirst:true



}


let startingFont=2;//2rem
let startingRadius=startingFont*10;//20px
let svgDebug=new SvgDebugging();
let pointRange;

//main svgfrom veya svgto
function loadSvgSettingsFrom(main,{startIndex,reverseCheckbox,debugFont,numberPointEl}){

   
    startingFont=2;//2rem
    startingRadius=startingFont*10;//20px
     svgDebug=new SvgDebugging();

    const oldOptions=[...startIndex.querySelectorAll("option")];
    oldOptions.forEach(op=>op.remove());

    const addOption=function(index){
        const newOption=`<option value="${index}">${index}</option>`
        startIndex.insertAdjacentHTML("beforeend",newOption);
    }

    for(let i=0;i<main.morphing.bezierLength;i++){
        addOption(i);
    }


    const resetDebugSvg=function(){

        const eraseCircles=[...main.svgElement.querySelectorAll("circle")];
        const eraseTexts=[...main.svgElement.querySelectorAll("text")];
       
        eraseCircles.forEach(circ=>circ.remove());
        eraseTexts.forEach(text=>text.remove());
    }

    

    numberPointEl.textContent= `${main.morphing.bezierLength}`;

     pointRange=Math.floor(main.morphing.bezierLength/3);


   
    svgDebug.set(main.svgElement, main.morphing.bezierPoints);
    const drawDebugPoints=function(){
        svgDebug.fontSize=`${startingFont}rem`;
        svgDebug.radius=`${startingRadius}px`;
        svgDebug.drawPoints(0,0+pointRange,0+2*pointRange);
    };
    drawDebugPoints();

   const debugMin=()=>{
        resetDebugSvg();
        startingFont-=0.1;
        if(startingFont<0.3){startingFont=0.5}
        startingRadius=startingFont*10;
        
        drawDebugPoints();}

    //debugFont.minus.addEventListener("click",debugMin,true)



    const debugPlu=()=>{
        resetDebugSvg();
        startingFont+=0.1;
        startingRadius=startingFont*10;
        
        drawDebugPoints();
    };
   // debugFont.plus.addEventListener("click",debugPlu,true)



    const startInd=()=>{

        const newStart= Number(startIndex.value);
        console.log(newStart);
        console.log(main.morphing.bezierPoint);
        main.morphing.bezierPoints=mySvgMorph.changeStartingPoint(main.morphing.bezierPoints,newStart);

        main.morphing.animationSvg.setPath(mySvgMorph.pointsToString(main.morphing.bezierPoints));
        resetDebugSvg();
        drawDebugPoints();
    };
   // startIndex.addEventListener("change",startInd,true);



    console.log(reverseCheckbox);
    const revFunc=()=>{

        //console.log(reverseCheckbox.checked);
        console.log(main.morphing.bezierPoints);
        main.morphing.bezierPoints=mySvgMorph.reverseDirection(main.morphing.bezierPoints);
        main.morphing.animationSvg.setPath(mySvgMorph.pointsToString(main.morphing.bezierPoints));
        svgDebug.set(main.svgElement, main.morphing.bezierPoints);
        console.log(main.morphing.bezierPoints);
        resetDebugSvg();
        drawDebugPoints();
     
    };
   // reverseCheckbox.addEventListener("change",revFunc,true);



    if(loadSettingsCallback.isFirst){

        reverseCheckbox.addEventListener("change",revFunc,true);
        startIndex.addEventListener("change",startInd,true);
        debugFont.plus.addEventListener("click",debugPlu,true)

        debugFont.minus.addEventListener("click",debugMin,true)


    }

    loadSettingsCallback.isFirst=false;

    /*
    loadSettingsCallback.reverse=revFunc;
    loadSettingsCallback.startingPoint=startInd;
    loadSettingsCallback.debugFontMinus=debugMin;
    loadSettingsCallback.debugFontPlus=debugPlu;
*/
}


let loadSettingsCallback2={


    isFirst:true
    
    
    
    }
    
    
    let startingFont2=2;//2rem
    let startingRadius2=startingFont2*10;//20px
    let svgDebug2=new SvgDebugging();
    let pointRange2;
    
    //main svgfrom veya svgto
    function loadSvgSettingsTo(main,{startIndex,reverseCheckbox,debugFont,numberPointEl}){
    
       
        startingFont2=2;//2rem
        startingRadius2=startingFont2*10;//20px
         svgDebug2=new SvgDebugging();
    
        const oldOptions=[...startIndex.querySelectorAll("option")];
        oldOptions.forEach(op=>op.remove());
    
        const addOption=function(index){
            const newOption=`<option value="${index}">${index}</option>`
            startIndex.insertAdjacentHTML("beforeend",newOption);
        }
    
        for(let i=0;i<main.morphing.bezierLength;i++){
            addOption(i);
        }
    
    
        const resetDebugSvg=function(){
    
            const eraseCircles=[...main.svgElement.querySelectorAll("circle")];
            const eraseTexts=[...main.svgElement.querySelectorAll("text")];
           
            eraseCircles.forEach(circ=>circ.remove());
            eraseTexts.forEach(text=>text.remove());
        }
    
        
    
        numberPointEl.textContent= `${main.morphing.bezierLength}`;
    
         pointRange2=Math.floor(main.morphing.bezierLength/3);
    
    
       
        svgDebug2.set(main.svgElement, main.morphing.bezierPoints);
        const drawDebugPoints=function(){
            svgDebug2.fontSize=`${startingFont2}rem`;
            svgDebug2.radius=`${startingRadius2}px`;
            svgDebug2.drawPoints(0,0+pointRange2,0+2*pointRange2);
        };
        drawDebugPoints();
    
       const debugMin=()=>{
            resetDebugSvg();
            startingFont2-=0.1;
            if(startingFont2<0.3){startingFont2=0.5}
            startingRadius2=startingFont2*10;
            
            drawDebugPoints();}
    
        //debugFont.minus.addEventListener("click",debugMin,true)
    
    
    
        const debugPlu=()=>{
            resetDebugSvg();
            startingFont2+=0.1;
            startingRadius2=startingFont2*10;
            
            drawDebugPoints();
        };
       // debugFont.plus.addEventListener("click",debugPlu,true)
    
    
    
        const startInd=()=>{
    
            const newStart= Number(startIndex.value);
            console.log(newStart);
            console.log(main.morphing.bezierPoint);
            main.morphing.bezierPoints=mySvgMorph.changeStartingPoint(main.morphing.bezierPoints,newStart);
    
            main.morphing.animationSvg.setPath(mySvgMorph.pointsToString(main.morphing.bezierPoints));
            resetDebugSvg();
            drawDebugPoints();
        };
       // startIndex.addEventListener("change",startInd,true);
    
    
    
        console.log(reverseCheckbox);
        const revFunc=()=>{
    
            //console.log(reverseCheckbox.checked);
            console.log(main.morphing.bezierPoints);
            main.morphing.bezierPoints=mySvgMorph.reverseDirection(main.morphing.bezierPoints);
            main.morphing.animationSvg.setPath(mySvgMorph.pointsToString(main.morphing.bezierPoints));
            svgDebug2.set(main.svgElement, main.morphing.bezierPoints);
            console.log(main.morphing.bezierPoints);
            resetDebugSvg();
            drawDebugPoints();
         
        };
       // reverseCheckbox.addEventListener("change",revFunc,true);
    
    
    
        if(loadSettingsCallback2.isFirst){
    
            reverseCheckbox.addEventListener("change",revFunc,true);
            startIndex.addEventListener("change",startInd,true);
            debugFont.plus.addEventListener("click",debugPlu,true)
    
            debugFont.minus.addEventListener("click",debugMin,true)
    
    
        }
    
        loadSettingsCallback2.isFirst=false;
    
        /*
        loadSettingsCallback.reverse=revFunc;
        loadSettingsCallback.startingPoint=startInd;
        loadSettingsCallback.debugFontMinus=debugMin;
        loadSettingsCallback.debugFontPlus=debugPlu;
    */
    }
    


const cardFrom={

    inputButton:document.querySelector("input#fileFrom"),
    change(){

       
        const svgContainer=document.querySelector(".card.from");
        const settingsSvg=document.querySelector(".build-svg-from");
        const bounding=svgContainer.getBoundingClientRect();
        const bounding2=settingsSvg.getBoundingClientRect();

        let file = this.files[0];

        let reader = new FileReader();
      
        reader.readAsText(file);
    
        reader.onload = function() {
            
            const allSvg=svgContainer.querySelectorAll("svg");
            if(allSvg.length>0){
                allSvg.forEach(svg=>svg.remove());
            }

            const allSvg2=settingsSvg.querySelectorAll("svg");
            if(allSvg2.length>0){
                allSvg2.forEach(svg=>svg.remove());
            }

            svgContainer.insertAdjacentHTML("afterbegin",reader.result);
            settingsSvg.insertAdjacentHTML("afterbegin",reader.result);
           
            svgFrom.text=reader.result;
            svgFrom.isChoosen=true;
         

            const svgEl=svgContainer.querySelector("svg");
            svgEl.setAttribute("width",`${bounding.width-40}px`);
            svgEl.setAttribute("height",`${bounding.height -200}px`);

           
            const svgEl2=settingsSvg.querySelector("svg");
            const svgEl2Path=svgEl2.querySelector("path");
            svgEl2.classList.add("svg-shape-1")
            svgEl2.setAttribute("width",`${bounding2.width/2 <300 ? 300: bounding2.width/2}px`);
            svgEl2.setAttribute("height",`${bounding2.height/2.5}px`);

            
            loadSvgMorphing(svgFrom,svgEl2,svgEl2Path);

            const startIndex=settingsSvg.querySelector("select#startIndexFrom");

            const numberPointEl=settingsSvg.querySelector(".num-points");

            const reverseCheckbox=settingsSvg.querySelector("input#isReverseFrom");

            const debugFont={
                minus:settingsSvg.querySelector(".minus"),
                plus:settingsSvg.querySelector(".plus")
            }
           
            loadSvgSettingsFrom(svgFrom,{startIndex,numberPointEl,reverseCheckbox,debugFont});
          };
    }

};

const cardTo={

    inputButton:document.querySelector("input#fileTo"),
    change(){

       
        const svgContainer=document.querySelector(".card.to");
        console.log(svgContainer);
        const settingsSvg=document.querySelector(".build-svg-to");
        const bounding=svgContainer.getBoundingClientRect();
        const bounding2=settingsSvg.getBoundingClientRect();

        let file = this.files[0];

        let reader = new FileReader();
      
        reader.readAsText(file);
    
        reader.onload = function() {
            
            const allSvg=svgContainer.querySelectorAll("svg");
            if(allSvg.length>0){
                allSvg.forEach(svg=>svg.remove());
            }

            const allSvg2=settingsSvg.querySelectorAll("svg");
            if(allSvg2.length>0){
                allSvg2.forEach(svg=>svg.remove());
            }

            svgContainer.insertAdjacentHTML("afterbegin",reader.result);
            settingsSvg.insertAdjacentHTML("afterbegin",reader.result);

            svgTo.text=reader.result;
            svgTo.isChoosen=true;

            const svgEl=svgContainer.querySelector("svg");



            svgEl.style.width=`${bounding.width-40}px`;
            svgEl.style.height=`${bounding.height -200}px`;

            const svgEl2=settingsSvg.querySelector("svg");
            const svgEl2Path=svgEl2.querySelector("path");
            svgEl2.classList.add("svg-shape-2")
            svgEl2.setAttribute("width",`${bounding2.width/2 <300 ? 300: bounding2.width/2}px`);
            svgEl2.setAttribute("height",`${bounding2.height/2.5}px`);

            loadSvgMorphing(svgTo,svgEl2,svgEl2Path);

            const startIndex=settingsSvg.querySelector("select#startIndexTo");

            const reverseCheckbox=settingsSvg.querySelector("input#isReverseTo");

            const numberPointEl=settingsSvg.querySelector(".num-points");


            const debugFont={
                minus:settingsSvg.querySelector(".minus"),
                plus:settingsSvg.querySelector(".plus")
            }
           
            loadSvgSettingsTo(svgTo,{startIndex,reverseCheckbox,debugFont,numberPointEl});
          };
    }


};

cardFrom.inputButton.addEventListener("change",cardFrom.change);
cardTo.inputButton.addEventListener("change",cardTo.change);


export {svgFrom,svgTo}