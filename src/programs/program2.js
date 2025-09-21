const program2 = {
  id: 2,
  title: "Program 2 - Employee Salary",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int emp_id;
    char type;
    float basic, da, hra, cca, pf, gross_sal, net_sal;
    
    printf("Enter employee ID: ");
    scanf("%d", &emp_id);

    printf("Enter employee Type (A/C): ");
    scanf(" %c", &type);   // space before %c skips leftover newline

    if((type != 'A') && (type != 'a') && (type != 'C') && (type != 'c'))
    {
        printf("\\nEnter valid employee Type");
    }
    else {
        printf("\\nEnter basic pay: ");
        scanf("%f", &basic);

        if(type == 'A' || type == 'a')
        {
            da = basic * 35 / 100;
            hra = basic * 25 / 100;
            cca = 400;
        }
        else
        {
            da = basic * 25 / 100;
            hra = basic * 20 / 100;
            cca = 200;
        }

        pf = basic * 12 / 100;
        gross_sal = basic + da + hra + cca;
        net_sal = gross_sal - pf;

        printf("\\n-------------");
        printf("\\nABC Organisation");
        printf("\\nPay slip");
        printf("\\n--------------");
        printf("\\nEmployee ID: %d", emp_id);
        printf("\\nEmployee Type: %c", type);
        printf("\\nBasic pay: %.2f", basic);
        printf("\\nDearness allowance: %.2f", da);
        printf("\\nHouse rent allowance: %.2f", hra);
        printf("\\nCity compensatory allowance: %.2f", cca);
        printf("\\nGross salary: %.2f", gross_sal);
        printf("\\nDeduction (PF): %.2f", pf);
        printf("\\n-------------------");
        printf("\\nNet salary: %.2f", net_sal);
        printf("\\n------------");
    }

    return 0;
}
`
};

export default program2;
