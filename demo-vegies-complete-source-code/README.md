# DEMO VEGGIES — Official Static Website

A modern, attractive, and responsive **100% static website** created for **DEMO VEGGIES**, a wholesale and retail vegetable business supplying fresh tomatoes, whole coconuts, and fresh garlic.

---

## 🥬 1. Business & Project Overview

- **Business Name:** DEMO VEGGIES
- **Business Type:** Wholesale & Retail Vegetable Supply
- **Main Products:**
  - **Fresh Tomatoes:** Plump, firm, and juicy red tomatoes for salads, curries, and bulk kitchen use.
  - **Fresh Coconuts:** Mature coconuts with heavy water volume and thick white meat for cooking, sweets, and ceremonial uses.
  - **Fresh Garlic:** Tight-clove, aromatic bulbs with dry papery peel and high pungency for seasoning and pastes.
- **Core Brand Value:** *"Fresh Quality. Trusted Supply."*
- **Target Audience:** Individual households (retail portions) and commercial buyers (wholesale crates and sacks for restaurants, caterers, grocery stores, and food stalls).

---

## ⚡ 2. Technical Architecture

This project is strictly designed as a **pure static website**:
- **HTML5:** Semantic, accessible markup across 7 pages.
- **CSS3:** Custom responsive design system using CSS Variables, Flexbox, and CSS Grid.
- **Vanilla JavaScript:** Fast client-side interactions without heavy libraries or external frameworks.
- **No Backend or Database:** No Node.js server, Python backend, or SQL/NoSQL database required.
- **No Authentication / CMS:** No login, user registration, passwords, or admin dashboards.
- **No Paid APIs or External Gateways:** No payment gateways, paid map APIs, or subscription services.
- **WhatsApp Integration:** The contact form intelligently formats an inquiry message and launches WhatsApp directly using the configurable business number via `https://wa.me/`.

---

## 📁 3. File Structure

```text
demo vegies/
├── index.html              # Home page (Hero, value pillars, featured products, wholesale/retail model)
├── about.html              # About Us (Business philosophy, produce handling, buyer commitment)
├── products.html           # Products catalog with interactive filter chips
├── tomatoes.html           # Individual product page: Fresh Tomatoes
├── coconuts.html           # Individual product page: Fresh Coconuts
├── garlic.html             # Individual product page: Fresh Garlic
├── contact.html            # Contact Us (Editable placeholders, WhatsApp form builder, location box)
├── README.md               # Complete setup, customization, and deployment documentation
│
├── css/
│   └── style.css           # Complete responsive stylesheet (Forest Green #1F5B3A, Cream #F7F6EF, Accent #D8E9A8)
│
├── js/
│   └── script.js           # Frontend logic (Mobile navigation, WhatsApp composer, product filters)
│
└── images/
    ├── favicon.svg         # Clean brand favicon
    ├── logo.svg            # Horizontal brand logo
    ├── hero-vegetables.jpg # High-resolution hero showcase photograph
    ├── about-produce.jpg   # Produce handling and wholesale storage photograph
    ├── tomatoes.jpg        # Product photography: Fresh tomatoes on the vine
    ├── coconuts.jpg        # Product photography: Whole and split coconuts
    └── garlic.jpg          # Product photography: Whole garlic bulbs and cloves
```

---

## 🎨 4. Design System & Brand Palette

| Color Role | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary** | `#1F5B3A` | Forest Green: Trust, nature, freshness, primary buttons & brand accents |
| **Background** | `#F7F6EF` | Cream: Warm, natural, welcoming backdrop for produce |
| **Accent** | `#D8E9A8` | Light Green: Produce highlights, tags, badges, and attention points |
| **Dark Primary** | `#133B24` | Deep forest tone for headers, hero titles, and high-contrast text |
| **Text Main** | `#19271E` | Deep charcoal green for optimal readability |
| **Text Muted** | `#56675B` | Readable secondary text and descriptions |
| **WhatsApp Green** | `#25D366` | Direct messaging action buttons |

