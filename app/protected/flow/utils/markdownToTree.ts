import MarkdownIt from 'markdown-it';

export type TreeNode = {
  name: string;
  children?: TreeNode[];
};

const markdownToTree = (markdown: string): TreeNode[] => {
  const md = new MarkdownIt();
  const tokens = md.parse(markdown, {});
  const root: TreeNode = { name: 'Root', children: [] };
  let currentParent = root;

  const stack: TreeNode[] = [root];
  tokens.forEach((token) => {
    if (token.type === 'bullet_list_open') {
      const newNode: TreeNode = { name: '', children: [] };
      currentParent.children?.push(newNode);
      stack.push(newNode);
      currentParent = newNode;
    } else if (token.type === 'list_item_open') {
      const newNode: TreeNode = { name: '', children: [] };
      currentParent.children?.push(newNode);
      stack.push(newNode);
      currentParent = newNode;
    } else if (token.type === 'inline' && token.content) {
      currentParent.name = token.content;
    } else if (token.type === 'list_item_close' || token.type === 'bullet_list_close') {
      stack.pop();
      currentParent = stack[stack.length - 1];
    }
  });

  // Rootの子供たちを返す
  return root.children || [];
};

export default markdownToTree;
