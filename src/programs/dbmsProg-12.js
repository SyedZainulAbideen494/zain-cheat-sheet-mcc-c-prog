const program31 = {
  id: 31,
  title: "Program 12 - DBMS",
  lang: "c",
  code: `
  USE ms254053;
GO

-- Create employee table
CREATE TABLE employee(
    empcode INT PRIMARY KEY,
    ename VARCHAR(60),
    dname VARCHAR(60),
    basicsalary NUMERIC(10,2)
);
GO

-- Insert sample data
INSERT INTO employee VALUES
(1001, 'syed', 'sales', 150000),
(1002, 'Zain', 'HR', 65000),
(1003, 'Abideen', 'Marketing', 77000),
(1004, 'Adil', 'IT', 265000),
(1005, 'Sufiyan', 'IT services', 75000);
GO

-- Display all employees
SELECT * FROM employee;
GO

-- Declare variables for cursor
DECLARE 
    @empcode INT,
    @ename VARCHAR(60),
    @dname VARCHAR(60),
    @basicsalary NUMERIC(10,2),
    @counter INT = 0;

-- Declare cursor to fetch top 5 highest paid employees
DECLARE empdet CURSOR FOR
SELECT empcode, ename, dname, basicsalary
FROM employee
ORDER BY basicsalary DESC;

-- Open cursor
OPEN empdet;

PRINT 'Top 5 highest paid employees';
PRINT '---------------------------';

-- Fetch rows one by one
FETCH NEXT FROM empdet INTO @empcode, @ename, @dname, @basicsalary;

WHILE @@FETCH_STATUS = 0 AND @counter < 5
BEGIN
    PRINT 'Employee Code: ' + CAST(@empcode AS VARCHAR(10));
    PRINT 'Employee Name: ' + @ename;
    PRINT 'Designation: ' + @dname;
    PRINT 'Basic Salary: ' + CAST(@basicsalary AS VARCHAR(20));
    PRINT '---------------------------';

    SET @counter = @counter + 1;

    FETCH NEXT FROM empdet INTO @empcode, @ename, @dname, @basicsalary;
END
n
-- Close and deallocate cursor
CLOSE empdet;
DEALLOCATE empdet;
GO

`
};

export default program31;
