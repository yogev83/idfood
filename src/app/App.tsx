import { BrowserRouter as Router } from "react-router-dom";
import { Nav } from "../components/nav/nav";
import { UserProvider } from "./userContext/userProvider";
import { Header } from "../components/header/header";

import "./App.css";

// Use the Router in your app
function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Nav />
      </Router>
    </UserProvider>
  );
}

export default App;
