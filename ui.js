function displayItems(querySnapshot) {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("div");
    item.classList.add("item");

    // Update this code to generate the item HTML based on your data
    // You can access the data from the provided data structures
    // For example: tops[data.name], bottoms[data.name], etc.

    itemList.appendChild(item);
  });
}

function displayMessage(messageText, isError = false) {
  const message = document.getElementById("message");
  message.textContent = messageText;
  message.style.display = "block";
  message.style.backgroundColor = isError ? "#FCC2D7" : "#A7F3D0";
  message.style.color = isError ? "#FF0000" : "#008000";
}

function hideMessage() {
  const message = document.getElementById("message");
  message.style.display = "none";
}
