import { FormInput } from "@/components/FormInput";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";

interface NetworkSettingsProps {
  control: Control<FieldValues, unknown>;
  watch: UseFormWatch<FieldValues>;
}
export const NetworkSettings = ({ control, watch }: NetworkSettingsProps) => {
  const mark = watch("mark");

  return (
    <div className="grid w-full grid-cols-2 gap-2.5 [&>:first-child]:col-span-2 [&>:nth-child(2)]:col-span-2 pb-4">
      <FormInput
        control={control}
        name="rtspLink"
        label="RTSP Link"
        placeholder="RTSP Link"
        disabled={mark !== "other"}
      />
      <FormInput
        control={control}
        name="rtspLinkLocal"
        label="RTSP Link Local"
        placeholder="RTSP Link Local"
      />
      <FormInput
        control={control}
        type="text"
        name="username"
        label="Username"
        placeholder="admin"
        autoComplete="username"
      />
      <FormInput
        control={control}
        type="password"
        name="password"
        label="Password"
        placeholder="********"
        autoComplete="current-password"
      />
      <FormInput
        control={control}
        type="number"
        name="httpPort"
        label="HTTP Port "
        placeholder="8080"
        className="hideInputNumberArrows"
      />
      <FormInput
        control={control}
        type="number"
        name="onvifPort"
        label="ONVIF Port"
        placeholder="8000"
        className="hideInputNumberArrows"
      />
      <FormInput
        control={control}
        name="ipAddress"
        label="IP Adress"
        placeholder="192.168.1.100"
      />
      <FormInput
        control={control}
        type="number"
        name="rtspPort"
        label="RTSP Port"
        placeholder="554"
        className="hideInputNumberArrows"
      />
    </div>
  );
};
