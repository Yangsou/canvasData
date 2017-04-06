var json;

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				// console.log('e readAsText = ', e);
				// console.log('e readAsText target = ', e.target);
				try {
					json = JSON.parse(e.target.result);
					// alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
          // console.log(json);
          canvas.addEventListener('click', function() {
            alert('a');
          });
          draw(json);
				} catch (ex) {
					console.log('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
/*
* --------------------------
*/
var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    radius = 20;

function draw(jsonFile){
  var points = jsonFile.points;
  var connective = jsonFile.connective;
  //draw line
  for( var i = 0; i < connective.length; i++){
    var pos = connective[i].begin - 1,
    posTo = connective[i].end - 1;
    drawLine(points[pos], points[posTo]);
  }
  //draw point
  for( var i = 0; i < points.length; i++){
    drawCircle(points[i].x, points[i].y);
  }
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.strokeStyle = "#222";
  ctx.fillStyle = "#222";
  ctx.stroke();
  ctx.fill();
}

function drawLine(pos, posTo){
  console.log(pos, '-', posTo);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(posTo.x, posTo.y);
  ctx.closePath();
  ctx.strokeStyle = "#666";
  ctx.stroke();
}
