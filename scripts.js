document.addEventListener('DOMContentLoaded', function () {
    // Handle "Get Started" button click
    const getStartedButton = document.getElementById('get-started');
    getStartedButton.addEventListener('click', function () {
        alert('Thank you for getting started with our Mental Health Support!');
    });

    // Toggle the search bar when the search icon is clicked
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');

    searchIcon.addEventListener('click', function (event) {
        event.preventDefault();
        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
        } else {
            searchBar.classList.add('hidden');
        }
    });
});


// MOOD TRACKER

window.onload = function() {
    displayMoodSummary();
};

function saveMood() {
    const mood = document.querySelector('input[name="mood"]:checked');
    const note = document.getElementById('note').value.trim();

    if (mood) {
        const moodEntry = {
            mood: mood.value,
            note: note,
            date: new Date().toLocaleString()
        };

        let moodData = JSON.parse(localStorage.getItem('moodData')) || [];
        moodData.push(moodEntry);
        localStorage.setItem('moodData', JSON.stringify(moodData));

        document.getElementById('note').value = '';  // Clear the note input
        displayMoodSummary();  // Refresh the mood summary
    } else {
        alert('Please select a mood.');
    }
}

function displayMoodSummary() {
    const moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    const moodSummary = document.getElementById('mood-summary');

    moodSummary.innerHTML = '';  // Clear the existing summary

    moodData.forEach(entry => {
        const moodEntryDiv = document.createElement('div');
        moodEntryDiv.className = 'mood-entry';

        const moodText = document.createElement('p');
        moodText.innerHTML = `<strong>Mood:</strong> ${entry.mood}`;
        
        const noteText = document.createElement('p');
        noteText.innerHTML = `<strong>Note:</strong> ${entry.note || 'No note added'}`;
        
        const dateText = document.createElement('p');
        dateText.innerHTML = `<strong>Date:</strong> ${entry.date}`;

        moodEntryDiv.appendChild(moodText);
        moodEntryDiv.appendChild(noteText);
        moodEntryDiv.appendChild(dateText);

        moodSummary.appendChild(moodEntryDiv);
    });
}

//QUIZZES//
const questions = [
    {
      question: "How often do you feel anxious or worried about the future?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "Do you struggle to get a good night's sleep?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "How often do you feel overwhelmed by your daily tasks?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "Do you experience frequent mood swings?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "Do you find it difficult to concentrate or focus?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "How often do you feel socially withdrawn or isolated?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "Do you feel emotionally exhausted or burned out?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "Do you experience physical symptoms related to stress (e.g., headaches, stomach issues)?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [1, 2, 3, 4, 5]
    },
    {
      question: "How often do you feel satisfied with your work or daily routine?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      value: [5, 4, 3, 2, 1] // Reverse scoring
    },
    {
      question: "How would you rate your overall mental health in the past month?",
      options: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
      value: [1, 2, 3, 4, 5]
    }
  ];
  
  const questionContainer = document.getElementById('questions');
  
  // Dynamically load the questions
  function loadQuestions() {
    questionContainer.innerHTML = '';
    questions.forEach((q, index) => {
      const questionBlock = document.createElement('div');
      questionBlock.classList.add('question');
      questionBlock.innerHTML = `<p>${q.question}</p>`;
      q.options.forEach((option, optIndex) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="question${index}" value="${q.value[optIndex]}">
            ${option}`;
        questionBlock.appendChild(label);
        questionBlock.appendChild(document.createElement('br'));
      });
      questionContainer.appendChild(questionBlock);
    });
  }
  
  loadQuestions();
  
  // Handle form submission
  document.getElementById('quizForm').addEventListener('submit', function (e){
    e.preventDefault();
  
    // Calculate score
    let score = 0;
    const formData = new FormData(this);
    formData.forEach(value => {
      score += parseInt(value);
    });
  
    // Show results
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';
    const progressBar = document.getElementById('progressBar');
    const scoreElement = document.getElementById('score');
    const suggestion = document.getElementById('suggestion');
  
    const percentage = (score / (questions.length * 5)) * 100;
    progressBar.style.width = percentage + '%';
  
    if (percentage >= 75) {
      scoreElement.innerHTML = `Score: ${percentage.toFixed(0)}% 🔴`;
      suggestion.innerHTML = 'It looks like you might be struggling with your mental health. It’s important to talk to a mental health professional or reach out for help from trusted friends or family.';
      suggestion.className = 'suggestions negetive';
    } else if (percentage >=40) {
      scoreElement.innerHTML = `Score: ${percentage.toFixed(0)}% 🟠`;
      suggestion.innerHTML = 'You might be experiencing moderate stress. Consider incorporating relaxation techniques like meditation or seeking support when needed.';
      suggestion.className = 'suggestions neutral';
    } else if (percentage>=10){
      scoreElement.innerHTML = `Score: ${percentage.toFixed(0)}% 🟢`;
      suggestion.innerHTML = 'You are doing great! Keep maintaining a balanced mental well-being. Stay connected with supportive communities';
      suggestion.className = 'suggestions positive';
    }else {
      scoreElement.innerHTML = `Score: ${percentage.toFixed(0)}% ⚫`;
      suggestion.innerHTML = 'Please answer the questions';
      suggestion.className = 'N/A';
    }
  
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth' });
  });

  