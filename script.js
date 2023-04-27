// Include the data from the data.js file by importing or linking it in your HTML file

function getDressed() {
  hideMessage();

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

document.addEventListener("DOMContentLoaded", () => {
  getDressed();
});
