/**
 * Standalone web component bundle
 * This file creates a self-contained web component that can be used
 * by simply including the script in any HTML page.
 * 
 * Usage:
 * <script src="./sk8-pipelines.js"></script>
 * <sk8-pipelines mode="embedded" theme="blue" tenant-id="xxx-ten-1"></sk8-pipelines>
 */

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

// Auto-register if in browser environment
if (typeof window !== 'undefined') {
  if (!customElements.get('sk8-pipelines')) {
    customElements.define('sk8-pipelines', PipelinesWebComponent);
  }
}

// Export for module systems (if needed)
export default PipelinesWebComponent;
