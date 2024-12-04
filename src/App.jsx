import React from "react";
import "./App.scss";
import { Search } from "./components/Search/Search";
import { SpaceshipList } from "./components/Spaceship/SpaceshipList";
import { SpaceProvider } from "./context/SpaceContext";

function App() {
  return (
    <SpaceProvider>
      <div className="App flex w-full h-screen flex flex-col p-10">
        <Search />
        <SpaceshipList />
      </div>
    </SpaceProvider>
  );
}

export default App;
