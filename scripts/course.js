const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cards = document.querySelectorAll(".card");

function filterCourses() {
  const keyword = searchInput.value.trim().toLowerCase();

  cards.forEach(card => {
    const title = (card.dataset.title || "").toLowerCase();
    const h3 = card.querySelector("h3")?.innerText.toLowerCase() || "";

    // match keyword with data-title OR h3 text
    if (title.includes(keyword) || h3.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Filter while typing
searchInput.addEventListener("input", filterCourses);

// Filter when click button
searchBtn.addEventListener("click", filterCourses);

// Press Enter to search
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") filterCourses();
});


// Optional: Show "no results" message
const noResult = document.getElementById("noResult");

function filterCourses() {
  const keyword = searchInput.value.trim().toLowerCase();
  let found = false;

  cards.forEach(card => {
    const title = (card.dataset.title || "").toLowerCase();
    const h3 = card.querySelector("h3")?.innerText.toLowerCase() || "";

    if (title.includes(keyword) || h3.includes(keyword)) {
      card.style.display = "block";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  noResult.style.display = found ? "none" : "block";
}