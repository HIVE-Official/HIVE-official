declare module "@hive/ui/src/components/app-sidebar-hive" {
  export const AppSidebarHive: any;
}

declare module "@hive/ui/src/components/ui/sidebar" {
  export const SidebarProvider: any;
  export const SidebarContent: any;
  export const SidebarFooter: any;
  export const SidebarHeader: any;
  export const SidebarInset: any;
  export const SidebarMenu: any;
  export const SidebarMenuButton: any;
  export const SidebarMenuItem: any;
  export const SidebarGroup: any;
  export const SidebarGroupLabel: any;
  export const SidebarRail: any;
  export const SidebarSeparator: any;
  export const SidebarTrigger: any;
  export const Sidebar: any;
  export const SidebarProviderProps: any;
  export const SidebarMenuSub: any;
  export const SidebarMenuSubButton: any;
  export const SidebarMenuSubItem: any;
}

declare module "@hive/ui/src/organisms/nav-config" {
  export type HiveNavId = "feed" | "spaces" | "profile" | "hivelab" | "settings";
  export const getHiveNav: (isLeader: boolean) => Array<{ id: HiveNavId; label: string; href: string }>;
}

