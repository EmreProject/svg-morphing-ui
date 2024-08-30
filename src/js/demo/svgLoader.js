import shape1 from "/svgshapes/shapefirst.svg"
import shape2 from "/svgshapes/shape1.svg"
import shape3 from "/svgshapes/shape2.svg"
import shape4 from "/svgshapes/hamburger-menu.svg"


const shapeList=[];

function fetchSvgAsText(shape){

  return  fetch(shape).then(response=>response.text()).then(response=>{

        shapeList.push(response);
        
        });

}

const s1=fetchSvgAsText(shape1);
const s2=fetchSvgAsText(shape2);
const s3=fetchSvgAsText(shape3);
const s4=fetchSvgAsText(shape4);

const shapesLoadPromise=Promise.all([s1,s2,s3,s4]);


    export default {
        shapesLoadPromise,
        shapeList,
    };