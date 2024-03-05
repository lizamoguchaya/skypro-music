import { Link } from "react-router-dom";
import * as S from "./register.styles"
import { useEffect, useRef, useState } from "react";
import { getTokenUser, registerUser } from "../../Api.js";

export default function Register({loginCallback}) {

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const authBtnRef = useRef(null);

  const handleRegister = async () => {
    if (!email) {
      setError("Укажите почту");
      return;
    }

    if (!password) {
      setError("Укажите пароль");
      return;
    }

    if (!repeatPassword) {
      setError("Укажите повторный пароль");
      return;
    }

    if (password !== repeatPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setIsRegistering(true);
      const response = await registerUser({ email, password });
      if (response.ok) {
        const user = await response.json();
        const newToken =  await getTokenUser({email, password});
        loginCallback(user, newToken);
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          let errorMessage = "Неверный ввод";

          for (const field in errorData) {
            errorMessage += `\n${field}: ${errorData[field].join(", ")}`;
          }
          setError(errorMessage);
        } else if (response.status === 500) {
          setError("Внутренняя ошибка сервера");
        }
      }
    } catch (error) {
      console.error("Ошибка при регистрации:", error.message);
      setError(
        "Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [email, password, repeatPassword]);

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo_modal.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        <>
          <S.Inputs>
            <S.ModalInput
              type="text"
              name="login"
              placeholder="Почта"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <S.ModalInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <S.ModalInput
              type="password"
              name="repeat-password"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
            />
          </S.Inputs>
          {error && <S.Error>{error}</S.Error>}
          <S.Buttons>
            <S.PrimaryButton
              onClick={handleRegister}
              ref={authBtnRef}
              disabled={isRegistering}
            >
              {isRegistering ? "Регистрация..." : "Зарегистрироваться"}
            </S.PrimaryButton>
          </S.Buttons>
        </>
      </S.ModalForm>
    </S.PageContainer>
  );
}