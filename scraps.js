/*  This section of code also enumerates devices, but with a forEach function */
var availableVideoInputs = new Array();
var availableAudioInputs = new Array();

navigator.mediaDevices.enumerateDevices()
.then(function(devices) {
	devices.forEach(function(device) {
		console.log(device.kind + ": " + device.label + " id = " + device.deviceId);

	if(device.kind === "videoinput") {
		availableVideoInputs.push(device.deviceId);
	}
	if(device.kind === "audioinput"){
		availableAudioInputs.push(device.deviceId);
	}
});
})
.catch(function(err) {
	console.log(err.name + ": " + err.message);
})
/* if the console.log functions are not Promises, the functions will
execute before enumerateDevices() has finished */
.then(function(){console.log("Available audio inputs: " + availableVideoInputs)})
.then(function(){console.log("Available video inputs: " + availableAudioInputs)});


///////    Deprecated method  //////
MediaStreamTrack.getSources(function(sources) {
    var audioSource = null;
    var videoSource = null;
    for (var i = 0; i < sources.length; ++i) {
      var source = sources[i];
      if(source.kind === "audio") {
        console.log("Microphone found:", source.label, source.id);
        audioSource = source.id;
      } else if (source.kind === "video") {
        console.log("Camera found:", source.label, source.id);
        videoSource = source.id;
      } else {
        console.log("Unknown source found:", source);
      }
    }
});




getDevices
.then(function(){
	for(var i=0; i<videoInputs.length; i++) {
		videoDeviceSelect.add(new Option(videoInputs[i].label));
		videoDeviceSelect.options[i+1].value = videoInputs[i].deviceId;
	};
})
.then(function(){
	for(var i=0; i<audioInputs.length; i++) {
		audioDeviceSelect.add(new Option(audioInputs[i].label));
		audioDeviceSelect.options[i+1].value = audioInputs[i].deviceId;
	}
});
.then(function() {
	constraints.audio = false;
	return constraints.audio;
})
.then(function(result1) {
	console.log(result1);
});
