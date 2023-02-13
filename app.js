var findWeather=document.getElementById("findWeather");

var inputLocation=document.getElementById("input");
var dayType=document.getElementById("dayType");
var temp=document.getElementById("temp");
var humidity=document.getElementById("humidity");
var windSpeed=document.getElementById("widnSpeed");
var UV=document.getElementById("UV");
var airPress=document.getElementById("airPress");
var Visible=document.getElementById("Visible");
var body=document.getElementById("body");

var weatherLogo=document.getElementById("report-logo");

var currWeatherImg="";
var howIsDay="";



weatherLogo.style.imageRendering

function getBackgroudImage()
{
  
  var text1=howIsDay.replace(/[^a-zA-Z0-9 ]/g, '');

  console.log(text1);
  if(text1.startsWith("S"))
  {
    body.style.backgroundImage= "url(img/Sunny.jpg)";
  }
  if(text1.startsWith("C"))
  {
    body.style.backgroundImage= "url(img/clear.jpg)";
  }
  if(text1.startsWith("P"))
  {
    body.style.backgroundImage= "url(img/partlyCloudy.jpg)";
  }
  if(text1.startsWith("M"))
  {

    body.style.backgroundImage= "url(img/mist.jpg)";
  }

}

function getWeatherIcon(currWeatherImg)
{
  let divLocation = document.getElementById("report-logo");
  let imgElement = document.createElement("img");
  currWeatherImg=currWeatherImg.replace(/"|'/g, '');
 
  imgElement.src = "https:"+currWeatherImg;
  divLocation.append(imgElement);
}

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

const Apiurl = 'https://weatherapi-com.p.rapidapi.com/current.json?q=';

function Geturl(location)
{
    return Apiurl+location;
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

    //getting the current weather icon here
    currWeatherImg=JSON.stringify(json.current.condition.icon);
    console.log(currWeatherImg);
    getWeatherIcon(currWeatherImg);

    //setting the backgroud image here
    howIsDay=JSON.stringify(json.current.condition.text);
    console.log(howIsDay);
    getBackgroudImage();
    

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