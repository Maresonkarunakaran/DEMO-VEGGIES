/**
 * DEMO VEGGIES — Frontend Interactions Script
 * Pure vanilla JavaScript for static website.
 * No backend, no database, no external dependencies required.
 */

// =============================================================================
// BUSINESS CONFIGURATION (Editable Placeholders)
// Update these details when actual business contact details are available.
// =============================================================================
const DEMO_CONFIG = {
  // WhatsApp number with international country code (no '+' or '-' or spaces)
  // PLACEHOLDER: e.g. 919876543210 (India), 15551234567 (US), etc.
  whatsappNumber: "919876543210",

  // Phone number for display and tel: links
  displayPhone: "+91 98765 43210",

  // Business Name
  businessName: "DEMO VEGGIES",

  // Contact Email (Placeholder)
  email: "info@demoveggies.example.com",

  // Physical Shop / Yard Address (Placeholder)
  address:
    "Shop No. 12, Fresh Vegetable Market Yard, Main Road, City, State - PIN",
};

const PAGE_HISTORY_KEY = "demoVeggiesPageHistory";

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHistoryControls();
  initHeaderScroll();
  initActiveNavLink();
  initDynamicWhatsAppLinks();
  initContactForm();
  initProductFilter();
  prefillContactFromParams();
});

function initHistoryControls() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  const directoryPath = new URL(".", window.location.href).pathname;
  const homeUrl = new URL("index.html", window.location.href).href;
  const currentUrl = getPageUrl(window.location.href);

  const controls = document.createElement("div");
  controls.className = "history-controls";
  controls.setAttribute("aria-label", "Page history");
  controls.innerHTML = `
    <button type="button" class="history-control" data-history="back" aria-label="Go back" title="Back">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m7 7-7-7 7-7" />
      </svg>
    </button>
    <button type="button" class="history-control" data-history="forward" aria-label="Go forward" title="Forward">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
      </svg>
    </button>
  `;

  function readHistory() {
    try {
      const pageHistory = JSON.parse(
        window.sessionStorage.getItem(PAGE_HISTORY_KEY) || "null",
      );
      if (
        !pageHistory ||
        !Array.isArray(pageHistory.entries) ||
        !Number.isInteger(pageHistory.index) ||
        pageHistory.index < 0 ||
        pageHistory.index >= pageHistory.entries.length
      )
        return null;

      return pageHistory;
    } catch {
      return null;
    }
  }

  function saveHistory(pageHistory) {
    try {
      window.sessionStorage.setItem(
        PAGE_HISTORY_KEY,
        JSON.stringify(pageHistory),
      );
    } catch {
      return;
    }
  }

  function updateButtonStates(pageHistory) {
    controls.querySelector('[data-history="back"]').disabled =
      pageHistory.index === 0;
    controls.querySelector('[data-history="forward"]').disabled =
      pageHistory.index === pageHistory.entries.length - 1;
  }

  let pageHistory = readHistory();
  if (!pageHistory) {
    pageHistory =
      currentUrl === getPageUrl(homeUrl)
        ? { entries: [currentUrl], index: 0 }
        : { entries: [getPageUrl(homeUrl), currentUrl], index: 1 };
  } else if (pageHistory.entries[pageHistory.index] !== currentUrl) {
    const existingIndex = pageHistory.entries.lastIndexOf(currentUrl);
    if (existingIndex >= 0) {
      pageHistory.index = existingIndex;
    } else {
      pageHistory.entries = pageHistory.entries.slice(0, pageHistory.index + 1);
      pageHistory.entries.push(currentUrl);
      pageHistory.index = pageHistory.entries.length - 1;
    }
  }
  saveHistory(pageHistory);
  updateButtonStates(pageHistory);

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (link.target && link.target !== "_self") ||
      link.hasAttribute("download")
    )
      return;

    const destination = new URL(link.href, window.location.href);
    if (!destination.pathname.startsWith(directoryPath)) return;

    const destinationUrl = getPageUrl(destination.href);
    if (destinationUrl === currentUrl) return;

    pageHistory.entries = pageHistory.entries.slice(0, pageHistory.index + 1);
    pageHistory.entries.push(destinationUrl);
    pageHistory.index = pageHistory.entries.length - 1;
    saveHistory(pageHistory);
    updateButtonStates(pageHistory);
  });

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-history]");
    if (!button || button.disabled) return;

    pageHistory.index += button.dataset.history === "back" ? -1 : 1;
    saveHistory(pageHistory);
    window.location.href = pageHistory.entries[pageHistory.index];
  });

  navActions.prepend(controls);
}

function getPageUrl(url) {
  const pageUrl = new URL(url, window.location.href);
  pageUrl.hash = "";
  return pageUrl.href;
}

// =============================================================================
// 1. Mobile Navigation Toggle
// =============================================================================
function initMobileNav() {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const isOpen = forceClose ? false : !navMenu.classList.contains("open");
    navMenu.classList.toggle("open", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

    // Toggle icon lines if available
    const icon = toggleBtn.querySelector("svg");
    if (icon) {
      if (isOpen) {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      } else {
        icon.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
      }
    }
  }

  toggleBtn.addEventListener("click", () => toggleMenu());

  // Close when clicking a nav link
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("open") &&
      !navMenu.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      toggleMenu(true);
      toggleBtn.focus();
    }
  });
}

