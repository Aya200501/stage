import { useGlobalContext } from "@/Context";
import { useRef, useState } from "react";
import { useAlertStore } from "../store";
import { AlertType } from "@/utils";

export const useAlertManagement = (perPage: number = 10) => {
  const { backendApi } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const page = useRef(1);
  const { items, setItems, updateItem } = useAlertStore();

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const { results } = await backendApi.findMany<AlertType>("alert", {
        pagination: {
          page: page.current,
          perPage: perPage,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          workflow: {
            select: {
              cameraAnalyse: {
                select: {
                  name: true,
                  camera: {
                    select: {
                      name: true,
                      id: true,
                    }
                  }
                },
              },
            }
          },
          actions: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              type: true,
              user: {
                select: {
                  id: true,
                  fullName: true,
                  image: true,
                }
              }
            }
          },
        },
      });
      if (results.length < perPage) {
        setIsLastPage(true);
      }
      return results;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    page.current = 1;
    const results = await loadAlerts();
    setItems(results);
    page.current++;
  };

  const loadMore = async () => {
    const results = await loadAlerts();
    const newItems = results.filter(
      (alert) => !items.find((item) => item.id === alert.id)
    );
    setItems([...items, ...newItems]);
    page.current++;
  };

  return {
    isLoading,
    isLastPage,
    items,
    updateItem,
    handleSearch,
    loadMore
  };
};