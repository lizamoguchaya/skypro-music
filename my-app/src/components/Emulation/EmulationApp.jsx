import { useEffect, useState } from "react";

// import "../../App.css";
import NavMenu from "../NavMenu/NavMenu.jsx";
import Search from "../Search/Search.jsx";
import Filters from "../Filters/Filters.jsx";
import App from "../../App.jsx";
import {
    EmulationTracklist,
    EmulationSidebar,
    EmulationPlayer
}
 from "./EmulationLoading.jsx";
 import * as S from "../../App.styles.js";
 import { GlobalStyle } from "../../App.styles.js";
 


 function EmulationApp() {
  return (
    <>
      <GlobalStyle />
      <S.Container>
        <S.Main>
          {/* <NavMenu /> */}
          <div>
            <Search />
            <S.CenterblockH2>Треки</S.CenterblockH2>
            <Filters />
            <EmulationTracklist />
          </div>
          <EmulationSidebar />
        </S.Main>
        <EmulationPlayer />
        <footer></footer>
      </S.Container>
    </>
  );
}

  function ShowEmulationApp() {
    const [visibleComponent, setVisibleComponent] = useState(<EmulationApp />);
  
    useEffect(() => {
      const timerId = setTimeout(() => {
        setVisibleComponent(<App />);
      }, 2000);
  
      return () => {
        clearTimeout(timerId);
      };
    });
  
    return <div>{visibleComponent}</div>;
  }
  
  export { EmulationApp, ShowEmulationApp };