// import {
//     HoverCard,
//     HoverCardContent,
//     HoverCardTrigger,
//   } from "@/components/ui/hover-card"  
// import { MoonStar, SunMedium } from "lucide-react";
// import { useState } from "react";

// const DarkModeToggler = () => {

//     const [theme, setTheme] = useState<string>(() => {
//         const storedTheme = localStorage.getItem('mode');
//         return storedTheme ? JSON.parse(storedTheme) : 'light'
//     });

//     const handleTheme = (mode: string) => {
//         setTheme(mode);
//         localStorage.setItem("mode", JSON.stringify(mode));
//     }

//     return (
//         <div>
//             <HoverCard>
//                 <HoverCardTrigger>
//                     <button className="bg-white py-2 px-4 shadow-md rounded-lg inline-flex items-center space-x-2">
//                         { theme === "light" ? <SunMedium className="hover:stroke-primary" /> : <MoonStar className="hover:stroke-primary" />}
//                     </button>
//                 </HoverCardTrigger>
//                 <HoverCardContent className="shadow-none border-none max-w-40" >
//                     <div className="bg-white rounded-md shadow-lg">
//                         <div className="flex space-x-2 p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleTheme("light")}>
//                             <SunMedium />
//                             <span>Light</span>
//                         </div>
//                         <div className="flex space-x-2 p-3 cursor-pointer hover:bg-gray-100" onClick={() => handleTheme("dark")}>
//                             <MoonStar />
//                             <span>Dark</span>
//                         </div>
//                     </div>
//                 </HoverCardContent>
//             </HoverCard>
//         </div>
//     )
// }

// export default DarkModeToggler;

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

const DarkModeToggler = () => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="shadow-md py-5 dark:bg-secondary rounded" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background text-foreground">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DarkModeToggler;