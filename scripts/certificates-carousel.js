/* ============================================================
   Carrossel de Certificações
   ------------------------------------------------------------
   Monta os cards a partir de CERTIFICATES_DATA
   (scripts/certificates-data.js) e controla a navegação:
   botões anterior/próximo, indicadores, teclado e swipe.
   ============================================================ */

(() => {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const data =
    typeof CERTIFICATES_DATA !== "undefined" && Array.isArray(CERTIFICATES_DATA)
      ? CERTIFICATES_DATA
      : [];

  const track = root.querySelector("[data-carousel-track]");
  const viewport = root.querySelector("[data-carousel-viewport]");
  const dotsWrapper = root.querySelector("[data-carousel-dots]");
  const prevButton = root.querySelector("[data-carousel-prev]");
  const nextButton = root.querySelector("[data-carousel-next]");
  const status = root.querySelector("[data-carousel-status]");

  if (!track || !viewport || !dotsWrapper || !prevButton || !nextButton) return;
  if (!data.length) return;

  /* Markup de ícones estático (não recebe dados externos) */
  const ICON_ARROW =
    '<svg class="icon-external" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10" /></svg>';
  const ICON_FILE =
    '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>';

  const SWIPE_THRESHOLD = 40;
  const CLICK_BLOCK_WINDOW = 400;

  const slides = [];
  const dots = [];
  let activeIndex = 0;
  let lastDragEnd = 0;

  const create = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const slideWidth = () =>
    slides.length ? slides[0].getBoundingClientRect().width : 0;

  const update = (announce) => {
    track.style.transform = `translateX(${-activeIndex * slideWidth()}px)`;
    viewport.scrollLeft = 0;

    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      if (isActive) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");

      /* Cards fora da tela não recebem foco pelo teclado */
      const link = slide.querySelector(".btn-certificate");
      if (link) link.tabIndex = isActive ? 0 : -1;
    });

    dots.forEach((dot, index) => {
      if (index === activeIndex) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === slides.length - 1;

    if (announce && status) {
      status.textContent = `Certificado ${activeIndex + 1} de ${slides.length}: ${data[activeIndex].name}`;
    }
  };

  const goTo = (index) => {
    const target = Math.min(Math.max(index, 0), slides.length - 1);
    const changed = target !== activeIndex;
    const focusedLink = slides[activeIndex].contains(document.activeElement);
    activeIndex = target;
    if (changed && focusedLink) {
      slides[activeIndex].querySelector(".btn-certificate")?.focus({ preventScroll: true });
    }
    update(changed);
  };

  /* ---------- Montagem dos cards ---------- */

  const createPreview = (certificate) => {
    const preview = create("div", "certificate-preview");

    const image = document.createElement("img");
    image.className = "certificate-preview-image";
    image.width = 1200;
    image.height = 900;
    image.loading = "lazy";
    image.decoding = "async";
    image.alt = certificate.alt || `Prévia do certificado ${certificate.name}`;

    if (certificate.preview) {
      image.src = certificate.preview;
      image.addEventListener("error", () =>
        preview.classList.add("is-missing"),
      );
    } else {
      preview.classList.add("is-missing");
    }

    const fallback = create("span", "certificate-fallback");
    fallback.setAttribute("aria-hidden", "true");
    fallback.insertAdjacentHTML("afterbegin", ICON_FILE);
    fallback.appendChild(create("span", "", "Prévia indisponível"));

    preview.appendChild(image);
    preview.appendChild(fallback);
    preview.appendChild(create("span", "certificate-format", "PDF"));
    return preview;
  };

  const createContent = (certificate) => {
    const content = create("div", "certificate-content");

    if (certificate.category) {
      content.appendChild(
        create("span", "certificate-category", certificate.category),
      );
    }

    content.appendChild(create("h3", "certificate-name", certificate.name));

    if (certificate.institution) {
      content.appendChild(
        create("p", "certificate-institution", certificate.institution),
      );
    }

    if (certificate.description) {
      content.appendChild(
        create("p", "certificate-description", certificate.description),
      );
    }

    if (certificate.year) {
      const meta = create("div", "certificate-meta");
      meta.appendChild(create("span", "certificate-year", certificate.year));
      content.appendChild(meta);
    }

    if (certificate.pdf) {
      const link = create("a", "btn btn-certificate");
      link.href = certificate.pdf;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute(
        "aria-label",
        `Ver certificado ${certificate.name} (arquivo PDF, abre em nova aba)`,
      );
      link.appendChild(create("span", "", "Ver certificado"));
      link.insertAdjacentHTML("beforeend", ICON_ARROW);
      content.appendChild(link);
    }

    return content;
  };

  const createSlide = (certificate, position, total) => {
    const slide = create("li", "carousel-slide");
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `Certificado ${position} de ${total}`);

    const card = create("article", "certificate-card");
    card.appendChild(createPreview(certificate));
    card.appendChild(createContent(certificate));

    slide.appendChild(card);
    return slide;
  };

  const buildDots = () => {
    data.forEach((certificate, index) => {
      const dot = create("button", "carousel-dot");
      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        `Ir para o certificado ${index + 1}: ${certificate.name}`,
      );
      dot.addEventListener("click", () => goTo(index));
      dotsWrapper.appendChild(dot);
      dots.push(dot);
    });
  };

  /* ---------- Controles ---------- */

  prevButton.addEventListener("click", () => goTo(activeIndex - 1));
  nextButton.addEventListener("click", () => goTo(activeIndex + 1));

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && activeIndex > 0) {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight" && activeIndex < slides.length - 1) {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  });

  /* ---------- Swipe / arraste ---------- */

  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let pointerId = null;
  let dragging = false;

  const endDrag = () => {
    dragging = false;
    pointerId = null;
    viewport.classList.remove("is-dragging");
    track.style.transition = "";
    void track.offsetWidth; /* aplica o estilo antes de reposicionar */
  };

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    deltaX = 0;
  });

  window.addEventListener("pointermove", (event) => {
    if (!dragging || event.pointerId !== pointerId) return;

    const moveX = event.clientX - startX;
    const moveY = event.clientY - startY;

    /* Gesto vertical: cancela o arraste e libera a rolagem da página */
    if (Math.abs(moveY) > 12 && Math.abs(moveY) > Math.abs(moveX)) {
      endDrag();
      update(false);
      return;
    }

    deltaX = moveX;
    if (Math.abs(moveX) > 6) {
      viewport.classList.add("is-dragging");
      track.style.transition = "none";
      track.style.transform = `translateX(${-activeIndex * slideWidth() + moveX}px)`;
    }
  });

  window.addEventListener("pointerup", (event) => {
    if (!dragging || event.pointerId !== pointerId) return;
    const moved = deltaX;
    endDrag();

    if (Math.abs(moved) >= SWIPE_THRESHOLD) {
      lastDragEnd = Date.now();
      goTo(moved < 0 ? activeIndex + 1 : activeIndex - 1);
    } else {
      update(false);
    }
  });

  window.addEventListener("pointercancel", () => {
    if (!dragging) return;
    endDrag();
    update(false);
  });

  /* Evita abrir o PDF sem querer ao final de um swipe */
  viewport.addEventListener(
    "click",
    (event) => {
      if (Date.now() - lastDragEnd < CLICK_BLOCK_WINDOW) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
    true,
  );

  viewport.addEventListener("dragstart", (event) => event.preventDefault());

  /* ---------- Responsividade ---------- */

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => update(false), 120);
  });

  /* ---------- Inicialização ---------- */

  data.forEach((certificate, index) => {
    const slide = createSlide(certificate, index + 1, data.length);
    track.appendChild(slide);
    slides.push(slide);
  });

  buildDots();
  update(false);
})();
