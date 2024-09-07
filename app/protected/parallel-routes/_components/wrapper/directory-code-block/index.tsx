'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import SyntaxHighlighter from 'react-syntax-highlighter';

export function DirectoryCodeBlock() {
  const activeParalell1Segment = useSelectedLayoutSegment('parallel1');
  const activeParalell2Segment = useSelectedLayoutSegment('parallel2');

  console.log({ activeParalell1Segment, activeParalell2Segment });

  const directory = `
  parallel-routes

  ├── @parallel1
  │  ├── page.tsx ${activeParalell1Segment === null ? '<= 表示中' : ''}
  │  └── paralell3
  │      └── page.tsx ${activeParalell1Segment === 'paralell3' ? '<= 表示中' : ''}
  ├── @parallel2
  │  ├── page.tsx ${activeParalell2Segment === null ? '<= 表示中' : ''}
  │  └── paralell3
  │      └── page.tsx ${activeParalell2Segment === 'paralell3' ? '<= 表示中' : ''}
  ├── default.tsx
  ├── layout.tsx <= 表示中
  └── page.tsx
`;

  return <SyntaxHighlighter>{directory}</SyntaxHighlighter>;
}
