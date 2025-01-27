/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGlobalContext } from "@/Context";
import ParamsSearch from "@/components/params-search";
import { UserType } from "@/utils";
import { useSearchParams } from "react-router-dom";
import { Unauthorized } from "@/components/403";
import Loader from "../dashboard/components/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddEditUserDialog } from "./add-edit-user";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUsers } from "./store";
import { BallLoader } from "@/components/ball-loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTableHeader } from "./users-table-header";
import { env } from "@/lib/env";
import { format, parseISO } from "date-fns";
import { UsersTableActions } from "./users-table/users-table-actions";

const tableColumns = [
  {
    Header: "Name",
    accessor: "fullName",
    size: 120,
  },
  {
    Header: "Email",
    accessor: "email",
    size: 160,
  },
  {
    Header: "Date creation",
    accessor: "createdAt",
    size: 80,
  },
  {
    Header: "Roles",
    accessor: "roles",
  },
  {
    Header: "",
    accessor: "more",
  },
];

const PER_PAGE = 9;

const rowFormatter = (key: string, user: UserType) => {
  if (key === "fullName") {
    return (
      <div className="flex items-center gap-2">
        <div className="size-10 relative rounded-full overflow-hidden">
          <img
            src={`${env.VITE_BACKEND_API}/uploads/${user.image}`}
            alt={user.fullName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
          />
        </div>
        <div className="text-sm font-medium xl:text-sm max-w-40 truncate capitalize">
          {user.fullName}
        </div>
      </div>
    );
  }
  if (key === "email") {
    return <div className="text-sm font-medium xl:text-sm">{user.email}</div>;
  }
  if (key === "createdAt") {
    const date = parseISO(user.createdAt.toString());
    return (
      <div className="text-sm font-medium xl:text-sm">
        {format(date, "dd/MM/yyyy HH:mm")}
      </div>
    );
  }
  if (key === "roles") {
    const isSuperAdmin = user.isSuperAdmin;

    if (isSuperAdmin) {
      return <div className="text-sm font-medium xl:text-sm">Super Admin</div>;
    }
    const roles = user.roles;
    return (
      <ScrollArea
        className="w-full h-[4.8rem] pr-2 min-w-[15rem] lg:min-w-[10rem]"
        scrollareathumbclassName="bg-white rounded-full"
        scrollbarclassName="bg-muted rounded-full w-[0.5rem]"
      >
        <div className="w-full grid grid-cols-2 gap-2 h-full ">
          {roles.map((role: any) => (
            <div key={role.id} className="w-full flex flex-col gap-1">
              <span className="text-sm font-medium xl:text-sm text-nowrap truncate capitalize">
                {role.group.name}
              </span>
              <div className="dark:bg-[#252525] bg-gray-200 rounded-md py-2 flex gap-2 items-center px-3">
                <span
                  className="size-2.5 rounded"
                  style={{
                    backgroundColor: role.role.color,
                    display: "inline-block",
                  }}
                />
                <span className="text-nowrap text-sm font-medium truncate flex-1">
                  {role.role.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }
  if (key === "more") {
    return <UsersTableActions user={user} />;
  }
  return null;
};

export default function UsersPage() {
  const { backendApi, currentGroup, user } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const page = useRef(1);
  const [searchParams] = useSearchParams({ search: "" });
  const { items, setItems } = useUsers();

  const ability =
    currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;
  const groupIds = currentGroup?.getAllGroupIds() ?? [];
  const search = searchParams.get("search") ?? "";

  const fetcher = async () => {
    setIsLoading(true);
    const { results } = await backendApi.findMany<UserType>("user", {
      pagination: {
        page: page.current,
        perPage: PER_PAGE,
      },
      where: {
        fullName: { contains: search, mode: "insensitive" },
        roles: {
          some: {
            group: { id: { in: groupIds } },
          },
        },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        image: true,
        isSuperAdmin: true,
        createdAt: true,
        attributes: true,
        roles: {
          select: {
            id: true,
            group: {
              select: {
                id: true,
                name: true,
              },
            },
            role: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
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
    // Reset page and items when group changes or search changes
    if (currentGroup !== undefined) {
      page.current = 1;
      setItems([]);
      setIsLastPage(false);
      handleSearch();
    }
  }, [currentGroup, search]);

  useEffect(() => {
    // Infinite scroll logic
    if (isLastPage || isLoading || !inView || currentGroup === undefined)
      return;
    loadMore();
  }, [inView, isLastPage, isLoading, currentGroup]);

  if (ability === 0 && currentGroup !== undefined) {
    return <Unauthorized />;
  }

  return (
    <>
      {currentGroup === undefined ? (
        <div className="w-full h-fit min-h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <main className="flex h-full w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
            <div className="flex items-center justify-between">
              <ParamsSearch />
              <AddEditUserDialog type="add" />
            </div>
            <ScrollArea
              orientation="both"
              scrollareathumbclassName="bg-[#777986]"
              scrollbarclassName="mt-16 bg-[#2C2C2C] rounded-full"
              className="h-full min-h-[35rem] rounded-lg bg-card p-3.5 pt-1.5 shadow"
            >
              <Table
                className={cn(
                  "w-full border-separate border-spacing-y-2 p-0",
                  !isLoading && items.length === 0 && "h-full"
                )}
              >
                <DataTableHeader
                  columns={tableColumns.map((column) => column.Header)}
                />
                <TableBody>
                  {items.map((user) => (
                    <TableRow
                      key={user.id}
                      className="mt-5 rounded-lg border-0 bg-muted px-3.5 text-muted-foreground  hover:bg-muted hover:brightness-90"
                    >
                      {tableColumns.map((column, index) => (
                        <TableCell
                          key={column.accessor}
                          className={cn(
                            "border-0 px-3.5 py-1 text-xs font-semibold text-muted-foreground 2xl:text-sm",
                            index === 0 && "rounded-l-lg",
                            index === tableColumns.length - 1 && "rounded-r-lg",
                            column.accessor === "more" && "pl-0 text-right"
                          )}
                          style={{
                            maxWidth: `${
                              column.size ? `${column.size}px` : ""
                            }`,
                          }}
                        >
                          {rowFormatter(column.accessor, user)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!isLoading && items.length === 0 ? null : (
                <div ref={ref} className="w-full min-h-4 h-4 relative">
                  {isLoading && items.length >= PER_PAGE && <BallLoader />}
                </div>
              )}
            </ScrollArea>
          </main>
        </>
      )}
    </>
  );
}
