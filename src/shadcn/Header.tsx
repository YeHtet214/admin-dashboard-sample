import { DynamicBreadcrumb } from "@/components/ui/breadcrumb"

import DarkModeToggler from "./DarkModeToggler";
import LanguageBar from "./LanguageBar";

const Header = () => {
    return (
        <header>
            <div className="flex justify-between">
                <h2><DynamicBreadcrumb /></h2>
                <div className="flex items-center space-x-5">
                    <LanguageBar />
                    <DarkModeToggler />
                </div>
            </div>
        </header>
    )
}

export default Header;