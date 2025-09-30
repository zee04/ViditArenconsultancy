# README - Aren Kitchen Consultancy Website

## Overview
Professional culinary consultancy website for Chef Vidit Aren, featuring a sophisticated dark theme with gold accents, smooth animations, and comprehensive business information.

## 🚀 Quick Start
1. Upload all files to your web server
2. Replace image placeholders with actual images (see `image-placement-guide.md`)
3. Add SEO meta tags (see `seo-meta-tags.html`)
4. Update contact form endpoint if needed
5. Configure domain and SSL certificate

## 📁 File Structure
```
/
├── index.html          # Main HTML file (single-page application)
├── style.css           # Complete CSS with design system
├── app.js             # JavaScript functionality
├── images/            # Image assets (create this folder)
│   ├── chef-portrait.jpg
│   ├── service-icons/ (12 icons)
│   ├── project-images/ (11 images)
│   └── additional-photos/
├── favicon.ico        # Website favicon
└── site.webmanifest   # Web app manifest
```

## 🎨 Design Features
- **Theme:** Dark charcoal (#1a1a1a) with gold accents (#DAA520)
- **Typography:** FKGroteskNeue, Geist, Inter font stack
- **Animations:** Smooth scrolling, hover effects, loading animations
- **Glass Morphism:** Frosted glass navigation and cards
- **Responsive:** Mobile-first design with breakpoints

## 📱 Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px  
- Desktop: 1024px+

## 🔧 Technical Features

### JavaScript Functionality (app.js)
- **SmoothScroll Class:** Custom smooth scrolling with momentum
- **Navigation Class:** Mobile menu, dropdown handling, active states
- **AnimationObserver Class:** Intersection Observer for scroll animations
- **FormHandler Class:** Contact form submission with Formspree
- **ParallaxEffects Class:** Parallax scrolling on desktop
- **CardEffects Class:** 3D hover effects for service/project cards

### CSS Features (style.css)
- **Design System:** Comprehensive CSS custom properties
- **Dark/Light Mode:** Automatic theme switching support
- **Animation System:** Consistent easing and duration variables
- **Glass Cards:** Backdrop-filter effects for modern look
- **Grid Layouts:** CSS Grid for responsive service/project cards

### Form Integration
- **Endpoint:** Formspree integration for contact form
- **Validation:** Built-in browser validation with custom styling
- **Loading States:** Visual feedback during form submission
- **Success/Error Handling:** Dynamic message display

## 📊 SEO Optimization

### Meta Tags (Apply from seo-meta-tags.html)
- Complete Open Graph tags for social sharing
- Twitter Card metadata
- Structured data (Schema.org) for business information
- Local SEO optimization for Mumbai location

### Schema Markup Included
- **ProfessionalService:** Business information
- **Person:** Chef Vidit Aren profile
- **FAQPage:** Common questions and answers
- **BreadcrumbList:** Site navigation structure

### Performance Features
- Semantic HTML structure
- Optimized CSS with minimal specificity
- Efficient JavaScript with event delegation
- Lazy loading ready for images
- Compressed assets support

## 🖼️ Image Requirements

### Essential Images (Priority Order)
1. **Chef Portrait:** 400x400px, circular crop ready
2. **Project Images:** 11 images at 600x400px (3:2 ratio)
3. **Service Icons:** 12 icons at 80x80px, preferably transparent background
4. **Additional Photos:** 2-3 lifestyle/action shots of chef

### Image Placement Locations
See `image-placement-guide.md` for exact file locations and HTML code snippets.

## 🎯 Business Information

### Services Offered (12 Services)
- Culinary Consultancy
- Hospitality Consultancy  
- Brand Development
- Marketing & Communications
- Kitchen & Bar Design
- Recipe Standardization
- Food Styling & Photography
- Revenue Budgeting
- Event & Pop-up Curation
- Festival Curation
- Menu Development
- Menu Writing & Placement

### Featured Projects
**Past Projects:** Little Food Co., META-WhatsApp, VANTARA NIWAS-MACHAAN, Moonshine, VIRAASAT, Basque by Breve, Phat Fillings, ZEKI

**Ongoing Projects:** Doppler, Sarabi, Sunny Da Dhaba

## 🔗 Contact Integration

### Form Configuration
- **Action:** Formspree endpoint (https://formspree.io/f/mrblwabz)
- **Method:** POST with JSON accept header
- **Fields:** Name, Email, Phone, Company, Message
- **Validation:** Required fields with custom styling

### WhatsApp Integration
- Click-to-chat functionality
- Update phone number in contact section
- No pre-filled message for better UX

## 🚨 Important Notes

### DO NOT MODIFY
- Core functionality in app.js
- Design system in style.css  
- HTML structure and classes
- Animation timings and easing

### SAFE TO UPDATE
- Content text within existing HTML tags
- Image src attributes
- Contact information
- Social media links
- Meta tag content

### Performance Optimization
- All images should be under 500KB
- Use WebP format with JPG fallbacks
- Enable gzip compression on server
- Set proper cache headers for static assets

## 📈 Analytics Setup

### Recommended Tracking
1. **Google Analytics 4:** Add tracking code to `<head>`
2. **Google Search Console:** Verify domain ownership
3. **Meta Pixel:** For social media advertising (if needed)
4. **Heat Mapping:** Hotjar or similar for user behavior

### Conversion Goals
- Contact form submissions
- WhatsApp clicks
- Service page engagement
- Project portfolio views

## 🔒 Security Considerations
- Form spam protection via Formspree
- HTTPS enforcement recommended
- Regular security updates for server
- Input sanitization for any dynamic content

## 🌟 SEO Best Practices Applied
- Semantic HTML5 structure
- Proper heading hierarchy (H1-H6)
- Alt text for all images (when added)
- Meta descriptions under 160 characters
- Page title under 60 characters
- Internal linking structure
- Fast loading times
- Mobile-first indexing ready

## 📞 Support
For technical issues with the website code or additional customizations, refer to:
- Image placement guide for visual updates
- SEO meta tags file for search optimization
- Contact form documentation for Formspree integration

## 🎉 Launch Checklist
- [ ] Upload all files to web server
- [ ] Add chef portrait image
- [ ] Add project images (11 total)
- [ ] Add service icons (12 total)  
- [ ] Apply SEO meta tags
- [ ] Test contact form
- [ ] Test WhatsApp link
- [ ] Check mobile responsiveness
- [ ] Verify loading animations
- [ ] Setup Google Analytics
- [ ] Submit to Google Search Console