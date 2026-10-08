// import ExtendedButton from "@/components/extended-components/extended-button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Separator } from "@/components/ui/separator";
// import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
// import { useState, type Dispatch, type SetStateAction } from "react";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import type { Notification } from "../type";

// const NotificationItem = ({
//   notification,
//   setOpen,
//   onMarkAsRead,
// }: {
//   notification: Notification;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   onMarkAsRead: (id: string) => void;
// }) => {
//   const navigate = useNavigate();
//   return (
//     <div
//       onClick={() => {
//         onMarkAsRead(notification.id);
//         navigate(notification.redirect_url);
//         setOpen(false);
//       }}
//       className="flex justify-between hover:bg-secondary-50 rounded-lg cursor-pointer transition-colors px-2"
//     >
//       <div className="flex gap-3 py-3">
//         <Avatar>
//           <AvatarImage
//             src={notification.sender.profile?.profile_picture ?? undefined}
//           />
//           <AvatarFallback>
//             {notification.sender.full_name.charAt(0)}
//           </AvatarFallback>
//         </Avatar>
//         <div>
//           <p className="text-tertiary-400 text-base">{notification.message}</p>
//           <p className="text-tertiary-100 text-sm font-light">
//             {notification.title}
//           </p>
//           <p className="text-tertiary-100 text-xs font-light">
//             {notification.created_at}
//           </p>
//         </div>
//       </div>
//       {Boolean(notification.is_read) === false && (
//         <div className="h-2 w-2 rounded-full bg-primary mt-2" />
//       )}
//     </div>
//   );
// };

// const Notifications = ({
//   data,
//   onMarkAsRead,
// }: {
//   data?: Notification[];
//   onMarkAsRead: (id: string) => void;
// }) => {
//   const [open, setOpen] = useState(false);
//   const [filter, setFilter] = useState<"all" | "unread">("all");

//   const notifications = (data ?? []).map((n) => ({
//     id: n.id,
//     title: n.title,
//     message: n.message,
//     created_at: new Date(n.created_at).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//     redirect_url: n.redirect_url,
//     sender: n.sender,
//     is_read: n.is_read,
//     updated_at: n.updated_at,
//     deleted_at: n.deleted_at,
//     read_at: n.read_at,
//     label: n.label,
//     notify_on: n.notify_on,
//     recipient: n.recipient,
//     can_be_reminded: n.can_be_reminded,
//   }));

//   const unreadNotifications = notifications.filter((n) => n.is_read);
//   const readNotifications = notifications.filter((n) => !n.is_read);

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <div className="relative rounded-[8px] bg-secondary-50 p-2 flex items-center justify-center">
//         <DropdownMenuTrigger asChild className="relative">
//           <IoMdNotificationsOutline className="h-5 w-5 cursor-pointer" />
//         </DropdownMenuTrigger>

//         {notifications.length > 0 && (
//           <div className="absolute -top-2 -right-1 min-w-4 px-1 h-4 w-fit bg-destructive rounded-full flex items-center justify-center text-[10px] text-white">
//             {notifications.length > 99 ? "99+" : notifications.length}
//           </div>
//         )}

//         <DropdownMenuContent
//           sideOffset={10}
//           className="bg-white w-[380px] mr-7 mt-4 rounded-[14px] py-5 border-none [box-shadow:0px_0px_2px_rgba(0,0,0,0.3)] overflow-hidden"
//         >
//           <div className="bg-secondary-50/18">
//             <div className="px-4">
//               <p className="text-tertiary-300 text-xl font-medium">
//                 Notifications
//               </p>

//               <div className="flex items-center gap-3 mt-4">
//                 <ExtendedButton
//                   text="All"
//                   variantType={filter === "all" ? "" : "normal-outline"}
//                   onClick={() => setFilter("all")}
//                 />
//                 <ExtendedButton
//                   text="Unread"
//                   variantType={filter === "unread" ? "" : "normal-outline"}
//                   onClick={() => setFilter("unread")}
//                 />
//               </div>
//             </div>

//             <Separator className="my-3 bg-tertiary-50" />

//             <div className="h-[60vh] overflow-auto mt-3 px-4">
//               {filter === "all" && (
//                 <div className="mb-4">
//                   {readNotifications.map((notif) => (
//                     <NotificationItem
//                       key={notif.id}
//                       notification={notif}
//                       setOpen={setOpen}
//                       onMarkAsRead={onMarkAsRead}
//                     />
//                   ))}
//                   {unreadNotifications.map((notif) => (
//                     <NotificationItem
//                       key={notif.id}
//                       notification={notif}
//                       setOpen={setOpen}
//                       onMarkAsRead={onMarkAsRead}
//                     />
//                   ))}
//                 </div>
//               )}

//               {filter === "unread" && readNotifications.length > 0 && (
//                 <div className="mb-4">
//                   {unreadNotifications.map((notif) => (
//                     <NotificationItem
//                       key={notif.id}
//                       notification={notif}
//                       setOpen={setOpen}
//                       onMarkAsRead={onMarkAsRead}
//                     />
//                   ))}
//                 </div>
//               )}

//               {filter === "unread" && unreadNotifications.length === 0 && (
//                 <p className="text-sm text-gray-500 p-4">
//                   No unread notifications
//                 </p>
//               )}
//             </div>

//             <Separator className="my-4 bg-tertiary-50" />
//             <div className="w-full px-4">
//               <ExtendedButton
//                 text="See Previous Notifications"
//                 size="large"
//                 variantType="normal-outline"
//                 className="w-full text-sm"
//               />
//             </div>
//           </div>
//         </DropdownMenuContent>
//       </div>
//     </DropdownMenu>
//   );
// };

// export default Notifications;
