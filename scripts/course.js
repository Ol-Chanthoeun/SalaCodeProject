// ===== Sidebar Toggle Button (NEW) =====
(function () {
  const btn = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");

  if (!btn || !sidebar) return;

  function openSidebar() {
    sidebar.classList.add("is-open");
    document.body.classList.add("sidebar-open");
    btn.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    document.body.classList.remove("sidebar-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar();
  });

  // click outside closes
  document.addEventListener("click", (e) => {
    if (!sidebar.classList.contains("is-open")) return;
    if (!sidebar.contains(e.target) && e.target !== btn) closeSidebar();
  });

  // click a link closes
  sidebar.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeSidebar();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });
})();
