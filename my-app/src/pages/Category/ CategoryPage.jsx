import { Categories } from "../../constants.js";
import { GlobalStyle } from "../../App.styles.js";
import { useParams } from "react-router-dom";
import * as S from "../PageStyles.js";

export const Category = ({handleLogout}) => {
  const params = useParams();

  const category = Categories.find(
    (category) => category.id === Number(params.id)
  );
  const title = `${category.title}`;

  return (
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.Container>
          <S.Text>{`Здесь будет '${title}'`}</S.Text>
        </S.Container>
      </S.Wrapper>
    </>
  );
};

// у меня снова траблы с пуллреквестом, разбираюсь 