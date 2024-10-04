import { client } from "./index.js";

export const getAllCustomers = async () => {
    try {
        const { rows } = await client.query("SELECT * FROM customers");
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export const addNewCustomer = async ({ fName, lName, mName, email, gender, mobile, personalType, contactType, contactId }) => {
    if (!contactId) contactId = Math.floor((Math.random() * 1000) + 10);
    try {
        const { rows } = await client.query(`
            INSERT INTO customers (fname, lname, mname, email, gender, mobile, psersonaltype, contacttype, contactid)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `, [fName, lName, mName, email, gender, mobile, personalType, contactType, contactId ]);
        console.log(rows);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

export const deleteCustomer = async (email) => {
    try {
        const { rows } = await client.query(`
            DELETE from customers
            WHERE email = $1 
            RETURNING *;
        `, [email]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}