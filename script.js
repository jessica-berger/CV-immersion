document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".nav-toggle");
  const menu = document.querySelector("[data-nav-menu]");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(`[data-nav="${currentPage}"]`).forEach((link) => link.classList.add("active"));
  }

  const contactForm = document.querySelector("[data-contact-form]");
  const contactStatus = document.querySelector("[data-contact-status]");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      contactStatus.textContent = "Envoi en cours…";
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error("Échec de l'envoi");
        contactForm.reset();
        contactStatus.textContent = "Message envoyé, merci !";
      } catch {
        contactStatus.textContent = "L'envoi n'a pas abouti. Vous pouvez me contacter directement par email.";
      }
    });
  }
});
