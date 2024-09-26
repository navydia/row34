document.getElementById("cocktail-quiz").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Correct answers for each cocktail
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

    // Store user's answers and errors
    let userAnswers = {};
    let errors = [];
    let totalCorrect = 0;
    let totalQuestions = 0;

    // Get all the cocktail divs
    const cocktails = document.querySelectorAll('.cocktail');

    cocktails.forEach(function(cocktail) {
        // Get the name of the cocktail from the heading
        const cocktailName = cocktail.querySelector('h2').textContent.trim();

        // Check if cocktailName exists in correctAnswers
        if (!correctAnswers.hasOwnProperty(cocktailName)) {
            console.error(`No correct answers found for ${cocktailName}`);
            return;  // Skip to the next cocktail if no correct answers are found
        }

        // Initialize the userAnswers for this cocktail
        userAnswers[cocktailName] = [];

        // Collect user answers for each dropdown in the current cocktail
        const dropdowns = cocktail.querySelectorAll('select');
        dropdowns.forEach(function(select) {
            if (select.value !== "") {
                userAnswers[cocktailName].push(select.value); // Push the selected value
            } else {
                userAnswers[cocktailName].push("No Answer"); // Handle unanswered questions
            }
        });

        // Validate answers for the current cocktail
        let cocktailErrors = [];
        totalQuestions += correctAnswers[cocktailName].length;

        userAnswers[cocktailName].forEach(function(answer, index) {
            if (answer !== correctAnswers[cocktailName][index]) {
                cocktailErrors.push(`Expected ${correctAnswers[cocktailName][index]}, but got ${answer}`);
            } else {
                totalCorrect++;
            }
        });

        if (cocktailErrors.length > 0) {
            errors.push({ cocktail: cocktailName, errors: cocktailErrors });
        }
    });

    // Store data in localStorage to pass it to the results page
    localStorage.setItem("errors", JSON.stringify(errors));
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("totalCorrect", totalCorrect);
    localStorage.setItem("totalQuestions", totalQuestions);

    // Redirect to results page
    window.location.href = "results.html";
});
