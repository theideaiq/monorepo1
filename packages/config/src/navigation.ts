/**
 * Navigation items for the Web application (apps/web).
 * Defines labels (localization keys) and paths.
 */
export interface WebNavItem {
  labelKey: string;
  href: string;
}

/**
 * Main navigation configuration for the public-facing website.
 */
export const webNavigation: WebNavItem[] = [
  { labelKey: 'Nav.store', href: '/megastore' },
  { labelKey: 'Nav.plus', href: '/plus' },
  { labelKey: 'Nav.academy', href: '/academy' },
  { labelKey: 'Nav.business', href: '/suite' },
];

/**
 * Navigation items for the Admin Dashboard (apps/admin).
 */
export interface AdminNavItem {
  title: string;
  href: string;
  /** Lucide icon name */
  icon: string;
}

/**
 * Sidebar navigation configuration for the Admin Dashboard.
 */
export const adminNavigation: AdminNavItem[] = [
  {
    title: 'Overview',
    href: '/',
    icon: 'LayoutDashboard',
  },
  {
    title: 'CRM',
    href: '/crm',
    icon: 'Users',
  },
  {
    title: 'Finance',
    href: '/finance',
    icon: 'BadgeDollarSign',
  },
  {
    title: 'Marketing',
    href: '/marketing',
    icon: 'Megaphone',
  },
  {
    title: 'Products',
    href: '/products',
    icon: 'Package',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
];
