import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Roadmap from "./components/Roadmap";
import Services from "./components/Services";
import TestApp from "./components/TestApp";

import { Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";

const App = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
          <Routes>
            <Route path="/" element={
              <><Hero /><Roadmap /><Services /><TestApp /></>
            } />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        <Footer />
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
