import { visit } from 'unist-util-visit';

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;
      if (index === undefined || !parent) return;

      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

      const encoded = encodeURIComponent(node.value);

      parent.children[index] = {
        type: 'html',
        value: `<div class="mermaid-container"><pre class="mermaid" data-mermaid-src="${encoded}">${escaped}</pre></div>`,
      };
    });

    // Note: Mermaid CDN script is loaded via Starlight head config in astro.config.mjs.
    // Script injection via remark HTML nodes is stripped by MDX/Astro for security.
  };
}
