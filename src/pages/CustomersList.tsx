import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CustomersTable from "@/shadcn/CustomersTable";
import { useEffect, useState } from "react";
import { useCustomers } from "@/context/CustomersContextProvicer";
import * as CustomerServices from "../services/CustomerServices";
import { CustomerType } from "@/type";

const CustomersList = () => {
    const { customers, deleteCustomer } = useCustomers();
    const [searchValue, setSearchValue] = useState<string>('');
    const [customersList, setCustomersList] = useState<CustomerType[]>(customers);

    useEffect(() => setCustomersList(customers), []);

    useEffect(() => {
        if (!searchValue) setCustomersList(customers);
        setCustomersList(prev => prev.filter(cus => {
            const fullName = `${cus.fname} ${cus.mname} ${cus.lname}`.toLowerCase();
            return fullName.includes(searchValue);
        }))
    }, [searchValue]);

    const handleDelete  = async (email: string) => {
        const removedCus = await CustomerServices.deleteCustomer(email);
        console.log("removed Cus", removedCus)
        if (!removedCus) return;
        deleteCustomer(email);
    }

    return (
        <div>
            <h3 className="mb-4 dark:text-white font-bold">All Customers</h3>
            <div className="flex justify-between mb-8">
                <div className="relative">
                    <Input placeholder="Search" value={searchValue} className="pl-10 shadow border-none bg-background opacity-85 rounded text-bold text-foreground" onChange={(e) => setSearchValue(e.target.value)} />
                    <Search className="stroke-background-700 absolute left-2 top-1/2 -translate-y-1/2" />
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button className="hover:bg-primary bg-white text-black border-none outline-none mr-4 hover:text-white">Export Report</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                            <DropdownMenuItem>Copy to Clipboard</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer hover:bg-primary hover:text-primary">Export as Exel</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-primary hover:text-primary">Export as CSV</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-primary hover:text-primary">Export as PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link to="create">
                        <Button className="bg-primary ">Add</Button>
                    </Link>
                </div>
            </div>

            <CustomersTable customers={customersList} handleDelete={email => handleDelete(email)} />
        </div>
    )

}

export default CustomersList;
