# Nyayo Clinic — Official Website

> **"Experience the Difference"**  
> Quality, affordable healthcare in the heart of Wau, South Sudan. Open every day from 7:00 AM to 7:00 PM.

A complete, high-performance, mobile-first one-page website designed specifically for **Nyayo Clinic** located on Lokoloko St, Wau, South Sudan.

---

## 🌟 Key Features & Highlights

- **Mobile-First & Ultra-Fast on 2G/3G Networks:** Built with pure HTML5, CSS3, and vanilla JavaScript with zero heavy framework bloat.
- **Direct WhatsApp Integration (No Backend Needed):** 
  - Form validation that automatically constructs a pre-filled, formatted WhatsApp appointment request with patient name, phone, selected medical service, preferred date/time, and notes.
  - Floating WhatsApp action button and direct header/hero quick-action buttons.
- **All 10 Core Sections Included:**
  1. **Top Announcement Bar:** Open daily 7AM–7PM with click-to-call phone link.
  2. **Sticky Navigation Header:** Responsive drawer navigation with smooth scrolling, call button, and WhatsApp CTA.
  3. **Hero Section:** Clear value proposition, trust badges, live status indicator, and quick-action buttons.
  4. **Medical Services (6 Cards):** General Consultations (OPD), Laboratory Services, Pharmacy, Maternal & Child Health, Vaccination & Immunization, and Emergency First Aid.
  5. **Why Choose Nyayo (4 Pillars):** Qualified medical staff, 100% genuine pharmaceuticals, 7-day 7AM–7PM availability, and central Wau location.
  6. **Clinic Gallery:** Exterior, pharmacy, and diagnostic consultation spaces.
  7. **Opening Hours & Location:** Interactive opening schedule table with dynamic "Open Today" day highlighting and an embedded Google Map of Lokoloko St, Wau.
  8. **Instant Appointment Booking Form:** Client-side form with date/time pickers and WhatsApp routing.
  9. **Footer:** Comprehensive contact information, medical emergency notice, opening hours, quick links, and developer credit (*"Website by Wedbata"*).
  10. **Floating WhatsApp Button:** Fixed bottom-right with pulse animation for high conversion.

---

## 📁 Project Structure

```text
Nyayo Clinic/
├── index.html            # Main semantic HTML5 single-page document
├── style.css             # Responsive stylesheet with CSS custom properties & design tokens
├── script.js             # Pure JavaScript (WhatsApp messaging, mobile nav, smooth scroll, form validation)
├── images/               # Image assets directory
│   ├── logo.png          # Nyayo Clinic emblem badge (Header & Footer logo)
│   ├── clinic-front.jpg  # Gallery: Clinic exterior & entrance
│   ├── pharmacy.jpg      # Gallery: Nyayo Clinic pharmacy & medicines
│   └── consultation.jpg  # Gallery: Laboratory diagnostics & consultation room
├── generate_assets.py    # Python helper script used to generate default branding assets
└── README.md             # Documentation, photo replacement guide & deployment instructions
```

---

## 🖼️ How to Replace the Logo & Gallery Photos

All image files are located inside the `images/` directory. You can replace them with your own high-resolution real photography at any time without needing to edit the HTML:

### 1. Replacing the Clinic Logo
- **File:** `images/logo.png`
- **Recommended format:** PNG with transparent background (or circular badge).
- **Recommended dimensions:** 240×240 px (displayed at 48×48 px in header and 44×44 px in footer for crisp display on high-DPI / Retina screens).
- **Action:** Overwrite `images/logo.png` with your new logo image using the exact filename `logo.png`.

### 2. Replacing Gallery Photos
Simply replace the three placeholder files in `images/` with your actual clinic photos:

| File Name | Description | Recommended Dimensions | Recommended Aspect Ratio |
| :--- | :--- | :--- | :--- |
| `images/clinic-front.jpg` | Photo of the clinic entrance/exterior on Lokoloko St | 800 × 533 px | 3:2 or 4:3 |
| `images/pharmacy.jpg` | Photo of the pharmacy shelves and medication counter | 800 × 533 px | 3:2 or 4:3 |
| `images/consultation.jpg` | Photo of consultation room, doctor desk, or lab equipment | 800 × 533 px | 3:2 or 4:3 |

> 💡 **Optimization Tip:** To keep the site loading instantly on mobile networks in South Sudan, compress JPG photos using tools like [TinyJPG](https://tinyjpg.com/) or export at ~75–80% JPEG quality before saving.

---

## 📞 How to Update Clinic Contact Details

### 1. Updating the WhatsApp Number
The WhatsApp number is defined **once** at the very top of `script.js`:
```javascript
// Open script.js (lines 18-23)
const WHATSAPP_NUMBER = '211922885420'; // International format without leading '+'
const CLINIC_PHONE_DISPLAY = '+211 922 885 420';
```
If you ever change the clinic's WhatsApp line, simply update that single constant in `script.js`.

### 2. Updating Display Numbers & Links in `index.html`
In `index.html`, search for `+211 922 885 420` (or `211922885420`) and update:
- Top bar phone link: `href="tel:+211922885420"`
- Header call button: `href="tel:+211922885420"`
- Hero call button: `href="tel:+211922885420"`
- Footer contact info & Emergency notice

---

## 🕒 How to Update Clinic Operating Hours

The working hours are set to **7:00 AM – 7:00 PM, Monday through Sunday**.
- The schedule is in `index.html` under `<section id="hours-location">` inside `<table class="hours-table">`.
- `script.js` contains a dynamic function (`initDynamicDayHighlight()`) that automatically detects the patient's current day of the week and highlights today's row with an **"Open Today"** badge in the clinic's signature green.

---

## 🚀 How to Deploy on GitHub Pages

You can host this website completely free with high global availability on GitHub Pages:

1. **Create a new repository** on [GitHub.com](https://github.com/) (e.g. `nyayo-clinic`).
2. **Push the project files** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Nyayo Clinic website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nyayo-clinic.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - In your repository, click **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment** &gt; **Branch**, select `main` branch and `/ (root)` folder.
   - Click **Save**.
4. Your website will be live in ~60 seconds at `https://<your-username>.github.io/nyayo-clinic/`.

---

## 💻 Tech Stack & Zero-Dependency Guarantee

- **HTML5:** Semantic, accessible markup (WAI-ARIA landmarks, labels, and roles).
- **CSS3:** Modern flexbox & CSS grid layout, CSS custom properties (`--color-primary: #1a4a2e`, etc.), fluid typography, and media queries.
- **JavaScript:** Pure Vanilla ES6+ with no build step, no npm packages, and no dependencies.
- **Typography:** Single optimized request to Google Fonts (`Playfair Display` for classical medical trust & `Inter` for clean readability).
- **Icons:** Lightweight inline SVG vectors for instant rendering without loading external icon fonts.

---

## 🏥 Clinic Summary & Credits

- **Clinic Name:** Nyayo Clinic
- **Tagline:** Experience the Difference
- **Location:** Lokoloko St, Wau, South Sudan
- **Contact:** +211 922 885 420
- **Hours:** Monday – Sunday (7:00 AM – 7:00 PM)
- **Website Development:** Wedbata
