import React from 'react';
import { Wrapper } from './_components/wrapper';

export default function Layout({
  children,
  parallel1,
  parallel2,
}: {
  children: React.ReactNode;
  parallel1: React.ReactNode;
  parallel2: React.ReactNode;
}) {
  return (
    <Wrapper>
      {parallel1}
      {children}
      {parallel2}
    </Wrapper>
  );
}
