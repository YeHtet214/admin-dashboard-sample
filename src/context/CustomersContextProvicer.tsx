import { CustomerType } from "@/type";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import * as CustomerServices from "../services/CustomerServices";

interface CustomerContextType {
    customers: CustomerType[] | [];
    addCustomer: (customer: CustomerType) => void;
    deleteCustomer: (contactId: string) => void;
}

const defaultCustomer: CustomerContextType = {
    customers: [],
    addCustomer: () => {},
    deleteCustomer: () => {}
}

const CustomerContext = createContext<CustomerContextType>(defaultCustomer);

const CustomerContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);

    useEffect(() => {
        (async () => {
            const returnedCustomers = await CustomerServices.getAllCustomers();
            if (!returnedCustomers) return setCustomers([]);
            setCustomers(returnedCustomers);
        })();
    }, []);

    useEffect(() => {
        console.log(customers);
    }, [customers]);

    const addCustomer = (customer: CustomerType) => {
        setCustomers(prev => [...prev, customer]);
    }

    const deleteCustomer = (email: string) => {
        setCustomers(existCus => existCus.filter(cus => cus.email !== email));
    }
    
    return (
        <CustomerContext.Provider value={{ customers, addCustomer, deleteCustomer }}>
            {children}
        </CustomerContext.Provider>
    )
}

const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("Customers Context should be used inside Cusotemers Provider!")
    }

    return context;
}

export { CustomerContextProvider, useCustomers };