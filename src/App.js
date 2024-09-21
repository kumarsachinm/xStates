import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching data: ", error));
    console.log(countries);
  }, []);


  useEffect(() => {
    if (countryName){
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
      .then((response) => response.json())
      .then((data) => {setStates(data);
                      setStateName("");
                      setCities([]);
                      setCityName("");
      })
      .catch((error) => console.error("Error fetching data: ", error));
    console.log(states);}

  }, [countryName]);
    
    useEffect(() => {
    if (countryName && stateName ){
    fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
      .then((response) => response.json())
      .then((data) => {setCities(data);        
        setCityName("");
})
      .catch((error) => console.error("Error fetching data: ", error));
    console.log(cities);}
  }, [stateName]);


  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="col-12">
        <select
          className="drop1"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        >
          <option disabled value="">Select Country</option>
          {countries.map((country, index) => 
            <option key={index} value={country}>
              {country}
            </option>
          )}
        </select>
      
        <select
          className="drop2"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
        >
          <option disabled value="">Select State</option>
          {states.map((state, index) => 
            <option key={index} value={state}>
              {state}
            </option>
          )}
        </select>

        <select className="drop3"  value={cityName}
          onChange={(e) => setCityName(e.target.value)}>
          <option disabled value = "">Select City</option>
          {cities.map((city, index) => 
            <option key={index} value={city}>
              {city}
            </option>
          )}
        </select>
      </div>
     { (countryName && stateName && cityName) &&<h3>You selected {cityName}, {stateName}, {countryName}:</h3>}
    </div>
  );
}

export default App;
