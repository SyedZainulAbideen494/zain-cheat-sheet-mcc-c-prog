const program6 = {
  id: 6,
  title: "Program 6 - Reverse of an Integer",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int n, rev = 0, rem, temp;
    
    printf("Enter the integer: ");
    scanf("%d", &n);

    temp = n;  // store original number
    
    while(n != 0)
    {
        rem = n % 10;
        rev = rev * 10 + rem;
        n = n / 10;
    }

    printf("The reverse of %d is %d", temp, rev);

    return 0;
}
`
};

export default program6;
