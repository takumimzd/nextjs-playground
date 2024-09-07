'use client';
import React, { useState } from 'react';
import markdownToTree, { TreeNode } from './utils/markdownToTree';
import MindMap from './components/MindMap';

const IndexPage = () => {
  const [markdown, setMarkdown] = useState<string>('');
  const [tree, setTree] = useState<TreeNode[] | null>(null);

  const handleConvert = () => {
    const treeData = markdownToTree(markdown);
    setTree(treeData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Markdown to Mind Map</h1>
      <textarea
        rows={10}
        cols={50}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder='Enter your markdown here...'
      />
      <br />
      <button onClick={handleConvert}>Convert to Mind Map</button>
      {tree && <MindMap data={tree} />}
    </div>
  );
};

export default IndexPage;
