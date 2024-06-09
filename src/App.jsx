import "./App.sass";
import { SkeletonTheme } from "react-loading-skeleton";

import Title from "./components/Title";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

function App() {
  return (
    <SkeletonTheme baseColor="transparent" highlightColor="#ffffff">
      <div className="App">
        <Title />
        <MainSection />
        <Footer />
      </div>
    </SkeletonTheme>
  );
}

export default App;
