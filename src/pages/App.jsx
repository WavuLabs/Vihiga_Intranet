import { Container } from "@mui/material";
import RouteStates from "../APIs/RouteStates";
import "../styles/App.css";

function App() {
  return (
    <Container className="relative">
      <RouteStates />
    </Container>
  );
}

export default App;
