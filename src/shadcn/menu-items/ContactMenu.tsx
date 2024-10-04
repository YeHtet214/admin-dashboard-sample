import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonStanding, UserRound, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ContactMenu = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Store the index of the hovered item
    const [openIndex, setOpenIndex] = useState<number | null>(null); // Store the index of the hovered item

    const accordionItems = [
        { id: "item-1", label: "Suppliers", contents: [ {description: "Suppliers List", link: "/suppliers"}, {description: "Add Suppliers", link: "/suppliers/create"} ], icon: PersonStanding, },
        { id: "item-2", label: "Customers", contents: [ {description: "Customers List", link: "/customers"}, {description: "Add Customers", link: "/customers/create"} ], icon: UserRound },
        { id: "item-3", label: "Customer Groups", contents: [{description: "Customer Groups List", link: "/customer-groups-list"}], icon: Users },
    ];

    return (
        <div>
            <h3><b>CONTACTS</b></h3>
            <Accordion 
                type="single" 
                collapsible
                onValueChange={(value) => {
                    setOpenIndex(() => value === null ? null : accordionItems.findIndex(item => item.id === value));
                }}
            >
                {accordionItems.map((item, index) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger
                            className="focus:outline-none hover:border-transparent hover:no-underline"
                            onMouseEnter={() => setHoveredIndex(index)} // Set hovered index
                            onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index
                        >
                            <p className="flex justify-between">
                                <item.icon
                                    className={`${hoveredIndex === index || openIndex === index ? "stroke-primary" : "stroke-foreground)"}`}
                                />
                                <span className={`${hoveredIndex === index || openIndex === index ? "text-primary" : "text-foreground"}`}>
                                    {item.label}
                                </span>
                            </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc pl-10 space-y-2 text-left">
                                { item.contents?.map((content, i) => (
                                    <li key={i}><Link to={content.link}>{content.description}</Link></li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default ContactMenu;
