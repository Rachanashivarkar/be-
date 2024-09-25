const questions = [
    {
        question: "Do you feel more energized after spending time with a group of people or after spending time alone?",
        options: ["With people", "Alone"],
        answer: ["E", "I"]
    },
    {
        question: "When you think about the future, do you focus on concrete details or big ideas?",
        options: ["Concrete details", "Big ideas"],
        answer: ["S", "N"]
    },
    {
        question: "Do you make decisions based on logic and analysis or based on personal values and feelings?",
        options: ["Logic", "Personal values"],
        answer: ["T", "F"]
    },
    {
        question: "Do you prefer having things settled and organized or keeping your options open?",
        options: ["Settled and organized", "Keeping options open"],
        answer: ["J", "P"]
    },
    // Add more questions here as needed
];

let currentQuestionIndex = 0;
const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const cardsContainer = document.getElementById('cards-container');
const recommendationsElement = document.getElementById('recommendations');

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => selectOption(index);
        optionsElement.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerKey = currentQuestion.answer[selectedIndex];

    // Increment the corresponding score
    scores[answerKey]++;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const mbtiType = determineMBTIType();
    resultElement.textContent = "Your MBTI Type: " + mbtiType;
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none'; // Hide the next button
    cardsContainer.style.display = 'flex'; // Show the cards
}

function determineMBTIType() {
    const ei = scores.E > scores.I ? 'E' : 'I';
    const sn = scores.S > scores.N ? 'S' : 'N';
    const tf = scores.T > scores.F ? 'T' : 'F';
    const jp = scores.J > scores.P ? 'J' : 'P';
    return ei + sn + tf + jp; // Combine scores to get MBTI type
}

// Card click event handlers
document.getElementById('books-card').onclick = () => showRecommendations('books');
document.getElementById('music-card').onclick = () => showRecommendations('music');
document.getElementById('movies-card').onclick = () => showRecommendations('movies');

function showRecommendations(type) {
    let recommendations;
    switch(type) {
        case 'books':
            recommendations = 'Recommended Books for your personality type: \n1. Book Title 1 \n2. Book Title 2 \n3. Book Title 3';
            break;
        case 'music':
            recommendations = 'Recommended Music for your personality type: \n1. Song Title 1 \n2. Song Title 2 \n3. Song Title 3';
            break;
        case 'movies':
            recommendations = 'Recommended Movies for your personality type: \n1. Movie Title 1 \n2. Movie Title 2 \n3. Movie Title 3';
            break;
    }
    recommendationsElement.textContent = recommendations; // Display recommendations
    recommendationsElement.style.display = 'block'; // Show the recommendations section
}

// Start the quiz when the page loads
showQuestion();