- **Typography:** Modern fonts paired via Google Fonts:
  - **Headings:** `Manrope` (clean, geometric, professional)
  - **Body Text:** `DM Sans` (highly legible, human, clean)

---

## 🚀 5. How to Run Locally

Because the website is 100% static, you can run it immediately without installing any build tools, compilers, or server runtimes.

### Option A: Double-Click (Immediate)
1. Navigate to the project folder `f:\demo vegies`.
2. Double-click `index.html`.
3. It opens directly in your default web browser (Chrome, Edge, Firefox, Safari).

### Option B: VS Code Live Server (Recommended for development)
1. Open the `demo vegies` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html` with hot-reload enabled.

### Option C: Python HTTP Server
If you have Python installed:
```bash
cd "f:\demo vegies"
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option D: Node.js `npx serve`
If you have Node.js installed:
```bash
cd "f:\demo vegies"
npx serve .
```

---

## ⚙️ 6. How to Customize Business Information

All business details are stored directly in easily editable source files.

### 1. Updating the WhatsApp Business Number & Global Settings
Open [`js/script.js`](file:///f:/demo%20vegies/js/script.js) and locate the `DEMO_CONFIG` object at the top:

```javascript
const DEMO_CONFIG = {
  // Replace with your real WhatsApp Business number with international country code (no + or spaces)
  // Example for India: "919876543210", Example for US: "15551234567"
  whatsappNumber: "919876543210",

  // Phone number for display in the top bar and contact cards
  displayPhone: "+91 98765 43210",

  // Business Name
  businessName: "DEMO VEGGIES",

  // Contact Email
  email: "info@demoveggies.example.com",

  // Physical Shop / Yard Address
  address: "Shop No. 12, Fresh Vegetable Market Yard, Main Road, City, State - PIN"
};
```

### 2. Updating Contact Information in `contact.html`
Open [`contact.html`](file:///f:/demo%20vegies/contact.html) and search for `[Editable Placeholder]`. Replace the phone number, email address, physical stall location, and business hours with your actual details.

### 3. Updating the Location & Google Map Link
In [`contact.html`](file:///f:/demo%20vegies/contact.html), replace the Google Maps search link:
```html
<a href="https://maps.google.com/?q=Your+Exact+Market+Address" target="_blank" ...>
```
If you wish to embed an interactive Google Maps iframe later, replace the `<div class="location-map-placeholder">` container with the standard Google Maps `<iframe>` code.

---

## 🌐 7. How to Deploy Online

### Deploying to Netlify (Fastest & Free)
1. Go to [netlify.com](https://www.netlify.com/) and create a free account.
2. Go to the **Sites** tab.
3. Drag and drop the whole `demo vegies` folder directly into the Netlify Drop zone.
4. Your website is instantly published with an SSL certificate (`https://your-site.netlify.app`).
5. (Optional) Connect your own custom domain (e.g. `www.demoveggies.com`).

### Deploying to GitHub Pages (Free)
1. Create a new GitHub repository named `demo-veggies`.
2. Push your project files to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of DEMO VEGGIES website"
   git branch -M main
   git remote add origin https://github.com/your-username/demo-veggies.git
   git push -u origin main
   ```
3. In your GitHub repository, click **Settings** > **Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your website will be live in 1–2 minutes at `https://your-username.github.io/demo-veggies/`.

### Deploying to Vercel
1. Install Vercel CLI: `npm i -g vercel`.
2. Inside `f:\demo vegies`, run:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy directly.

---

## 📱 8. Browser & Device Compatibility

- **Browsers:** Tested and compatible with Google Chrome, Mozilla Firefox, Microsoft Edge, Safari, and mobile web browsers.
- **Screen Sizes:**
  - Mobile Phones (320px – 480px)
  - Tablets & Phablets (481px – 768px)
  - Laptops (769px – 1024px)
  - Large Desktops (1025px and above)
- **Accessibility:** Semantic HTML elements, accessible skip-to-content links, clear focus indicators, high color contrast ratios, and `aria-expanded` attributes on the mobile menu.

---

## 📄 License & Attribution
Created for **DEMO VEGGIES**. All source code is completely self-contained and ready for commercial use.
