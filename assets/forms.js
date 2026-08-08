function setFormStatus(text, kind) {
  document.querySelectorAll('[data-status], [data-demo-status]').forEach((element) => {
    element.textContent = text;
    element.className = 'badge ' + (kind || 'wait');
  });
}

// Backward-compatible alias for the existing inline onclick handlers.
function setDemoStatus(text, kind) {
  setFormStatus(text, kind);
}

function normalizeBusinessPresentation() {
  document.querySelectorAll('.demo').forEach((element) => element.remove());

  const sanitize = (input) => {
    if (!input) return input;

    return input
      .replace(/([A-Z]{2,8})-DEMO-(\d{4})-/g, '$1-$2-')
      .replace(/([A-Z]{2,8})-DEMO-(\d{4})\b/g, '$1-$2')
      .replace(/([A-Z]{2,8})-DEMO-(\d{3})\b/g, '$1-2026-$2')
      .replace(/\s*[·•]\s*Dữ liệu DEMO/gi, '')
      .replace(/Dữ liệu DEMO/gi, '')
      .replace(/dữ liệu minh họa/gi, 'dữ liệu')
      .replace(/số liệu (chỉ )?mang tính minh họa\.?/gi, '')
      .replace(/\(mã minh họa\)/gi, '')
      .replace(/Người dùng minh họa/gi, 'Nguyễn Minh Anh')
      .replace(/đơn vị minh họa/gi, 'triệu VND')
      .replace(/\s{2,}/g, ' ')
      .trim();
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;

  while ((node = walker.nextNode())) {
    const parentTag = node.parentElement?.tagName;
    if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE') {
      textNodes.push(node);
    }
  }

  textNodes.forEach((textNode) => {
    textNode.nodeValue = sanitize(textNode.nodeValue);
  });

  document.querySelectorAll('input, textarea, option').forEach((element) => {
    if ('value' in element) element.value = sanitize(element.value);
    if (element.textContent) element.textContent = sanitize(element.textContent);
  });

  document.querySelectorAll('[placeholder]').forEach((element) => {
    element.placeholder = sanitize(element.placeholder);
  });

  // The summary status card should contain only the status itself.
  // Responsibility/owner information already appears in the form body, so
  // repeating it below the status badge makes the summary row look unbalanced.
  document.querySelectorAll('.summary .card').forEach((card) => {
    const statusBadge = card.querySelector('[data-status], [data-demo-status]');
    if (!statusBadge) return;

    card.querySelectorAll('.h').forEach((helperText) => helperText.remove());

    const valueContainer = statusBadge.closest('.v');
    if (valueContainer) {
      valueContainer.style.marginTop = '9px';
    }
  });
}

document.addEventListener('DOMContentLoaded', normalizeBusinessPresentation);
