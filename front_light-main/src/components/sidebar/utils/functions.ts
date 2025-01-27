import { User } from "@/utils";
import { Route } from "./routes";
import { GroupNodeTree } from "@/utils/group-node-tree";

export const filterRoutes = (
  routes: Route[],
  user: User | null | undefined,
  currentGroup: GroupNodeTree | null | undefined
) => {
  return routes.filter((route: Route) => {
    if (user?.isSuperAdmin) return true;
    if (!currentGroup) return false;
    if (route.to === "/map" && currentGroup?.getAbilityWithModel("GROUP") === 0)
      return false;
    if (
      route.to === "/cameras" &&
      currentGroup?.getAbilityWithModel("CAMERA") === 0
    )
      return false;
    if (
      route.to === "/analyze" &&
      currentGroup?.getAbilityWithModel("ANALYSE") === 0
    )
      return false;
    if (route.to === "/roles") return false;
    if (
      route.to === "/users" &&
      currentGroup?.getAbilityWithModel("USER") === 0
    )
      return false;
    if (
      route.to === "/alerts" &&
      currentGroup?.getAbilityWithModel("ALERT") === 0
    )
      return false;
    if (route.to === "/log" && currentGroup?.getAbilityWithModel("LOG") === 0)
      return false;
    // if (
    //   route.to === "/workflow" &&
    //   getHighestAbility(currentGroup, "WORKFLOW") === 0
    // )
    //   return false;
    return true;
  });
};
