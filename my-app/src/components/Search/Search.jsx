// import './Search.css'
import { useState } from "react";
import * as Styled from "./SearchStyle.js";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../store/filterSlice.js";
function Search () {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleKeyDown = () => {dispatch(setSearchFilter({search: value}))}
   return (
        <Styled.CenterblockSearch>
              <Styled.SearchSvg>
              <use xlinkHref="/icon/sprite.svg#icon-search"></use>
              </Styled.SearchSvg>
              <Styled.SearchText
                onKeyDown={handleKeyDown}
                value={value}
                onInput={element => setValue(element.target.value)}
                type="search"
                placeholder="Поиск"
                name="search" />
            </Styled.CenterblockSearch>
    );
}
export default Search;