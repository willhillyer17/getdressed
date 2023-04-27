// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAwROKE_hU2jrclO5LxIoVZSvxks4GrqAQ",
  authDomain: "password-347421.firebaseapp.com",
  databaseURL: "https://password-347421-default-rtdb.firebaseio.com",
  projectId: "password-347421",
  storageBucket: "password-347421.appspot.com",
  messagingSenderId: "611056351749",
  appId: "1:611056351749:web:11810a6649733d748bfa6c",
  measurementId: "G-TZ27KYGS5B"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Get references to elements on the page
var loginForm = document.querySelector('.login form');
var generatorSection = document.querySelector('.generator');
var adminSection = document.querySelector('.admin');
var categorySelect = document.getElementById('categorySelect');
var categorySelect2 = document.getElementById('categorySelect2');
var categorySelect3 = document.getElementById('categorySelect3');
var itemSelect = document.getElementById('itemSelect');
var itemSelect2 = document.getElementById('itemSelect2');
var messageDiv = document.querySelector('.message');

// Listen for the login form to be submitted
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the username and password values
  var username = loginForm.querySelector('#username').value;
  var password = loginForm.querySelector('#password').value;

  // Check if the username and password are correct
  if (username === 'admin' && password === 'password') {
    // Show the admin section
    adminSection.style.display = 'block';
    generatorSection.style.display = 'none';
  } else {
    // Show an error message
    messageDiv.textContent = 'Incorrect username or password.';
  }
});
// Listen for the add category form to be submitted
document.querySelector('#addCategoryButton').addEventListener('click', function(event) {
  event.preventDefault();

  // Get the category name value
  var categoryName = document.querySelector('#categoryName').value;

  // Check if the category name is not empty
  if (categoryName.trim() !== '') {
    // Add the category to the database
    database.ref('categories').push({
      name: categoryName
    });

    // Clear the category name input
    document.querySelector('#categoryName').value = '';

    // Show a success message
    messageDiv.textContent = 'Category added successfully.';
    messageDiv.style.display = 'block';
    messageDiv.classList.remove('error');
    messageDiv.classList.add('success');
  } else {
    // Show an error message
    messageDiv.textContent = 'Please enter a category name.';
    messageDiv.style.display = 'block';
    messageDiv.classList.remove('success');
    messageDiv.classList.add('error');
  }
});
// Listen for the page to load
window.addEventListener('load', function() {
  // Get the categories from the database
  database.ref('categories').once('value').then(function(snapshot) {
    // Loop through the categories
    snapshot.forEach(function(childSnapshot) {
      // Get the category data
      var category = childSnapshot.val();

      // Add the category to the category select options
      var option = document.createElement('option');
      option.value = childSnapshot.key;
      option.textContent = category.name;
      categorySelect.appendChild(option);

      // Add the category to the category select options for adjusting weight and removing items
      var option2 = document.createElement('option');
      option2.value = childSnapshot.key;
      option2.textContent = category.name;
      categorySelect2.appendChild(option2);
      var option3 = document.createElement('option');
      option3.value = childSnapshot.key;
      option3.textContent = category
// Function to display message to the admin
function displayMessage(message) {
  const messageElement = document.querySelector('.admin .message');
  messageElement.textContent = message;
  messageElement.style.display = 'block';
}
// Function to add a new category to the database
function addCategory(categoryName) {
  // Get a reference to the "categories" node in the database
  const categoriesRef = firebase.database().ref('categories');
  
  // Check if the category already exists in the database
  categoriesRef.orderByChild('name').equalTo(categoryName).once('value', snapshot => {
    if (snapshot.exists()) {
      // Category already exists, display an error message
      displayMessage(`Category "${categoryName}" already exists.`);
    } else {
      // Category does not exist, add it to the database
      const category = {
        name: categoryName
      };
      categoriesRef.push(category);
      
      // Display a success message
      displayMessage(`Category "${categoryName}" added.`);
    }
  });
}
// Function to add a new item to the database
function addItem(categoryId, itemName, itemWeight) {
  // Get a reference to the "items" node for the selected category
  const itemsRef = firebase.database().ref(`items/${categoryId}`);
  
  // Check if the item already exists in the database
  itemsRef.orderByChild('name').equalTo(itemName).once('value', snapshot => {
    if (snapshot.exists()) {
      // Item already exists, display an error message
      displayMessage(`Item "${itemName}" already exists.`);
    } else {
      // Item does not exist, add it to the database
      const item = {
        name: itemName,
        weight: itemWeight
      };
      itemsRef.push(item);
      
      // Display a success message
      displayMessage(`Item "${itemName}" added.`);
    }
  });
}
// Functions to update the category dropdowns
function updateCategoryDropdowns() {
  categorySelect.innerHTML = '';
  categorySelect2.innerHTML = '';
  categorySelect3.innerHTML = '';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.text = category.name;
    categorySelect.appendChild(option);

    const option2 = document.createElement('option');
    option2.value = category.id;
    option2.text = category.name;
    categorySelect2.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = category.id;
    option3.text = category.name;
    categorySelect3.appendChild(option3);
  });
}

// Functions to update the item dropdowns
function updateItemDropdowns(categoryId) {
  itemSelect.innerHTML = '';
  itemSelect2.innerHTML = '';
  const category = categories.find(category => category.id === categoryId);
  if (category) {
    category.items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
      itemSelect.appendChild(option);

      const option2 = document.createElement('option');
      option2.value = item.id;
      option2.text = item.name;
      itemSelect2.appendChild(option2);
    });
  }
}

// Function to handle adjusting the weight of an item
function handleAdjustWeight() {
  const categoryId = categorySelect2.value;
  const itemId = itemSelect.value;
  const newWeight = newWeightInput.value;
  const category = categories.find(category => category.id === categoryId);
  if (category) {
    const item = category.items.find(item => item.id === itemId);
    if (item) {
      item.weight = parseInt(newWeight);
      message.innerHTML = 'Weight updated successfully.';
      message.style.display = 'block';
      message.style.backgroundColor = '#D5E8D4';
      message.style.color = '#2C6700';
      setTimeout(() => {
        message.style.display = 'none';
      }, 3000);
    } else {
      message.innerHTML = 'Item not found in category.';
      message.style.display = 'block';
      message.style.backgroundColor = '#F8D7DA';
      message.style.color = '#721C24';
    }
  } else {
    message.innerHTML = 'Category not found.';
    message.style.display = 'block';
    message.style.backgroundColor = '#F8D7DA';
    message.style.color = '#721C24';
  }
}

// Function to handle removing an item from a category
function handleRemoveItem() {
  const categoryId = categorySelect3.value;
  const itemId = itemSelect2.value;
  const category = categories.find(category => category.id === categoryId);
  if (category) {
    const itemIndex = category.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      category.items.splice(itemIndex, 1);
      message.innerHTML = 'Item removed successfully.';
      message.style.display = 'block';
      message.style.backgroundColor = '#D5E8D4';
      message.style.color = '#2C6700';
      setTimeout(() => {
        message.style.display = 'none';
      }, 3000);
      updateItemDropdowns(categoryId);
    } else {
      message.innerHTML = 'Item not found in category.';
      message.style.display = 'block';
      message.style.backgroundColor = '#F8D7DA';
      message.style.color = '#721C24';
    }
  } else {
    message.innerHTML = 'Category not found.';
    message.style.display = 'block';
    message.style.backgroundColor = '#F8D7DA';
    message.style.color = '#721C24';
  }
}

function showPage(page) {
  // Hide all pages
  loginPage.style.display = 'none';
  generatorPage.style.display = 'none';
  adminPage.style.display = 'none';

  // Show the requested page
  if (page === 'login') {
    loginPage.style.display = 'block';
  } else if (page === 'generator') {
    generatorPage.style.display = 'block';
  } else if (page === 'admin') {
    adminPage.style.display = 'block';
  }
}

// Listen for user authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    showPage('generator');

    // Check if user is an admin
    checkAdmin(user.uid);
  } else {
    // User is signed out
    showPage('login');
  }
});
// Function to remove an item from a category in Firebase
function removeItem(categoryId, itemId) {
  const categoryRef = database.ref(`categories/${categoryId}`);
  const itemRef = categoryRef.child(itemId);

  itemRef.remove().then(() => {
    showMessage('Item successfully removed.');
  }).catch((error) => {
    showMessage(`Error removing item: ${error.message}`);
  });
}

