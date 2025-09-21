const program7 = {
  id: 7,
  title: "Program 7 - Fibonacci Series",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int ctr, F1 = 0, F2 = 1, s, n;
    
    printf("How many numbers to generate: ");
    scanf("%d", &n);
    
    if(n <= 0)
        printf("\\nEnter a positive number");
    else if(n == 1)
        printf("\\nFibonacci Series:\\n%d", F1);
    else
    {
        printf("\\nFibonacci Series");
        printf("\\n----------------\\n");
        printf("%d %d", F1, F2);  // first two numbers
        
        for(ctr = 3; ctr <= n; ctr++)
        {
            s = F1 + F2;
            printf(" %d", s);   // print on same line
            F1 = F2;
            F2 = s;
        }
        printf("\\n---------\\n");
    }
    
    return 0;
}
`
};

export default program7;
