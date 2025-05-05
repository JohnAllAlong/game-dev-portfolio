# p5.js Static Portfolio

This is a simple, minimal setup for creating a static portfolio website showcasing p5.js sketches. It uses plain HTML and CSS (via Simple.css CDN).

## Project Structure

```
/
├── index.html              # Main portfolio landing page (grid of sketches)
├── template.html           # Template for creating new sketch pages
├── README.md               # This file
└── sketches/
    ├── <sketch-folder>/    # Directory for one sketch (e.g., 'die')
    │   ├── index.html      # The static page displaying the sketch, description, and code
    │   ├── sketch.html     # The actual p5.js sketch runner (adapted from p5 editor)
    │   ├── sketch.js       # The p5.js code for the sketch
    │   ├── thumb.webp      # Thumbnail image for the sketch card on the main page
    │   ├── [other.js]      # Optional: Any other JS files needed by sketch.js
    │   └── [assets...]     # Optional: Any assets (images, etc.) used by the sketch
    └── ...                 # More sketch directories...
```

## Adding a New Sketch

Follow these steps to add a new p5.js sketch to your portfolio:

1.  **Create Sketch Directory:**
    - Make a new folder inside the `/sketches/` directory (e.g., `/sketches/my-new-sketch/`). Use lowercase letters and hyphens.

2.  **Add Sketch Files:**
    - **`sketch.js`**: Copy your main sketch code into `sketch.js` inside your new directory.
    - **Other `.js` files (if any):** If your sketch uses multiple JavaScript files, copy those files into the same directory.
    - **Assets (if any):** Copy any images, data files, etc., used by your sketch into the directory.
    - **`sketch.html`** (The Sketch Runner):
        - Copy the `index.html` file from your p5.js editor project and save it as `sketch.html` in your new directory.
        - Make sure it includes the p5.js library (e.g., via CDN link):
          ```html
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
          ```
        - Clean up any HTML content you don't need inside the sketch itself. The `<body>` should usually be empty or contain only the canvas. Add basic styles to remove margins if needed: `<style> body { margin: 0; overflow: hidden; } </style>`.
        - Add `<script>` tags for **all** JavaScript files required by your sketch. Include any custom library/class files _before_ your main `sketch.js`.
          ```html
          <!-- Example with an extra file -->
          <script src="particle.js"></script>
          <script src="sketch.js"></script>
          ```
    - **`thumb.webp`**: Create a thumbnail image for your sketch (ideally animated WebP or GIF, but static images work too) and save it as `thumb.webp` in the sketch directory. Recommended aspect ratio: ~4:3.

3.  **Create Sketch Page (`index.html`):**
    - Copy the main `template.html` file into your new sketch directory and rename it to `index.html`.
    - **Edit the new `sketches/<sketch-folder>/index.html`:**
        - **Title:** Update the `<title>` and `<h1>` tags with your sketch's name.
        - **Home Link:** Verify the `../../index.html` link in the header navigation points correctly back to the main portfolio page.
        - **Iframe Source:** Ensure the `<iframe>` `src` attribute points to `sketch.html` (or the correct runner HTML file name).
        - **Caption:** Update or remove the `<figcaption>` below the iframe.
        - **Description:** Fill in the description paragraph in the "Description" section.
        - **Source Code:**
            - Paste the content of your `sketch.js` file into the `<pre><code class="language-js">...</code></pre>` block for `sketch.js`.
            - If you have other `.js` files, uncomment the extra source code section template, update the filename in the `<h2>`, and paste the code into the `<code>` block.
            - Repeat for any additional source files you want to display.
        - **Highlighting:** The `hljs.highlightAll()` script in the template should automatically apply syntax highlighting to the code blocks.

4.  **Link from Main Page:**
    - Open the main `index.html` file in the project root.
    - Inside the `<main><section class="grid">` element, add a new `<article>` for your sketch. Follow the existing structure:
      ```html
      <article>
        <a href="sketches/my-new-sketch/index.html" aria-label="My New Sketch">
          <figure>
            <img
              src="sketches/my-new-sketch/thumb.webp"
              alt="Description of the thumbnail image"
              loading="lazy"
            />
            <figcaption>My New Sketch</figcaption>
          </figure>
        </a>
      </article>
      ```
    - **Important:** Update the `href`, `aria-label`, `src`, `alt`, and `figcaption` text to match your new sketch.

## Customization

- **Styling:** The visual appearance is controlled by Simple.css, linked in the `<head>` of `index.html` and `template.html`. You can replace this with your own CSS or another framework. Custom styles can be added in `<style>` blocks (like the 2-column grid override in `index.html`).
- **Layout:** Modify `index.html` (for the main grid) and `template.html` (the template for individual sketch pages) to change the page structure.

## Hosting with GitHub Pages

You can easily host this static portfolio for free using GitHub Pages.

1.  **Create Repository:** Create a new repository on GitHub.
2.  **Push Files:** Add all your project files to the repository and push them.
    ```bash
    # Run from inside the folder containing index.html
    git init # If not already a git repo
    git remote add origin <your-repo-url> # If needed
    git add .
    git commit -m "Initial commit / Convert to static site"
    git push origin main # Or your default branch
    ```
3.  **Enable GitHub Pages:**
    - Go to your repository on GitHub -> Settings -> Pages.
    - Set the "Source" to "Deploy from a branch".
    - Choose the branch (e.g., `main`) and folder `/ (root)`.
    - Click "Save".
4.  **Wait & Visit:** GitHub Actions will deploy your site. It will be live at the URL shown on the Pages settings screen (usually `https://<your-username>.github.io/<repository-name>/`).
