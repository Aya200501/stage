/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import StreamPage from "./_component/stream";
import useSWR from "swr";
import { useGlobalContext } from "@/Context";
import { useEffect, useMemo } from "react";
import { getPermissionLevel } from "@/utils/functions";
import { Unauthorized } from "@/components/403";
import { useTranslation } from "react-i18next";
const CameraPage = () => {
  const { t } = useTranslation();
  const { cameraId } = useParams<{ cameraId: string }>();
  const { backendApi, user, groupId } = useGlobalContext();
  const navigate = useNavigate();

  const permissionLevel = useMemo(
    () => getPermissionLevel(user, "CAMERA", groupId),
    [user, groupId]
  );

  const { data, isLoading, error } = useSWR(
    `camera/CHECK_STREAM/${cameraId}`,
    async () => {
      if (permissionLevel === 0) return null;
      if (!cameraId) return null;
      const res = await backendApi.FindById<{
        cameraAnalyses: any[];
      }>("camera", cameraId!, {
        include: {
          cameraAnalyses: {
            include: {
              analyses: true,
            },
          },
        },
      });
      return res;
    }
  );

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  if (permissionLevel === 0) {
    return <Unauthorized />;
  }

  if (isLoading)
    return (
      <div className="w-full h-full items-center justify-center">
        {t("loading")}
      </div>
    );
  if (data) return <StreamPage analyses={data.cameraAnalyses} />;
};

export default CameraPage;
