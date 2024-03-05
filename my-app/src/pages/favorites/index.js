import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import PropTypes from "prop-types";
import * as S from "../../App.styles.js";
import { Sidebar } from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";

import { useEffect, useState } from "react";
import * as St from "../PageStyles.js";
import { EmulationTracklist } from "../../components/Emulation/EmulationLoading.jsx";
import { useGetFavouriteTracksQuery } from "../../store/api/music.js";
import { useNavigate } from "react-router-dom";


export const Favorites = ({ handleLogout }) => {
  // debugger;
  console.log("рендерим фейворитс"+localStorage.access);
  const { data, isLoading, error, refetch } = useGetFavouriteTracksQuery();
  let attempts = 3
  const navigate = useNavigate();
  
  const isEmptyList = !isLoading && !data?.length;
  console.log(data);

  return (
    <>
      <S.Main>
        {/* <NavMenu handleLogout={handleLogout} /> */}
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
            <Tracklist tracks={data}  isFavourite={true} refetch={refetch}/>
            
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