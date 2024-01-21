import React from "react";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MapContainer } from "react-leaflet";
import MapComponent from "./MapComponent";

function Weather({ weather }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  return (

    <>
      {
        windowWidth < 420 ? (
          <>
            <div className="mt-2 weather">
              <WeatherInfo weather={weather} />
              <MapInfo weather={weather} />
            </div>
          </>) : (
          <>
            <Row className="mt-2 weather">
              <WeatherInfo weather={weather} />
              <MapInfo weather={weather} />
            </Row>
          </>)
      }

    </>

  );
}
function WeatherInfo({ weather }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("/");

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  return (
    <>
      {windowWidth < 420 ? (
        <>
          <Col xs={12} className="d-flex flex-column weatherimg wiscroll text-light">
            <div className="d-flex justify-content-around w-100">
              <span className="display-3 fw-medium">{weather ? (Math.round(weather.temperature - 275.15)) : ""}°C</span>

              <div className="d-flex flex-row align-items-center me-3">
                <i className="me-1 bi-calendar fs-3"></i>
                <span className="fs-3">{formattedDate}</span>
              </div>
            </div>
            <div className="d-flex align-items-center align-items-start">
              <i className="bi bi-sun fs-1 text-warning"></i>
              <span className="fs-5">{weather ? weather.description : ""}</span>
            </div>
            <div>
              <div className="d-flex flex-row align-items-center">
                <i className="me-1 bi bi bi-geo-alt fs-3"></i>
                <span className="fs-3">{weather ? `${weather.country},${weather.city}` : ""}</span>
              </div>
            </div>
          </Col>
        </>) :
        (<>
          <Col xs={12}>
            <div className="d-flex flex-column flex-md-row weatherimg wiscroll text-light">
              <Col xs={12}>
                <div className="d-flex flex-column  today-info-wrapper">
                  <Col xs={12} className="today-info ">
                    <span className="display-3 fw-medium">{weather ? (Math.round(weather.temperature - 275.15)) : ""}°C</span>
                    <div className="d-flex flex-column align-items-center ">
                      <i className="bi bi-sun fs-1 text-warning"></i>
                      <span className="fs-5">{weather ? weather.description : ""}</span>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    className="d-flex flex-row align-items-center justify-content-center h-50"
                  >
                    <div className="d-flex flex-row align-items-center me-3">
                      <i className="me-1 bi-calendar fs-3"></i>
                      <span className="fs-3">{formattedDate}</span>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <i className="me-1 bi bi bi-geo-alt fs-3"></i>
                      <span className="fs-3">{weather ? `${weather.country},${weather.city}` : ""}</span>
                    </div>
                  </Col>
                </div>
              </Col>
            </div>
          </Col>
        </>)}
    </>
  );
}

function MapInfo({ weather }) {

  const [loading, setLoading] = useState(true);
  const [markerPosition, setMarkerPosition] = useState([
    50, 50]);

  useEffect(() => {

    if (weather) {
      setMarkerPosition([weather.latitude,weather.longitude])
      setLoading(false);
    }
  }, [weather]);

  function setX(x) {
    setMarkerPosition(prev => [x, prev[1]]);

  }
  function setY(y) {
    setMarkerPosition(prev => [prev[0],y]);
  }

  function handleMarkPosition() {
    // setX(xplace);
    // setY(yplace);
  }

  /* useEffect(() => {
    setMarkerPosition([xplace, yplace]);
    console.log(markerPosition)
  }, [xplace, yplace]) */



  return (
    <Col xs={12}>
      {loading ? (

        <p>Loading ...</p>
      ) : (
        <MapContainer style={{ height: "230px", borderRadius: "8px", overflow: "hidden" }}>
          <MapComponent
            x={markerPosition[0]}
            y={markerPosition[1]}
            onXChange={setX}
            onYChange={setY}
            onSetMarkPosition={handleMarkPosition}
            markerPosition={markerPosition}
          />
        </MapContainer>
      )}
    </Col>
  );
}

export default Weather;
