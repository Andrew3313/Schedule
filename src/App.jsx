import Title from "./components/Title/Title";
import MainSection from "./components/MainSection/MainSection";
import "./App.sass";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="transparent" highlightColor="#ffffff">
      <div className="App">
        <Title />
        <MainSection />
      </div>
    </SkeletonTheme>
  );
}

export default App;
