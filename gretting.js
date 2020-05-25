const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";
function saveName(text) {
  //저장로직
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //이벤트 발생시 도큐멘트로 올라가면서 리프레쉬된다 디폴트값이여서 그것을 없애주는 로직
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  //form을 보여주는로직
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  //form 을 삭제해주고 색칠을 해주는 로직 그리고 text 추가기능
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  //currentUser 변수에 localStorage를 할당 후 위에 선언한 변수를 파라미터로 넣어준다
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
