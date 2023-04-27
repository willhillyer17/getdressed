// Listen for the DOMContentLoaded event to ensure the page is fully loaded before running any JavaScript code
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the login form and add an event listener to handle form submission
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the user's email and password from the form
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Call the Firebase authentication method to sign in the user with the provided email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Clear the form and display a success message
        loginForm.reset();
        displayMessage("Login successful!", false);

        // Get the user's UID
        const uid = userCredential.user.uid;

        // Check if the user is an admin
        const adminRef = firebase.database().ref("admins");
        adminRef.once("value")
          .then((snapshot) => {
            const adminUids = snapshot.val();
            if (adminUids.includes(uid)) {
              // User is an admin, allow access to admin features
              displayAdminFeatures();
            } else {
              // User is not an admin, restrict access to admin features
              displayMessage("You do not have permission to access this feature.", true);
            }
          })
          .catch((error) => {
            console.error("Error getting admin UIDs: ", error);
          });
      })
      .catch((error) => {
        // Display an error message if the login fails
        const errorMessage = error.message;
        displayMessage(`Error: ${errorMessage}`, true);
      });
  });

  // Call the getDressed function to display the items
  getDressed();
});

function getDressed() {
  hideMessage();
  const itemRef = firebase.firestore().collection("items");

  itemRef
    .get()
    .then((querySnapshot) => {
      displayItems(querySnapshot);
    })
    .catch((error) => {
      console.error("Error getting items: ", error);
      displayMessage(`Error getting items: ${error.message}`, true);
    });
}

function displayAdminFeatures() {
  // Display admin features, such as a button to add new items
  const adminPanel = document.querySelector(".admin");
  adminPanel.style.display = "block";

  // Add event listeners to the admin forms
  const addItemForm = document.getElementById("add-item-form");
  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the form
    const name = addItemForm.name.value;
    const category = addItemForm.category.value;
    const price = parseFloat(addItemForm.price.value);

    // Call the Firebase function to add the item to the database
    addItem(name, category, price)
      .then(() => {
        // Clear the form and display a success message
        addItemForm.reset();
        displayMessage("Item added successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the item cannot be added
        console.error("Error adding item: ", error);
        displayMessage(`Error adding item: ${error.message}`, true);
      });
  });

  const deleteItemForm = document.getElementById("delete-item-form");
  deleteItemForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the ID of the item to delete
    const id = deleteItemForm.deleteId.value;

    // Call the Firebase function to delete the item from the database
    deleteItem(id)
      .then(() => {
        // Clear the form and display a success message
        deleteItemForm.reset();
        displayMessage("Item deleted successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the item cannot be deleted
        console.error("Error deleting item: ", error);
        displayMessage(`Error deleting item: ${error.message}`, true);
      });
  });

  const addCategoryForm = document.getElementById("add-category-form");
  addCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the name of the category to add
    const name = addCategoryForm.categoryName.value;

    // Call the Firebase function to add the category to the database
    addCategory(name)
      .then(() => {
        // Clear the form and display a success message
        addCategoryForm.reset();
        displayMessage("Category added successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the category cannot be added
        console.error("Error adding category: ", error);
        displayMessage(`Error adding category: ${error.message}`, true);
      });
  });

  const deleteCategoryForm = document.getElementById("delete-category-form");
  deleteCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the name of the category to delete
    const name = deleteCategoryForm.deleteCategory.value;

    // Call the Firebase function to delete the category from the database
    deleteCategory(name)
      .then(() => {
        // Clear the form and display a success message
        deleteCategoryForm.reset();
        displayMessage("Category deleted successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the category cannot be deleted
        console.error("Error deleting category: ", error);
        displayMessage(`Error deleting category: ${error.message}`, true);
      });
  });

  const addWeightForm = document.getElementById("add-weight-form");
  addWeightForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the weight to add
    const weight = parseInt(addWeightForm.weight.value);

    // Call the Firebase function to add the weight to the database
    addWeight(weight)
      .then(() => {
        // Clear the form and display a success message
        addWeightForm.reset();
        displayMessage("Weight added successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the weight cannot be added
        console.error("Error adding weight: ", error);
        displayMessage(`Error adding weight: ${error.message}`, true);
      });
  });

  const deleteWeightForm = document.getElementById("delete-weight-form");
  deleteWeightForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the weight to delete
    const weight = parseInt(deleteWeightForm.deleteWeight.value);

    // Call the Firebase function to delete the weight from the database
    deleteWeight(weight)
      .then(() => {
        // Clear the form and display a success message
        deleteWeightForm.reset();
        displayMessage("Weight deleted successfully!", false);
      })
      .catch((error) => {
        // Display an error message if the weight cannot be deleted
        console.error("Error deleting weight: ", error);
        displayMessage(`Error deleting weight: ${error.message}`, true);
      });
  });
}

function hideMessage() {
  const message = document.getElementById("message");
  message.style.display = "none";
}

function displayMessage(text, isError) {
  const message = document.getElementById("message");
  message.textContent = text;
  message.style.display = "block";
  message.style.color = isError ? "red" : "green";
}

function displayItems(querySnapshot) {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const item = doc.data();
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
    `;
    itemList.appendChild(itemElement);
  });
}

function addItem(name, category, price) {
  // Call the Firebase function to add the item to the database
  return firebase.firestore().collection("items").add({
    name: name,
    category: category,
    price: price,
  });
}

function deleteItem(id) {
  // Call the Firebase function to delete the item from the database
  return firebase.firestore().collection("items").doc(id).delete();
}

function addCategory(name) {
  // Call the Firebase function to add the category to the database
  return firebase.firestore().collection("categories").doc(name).set({});
}

function deleteCategory(name) {
  // Call the Firebase function to delete the category from the database
  return firebase.firestore().collection("categories").doc(name).delete();
}

function addWeight(weight) {
  // Call the Firebase function to add the weight to the database
  return firebase.firestore().collection("weights").doc(weight.toString()).set({});
}

function deleteWeight(weight) {
  // Call the Firebase function to delete the weight from the database
  return firebase.firestore().collection("weights").doc(weight.toString()).delete();
}
