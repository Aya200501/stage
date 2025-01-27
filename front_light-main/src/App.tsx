import useLocalStorage from "@/hooks/use-local-storage";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import BackendApi from "@/api/backend-api";
import { Group, GroupNode, ModelType, User } from "./utils";
import useSWR, { SWRConfig } from "swr";
import { Loader2 } from "lucide-react";
import { GlobalContext } from "./Context";
import LoginPage from "./pages/login";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { cn } from "./lib/utils";
import { ConfirmDialog } from "./components/confirm-dialog";
import BpIndicator from "./components/bp-indicator";
import i18n from "./utils/i18-next";
import { GroupNodeTree } from "./utils/group-node-tree";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [cameraName, setCameraName] = useState("");

  const [groupId, setGroupId] = useLocalStorage(
    "groupId",
    z.string().default("20867582-6adf-43ef-92bd-4ab0a57f36b6")
  );
  const [groups, setGroups] = useState<Group[] | undefined>(undefined);
  const [groupsTree, setGroupsTree] = useState<GroupNode | undefined>(
    undefined
  );

  const [groupIds, setGroupIds] = useState<
    {
      model: ModelType;
      ids: string[];
    }[]
  >([]);

  const [userGroupsTree, setUserGroupsTree] = useState<
    GroupNodeTree | undefined | null
  >(undefined);

  const [currentGroup, setCurrentGroup] = useState<
    GroupNodeTree | undefined | null
  >();

  const [accessToken, setAccessToken] = useLocalStorage(
    "accessToken",
    z.string().default("")
  );
  const [theme, setTheme] = useLocalStorage(
    "theme",
    z.enum(["light", "dark"]).default("dark")
  );
  const [refreshToken, setRefreshToken] = useLocalStorage(
    "refreshToken",
    z.string().default("")
  );

  useEffect(() => {
    // const res = await axios.get("https://api.ipify.org?format=json");
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("client-ip", data.ip);
      });
    const savedLanguage = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLanguage);
  }, []);

  const backendApi = useMemo(() => {
    return new BackendApi({
      accessToken,
      refreshToken,
      logoutCallback: () => {
        setUser(null);
        setAccessToken("");
        setRefreshToken("");
      },
    });
  }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

  const { isLoading } = useSWR(
    `currentUser}`,
    async () => {
      if (!backendApi.isReady()) return null;
      return await backendApi.getCurrentUser();
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => {
        setUser(null);
      },
      errorRetryCount: 0,
      revalidateOnFocus: false,
    }
  );

  if (pathname === "/") {
    navigate("/dashboards", { replace: true });
  }

  if (isLoading || user === undefined) {
    return (
      <main
        className={cn(
          theme,
          "bg-background text-foreground grid place-content-center"
        )}
      >
        <div className="animate-pulse">
          <Loader2 className="animate-spin" size={120} />
        </div>
      </main>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        groupId,
        setGroupId,
        groups,
        groupsTree,
        setGroupsTree,
        setGroups,
        groupIds,
        setGroupIds,
        theme,
        setTheme,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        user,
        setUser,
        cameraName,
        setCameraName,
        backendApi,
        userGroupsTree,
        setUserGroupsTree,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <SWRConfig
        value={{
          shouldRetryOnError: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        {user === null ? (
          <LoginPage />
        ) : (
          <Layout>
            <>
              <Outlet />
              <ConfirmDialog />
            </>
          </Layout>
        )}
      </SWRConfig>
      <BpIndicator className="fixed z-[9999] text-6xl bg-foreground text-background bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-12 rounded-3xl font-bold opacity-10" />
    </GlobalContext.Provider>
  );
}
