/* Tiny helper library shared by all pages */

export function buildCard({ slug, title, thumb }) {
  const a = Object.assign(document.createElement("a"), {
    // Link to the viewer page with the slug as a URL parameter
    href: `/sketch-viewer.html?sketch=${slug}`,
  });

  a.innerHTML = `
    <article>
      <img src="${thumb}" alt="">
      <div>
        <h2>${title}</h2>
      </div>
    </article>`;
  return a;
}

export async function loadCode(path, element) {
  const text = await fetch(path).then((r) => r.text());
  element.textContent = text.trim();
  hljs.highlightElement(element); // highlight.js is already on the page
}

/* ---------- Navigation Menu ---------- */

export function buildNavMenu(projects, currentSlug = null) {
  const nav = document.createElement("nav");
  // Ensure home link points to root
  const homeLink = `<a href="/">Home</a>`;
  const sketchLinks = projects
    .map((p) => {
      // Add 'aria-current' if it's the current page
      const currentAttr = p.slug === currentSlug ? ' aria-current="page"' : "";
      // Link to the viewer page with the slug as a URL parameter
      return `<a href="/sketch-viewer.html?sketch=${p.slug}"${currentAttr}>${p.title}</a>`;
    })
    .join("\n");
  nav.innerHTML = `${homeLink}\n${sketchLinks}`;
  return nav;
}

/* ----------  sketch page bootstrap ---------- */

// Renamed function to get slug from URL parameter
function getSlugFromUrl() {
  const params = new URLSearchParams(location.search);
  return params.get("sketch"); // Get value of 'sketch' parameter
}

export async function initSketchPage() {
  const slug = getSlugFromUrl(); // Use the new function

  if (!slug) {
    console.error("Sketch slug not found in URL parameters.");
    document.getElementById("title").textContent = "Error";
    document.getElementById("desc").textContent =
      "Could not load sketch: Missing 'sketch' parameter in URL.";
    return;
  }

  try {
    // Fetch projects data - path from root is fine
    const projects = await fetch("/projects.json").then((r) => r.json());

    // Add navigation menu, passing current slug for highlighting
    const navMenu = buildNavMenu(projects, slug);
    const header = document.querySelector("header");
    if (header) {
      header.prepend(navMenu);
    } else {
      document.body.prepend(navMenu); // Fallback if no header
    }

    const meta = projects.find((p) => p.slug === slug);

    if (!meta) {
      throw new Error(`Sketch metadata not found for slug: ${slug}`);
    }

    // fill in title & description
    document.title = `${meta.title} — p5 Portfolio`;
    document.getElementById("title").textContent = meta.title;
    document.getElementById("desc").textContent = meta.desc;

    // Set iframe source dynamically
    const iframe = document.getElementById("sketch-frame");
    if (iframe) {
      iframe.src = `/sketches/${slug}/sketch.html`;
    } else {
      console.error("Iframe element 'sketch-frame' not found.");
    }

    // Set figcaption if present
    const figcaptionElement = document.getElementById("sketch-caption");
    if (figcaptionElement && meta.figcaption) {
      figcaptionElement.textContent = meta.figcaption;
    } else if (figcaptionElement) {
      figcaptionElement.style.display = "none"; // Hide if no caption
    }

    // Load main code dynamically
    const codeBlockElement = document.getElementById("codeblock");
    if (codeBlockElement) {
      const codePath = `/sketches/${slug}/sketch.js`;
      const codeFilenameElement = document.getElementById("code-filename");
      if (codeFilenameElement) {
        codeFilenameElement.textContent = "sketch.js";
      }
      await loadCode(codePath, codeBlockElement);
    } else {
      console.error("Code block element 'codeblock' not found.");
    }

    // Load extra code files if specified
    const extraCodeContainer = document.getElementById("extra-code-container");
    if (extraCodeContainer && meta.extraFiles && meta.extraFiles.length > 0) {
      for (const filename of meta.extraFiles) {
        if (!filename || typeof filename !== "string") continue; // Skip invalid entries

        // Create elements for the extra file's code block
        const heading = document.createElement("h2");
        heading.textContent = `Source (${filename})`;
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        // Basic language detection based on extension (can be improved)
        const lang = filename.split(".").pop() === "js" ? "language-js" : "";
        if (lang) code.className = lang;
        pre.appendChild(code);

        // Append elements to the container
        extraCodeContainer.appendChild(heading);
        extraCodeContainer.appendChild(pre);

        // Load and highlight the code
        const filePath = `/sketches/${slug}/${filename}`;
        try {
          await loadCode(filePath, code);
        } catch (fileError) {
          console.error(`Failed to load extra file ${filename}:`, fileError);
          code.textContent = `Error loading ${filename}.`;
        }
      }
    }
  } catch (error) {
    console.error("Failed to initialize sketch page:", error);
    document.getElementById("title").textContent = "Error Loading Sketch";
    document.getElementById(
      "desc"
    ).textContent = `Could not load sketch details: ${error.message}`;
    // Optionally hide or clear the iframe/codeblock on error
    const iframe = document.getElementById("sketch-frame");
    if (iframe) iframe.style.display = "none";
    const codeBlockElement = document.getElementById("codeblock");
    if (codeBlockElement) codeBlockElement.textContent = "Error loading code.";
  }
}

export async function initializePortfolio() {
  const header = document.querySelector("header");
  const grid = document.getElementById("grid");

  if (!header || !grid) {
    console.error("Required elements (header, grid) not found.");
    return;
  }

  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const list = await response.json();

    // Build and insert nav menu
    const navMenu = buildNavMenu(list); // Assuming buildNavMenu is defined in this file
    header.prepend(navMenu);

    // Build and insert project cards
    list.forEach((info) => grid.append(buildCard(info))); // Assuming buildCard is defined in this file
  } catch (error) {
    console.error("Failed to load projects:", error);
    grid.innerHTML = "<p>Error loading projects. Please try again later.</p>";
  }
}
