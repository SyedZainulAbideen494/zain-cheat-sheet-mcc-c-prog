const program15 = {
  id: 15,
  title: "Program 15 - Name Sorting",
  lang: "c",
  code: `#include <stdio.h>
#include <string.h>

int main() {
    char names[25][20], sorted[25][20], temp[20];
    int n, i, j;

    printf("\\nHow many names? ");
    scanf("%d", &n);

    printf("\\nEnter the names:\\n");
    for (i = 0; i < n; i++) {
        printf("Name %d: ", i + 1);
        scanf("%s", names[i]);
        strcpy(sorted[i], names[i]); // copy original names into sorted array
    }

    // Sorting names in alphabetical order
    for (i = 0; i < n - 1; i++) {
        for (j = i + 1; j < n; j++) {
            if (strcmp(sorted[i], sorted[j]) > 0) {
                strcpy(temp, sorted[i]);
                strcpy(sorted[i], sorted[j]);
                strcpy(sorted[j], temp);
            }
        }
    }

    // Printing results
    printf("\\nOriginal\\tAlphabetical\\tReverse Alphabetical\\n");
    printf("------------------------------------------------------\\n");

    for (i = 0; i < n; i++) {
        printf("%-15s %-15s %-15s\\n", names[i], sorted[i], sorted[n - i - 1]);
    }

    return 0;
}
`
};

export default program15;
