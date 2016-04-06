jquery-simpleWeather-forecastio
===

This is a fork of [simpleWeather](http://simpleweatherjs.com/) modified to work with the [forecast.io](http://forecast.io) API

I got tired of the hiccups in the Yahoo Weather API in the early months of 2016. It also seemed that forecast.io had a reasonable and understandable business model with their API.

This also uses the GeoNames API to do natural-text searches.

## Get started

Register at [geonames.org](http://www.geonames.org/), and activate your account for API use.

Register at [forecast.io](http://forecast.io), and get your API key.

Open jquery-simpleWeather-foreacast.io and put your geonames username at GEONAMES_KEY = 'YOUR_GEONAMES_USERNAME' and your forecast.io API key at   var FORECASTIO_KEY = 'YOUR_FORECASTIO_API_KEY'.

Yeah, I know, sending the keys in the open is a big no-no. Tough luck. 

The correct way to do this is by proxying (and caching) the requests through a small proxy, like [proxy-php](https://github.com/gentics/proxy-php)



## License

Licensed under MIT
