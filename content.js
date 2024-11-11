function createCopyrightBox() {
  const copyrightBox = document.createElement("div");
  copyrightBox.style.position = "fixed";
  copyrightBox.style.bottom = "20px";
  copyrightBox.style.right = "20px";
  copyrightBox.style.backgroundColor = "#282c34";
  copyrightBox.style.color = "#f1f1f1";
  copyrightBox.style.border = "1px solid #481b85";
  copyrightBox.style.borderRadius = "10px";
  copyrightBox.style.padding = "10px 20px";
  copyrightBox.style.zIndex = "1000";
  copyrightBox.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.7)";
  copyrightBox.style.fontSize = "14px";
  copyrightBox.style.fontWeight = "bold";
  copyrightBox.style.fontFamily = "Arial, sans-serif";

  const copyrightText = document.createElement("span");
  copyrightText.innerHTML =
    "&copy; 2024 Made by <a href='https://github.com/ItsAlexIK' target='_blank' style='color: #1E90FF; text-decoration: underline;'>ItsAlex</a><br>";
  copyrightBox.appendChild(copyrightText);
  document.body.appendChild(copyrightBox);
}

function saveTranslation(word, translation) {
  const translations = JSON.parse(localStorage.getItem("translations")) || [];
  if (
    !translations.some((t) => t.word === word && t.translation === translation)
  ) {
    translations.push({ word, translation });
    localStorage.setItem("translations", JSON.stringify(translations));
    showTranslations();
  }
}

function showTranslations(filter = "") {
  const translations = JSON.parse(localStorage.getItem("translations")) || [];
  let translationsList = document.getElementById("translationsList");
  let searchInput;

  if (!translationsList) {
    translationsList = document.createElement("div");
    translationsList.id = "translationsList";
    translationsList.style.position = "fixed";
    translationsList.style.top = "20px";
    translationsList.style.right = "20px";
    translationsList.style.backgroundColor = "#282c34";
    translationsList.style.color = "#f1f1f1";
    translationsList.style.border = "1px solid #481b85";
    translationsList.style.borderRadius = "10px";
    translationsList.style.padding = "15px";
    translationsList.style.zIndex = "1000";
    translationsList.style.maxHeight = "700px";
    translationsList.style.overflowY = "auto";
    translationsList.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.7)";

    document.body.appendChild(translationsList);

    const searchContainer = document.createElement("div");
    searchContainer.style.marginBottom = "15px";

    searchInput = document.createElement("input");
    searchInput.placeholder = "Szukaj...";
    searchInput.style.marginTop = "15px";
    searchInput.style.width = "95%";
    searchInput.style.padding = "10px";
    searchInput.style.border = "1px solid #444";
    searchInput.style.borderRadius = "5px";
    searchInput.style.fontSize = "14px";
    searchInput.style.fontFamily = "Arial, sans-serif";
    searchInput.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    searchInput.value = filter;

    searchInput.addEventListener("input", () => {
      showTranslations(searchInput.value);
    });

    searchContainer.appendChild(searchInput);
    translationsList.appendChild(searchContainer);
  } else {
    searchInput = translationsList.querySelector("input");
  }

  const list = document.createElement("ul");
  list.style.listStyleType = "none";
  list.style.padding = "0";

  const filteredTranslations = translations
    .filter(
      (t) =>
        t.word.toLowerCase().includes(filter.toLowerCase()) ||
        t.translation.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      a.word.localeCompare(b.word, "pl", { sensitivity: "base" })
    );

  filteredTranslations.forEach((translation) => {
    const li = document.createElement("li");
    li.style.marginBottom = "15px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "5px";
    li.style.borderBottom = "1px solid #444";

    const textContainer = document.createElement("span");
    textContainer.textContent = `${translation.word} - ${translation.translation}`;
    li.appendChild(textContainer);

    const copyButton = createStyledButton("📋", "#282c34", () => {
      navigator.clipboard.writeText(translation.word).then(() => {
        updateCopyButton(copyButton, "✅");
      });
    });

    li.appendChild(copyButton);
    list.appendChild(li);
  });

  if (filteredTranslations.length === 0) {
    const noData = document.createElement("li");
    noData.textContent = "Brak zapisanych tłumaczeń.";
    noData.style.color = "#888";
    list.appendChild(noData);
  }

  const existingList = translationsList.querySelector("ul");
  if (existingList) {
    translationsList.replaceChild(list, existingList);
  } else {
    translationsList.appendChild(list);
  }

  if (!translationsList.querySelector("#clearButton")) {
    const clearButton = createStyledButton(
      "Usuń wszystkie tłumaczenia",
      "#FF4136",
      () => {
        localStorage.removeItem("translations");
        showTranslations();
      }
    );
    clearButton.id = "clearButton";
    clearButton.style.marginTop = "15px";
    translationsList.appendChild(clearButton);
  }

  if (!translationsList.querySelector("#closeButton")) {
    const closeButton = createStyledButton("Zamknij", "#6c757d", () => {
      document.body.removeChild(translationsList);
    });
    closeButton.id = "closeButton";
    closeButton.style.marginTop = "5px";
    translationsList.appendChild(closeButton);
  }

  requestAnimationFrame(() => {
    searchInput.focus();
    searchInput.selectionStart = searchInput.selectionEnd =
      searchInput.value.length;
  });
}

