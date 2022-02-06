// HandGestureController.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Sends given set of triggers on hand gesture detection

//@input Component.ObjectTracking tracker
//@input string[] openTriggers
//@input string[] closeTriggers
//@input string[] hornsTriggers
//@input string[] indexFingerTriggers
//@input string[] victoryTriggers
//@input bool debug
//@input Component.Text question
//@input string myText
//@input Component.AudioComponent audio

var labels = ["index_finger", "close", "victory"];
var customMap = {
//    open: script.openTriggers,
    close: script.closeTriggers,
//    horns: script.hornsTriggers,
    index_finger: script.indexFingerTriggers,
    victory: script.victoryTriggers,
};

var custom = getNewQuestion();
var correct = 0
var score = 0
if(Math.random() < 0.5){
    value = custom[1].toString() + "       " + custom[2].toString();        
    correct = 0
}else{
    value = custom[2].toString() + "       " + custom[1].toString();    
    correct = 1
}
script.question.text = "Score: "+score.toString()+"\n\n"+custom[0] + "\n" + value;


function getRandomInt(){
    return Math.floor(Math.random() * 50);
}

function getNewQuestion(){
   var ans = 0;
   var v1 = getRandomInt();
   ans += v1;
   var sym = ""    
   var v2 = getRandomInt();
   if (Math.random() < 0.5){
        sym = "+"               
        ans += v2;
   }
   else{
        ans -= v2;
        sym = "-"
    }
   return [ v1.toString()+sym+v2.toString(), ans, ans-getRandomInt(5) ]
}

function generateTriggerResponse(evt) {
    return function() {
        print("Gesture detected: " + evt);
        sendCustomTriggers(evt);
    };
}


function sendCustomTriggers(evt) {
    if (!customMap[evt]) {
        return;
    }
    
    if(customMap[evt] == customMap["index_finger"] && correct == 0){
        //script.audio.play(1);        
        score += 1;
    }else if(customMap[evt] == customMap["victory"] && correct == 1){
        //script.audio.play(1);        
        score += 1;
    }else if(customMap[evt] == customMap["close"]){}
    else{
        score -= 1;
    }
    
    custom = getNewQuestion();
    correct = 0
    if(Math.random() < 0.5){
        value = custom[1].toString() + "       " + custom[2].toString();        
        correct = 0
    }else{
        value = custom[2].toString() + "       " + custom[1].toString();    
        correct = 1
    }
    script.question.text = "Score: "+score.toString()+"\n\n"+custom[0] + "\n" + value;
}


function init() {
    for (var i = 0; i < labels.length; i++) {
        print("Event created for: " + labels[i]);
        script.tracker.registerDescriptorStart(labels[i], generateTriggerResponse(labels[i]));
    }
}


init();