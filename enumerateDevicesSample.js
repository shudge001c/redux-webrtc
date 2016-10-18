if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
}


var audioInputs = new Array();
var videoInputs = new Array();

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
	for(var i=0; i<devices.length; i++) {
		console.log(devices[i].kind + ": " + devices[i].label + " id = " + devices[i].deviceId);

		if(devices[i].kind === "audioinput") {
			audioInputs.push(devices[i]);
		}
		if(devices[i].kind === "videoinput") {
			videoInputs.push(devices[i]);
		}
	}
})
/* These Promises are not necessary for functionality, only for testing the Arrays */
.then(function(){console.log("Available audio inputs: ");
	for(i=0; i<audioInputs.length; i++) {
		console.log(audioInputs[i]);
	}
})
.then(function(){console.log("Available video inputs: ")
	for(i=0; i<videoInputs.length; i++) {
		console.log(videoInputs[i]);
	}
});
