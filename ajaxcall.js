$(document).ready(function() {
//--------------------------------

	var htmlToAdd;

	$.getJSON('image-location.json', function(response){
			var jsonLength = response.length;
			for(var i = 0; i < jsonLength; i++) {
				var dataReturned = response[i].location;
				htmlToAdd += "<li><img src='";
				htmlToAdd += dataReturned;
				htmlToAdd += "'width='300' onContextMenu='return false;'> </li>";
				$('#pictureContainer ul').html(htmlToAdd);
			}


	});
	//resort images to end if they are really wide.
	var currentli;
	var liArray = $('#pictureContainer li');
	liArray.each(function(index){
		if ($('#pictureContainer li:nth-child('index')').children().naturalHeight > 2500) {
			
			var appendHTML = $('#pictureContainer li:nth-child('index'').html();
			$('#pictureContainer li:nth-child('index'').remove();
			$('#pictureContainer ul').append(appendHTML);
		}
	});

//----------------------------------	
});