import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { Sidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";

import { useEffect, useState } from "react";
import { refreshTokenUser } from "../../Api.js";
import * as St from "../PageStyles.js";
import { EmulationTracklist } from "../../components/Emulation/EmulationLoading.jsx";
import { useGetFavouriteTracksQuery } from "../../store/api/music.js";


export const Favorites = ({ handleLogout }) => {
  // debugger;
  console.log("рендерим фейворитс"+localStorage.access);
  const token = localStorage.getItem('access')
  const refreshToken = localStorage.getItem("refresh");
  const { data, isLoading, error, refetch } = useGetFavouriteTracksQuery({ token });
 

  useEffect(() => {
    if (error && error.status === 401) {
      refreshTokenUser(refreshToken)
        .then((res) => {
          console.log("Обновленный токен:", res);
          localStorage.setItem("access", JSON.stringify(res.access));
        })
        .then(() => {
          refetch();
        })
        .catch((refreshError) => {
          console.error("Ошибка при обновлении токена:", refreshError.message);
        });
    }
  }, [error]);

  const isEmptyList = !isLoading && !data?.length;
  console.log(data);

  return (
    <>
      <S.Main>
{/*         
        <NavMenu handleLogout={handleLogout} /> */}
        <div style={{ minWidth: "1070px", justifyContent: "space-between" }}>
          <Search />
          <S.CenterblockH2>Мои треки</S.CenterblockH2>
          {error ? (
            <p>Не удалось загрузить плейлист, попробуйте позже</p>
          ) 
          : isLoading ? (
            <EmulationTracklist />
          ) : isEmptyList ? (
            `Любимые треки отсутствуют. Вы можете их добавить, нажав на кнопку "♥" рядом с понравившимся треком`
          ) : (
            <Tracklist tracks={data}  isFavourite={true} />
            
          )}
        </div>
        {/* <St.ContainerSidebar>
          <Sidebar handleLogout={handleLogout} />
        </St.ContainerSidebar> */}
      </S.Main>
    </>
  );
};



Favorites.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};