let dropArea = document.getElementById('drop');
//console.log(dropArea)
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})


function unhighlight(e) {
    dropArea.classList.remove('highlight')
}
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})



function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    console.log(files)
    if (files.length > 0) {
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onloadend = function () {
            wavesurfer.load(reader.result);
            $('#track_title').text(files[0].name)
        }
    }
    //handleFiles(files)
}
dropArea.addEventListener('drop', handleDrop, false)
/*
*/
function formatTimeCallback(seconds, pxPerSec) {
    seconds = Number(seconds);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    if (seconds == 0) {
        return minutes + '"'
    } else {
        return seconds + "'"
    }

}

function timeInterval(pxPerSec) {
    // draw one every 10s as an example
    return 10;
}
function primaryLabelInterval(pxPerSec) {
    // draw one every 10s as an example
    return Math.floor(60 / timeInterval(pxPerSec));
}


function secondaryLabelInterval(pxPerSec) {
    // draw one every 10s as an example
    return Math.floor(10 / timeInterval(pxPerSec));
}

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    barWidth: 2,
    barHeight: 1, // the height of the wave
    barGap: null,
    normalize: true,
    height: 200,
    plugins: [
        WaveSurfer.timeline.create({
            container: "#wave-timeline",
            notchPercentHeight: 50,
            secondaryColor: "#333",
            secondaryFontColor: "#aaa",
            primaryColor: "#000",
            primaryFontColor: "#000",
            formatTimeCallback: formatTimeCallback,
            timeInterval: timeInterval,
            primaryLabelInterval: primaryLabelInterval,
            secondaryLabelInterval: secondaryLabelInterval,

        })
    ]
});



wavesurfer.load('teardrop.mp3');
$('#play').click(function () {
    toggle()
})

function toggle() {
    if (wavesurfer.isPlaying()) {
        //sound.pause()
        wavesurfer.pause();
        $('#play>i').removeClass('fa-pause')
        $('#play>i').addClass('fa-play')
    } else {
        //sound.play()
        wavesurfer.play();
        $('#play>i').addClass('fa-pause')
        $('#play>i').removeClass('fa-play')

    }
}
$('#seek-backward').click(function () {
    wavesurfer.skip(-5)

})
$('#seek-forward').click(function () {
    wavesurfer.skip(5)

})


$('body').keydown(function (event) {
    if (event.which == 13) {
        event.preventDefault();
    }
    if (event.keyCode == 32) {
        toggle()
    }
    if (event.keyCode == 37) {
        wavesurfer.skip(-5)
    }
    if (event.keyCode == 39) {
        wavesurfer.skip(5)
    }
    if (event.key >= 0 && event.key <= 9) {
        var k = (event.key == 0 ? 10 : event.key) - 1
        var loc = k / 10.0
        wavesurfer.seekTo(loc)
    }
});

function formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
function drawKeys() {

    var canvas = document.getElementById("wave-keys");
    fitToContainer(canvas)
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#aaa";
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.font = '12px sans-serif';
    var offset = canvas.offsetWidth/10
    for (let index = 1; index < 11; index++) {
        ctx.moveTo(offset*(index-1),0)
        ctx.lineTo(offset*(index-1),22)
        ctx.stroke();
        var text = index ==10?'0':index
        ctx.fillText(text, offset*(index-1)+5, 12);
        
    }
    

}
drawKeys()

function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }