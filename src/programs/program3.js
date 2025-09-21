const program3 = {
  id: 3,
  title: "Program 3 - BCA Marks Card",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int reg_no, c1, c2, c3, lang, eng, total;
    float per;
    
    printf("Enter the register no: ");
    scanf("%d", &reg_no);
    
    printf("\\nEnter the marks of core 1, core 2, core 3, language, english: ");
    scanf("%d %d %d %d %d", &c1, &c2, &c3, &lang, &eng);
    
    total = c1 + c2 + c3 + lang + eng;
    per = total / 5.0;
    
    printf("\\n------------------");
    printf("\\nMCC BCA - 1");
    printf("\\n------------------");
    printf("\\n1st BCA Marks card");
    printf("\\nDBMS: %d", c1);
    printf("\\nC Programming: %d", c2);
    printf("\\nMaths: %d", c3);
    printf("\\nLanguage: %d", lang);
    printf("\\nEnglish: %d", eng);
    
    if(per > 75)
        printf("\\n\\nDistinction");
    else if(per > 60)
        printf("\\nFirst class");
    else if(per > 50)
        printf("\\nSecond class");
    else if(per > 40)
        printf("\\nThird class");
    else
        printf("\\nFail");

    return 0;
}
`
};

export default program3;
