const program22 = {
  id: 22,
  title: "Program 22 - Bank File Operations (Read/Write/Append)",
  lang: "c",
  code: `
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct bank
{
    long accno;
    char name[25];
    float bal;
};

int main()
{
    FILE *bfp;
    struct bank act;
    float totalAsset = 0.0, maxBalance = 0.0;
    char wish = 'y';

    // Open the binary file in append + read mode
    bfp = fopen("bankunco.dat", "ab+");
    if(bfp == NULL)
    {
        printf("\\nBank file cannot be opened");
        exit(1);
    }

    printf("\\nKey in bank details");
    printf("\\n------------------------------------");

    // Input accounts
    do
    {
        printf("\\nAccount number: ");
        scanf("%ld", &act.accno);
        getchar(); // remove newline

        printf("Account Holder Name: ");
        fgets(act.name, sizeof(act.name), stdin);
        act.name[strcspn(act.name, "\\n")] = 0; // remove newline

        printf("Opening balance: ");
        scanf("%f", &act.bal);
        getchar(); // remove newline

        printf("\\n---------------------------------\\n");

        // Write to file
        fwrite(&act, sizeof(act), 1, bfp);

        printf("Any more accounts? (y/n): ");
        scanf("%c", &wish);
        getchar();

    } while(wish=='y' || wish=='Y');

    fclose(bfp);

    // Re-open file to read all accounts
    bfp = fopen("bankunco.dat", "rb");
    if(bfp == NULL)
    {
        printf("\\nBank file cannot be opened");
        exit(1);
    }

    printf("\\n           UNC BANK                  ");
    printf("\\n------------------------------------------");
    printf("\\n           Account Details               ");
    printf("\\nAcc No.       Name                 Balance");
    printf("\\n--------------------------------------------------\\n");

    while(fread(&act, sizeof(act), 1, bfp) == 1)
    {
        printf("%-12ld %-20s %.2f\\n", act.accno, act.name, act.bal);
        totalAsset += act.bal;
        if(act.bal > maxBalance)
            maxBalance = act.bal;
    }

    printf("\\nTotal Asset of Bank: %.2f", totalAsset);
    printf("\\nMaximum Balance: %.2f\\n", maxBalance);

    fclose(bfp);
    return 0;
}
`
};

export default program22;
