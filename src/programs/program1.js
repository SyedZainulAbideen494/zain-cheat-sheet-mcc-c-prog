const program1 = {
  id: 1,
  title: "Program 1 - Basic Arithmetic",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int a, b, s, d, p, r;
    float q;

    printf("Enter 2 integer values: ");
    scanf("%d %d", &a, &b);

    s = a + b;
    d = a - b;
    p = a * b;
    r = a / b;              // integer division
    q = (float) a / b;      // float division

    printf("%d + %d = %d\\n", a, b, s);
    printf("%d - %d = %d\\n", a, b, d);
    printf("%d * %d = %d\\n", a, b, p);
    printf("%d / %d = %d (integer division)\\n", a, b, r);
    printf("%d / %d = %.2f (float division)\\n", a, b, q);

    return 0;
}
`
};

export default program1;
