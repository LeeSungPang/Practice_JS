//HTML 을 선택하는 각각의 변수를 만들어준다.
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
//리스트가 추가될때마다 값을 담기 위해서 빈 배열형태의 변수를 만들어준다. 값이 계속변경되므로 let으로 만들어주자.
let toDos = [];

function deleteToDo(event) {
  //클릭시 타겟값
  const btn = event.target;
  //console.dir 을 통해서 해당 엘리멘트에 아버지 요소를 찾는다.
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //필터를 통해 새로운 함수를 만들어준다
  const cleanToDos = toDos.filter(function (toDo) {
    //toDo 아이디와 같지 않으면 리턴을 해준다 li id 는 스트링이기 때문에 인트로 바꿔줘야한다.
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function saveToDos() {
  //localStorage 는 String 으로 읽어 오려고 하기 때문에 JSON 으로 스트링 으로 읽어온다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function paintToDo(text) {
  //createElement () 안에 지정한 요소를 생성한다
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  //toDos에  하나씩 담아준다.
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  //appendChild . 앞에 가 부모요소가 된다.
  li.appendChild(span);
  li.appendChild(delBtn);

  li.id = newId;
  toDoList.appendChild(li);
  //텍스트와 아이디가 들어있는 객체를 만들어준다
  const toDoObj = {
    text,
    id: newId,
  };
  //위에 만들어줬던 빈베열 변수에다가 객체를 푸쉬해준다
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //지금 현재 스트링으로 받아오기 때문에 다시 json 으로 객체로 반환 해서 할당해준다.
    const parsedToDos = JSON.parse(loadedToDos);
    //parsedToDos 안에 있는 것들을 각각 함수를 실행시키기 위해서forEach를 쓴다
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
