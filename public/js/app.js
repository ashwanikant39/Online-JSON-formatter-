let paste = document.querySelector("#paste");
let copy = document.querySelector("#copy");
let format = document.querySelector("#format");
let remWhiteSpace = document.querySelector("#rem-white-space");
let clear = document.querySelector("#clear");
let loadJson = document.querySelector("#load-json");
let textField = document.querySelector("#text-field");
let urlPopup = document.querySelector(".hide-popup");
let crossIcon = document.querySelector("#cross-icon");
let linkUrl = document.querySelector("#link-url");
let errPopup = document.querySelector(".err-hide");
let loadDataBtn = document.querySelector("#load-data-btn");
let errOkBtn = document.querySelector("#err-ok");
let viewer = document.querySelector("#viewer");
let text = document.querySelector("#text");
let textSec = document.querySelector(".text-section");
let viewerSec = document.querySelector(".viewer-section-hide");
let loaderSec = document.querySelector(".loader-sec-hide");
let output1 = document.querySelector("#output1");
let apiErrPop = document.querySelector(".api-err-popup-hide");
let errCrossIcon = document.querySelector("#err-cross-icon");

async function fetchApi(url) {
  // console.log(url);
  try {
    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    // console.log(JSON.stringify(data));
    textField.value = JSON.stringify(data);
    loaderSec.classList.add("loader-sec-hide");
    loaderSec.classList.remove("loader-sec");

    // urlPopup.classList.add("hide-popup");
    // urlPopup.classList.remove("url-popup");
  } catch (error) {
    // alert("err")
    loaderSec.classList.add("loader-sec-hide");
    loaderSec.classList.remove("loader-sec");
    // console.log(error);
    apiErrPop.classList.add("api-err-popup");
    apiErrPop.classList.remove("api-err-popup-hide");
  }
}
errCrossIcon.addEventListener("click", () => {
  apiErrPop.classList.add("api-err-popup-hide");
  apiErrPop.classList.remove("api-err-popup");
});

loadDataBtn.addEventListener("click", () => {
  // console.log(linkUrl.value);

  let url = linkUrl.value;
  if (url === "") {
    alert("Enter URL");
  } else {
    fetchApi(url);
    urlPopup.classList.add("hide-popup");
    urlPopup.classList.remove("url-popup");

    loaderSec.classList.add("loader-sec");
    loaderSec.classList.remove("loader-sec-hide");
  }
});

loadJson.addEventListener("click", () => {
  loaderSec.classList.add("loader-sec-hide");
  loaderSec.classList.remove("loader-sec");

  urlPopup.classList.add("url-popup");
  urlPopup.classList.remove("hide-popup");
});
crossIcon.addEventListener("click", () => {
  urlPopup.classList.add("hide-popup");
  urlPopup.classList.remove("url-popup");
});

paste.addEventListener("click", async () => {
  let text = await navigator.clipboard.readText();
  textField.value = text;
});

async function copied() {
  try {
    await navigator.clipboard.writeText(textField.value);
    alert("Text copied");
  } catch (err) {
    alert("Failed to copy");
  }
}
copy.addEventListener("click", () => {
  if (textField.value !== "") {
    copied();
  } else {
    alert("Text field is Empty");
  }
});

clear.addEventListener("click", () => {
  // console.log(textField.value)
  if (textField.value !== "") {
    textField.value = "";
  }
});
remWhiteSpace.addEventListener("click", () => {
  let spaceRem = textField.value.replace(/\s/g, "");
  textField.value = spaceRem;
});

format.addEventListener("click", () => {
  try {
    if (textField.value !== "") {
      let fromatted = JSON.stringify(JSON.parse(textField.value), null, 2);
      //   console.log(fromatted)
      textField.value = fromatted;
    }
  } catch (err) {
    console.log("Invalid JSON data");
    errPopup.classList.add("invalid-err-sec");
    errPopup.classList.remove("err-hide");
  }
});

errOkBtn.addEventListener("click", () => {
  errPopup.classList.add("err-hide");
  errPopup.classList.remove("invalid-err-sec");
});

viewer.addEventListener("click", () => {
  function checkvalidJson() {
    try {
      JSON.parse(textField.value);
      return false;
    } catch (err) {
      return true;
    }
  }

  if (textField.value === "" || checkvalidJson()) {
    errPopup.classList.add("invalid-err-sec");
    errPopup.classList.remove("err-hide");
  } else {
    // viewerSec.classList.add("viewer-section");
    textSec.classList.add("text-section-hide");
    textSec.classList.remove("text-section");
    viewerSec.classList.add("viewer-section");
    viewerSec.classList.remove("viewer-section-hide");
  }

  // Sample JSON data (Replace with your JSON)
  const jsonData = JSON.parse(textField.value);

  // console.log(jsonData);

  // Function to create a collapsible element
  function createCollapsibleElement(key, value, parentKey) {
    const li = document.createElement("li");

    if (typeof value === "object" && value !== null) {
      const button = document.createElement("span");
      button.className = "collapsible";
      button.textContent = key;

      const ul = document.createElement("ul");
      ul.className = "collapsible-content";
      Object.keys(value).forEach((subKey) => {
        ul.appendChild(createCollapsibleElement(subKey, value[subKey], key));
      });

      button.addEventListener("click", function () {
        button.classList.toggle("expanded");
        ul.style.display = ul.style.display === "block" ? "none" : "block";
      });

      li.appendChild(button);
      li.appendChild(ul);
    } else {
      li.innerHTML = `<span class="key">${key}:</span> <span class="value">${value}</span>`;
      li.querySelector(".value").addEventListener("click", () => {
        displayTable({ [key]: value });
      });
    }

    return li;
  }

  // Function to display the JSON data
  function displayJSON(json) {
    const container = document.getElementById("json-viewer");
    const ul = document.createElement("ul");
    json.forEach((item, index) => {
      ul.appendChild(createCollapsibleElement(index, item));
    });
    container.appendChild(ul);
  }

  // Function to display data in the table
  function displayTable(data) {
    const tableBody = document.querySelector("#data-table tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    Object.keys(data).forEach((key) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${key}</td><td>${JSON.stringify(data[key])}</td>`;
      tableBody.appendChild(tr);
    });
  }

  // Initialize and display JSON data
  displayJSON(jsonData);
});

text.addEventListener("click", () => {
  textSec.classList.add("text-section");
  textSec.classList.remove("text-section-hide");
  viewerSec.classList.add("viewer-section-hide");
  viewerSec.classList.remove("viewer-section");
});

// resizable window

const resizer = document.getElementById("resizer");
const sidebar = document.getElementById("sidebar");
let isResizing = false;

// Event listener for mouse down on the resizer
resizer.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.body.classList.add("no-select");
});

// Mouse move event to adjust the sidebar width
document.addEventListener("mousemove", function (e) {
  if (isResizing) {
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 150 && newWidth <= 600) {
      // Setting min and max width
      sidebar.style.width = newWidth + "px";
    }
  }
});

// Mouse up event to stop resizing
document.addEventListener("mouseup", function () {
  isResizing = false;
  document.body.classList.remove("no-select");
});
