# p5.js Portfolio Framework

This is a simple, minimal framework for creating a portfolio website showcasing p5.js sketches. It uses plain HTML, CSS (via Simple.css CDN), and vanilla JavaScript modules, fetching project data from a JSON file. It uses a single HTML template (`sketch-viewer.html`) and URL parameters (`?sketch=...`) to display individual sketches.

## Project Structure

```
/
├── index.html              # Main portfolio landing page (grid of sketches)
├── sketch-viewer.html      # Template page for viewing a single sketch
├── projects.json           # Data file listing all sketches
├── README.md               # This file
├── shared/
│   └── main.js             # Shared JavaScript functions (builds cards, nav, etc.)
└── sketches/
    ├── <sketch-slug>/      # Directory for one sketch (e.g., 'die')
    │   ├── sketch.html     # The actual p5.js sketch runner (adapted from p5 editor)
    │   ├── sketch.js       # The p5.js code for the sketch
    │   ├── [other.js]      # Optional: Any other JS files needed by sketch.js
    │   └── thumb.webp      # Thumbnail image for the sketch card
    └── ...                 # More sketch directories...
```

## Adding a New Sketch

Follow these steps to add a new p5.js sketch to your portfolio:

1.  **Create Sketch Directory:**

    - Make a new folder inside the `/sketches/` directory. The name of this folder will be the `slug` for your sketch (e.g., `/sketches/my-cool-sketch/`). Use lowercase letters and hyphens.

2.  **Add Sketch Files:**

    - **`sketch.js`**: Copy your main sketch code into `sketch.js` inside your new directory.
    - **Other `.js` files (if any):** If your sketch uses multiple JavaScript files (e.g., for classes like `Particle.js`), copy those files into the same directory.
    - **`sketch.html`** (The Sketch Runner):
      - Copy the `index.html` file from your p5.js editor project and save it as `sketch.html` in your new directory.
        \_ Make sure it includes the p5.js library. You might need to adjust the path if you store it locally, or use a CDN link. Example using a CDN:
        `htmlor contain only the canvas.
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
        `tch.html`:\*\*
        _ Add `<script>` tags for **all** JavaScript files required by your sketch. **Important:** Include any custom library/class files \_before_ your main `sketch.js`.a HTML content you don't need _inside_ the sketch itself. The `<body>` should usually be empty.
        ``htmllibrary. You might need to adjust the path if you store it locally, or use a CDN link. Example using a local copy (assuming`p5.min.js` is in the project root or a shared location):
        <!-- Example with an extra file -->ml
        <script src="particle.js"></script>
        <script src="sketch.js"></script>st path as needed -->
        ``

    * **`thumb.webp`**: Create a thumbnail image for your sketch and save it as `thumb.webp` (or `.jpg`/`.png`, just be consistent) in the sketch directory. Recommended size: ~400x300px.cript files required by your sketch. **Important:** Include any custom library/class files _before_ your main `sketch.js`.

3.  **Update `projects.json`:**
    - Open the main `projects.json` file in the project root.
    - Add a new JSON object to the array for your sketch. Follow the existing format:
      ```json
      {
        "slug": "my-cool-sketch", // REQUIRED: MUST match the directory name
        "title": "My Cool Sketch", // REQUIRED: Display title for the card and page
        "desc": "A brief description of what this sketch does.", // REQUIRED: Description shown on the sketch page
        "thumb": "sketches/my-cool-sketch/thumb.webp", // REQUIRED: Path to the thumbnail from the project root
        "figcaption": "Optional caption displayed below the sketch.", // OPTIONAL: Text caption for the sketch figure
        "extraFiles": ["particle.js", "utils.js"] // OPTIONAL: Array of additional JS filenames to display source code for
      }
      ```
    - Ensure `slug`, `title`, `desc`, and `thumb` are always present.
    - `figcaption` is an optional string.
    - `extraFiles` is an optional array of strings, listing other `.js` files in the sketch directory whose source code should also be displayed on the viewer page.
    - Make sure the JSON syntax remains valid (commas between objects, square brackets around the array).

## Customization

- **Styling:** The visual appearance is controlled by Simple.css, linked in the `<head>` of `index.html` and `sketch-viewer.html`. You can replace this with your own CSS or another framework.
- **Layout:** Modify `index.html` (for the main grid) and `sketch-viewer.html` (the template for individual sketch pages) to change the page structure.
- **Functionality:** Edit `/shared/main.js` to change how cards or navigation are built, or how sketch pages are initialized.

## Hosting with GitHub Pages

You can easily host this portfolio for free using GitHub Pages. Because the project uses relative paths for navigation and loading resources, it should work correctly even when deployed to a subdirectory (like `https://<username>.github.io/<repository-name>/`).

1.  **Create Repository:** Create a new repository on GitHub.
2.  **Push Files:** Add your project files (`index.html`, `sketch-viewer.html`, `projects.json`, `sketches/`, `shared/`, etc.) to the repository and push them. Ensure these files are at the root of the branch you are deploying from.
    ```bash
    # Run from inside the folder containing index.html
    git init # If not already a git repo
    git remote add origin <your-repo-url> # If needed
    git add .
    git commit -m "Initial commit"
    git push origin main # Or your default branch
    ```
3.  **Enable GitHub Pages:**
    - Go to your repository on GitHub.
    - Click the "Settings" tab.
    - In the left sidebar, click "Pages".
    - Under "Build and deployment":
      - Set the "Source" to "Deploy from a branch".
      - Choose the branch you pushed your code to (e.g., `main`).
      - Select the folder `/ (root)`.
      - Click "Save".
4.  **Wait & Visit:** GitHub Actions will deploy your site. This might take a minute or two. Once the checkmark appears, your site will be live at the URL shown on the Pages settings screen (usually `https://<your-username>.github.io/<repository-name>/`).

_Note: This setup serves static files directly. No Jekyll processing is used or needed._
