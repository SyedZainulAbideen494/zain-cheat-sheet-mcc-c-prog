const program14 = {
  id: 14,
  title: "Program 14 - Array Sum",
  lang: "c",
  code: `#include <stdio.h>

int main() {
    int A[10][10], r, c, i, j;

    printf("\nEnter number of rows: ");
    scanf("%d", &r);

    printf("Enter number of columns: ");
    scanf("%d", &c);

    printf("\nEnter matrix elements:\n");
    for (i = 0; i < r; i++) {
        for (j = 0; j < c; j++) {
            printf("A[%d][%d] = ", i, j);
            scanf("%d", &A[i][j]);
        }
    }

    printf("\nMatrix A:\n");
    for (i = 0; i < r; i++) {
        for (j = 0; j < c; j++) {
            printf("%5d", A[i][j]);
        }
        printf("\n");
    }

    printf("\n-----------------\n");
    printf("Transpose of A:\n");
    printf("-----------------\n");

    for (i = 0; i < c; i++) {
        for (j = 0; j < r; j++) {
            printf("%5d", A[j][i]);
        }
        printf("\n");
    }

    return 0;
}

`
};

export default program14;
