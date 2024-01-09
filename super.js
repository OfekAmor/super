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
    { id: 4, name: "שום", category: 1 },
    { id: 4, name: "כוסברה", category: 1 },
    { id: 4, name: "חסה", category: 1 },
    { id: 4, name: "פטרוזיליה", category: 1 },
    { id: 4, name: "חציל", category: 1 },
    { id: 4, name: "כרוב", category: 1 },
    { id: 4, name: "קולורבי", category: 1 },
    { id: 4, name: "גזר", category: 1 },
    { id: 4, name: "פלפל", category: 1 },
    { id: 4, name: "גמבה", category: 1 },
    { id: 4, name: "תפוא", category: 1 },
    { id: 4, name: "תפוח אדמה", category: 1 },
    { id: 4, name: "סלק", category: 1 },
    { id: 4, name: "אבטיח", category: 1 },
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
    { id: 10, name: "דגים", category: 3 },
    { id: 10, name: "פילו", category: 3 },
    { id: 10, name: "נקניקיות", category: 3 },
    { id: 10, name: "בורקסים", category: 3 },
    { id: 10, name: "קוסקוס", category: 3 },
    { id: 10, name: "אורז", category: 3 },
    { id: 10, name: "תבלינים", category: 3 },
    { id: 10, name: "פפריקה", category: 3 },
    { id: 10, name: "פירורי לחם", category: 3 },
    { id: 10, name: "פלפל שחור", category: 3 },
    { id: 10, name: "כמון", category: 3 },
];

const products4 = [
    { id: 11, name: "קמח", category: 4 },
    { id: 12, name: "סוכר", category: 4 },
    { id: 12, name: "מלח", category: 4 },
    { id: 13, name: "שמן", category: 4 },
];

const products5 = [
    { id: 14, name: "גבינות", category: 5 },
    { id: 14, name: "גבינה צהובה", category: 5 },
    { id: 15, name: "קורנפלקס", category: 5 },
    { id: 16, name: "ביצים", category: 5 },
    { id: 17, name: "חלב", category: 5 },
];

const products6 = [
    { id: 18, name: "קולה", category: 6 },
    { id: 18, name: "מרלו", category: 6 },
    { id: 18, name: "שוואפס", category: 6 },
    { id: 18, name: "מנגו", category: 6 },
    { id: 18, name: "נסטי", category: 6 },
    { id: 18, name: "תפוזים", category: 6 },
    { id: 18, name: "זירו", category: 6 },
    { id: 18, name: "שתייה", category: 6 },
    { id: 18, name: "פחיות", category: 6 },
    { id: 18, name: "אלוורה", category: 6 },
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
    { id: 26, name: "קיסמי אוזניים", category: 8 },
    { id: 26, name: "מגבונים", category: 8 },
    { id: 26, name: "מברשת שיניים", category: 8 },
    { id: 27, name: "חדפ", category: 8 },
    { id: 27, name: "פדים", category: 8 },
    { id: 27, name: "כוסות", category: 8 },
    { id: 27, name: "צלחות", category: 8 },
    { id: 27, name: "מזלגות", category: 8 },
    { id: 27, name: "סכינים", category: 8 },
    { id: 27, name: "כפיות", category: 8 },
    { id: 27, name: "כפות", category: 8 },
    { id: 27, name: "חמגשיות", category: 8 },
    { id: 27, name: "נייר כסף", category: 8 },
    { id: 27, name: "ניילון", category: 8 },
    { id: 27, name: "מפה", category: 8 },
];

const products9 = [
    { id: 28, name: "יין", category: 9 },
    { id: 28, name: "קרקרים", category: 9 },
    { id: 28, name: "אקסלים", category: 9 },
    { id: 28, name: "בירות", category: 9 },
    { id: 28, name: "שמפניה", category: 9 },
    { id: 29, name: "חטיפים", category: 9 },
    { id: 30, name: "פטל", category: 9 },
    { id: 31, name: "ממרחים", category: 9 },
];

const products10 = [
    { id: 32, name: "מעדנים", category: 10 },
    { id: 33, name: "שמנת", category: 10 },
    { id: 34, name: "קוטג'", category: 10 },
    { id: 34, name: "מלבי", category: 10 },
    { id: 34, name: "שוקו", category: 10 },
    { id: 34, name: "חומוס", category: 10 },
    { id: 34, name: "טחינה", category: 10 },
];

const products11 = [
    { id: 35, name: "לחם", category: 11 },
    { id: 36, name: "פיצוחים", category: 11 },
    { id: 36, name: "בגטים", category: 11 },
    { id: 36, name: "גומי", category: 11 },
    { id: 36, name: "פיתות", category: 11 },
    { id: 36, name: "לחמניות", category: 11 },
    { id: 36, name: "חלות", category: 11 },
    { id: 36, name: "קשיו", category: 11 },
    { id: 36, name: "אגוזים", category: 11 },
    { id: 36, name: "גרעינים", category: 11 },
    { id: 36, name: "צימוקים", category: 11 },
    { id: 36, name: "צימוקים", category: 11 },
    { id: 36, name: "צימוקים", category: 11 },
];

const products12 = [
    { id: 37, name: "שוקולדים", category: 12 },
    { id: 38, name: "קפה", category: 12 },
    { id: 39, name: "תיונים", category: 12 },
    { id: 40, name: "עוגות", category: 12 },
];

const products13 = [
    { id: 41, name: "מרקים", category: 13 },
    { id: 42, name: "רטבים", category: 13 },
    { id: 43, name: "שימורים", category: 13 },
    { id: 43, name: "חומוסים", category: 13 },
    { id: 43, name: "תירס גמדי", category: 13 },
    { id: 43, name: "רסק עגבניות", category: 13 },
    { id: 43, name: "מלפפון חמוץ ", category: 13 },
    { id: 43, name: "תירס", category: 13 },
    { id: 43, name: "רוטב שום", category: 13 },
    { id: 43, name: "קטשופ", category: 13 },
    { id: 43, name: "ספייסי", category: 13 },
    { id: 43, name: "מיונז", category: 13 },
    { id: 43, name: "מיץ לימון", category: 13 },
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

function addItem() {
    const newItem = itemInput.value.trim();
    if (newItem !== '') {
      const li = createListItem(newItem);
      shoppingList.appendChild(li);
      li.classList.add('added'); // הוסף את המחלקה "added"
      itemInput.value = '';
      currentList.push(newItem);
  
      // חזור להקליד בתיבת הקלט
      itemInput.focus();
    }
  }
  
  function removeItem(button) {
    const li = button.parentNode;
    const removedItem = li.firstChild.textContent.trim();
  
    // הוסף את המחלקה "removed" ישירות ל-li
    li.style.animation = 'itemRemoved 0.5s ease';
  
    // הפעל את האנימציה ואז הסר את האלמנט
    setTimeout(() => {
      shoppingList.removeChild(li);
    }, 500);
  
    // עדכן את הרשימה הנוכחית
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

// פונקציה שמבצעת חיפוש חלקי

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
    const listItems = shoppingList.getElementsByTagName('li');
  
    // הוסף את המחלקה "removed" לכל פריט ברשימה
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].style.animation = 'itemRemoved 0.5s ease';
    }
  
    // אחרי סיום האנימציה, מחק את תוכן הרשימה
    setTimeout(() => {
      shoppingList.innerHTML = '';
      currentList = [];
    }, 500);
  }
  
