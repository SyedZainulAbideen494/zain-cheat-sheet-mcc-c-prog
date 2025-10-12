const program19 = {
  id: 19,
  title: "Program 19 - Largest and second largest of 3 numbers using macros",
  lang: "c",
  code: `
#include <stdio.h>
#define Lar(a,b) ((a>b)?a:b)

int main()
{
    int a, b, c, l, sl;

    printf("\\nLargest and secound largest of 3 nos by using macros");
    printf("\\n------------------------------------------");
    printf("\\nEnter three numbers: ");
    scanf("%d%d%d", &a, &b, &c);

    l = Lar(Lar(a, b), c);

    if (l == a)
        sl = Lar(b, c);
    else if (l == b)
        sl = Lar(a, c);
    else
        sl = Lar(a, b);

    printf("\\nLargest = %d", l);
    printf("\\nSecond largest = %d\\n", sl);

    return 0;
}
`
};

export default program19;
