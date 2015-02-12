$(document).ready(function() {

	//create a pop up for pictures in gallery
	var xout = $("<div id='xout'></div>");
	var clickedPictureDiv = $("<div id = 'clickedPicture'></div>");
	var clickedImageHolderDiv = $("<div id='clickedImageHolder'></div>");
	var clickedPicImg = $("<img class = 'imagePopup' onContextMenu='return false;'>");
	var arrowLeftDiv = $("<div id='arrowLeft'></div>");
	var arrowRightDiv = $("<div id='arrowRight'></div>");
	var picNumber;

	clickedPictureDiv.append(xout);
	clickedImageHolderDiv.append(arrowLeftDiv);
	clickedImageHolderDiv.append(arrowRightDiv);
	clickedImageHolderDiv.append(clickedPicImg);
	clickedPictureDiv.append(clickedImageHolderDiv);
	
	//function to resize the images to 
	var imgResize = function() {
		var img = $('#clickedImageHolder img');
		var w = img.width();
		var h = img.height();
		//if height is bigger than width scale to fit window height only if window size is greater than 768
		if (window.innerWidth > 768) {
			//reset class
				img.removeClass();
			//if picture height is greater than width display w/ portraitImage class
			if (h > w) {
				img.addClass('portraitImage');
			} else {
				img.addClass('imagePopup');
			}
		}
	};

	var masonryUpdate = function() {
    	setTimeout(function() {
        	$('#container').masonry();
    	}, 150);
	}

	//function to splice "thumbnail" out of image source to show High Def picture
	var thumbnailSplice = function(string) {
		var newSource = string.replace("Thumbnails/", "");
		return newSource;
	};

	//masonry
	$(window).load(function(){
		//add masonry for pictures
		var $container = $('#container');
		// initialize
		$container.masonry({
  			columnWidth: 0,
  			itemSelector: '.item',
  			isFitWidth: true
		});
	});
	


	$('#container').on('click','img',function() {
		$('#container').hide();
		//create div for clickedPicture
		var imgSrc = $(this).attr('src');
		imgSrc = thumbnailSplice(imgSrc);
		clickedPicImg.attr('src', imgSrc);
		//make sure image loaded before showing div
		imagesLoaded(clickedPicImg,function(){
			$('body').append(clickedPictureDiv);
			clickedPictureDiv.show();
			$('html,body').scrollTop(0);
		});
	});

	//stop image propagation so that when you click the big image popup it doesn't trigger the click event to go back to the gallery
	clickedPicImg.click(function(event){
		event.stopPropagation();
	});
	//stop image propagation on arrows and also move image to the next picture when left arrow is clicked
	arrowLeftDiv.on('click', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		popupImg = thumbnailSplice(popupImg);
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#container div').length)-1;
		$('#container div img').each(function(){
			var thisSource = $(this).attr('src');
			thisSource = thumbnailSplice(thisSource);
			if(thisSource == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber > 0 || picNumber < listLength - 1) {
			picNumber = picNumber - 1;
			pictureSrc = $('#container div').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',thumbnailSplice(pictureSrc));
		} else if (picNumber == 0) {
			picNumber = listLength;
			$('#clickedPicture img').attr('src',thumbnailSplice(pictureSrc));
		}		
	});

	
	//stop image propagation on arrows and also move image to the next picture when right arrow is clicked
	arrowRightDiv.on('click', function(event){
		event.stopPropagation();
		var popupImg = clickedPicImg.attr('src');
		popupImg = thumbnailSplice(popupImg);
		//find index position of li with popup picture src to know which picture to pop up next.
		var listLength = ($('#container div').length)-1;
		//get current index of img showing
		$('#container div img').each(function(){
			var thisSource = $(this).attr('src');
			thisSource = thumbnailSplice(thisSource);
			if(thisSource == popupImg) {
				picNumber = $(this).parent().index();
			}
		});
		var pictureSrc;
		if(picNumber < listLength) {
			picNumber = picNumber + 1;
			pictureSrc = $('#container div').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',thumbnailSplice(pictureSrc));
		} else {
			picNumber = 0;
			pictureSrc = $('#container div').eq(picNumber).children().attr('src');
			$('#clickedPicture img').attr('src',thumbnailSplice(pictureSrc));
		}
	});

	//hides the popup gallery picture
	clickedPictureDiv.on('click', function(){
		$(this).hide();
		$('#container').show();
		//get masonry to load correctly after exiting main image
		masonryUpdate(); 
	});

	//touchstart added for IOS safari 'click' bug.  
	xout.on('click touchstart', function(){
		clickedPictureDiv.hide();
		$('#container').show();
		//get masonry to load correctly after exiting main image
		masonryUpdate(); 
	});

	//hide menu paragraph when menu is clicked for small media.  Also shows navbar.
	$('#menuIcon img').on('click',function(){
		$('#navbar').slideToggle();
		$('#menuIcon p').toggle();
	});

	//make sure navbar is showing if window is resized after it has been hidden and also make sure portrait image is displayed correctly.
	$(window).resize(function(){
		var x = window.innerWidth;
		if (x > 380) {
			$('#navbar').show();
		} else if (x < 380) {
			$('#navbar').hide();
			$('#menuIcon p').show();
		}
		masonryUpdate();
		$('html,body').scrollTop(0);
	});

}); //end doc ready