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

const sectionSkills = document.querySelector(".section-skills");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionSkills);

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

const linkElement = document.querySelector(".logo-mobile");

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
