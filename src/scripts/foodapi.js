const foodLocation = document.querySelector(".foodList");

const foodFetcher = () => {
    fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const converted = foodAsHTML(food);
            foodFactory(converted);
        });
    });
};


const foodAsHTML = (foodObject) => {
    return `
    <section class="foodSection">
    <h1>${foodObject.name}</h1>
    <h2>${foodObject.category}</h2>
    <h2>${foodObject.ethnicity}</h2>
    </section>
    `;
};

const foodFactory = (HTMLRepresentation) => {
    foodLocation.innerHTML += HTMLRepresentation;
}

foodFetcher();