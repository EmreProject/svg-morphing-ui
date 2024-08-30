

function setProperty(name,value){ //--degree1 gibi
document.documentElement.style.setProperty(name,value);
}


const borderAnimationParams={

timing(x){return x * x;},

duration:2000,

draw(progress){

    const getNewValue=function(start,end){
        return ((end-start)*progress + start);
    }

    const deg1=getNewValue(0,10);
    const deg2=getNewValue(190,150);
    const deg3=getNewValue(360,330);


    setProperty("--degree1",`${deg1}deg`);
    setProperty("--degree2",`${deg2}deg`);
    setProperty("--degree3",`${deg3}deg`);


},




}


function animateBorder({timing,draw,duration}){

    let start=performance.now();

    const animation=function(time){


    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animation);
    }

    }

    requestAnimationFrame(animation);


}


function startAnimation(){

animateBorder(borderAnimationParams);

}

export {startAnimation as default}