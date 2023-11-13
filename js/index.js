const skillButton = document.getElementById("skillButton");
const homeButton = document.getElementById("homeButton");

skillButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "skills.html";
});

homeButton.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

// მობილური ნავიგაციის ამუშავება

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// ლინკებზე გადასვლა

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // სქროლი
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // სხვა ლინკებზე სქროლვა
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // მობაილ ნავიგაციის დახურვა
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// ლოგოს შეცვლა რესფონსივზე
const linkElement = document.querySelector(".logo");

function changeLinkText() {
  if (linkElement) {
    if (window.innerWidth <= 944) {
      linkElement.textContent = "GK";
    } else {
      linkElement.textContent = "George | KJ";
    }
  }
}

function handleResize() {
  const mobileNavButton = document.querySelector(".btn-mobile-nav");
  if (window.innerWidth <= 944) {
    mobileNavButton.style.display = "block";
  } else {
    mobileNavButton.style.display = "none";
  }

  // Call the function to update the link text
  changeLinkText();
}

// Call the function initially when the page loads
handleResize();

// Listen for the "resize" event and update the link text accordingly
window.addEventListener("resize", handleResize);

////////////////////////////////
////////////////////////////////
////////////////////////////////

// პროქტების წამოღება JSON ფაილიდან
async function populateCards() {
  try {
    // Fetch the JSON data from "projects.json"
    const response = await fetch("projects.json");
    const cardData = await response.json();

    // Get the card container
    const container = document.querySelector(".container.grid");

    // Loop through the card data and create card elements
    cardData.forEach((card) => {
      const cardHTML = createCardElement(card);
      console.log(card.languages);
      container.innerHTML += cardHTML;
    });
  } catch (error) {
    console.error("Error fetching and populating cards:", error);
  }
}

// Function to create a single card element based on the data
function createCardElement(card) {
  return `
    <div class="card">
      <img src="${card.imageSrc}" alt="${card.title}" class="project-img" />
      <div class="middle">
      ${card.languages
        .map((lang) => `<div class="text">${lang}</div>`)
        .join("")}
      </div>
      <div class="project-heading">
        <h3 class="project-heading-text">${card.title}</h3>
      </div>
      <div class="text-box">
        <a href="${card.liveLink}" class="project-btn" target="_blank">Live</a>
        <a href="${
          card.sourceLink
        }" class="project-btn" target="_blank">Source</a>
      </div>
    </div>
  `;
}

populateCards();
