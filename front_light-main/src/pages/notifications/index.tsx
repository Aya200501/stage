import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "./components/filter";
import { Notification } from "./components/notification";
import { Actions } from "./components/notification/actions";

const notifications = [
  {
    title: "Camera System Update",
    date: "Posted 17 minutes ago",
    description: "Camera system firmware updated successfully",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 1 hours ago",
    description: "New camera added to the system",
    isArchived: false,
  },
  {
    title: "Software Update",
    date: "Posted 2 days ago",
    description: "Software update completed",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 2 days ago",
    description: "Camera maintenance completed",
    isArchived: true,
  },
  {
    title: "Camera System Update",
    date: "Posted 3 days ago",
    description: "Camera settings optimized",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 4 days ago",
    description: "Security patch applied to camera system",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 6 days ago",
    description: "Camera system backup completed",
    isArchived: true,
  },
  {
    title: "Camera System Update",
    date: "Posted 6 days ago",
    description: "Camera system rebooted for performance improvement",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 6 days ago",
    description: "New camera firmware available",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 7 days ago",
    description: "Camera system troubleshooting completed",
    isArchived: true,
  },
  {
    title: "Camera System Update",
    date: "Posted 8 days ago",
    description: "Camera settings reset to default",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 9 days ago",
    description: "Camera system logs reviewed",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 10 days ago",
    description: "Camera system performance report generated",
    isArchived: true,
  },
  {
    title: "Camera System Update",
    date: "Posted 11 days ago",
    description: "Camera network configuration updated",
    isArchived: false,
  },
  {
    title: "Lookup notifications",
    date: "Posted 12 days ago",
    description: "Lookup was successfully deleted",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 13 days ago",
    description: "Camera lens cleaned",
    isArchived: false,
  },
  {
    title: "Camera System Update",
    date: "Posted 20 days ago",
    description: "Camera system power cycled",
    isArchived: true,
  },
  {
    title: "Lookup notifications",
    date: "Posted 3o days ago",
    description: "Lookup was successfully deleted",
    isArchived: true,
  },
];

const NotificationsPage = () => {
  return (
    <main className="flex flex-1 w-full flex-col gap-3 max-md:px-4 max-md:pb-4 md:gap-4">
      <Filter />
      <div className="flex h-full flex-col gap-2 overflow-auto rounded-lg bg-card shadow p-3.5 pt-1.5 max-md:min-h-[35rem]">
        <Actions />
        <ScrollArea
          orientation="both"
          scrollareathumbclassName="bg-muted-foreground"
          scrollbarclassName="bg-muted rounded-full"
          className="h-full pr-3.5"
        >
          <div className="flex w-full flex-col gap-2">
            {notifications.map((notification, index) => (
              <Notification key={index} {...notification} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </main>
  );
};

export default NotificationsPage;
