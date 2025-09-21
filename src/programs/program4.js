const program4 = {
  id: 4,
  title: "Program 4 - BESCOM Electricity Bill",
  lang: "c",
  code: `#include <stdio.h>
#include <string.h>
#include <ctype.h> 

int main()
{
    int MID, prev, pres;
    float bamt, units;
    char type;

    printf("Enter the meter ID: ");
    scanf("%d", &MID);

    printf("\\nEnter the Previous reading: ");
    scanf("%d", &prev);

    printf("\\nEnter the Present reading: ");
    scanf("%d", &pres);

    printf("\\nEnter the Customer Type (D: Domestic, B: Business): ");
    scanf(" %c", &type);

    if(toupper(type) != 'D' && toupper(type) != 'B')
    {
        printf("Enter valid customer type\\n");
        return 0;
    }

    units = pres - prev;

    if(toupper(type) == 'D')  // Domestic
    {
        if(units <= 200)
            bamt = units * 2.00;
        else if(units <= 400)
            bamt = 200 * 2.00 + (units - 200) * 4.50;
        else
            bamt = 200 * 2.00 + 200 * 4.50 + (units - 400) * 8.00;
    }
    else   // Business
    {
        if(units <= 200)
            bamt = units * 8.00;
        else if(units <= 400)
            bamt = 200 * 8.00 + (units - 200) * 15.00;
        else
            bamt = 200 * 8.00 + 200 * 15.00 + (units - 400) * 22.00;
    }

    printf("\\n-------------");
    printf("\\nBESCOM BILL");
    printf("\\nMeter ID: %d", MID);
    printf("\\nCustomer type: %c", toupper(type));
    printf("\\nPrevious Reading: %d", prev);
    printf("\\nPresent Reading: %d", pres);
    printf("\\nUnits Consumed: %.2f", units);
    printf("\\nBill Amount: %.2f\\n", bamt);

    return 0;
}
`
};

export default program4;
