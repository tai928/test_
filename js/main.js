(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-nav');

  const closeMenu = (restoreFocus = false) => {
    if (!menuButton || !menu) return;
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    menuButton.querySelector('i').className = 'fa-solid fa-bars';
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const opening = menuButton.getAttribute('aria-expanded') !== 'true';
      if (opening) {
        menu.classList.add('open');
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'メニューを閉じる');
        menuButton.querySelector('i').className = 'fa-solid fa-xmark';
        document.body.classList.add('menu-open');
      } else {
        closeMenu();
      }
    });

    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const gallery = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  const shuffle = (items) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }
    return result;
  };

  const openLightbox = (source, description) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = source;
    lightboxImage.alt = description;
    lightboxCaption.textContent = description;
    lightbox.showModal();
  };

  if (gallery && Array.isArray(window.GALLERY_IMAGES)) {
    shuffle(window.GALLERY_IMAGES).forEach(({ file, alt }) => {
      const button = document.createElement('button');
      const image = document.createElement('img');
      const source = `images/gallery/${file}`;
      button.type = 'button';
      button.className = 'gallery-item';
      button.setAttribute('aria-label', `${alt}を拡大表示`);
      image.src = source;
      image.alt = alt;
      image.loading = 'lazy';
      image.addEventListener('error', () => button.remove());
      button.append(image);
      button.addEventListener('click', () => openLightbox(source, alt));
      gallery.append(button);
    });
  }

  lightboxClose?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
})();
