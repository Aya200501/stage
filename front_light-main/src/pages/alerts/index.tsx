import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useGlobalContext } from "@/Context";

import { Filter } from "./components/filter";
import { Unauthorized } from "@/components/403";
import { AlertTable } from "./components/alert-table";
import { useAlertManagement } from "./hooks/useAlertManagement";
import { AlertDetails } from "./components/alert-details";

const PER_PAGE = 10;

const AlertsPage = () => {
  const { currentGroup, user } = useGlobalContext();
  const { ref, inView } = useInView({ threshold: 0 });
  const { isLoading, isLastPage, items, handleSearch, loadMore } =
    useAlertManagement(PER_PAGE);

  const ability =
    currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;

  useEffect(() => {
    if (currentGroup) {
      handleSearch();
    }
  }, [currentGroup]);

  useEffect(() => {
    if (isLastPage || isLoading || !inView || !currentGroup) return;
    loadMore();
  }, [inView, isLastPage, isLoading, currentGroup]);

  if (ability === 0 && currentGroup) {
    return <Unauthorized />;
  }

  return (
    <main className="flex flex-1 w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <Filter />
      <AlertTable
        ref={ref}
        alerts={items}
        isLoading={isLoading}
        perPage={PER_PAGE}
      />
      <AlertDetails />
    </main>
  );
};

export default AlertsPage;
