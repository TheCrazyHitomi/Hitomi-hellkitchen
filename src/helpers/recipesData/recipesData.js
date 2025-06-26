import carbonara from "../../assets/images/carbonara.jpg";
import mousseChocolat from "../../assets/images/mousseChocolat.jpg";
import chickenCurry from "../../assets/images/chickenCurry.jpg";
import applePie from "../../assets/images/applePie.jpg";
import bruschetta from "../../assets/images/bruschetta.jpg";
import tteokbokki from "../../assets/images/tteokbokki.jpg";
import cheesecake from "../../assets/images/cheesecake.jpg";
import springRolls from "../../assets/images/springRolls.jpg";
import vegetableStirFry from "../../assets/images/vegetableStirFry.avif";
import pumpkinPie from "../../assets/images/pumpkinPie.jpg";
import spicyHummus from "../../assets/images/spicyHummus.jpg";




const recipesData = [
{
    id: 1,
    recipeType: "plat principal",
    spiceLvlId: "1",
    spiceLvl: "légèrement épicé 🌶️",
    image: carbonara,
    recipeName: "Spaghetti Carbonara",
    slug: "spaghetti-carbonara",
    ingredients: [
    " 150g Spaghetti",
    "6 Eggs",
    "100g Parmesan cheese",
    "150g Pancetta",
    "10g Black pepper"
    ],
    instructions: [
        "Cook spaghetti.",
        "In a bowl, mix eggs and cheese.",
        "Fry pancetta.",
        "Combine all with pepper."
    ]
},
{
    id: 2,
    recipeType: "dessert",
    image: mousseChocolat,
    recipeName: "Chocolate Mousse",
    slug: "chocolate-mousse",
    ingredients: [
    "200g Dark chocolate",
    "4 Eggs",
    "50g Sugar",
    "200ml Cream"
    ],
    instructions: [
        "Melt chocolate.",
        "Whip cream.",
        "Beat eggs with sugar.",
        "Combine all and chill."
    ]
},
{
    id: 3,
    recipeType: "plat principal",
    spiceLvlId: "3",
    spiceLvl: "Très épicé 🌶️🌶️🌶️",
    image: chickenCurry,
    recipeName: "Chicken Curry",
    slug: "chicken-curry",
    ingredients: [
    "Chicken",
    "Curry powder",
    "Coconut milk",
    "Onion",
    "Garlic"
    ],
    instructions: [
        "Sauté onion and garlic.",
        "Add chicken and curry powder.",
        "Pour in coconut milk and simmer."
    ]
},
{
    id: 4,
    recipeType: "dessert",
    image: applePie,
    recipeName: "Apple Pie",
    slug: "apple-pie",
    ingredients: [
    "2 Apples",
    "1 Pie crust",
    "50g Sugar",
    "5g Cinnamon"
    ],
    instructions: [
        "Slice apples and mix with sugar and cinnamon.",
        "Place in pie crust and bake until golden."
    ]
},
{
    id: 5,
    recipeType: "entrée",
    image: bruschetta,
    recipeName: "Bruschetta",
    slug: "bruschetta",
    ingredients: [
    "1pce Baguette",
    "2pce Tomatoes",
    "5g Basil",
    "1pce Garlic clove",
    "10ml Olive oil",
    "1pce Mozzarella cheese"
    ],
    instructions: [
        "Toast baguette slices.",
        "Mix diced tomatoes, basil, and minced garlic.",
        "Top toasted bread with the mixture and drizzle with olive oil."
    ]
},
{
    id: 6,
    recipeType: "plat principal",
    spiceLvlId: "4",
    spiceLvl: "Mortellement épicé 🌶️🌶️🌶️🌶️",
    image: tteokbokki,
    recipeName: "Teokbokki",
    slug: "tteokbokki",
    ingredients: [
    "Rice cakes",
    "Fish cakes",
    "Gochujang (Korean chili paste)",
    "Garlic",
    "Sesame oil"
    ],
    instructions: [
        "Heat sesame oil in a pan.",
        "Add minced garlic and ginger.",
        "Stir-fry vegetables until tender.",
        "Add soy sauce and serve."
    ]
},
{
    id: 7,
    recipeType: "dessert",
    image: cheesecake,
    recipeName: "Cheesecake",
    slug: "cheesecake",
    ingredients: [
    "200g Cream cheese",
    "100g Sugar",
    "2 Eggs",
    "1 Pie crust"
    ],
    instructions: [
        "Mix cream cheese and sugar.",
        "Add eggs and blend well.",
        "Pour into pie crust and bake."
    ]
},
{
    id: 8,
    recipeType: "entrée",
    spiceLvlId: "2",
    spiceLvl: "Modérément épicé 🌶️🌶️",
    image: springRolls,
    recipeName: "Spring Rolls",
    slug: "spring-rolls",
    ingredients: [
    "Rice paper",
    "Shrimp",
    "Vegetables (carrot, cucumber)",
    "Mint leaves"
    ],
    instructions: [
        "Soak rice paper in water.",
        "Fill with shrimp, vegetables, and mint.",
        "Roll tightly and serve with dipping sauce."
    ]
},
{    id: 9,
    recipeType: "plat principal",
    spiceLvlId: "1",
    spiceLvl: "légèrement épicé 🌶️",
    image: vegetableStirFry,
    recipeName: "Vegetable Stir-Fry",
    slug: "vegetable-stir-fry",
    ingredients: [
    "Mixed vegetables (broccoli, bell pepper, carrot)",
    "Soy sauce",
    "Garlic",
    "Ginger",
    "Sesame oil"
    ],
    instructions: [
        "Heat sesame oil in a pan.",
        "Add minced garlic and ginger.",
        "Stir-fry vegetables until tender.",
        "Add soy sauce and serve."
    ]
},
{    id: 10,
    recipeType: "dessert",
    image: pumpkinPie,
    recipeName: "Pumpkin Pie",
    slug: "pumpkin-pie",
    ingredients: [
    "1 Pie crust",
    "400g Pumpkin puree",
    "100g Sugar",
    "2 Eggs",
    "5g Cinnamon",
    "5g Nutmeg"
    ],
    instructions: [
        "Preheat oven to 180°C.",
        "Mix pumpkin puree, sugar, eggs, cinnamon, and nutmeg.",
        "Pour into pie crust and bake for 45 minutes."
    ]
},
{    id: 11,
    recipeType: "entrée",
    spiceLvlId: "2",
    spiceLvl: "Modérément épicé 🌶️🌶️",
    image: spicyHummus,
    recipeName: "Spicy Hummus",
    slug: "spicy-hummus",
    ingredients: [
    "400g Chickpeas",
    "50g Tahini",
    "2 Garlic cloves",
    "10ml Olive oil",
    "5g Cumin",
    "5g Paprika",
    "5g Chili powder"
    ],
    instructions: [
        "Blend chickpeas, tahini, garlic, olive oil, cumin, paprika, and chili powder until smooth.",
        "Serve with pita bread or vegetables."
    ]
}
];

export default recipesData;
