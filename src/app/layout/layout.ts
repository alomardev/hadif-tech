export const MenuItemKeys = {
  grades: 'grades',
}

export interface MenuItem {
  key?: string;
  label: string;
  url?: string;
  menu?: MenuItem[];
  disabled?: boolean;
}
