import { loginUser, registerUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchTodosAndRender }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `
    <h1>Список задач</h1>
    <div class="form">
    <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
    <div class="form-row">
        ${
          isLoginMode
            ? ""
            : `Имя
        <input type="text" id="name-input" class="input" /><br><br />`
        }
        Логин
        <input type="text" id="login-input" class="input" /><br><br />
        Пароль
        <input type="password" id="password-input" class="input" />
    </div>
    <br /><br />
    <button class="button" id="login-button">${
      isLoginMode ? "Войти" : "Регистрация"
    }</button>
    <br /><br /><br />
    <button class="button" id="toggle-button">Перейти ${
      isLoginMode ? "к регистрацц" : "ко входу"
    }</button>
    `;

    appEl.innerHTML = appHtml;
    document.getElementById("login-button").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        loginUser({
          login: login,
          password: password,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchTodosAndRender();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password-input").value;
        const name = document.getElementById("name-input").value;

        if (!name) {
            alert("Введите имя");
            return;
          }

        if (!login) {
          alert("Введите логин");
          return;
        }

        if (!password) {
          alert("Введите пароль");
          return;
        }

        registerUser({
          login: login,
          password: password,
          name: name,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchTodosAndRender();
          })
          .catch((error) => {
            alert(error);
          });
      }
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };
  renderForm();
}
