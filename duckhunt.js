var hitCount = 0;
var missCount = 0;
var hitText = 'Hits: ';
var missText = ' Misses: ';
var width;
var height;
var groundHeight;
var ctx;

$(document).ready(function() {
	var forest = $("#forest").get(0);
	width = $(document).width();
	height = $(document).height();
	groundHeight = Math.floor(height / 5);
	forest.width = width;
	forest.height = height;
	ctx=forest.getContext("2d");
    ctx.fillStyle="#00CCFF";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle="#006633";
    ctx.fillRect(0, height - groundHeight, width, groundHeight);
	var img = new Image();
    img.onload = function(){
		var imgWidth = 185;
		var imgHeight = 208;
		var imgOffset = Math.floor(groundHeight * 0.66);
        ctx.drawImage(img, 25, height - (imgHeight + imgOffset), imgWidth, imgHeight);
	}
	img.src = 'images/tree.png';
	ctx.font="30px Arial";
	updateHitsMisses();
    createDucks(10);
});

function createDucks(count) {
	var delay = 0;
	for (var i = 0; i < count; i++) {
		var duck = $('http://i.imgur.com/vhAhuLR.gif'
);
		duck.css({
			position: 'absolute',
			left: width,
			top: Math.floor(Math.random() * (height - groundHeight)),
 			cursor: 'crosshair'
		});
		duck.disableSelection();
		duck.appendTo('#ducks');
		delay = delay + Math.floor(Math.random() * 2000);
		var speed = Math.floor(Math.random() * 300) + 100;
		duck.hide().delay(delay).show(1).animate({"left": "0px"}, {
		duration: width / speed * 1000,
		easing: "linear", 
		step: function(now, fx) {
			var topDelta = Math.floor(Math.random() * 6) - 3;
			$(fx.elem).css({top: "+=" + topDelta});
		},
		complete: function() {
			$(this).hide();
			missCount++;
			updateHitsMisses();
			}
		});
		duck.click(function() {
			$(this).stop();
			$(this).hide();
			hitCount++;
			updateHitsMisses();
		});
	}
}

function updateHitsMisses() {
	ctx.fillStyle = '#006633';
	ctx.fillRect(width - 300, height - groundHeight, 300, groundHeight);
	ctx.fillStyle = 'black';
	ctx.fillText(hitText + hitCount + missText + missCount, width - 300, height - 50);
}