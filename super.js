window.onbeforeunload = function() {
    // שמירת מידע ברגע שהדפדפן נסגר
    localStorage.setItem('key', JSON.stringify(currentList));
};

document.addEventListener('DOMContentLoaded', function() {
    // טוען את הנתונים מה־localStorage ומכניס אותם למשתנה currentList
    currentList = JSON.parse(localStorage.getItem('key')) || [];

    // עדכון את הרשימה ב-HTML
    updateShoppingList(currentList);
    orderShoppingList();
});


const categories = [
    { id: 1, name: "פירות וירקות" },
    { id: 2, name: "בשר ועופות" },
    { id: 3, name: "קפואים/תבלינים/קטניות" },
    { id: 4, name: "קמח/סוכר/שמן" },
    { id: 5, name: "גבינות/קורנפלקס/ביצים/חלב" },
    { id: 6, name: "שתייה/נייר/כביסה" },
    { id: 7, name: "חומרי נקיון" },
    { id: 8, name: "טואלטיקה/תינוקות/חדפ" },
    { id: 9, name: "יין/חטיפים/פטל/ממרחים" },
    { id: 10, name: "מעדנים/שמנות/קוטג'" },
    { id: 11, name: "לחם/פיצוחים" },
    { id: 12, name: "שוקולדים/קפה/תה/עוגות" },
    { id: 13, name: "מרקים/רטבים/שימורים" },
];

const products = [
    { id: 1, name: "מלפפון", category: 1 },
    { id: 2, name: "עגבניה", category: 1 },
    { id: 3, name: "בצל", category: 1 },
    { id: 4, name: "פטריות", category: 1 },
];

const products2 = [
    { id: 5, name: "חזה עוף", category: 2 },
    { id: 6, name: "בשר כתף", category: 2 },
    { id: 7, name: "בשר טחון", category: 2 },
];

const products3 = [
    { id: 8, name: " שניצל תירס", category: 3 },
    { id: 9, name: "פיצות", category: 3 },
    { id: 10, name: "בורקסים", category: 3 },
];

const products4 = [
    { id: 11, name: "קמח", category: 4 },
    { id: 12, name: "סוכר", category: 4 },
    { id: 13, name: "שמן", category: 4 },
];

const products5 = [
    { id: 14, name: "גבינות", category: 5 },
    { id: 15, name: "קורנפלקס", category: 5 },
    { id: 16, name: "ביצים", category: 5 },
    { id: 17, name: "חלב", category: 5 },
];

const products6 = [
    { id: 18, name: "קולה", category: 6 },
    { id: 19, name: "נייר", category: 6 },
    { id: 20, name: "כביסה", category: 6 },
];

const products7 = [
    { id: 21, name: "מגב", category: 7 },
    { id: 22, name: "סמרטוט", category: 7 },
    { id: 23, name:  "ספריי חלונות", category: 7 },
    
];

const products8 = [
    { id: 25, name: "טואלטיקה", category: 8 },
    { id: 26, name: "תינוקות", category: 8 },
    { id: 27, name: "חדפ", category: 8 },
];

const products9 = [
    { id: 28, name: "יין", category: 9 },
    { id: 29, name: "חטיפים", category: 9 },
    { id: 30, name: "פטל", category: 9 },
    { id: 31, name: "ממרחים", category: 9 },
];

const products10 = [
    { id: 32, name: "מעדנים", category: 10 },
    { id: 33, name: "שמנות", category: 10 },
    { id: 34, name: "קוטג'", category: 10 },
];

const products11 = [
    { id: 35, name: "לחם", category: 11 },
    { id: 36, name: "פיצוחים", category: 11 },
];

const products12 = [
    { id: 37, name: "שוקולדים", category: 12 },
    { id: 38, name: "קפה", category: 12 },
    { id: 39, name: "תה", category: 12 },
    { id: 40, name: "עוגות", category: 12 },
];

const products13 = [
    { id: 41, name: "מרקים", category: 13 },
    { id: 42, name: "רטבים", category: 13 },
    { id: 43, name: "שימורים", category: 13 },
];

const shoppingList = document.getElementById('shoppingList');
const itemInput = document.getElementById('shoppingListInput');
let currentList = [];

// קביעת האירוע
itemInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

// הפונקציה המוסיפה פריט
function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem !== '') {
        const li = createListItem(newItem);
        shoppingList.appendChild(li);
        itemInput.value = '';
        currentList.push(newItem);

        // חזור להקליד בתיבת הקלט
        itemInput.focus();
    }
}

function removeItem(button) {
    const li = button.parentNode;
    shoppingList.removeChild(li);
    const removedItem = li.firstChild.textContent.trim();
    currentList = currentList.filter(item => item !== removedItem);
}

function orderShoppingList() {
    const orderedList = [];
    const addedItems = [];

    const allProducts = [
        ...products,
        ...products2,
        ...products3,
        ...products4,
        ...products5,
        ...products6,
        ...products7,
        ...products8,
        ...products9,
        ...products10,
        ...products11,
        ...products12,
        ...products13,
    ];

    allProducts.forEach(product => {
        const matchingItems = filterItemsByCategory(currentList, [product]);
        orderedList.push(...matchingItems.filter(item => !addedItems.includes(item)));
        addedItems.push(...matchingItems);
    });

    const nonDatabaseItems = currentList.filter(item => !orderedList.includes(item));
    orderedList.push(...nonDatabaseItems);

    updateShoppingList(orderedList);
}

function createListItem(item) {
    const li = document.createElement('li');
    li.innerHTML = `${item}<button class="delete-button" onclick="removeItem(this)">X</button>`;
    return li;
}
// פונקציה שבוצעת חיפוש חלקי

function partialSearch(enteredTerm, productName) {
    // המרה של שני המחרוזות לאותיות קטנות לצורך חיפוש לא תלוי רישיות
    const term = enteredTerm.toLowerCase();
    const name = productName.toLowerCase();

    // בדיקה אם המילה שמוזנת נמצאת בתוך שם המוצר
    return name.includes(term);
}

itemInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.trim();

    // סינון המוצרים שמכילים את המחרוזת המוזנת על ידי המשתמש
    const filteredProducts = products.filter(product => partialSearch(searchTerm, product.name));

});

function filterItemsByCategory(items, categoryProducts) {
    return items.filter(item => {
        const partialItemName = item.split(/\d+/)[0].trim(); // לקחת את המחרוזת לפני המספר ולהסיר רווחים מסוף
        return categoryProducts.some(product => partialSearch(partialItemName, product.name));
    });
}


function updateShoppingList(items) {
    shoppingList.innerHTML = '';
    items.forEach(item => shoppingList.appendChild(createListItem(item)));
}

function clearAll() {
    const shoppingList = document.getElementById('shoppingList');
    shoppingList.innerHTML = '';
    currentList = [];
}

// ...
