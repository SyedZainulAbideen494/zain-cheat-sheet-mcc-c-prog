const program5 = {
  id: 5,
  title: "Program 5 - Rightmost Digit in Words",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int r, num;
    printf("Enter an integer: ");
    scanf("%d", &num);

    r = num % 10; // rightmost digit

    printf("\\nRightmost digit of %d = %d", num, r);

    switch (r) {
        case 0: printf("\\nZero"); break;
        case 1: printf("\\nOne"); break;
        case 2: printf("\\nTwo"); break;
        case 3: printf("\\nThree"); break;
        case 4: printf("\\nFour"); break;
        case 5: printf("\\nFive"); break;
        case 6: printf("\\nSix"); break;
        case 7: printf("\\nSeven"); break;
        case 8: printf("\\nEight"); break;
        case 9: printf("\\nNine"); break;
    }

    return 0;
}
`
};

export default program5;
