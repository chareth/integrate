
$(document).ready(function(){

	$('#enter').click(function(){
		f = $('#function').val();
		lower = parseInt($('#lower-bound').val());
		upper = parseInt($('#upper-bound').val());
		intervals = parseInt($('#intervals').val());
		var answer = 0;


		if($('#rule').val() == 0){
			answer = rectangle(lower, upper, intervals);
		}else{
			answer = trapezoid(lower, upper, intervals);
		}
		var str = 'The estimated area under ' + f +' is ' + answer;
		$('#result').html(str);
		draw();
	});

	$('#clear').click(function(){
		clearFields();
	});
});

function rectangle(a, b, n){
	var base = (b-a)/n;
	var sum=0;
	var x=0;
	for(var i=0; i<n; i++){
		x = 0.5*base + (a+base*i);
		sum = sum + func(x);
	}
	return base*sum;
}

function trapezoid(a, b, n){
	base = (b-a)/n;
	var sum=0;
	var x=0;
	var y;
	for(var i=0; i<n+1; i++){
		x = a+base*i;
		y = func(x);
		if(i == 0 || i == n){
			y = y/2;
		}
		sum += y;
	}

	return base*sum;
}

function func(x){
	return eval($('#function').val());
}

function clearFields(){
	$('#function').val('');
	$('#lower-bound').val('');
	$('#upper-bound').val('');
	$('#intervals').val('');
	$('#rule').val(0);
	$('#result').empty();
	var canvas = document.getElementById('graph');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

// code below from tutorial: http://www.javascripter.net/faq/plotafunctiongraph.htm

function draw(){
	var canvas = document.getElementById("graph");
	if (null==canvas || !canvas.getContext) return;

	var axes={}, ctx=canvas.getContext("2d");

	ctx.clearRect(0,0,canvas.width,canvas.height);	

	axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
	axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
	axes.scale = 40;                 // 40 pixels from x=0 to x=1
	axes.doNegativeX = true;

	showAxes(ctx,axes);
	graph(ctx,axes,func,"rgb(11,153,11)",1); 
}

function graph(ctx,axes,func,color,thick) {
	var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
	var iMax = Math.round((ctx.canvas.width-x0)/dx);
	var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
	ctx.beginPath();
	ctx.lineWidth = thick;
	ctx.strokeStyle = color;

	for (var i=iMin;i<=iMax;i++) {
	xx = dx*i; yy = scale*func(xx/scale);
	if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
	else         ctx.lineTo(x0+xx,y0-yy);
	}
	ctx.stroke();
}

function showAxes(ctx,axes) {
	var x0=axes.x0, w=ctx.canvas.width;
	var y0=axes.y0, h=ctx.canvas.height;
	var xmin = axes.doNegativeX ? 0 : x0;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)"; 
	ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
	ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
	ctx.stroke();
}
