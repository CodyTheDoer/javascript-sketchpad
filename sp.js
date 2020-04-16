function divArrayCreate (gridX){
    let divsNeeded = gridX * gridX;
    let divNumber = 1;
    while (divsNeeded > 0){
        let divName = `div${divNumber}`;
        gridArray.push(divName);
        divNumber++;
        divsNeeded--;
    }
    console.log(`${divNumber-1} div's in the staging array have been created.`)
    divNumber = 1;
    return;
}

function divArrayBuild(){
    divsCreated = 0;
    for(let i = 0; i < gridArray.length; i++){
        const gridName = gridArray[i];
        let createDiv = document.createElement(`div`);
        createDiv.setAttribute(`id`, gridName);
        createDiv.setAttribute(`class`, 'sketchpadDiv');
        createDiv.style.background = 'black';
        sketchpadContainer.appendChild(createDiv);
        divsCreated++
    }
    console.log(`${divsCreated} div's have been created and appended`)
}

function divApplyAttributes(color){
    for(let i = 0; i < divs.length; i++){
        divs[i].lightLevel = 0;
        divs[i].addEventListener('mouseover', function(){
            bgColor(divs[i], randomColor())
            divs[i].backgroundColor = divs[i].style.backgroundColor;
            divs[i].lightLevel += 25.5;
        });
    }
    return 'Attributes applied';
}

function clearSketchpad() { 
    let sketchpadContainer = document.querySelector("div#sketchpadContainer"); 
    
    var divs = sketchpadContainer.lastElementChild;  
    while (divs) { 
        sketchpadContainer.removeChild(divs); 
        divs = sketchpadContainer.lastElementChild; 
    } 
} 

function bgColor(thisNode, color) {
    thisNode.style.background = color;
}

function randomColor() {
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    let Color = "rgb(" + x + "," + y + "," + z + ")";
    return Color;    
}

//Javascript to CSS Rule Append to make the responsive grid
var addRule;

if (typeof document.styleSheets != "undefined" && document.styleSheets) {
    addRule = function(selector, rule) {
        var styleSheets = document.styleSheets, styleSheet;
        if (styleSheets && styleSheets.length) {
            styleSheet = styleSheets[styleSheets.length - 1];
            if (styleSheet.addRule) {
                styleSheet.addRule(selector, rule)
            } else if (typeof styleSheet.cssText == "string") {
                styleSheet.cssText = selector + " {" + rule + "}";
            } else if (styleSheet.insertRule && styleSheet.cssRules) {
                styleSheet.insertRule(selector + " {" + rule + "}", styleSheet.cssRules.length);
            }
        }
    }
} else {
    addRule = function(selector, rule, el, doc) {
        el.appendChild(doc.createTextNode(selector + " {" + rule + "}"));
    };
}

function createCssRule(selector, rule, doc) {
    doc = doc || document;
    var head = doc.getElementsByTagName("head")[0];
    if (head && addRule) {
        var styleEl = doc.createElement("style");
        styleEl.type = "text/css";
        styleEl.media = "screen";
        head.appendChild(styleEl);
        addRule(selector, rule, styleEl, doc);
        styleEl = null;
    }
};

//Actually doing the stuff
function gridPrep(){
    let inputVal = document.getElementById("myInput");
    gridX = inputVal.value;
}

function gridCreate(){
    let gridCalc = 100 / gridX;
    gridArray = [];
    clearSketchpad();
    divArrayCreate(gridX);
    divArrayBuild();
    divApplyAttributes();
    createCssRule(".sketchpadDiv", `width: ${gridCalc}%`);
    createCssRule(".sketchpadDiv", `padding-top: ${gridCalc}%`);
    createCssRule(".sketchpadDiv", `border: 0px`);
}

//javascript to stop enterKey
var nav = window.Event ? true : false;
if (nav) {
   window.captureEvents(Event.KEYDOWN);
   window.onkeydown = NetscapeEventHandler_KeyDown;
} else {
   document.onkeydown = MicrosoftEventHandler_KeyDown;
}

function NetscapeEventHandler_KeyDown(e) {
  if (e.which == 13 && e.target.type != 'textarea' && e.target.type != 'submit') { return false; }
  return true;
}

function MicrosoftEventHandler_KeyDown() {
  if (event.keyCode == 13 && event.srcElement.type != 'textarea' && event.srcElement.type != 'submit')
    return false;
  return true;
}

//declairing variables and constants
const sketchpadContainer = document.querySelector('div#sketchpadContainer');
let divs = document.getElementsByClassName('sketchpadDiv');
let gridArray = [];


