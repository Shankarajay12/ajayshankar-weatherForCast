var findWeather=document.getElementById("findWeather");

var inputLocation=document.getElementById("input");
var dayType=document.getElementById("dayType");
var temp=document.getElementById("temp");
var humidity=document.getElementById("humidity");
var windSpeed=document.getElementById("widnSpeed");
var UV=document.getElementById("UV");
var airPress=document.getElementById("airPress");
var Visible=document.getElementById("Visible");

var currWeatherImg="";

//document.getElementById("report-logo").attr('src', currWeatherImg);

var UVindex=0;

function getUVvalue(index)
{
  if(index<=2)
  {
    return "low";
  }
  else if(index<=5)
  {
    return "moderate";
  }
  else if(index<=7)
  {
    return "high";
  }
  else if(index<=10) {
    return "Very high"
  }
  else{
    return "extreme"
  }
}

const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';

function Geturl(location)
{
    return url+location;
}

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '39190f4e34msh9705c1c09d7d6d6p1cd7a8jsn6212cb68eacd',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  function errorOcc(error){
    alert("Error Occured try after sometime! ")
    console.log("Error Occured: "+error);
  }
  

function getWeather()
{
    var location=inputLocation.value;
    fetch(Geturl(location), options)
  .then(res => res.json())
  .then(json => {
    //var output=json.current.temp_c; 
    currWeatherImg=JSON.stringify(json.current.condition.icon);

    dayType.innerHTML=JSON.stringify(json.current.condition.text);
    temp.innerHTML=JSON.stringify(json.current.temp_c)+"&#176;C";
    humidity.innerHTML=JSON.stringify(json.current.humidity)+"%";
    windSpeed.innerHTML=JSON.stringify(json.current.wind_kph)+"km/h";

    UVindex=JSON.stringify(json.current.uv);
    UV.innerHTML=getUVvalue(UVindex);

    airPress.innerHTML=JSON.stringify(json.current.pressure_mb)+"hPa";
    Visible.innerHTML=JSON.stringify(json.current.vis_km)+"km";

  })
  .catch(errorOcc);

}





findWeather.addEventListener("click",getWeather);