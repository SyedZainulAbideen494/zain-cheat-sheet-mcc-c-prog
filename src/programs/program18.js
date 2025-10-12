const program18 = {
  id: 18,
  title: "Program 18 - Demonstrate Union",
  lang: "c",
  code: `
#include <stdio.h>
#include <string.h>

int main()
{
    union uni
    {
        int a;
        char str[10];
        float f;
    } u;

    printf("Illustration of union");
    printf("\\n--------------------------");

    // Reading an integer
    printf("\\nReading an integer");
    printf("\\n--------------------------");
    printf("\\nEnter an integer: ");
    scanf("%d", &u.a);

    printf("\\na = %d", u.a);
    printf("\\nString = %s", u.str);   
    printf("\\nReal value = %.2f", u.f); // 2 decimal places

    // Reading a float
    printf("\\n\\nReading a real value");
    printf("\\n------------------------");
    printf("\\nEnter a floating point value: ");
    scanf("%f", &u.f);

    printf("\\na = %d", u.a);          
    printf("\\nString = %s", u.str);   
    printf("\\nReal value = %.2f", u.f); // 2 decimal places

    // Reading a string
    printf("\\n\\nReading a string");
    printf("\\n----------------------");
    printf("\\nEnter a string value: ");
    scanf("%s", u.str); // input a string (max 9 chars to avoid overflow)

    printf("\\na = %d", u.a);          
    printf("\\nString = %s", u.str);
    printf("\\nReal value = %.2f\\n", u.f); // 2 decimal places

    return 0;
}
`
};

export default program18;
