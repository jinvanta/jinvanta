# Jinvanta — Spiritual & Devotional Brand Website

A premium, modern, fully responsive static website for **Jinvanta**, a spiritual and devotional products brand.

> *Purity in Every Prayer, Devotion in Every Offering*

## ✨ Features

- Pure **HTML, CSS & JavaScript** — no frameworks, no backend
- **Mobile-first**, fully responsive design
- Premium temple-inspired aesthetic (saffron, maroon, gold, cream)
- Smooth scrolling, scroll-reveal animations, hover effects
- Responsive hamburger navigation with scroll-spy
- Rotating inspirational quotes carousel
- **Formspree-compatible** contact form (works with no backend)
- SEO meta tags, Open Graph & Twitter cards, JSON-LD structured data
- Accessibility: skip link, ARIA labels, keyboard support, reduced-motion support
- Ready for **GitHub Pages**

## 📁 Structure

```
/
├── index.html          # All page sections
├── css/style.css       # Full stylesheet & design tokens
├── js/script.js        # Nav, reveal, quotes, form handling
├── assets/             # SVG art (diya, mandala, products, favicon, OG image)
├── .nojekyll           # Serve /assets correctly on GitHub Pages
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Create a repository and push these files.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save. Your site will be live at `https://<username>.github.io/<repo>/`.
5. For the custom domain `jinvanta.in`, add a `CNAME` file containing `jinvanta.in` and configure DNS.

## 📬 Connect the Contact Form

The form uses [Formspree](https://formspree.io):

1. Create a free Formspree form and copy your form ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action` with your endpoint:
   `action="https://formspree.io/f/xxxxxx"`

Until configured, the form runs in friendly **demo mode** and won't send real emails.

## 🎨 Customisation

- Colours, fonts, radius and spacing live as CSS variables in `:root` (top of `css/style.css`).
- Update contact details, email and phone in `index.html` (search for `hello@jinvanta.in`).
- Replace the placeholder SVG product art in `assets/products.svg` with real photos if desired.

---

© Jinvanta. Crafted with devotion.
