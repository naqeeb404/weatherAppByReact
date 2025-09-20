import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons/faMap";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import axios from "axios";

const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  let [isPopOpen, setIsPopupOpen] = useState(false);
  let [city, setCity] = useState('Islamabad')
  let [wData, setWdata] = useState({});
  let [coords, setCoords] = useState([]);
  
  let getWaetherDataByCity = () => {

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q : city,
          appid: apikey,
          units: "metric"
        },
      })
      .then((response) => {
        setWdata(response.data)
        console.log(response.data.main.temp)
      })
      .catch((error)=>{

        console.log('EROR',error)
      

      });
  };

  let getWeatherDataByCoords = () => {
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: coords[0],
          lon: coords[1],
          appid: apikey,
          units: "metric"
        },
      })
      .then((response) => {
        setWdata(response.data)
        console.log(response.data.main.temp)
      })
      .catch((error)=>{

        console.log('EROR',error)
      

      });
  };

  let getAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords([position.coords.latitude, position.coords.longitude]);
          
        },
        (error) => {
          console.log("Noting found");
        }
      );
    } else {
      console.log("Not supported");
    }
  };

  useEffect(()=>{

    if(coords.length === 2){
      getWeatherDataByCoords();
    }

    

  },[coords]);

  useEffect(()=>{
    getAutoLocation();
  },[]);

  useEffect(()=>{
    getWaetherDataByCity();
  },[city])

  return (
    <>
      
      <div className=" h-screen  bg-[url('https://www.bpmcdn.com/f/files/vernon/import/2019-05/17010738_web1_Sky-Blue-White-Sunny-Day-Sunny-Summer-Day-Clouds-1117586.jpg;w=960')] bg-cover bg-center">
        {isPopOpen ? (
          <div className="flex items-center justify-center fixed inset-0 z-50  h-screen">
            <Search isShow={setIsPopupOpen} setCity={setCity} />
          </div>
        ) : (
          ""
        )}

        <div className="bg-[#000000e8] h-full">
          <div className="max-w-[90%] m-auto flex flex-col h-full gap-[20px] p-[30px_30px] ">
            <div className="flex flex-row justify-between">
              <h1 className="text-amber-50">WEATHER APP</h1>
              <FontAwesomeIcon
                icon={faSearch}
                className="text-amber-50"
                onClick={() => setIsPopupOpen(true)}
              />
            </div>

            <div className="flex flex-row gap-[30px] h-full">
              <div className="lg:basis-3/4 sm:basis-2/4 basis-2/4 h-full flex flex-col justify-center items-center">
                <div className="flex justify-center items-center">
                  <h1 className="text-white text-[50px] lg:text-[150px]">  {wData.main ? Math.round(wData.main.temp)  : "--"} <span className="text-[50px]">°C</span> </h1> 
                 
                </div>

                <div className="flex flex-row justify-center gap-[30px]">
                  <div>
                    <h1 className="text-amber-50">Feels like: {wData.main ? wData.main.feels_like : "--"}</h1>
                  </div>
                  <div>
                    <h1 className="text-amber-50">Humidity: {wData.main? wData.main.humidity : "--"}</h1>
                  </div>
                </div>
              </div>

              <div className=" lg:basis-1/4 sm:basis-2/4 basis-2/4 p-[25px] border-0 rounded-[5px] shadow bg-[#ffffff21] h-full">
                <div className="flex flex-col gap-[10px]">


                  <div className="flex">
                    {wData.weather[0]? <img src={`https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`} alt="" /> 
                    :
                    ""}
                    
                  </div>
                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">{wData.main ? wData.name : "--"}</p>
                  </div>

                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Latitude: {coords[0] }</p>
                  </div>

                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Longitude: {coords[1]}</p>
                  </div>

                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Min: {wData.main? wData.main.temp_min : "--"}</p>
                  </div>


                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Max: {wData.main? wData.main.temp_max : "--"}</p>
                  </div>


                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Wind Speed: {wData.wind? wData.wind.speed : "--"}</p>
                  </div>


                  <div className="flex flex-row gap-[15px] items-center">
                    <FontAwesomeIcon icon={faMap} />
                    <p  className="text-amber-50">Now: {wData.weather? wData.weather[0].description : "--"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
