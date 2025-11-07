document.addEventListener("DOMContentLoaded", () => {
  const greetingElement = document.getElementById("greeting");
  const firstName = prompt("Masukkan nama Anda:") || "Amel";
  greetingElement.textContent = `Hi ${firstName}, Welcome To Website`;

  // Update current time
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // Navigation active link on scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", handleFormSubmit);
});

function updateCurrentTime() {
  const now = new Date();
  const currentTimeElement = document.getElementById("currentTime");
  if (currentTimeElement) {
    currentTimeElement.textContent = `Current time : ${now.toString()}`;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) {
    alert("Harap isi semua kolom dengan benar.");
    return;
  }

  if (!email || !isValidEmail(email)) {
    alert("Email harus valid dan mengandung '@' serta '.'");
    return;
  }

  if (!phone || isNaN(phone) || phone === "") {
    alert("Nomor telepon hanya boleh berisi angka");
    return;
  }

  if (!message) {
    alert("Harap isi semua kolom dengan benar.");
    return;
  }

  // Update info box with submitted data
  const submitInfo = document.getElementById("submitInfo");
  submitInfo.innerHTML = `
    Nama : ${name} <br>
    Email : ${email} <br>
    Nomor Telepon : ${phone} <br>
    Pesan : ${message}
  `;

  alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim.`);
  e.target.reset();
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}
