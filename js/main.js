let msg = document.querySelector(".form input");
let sendBtn = document.querySelector(".form .send");
let messages = document.querySelector(".messages");
let chatbot = document.querySelector(".chatbot");
let theme = document.querySelector(".theme i");

msg.focus();
getData();

theme.addEventListener("click", (e) => {
  chatbot.classList.toggle("dark");
  if (chatbot.classList.contains("dark")) {
    theme.classList.remove("fa-moon");
    theme.classList.add("fa-sun");
  } else {
    theme.classList.remove("fa-sun");
    theme.classList.add("fa-moon");
  }
});

async function getData() {
  let response = await fetch("answers.json");
  let date = await response.json();

  sendBtn.addEventListener("click", (e) => {
    let chanswer = false;
    let inputMsg = msg.value.trim();
    if (inputMsg != "") {
      addMsg(inputMsg, "question");
      date.forEach((el) => {
        if (el["question"] === inputMsg) {
          chanswer = true;
          setTimeout(() => {
            addMsg(el["answer"], "answer");
          }, 1000);
        }
      });
      if (!chanswer) {
        addMsg("I don't have answer to this question", "answer");
      }
      msg.value = "";
      msg.focus();
    }
  });
}

function addMsg(msg, className) {
  let question = document.createElement("div");
  let questionText = document.createTextNode(msg);
  question.className = className;
  question.appendChild(questionText);
  messages.appendChild(question);
}
