const program5 = {
  id: 5,
  title: "Program 5 - Search Two Numbers and Display Their Sum",
  lang: "c",
  code: `#include <stdio.h>

int main() {
    int n;
    int arr[20];
    int x, y, foundX = -1, foundY = -1;

    printf("Enter the size of the array: ");
    scanf("%d", &n);

    // Read array elements
    printf("Enter %d elements:\\n", n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // Search two elements
    printf("\\nEnter first number to search: ");
    scanf("%d", &x);

    printf("Enter second number to search: ");
    scanf("%d", &y);

    // Find first number
    for(int i = 0; i < n; i++) {
        if(arr[i] == x) {
            foundX = i;
            break;
        }
    }

    // Find second number
    for(int i = 0; i < n; i++) {
        if(arr[i] == y) {
            foundY = i;
            break;
        }
    }

    // Display result
    if(foundX != -1 && foundY != -1) {
        printf("\\nBoth numbers found!\\n");
        printf("%d + %d = %d\\n", x, y, x + y);
    } else {
        printf("\\nOne or both numbers not found in the array.\\n");
    }

    return 0;
}
`
};

export default program5;
