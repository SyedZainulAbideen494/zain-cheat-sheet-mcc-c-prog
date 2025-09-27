const program16 = {
  id: 16,
  title: "Program 16 - Pointer Arithmetic",
  lang: "c",
  code: `
#include <stdio.h>

int main()
{
    int a, b, *aptr, *bptr;
    float f, *fptr;
    char ch, *cptr;

    a = 25;
    b = 150;
    f = 34.50;
    ch = 'A';

    aptr = &a;
    bptr = &b;
    fptr = &f;
    cptr = &ch;

    printf("\\n---------pointer arithmetic------------");
    printf("\\na = %d", a);
    printf("\\nAddress of a = %u", aptr);
    printf("\\nAddress of a = %u", &a);
    printf("\\nValue of a = %d", *aptr);
    printf("\\nValue of a = %d", *(&a));

    printf("\\nf = %f", f);
    printf("\\nAddress of f = %u", fptr);
    printf("\\nAddress of f = %u", &f);
    printf("\\nValue of f = %f", *fptr);
    printf("\\nValue of f = %f", *(&f));

    printf("\\nc = %c", ch);
    printf("\\nAddress of c = %u", cptr);
    printf("\\nAddress of c = %u", &ch);
    printf("\\nValue of c = %c", *cptr);
    printf("\\nValue of c = %c", *(&ch));

    aptr++;
    printf("\\nAfter increment of aptr, the address is = %u", aptr);
    printf("\\nSubtraction bptr - aptr = %d", (int)(bptr - aptr));

    if (aptr > bptr)
        printf("\\nAddress of a = %u is larger than address of b = %u", aptr, bptr);
    else
        printf("\\nAddress of b = %u is larger than address of a = %u", bptr, aptr);

    return 0;
}
`
};

export default program16;
