import { Button } from "./ui/button";
import { Menu } from "lucide-react";

type Props = {
  setSidebarState: (sbarState: boolean) => void;
  sidebarState: boolean;
};

const SidebarMenuTrigger = ({ setSidebarState, sidebarState }: Props) => {
  return (
    <Button
      onClick={() => setSidebarState(!sidebarState)}
      className="focus:outline-none hover:bg-gray-800 text-gray-200 p-2 py-3 rounded-full bg-gray-800 hover:opacity-80 hover:cursor-pointer transition-all ease-in-out duration-100"
    >
      <Menu />
    </Button>
  );
};

export default SidebarMenuTrigger;
