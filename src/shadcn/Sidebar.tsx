import { ChartNoAxesCombined, ContactRound, Keyboard, MoveLeft, MoveRight, PackageSearch, Store, Warehouse } from "lucide-react"
import { useState } from "react";
import ContactMenu from "./menu-items/ContactMenu";
import ProductMenu from "./menu-items/ProductMenu";
import SellMenu from "./menu-items/SellMenu";
import InventoryMenu from "./menu-items/InventoryMenu";
import PosMenu from "./menu-items/PosMenu";
import ReportMenu from "./menu-items/ReporMenu";
import { Button } from "@/components/ui/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

const Sidebar = () => {
    const [ activeMenu, setActiveMenu ] = useState<string>(() => {
        const storedActiveMenu = localStorage.getItem('activeMenu');
        return storedActiveMenu ? JSON.parse(storedActiveMenu) : 'contact';
    });
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const SideMenuIcons = [
        { id: 'contact', content: 'Contact', icon: ContactRound },
        { id: 'product', content: 'Product', icon: PackageSearch },
        { id: 'sell', content: 'Sell', icon: Store },
        { id: 'pos', content: 'POS', icon: Keyboard },
        { id: 'inventory', content: 'Inventory', icon: Warehouse },
        { id: 'report', content: 'Report', icon: ChartNoAxesCombined }
    ]

    const handleMenu = (menu: string) => {  
        setIsOpen(true);
        if (menu === activeMenu) return;
        setActiveMenu(menu);
        localStorage.setItem('activeMenu', JSON.stringify(menu));
    }

    const toggleSideBar = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className=" py-5 relative bg-background dark:bg-secondary">
            <aside className="flex">    
                {/* Left Side of the Aside */}
                <div className="flex justify-center w-24 z-10 text-foreground bg-background dark:bg-secondary">
                    <TooltipProvider>
                        <ul>    
                            { SideMenuIcons.map(sideMenu => (
                                <li key={sideMenu.id} className="mb-4">
                                    <Tooltip delayDuration={100}>
                                        <TooltipTrigger className="bg-transparent dark:shadow-md relative cursor-pointer focus:outline-none p-4">
                                            <sideMenu.icon  className={`cursor-pointer ${activeMenu === sideMenu.id ? "stroke-primary" : "stroke-foreground"}`} onClick={() => handleMenu(sideMenu.id)} />
                                        </TooltipTrigger>
                                        <TooltipContent  className="bg-background text-foreground p-2 rounded-lg shadow-lg whitespace-nowrap absolute left-full translate-x-4 top-1/2 ml-2">
                                            {sideMenu.content}
                                        </TooltipContent>
                                    </Tooltip>
                                </li>
                            ))}
                        </ul>
                    </TooltipProvider>
                </div>
                    {/* right side of the aside  */}
                    <div className={`transition-transform ease-out absolute min-w-56 pr-4 ${isOpen ? 'translate-x-0 relative' : '-translate-x-[200%] absolute'}`}>
                        { activeMenu === "contact" ? 
                            <ContactMenu /> :
                            activeMenu === "products" ? 
                            <ProductMenu /> : 
                            activeMenu === "sell" ? 
                            <SellMenu /> :
                            activeMenu === "pos" ?
                            <PosMenu /> :
                            activeMenu === "inventory" ?
                            <InventoryMenu /> : 
                            <ReportMenu />
                        }
                    </div>
            </aside>
            {/* Sidebar Toggler */}
            <Button 
                className="dark:bg-secondary absolute bottom-[10%] right-0 translate-x-1/2 rounded py-2 px-2 shadow-sm bg-background text-foreground hover:bg-primary"
                aria-expanded={isOpen}
                onClick={toggleSideBar}>
                { isOpen ? <MoveLeft className="hover:stroke-white w-4" /> : <MoveRight className="hover:stroke-white w-4" /> }
            </Button>
        </div>
    )
}

export default Sidebar;