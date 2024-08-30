//external svg libs to make svg path to  only containing cubic bezier
import parse from "parse-svg-path";
import abs from "abs-svg-path";
import normalize from "normalize-svg-path";



function getHelperPoint(p1,p2,t){

const helperX=(p2[0]-p1[0]) * t + p1[0];
const helperY=(p2[1]-p1[1]) * t + p1[1];

return [helperX,helperY];

}


//set as array first:svgfrom second:svgto
function getSvgAttributes(width, height, viewx,viewy,viewwidth,viewheight){

return {
    width, height, viewx,viewy,viewwidth,viewheight
}

}


function getBezierCoordinates(svgNormalized){

let dön=[];

for(let i=1;i<svgNormalized.length;i++){


const beforeCurve=svgNormalized[i-1];
const currentCurve=svgNormalized[i];

const startIndex=beforeCurve.length-2;
const startPoint=[
    beforeCurve[startIndex],
    beforeCurve[startIndex+1]
];

const endIndex=currentCurve.length-2;
const endPoint=[
    currentCurve[endIndex],
    currentCurve[endIndex+1]
];

dön.push([
    startPoint, // bezier start point
    [currentCurve[1],currentCurve[2]], // cp1
    [currentCurve[3],currentCurve[4]], // cp2
    endPoint //bezier cureve end point
])

}

return dön;

}


function changeStartingPoint(bezierCoordinates,index){ //index will be the first index
 
const erased=bezierCoordinates.splice(0,index);
bezierCoordinates.push(...erased);
return bezierCoordinates;

}

function reverseDirection(bezierCoordinates){

let dön=[];

for(let i=bezierCoordinates.length-1;i>=0;i--){

dön.push(bezierCoordinates[i]);
dön[dön.length-1].reverse();


}

return dön;

}


//üstteki getbeviercoodrinates dan dönen array icindeki bezier curve arraylerinden bir tanesi parametre olarak
//bu alttaki func icin kullanılan private
function addExtraPoint(singleBezier){

const helperPoints=[];
const t=0.5;
helperPoints[0]=getHelperPoint(singleBezier[0],singleBezier[1],t);
helperPoints[1]=getHelperPoint(singleBezier[1],singleBezier[2],t);
helperPoints[2]=getHelperPoint(singleBezier[2],singleBezier[3],t);
helperPoints[3]=getHelperPoint(helperPoints[0],helperPoints[1],t);
helperPoints[4]=getHelperPoint(helperPoints[1],helperPoints[2],t);
helperPoints[5]=getHelperPoint(helperPoints[3],helperPoints[4],t);

const firstBezier=[

singleBezier[0],
helperPoints[0],
helperPoints[3],
helperPoints[5]

]

const secondBezier=[

    helperPoints[5],
    helperPoints[4],
    helperPoints[2],
    singleBezier[3]
    
    ]

//2 bezier array because we divide according to ratio of t
return [
firstBezier,
secondBezier
];

}


function addNewPoints(bezierArray, numExtraPoints){
for(let i=0;i<numExtraPoints;i++){

    const random=Math.floor(Math.random() *bezierArray.length);
    const [firstBezier,secondBezier] =addExtraPoint(bezierArray[random]);
    bezierArray.splice(random,1,firstBezier,secondBezier);
    
}

return bezierArray;

}



//parameter is from getBezierCoordinates function
function pointsToString(bezierArray){


const firstPoint=bezierArray[0][0];
const dön=[];
dön[0]=["M",firstPoint[0],firstPoint[1]]; //ilk command M oldugu icin


bezierArray.forEach(bezier=>{

 dön.push(["C"]);   
 const index=dön.length-1;

for(let i=1;i<bezier.length;i++){

dön[index].push(bezier[i][0]);
dön[index].push(bezier[i][1]);
}

});


return dön.flat(3).join(" ");

}



class AnimationSvgElement{

    svgElement;
    pathOfSvgElement;

    viewBox;
    width;
    height;

