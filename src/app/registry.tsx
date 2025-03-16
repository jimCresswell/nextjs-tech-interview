'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // This is important to prevent memory leaks
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // If we're on the client, just render children
  if (typeof window !== 'undefined') return <>{children}</>;

  // If we're on the server, wrap with StyleSheetManager
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
} 