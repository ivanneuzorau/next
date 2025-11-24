'use client';

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import reactToWebComponent from 'react-to-webcomponent';
import { Pipelines } from '../ui/pipelines';

// Wrapper component that handles attribute parsing
function PipelinesWrapper(props: {
  mode?: string;
  theme?: string;
  tenantId?: string;
  apiBaseUrl?: string;
}) {
  // Parse props from attributes (all come as strings)
  const mode = (props.mode || 'embedded') as 'admin' | 'embedded';
  const theme = (props.theme || 'blue') as 'green' | 'blue';
  const tenantId = props.tenantId || undefined;
  const apiBaseUrl = props.apiBaseUrl || undefined;

  return (
    <Pipelines
      mode={mode}
      theme={theme}
      tenantId={tenantId}
      apiBaseUrl={apiBaseUrl}
    />
  );
}

// Create web component
// react-to-webcomponent supports React 18+ with createRoot API
const PipelinesWebComponent = reactToWebComponent(
  PipelinesWrapper,
  React,
  ReactDOMClient as any,
  {
    props: {
      mode: 'string',
      theme: 'string',
      tenantId: 'string',
      apiBaseUrl: 'string',
    },
  }
);

// Register custom element
if (typeof window !== 'undefined' && !customElements.get('sk8-pipelines')) {
  customElements.define('sk8-pipelines', PipelinesWebComponent);
}

export default PipelinesWebComponent;

