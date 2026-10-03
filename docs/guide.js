(() => {
  const status = document.getElementById('guide-copy-status');
  let timer;
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const code = document.getElementById(button.dataset.copy);
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = `${button.textContent.replace(/^Copy /, '')} copied.`;
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Text selected. Use your browser copy command.';
      }
      clearTimeout(timer);
      timer = setTimeout(() => { status.textContent = ''; }, 3500);
    });
  }
})();
