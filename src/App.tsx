import { Routes, Route } from "react-router-dom";
import RouterApp from "./consts/router";
import MainPage from "./pages/main";

function App() {
  return (
    <>
      <Routes>
        <Route path={RouterApp.Main} element={<MainPage />}></Route>
        <Route path={""} element={<MainPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