// Event listener for removing an item
document.getElementById('removeItemButton').addEventListener('click', (event) => {
  event.preventDefault();

  const categorySelect = document.getElementById('categorySelect3');
  const itemSelect = document.getElementById('itemSelect2');

  const categoryId = categorySelect.value;
  const itemId = itemSelect.value;

  removeItem(categoryId, itemId);
});

// Function to display admin panel
function showAdminPanel() {
  if (currentUser && currentUser.isAdmin) {
    // Clear previous category and item options
    clearSelectOptions(categorySelect);
    clearSelectOptions(categorySelect2);
    clearSelectOptions(categorySelect3);
    clearSelectOptions(itemSelect);
    clearSelectOptions(itemSelect2);

    // Show admin panel and hide login and generator
    login.style.display = "none";
    generator.style.display = "none";
    admin.style.display = "block";

    // Populate category select options
    database.ref("categories").once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const option = document.createElement("option");
        option.value = childSnapshot.key;
        option.textContent = childSnapshot.val().name;
        categorySelect.appendChild(option);
      });

      // Set initial category for item add and weight adjust forms
      if (categorySelect.options.length > 0) {
        categorySelect2.value = categorySelect.options[0].value;
        categorySelect3.value = categorySelect.options[0].value;

        // Populate item select options for initial category
        database
          .ref(`items/${categorySelect2.value}`)
          .once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const option = document.createElement("option");
              option.value = childSnapshot.key;
              option.textContent = childSnapshot.val().name;
              itemSelect.appendChild(option);
              itemSelect2.appendChild(option.cloneNode(true));
            });
          });
      }
    });
  } else {
    alert("You do not have permission to access the admin panel.");
  }
}
// Event listener for the "Add Item" form
addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const categoryName = categorySelect.value;
  const itemName = itemNameInput.value;
  const itemWeight = parseInt(itemWeightInput.value);

  // Get the category object from the database
  const categoryRef = database.ref(`categories/${categoryName}`);
  categoryRef.once("value", (snapshot) => {
    const category = snapshot.val();

    // Add the new item to the category's items array
    category.items.push({ name: itemName, weight: itemWeight });

    // Update the category in the database
    categoryRef.update(category, (error) => {
      if (error) {
        console.error(error);
        showMessage(`Error adding item: ${error.message}`, "error");
      } else {
        // Clear the form inputs
        itemNameInput.value = "";
        itemWeightInput.value = "";
        showMessage("Item added successfully!", "success");
      }
    });
  });
});

