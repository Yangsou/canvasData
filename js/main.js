var json;
var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    radius = 14,
		lineColor = "#666",
		circleColor = "rgb(30, 140, 130)",
    circles = [],
		degree = new Array(),
		degreeCentrality = new Array();

document.getElementById('files').addEventListener('change', handleFileSelect, false);
var lblText = document.getElementById('lbl-text')
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
          draw(json);
          // console.log(circles);
				} catch (ex) {
					console.log('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}


	var label	 = document.getElementById('files').nextElementSibling,
		labelVal = label.innerHTML;

	// input.addEventListener( 'change', function( e )
	// {
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = evt.target.value.split( '\\' ).pop();

		if( fileName )
			lblText.innerHTML = fileName;
		else
			lblText.innerHTML = labelVal;
	// });
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
/*
* --------------------------
*/

canvas.addEventListener('click', function(e){
	 var clickedX = e.pageX - this.offsetLeft;
	 var clickedY = e.pageY - this.offsetTop;

	 for (var i = 0; i < circles.length; i++) {
			 if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
					$('.tooltip-wrap').remove();
					 var _x = circles[i].x;
					 var _y = circles[i].y;
					 $('body').append(
						 	"<div class='tooltip-wrap'>Node : "+ (i+1)
							+ "<br/> x = " + _x
							+ "<br/> y = " + _y
							+ "<br/> degree: "+ degree[i]
							+ "<br/> degreeCentrality: " + RoudingNumber(degreeCentrality[i])
							+ "</div>"
						);
						$('.info-node div').html(
							"Node : "+ (i+1)
							+ "<br/> x = " + _x
							+ "<br/> y = " + _y
							+ "<br/> degree: "+ degree[i]
							+ "<br/> degreeCentrality: " + RoudingNumber(degreeCentrality[i])
						)
					 $('.tooltip-wrap').css({
						 "position": "absolute",
						 "top": e.pageY,
						 "left": e.pageX,
						 "background": "rgb(30, 140, 130)",
						 "color": "#fff"
					 });
					 setTimeout(function(){
						 $('.tooltip-wrap').remove();
					 }, 5000);
			 }
	 }
});

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
	// degree
	for( var i = 0; i<points.length; i++){
		var temp = 0;
		for(var j = 0; j < connective.length; j++){
			if(connective[j].begin == i+1 || connective[j].end == i+1){
				temp++;
			}
		}
		// console.log(temp);
		degree[i] = temp;
		degreeCentrality[i] = temp / (points.length - 1);
		// console.log('degree', degree);
	}
	// degree Centrality

}

var Circle = function(x, y, radius) {
		this.x = x;
		this.y = y;
    this.left = x - radius;
    this.top = y - radius;
    this.right = x + radius;
    this.bottom = y + radius;
};

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.strokeStyle = circleColor;
  ctx.fillStyle = circleColor;
  ctx.stroke();
  ctx.fill();
  var circle = new Circle(x, y, radius);
  circles.push(circle);
}

function drawLine(pos, posTo){
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  ctx.lineTo(posTo.x, posTo.y);
  ctx.closePath();
  ctx.strokeStyle = lineColor;
  ctx.stroke();
}

// tinh degree
function degree(obj){

}
/*
******
*/
function RoudingNumber(x){
	var n = parseFloat(x);
	x = Math.round(n * 1000)/1000;
	return x;
};
