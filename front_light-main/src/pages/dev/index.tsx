import useSWR from "swr";
import { useGlobalContext } from "@/Context";
import { Group } from "@/utils/api-types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function DevPage() {
  const { backendApi } = useGlobalContext();
  const [parentId, setParentId] = useState<string>("");

  const sitesSWR = useSWR("map-sites", async () => {
    const { results } = await backendApi.findMany<Group>("group", {
      where: { type: "REGION" },
      select: {
        id: true,
        name: true,
        parentId: true,
        subGroups: true,
        polygon: true,
        map: true,
        type: true,
        parent: {
          select: {
            parentId: true,
            parent: {
              select: {
                parentId: true,
              },
            },
          },
        },
      },
    });
    return results;
  });

  const onSubmit = async (groupId: string) => {
    // const parentId = e.currentTarget.parentId.value;
    await backendApi.update<Group>("group", groupId, {
      parentId,
    });
    setParentId("");
  };

  return (
    <div className="w-full p-6 h-full flex flex-col gap-y-3">
      {sitesSWR.data?.map((site) => (
        <div key={site.id} className="flex flex-col gap-y-1 w-fit h-full p-5">
          <div>{site.name}</div>
          <div>{site.id}</div>
          <div>{site.parentId}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parentId" className="text-right">
                    Parent Id
                  </Label>
                  <Input
                    id="parentId"
                    defaultValue=""
                    className="col-span-3"
                    onChange={(e) => setParentId(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => onSubmit(site.id)} variant="outline">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