    #segments;

constructor(svgElement,pathOfSvgElement){

this.svgElement=svgElement;
this.pathOfSvgElement=pathOfSvgElement;

this.#segments=normalize(abs(parse(pathOfSvgElement.getAttribute("d"))));

}


setViewBoxTarget(x,y,width,height){

this.viewBox={
    x,
    y,
    width,
    height
}

}

setWidthandHeightTarget(width,height){

this.width=width;
this.height=height;

}


setPath(pathStr){
    this.pathOfSvgElement.setAttribute("d",pathStr);
   }

getPath(){

    return this.pathOfSvgElement.getAttribute("d");
   }


   getSegments(){
    return this.#segments;
}




//debugging purpose
toString(){

  
    const dön=this.#segments.flat(3).join(" "); 
    return dön;
 
 }
 

}


//from ve to parametreleri getBezierCoordinates() functionından dönen
//svgPathElement animasyonun gözükecegi svg path element 
//3. parametre from ve to arasındaki svgdeki width,height ... array olarak koy aradaki farka göre animarion
function animate(from,to,{svgElement,svgPathElement,timing,duration},{width, height, viewx,viewy,viewwidth,viewheight}){

    let start=performance.now();
    const fromDeepCopy=structuredClone(from);


    const getPointLocation=function(p1,p2,progress){

        const xdiff=(p2[0] - p1[0]) * progress;
        const ydiff=(p2[1] - p1[1]) * progress;

        return [
            p1[0]+xdiff,
            p1[1]+ydiff
        
        ];

    }


const getAttributeValue=function(start,diff,progres){
return (start+ progres*diff);
};

//3. parametre
       const svgAttributes={

        width,height,viewx,viewy,viewwidth,viewheight

       };
//hepsinin differencı
       for(const [key,val] of Object.entries(svgAttributes)){
            svgAttributes[key].push(val[1]-val[0]); 

       }

    const newAnimation=function(time){


        let isStop=false;
        let timeFraction = (time - start) / duration;
        if (timeFraction >= 1){
        timeFraction = 1;
        start=time;    
        isStop=true;
        }

    

        let progress=timing(timeFraction);

        //animate Point
        if(from.length==to.length){

            for(let i=0;i<from.length;i++){

                const p1=from[i];
                const p2=to[i];

                //animation point
              fromDeepCopy[i][0] =getPointLocation(p1[0],p2[0],progress);
              fromDeepCopy[i][1] = getPointLocation(p1[1],p2[1],progress);
              fromDeepCopy[i][2] = getPointLocation(p1[2],p2[2],progress);
              fromDeepCopy[i][3] = getPointLocation(p1[3],p2[3],progress);


              const viewx_=getAttributeValue(svgAttributes.viewx[0],svgAttributes.viewx[2],progress);
              const viewy_=getAttributeValue(svgAttributes.viewy[0],svgAttributes.viewy[2],progress);
              const viewwidth_=getAttributeValue(svgAttributes.viewwidth[0],svgAttributes.viewwidth[2],progress);;
              const viewheight_=getAttributeValue(svgAttributes.viewheight[0],svgAttributes.viewheight[2],progress);;
              

               svgElement.setAttribute("width", getAttributeValue(svgAttributes.width[0],svgAttributes.width[2],progress)) ;
                svgElement.setAttribute("height",getAttributeValue(svgAttributes.height[0],svgAttributes.height[2],progress));
                svgElement.setAttribute( "viewBox", `${viewx_} ${viewy_} ${viewwidth_} ${viewheight_}`)
            }

            svgPathElement.setAttribute("d",(pointsToString(fromDeepCopy)));

                
            } else{
                console.log( "Error: from and to bezierarrays have no same points");
            }


//for continuous
        if(!isStop){
            requestAnimationFrame(newAnimation);
        }

    }

    requestAnimationFrame(newAnimation);

}


const easingFuncs=new Map();
easingFuncs.set("easeInOutCubic",`function (x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        };`)

export {getBezierCoordinates,changeStartingPoint, reverseDirection, addNewPoints,getSvgAttributes, pointsToString, animate,AnimationSvgElement,easingFuncs}