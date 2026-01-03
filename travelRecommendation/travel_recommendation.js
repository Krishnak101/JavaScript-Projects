function searchRecommendations() {
    var condition = document.getElementById("searchCondition").value.toLowerCase();
    if (condition) {
        const resultsDiv = document.getElementById("resultsContainer");
        resultsDiv.innerHTML = "";
        fetch("travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                const destinationsFound = data.countries.find(entry => entry.name.toLowerCase() === condition);
                if (destinationsFound) {
                    var cities = destinationsFound.cities;
                    cities.forEach(city => traverseData(city, resultsDiv));

                }
                else {
                    const keys = Object.keys(data);
                    const suggestionsFound = keys.find(entry => entry.toLowerCase() === condition);
                    if (suggestionsFound) {
                        data[suggestionsFound].forEach(suggestion => traverseData(suggestion, resultsDiv));
                    }
                    else {
                        resultsDiv.innerHTML = "<h4 style='background-color:rgba(0, 0, 0, 0.5);padding:20px'>No results found! Try keywords like 'temples' or 'beaches'<h4>";
                    }
                }
            })
            .catch(error => {
                console.log("Error fetching data from json:", error);
                alert("Error Fetching Data:", error);
                document.getElementById("resultsContainer").innerText = "Sorry! Looks like an error has occurred while fetching the results!";
            });
    }
}

function traverseData(suggestion, resultsDiv) {
    var articleDiv = document.createElement('div');
    articleDiv.style.padding = "20px 20px 10px 2px";
    articleDiv.style.backgroundColor = "rgb(0, 0, 0";
    var image = document.createElement('img');
    image.src = suggestion.imageUrl;
    image.style.position = "center";
    image.style.width = "100%";
    image.style.height = "400px";
    image.style.borderRadius = "20px 20px 0px 0px"
    var location = document.createElement('h3');
    location.textContent = suggestion.name;
    var description = document.createElement('p');
    description.textContent = suggestion.description;

    articleDiv.appendChild(image);
    articleDiv.appendChild(location);
    articleDiv.appendChild(description);
    resultsDiv.appendChild(articleDiv);
}

function clearSearch() {
    document.getElementById("searchCondition").value = "";
    const resultsDiv = document.getElementById("resultsContainer");
    resultsDiv.innerHTML = "";
}

function sumbitContactForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    if (name && email && message) {
        document.getElementById("contactUsId").textContent = "Thank you for contacting Us.You will shortly recieve a call from one of our support agents!";
    }
}