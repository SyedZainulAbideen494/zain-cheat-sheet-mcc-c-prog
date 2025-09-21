const program8 = {
  id: 8,
  title: "Program 8 - Prime Numbers",
  lang: "c",
  code: `#include <stdio.h>
#include <math.h>

int main()
{
    int lim, n, flag, f;
    printf("PRIME NUMBERS");
    printf("\\nUpto?");
    scanf("%d", &lim);

    if(lim == 0)
        printf("\\nYou have entered zero");
    else if(lim == 1)
        printf("\\nNeither prime nor composite");
    else
    {
        for(n = 2; n <= lim; n++)
        {
            flag = 0;
            for(f = 2; f <= sqrt(n); f++)
            {
                if(n % f == 0)
                {
                    flag = 1;
                    break;
                }
            }
            if(flag == 0)
                printf("\\n%d\\n", n);
        }
    }

    return 0;
}
`
};

export default program8;
