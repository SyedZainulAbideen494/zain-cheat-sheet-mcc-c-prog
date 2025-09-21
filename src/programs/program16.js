const program16 = {
  id: 16,
  title: "Program 16 - String Reverse",
  lang: "c",
  code: `// Lab Program 16: Demo on Structure
#include <stdio.h>
#include <string.h>

struct Student {
    int sid;
    char name[20];
    char prog[20];
    int s1, s2, s3;
};

int main() {
    struct Student s[60];
    int n, i, total;
    float per;

    printf("\nHow many students? ");
    scanf("%d", &n);

    printf("\nEnter Student Details:\n");

    for (i = 0; i < n; i++) {
        printf("\nStudent %d\n", i + 1);

        printf("Student ID: ");
        scanf("%d", &s[i].sid);
        getchar();  // Clear newline after integer input

        printf("Name: ");
        fgets(s[i].name, sizeof(s[i].name), stdin);
        s[i].name[strcspn(s[i].name, "\n")] = 0;  // Remove trailing newline

        printf("Course: ");
        fgets(s[i].prog, sizeof(s[i].prog), stdin);
        s[i].prog[strcspn(s[i].prog, "\n")] = 0;

        printf("C Programming Marks: ");
        scanf("%d", &s[i].s1);

        printf("DBMS Marks: ");
        scanf("%d", &s[i].s2);

        printf("Discrete Maths Marks: ");
        scanf("%d", &s[i].s3);
    }

    // Display results
    printf("\nI BCA - A");
    printf("\n------------------------------------------------------------");
    printf("\nRegNo   Name               C-Prog  DBMS   DM     Total  %%");
    printf("\n------------------------------------------------------------");

    for (i = 0; i < n; i++) {
        total = s[i].s1 + s[i].s2 + s[i].s3;
        per = total / 3.0;

        printf("\n%-7d %-18s %-7d %-6d %-6d %-6d %.2f",
               s[i].sid, s[i].name, s[i].s1, s[i].s2, s[i].s3, total, per);
    }

    printf("\n------------------------------------------------------------\n");
    return 0;
}

`
};

export default program16;
