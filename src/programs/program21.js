const program21 = {
  id: 21,
  title: "Program 21 - Read contents from a file",
  lang: "c",
  code: `
#include <stdio.h>
#include <stdlib.h>

int main()
{
    FILE *fp;
    char ch;

    printf("Program to read contents from a file");
    printf("\\n---------------------------------");

    fp = fopen("poem.txt", "r");
    if(fp == NULL)
    {
        printf("\\nFile not found");
        exit(1);
    }

    while((ch = getc(fp)) != EOF)
    {
        printf("%c", ch);
    }

    fclose(fp);
    return 0;
}
`
};

export default program21;
