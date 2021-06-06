import React from 'react';

export interface IScreenAction {
  label: string;
  handler: (_: any) => any;
  disabled?: boolean;
}

export interface IRoute {
  name: string;
  href: string;
  component: React.FC<any> | React.ComponentType<any>;
  iconComponent?: React.FC<any>;
  disabled?: boolean; // is route shown in sidemenu
  description?: string; // is route shown in sidemenu
}
