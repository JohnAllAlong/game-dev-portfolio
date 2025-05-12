# Simple Game Dev Portfolio Website

Easy-to-use template for a portfolio website to showcase your coding projects, interactives sketches, and games. No complex frameworks - just HTML and CSS. Your portfolio will be hosted for free using Github pages.

## Project Structure

```
/
├── index.html              # Main portfolio landing page (grid of projects)
├── p5-template.html        # Template for creating new p5.js sketch pages
├── template.html           # Template for creating non-p5.js project pages
├── README.md               # This file
└── projects/               # Directory containing all project folders
    ├── <project-folder>/   # Directory for one project (e.g., 'spring-demo', 'die', or 'blockhead')
    │   ├── index.html      # The static page displaying the project with description
    │   ├── sketch.html     # (p5 only) The actual p5.js sketch runner
    │   ├── sketch.js       # (p5 only) The p5.js code for the sketch
    │   ├── thumb.webp      # Thumbnail image for the project card on the main page
    ├── [other files]       # Optional: Any other files needed by the project
    │   └── [assets...]     # Optional: Any assets (images, etc.) used by the project
    └── ...                 # More project directories...
```

## Hosting with GitHub Pages

This portfolio is designed to be easily hosted with GitHub Pages:

1. **Fork or clone** this repository
2. **Add your projects** following the steps below
3. **Customize** the home page
4. **Commit and push changes to GitHub**
5. **Enable GitHub Pages** in your repository settings (Settings → Pages)
   - Source: Deploy from a branch
   - Branch: main (or your default branch)
   - Folder: / (root)

Your portfolio will be available at `https://<username>.github.io/<repository-name>/`

Go the extra mile: [Register and use a custom domain name](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## How to Add a New Project

### 1. Create a Project Folder

Make a new folder inside the `projects` directory. Use a short descriptive name with lowercase letters and hyphens (e.g., `blockhead` or `spring-demo`).

### 2. Choose and Copy a Template

- For **p5.js sketches**: Copy `p5-template.html` into your project folder and rename it to `index.html`
- For **other projects**: Copy `template.html` into your project folder and rename it to `index.html`

### 3. Add Your Files

- For **p5.js sketches**:

  - Add your p5.js code in a file called `sketch.js` along with any additional javascript sketch files.
  - Create a `sketch.html` file (Use a copy of the `projects/die/sketch.html` file)
  - If you require a newer version of p5.js from 1.9.1, update the CDN script tag your 'sketch.html'
  - Create a thumbnail image called `thumb.webp` or `thumb.gif` (400-500px wide works well)

- For **other projects**:
  - Add a thumbnail image called `thumb.webp` or `thumb.gif`
  - Add any screenshots or images you want to display

### 4. Edit Your Project Page

Open the `index.html` file in your project folder and:

1. Replace the page title (between `<title>` tags)
2. Replace the heading (between `<h1>` tags)
3. **For non-p5 projects**: Add your link or embed your content (uncomment and edit the appropriate lines)
4. Fill in the description, goals, and challenges sections with your project information
5. Use [HTML img tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img) to add screenshots or images throughout

### 5. Add to the Main Page

Open the main `index.html` file in the root folder and find the `<section class="grid">` element. Add a new project card by copying and pasting this code (replacing the placeholder text):

```html
<article>
  <a
    href="projects/your-project-folder/index.html"
    aria-label="Your Project Name"
  >
    <figure>
      <img
        src="projects/your-project-folder/thumb.webp"
        alt="Short description of the thumbnail"
        loading="lazy"
      />
      <figcaption>Your Project Name (Technology Used)</figcaption>
    </figure>
  </a>
</article>
```

## Customization

- **Styling:** The visual appearance is controlled by [Simple.css](https://simplecss.org/), linked in the `<head>` of `index.html` and `template.html`. You can replace this with your own CSS or <a href="https://github.com/kevquirk/simple.css/wiki/Getting-Started-With-Simple.css#customise-simplecss">customize the colours used by Simple.css</a>. Custom styles can be added in `<style>` blocks (like the 2-column grid override in root `index.html`).
- **Layout:** Modify `index.html` (for the main grid) and `template.html` and `p5-template.html` to change the page structure.
