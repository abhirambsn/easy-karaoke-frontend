import { CreditCard, LogOutIcon, User2, UserIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  name: string;
  image_url: string;
  logout: () => void;
};

const UserPill = ({ name, image_url, logout }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none rounded-full bg-gray-800 p-2 hover:opacity-80 hover:cursor-pointer transition-all ease-in-out duration-100">
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex items-center justify-between gap-2">
          <Avatar>
            <AvatarImage
              className="border border-gray-300 rounded-full"
              src={image_url}
            />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className="text-light">{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-start gap-3">
          <User2 size={16} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-start gap-3">
          <CreditCard size={16} />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 flex items-center justify-start gap-3"
          onClick={logout}
        >
          <LogOutIcon size={16} />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <div onClick={logout} className="hover:cursor-pointer hover:opacity-90 flex items-center justify-center gap-3 bg-slate-800 px-6 py-1 rounded-full bg-opacity-80">
    //   <Avatar>
    //     <AvatarImage src={image_url} />
    //     <AvatarFallback>UK</AvatarFallback>
    //   </Avatar>
    //   <span>{name}</span>
    // </div>
  );
};

export default UserPill;
