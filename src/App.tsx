import "./App.scss";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { APP_ROUTES } from "./utils/enums";
import Home from "src/pages/Home";
import PokemonDetail from "src/pages/PokemonDetail";
import MyPokemonList from "./pages/MyPokemonList";

import "bootstrap/dist/css/bootstrap.min.css";

interface pokemonInfo {
  name: string;
  url: string;
}

export interface fetchedResultsSchema {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonInfo[];
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={APP_ROUTES.ROOT}
            element={<Navigate to={APP_ROUTES.HOME} />}
          />
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.MY_LIST} element={<MyPokemonList />} />
          <Route path={APP_ROUTES.POKEMON_DETAIL} element={<PokemonDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
