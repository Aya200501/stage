import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useGlobalContext } from "@/Context";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import { AlertAction } from "@/utils";
import { formatDate } from "@/utils/functions";
// import { Trash } from "lucide-react";

interface CommentListProps {
  comments: AlertAction[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  // const { backendApi } = useGlobalContext();

  // const deleteComment = async (commentId: string) => {
  //   try {
  //     await backendApi.DeleteById("alertAction", commentId);
  //   } catch (error) {
  //     // toast.error("Failed to delete comment");
  //   }
  // };
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment: any, index: number) => (
        <div
          key={index}
          className="w-full flex flex-col gap-3 px-[18px] py-[16px] bg-[#383838] rounded-[10px] relative"
        >
          <div className="flex items-center gap-1.5 justify-between">
            <div className="flex items-center gap-1.5">
              <Avatar
                className={cn(
                  "size-6 shrink-0 transition-[width,height] duration-500"
                )}
              >
                <AvatarImage
                  src={`${env.VITE_BACKEND_API}/uploads/${comment.user?.image}`}
                ></AvatarImage>
                <AvatarFallback className="bg-primary/10 font-bold">
                  {comment.user?.fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs sm:text-sm text-[#F5F7FA] font-semibold">
                {comment.user.fullName}
              </span>
            </div>
            {/* <button
              className="text-xs text-[#98A2B3] font-thin"
              onClick={() => deleteComment(comment.id)}
            >
              <Trash className="size-3.5" />
            </button> */}
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="text-sm text-[#F5F7FA] font-medium">
              {comment.content}
            </p>
            <span className="text-xs text-[#98A2B3] font-thin self-end">
              {formatDate(new Date(comment.createdAt))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