function createStyledButton(text, bgColor, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.padding = "12px 18px";
  button.style.backgroundColor = bgColor;
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.transition = "background-color 0.3s, transform 0.2s";
  button.style.marginLeft = "10px";
  button.style.fontSize = "16px";
  button.style.fontFamily = "Arial, sans-serif";
  button.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#3b4048";
    button.style.transform = "scale(1.05)";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = bgColor;
    button.style.transform = "scale(1)";
  });

  button.addEventListener("click", onClick);

  return button;
}

function updateCopyButton(button, message) {
  const originalText = button.textContent;
  button.textContent = message;

  setTimeout(() => {
    button.textContent = originalText;
    const searchInput = document.querySelector("#translationsList input");
    if (searchInput) {
      searchInput.value = "";
      showTranslations("");
    }
  }, 2000);
}

const copyButton = createStyledButton("📋", "#282c34", () => {
  navigator.clipboard.writeText(translation.word).then(() => {
    updateCopyButton(copyButton, "✅");
  });
});

function setupCheckButtonListener() {
  const nextButton = document.getElementById("next_word");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      const word = document.getElementById("word")?.textContent || "";
      const translation =
        document.querySelector("#answer_translations")?.textContent || "";
      if (word && translation) {
        saveTranslation(word, translation);
      } else {
        console.log("Błąd!");
      }
    });
  } else {
    console.error("Przycisk 'Następne' nie został znaleziony.");
  }
}

document.addEventListener("paste", function (e) {
  e.preventDefault();
  let clipboardData = e.clipboardData || window.clipboardData;
  let pastedData = clipboardData.getData("Text");
  let activeElement = document.activeElement;
  if (
    activeElement.tagName === "INPUT" ||
    activeElement.tagName === "TEXTAREA"
  ) {
    let start = activeElement.selectionStart;
    let end = activeElement.selectionEnd;
    activeElement.value =
      activeElement.value.substring(0, start) +
      pastedData +
      activeElement.value.substring(end);
    activeElement.selectionStart = activeElement.selectionEnd =
      start + pastedData.length;
  }
});

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addFetchWordsButton() {
  const fetchWordsButton = createStyledButton(
    "Pobierz słówka",
    "#28a745",
    () => {
      const student_id = getParameterByName("child_id");

      if (student_id) {
        fetch(
          `https://instaling.pl/learning/repeat_words_new.php?student_id=${student_id}&menu=4`
        )
          .then((response) => response.text())
          .then((data) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, "text/html");

            const rows = doc.querySelectorAll(".table_tests tbody tr");

            rows.forEach((row) => {
              const wordCell = row.querySelector("td");
              const translationCell = row.querySelector("td:nth-child(2)");

              if (wordCell && translationCell) {
                const word = wordCell.textContent.trim();
                const translation = translationCell.textContent.trim();
                saveTranslation(word, translation);
              }
            });
          })
          .catch((error) => {
            console.error("Błąd:", error);
          });
      } else {
        console.error("Nie znaleziono student_id (child_id) w URL.");
      }
    }
  );

  const translationsList = document.getElementById("translationsList");
  if (translationsList) {
    translationsList.appendChild(fetchWordsButton);
  }
}

createCopyrightBox();
setupCheckButtonListener();
showTranslations();
addFetchWordsButton();
