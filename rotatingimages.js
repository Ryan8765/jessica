$(document).ready(function() {
//--------------------------------
	/*counter variable*/
	var i = 1;
	/* variable controls how long it takes for pictures to fade out */
	var fadeOutTime = 2500;
	/*how long for picture to fade in*/
	var fadeInTime = 2500;
	/*how long for picture to rotate*/
	var pictureTime = 5000;
	/*variable holds picture array for slideshow*/
	var images = $('#image li');
	var imageLength=images.length;
	var imageLengthMin = imageLength - 1;
	var showPic = function() {
		if(i == 1) {
			$('#image ul li:nth-child(' + imageLength + ')').fadeOut(fadeOutTime);
			
			$('ul li:nth-child(' + i + ')').fadeIn(fadeInTime);
			i++;
				
		} else if (i == imageLength) {
			$('#image ul li:nth-child(' + imageLengthMin + ')').fadeOut(fadeOutTime);
			
			$('#image ul li:nth-child(' + i + ')').fadeIn(fadeInTime);
				i = 1;

		} else {
			$('#image ul li:nth-child(' + (i - 1) + ')').fadeOut(fadeOutTime);
			
			$('#image ul li:nth-child(' + i + ')').fadeIn(fadeInTime);
				i++;
		}
	};

	$('#image ul li:nth-child(' + imageLength + ')').show();

	setInterval(function(){
		showPic();
		} 
	,pictureTime);








//----------------------------------	
});