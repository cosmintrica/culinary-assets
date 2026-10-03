/* global CulinaryCatalog */
(() => {
  const byId = id => document.getElementById(id);
  const grid = byId('grid');
  const dialog = byId('preview');
  const fold = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const render = () => {
    const query = fold(byId('search').value.trim());
    const category = byId('category').value;
    const matches = CulinaryCatalog.filter(asset => (!category || asset.category === category)
      && fold(`${asset.id.replaceAll('_', ' ')} ${asset.alt.en} ${asset.alt.ro}`).includes(query));
    grid.replaceChildren();
    for (const asset of matches) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'asset';
      button.setAttribute('aria-label', `Preview ${asset.alt.en}`);
      const art = document.createElement('span');
      art.className = 'art';
      const image = document.createElement('img');
      image.src = asset.webp;
      image.alt = '';
      image.width = image.height = 160;
      image.loading = 'lazy';
      art.append(image);
      const label = document.createElement('span');
      label.className = 'label';
      for (const [className, text] of [['name', asset.alt.en], ['id', asset.id]]) {
        const span = document.createElement('span');
        span.className = className;
        span.textContent = text;
        label.append(span);
      }
      button.append(art, label);
      button.addEventListener('click', () => open(asset));
      grid.append(button);
    }
    byId('count').textContent = `${matches.length} of ${CulinaryCatalog.length} assets`;
    byId('empty').hidden = matches.length !== 0;
  };
  const open = asset => {
    byId('preview-title').textContent = asset.alt.en;
    byId('preview-image').src = asset.png;
    byId('preview-image').alt = asset.alt.en;
    byId('preview-meta').textContent = `${asset.alt.ro} · 512 × 512 · Transparent · CC0 1.0`;
    byId('png').href = asset.png;
    byId('png').download = `${asset.id}.png`;
    byId('webp').href = asset.webp;
    byId('webp').download = `${asset.id}.webp`;
    byId('import').value = `import image from '@cosmintrica/culinary-assets/webp/${asset.id}.webp';`;
    byId('copy-status').textContent = '';
    byId('preview-art').dataset.background = byId('background').value;
    dialog.showModal();
  };
  byId('search').addEventListener('input', render);
  byId('category').addEventListener('change', render);
  byId('background').addEventListener('change', () => {
    grid.dataset.background = byId('background').value;
    byId('preview-art').dataset.background = byId('background').value;
  });
  byId('close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  byId('copy').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(byId('import').value);
      byId('copy-status').textContent = 'Import copied.';
    } catch {
      byId('import').focus();
      byId('import').select();
      byId('copy-status').textContent = 'Import selected. Use your browser copy command.';
    }
  });
  render();
})();
