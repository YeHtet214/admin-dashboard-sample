CREATE TABLE customers (
    contactId SERIAL,
    fname VARCHAR(50),
    mname VARCHAR(50),
    lname VARCHAR(50),
    email TEXT PRIMARY KEY,
    gender TEXT,
    mobile VARCHAR(),
    psersonalType TEXT,
    contactType TEXT NOT NULL
);