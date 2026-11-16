// Content links are written once using the English routes. Finnish Markdown
// gets the matching locale prefix at render time, including newly added links.
export default function localizeMarkdownLinks() {
  return (tree, file) => {
    if (!file.path.replaceAll("\\", "/").includes("/content/fi/")) return;
    function visit(node) {
      if (
        node.type === "link" &&
        /^\/(?!\/)/.test(node.url) &&
        !node.url.match(/^\/fi(?:\/|$)/)
      ) {
        const pathname = node.url.split(/[?#]/)[0];
        if (!pathname.split("/").pop().includes("."))
          node.url = `/fi${node.url}`;
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
