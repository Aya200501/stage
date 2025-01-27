import { useGlobalContext } from "@/Context";
import ParamsSearch from "@/components/params-search";
import { Role, models } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import AddEditRoleDialog from "./add-edit-role-dialog";
import ShieldIcon from "@/assets/icons/shield.svg?react";
import { Unauthorized } from "@/components/403";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RolesTableHeader } from "./roles-table-header";
import { BallLoader } from "@/components/ball-loader";
import { useInView } from "react-intersection-observer";
import { RolesAction } from "./roles-action";
import { toast } from "sonner";
import { useRoles } from "./store";
import { cn } from "@/lib/utils";

const PER_PAGE = 40;

export default function RolesPage() {
  const { t } = useTranslation();

  const { backendApi, user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [searchParams] = useSearchParams({ search: "" });
  const [role, setRole] = useState<Role | "new" | null>(null);
  const { items, setItems } = useRoles();
  const page = useRef(1);

  const search = searchParams.get("search") ?? "";

  const fetcher = async () => {
    setIsLoading(true);
    const { results } = await backendApi.findMany<Role>("role", {
      pagination: {
        page: page.current,
        perPage: PER_PAGE,
      },
      where: { name: { contains: search, mode: "insensitive" } },
      select: {
        id: true,
        name: true,
        color: true,
        abilities: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (results.length < PER_PAGE) {
      setIsLastPage(true);
    }
    return results;
  };

  const deleteRole = useCallback(
    async (id: string) => {
      try {
        await backendApi.DeleteById("role", id);
        toast.success(`${t("The role has been deleted successfully")}`);
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        toast.error(`${t("An error occurred while deleting the role")}`);
      }
    },
    [items]
  );

  const handleSearch = async () => {
    page.current = 1;
    const results = await fetcher();
    setItems(results);
    setIsLoading(false);
    page.current++;
  };

  const loadMore = async () => {
    const results = await fetcher();
    const noDuplicates = results.filter(
      (role) => !items.find((item) => item.id === role.id)
    );
    setItems([...items, ...noDuplicates]);
    page.current++;
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLastPage || isLoading || !inView) return;
    loadMore();
  }, [inView, isLastPage, isLoading]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  if (!user?.isSuperAdmin) return <Unauthorized />;

  const onClose = () => {
    setRole(null);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4 w-full h-full text-sm max-lg:pr-4">
        <div className="flex items-center justify-between">
          <ParamsSearch />
          <Button className="gap-2 capitalize" onClick={() => setRole("new")}>
            <PlusIcon size={18} />
            <span>{t("add role")}</span>
          </Button>
        </div>

        <ScrollArea
          orientation="both"
          scrolAreaContentClassName="h-full flex-1 flex flex-col"
          className="h-full min-h-[30rem] rounded-lg bg-card p-3.5 pt-1.5 shadow flex flex-col gap-2 flex-1 items-center justify-center"
        >
          <Table
            className={cn(
              "w-full border-separate border-spacing-y-2 p-0",
              !isLoading && items.length === 0 && "h-full"
            )}
          >
            <RolesTableHeader />
            <TableBody>
              {items.map((role: Role) => (
                <TableRow
                  key={role.id}
                  className="mt-5 rounded-lg border-0 bg-muted px-3.5 text-muted-foreground hover:bg-muted hover:brightness-95 dark:brightness-90"
                >
                  <TableCell className="border-0 p-3.5 text-xs font-semibold text-muted-foreground 2xl:text-sm rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <ShieldIcon
                        className="size-6"
                        style={{
                          fill: role.color,
                        }}
                      />
                      <span className="whitespace-nowrap">{role.name}</span>
                    </div>
                  </TableCell>
                  {models
                    .filter((el) => el.name != "WORKFLOW")
                    .map((model) => {
                      const permission =
                        role.abilities.find((a) => a.model === model.name)
                          ?.permission ?? "NONE";

                      return (
                        <TableCell key={model.name}>{permission}</TableCell>
                      );
                    })}
                  <TableCell className="border-0 p-3.5 text-xs font-semibold text-muted-foreground 2xl:text-sm rounded-r-lg">
                    {role.name !== "ADMIN" && (
                      <RolesAction
                        role={role}
                        hanelEdit={setRole}
                        handleDelete={deleteRole}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && items.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={models.length + 1}
                    className="h-full flex-1 rounded-lg text-center text-2xl"
                  >
                    {t("No results were found")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!isLoading && items.length === 0 ? null : (
            <div ref={ref} className="w-full min-h-4 h-4 relative">
              {isLoading && items.length >= PER_PAGE && <BallLoader />}
            </div>
          )}
        </ScrollArea>
      </div>
      <AddEditRoleDialog role={role} onClose={onClose} />
    </>
  );
}
