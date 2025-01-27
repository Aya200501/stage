import { useGlobalContext } from "@/Context";
import { TableWidgetData } from "@/utils";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const TableHeader = memo(
  ({ mappings }: { mappings: TableWidgetData["mappings"] }) => {
    const { t } = useTranslation();
    const { currentGroup, user } = useGlobalContext();
    const ability =
      currentGroup?.getAbilityWithModel("USER", user?.isSuperAdmin) ?? 0;

    return (
      <div
        className="grid py-3 border-b font-semibold  [&>*]:px-2 [&>*]:capitalize"
        style={{
          gridTemplateColumns: `repeat(${
            mappings.length + (ability === 3 ? 2 : 1)
          }, 1fr)`,
        }}
      >
        {mappings.map((m) => (
          <div key={m.telemetryName}>
            {t(
              m.displayName?.toLocaleLowerCase() ||
                m.telemetryName.toLocaleLowerCase()
            )}
          </div>
        ))}
        <div> Date </div>
        {ability === 3 && <div>delete</div>}
      </div>
    );
  }
);
