let localBlob = [];
let imageStack = [];
let counter = 0;
let localCounter = -1;
let showHide = true;

const input = document.querySelector("myText");
//input.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
  document.getElementById("myText").value =
    document.getElementById("fileToLoad").value;
}

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  handlerFunction(stream);
});

function changeBackground(data) {
  const stackValue = "data/" + data;
  console.log("stackValue = " + stackValue);
  var img2 = document.getElementById("myImage");
  document.getElementById("myImage").src = stackValue;
  // var img2 = document.getElementById('fileToLoad');
  // document.getElementById("fileToLoad").src = stackValue;
  console.log("img2 = " + img2.data);
}

function loadFileAsText() {
  var fileToLoad = document.getElementById("fileToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (fileLoadedEvent) {
    var textFromFileLoaded = fileLoadedEvent.target.result;
    console.log(textFromFileLoaded);
    document.getElementById("myText").value = textFromFileLoaded;
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}

function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => {
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
      sendData(blob);
    }
  };
}

function showBar() {
  console.log("in here");
  console.log("showHide = " + showHide);

  document.getElementById("controlBar").style.display = "block";
  const newLocal = "showBar";
  document.getElementById(newLocal).style.display = "none";
}

function hideBar() {
  document.getElementById("controlBar").style.display = "none";
  document.getElementById("showBar").style.display = "block";
}

function wait(ms) {
  var d = new Date();
  var d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

function fullScan(data) {
  let localCounter = 0;
  fullscanTargetdark(data, localCounter);
}

function fullscanTarget(data, localCounterin) {
  //for (var i=0;i<2000;i++){console.log(i);}
  wait(2000);
  let localCounterout = localCounterin;
  console.log(localCounterout + "<lci c>" + counter);
  //localBlob = data;
  recordedAudio.src = URL.createObjectURL(localBlob[localCounterout]);
  recordedAudio.controls = true;
  changeBackground(imageStack[localCounterout]);
  recordedAudio.play();
  localCounterout = localCounterout + 1;
  if (localCounterout == counter) {
    localCounterout = 0;
  }
  document.getElementById("recordedAudio").onended = function () {
    fullscanTargetdark(data, localCounterout);
  };
}

function fullscanTargetdark(data, localCounter) {
  //for (var i=0;i<2000;i++){console.log(i);}
  wait(2000);
  let localCounterin = localCounter;
  console.log(localCounterin + "<lci c>" + counter);
  //localBlob = data;
  //console.log(localBlob);
  recordedAudio.src = URL.createObjectURL(localBlob[localCounterin]);
  recordedAudio.controls = true;
  changeBackground(imageStack[localCounterin]);
  recordedAudio.play();
  localCounterin = localCounterin + 1;
  if (localCounterin == counter) {
    localCounterin = 0;
  }
  document.getElementById("recordedAudio").onended = function () {
    fullscanTarget(data, localCounterin);
  };
}

function sendData(data) {
  localBlob[counter] = data;
  // imageStack[counter] = document.getElementById("myText").value;
  //const imageStack = document.getElementById(fileToLoad).value;
  imageStack[counter] = document
    .getElementById("fileToLoad")
    .value.replace("C:\\fakepath\\", "");
  changeBackground(imageStack[counter]);
  recordedAudio.src = URL.createObjectURL(localBlob[counter]);
  recordedAudio.controls = true;
  recordedAudio.play();
  counter = counter + 1;
}

function playBack(data) {
  localCounter = localCounter + 1;
  console.log("The Counter is Equal to: " + counter);
  localBlob[counter] = data;
  console.log(localCounter + "<LC C>" + counter);

  if (localCounter == counter) {
    localCounter = 0;
  }
  recordedAudio.src = URL.createObjectURL(localBlob[localCounter]);
  recordedAudio.controls = true;
  recordedAudio.play();

  if (localCounter == counter) {
    localCounter = 0;
  }
}

function mouseDown() {
  // document.getElementById("myP").style.color = "red";
  console.log("recording");
  //record.disabled = true;
  //record.style.backgroundColor = "green"
  //stopRecord.disabled=false;
  audioChunks = [];
  rec.start();
}
function mouseUp() {
  //   document.getElementById("myP").style.color = "green";
  console.log("broadcasting");
  // record.disabled = false;
  stop.disabled = true;
  // record.style.backgroundColor = "red"
  rec.stop();
}

function showUploads() {
  console.log("I'm in here!!!");
  console.log("imageStack = " + imageStack);
  console.log("imageStack.length =" + imageStack.length);
  let html = document.getElementById("myModal").innerHTML;
  document.getElementById("close").innerHTML = ""
  for (i = 0; i < imageStack.length; i++) {
    document.getElementById("close").innerHTML =
      document.getElementById("close").innerHTML +
      "<br>" +
      imageStack[i] +
      "<br>";
  }
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

