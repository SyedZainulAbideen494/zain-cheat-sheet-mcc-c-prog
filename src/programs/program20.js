const program20 = {
  id: 20,
  title: "Program 20 - Create a file and write contents to it",
  lang: "c",
  code: `
#include <stdio.h>
#include <stdlib.h>

int main()
{
    FILE *fp;
    char ch;

    printf("Program to create a file and write contents to a file");
    printf("\\n----------------");

    fp = fopen("poem.txt", "w");
    if (fp == NULL)
    {
        printf("\\nThe file cannot be created");
        exit(1);
    }

    printf("\\nEnter char -> * to stop\\n");

    while ((ch = getchar()) != '*')
    {
        fputc(ch, fp);
    }

    fclose(fp);
    return 0;
}
`
};

export default program20;
