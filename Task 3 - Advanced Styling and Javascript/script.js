const quizData = [
      {
        question: "1. What does CSS stand for?",
        options: ["Creative Style Syntax", "Cascading Style Sheets", "Coding Super Style", "Cool Stylish System"],
        correct: 1
      },
      {
        question: "2. Which language runs in the browser?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correct: 2
      },
      {
        question: "3. What is an API?",
        options: ["Advanced Plugin Interface", "Application Programming Interface", "Automatic Process Interface", "App Preview Interface"],
        correct: 1
      }
    ];

    let currentQ = 0;
    let score = 0;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
    const scoreEl = document.getElementById("score");

    function loadQuestion() {
      const q = quizData[currentQ];
      questionEl.textContent = q.question;
      optionsEl.innerHTML = "";
      nextBtn.style.display = "none";

      q.options.forEach((opt, index) => {
        const btn = document.createElement("div");
        btn.classList.add("quiz-option");
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, index, q.correct);
        optionsEl.appendChild(btn);
      });
    }

    function checkAnswer(element, selected, correct) {
      const allOptions = document.querySelectorAll(".quiz-option");
      allOptions.forEach((opt) => (opt.style.pointerEvents = "none"));

      if (selected === correct) {
        element.classList.add("correct");
        score++;
      } else {
        element.classList.add("wrong");
        allOptions[correct].classList.add("correct-answer");
      }

      nextBtn.style.display = "inline-block";
    }

    function nextQuestion() {
      currentQ++;
      if (currentQ < quizData.length) {
        loadQuestion();
      } else {
        showScore();
      }
    }

    function showScore() {
      questionEl.textContent = "🎉 You finished the quiz!";
      optionsEl.innerHTML = "";
      nextBtn.style.display = "none";
      scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
    }

    loadQuestion();

    async function getJoke() {
      const jokeDisplay = document.getElementById("joke");
      jokeDisplay.textContent = "Fetching a joke... 🤔";
      try {
        const res = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await res.json();
        jokeDisplay.textContent = `${data.setup} 🤓 → ${data.punchline}`;
      } catch (err) {
        jokeDisplay.textContent = "Oops! Couldn't load joke. 😢";
      }
    }
