const program30 = {
  id: 30,
  title: "Program 11 - DBMS",
  lang: "c",
  code: `
  USE ms254053;

-- Create the table
CREATE TABLE product(
    item_code NUMERIC(6),
    name VARCHAR(20),
    quantity NUMERIC(6),
    price NUMERIC(6),
    exp_date DATE
);

-- Insert initial values
INSERT INTO product VALUES
(101, 'wheat', 5, 200, '2025-11-25'),
(102, 'Sugar', 6, 300, '2025-10-25'),
(103, 'Rice', 3, 600, '2025-10-25'),
(104, 'Salt', 1, 60, '2025-01-26'),
(105, 'Biscuits', 1, 70, '2025-01-16');

SELECT * FROM product;

-- Create the trigger
CREATE TRIGGER trig_insert2
ON product
FOR INSERT
AS
BEGIN
    DECLARE 
        @itemcode NUMERIC(10),
        @itemname VARCHAR(50),
        @quantity NUMERIC(8),
        @expiry_date DATE,
        @price NUMERIC(10,2);

    -- Get values from inserted row
    SELECT 
        @itemcode = item_code,
        @itemname = name,
        @quantity = quantity,
        @price = price,
        @expiry_date = exp_date
    FROM inserted;

    -- Check if expiry date is today
    IF CAST(GETDATE() AS DATE) = @expiry_date
    BEGIN
        PRINT 'Command inserted';
        ROLLBACK TRANSACTION;  -- Prevent insertion
    END
END;

-- Test inserting a new row
INSERT INTO product VALUES(106, 'ragi', 4, 500, '2024-09-08');

SELECT * FROM product;

INSERT INTO product VALUES(102, 'jawar', 5, 600, '2024-06-08');

SELECT * FROM product;


USE ms254053;

-- Create the backup table for deleted rows
CREATE TABLE prod_details(
    item_code NUMERIC(10),
    name VARCHAR(22),
    quantity NUMERIC(8),
    price NUMERIC(10,2),
    deleted_date DATE
);

SELECT * FROM prod_details;

-- Create the DELETE trigger
CREATE TRIGGER trig_prod
ON product
FOR DELETE
AS
BEGIN
    DECLARE 
        @itemcode NUMERIC(10),
        @itemname VARCHAR(22),
        @quantity NUMERIC(8),
        @price NUMERIC(10,2);

    -- Get values from the deleted row
    SELECT 
        @itemcode = item_code,
        @itemname = name,
        @quantity = quantity,
        @price = price
    FROM deleted;

    -- Insert deleted row into backup table
    INSERT INTO prod_details (item_code, name, quantity, price, deleted_date)
    VALUES (@itemcode, @itemname, @quantity, @price, GETDATE());

    PRINT 'Trigger fired: delete operation';
END;

-- Test the trigger
DELETE FROM product WHERE item_code = 103;

SELECT * FROM prod_details;


USE ms254053;

-- Create the modified product backup table
CREATE TABLE product_modified(
    item_code NUMERIC(10),
    name VARCHAR(20),
    quantity NUMERIC(8),
    price NUMERIC(10,2),
    update_date DATE
);

-- Create the UPDATE trigger
CREATE TRIGGER tri_item
ON product
FOR UPDATE
AS
BEGIN
    DECLARE 
        @itemcode NUMERIC(10),
        @itemname VARCHAR(20),
        @quantity NUMERIC(8),
        @price NUMERIC(10,2);

    -- Check if 'name' column is being updated
    IF UPDATE(name)
    BEGIN
        PRINT 'Cannot update name - trigger fired';
        ROLLBACK TRANSACTION;
    END
    ELSE
    BEGIN
        -- Get values from inserted row
        SELECT 
            @itemcode = item_code,
            @itemname = name,
            @quantity = quantity,
            @price = price
        FROM inserted;

        -- Insert the updated row into product_modified
        INSERT INTO product_modified (item_code, name, quantity, price, update_date)
        VALUES (@itemcode, @itemname, @quantity, @price, GETDATE());

        PRINT 'Trigger fired - inserted into product_modified';
    END
END;

-- Test the trigger
-- This will fail because name is being updated
UPDATE product SET name = 'jaggery' WHERE item_code = 101;

-- This will succeed and insert into product_modified
UPDATE product SET price = 465 WHERE item_code = 101;

-- Check the modified table
SELECT * FROM product_modified;


`
};

export default program30;
