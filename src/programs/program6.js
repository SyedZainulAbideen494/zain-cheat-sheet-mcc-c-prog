const program6 = {
  id: 6,
  title: "Program 6 - Display 2D Array Elements with Indexes",
  lang: "c",
  code: `#include <stdio.h>

int main() {
    int rows, cols;

    // Read row and column size
    printf("Enter number of rows: ");
    scanf("%d", &rows);

    printf("Enter number of columns: ");
    scanf("%d", &cols);

    int arr[rows][cols];  // Declare 2D array

    // Read elements
    printf("Enter the elements of the 2D array:\\n");
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < cols; j++) {
            scanf("%d", &arr[i][j]);
        }
    }

    // Display elements with index
    printf("\\n2D Array elements with indexes:\\n");
    for(int i = 0; i < rows; i++) {
        for(int j = 0; j < cols; j++) {
            printf("Index [%d][%d] -> %d\\n", i, j, arr[i][j]);
        }
    }

    return 0;
}
`
};

export default program6;
