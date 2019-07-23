const foodLocation = document.querySelector(".foodList");

const foodFetcher = () => {
fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food)

    fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
    .then(foods => foods.json())
    .then(productInfo => {
        console.log(productInfo);
        if (productInfo.product.ingredients_text) {
            food.ingredients = productInfo.product.ingredients_text
        } else {
            food.ingredients = "no ingredients listed"
        }
            food.countries = productInfo.product.countries
            food.energy = productInfo.product.nutriments.energy
            food.fat = productInfo.product.nutriments.fat
            food.sugar = productInfo.product.nutriments.sugars

            const converted = foodAsHTML(food);
            foodFactory(converted);
        });
    });
})
}

const foodAsHTML = (foodObject) => {
    return `
    <section class="foodSection">
    <h1>${foodObject.name}</h1>
    <h2>${foodObject.category}</h2>
    <h2>${foodObject.ethnicity}</h2>
    <h2>${foodObject.ingredients}</h2>
    <h2>${foodObject.countries}</h2>
    <h2>${foodObject.energy} kcals per serving</h2>
    <h2>${foodObject.fat} grams fat per serving</h2>
    <h2>${foodObject.sugar} grams sugar per serving</h2>
    </section>
    `;
};

const foodFactory = (HTMLRepresentation) => {
    foodLocation.innerHTML += HTMLRepresentation;
}

foodFetcher();