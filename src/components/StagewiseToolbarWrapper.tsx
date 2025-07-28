'use client';

import { useEffect, useState } from 'react';
import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";

// Set this to false to disable StagewiseToolbar
const ENABLE_STAGEWISE_TOOLBAR = true;

export default function StagewiseToolbarWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Early return if toolbar is disabled or not mounted
  if (!ENABLE_STAGEWISE_TOOLBAR || !isMounted) {
    return null;
  }

  return (
    <StagewiseToolbar
      config={{
        plugins: [ReactPlugin],
      }}
    />
  );
} 