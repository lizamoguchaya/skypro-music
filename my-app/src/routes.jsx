import { Routes, Route, useNavigate } from "react-router-dom";
import { Main } from "./pages/main/index.jsx";
import { NotFound } from "./pages/NotFound/index.jsx";
import { Category } from "./pages/Category/ CategoryPage.jsx"
import { Favorites } from "./pages/favorites/index.js";
import { ProtectedRoute } from "./components/protected-route";
import PropTypes from "prop-types";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import { PageLayout } from "./pages/Layout/Layout.jsx";
import { useDispatch } from "react-redux";
import { removeCurrentTrack } from "./store/actions/creators/todo.js";
import { addUserInfo } from "./store/actions/creators/api.js";


export const AppRoutes = ({ user, setUser}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (userData, newTokens)=>{
    dispatch(addUserInfo(userData, newTokens)); // обновляем стор
    setUser(userData); // обновляем State для авторизаций
    
    window.localStorage.setItem("user",JSON.stringify(userData)); // обновляем State для авторизаций

    navigate("/", {replace: true}); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(removeCurrentTrack());
    navigate("/login");
    setUser(null);
  };

  return (
    <Routes> 
    <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
      <Route path="/" element={<PageLayout handleLogout={handleLogout}/>}>
        <Route index element={<Main user={user} handleLogout={handleLogout} />}/>
        <Route path="/category/:id" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
    <Route path="/login" element={<Login user={user} loginCallback={handleLogin}/>} />
    <Route path="/register" element={<Register user={user} loginCallback={handleLogin} />} />
  </Routes>
);
};


AppRoutes.propTypes = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  // setUser: PropTypes.func.isRequired,
};

export default AppRoutes;