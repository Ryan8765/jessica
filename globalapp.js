$(document).ready(function() {

	//create a pop up for pictures in gallery
	var xout = $("<div id='xout'></div>");
	var clickedPictureDiv = $("<div id = 'clickedPicture'></div>");
	var clickedImageHolderDiv = $("<div id='clickedImageHolder'></div>");
	var clickedPicImg = $("<img onContextMenu='return false;'>");
	var arrowLeftDiv = $("<div id='arrowLeft'></div>");
	var arrowRightDiv = $("<div id='arrowRight'></div>");
	var picNumber;

	clickedPictureDiv.append(xout);
	clickedPictureDiv.append(arrowLeftDiv);
	clickedImageHolderDiv.append(clickedPicImg);
	clickedPictureDiv.append(clickedImageHolderDiv);
	clickedPictureDiv.append(arrowRightDiv);


	$('#pictureContainer').on('click','img',function() {
		$('#pictureContainer').hide();
		//create div for clickedPicture
		var imgSrc = $(this).attr('src');
		clickedPicImg.attr('src', imgSrc);
		$('body').append(clickedPictureDiv);
		$('#clickedPicture').show();
		$('html,body').scrollTop(0);
		var imageWidth = clickedPicImg.width();
		var leftArrowOffset = arrowLeftDiv.offset().left;
		var rightarrowOffset = ((clickedPicImg.offset().left)*2) + imageWidth - leftArrowOffset;
		arrowRightDiv.css('left',rightarrowOffset + 'px');


	});
	//realign image arrows when window is resized
	$(window).resize(function(){
		var imageWidth = clickedPicImg.width();
		var leftArrowOffset = arrowLeftDiv.offset().left;
		var rightarrowOffset = ((clickedPicImg.offset().left)*2) + imageWidth - leftArrowOffset;
		arrowRightDiv.css('left',rightarrowOffset + 'px');
	});
	//stop image propagation so that when you click the big image popup it doesn't trigger the click event to go back to the gallery
	clickedPicImg.click(function(event){
		event.stopPropagation();
	});
	//stop image propagation on arrows and also move image to the next picture when left arrow is clicked
	arrowLeftDiv.on('click', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#pictureContainer li').length)-1;
		$('#pictureContainer li img').each(function(){
			if($(this).attr('src') == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber > 0 || picNumber < listLength - 1) {
			picNumber = picNumber - 1;
			pictureSrc = $('#pictureContainer li').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',pictureSrc);
		} else if (picNumber == 0) {
			picNumber = listLength;
			$('#clickedPicture img').attr('src',pictureSrc);
		}
		
	});

	//image popup to rotate with right swipe on cell phones **************************************************************************

	$('clickedImageHolder img').on('swiperight', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#pictureContainer li').length)-1;
		$('#pictureContainer li img').each(function(){
			if($(this).attr('src') == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber > 0 || picNumber < listLength - 1) {
			picNumber = picNumber - 1;
			pictureSrc = $('#pictureContainer li').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',pictureSrc);
		} else if (picNumber == 0) {
			picNumber = listLength;
			$('#clickedPicture img').attr('src',pictureSrc);
		}
		
	});

	//stop image propagation on arrows and also move image to the next picture when right arrow is clicked
	arrowRightDiv.on('click', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#pictureContainer li').length)-1;
		$('#pictureContainer li img').each(function(){
			if($(this).attr('src') == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber < listLength) {
			picNumber = picNumber + 1;
			pictureSrc = $('#pictureContainer li').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',pictureSrc);
		} else {
			picNumber = 0;
			pictureSrc = $('#pictureContainer li').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',pictureSrc);
		}

	});

	//image popup to rotate with right swipe on cell phones **************************************************************************

	$('clickedImageHolder img').on('swipeleft', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#pictureContainer li').length)-1;
		$('#pictureContainer li img').each(function(){
			if($(this).attr('src') == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber > 0 || picNumber < listLength - 1) {
			picNumber = picNumber - 1;
			pictureSrc = $('#pictureContainer li').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',pictureSrc);
		} else if (picNumber == 0) {
			picNumber = listLength;
			$('#clickedPicture img').attr('src',pictureSrc);
		}
		
	});

	//hides the popup gallery picture
	clickedPictureDiv.on('click', function(){
		console.log('hello');
		$(this).hide();
		$('#pictureContainer').show();
	});

	//hide menu paragraph when menu is clicked for small media.  Also shows navbar.
	$('#menuIcon img').on('click',function(){
		console.log('hello');
		$('#navbar').slideToggle();
		$('#menuIcon p').toggle();
	});

}); //end doc ready