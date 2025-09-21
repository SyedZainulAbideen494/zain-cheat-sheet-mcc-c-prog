const program11 = {
  id: 11,
  title: "Program 11 - Power Function (Recursion)",
  lang: "c",
  code: `#include <stdio.h>

float power(float x, int n)
{
    if(n == 0)
        return 1;
    else if(n > 0)
        return x * power(x, n - 1);
    else 
        return 1 / power(x, -n);
}

int main()
{
    float x;
    int n;

    printf("X = ");
    scanf("%f", &x);
    printf("\\nN = ");
    scanf("%d", &n);

    printf("\\n%.2f ^ %d = %.2f", x, n, power(x, n));

    return 0;
}
`
};

export default program11;
