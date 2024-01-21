import React from 'react'
export default function MobileWeather({ humidity, precipitation, temperature, wind_speed }) {
   return (

      <>
         <div style={{ flexDirection: "column", width: "auto" }} className='d-flex text-center' >
               <p className="titleSituation">
                  humidity
               </p>
               <p className='valueSituation'>
                  {humidity}
               </p>
         </div>
         <div style={{ flexDirection: "column", width: "auto" }} className='d-flex text-center' >
            
               <p className="titleSituation">
                  precipitation
               </p>
               <p className='valueSituation'>
                  {precipitation}
               </p>
            
         </div>
         <div style={{ flexDirection: "column", width: "auto" }} className='d-flex text-center' >
            
               <p className="titleSituation">
                  temperature
               </p>
               <p className='valueSituation'>
                  {temperature}
               </p>
            
         </div>
         <div style={{ flexDirection: "column", width: "auto" }} className='d-flex text-center' >
            
               <p className="titleSituation">
                  wind speed
               </p>
               <p className='valueSituation'>
                  {wind_speed}
               </p>
            
         </div>
      </>


   )
}
