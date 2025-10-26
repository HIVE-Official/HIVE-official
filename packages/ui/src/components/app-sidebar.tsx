import * as React from "react"
import { Frame, PieChart } from "lucide-react"
import { toBlockNavMain } from "@/organisms/nav-config";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// Hive-flavored sample data.
const data = {
  user: {
    name: "Jacob Rhinehart",
    email: "jwrhineh@buffalo.edu",
    avatar: "/avatars/jacob-rhinehart.jpg",
  },
  teams: [
    { name: "University at Buffalo", logo: Frame, plan: "Community" },
    { name: "Design Guild", logo: Frame, plan: "Space" },
  ],
  projects: [
    { name: "Pinned: Design Club", url: "#", icon: Frame },
    { name: "Pinned: Product Team", url: "#", icon: PieChart },
  ],
}

export function AppSidebar({ activeId, isLeader = false, menuSize = "default", ...props }: React.ComponentProps<typeof Sidebar> & { activeId?: import("@/organisms/nav-config").HiveNavId; isLeader?: boolean, menuSize?: "default" | "lg" }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={toBlockNavMain(activeId, isLeader)} size={menuSize} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
