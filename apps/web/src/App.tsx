import type React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import { Layout } from "./Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <RoutesComponent />
      </Layout>
    </Router>
  );
};

export default App;
