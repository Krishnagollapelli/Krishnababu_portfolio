document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navHeight = nav ? nav.offsetHeight : 90;

  document.querySelectorAll("nav a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      e.preventDefault();

      const sectionTop =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        10;

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    });
  });

  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => observer.observe(item));
  }

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message sent successfully! ");
      form.reset();
    });
  }

  document.querySelectorAll(".skill-ring").forEach((ring) => {
    const value = ring.getAttribute("data-value");
    if (!value) return;

    setTimeout(() => {
      ring.style.setProperty("--percent", value);
    }, 300);
  });

  const mapContainer = document.getElementById("map");

  if (mapContainer && window.L) {
    const map = L.map("map", {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([16.509934, 80.643867], 15);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
      }
    ).addTo(map);

    L.circleMarker([16.509934, 80.643867], {
      radius: 7,
      fillColor: "#f60012",
      color: "#f60012",
      weight: 1,
      fillOpacity: 1,
    }).addTo(map);
  }
});
emailjs.init("JaAc7fYxE1IVAOe4O");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) {
    console.error("❌ contactForm not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("✅ Form submitted");

    emailjs.sendForm("service_y8q4c19", "template_9x6rstd", this).then(
      (res) => {
        console.log("SUCCESS:", res);
        alert("✅ Message sent successfully!");
        form.reset();
      },
      (err) => {
        console.error("FAILED:", err);
        alert("❌ Failed to send message");
      }
    );
  });
});
