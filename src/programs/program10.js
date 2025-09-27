const program10 = {
  id: 10,
  title: "Program 10 - Call by Value and Call by Reference (Swapping)",
  lang: "c",
  code: `#include <stdio.h>
void swap(int, int);
void swapref(int *, int *);

int main()
{
    int a, b;
    printf("\\nCall by value");
    printf("\\n-----------------");
    printf("\\nEnter 2 integer: ");
    scanf("%d%d", &a, &b);
    printf("\\nBefore swapping: a = %d, b = %d", a, b);
    swap(a, b);
    printf("\\nAfter swap function (call by value): a = %d, b = %d", a, b);

    printf("\\n\\nCall by reference");
    printf("\\n-----------------");
    printf("\\nBefore swapping: a = %d, b = %d", a, b);
    swapref(&a, &b);
    printf("\\nAfter swapping: a = %d, b = %d\\n", a, b);

    return 0;
}

void swap(int x, int y)
{
    int t;
    t = x;
    x = y;
    y = t;
}

void swapref(int *x, int *y)
{
    int t;
    t = *x;
    *x = *y;
    *y = t;
}
`
};

export default program10;
