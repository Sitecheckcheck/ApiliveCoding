import { login } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchTodosAndRender }) {
  const appHtml = `
        <h1>Список задач</h1>
        <div class="form">
        <h3 class="form-title">Форма входа</h3>
        <div class="form-row">
            Логин
            <input type="text" id="login-input" class="input" /><br>
            Пароль
            <input type="text" id="password-input" class="input" />
        </div>
        <br />
        <button class="button" id="login-button">Войти</button>
        </div>`;

  appEl.innerHTML = appHtml;
  document.getElementById("login-button").addEventListener("click", () => {
    setToken("Bearer cgascsbkas6g5g5g5g5g6g3983b43bc3bo3cc");

    login({
      login: "pasha",
      password: "1111",
    }).then((user) => {
      setToken(`Bearer ${user.user.token}`);
      fetchTodosAndRender();
    });
  });
}
