import { useState } from "react";
import * as S from "./App.styles.js";
import { GlobalStyle } from "./App.styles.js";
import { AppRoutes } from "./routes.jsx";
import { UserContext } from "./Authorization.js";
import { useNavigate } from "react-router-dom";
import { removeCurrentTrack, setCurrentTrack } from "./store/actions/creators/todo.js";
import { useDispatch } from "react-redux";



function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <AppRoutes
            user={user}
            setUser={setUser}
            // setCurrentTrack={setCurrentTrack}
          />
        </S.Container>
      </S.Wrapper>
    </>
  );
}

export default App;