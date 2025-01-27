import ParamsSearch from "@/components/params-search";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { FileIcon, Pencil, Plus, CircleX, ChevronDown } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface AddPluginModalProps {
  type?: "new" | "edit";
}

const plugins = [
  {
    icon: "",
    name: "Plugin 1",
    description: "Plugin 1 description",
    version: "1.0.0",
    size: "1.5 MB",
  },
];

const AddPluginModal = ({ type = "new" }: AddPluginModalProps) => {
  const { t } = useTranslation();

  const uploadRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => {
        const fs = Array.from(e.target.files || []);
        const filteredFiles = fs.filter((item) =>
          files.every((f) => f.name !== item.name)
        );
        return [...(prev || []), ...filteredFiles];
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className={cn(
            "flex items-center justify-center  rounded-sm  font-semibold  disabled:cursor-not-allowed !order-1 h-10 gap-1.5 bg-[#4CAF50]/10 px-3.5 md:pr-5 py-0 text-xs text-[#4CAF50] hover:bg-[#4CAF50]/20 sm:!order-2"
          )}
        >
          <span className={cn("flex items-center justify-center rounded-full")}>
            {type === "new" ? <Plus /> : <Pencil className="size-5" />}
          </span>
          {type === "new" ? (
            <span className="first-letter:uppercase">{t("add Plugin")}</span>
          ) : (
            <span className="first-letter:uppercase">{t("edit Plugin")}</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="!min-w-[800px]">
        <DialogHeader className="text-lg font-bold">
          Ajouter un plugin
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div
            className={cn(
              "w-full max-w-[750px] overflow-auto h-[90px] border border-dashed flex items-center scroll",
              files?.length > 7 ? "px-4" : "justify-center"
            )}
          >
            {files?.length ? (
              <div className="flex h-full pt-2 gap-5">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="relative flex flex-col gap-2 items-center w-[70px] "
                  >
                    <CircleX
                      className="absolute bg-red-500 rounded-full right-0 cursor-pointer"
                      size={15}
                      onClick={() => {
                        setFiles((prev) => {
                          return (
                            prev?.filter((f) => f.name !== file.name) || []
                          );
                        });
                      }}
                    />
                    <FileIcon size={40} />

                    <p className="text-xs" title={file.name}>
                      {file.name.length > 10
                        ? file.name.slice(0, 10) + "..."
                        : file.name}
                    </p>
                  </div>
                ))}
                <Plus
                  size={20}
                  className="border-white border-2 border-dashed h-[60px] w-[50px] rounded cursor-pointer"
                  onClick={() => uploadRef.current?.click()}
                />
              </div>
            ) : (
              <div className="flex gap-5 items-center">
                <p>Faites glisser et déposez les fichiers ici</p>
                <p>ou</p>
                <Button
                  variant="ghost"
                  className="border"
                  onClick={() => uploadRef.current?.click()}
                >
                  Parcourir les fichiers
                </Button>
              </div>
            )}
            <input
              ref={uploadRef}
              className="hidden"
              type="file"
              onChange={(e) => {
                handleUpload(e);
                e.target.value = "";
              }}
              multiple
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="font-semibold">Plugins</span>
            <ParamsSearch className="h-10 py-0 !order-1 md:-order-none flex-[5] min-w-[17rem] max-w-[23rem] max-md:max-w-full" />
          </div>
          {
            <div className="flex flex-col gap-5">
              {plugins.map((plugin) => (
                <div
                  key={plugin.name}
                  className="flex items-center justify-between w-full border p-2 rounded-sm"
                >
                  <div className="flex items-center gap-5">
                    <FileIcon size={40} />
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {plugin.name} {plugin.version}
                      </span>
                      <span>{plugin.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span>{plugin.size}</span>
                    <Button className="h-[30px] rounded-sm justify-between px-3 w-[100px]">
                      install
                      <ChevronDown />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPluginModal;
