import React from 'react'
import '../App.css'

import ClearN from '../assets/svg/01n.svg'
import ClearD from '../assets/svg/01d.svg'
import FewCloudsD from '../assets/svg/02d.svg'
import FewCloudsN from '../assets/svg/02n.svg'
import ScatteredCloudsD from '../assets/svg/03d.svg'
import ScatteredCloudsN from '../assets/svg/03n.svg'
import OverCastD from '../assets/svg/04d.svg'
import OvercastN from '../assets/svg/04n.svg'
import Rain from '../assets/svg/09d.svg'
import ShowerD from '../assets/svg/10d.svg'
import ShowerN from '../assets/svg/10n.svg'
import Thunderstorm from '../assets/svg/11d.svg'
import Snow from '../assets/svg/13d.svg'
import Mist from '../assets/svg/50d.svg'
import Humid from '../assets/svg/humidity.svg'
import Wind from '../assets/svg/wind.svg'
import Barometer from '../assets/svg/barometer.svg'


export default function Weather() {

  const [currentWeather, setCurrentWeather] = React.useState({})
  const [city, setCity] = React.useState('')
  
  const API_KEY = "fda91cda3b13b594c81067124aa2d6b1"
  
  let icons = [ClearD, ClearN, FewCloudsD, FewCloudsN, ScatteredCloudsD, ScatteredCloudsN, OverCastD, OvercastN, Rain, ShowerD, ShowerN, Thunderstorm, Snow, Mist ]

  function error(err){
    console.log(`Error : ${err.message}`)
  }

  function getIcon(str){
    switch(str){
      case '01d' : 
        return icons[0]
        break;  
      case '01n' : 
        return icons[1]
        break;  
      case '02d' : 
        return icons[2]
        break;  
      case '02n' : 
        return icons[3]
        break;  
      case '03d' : 
        return icons[4]
        break;  
      case '03n' : 
        return icons[5]
        break;  
      case '04d' : 
        return icons[6]
        break;
      case '04n' :
        return icons[7]  
      case '09d' : 
      case '09n' :
        return icons[8]  
      case '10d' :
        return icons[9]
        break;
      case '10n' :
        return icons[10]
        break;
      case '11d' :
      case '11n' :
        return icons[11]
        break;
      case '13d' :
      case '13n' :
        return icons[12]
        break;
      case '50d':
      case '50n':
        return icons[13]
        break;    
      default:
        return icons[0]
        break  
    }

  }

  React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) =>{
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Math.round(position.coords.latitude * 10) / 10}&lon=${Math.round(position.coords.longitude * 10) / 10}&appid=${API_KEY}&units=metric`)

          const data = await res.json()
          setCurrentWeather(data) 

        }, error)
        
     }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await response.json()
      setCurrentWeather(data)                                   
      setCity('')
      console.log(data)
    }catch(error){
      console.error(error)
    }

  }

  
  return ( 
  <div className='container'>
    <h1>Weatherly</h1>
    <form onSubmit={handleSubmit} className='inputForm'>
      <input
        type="search"
        value={city}
        onChange= {(e) => setCity(e.target.value)}
        placeholder = 'Enter a city'
        className='inputSearch'
      />
    </form> 
    <main>
     {currentWeather?.cod == '200' ? <> <section className='main_info'>
        <h2>{currentWeather?.name}, {currentWeather?.sys?.country}</h2>
         <div className='tempDiv'>
              <img src={getIcon(currentWeather?.weather[0].icon)}/>
              <span>{Math.round(currentWeather?.main?.temp)} &#8451; </span>
              <p>{`feels like ${Math.round(currentWeather?.main?.feels_like)}`} &#8451;</p>
          </div> 
      </section>                          
       <div className='line_div'>{''}</div>
       <section className='side_info'>
        <div className='details'>
          <img src={Humid}/>  
          <div> 
            <p>Humidity</p>
            <span>{currentWeather?.main?.humidity}%</span>
          </div>
        </div>
        <div className="details">
          <img src={Wind}/> 
          <div>
            <p>Wind Speed</p>
            <span>{currentWeather?.wind?.speed} km/h</span>
          </div>
        </div>  
        <div className="details">
          <img src={Barometer}/>
          <div> 
            <p>Pressure</p>
            <span>{currentWeather?.main?.pressure} hPa</span>
          </div>
        </div>   
       </section>
       </>: currentWeather?.cod == '404' ? <main>
                                             <h2>Place not found<br/>Enter a different city</h2>
                                           </main> 
                                         : <h1>Loading....</h1>}  
    </main>  
  </div>
  )
}
