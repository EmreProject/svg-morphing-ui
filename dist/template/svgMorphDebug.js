

class SvgDebugging{

pointArray;
svgElement;
pointNumber;
#createPoint=function(x,y,index){

    this.svgElement.insertAdjacentHTML("beforeend",
        `<circle fill="red" cx="${x}" cy="${y}" r="${this.radius}" />`);

        this.svgElement.insertAdjacentHTML("beforeend",
            `<text text-anchor="middle" font-size="${this.fontSize}" x="${x}" y="${y+5}" fill="white">${index}</text>`);
}

fontSize;
radius;


constructor(){}

set(svgElement,pointArray){

this.svgElement=svgElement;
this.pointArray=pointArray;
this.pointNumber=this.pointArray.length;
}


drawPoints(...pointIndices){

for(let i=0;i<pointIndices.length;i++){

const index=pointIndices[i];
const x=this.pointArray[index][0][0];
const y=this.pointArray[index][0][1];
this.#createPoint(x,y,index);


}



}



}

export default SvgDebugging;