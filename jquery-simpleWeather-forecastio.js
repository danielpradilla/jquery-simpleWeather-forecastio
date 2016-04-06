/*! simpleWeather with forecastio - based on simpleWeather v3.1.0 - http://simpleweatherjs.com */

(function($) {
  'use strict';

  var GEONAMES_KEY = 'YOUR_GEONAMES_USERNAME';
  var FORECASTIO_KEY = 'YOUR_FORECASTIO_API_KEY';
  $.extend({
    simpleWeather: function(options){
      options = $.extend({
        location: '',
        woeid: '',
        unit: 'us',
        success: function(weather){},
        error: function(message){}
      }, options);

      var now = new Date();
      var geoNamesUrl = 'http://api.geonames.org/search?callback=?&type=json&featureClass=P&username='+GEONAMES_KEY+'&q=' + options.location;
      $.getJSON(
        encodeURI(geoNamesUrl),
        function(locations) {
          if (locations!==null && locations.totalResultsCount>0) {
            var location = locations.geonames[0];
            var weatherUrl = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/' + location.lat + ',' + location.lng + '?callback=?&units='+options.unit;
            $.getJSON(
              encodeURI(weatherUrl),
              function(data) {
                if(data !== null && data.daily.data.length>0) {
                  var currently = data.currently,
                      daily = data.daily.data,
                      weather = {},
                      forecast,
                      compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'],
                      image404 = 'https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png',
                      units= {
                        us: 'todo',
                        si: 'todo'
                      };

                  weather.title = currently.summary;
                  weather.temp = Math.round(currently.temperature);
                  weather.code = currently.icon;
                  weather.todayCode = currently.icon;
                  weather.icon = currently.icon;
                  weather.currently = currently.summary;
                  weather.high = Math.round(daily[0].temperatureMax);
                  weather.low = Math.round(daily[0].temperatureMin);
                  weather.text = daily[0].summary;
                  weather.humidity = currently.humidity;
                  weather.pressure = currently.pressure;
                  weather.visibility = currently.visibility;
                  weather.sunrise = moment.unix(daily[0].sunriseTime).format('H:mm');
                  weather.sunset =  moment.unix(daily[0].sunsetTime).format('H:mm');
                  weather.description = currently.symmary;
                  weather.city = location.name;
                  weather.country = location.countryCode;
                  weather.region = location.adminName1;
                  weather.updated = moment.unix(currently.time).format();
                  // weather.link = result.item.link;
                  //weather.units = {temp: result.units.temperature, distance: result.units.distance, pressure: result.units.pressure, speed: result.units.speed};
                  //weather.wind = {chill: result.wind.chill, direction: compass[Math.round(result.wind.direction / 22.5)], speed: result.wind.speed};

                  weather.forecast = [];
                  for(var i=0;i<daily.length;i++) {
                    daily[i].day = moment.unix(daily[i].time).format('ddd');
                    daily[i].high = Math.round(daily[i].temperatureMax);
                    daily[i].low = Math.round(daily[i].temperatureMin);
                    daily[i].forecast = daily[i].summary;
                    forecast = daily[i];
                    weather.forecast.push(forecast);
                  }

                  options.success(weather);
                } else {
                  options.error('There was a problem retrieving the latest weather information.');
                }
              }
            );
          }
        }
      );
      return this;
    }
  });
})(jQuery);
