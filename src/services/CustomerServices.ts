import axios from "axios";

export interface CustomerType {
    fName: string;
    mName: string;
    lName: string;
    email: string;
    mobile: string;
    contactType: string;
    personalType: string;
    contactId: string;
    gender: string;
}

export const getAllCustomers = async () => {
    try {
        const response = await axios.get('http://localhost:5000/customers');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const addNewCustomer = async (data: CustomerType) => {
    console.log("data: ", data);
    try {
        const response = await axios.post('http://localhost:5000/customers', data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCustomer = async (email: string) => {
    try {
        const res = await axios.delete(`http://localhost:5000/customers/${email}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}