// Retrieve data from localStorage
const userAnswers = JSON.parse(localStorage.getItem("userAnswers"));

// Correct answers for reference (this should match what was used in the quiz validation)
const correctAnswers = {
    "Singani Sour": ["Singani 63 Brandy", "Brovo Falernum", "Simple Syrup", "Lemon Juice", "Egg White", "Angostura Bitters", "Coupe", "Ango Hearts"],
    "Kentucky Carrot Cake": ["Evan Williams Bourbon", "Domain de Canton", "Cinnamon Clove Syrup", "Carrot Juice", "Egg", "Martini", "Grated Nutmeg"],
    "O Bachan": ["Espolon Reposado", "Yuzuri", "Green Apple Syrup", "Simple Syrup", "Lime Juice", "Egg White", "Rocks", "Dehydrated Apple"],
    "Autumn Mule": ["Grainger Vodka", "Apple Cider", "Cinnamon Clove Syrup", "Lemon Juice", "Ginger Beer", "Allspice Dram", "Thai Chili Tincture", "Collins", "Dehydrated Apple"],
    "Smoke & Sickle": ["Harvest Spice Mezcal", "Aperol", "Ancho Reyes", "Simple Syrup", "Lime Juice", "Absinthe", "Coupe", "No Garnish"],
    "Topsfield Fare": ["Privateer Bottled-in-Bond", "Apple Demerara", "Lemon Juice", "Heavy Cream", "Berliner", "Grated Cinnamon"],
    "Red Eye Old Fashioned": ["Elijah Craig", "Averna", "Atomic Black", "Demerara", "Angostura Bitters", "Rocks with King Cube", "Orange Twist"],
    "Purple Haze": ["Peablossom Syrup", "Lychee Syrup", "Ginger Beer", "Lime Juice", "Berliner", "No Garnish"],
    "Home by Midnight": ["Pumpkin Syrup", "Cinnamon Clove Syrup", "Decaf Coffee", "Heavy Cream", "Collins", "Grated Cinnamon"],
    "Orchards Aplenty": ["Apple Cider", "Cinnamon Clove Syrup", "Cardamom Coriander Syrup", "Orange Juice", "Lemon Juice", "Ginger Beer", "Thai Chili Tincture", "Collins with Crushed Ice", "Cinnamon Stick"],
    "One Hop This Time": ["Citra Peach Syrup", "Iced Tea", "Lemon Juice", "Simple Syrup", "Collins with Crushed Ice", "Dehydrated Lemon"]
};

// Variables to store total correct answers and total questions
let totalCorrect = 0;
let totalQuestions = 0;

// Start building the result message
let resultMessage = "<h3>Here's what you got correct and incorrect:</h3><ul>";

// Loop through each cocktail in userAnswers
for (let cocktail in userAnswers) {
    resultMessage += `<li><strong>${cocktail}</strong>:<ul>`;
    
    // Loop through each answer for the current cocktail
    userAnswers[cocktail].forEach(function(answer, index) {
        totalQuestions++; // Increment total questions count
        if (answer === correctAnswers[cocktail][index]) {
            // If the answer is correct, increment totalCorrect and display it in green
            totalCorrect++;
            resultMessage += `<li class="correct">Correct: ${answer}</li>`;
        } else {
            // If the answer is incorrect, show the correct answer in red
            resultMessage += `<li class="incorrect">Incorrect: ${answer}, Answer: ${correctAnswers[cocktail][index]}</li>`;
        }
    });

    resultMessage += `</ul></li>`;
}

// Calculate percentage correct
const percentageCorrect = Math.round((totalCorrect / totalQuestions) * 100);

// Display percentage at the top
const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = `<h2>You got ${percentageCorrect}% correct.</h2>` + resultMessage;

// Handle "Try Again" button
document.getElementById("retry").addEventListener("click", function() {
    // Clear localStorage and redirect back to the quiz
    localStorage.clear();
    window.location.href = "index.html";
});
