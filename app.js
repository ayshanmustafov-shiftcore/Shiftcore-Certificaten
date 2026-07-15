(() => {
  const { sectors, roles, certificates } = window.SHIFTCORE_DATA;

  const sectorButtons = document.getElementById("sectorButtons");
  const roleGrid = document.getElementById("roleGrid");
  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");
  const resultText = document.getElementById("resultText");
  const emptyState = document.getElementById("emptyState");
  const roleCount = document.getElementById("roleCount");

  const dialog = document.getElementById("roleDialog");
  const closeDialog = document.getElementById("closeDialog");
  const dialogSector = document.getElementById("dialogSector");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogDescription = document.getElementById("dialogDescription");
  const dialogCertCount = document.getElementById("dialogCertCount");
  const dialogCertificates = document.getElementById("dialogCertificates");

  let selectedSector = "all";
  let searchTerm = "";

  const labels = {
    required: "Verplicht",
    project: "Projectafhankelijk",
    recommended: "Aanbevolen"
  };

  const sectorName = id => sectors.find(s => s.id === id)?.name || id;

  function certSearchText(role) {
    return role.certs
      .map(([id]) => {
        const cert = certificates[id];
        return `${cert.name} ${cert.fullName}`;
      })
      .join(" ");
  }

  function filteredRoles() {
    const query = searchTerm.trim().toLowerCase();
    return roles.filter(role => {
      const sectorMatch = selectedSector === "all" || role.sector === selectedSector;
      if (!sectorMatch) return false;
      if (!query) return true;

      const haystack = [
        role.name,
        role.description,
        sectorName(role.sector),
        certSearchText(role)
      ].join(" ").toLowerCase();

      return haystack.includes(query);
    });
  }

  function renderSectors() {
    sectorButtons.innerHTML = sectors.map(sector => {
      const count = sector.id === "all"
        ? roles.length
        : roles.filter(role => role.sector === sector.id).length;

      return `
        <button class="sector-button ${sector.id === selectedSector ? "active" : ""}"
          type="button" data-sector="${sector.id}">
          ${sector.name}
          <span>${count} ${count === 1 ? "functie" : "functies"}</span>
        </button>`;
    }).join("");

    sectorButtons.querySelectorAll("[data-sector]").forEach(button => {
      button.addEventListener("click", () => {
        selectedSector = button.dataset.sector;
        render();
      });
    });
  }

  function renderRoles() {
    const list = filteredRoles();
    roleCount.textContent = roles.length;
    resultText.textContent = `${list.length} ${list.length === 1 ? "functie" : "functies"} getoond`;
    emptyState.hidden = list.length !== 0;

    roleGrid.innerHTML = list.map(role => {
      const required = role.certs.filter(([,level]) => level === "required").length;
      return `
        <button class="role-card" type="button" data-role="${role.id}">
          <span class="role-sector">${sectorName(role.sector)}</span>
          <h3>${role.name}</h3>
          <p>${role.description}</p>
          <span class="role-footer">
            <span>${role.certs.length} certificaten · ${required} verplicht</span>
            <b>→</b>
          </span>
        </button>`;
    }).join("");

    roleGrid.querySelectorAll("[data-role]").forEach(card => {
      card.addEventListener("click", () => openRole(card.dataset.role));
    });
  }

  function openRole(roleId) {
    const role = roles.find(item => item.id === roleId);
    if (!role) return;

    dialogSector.textContent = sectorName(role.sector);
    dialogTitle.textContent = role.name;
    dialogDescription.textContent = role.description;
    dialogCertCount.textContent = `${role.certs.length} certificaten`;

    dialogCertificates.innerHTML = role.certs.map(([certId, level]) => {
      const cert = certificates[certId];
      return `
        <article class="certificate-item">
          <button class="certificate-main" type="button" aria-expanded="false">
            <i class="status-bar ${level}"></i>
            <span class="certificate-title">
              <strong>${cert.name}</strong>
              <span>${cert.fullName}</span>
            </span>
            <span class="status-pill ${level}">${labels[level]}</span>
            <span class="chevron">›</span>
          </button>
          <div class="certificate-details">
            <p>${cert.explanation}</p>
            <small><strong>Geldigheid:</strong> ${cert.validity}</small>
          </div>
        </article>`;
    }).join("");

    dialogCertificates.querySelectorAll(".certificate-main").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.closest(".certificate-item");
        const isOpen = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });

    dialog.showModal();
  }

  function render() {
    renderSectors();
    renderRoles();
  }

  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value;
    renderRoles();
  });

  clearButton.addEventListener("click", () => {
    selectedSector = "all";
    searchTerm = "";
    searchInput.value = "";
    render();
    searchInput.focus();
  });

  closeDialog.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (outside) dialog.close();
  });

  render();
})();
