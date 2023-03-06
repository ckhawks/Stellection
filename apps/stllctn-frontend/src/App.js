import { GeistProvider, CssBaseline, Button } from "@geist-ui/react";
import { useState } from "react";

import "./App.css";

import Router from "./routes/Router";

import { AuthProvider } from "./contexts/AuthContext";

// https://beta.reactjs.org/learn/sharing-state-between-components

function App() {
  const [themeType, setThemeType] = useState("light");
  const enableDebugThemeButton = false;
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };

  return (
    <div className="App">
      <AuthProvider>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          {enableDebugThemeButton && (
            <Button onClick={switchThemes} height="200px">
              switch theme
            </Button>
          )}

          <Router />

          {/* <YourComponent onClick={switchThemes} /> */}
        </GeistProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
