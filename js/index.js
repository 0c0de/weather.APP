$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.latitude;
      var secretKey = '6941195e681ddcc6bd88c1f0798993f0';
      var url = 'https://api.darksky.net/forecast/'+secretKey+'/'+longitude+','+latitude+'';
      $.ajax({
        method: 'GET',
        url: url,
        dataType: 'JSONP',
        success: function(good){
          console.log(JSON.stringify(good));
          $('.actual-temp-text').text(good.currently.temperature + " ºF");
          $('.actual-wind-text').text(good.currently.windSpeed + " MPH");
          $('.actual-time-text').text(good.currently.summary);
          $('.actual-humidity-text').text(good.currently.humidity);
          var place = good.timezone.replace(/_/gi, " ");
          $('.place-text').text("Time at " + place);
          switch(good.currently.icon){
            case "clear-day":
              $('#imageTime').append('<i class="wi wi-day-sunny medium"></i>');
              break;
            case "clear-night":
              $('#imageTime').append('<i class="wi wi-night-clear medium"></i>');
              break;
            case "rain":
              $('#imageTime').append('<i class="wi wi-day-sunny"></i>');
              break;
            case "sleet":
              $('#imageTime').append('<i class="wi wi-sleet medium"></i>');
              break;
            case "fog":
              $('#imageTime').append('<i class="wi wi-fog medium"></i>');
              break;
            case "cloudy":
              $('#imageTime').append('<i class="wi wi-cloud"></i>');
              break;
            case "partly-cloudy-day":
              $('#imageTime').append('<i class="wi wi-day-cloudy"></i>');
              break;
            case "partly-cloudy-night":
              $('#imageTime').append('<i class="wi wi-night-alt-cloudy"></i>');
              break; 
          }
           var isChanged = false;
          $('.actual-temp-box').on('click', function(){
            if(isChanged = !isChanged){
              $('.actual-temp-text').text(Fah2Cel(good.currently.temperature) + " ºC");
            }else{
              $('.actual-temp-text').text(good.currently.temperature + " ºF"); 
            }
          });
          
          function Fah2Cel(temp){
            var degrees = (temp - 32) / 1.8;
            return Math.round(degrees * 10) / 10;
          }
        }
      });
    });
  }else{
    alert("Your browser not support this or you cancelled the action");
  }
});