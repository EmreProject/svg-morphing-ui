

function lineRotation(pathElement,rotateZdegree){


    const keyframe=new KeyframeEffect(pathElement,[
    {transform:`translateX(0%) rotateZ(0deg)  `},
    {transform:`translateX(30%)  rotateZ(${rotateZdegree}deg)  `}        
    ],
    {
    duration: 200,
    fill:"forwards",
   // direction: "alternate",
    easing: "ease-in",
   // iterations: "Infinity",
    });

    return new Animation(keyframe,document.timeline);

    }


    function lineDisappear(pathElement){

        const keyframe=new KeyframeEffect(pathElement,[
            {opacity:"100%" },
            {opacity:"0%"}        
            ],
            {
            duration: 200,
            fill:"forwards",
           // direction: "alternate",
            easing: "ease-in",
           // iterations: "Infinity",
            });
        
            return new Animation(keyframe,document.timeline);
        

    }


  

function loadHamburgerTransition(hamburgerDiv,up,middle,bottom){


   const animUpperLine=lineRotation(up,45);
   animUpperLine.playbackRate=-1;

   const animMiddleLine=lineDisappear(middle);
   animMiddleLine.playbackRate=-1;

   const animBottomLine=lineRotation(bottom,-45);
   animBottomLine.playbackRate=-1;

   
   hamburgerDiv.addEventListener("click",()=>{

    if(hamburgerDiv.getAttribute("isOpen")=="false"){
        hamburgerDiv.setAttribute("isOpen","true");

        //DO MENU VISIBLE TRUE
        //...
    }else{
        hamburgerDiv.setAttribute("isOpen","false");

          //DO MENU VISIBLE FALSE
        //...
    }

      animUpperLine.updatePlaybackRate(animUpperLine.playbackRate*-1);
      animUpperLine.play();

      animBottomLine.updatePlaybackRate(animBottomLine.playbackRate*-1);
      animBottomLine.play();

      animMiddleLine.updatePlaybackRate(animMiddleLine.playbackRate*-1);
      animMiddleLine.play();

   });


};



export {loadHamburgerTransition};