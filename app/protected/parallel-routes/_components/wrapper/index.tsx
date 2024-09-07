import { DirectoryCodeBlock } from './directory-code-block';

export function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DirectoryCodeBlock />
      {children}
    </div>
  );
}