// =============================================================================
// 2. Header Scroll Effect
// =============================================================================
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// =============================================================================
// 3. Highlight Active Navigation Link
// =============================================================================
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Direct match or root index check
    const isCurrent =
      currentPath.endsWith(href) ||
      (href === "index.html" &&
        (currentPath === "/" || currentPath.endsWith("/")));

    if (isCurrent) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

// =============================================================================
// 4. Dynamic WhatsApp Direct Links & Helpers
// =============================================================================
function createWhatsAppUrl(customMessage) {
  const text = encodeURIComponent(customMessage.trim());
  return `https://wa.me/${DEMO_CONFIG.whatsappNumber}?text=${text}`;
}

function initDynamicWhatsAppLinks() {
  // Update floating WhatsApp button
  const floatingBtn = document.getElementById("floatingWhatsApp");
  if (floatingBtn) {
    const defaultMsg = `Hello ${DEMO_CONFIG.businessName}, I would like to enquire about your fresh vegetable supply (Wholesale & Retail availability).`;
    floatingBtn.setAttribute("href", createWhatsAppUrl(defaultMsg));
    floatingBtn.setAttribute("target", "_blank");
    floatingBtn.setAttribute("rel", "noopener noreferrer");
  }

  // Update product-specific quick enquiry buttons
  const waProductBtns = document.querySelectorAll("[data-wa-product]");
  waProductBtns.forEach((btn) => {
    const productName =
      btn.getAttribute("data-wa-product") || "Fresh Vegetables";
    const supplyType = btn.getAttribute("data-wa-type") || "Wholesale/Retail";
    const msg = `Hello ${DEMO_CONFIG.businessName}, I would like to enquire about ${productName} (${supplyType} price & daily availability).`;
    btn.setAttribute("href", createWhatsAppUrl(msg));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener noreferrer");
  });
}

// =============================================================================
// 5. Contact Form WhatsApp Message Composer
// =============================================================================
function initContactForm() {
  const form = document.getElementById("vegetableEnquiryForm");
  if (!form) return;

  const alertBox = document.getElementById("formStatusAlert");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName")?.value.trim() || "";
    const phone = document.getElementById("customerPhone")?.value.trim() || "";
    const supplyType =
      form.querySelector('input[name="enquiryType"]:checked')?.value ||
      "Wholesale & Retail";
    const product =
      document.getElementById("productInterest")?.value ||
      "All / Multiple Vegetables";
    const quantity =
      document.getElementById("estimatedQuantity")?.value.trim() || "";
    const notes =
      document.getElementById("customerMessage")?.value.trim() || "";

    if (!name || !phone) {
      alert("Please provide both your name and contact phone number.");
      return;
    }

    // Construct clean WhatsApp formatted message
    let message = `*NEW ENQUIRY — ${DEMO_CONFIG.businessName}*\n\n`;
    message += `• *Customer Name:* ${name}\n`;
    message += `• *Contact Phone:* ${phone}\n`;
    message += `• *Enquiry Type:* ${supplyType}\n`;
    message += `• *Product Needed:* ${product}\n`;
    if (quantity) {
      message += `• *Quantity / Frequency:* ${quantity}\n`;
    }
    if (notes) {
      message += `• *Notes / Requirements:* ${notes}\n`;
    }
    message += `\nHello, please let me know current availability, dispatch timings, and price quote. Thank you!`;

    const waUrl = createWhatsAppUrl(message);

    // Show friendly status notice
    if (alertBox) {
      alertBox.style.display = "block";
      alertBox.innerHTML = `
        <strong>Opening WhatsApp...</strong> Your message has been prepared for <strong>${DEMO_CONFIG.businessName}</strong>. 
        If WhatsApp did not open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline; font-weight:bold;">click here to send</a>.
      `;
    }

    // Launch WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
}

// =============================================================================
// 6. Products Page Filtering (All, Wholesale, Retail)
// =============================================================================
function initProductFilter() {
  const filterChips = document.querySelectorAll(".filter-chip");
  const productCards = document.querySelectorAll(".product-filter-card");

  if (!filterChips.length || !productCards.length) return;

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      // Toggle active chip state
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filterVal = chip.getAttribute("data-filter") || "all";

      productCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterVal === "all" || categories.includes(filterVal)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// =============================================================================
// 7. Auto-prefill Contact Form from URL Search Parameters
// =============================================================================
function prefillContactFromParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const type = urlParams.get("type");

  if (product) {
    const productSelect = document.getElementById("productInterest");
    if (productSelect) {
      for (let option of productSelect.options) {
        if (option.value.toLowerCase().includes(product.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  if (type) {
    const radio = document.querySelector(
      `input[name="enquiryType"][value="${type}"]`,
    );
    if (radio) {
      radio.checked = true;
    }
  }
}
