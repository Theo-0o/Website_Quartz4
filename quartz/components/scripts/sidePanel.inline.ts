function setupSidePanel() {
  const sidebar = document.querySelector(".sidebar.right") as HTMLElement
  const quartzBody = document.getElementById("quartz-body")
  if (!sidebar || !quartzBody) return

  const existing = document.getElementById("panel-content")
  if (existing) existing.remove()

  const contentDiv = document.createElement("div")
  contentDiv.id = "panel-content"
  sidebar.appendChild(contentDiv)
}

function setupMobileControls() {
  if (document.getElementById("burger-menu")) return

  const burger = document.createElement("button")
  burger.id = "burger-menu"
  burger.textContent = "☰"
  document.body.appendChild(burger)

  burger.addEventListener("click", function (e) {
    e.stopPropagation()
    document.body.classList.toggle("menu-open")
  })

  document.addEventListener("click", function (e) {
    const sidebar = document.querySelector(".sidebar.left")
    if (!sidebar) return
    if (
      document.body.classList.contains("menu-open") &&
      !sidebar.contains(e.target as Node) &&
      (e.target as Element).id !== "burger-menu"
    ) {
      document.body.classList.remove("menu-open")
    }
  })

  document.addEventListener("click", function (e) {
    const target = (e.target as Element).closest(".sidebar.left a")
    if (target) document.body.classList.remove("menu-open")
  })

  const closeBtn = document.createElement("button")
  closeBtn.id = "close-panel-mobile"
  closeBtn.textContent = "×"
  document.body.appendChild(closeBtn)

  closeBtn.addEventListener("click", function () {
    const quartzBody = document.getElementById("quartz-body")
    if (quartzBody) quartzBody.classList.remove("panel-open")
    const contentEl = document.getElementById("panel-content")
    if (contentEl) contentEl.innerHTML = ""
    document.body.classList.remove("panel-active")
  })
}

function handlePanelClick(e: MouseEvent) {
  const target = (e.target as Element).closest("a")
  if (!target) return
  const href = (target as HTMLAnchorElement).href
  if (!href.includes("panel:")) return
  e.preventDefault()
  const actualHref = href.replace(/.*panel:/, "/")
  const quartzBody = document.getElementById("quartz-body")
  if (!quartzBody) return
  fetch(actualHref)
    .then(function (res) { return res.text() })
    .then(function (html) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")
      const article = doc.querySelector("article")
      if (article) {
        article.querySelectorAll("img").forEach(function (img) {
          const src = img.getAttribute("src")
          if (src && !src.startsWith("http")) {
            img.src = window.location.origin + "/" + src.replace(/^\//, "")
          }
        })
        const contentEl = document.getElementById("panel-content")
        if (contentEl) {
          contentEl.innerHTML = article.innerHTML
          quartzBody.classList.add("panel-open")
          document.body.classList.add("panel-active")
        }
      }
    })
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key !== "Escape") return
  const quartzBody = document.getElementById("quartz-body")
  const contentEl = document.getElementById("panel-content")
  if (quartzBody) quartzBody.classList.remove("panel-open")
  if (contentEl) contentEl.innerHTML = ""
  document.body.classList.remove("menu-open")
  document.body.classList.remove("panel-active")
}

// Run immediately — no delay needed for UI controls
setupMobileControls()

// Delay only what needs Quartz's DOM to be ready
setTimeout(setupSidePanel, 500)

document.addEventListener("nav", function () {
  setTimeout(function () {
    setupSidePanel()
    if (!document.getElementById("burger-menu")) {
      setupMobileControls()
    }
  }, 500)
})

document.addEventListener("click", handlePanelClick)
document.addEventListener("keydown", handleKeydown)