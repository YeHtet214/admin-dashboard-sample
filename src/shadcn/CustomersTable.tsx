import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import { Eye, FilePenLine, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerType } from "@/type";
import { useEffect } from "react";

interface ActionButtonProps {
    deleteCustomer: () => void;
}

const ActionButton = ({ deleteCustomer }: ActionButtonProps) => {

    return (
        <Menubar className="bg-transparent rounded-md shadow-none border-none">
            <MenubarMenu>
                <MenubarTrigger>
                    <Button className="cursor-pointer text-white">Actions</Button>
                </MenubarTrigger>
                <MenubarContent className="bg-white text-secondary p-0">
                    <MenubarItem className="cursor-pointer p-0">
                        <div className="hover:bg-gray-100 w-full flex p-2 ">
                            <Eye className="stroke-secondary mr-4 w-6" />
                            <span>View</span>
                        </div>
                    </MenubarItem>
                    <MenubarItem className="cursor-pointer p-0">
                        <div className="hover:bg-gray-100 w-full flex p-2 ">
                            <FilePenLine className="stroke-secondary mr-4 w-6" />
                            <span>Edit</span>
                        </div>
                    </MenubarItem>
                    <MenubarItem className="cursor-pointer p-0" onClick={deleteCustomer}>
                        <div className="hover:bg-gray-100 w-full flex p-2 ">
                            <Trash className="stroke-secondary mr-4 w-6" />
                            <span>Delete</span>
                        </div>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}
interface Props {
    customers: CustomerType[];
    handleDelete: (email: string) => void;
}

const CustomersTable = ({ customers, handleDelete }: Props) => {

    useEffect(() => {
        console.log("Customres: ", customers);
    })

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Actions</TableHead>
                    <TableHead>Contact Id</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Payable Amount</TableHead>
                    <TableHead>Receivable Amount</TableHead>
                    <TableHead>Credit Limit</TableHead>
                    <TableHead>Custom Field 1</TableHead>
                    <TableHead>Custom Field 2</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { customers?.map(customer => (
                    <TableRow key={customer.contactid}>
                        <TableCell className="font-medium"><ActionButton deleteCustomer={() => handleDelete(customer.email)} /></TableCell>
                        <TableCell>{customer.contactid}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{customer.fname+ ' ' + customer.mname + ' ' + customer.lname}</TableCell>
                        <TableCell>{customer.mobile}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>  
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
    )
}

export default CustomersTable;