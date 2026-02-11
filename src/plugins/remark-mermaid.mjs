import { visit } from 'unist-util-visit';

export default function remarkMermaid() {
  return (tree) => {
    let hasMermaid = false;

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;

      hasMermaid = true;
      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      parent.children[index] = {
        type: 'html',
        value: `<div class="mermaid-container"><pre class="mermaid">${escaped}</pre></div>`,
      };
    });

    if (hasMermaid) {
      tree.children.push({
        type: 'html',
        value: `<script type="module">
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
</script>`,
      });
    }
  };
}
