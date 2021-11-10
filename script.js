const queryString = window.location.search;
const URLparams = new URLSearchParams(queryString);
function draw() {
	var sizeRange = document.getElementById("size");
	var penSize = 10;
	
	var mouseDown = 0;
	document.body.onmousedown = function() { 
		mouseDown = 1
	}
	document.body.onmouseup = function() {
		mouseDown = 0
	}
	
	var canvas = document.getElementById("drawing-canvas");

	if (URLparams.get("width")) {
		canvas.width = URLparams.get("width");
		
	} 
	if (URLparams.get("height")) {
		canvas.height = URLparams.get("height");
	}
	
	var ctx = canvas.getContext("2d");
	var colorDropdown = document.getElementById("color");
	var eraserOption = document.getElementById("eraser");
	function clickEvent(e) {
		penSize = sizeRange.value
      // e = Mouse click event.
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left; //x position within the element.
		var y = e.clientY - rect.top;  //y position within the element.
		if (mouseDown) {
			ctx.fillStyle = colorDropdown.value;
			if (!(eraserOption.checked)) {
				ctx.fillRect(x - penSize/2 , y - penSize/2, penSize, penSize);
			} else {
				ctx.clearRect(x - penSize/2, y-penSize/2, penSize, penSize);
			};
		};
	}
	canvas.addEventListener('mousemove', clickEvent);
};

function addURLParam(url, param, value){
    var hash       = {};
    var parser     = document.createElement('a');

    parser.href    = url;

    var parameters = parser.search.split(/\?|&/);

    for(var i=0; i < parameters.length; i++) {
        if(!parameters[i])
            continue;

        var ary      = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    var list = [];  
    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });

    parser.search = '?' + list.join('&');
    return parser.href;
}

function resize() {
	const widthOpt = document.getElementById("width");
	const heightOpt = document.getElementById("height");
	if (widthOpt.value < 1) {
		widthOpt.value = 32
	}
	if (heightOpt.value < 1) {
		heightOpt.value = 32
	}
	var url = location.href;
	url = addURLParam(url,'width',Math.floor(widthOpt.value));
	url = addURLParam(url,'height',Math.floor(heightOpt.value));
	location.href = url
};

function loadImageFile() {
	var input = document.createElement('input');
	
	var canvas = document.getElementById("drawing-canvas");
	var ctx = canvas.getContext("2d");
	
	input.type = 'file';
	input.accept = "image/png, image/jpeg";
	input.click();
	
	input.onchange = e => { 
   	var image = e.target.files[0]; 
		
		var reader = new FileReader();
   	reader.readAsDataURL(image);
		
   	reader.onload = readerEvent => {
      	var imgContent = readerEvent.target.result;
			
			var finalImage = new Image();
			finalImage.src = imgContent
			
			finalImage.addEventListener("load", e => {
      		ctx.drawImage(finalImage, 0, 0	);
			});
   	}
	}
}