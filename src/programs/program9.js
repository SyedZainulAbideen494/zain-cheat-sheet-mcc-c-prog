const program9 = {
  id: 9,
  title: "Program 9 - nCr (Combinations)",
  lang: "c",
  code: `#include <stdio.h>

long fact(int x)
{
    int i;
    long f = 1;
    for(i = 1; i <= x; i++)
        f = f * i;
    return f;
}

int main()
{
    int res, nmr, n, r;

    printf("Print value of n: ");
    scanf("%d", &n);
    printf("\\nPrint value of r: ");
    scanf("%d", &r);

    nmr = n - r;
    res = fact(n) / (fact(r) * fact(nmr));

    printf("\\n%d C %d = %d", n, r, res);

    return 0;
}
`
};

export default program9;
