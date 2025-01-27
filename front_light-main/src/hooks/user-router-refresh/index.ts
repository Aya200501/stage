import { useSearchParams } from "react-router-dom";

export function useRouterRefresh() {
  const [, setSearchParams] = useSearchParams({
    page: "1",
    perPage: "10",
    search: "",
  });

  const routerRefresh = () => {
    setSearchParams({ search: "", page: "1", perPage: "10" });
  };

  return routerRefresh;
}
