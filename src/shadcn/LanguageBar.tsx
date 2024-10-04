import { useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"  
import usa from "../assets/usa.svg";
import myanmar from "../assets/myanmar.svg";
import thailand from "../assets/thailand.svg";

interface LanguageType {
    name: string;
    flag: string;
}

const LanguageBar = () => {

    const [language, setLanguage] = useState<LanguageType>(() => {
        const storedLanguage = localStorage.getItem('language');
        return storedLanguage ? JSON.parse(storedLanguage) : { name: 'English', flag: usa }
    });

    const languages = [
        {id: "english", name: "English", flag: usa},
        {id: "myanmar", name: "Myanmar", flag: myanmar},
        {id: "thailand", name: "Thailand", flag: thailand},
    ]

    const handleLanguagePreferences = ( name: string, flag: string ) => {
        setLanguage({name, flag});
        localStorage.setItem('language', JSON.stringify({ name, flag }));
    }

    return (
        <HoverCard>
            <HoverCardTrigger>
                <button className="bg-background dark:bg-secondary py-2 px-4 shadow-md rounded-lg inline-flex items-center space-x-2">
                    <span>{language.name}</span>
                    <img src={language.flag} alt={language.name} className="w-5"/>
                </button>
            </HoverCardTrigger>

            <HoverCardContent className="shadow-none border-none" >
                <div className="bg-background rounded-md shadow-lg py-1">
                    { languages.map(language => (
                        <div 
                            key={language.id} 
                            className="px-4 py-2 cursor-pointer flex space-x-2"
                            onClick={() => handleLanguagePreferences(language.name, language.flag)}
                        >
                            <img src={language.flag} alt={language.id} className="w-5"/>
                            <span>{language.name}</span>
                        </div>
                    ))}
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default LanguageBar;