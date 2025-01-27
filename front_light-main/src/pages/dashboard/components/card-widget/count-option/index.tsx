import { Widget, WidgetCardCountElement } from "@/utils";
import { Icon } from "@/components/icon";
import { useGlobalContext } from "@/Context";
import Loader from "../../loader";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

type Data = {
  element?: WidgetCardCountElement;
  icon?: string;
};

export default function CountOption({ title, attributes }: Widget) {
  const { t } = useTranslation();
  const { groupId, backendApi } = useGlobalContext();
  const { element, icon } = attributes as Data;

  const {
    data: count,
    isLoading,
    error,
  } = useSWR(`group/${groupId}/${element}`, async () => {
    if (!element) return;
    const { totalResult } = await backendApi.findMany(element, {
      pagination: { page: 1, perPage: 1 },
    });
    return totalResult;
  });

  if (isLoading)
    return (
      <main className="grid place-content-center text-xs">
        <Loader />
      </main>
    );
  if (error)
    return (
      <main className="grid place-content-center  text-foreground/50">
        {t("somethingError")}
      </main>
    );

  return (
    <div className="flex justify-between items-center   overflow-hidden  w-full h-full">
      <div className="flex gap-2 flex-col  capitalize">
        <span className="font-semibold">{title}</span>
        <span className="first-letter:uppercase">{count}</span>
      </div>
      {icon ? (
        icon.includes("http") ? (
          <img src={icon} alt={title} className="w-12 h-12 object-cover mr-3" />
        ) : (
          <Icon name={icon} size={52} strokeWidth={1.5} />
        )
      ) : null}
    </div>
  );
}
