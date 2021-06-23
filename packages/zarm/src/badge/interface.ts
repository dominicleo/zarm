import React from 'react';

export interface BaseBadgeProps {
  theme?: 'primary' | 'success' | 'warning' | 'danger';
  shape?: 'dot' | 'radius' | 'round' | 'rect' | 'circle' | 'leaf';
  text?: React.ReactNode;
  style?: React.CSSProperties;
}
