import { useEffect, useRef, useState } from "react";
import * as S from "../../App.styles.js";
import { GlobalStyle } from "../../App.styles.js";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NavMenu from "../../components/NavMenu/NavMenu.jsx";
import Search from "../../components/Search/Search.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Tracklist from "../../components/Tracklist/Tracklist.jsx";
import { EmulationApp } from "../../components/Emulation/EmulationApp.jsx";
import { getAllTracks } from "../../Api.js";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useGetAllTracksQuery } from "../../store/api/music.js";
// import { handleStart, handleStop, handleTrackPlay } from "../../components/AudioPlayer/AudioPlayer.jsx";

export const Main = ({ handleLogout }) => {
  // const [loading, setLoading] = useState(true); //показ эмуляции загрузки(скелетон)
  // const [tracks, setTracks] = useState(true); //показ полученного треклиста из API
  const [tracksError, setTracksError] = useState(true); //ошибка при получении треклиста из API
  const {data: tracks, isLoading: loading} = useGetAllTracksQuery();
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const myUser = JSON.parse(localStorage.getItem("user"));
  console.log(myUser);
  const mappedTracks = tracks?.map((track) => {
    const isLike = track.stared_user?.filter((user)=> user.id === myUser.id).length > 0 ? true : false;
    return {
      ...track,
      isLike
    };
  }); 

  // useEffect(() => {
  //   getAllTracks()
  //     .then((tracks) => {
  //       setTracks(tracks);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setTracksError(
  //         `Не удалось загрузить плейлист, попробуйте позже: ${error.message}`
  //       );
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  return loading ? (
    <EmulationApp handleLogout={handleLogout} />
  ) : (
    <>
      <GlobalStyle />
      <S.Container>
        <S.Main>
          {/* <NavMenu handleLogout={handleLogout} /> */}
          <div>
            <Search />
            <S.CenterblockH2>Треки</S.CenterblockH2>
            <Filters />
            <Tracklist tracks={mappedTracks} tracksError={tracksError} />
          </div>
          {/* <Sidebar tracks={tracks} handleLogout={handleLogout} /> */}
        </S.Main>
        {/* {currentTrack ? <AudioPlayer track={currentTrack} /> : null} */}
        <footer></footer>
      </S.Container>
    </>
  );
};

Main.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
  setCurrentTrack: PropTypes.func.isRequired,
};