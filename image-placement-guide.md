# Image Placeholder Guide for Aren Kitchen Consultancy

Based on your website code analysis, here are all the image placeholders and exactly where to place your images:

## 1. HERO SECTION - Chef Portrait
**Location:** Line 89 in index.html - `.chef-portrait .portrait-ring`
**Current Code:** 
```css
.portrait-ring::before {
  content: '👨🍳';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 120px;
}
```
**Replace with:**
```html
<div class="portrait-ring">
  <img src="images/chef-vidit-aren-portrait.jpg" alt="Chef Vidit Aren Portrait" class="chef-image">
</div>
```
**Add this CSS to style.css:**
```css
.chef-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
```

## 2. SERVICE CARDS - Service Icons (12 Images Needed)
**Location:** Each service card in the services grid
**Current Code:** `.service-icon` classes with emoji placeholders
**Images Needed:**
- `culinary-consultancy-icon.jpg`
- `hospitality-consultancy-icon.jpg`
- `brand-development-icon.jpg`
- `marketing-communications-icon.jpg`
- `kitchen-bar-design-icon.jpg`
- `recipe-standardization-icon.jpg`
- `food-styling-photography-icon.jpg`
- `revenue-budgeting-icon.jpg`
- `event-popup-curation-icon.jpg`
- `festival-curation-icon.jpg`
- `menu-development-icon.jpg`
- `menu-writing-placement-icon.jpg`

**Replace each service icon span with:**
```html
<img src="images/[service-name]-icon.jpg" alt="[Service Name] Icon" class="service-icon">
```

## 3. PROJECT CARDS - Project Images (11 Images Needed)
**Location:** Each project card needs a hero image
**Add these images to project cards:**

### Past Projects (8 images):
- `little-food-co-project.jpg` - Little Food Co. project
- `meta-whatsapp-project.jpg` - META WhatsApp ad film
- `vantara-machaan-project.jpg` - VANTARA NIWAS MACHAAN
- `moonshine-brand-project.jpg` - Moonshine brand development
- `viraasat-restaurant-project.jpg` - VIRAASAT restaurant
- `basque-breve-project.jpg` - Basque by Breve cafe
- `phat-fillings-project.jpg` - Phat Fillings delivery brand
- `zeki-bistro-project.jpg` - ZEKI bistro concept

### Ongoing Projects (3 images):
- `doppler-cafe-project.jpg` - Doppler conceptual cafe
- `sarabi-restaurant-project.jpg` - Sarabi upscale restaurant
- `sunny-lonavala-project.jpg` - Sunny Da Dhaba evolution

**Add this HTML structure to each project card:**
```html
<div class="project-image">
  <img src="images/[project-name]-project.jpg" alt="[Project Name]" class="project-hero">
</div>
```

**Add this CSS to style.css:**
```css
.project-image {
  width: 100%;
  height: 200px;
  margin-bottom: var(--space-16);
  border-radius: var(--radius-base);
  overflow: hidden;
}

.project-hero {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-normal) var(--ease-standard);
}

.project-card:hover .project-hero {
  transform: scale(1.05);
}
```

## 4. ABOUT SECTION - Additional Chef Photos (2-3 Images)
**Location:** About section can accommodate chef lifestyle images
**Images Needed:**
- `chef-vidit-cooking-action.jpg` - Chef in action
- `chef-vidit-restaurant-ambiance.jpg` - In restaurant setting
- `chef-vidit-team-collaboration.jpg` - Team collaboration

**Add image gallery in about section:**
```html
<div class="chef-gallery">
  <img src="images/chef-vidit-cooking-action.jpg" alt="Chef Vidit Aren Cooking">
  <img src="images/chef-vidit-restaurant-ambiance.jpg" alt="Chef Vidit in Restaurant">
  <img src="images/chef-vidit-team-collaboration.jpg" alt="Chef Vidit Team Work">
</div>
```

## 5. BACKGROUND IMAGES (Optional Enhancement)
**Location:** Can be added to section backgrounds
**Images for:**
- Hero section background: `kitchen-background-blur.jpg`
- Services section: `culinary-tools-background.jpg`
- Projects section: `restaurant-ambiance-background.jpg`

## IMPLEMENTATION INSTRUCTIONS:

### Step 1: Create Images Folder
Create folder structure: `images/`

### Step 2: Image Specifications
- **Portrait:** 400x400px, square ratio
- **Service Icons:** 80x80px, square, transparent background preferred
- **Project Images:** 600x400px, 3:2 ratio
- **Background Images:** 1920x1080px minimum

### Step 3: Alt Text Guidelines
All images must have descriptive alt text for SEO and accessibility:
- Chef portraits: "Chef Vidit Aren [context]"
- Service icons: "[Service Name] Icon"
- Projects: "[Project Name] by Chef Vidit Aren"

### Step 4: Image Optimization
- Compress all images to under 500KB each
- Use WebP format for better performance
- Provide fallback JPG versions

### Step 5: Lazy Loading (Add to all images)
```html
<img src="images/example.jpg" alt="Description" loading="lazy">
```

## PRIORITY ORDER:
1. **Chef Portrait** (Hero section) - HIGHEST PRIORITY
2. **Project Images** (11 images) - HIGH PRIORITY  
3. **Service Icons** (12 images) - MEDIUM PRIORITY
4. **Additional Chef Photos** - LOW PRIORITY
5. **Background Images** - OPTIONAL