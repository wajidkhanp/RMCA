document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  if (header && !document.querySelector(".zelle-bar")) {
    const bar = document.createElement("aside");
    bar.className = "zelle-bar";
    bar.setAttribute("aria-label", "Zelle donation information");
    bar.innerHTML = '<div class="zelle-bar-inner"><span class="zelle-badge">Zelle</span><span>Donate via Zelle:</span><a href="tel:6024763270">602-476-3270</a></div>';
    header.insertAdjacentElement("afterend", bar);
  }
  const footer = document.querySelector("footer");
  if (footer && !footer.querySelector(".zelle-footer")) {
    const zelle = document.createElement("div");
    zelle.className = "zelle-footer";
    zelle.innerHTML = '<p><strong>Support Masjid Arkan with Zelle</strong><br>Send your donation using the number below.</p><a href="tel:6024763270">Zelle: 602-476-3270</a>';
    const copyright = footer.querySelector(".copyright");
    if (copyright) footer.insertBefore(zelle, copyright); else footer.append(zelle);
  }
});