// Event listener for the "Adjust Weight" form
adjustWeightForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const categoryName = categorySelect2.value;
  const itemName = itemSelect.value;
  const newWeight = parseInt(newWeightInput.value);

  // Get the category object from the database
  const categoryRef = database.ref(`categories/${categoryName}`);
  categoryRef.once("value", (snapshot) => {
    const category = snapshot.val();

    // Find the index of the item to adjust and update its weight
    const index = category.items.findIndex((item) => item.name === itemName);
    category.items[index].weight = newWeight;

    // Update the category in the database
    categoryRef.update(category, (error) => {
      if (error) {
        console.error(error);
        showMessage(`Error adjusting weight: ${error.message}`, "error");
      } else {
        // Clear the form inputs
        newWeightInput.value = "";
        showMessage("Weight adjusted successfully!", "success");
      }
    });
  });
});

// Event listener for the "Remove Item" form
removeItemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const categoryName = categorySelect3.value;
  const itemName = itemSelect2.value;

  // Get the category object from the database
  const categoryRef = database.ref(`categories/${categoryName}`);
  categoryRef.once("value", (snapshot) => {
    const category = snapshot.val();

    // Remove the item from the category's items array
    category.items = category.items.filter((item) => item.name !== itemName);

    // Update the category in the database
    categoryRef.update(category, (error) => {
      if (error) {
        console.error(error);
        showMessage(`Error removing item: ${error.message}`, "error");
      } else {
        showMessage("Item removed successfully!", "success");
      }
    });
  });
});
// Adjust weight of item
adjustWeightButton.addEventListener("click", (event) => {
  event.preventDefault();

  const category = categorySelect3.value;
  const item = itemSelect2.value;
  const weight = newWeight.value;

  // Get reference to item in database
  const itemRef = database.ref(`categories/${category}/items/${item}`);

  // Update item's weight
  itemRef.update({ weight: parseInt(weight) })
    .then(() => {
      message.textContent = "Weight updated successfully.";
      message.style.display = "block";
      message.style.backgroundColor = "#A7F3D0";
      message.style.color = "#008000";
      newWeight.value = "";
    })
    .catch((error) => {
      message.textContent = `Error updating weight: ${error.message}`;
      message.style.display = "block";
      message.style.backgroundColor = "#FCC2D7";
      message.style.color = "#FF0000";
    });
});
} // <-- Closing brace for the 'getDressed()' function
document.addEventListener('DOMContentLoaded', () => {
  getDressed();
});