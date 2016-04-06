/*global JSONFormatter */

jQuery( document ).ready(function( $ ) {

  	$('#form').submit(function(event){
  		event.preventDefault();
  		processForm();
  	});


	var success = function(weather) {
		console.log(weather);
		var formatter = new JSONFormatter(weather);
		$('#result').html(formatter.render());
  		$('.loading').addClass('hidden');
	};

  	var processForm = function() {
  		$('.loading').removeClass('hidden');
  		$.simpleWeather({
	        location: $('input').val(),
	        unit: 'si',
	        success: success
	    });
  	};

});