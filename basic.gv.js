// Encapsulate the HTML Content inside a module to avoid polluting the global namespace
const HTMLContent = (() => {
  // Store reusable HTML snippets as properties of the object
  const head = `
    <meta charset="UTF-8">
    <title>ChitterSync</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="ChittersStyling.css">
    <link rel="apple-touch-icon" sizes="180x180" href="ChitterSync.png">
    <link rel="icon" type="image/png" sizes="32x32" href="ChitterSync.png">
    <link rel="icon" type="image/png" sizes="16x16" href="ChitterSync.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
  `;

  const navbar = `
    <nav>
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox"/>
        <div id="nav-header">
          <a id="nav-title" href="r7105prod.pages.dev" target="_blank">ChitterSync</a>
          <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
          <hr/>
        </div>
        <div id="nav-content">
          <div class="nav-button"><i class="fas fa-palette"></i><span>Your Work</span></div>
          <div class="nav-button"><i class="fas fa-icons"></i><span>Browse Projects</span></div>
          <div class="nav-button"><i class="fas fa-thumbtack"></i><span>Pinned Items</span></div>
          <hr/>
          <div class="nav-button"><i class="fas fa-heart"></i><span>Following</span></div>
          <div class="nav-button"><i class="fas fa-chart-line"></i><span>Trending</span></div>
          <div class="nav-button"><i class="fas fa-fire"></i><span>Challenges</span></div>
          <div class="nav-button"><i class="fas fa-magic"></i><span>Jobs</span></div>
          <hr/>
          <div class="nav-button"><i class="fas fa-gem"></i><span>ChitterSync Premium</span></div>
          <div class="nav-button"><i class="fa-solid fa-shop"></i><span>ChitterSync Shop</span></div>
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox"/>
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar"><img src=""/></div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="yourprofile.html" target="_blank">You</a>
              <span id="nav-footer-subtitle"></span>
            </div>
            <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
          </div>
          <div id="nav-footer-content">
            r7105 Productions ARR 2021-2025
          </div>
        </div>
      </div>
    </nav>
  `;

  return { head, navbar };
})();

// Function to inject HTML content
function injectHTMLContent(element, content) {
  if (!element) {
    console.error("Invalid element provided for HTML injection.");
    return;
  }

  element.innerHTML = content;
}

// Example usage:
const pageContainer = document.getElementById('page-container');
if (pageContainer) {
  injectHTMLContent(pageContainer, HTMLContent.navbar);
}