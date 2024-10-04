import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "@/components/ui/select"
import { SelectGroup } from "@radix-ui/react-select";
import { useState } from "react";
import * as CustomerServices from "../services/CustomerServices";
import { useCustomers } from "@/context/CustomersContextProvicer";
  
const AddCustomers = () => {
    const { addCustomer } = useCustomers();
    const [contactType, setContactType] = useState<string>('supplier');
    const [personalType, setPersonalType] = useState<string>('business');
    const [contactId, setContactId] = useState<string>('');
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [mName, setMName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [gender, setGender] = useState<string>('male');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            contactType,
            personalType,
            contactId,
            fName,
            mName,
            lName,
            mobile,
            email,
            gender,
        };
        const newCustomer = await CustomerServices.addNewCustomer(formData);
        console.log(newCustomer);
        if (!newCustomer) return;
        addCustomer(newCustomer);
        setContactType('');
        setFName('')
        setMName('')
        setLName('')
        setEmail('')
        setGender('')
        setMobile('')
        setPersonalType('')
        setContactId('')
    };

    return (
        <form action="/submit" method="POST" className="text-left text-gray-500" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
                <div className="flex-grow">
                    <label htmlFor="contact-type">
                        Contact Type <span className="text-red-500">*</span>
                    </label>

                    <Select defaultValue={contactType} onValueChange={(value) => setContactType(value)} >
                        <SelectTrigger className="capitalize border-gray-100 shadow-sm focus:border-gray-200">
                            {contactType}
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectGroup>
                                <SelectItem 
                                    value="supplier" 
                                    className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                >
                                    Supplier
                                </SelectItem>
                                <SelectItem 
                                    value="customer" 
                                    className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                >
                                    Customer
                                </SelectItem>
                                <SelectItem 
                                    value="both" 
                                    className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                >
                                    Both (Suppliers and Customers)
                                </SelectItem>
                            </SelectGroup>
                            
                        </SelectContent>
                    </Select>
                </div>

                <fieldset id="personal-type" defaultValue={personalType} onChange={(e) => setPersonalType((e.target as HTMLInputElement).value)} >
                    <label htmlFor="individual" className="mr-2">
                        <input type="radio" id="individual" value="individual" name="personal-type" className="cursor-pointer mr-2 scale-150" />
                        Individual
                    </label>
                    <label htmlFor="">
                        <input type="radio" id="business" value="business" name="personal-type" className="cursor-pointer mr-2 scale-150" />
                        Business
                    </label>
                </fieldset>

                <div className="flex-grow">
                    <label htmlFor="contact-id">Contact ID</label>
                    <Input type="text" value={contactId} placeholder="Contact ID" onChange={(e) => setContactId(e.target.value)} />
                    <p className="text-secondary">Leave empty to autogenerate</p>
                </div>
            </div>

            <div className="my-6">
                <h3 className="text-primary font-bold mb-2">General Info</h3>
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex-1">
                        <label htmlFor="fname">First Name</label><br/>
                        <Input type="text" value={fName} id="fname" placeholder="First Name" onChange={(e) => setFName(e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="mname">Middle Name</label><br/>
                        <Input type="text" value={mName} id="mname" placeholder="Middle Name" onChange={(e) => setMName(e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lname">Last Name</label><br/>
                        <Input type="text" value={lName} id="lname" placeholder="Last Name" onChange={(e) => setLName(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="my-6">
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex-1">
                        <label htmlFor="mobile">Mobile</label><br/>
                        <Input type="number" value={mobile} id="mobile" placeholder="Mobile" onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="Email">Email</label><br/>
                        <Input type="email" value={email} id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="gender">Gender</label><br/>
                        
                        <Select defaultValue={gender} onValueChange={(value) => setGender(value)} >
                            <SelectTrigger className="capitalize border-gray-100 shadow-sm focus:border-gray-200">
                                {gender}
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectGroup>
                                    <SelectItem 
                                        value="male" 
                                        className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                    >
                                        Male
                                    </SelectItem>
                                    <SelectItem 
                                        value="female" 
                                        className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                    >
                                        Female
                                    </SelectItem>
                                    <SelectItem 
                                        value="none" 
                                        className="hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white cursor-pointer"
                                    >
                                        Prefer not to say
                                    </SelectItem>
                                </SelectGroup>
                                
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <Button type="submit" className="float-right">Save</Button>

        </form>
    )
}

export default AddCustomers;