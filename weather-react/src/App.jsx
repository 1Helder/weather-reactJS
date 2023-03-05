import { useState } from "react";

function App() {
  const [city, setCity] = useState("")
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=4f5e15a031d84381910181120232002&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => {
        setWeatherForecast(data)
      })
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand text-white" href="#top">
          Previsão do tempo
        </a>
      </nav>
      <main className="container">
        <div className="mt-4 p-5 bg-dark text-white rounded">
          <h1>Verifique o clima na sua cidade</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                className="form-control"
                value={city}
                onChange={handleChange}
                placeholder="Ex: Salvador, BA" />
            </div>
          </div>
          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {
            weatherForecast ? (
              <div>
                <div className="mt-4 d-flex align-items-center">
                  <div>
                    <img src={weatherForecast.current.condition.icon} alt="Clima" />
                  </div>
                  <div>
                    <h3>Clima: {weatherForecast.current.condition.text}</h3>
                    <p className="lead">
                      Temp: {weatherForecast.current.temp_c}°C <br />
                      Sensação Termica: {weatherForecast.current.feelslike_c}°C
                    </p>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </main>
    </div>
  );
}

export default App;
