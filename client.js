var localVideo,
		remoteVideo,
    stream;

var videoDeviceSelect = document.querySelector("#video-devices");
var audioDeviceSelect = document.querySelector("#audio-devices");
var audioInputs = new Array();
var videoInputs = new Array();

var getDevices = navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
	for(var i=0; i<devices.length; i++) {
		// console.log(devices[i].kind + ": " + devices[i].label + " id = " + devices[i].deviceId);

		if(devices[i].kind === "audioinput") {
			audioInputs.push(devices[i]);
		}
		if(devices[i].kind === "videoinput") {
			videoInputs.push(devices[i]);
		}
	}
});

// getDevices = getDevices.then(function() { console.log(multipleAudio + " " + multipleVideo); });

function buildDropdowns() {
	getDevices.then(function(){
		for(var i=0; i<audioInputs.length; i++) {
			audioDeviceSelect.add(new Option(audioInputs[i].label));
			audioDeviceSelect.options[i].value = audioInputs[i].deviceId;
		}
		for(var j=0; j<videoInputs.length; j++) {
			videoDeviceSelect.add(new Option(videoInputs[j].label));
			videoDeviceSelect.options[j].value = videoInputs[j].deviceId;
		}
	});
	return getDevices;
}

var constraints; // = { audio: true, video: {width: {max: 480}, height: {max: 360}}};

function setConstraints() {
	buildDropdowns().then(function() {
		constraints = {
			audio: {
				exact: {
					sourceId: audioDeviceSelect.value
				}
			},
			video: {
				width: {max: 480},
				height: {max: 360},
				exact: {
					sourceId: videoDeviceSelect.value
				}
			}
		}
	})
	return getDevices;
};



audioDeviceSelect.onchange = function() {
	constraints.audio.exact.sourceId = audioDeviceSelect.value;
	setupLocalStream();
}

videoDeviceSelect.onchange = function() {
	constraints.video.exact.sourceId = videoDeviceSelect.value;
	setupLocalStream();
}


function setupLocalStream() {
	setConstraints().then(function(){
		navigator.mediaDevices.getUserMedia(constraints)
		.then(function(mediaStream) {
		  console.log(mediaStream);
		  localVideo = document.querySelector("#localVideo");
		  localVideo.src = window.URL.createObjectURL(mediaStream);
		  //localVideo.pause();
		  // localVideo.onloadedmetadata ??
		})
		.then(function() { console.log(constraints); })
		.catch(function(err) { console.log(err.name); });
	});
}

setupLocalStream();






// video: { width: {max: 480}, height: {max: 360}}

// getDevices
// .then(function(){
// 	for(var i=0; i<videoInputs.length; i++) {
// 		videoDeviceSelect.add(new Option(videoInputs[i].label));
// 		videoDeviceSelect.options[i+1].value = videoInputs[i].deviceId;
// 	};
// })
// .then(function(){
// 	for(var i=0; i<audioInputs.length; i++) {
// 		audioDeviceSelect.add(new Option(audioInputs[i].label));
// 		audioDeviceSelect.options[i+1].value = audioInputs[i].deviceId;
// 	}
// });
// .then(function() {
// 	constraints.audio = false;
// 	return constraints.audio;
// })
// .then(function(result1) {
// 	console.log(result1);
// });















//
// function changeLocalVideoButton(localStreamButtonIsClicked) {
//   if(localStreamButtonIsClicked === false) {
//     document.querySelector("#local-stream-button").innerHTML = "Start Local Stream";
//   }
//   if(localStreamButtonIsClicked === true){
//     document.querySelector("#local-stream-button").innerHTML = "End Local Stream";
//   }
//
// }
//
// var localStreamButtonIsClicked = false;
//
// function changeLocalVideoButton(localStreamButtonIsClicked){
//   if(localStreamButtonIsClicked === false) {
//     localStreamButtonIsClicked = true;
//   }
//   if(localStreamButtonIsClicked === true) {
//     localStreamButtonIsClicked = false;
//   }
// }
//
//
// startLocalStreamButton.addEventListener("click", function(){
//   if(localStreamButtonIsClicked === false){
//     navigator.mediaDevices.getUserMedia(constraints)
//     .then(function(mediaStream) {
//
//
//
//     	console.log(mediaStream);
//     	localVideo = document.querySelector("#localVideo");
//     	localVideo.src = window.URL.createObjectURL(mediaStream);
//     	//localVideo.pause();
//     	// localVideo.onloadedmetadata ??
//       localStreamButtonIsClicked = true;
//       changeLocalVideoButton(localStreamButtonIsClicked);
//     })
//     .catch(function(err) { console.log(err.name); });
//   }
//   if(localStreamButtonIsClicked === true) {
//     constraints.audio = false;
//     constraints.video = false;
//     localStreamButtonIsClicked = false;
//     changeLocalVideoButton(localStreamButtonIsClicked);
//   }
//
// });






// // This will start the local video stream
// // getUserMedia() returns a Promise that resolves to a MediaStream object
// var startLocalStream = navigator.mediaDevices.getUserMedia(constraints)
// .then(function(mediaStream) {
//
//
//
// 	console.log(mediaStream);
// 	localVideo = document.querySelector("#localVideo");
// 	localVideo.src = window.URL.createObjectURL(mediaStream);
// 	//localVideo.pause();
// 	// localVideo.onloadedmetadata ??
// })
// .catch(function(err) { console.log(err.name); });
