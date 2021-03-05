export interface MenuItem {
  label: string;
  url?: string;
  menu?: MenuItem[];
  active?: boolean;
}
