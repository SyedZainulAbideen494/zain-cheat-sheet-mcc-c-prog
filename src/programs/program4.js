const program4 = {
  id: 4,
  title: "Program 4 - Display Array Elements with Indexes",
  lang: "c",
  code: `#include <stdio.h>

int main() {
    int n;
    int arr[20];

    printf("Enter the size of the array: ");
    scanf("%d", &n);

    // Read array elements
    printf("Enter %d elements:\\n", n);
    for(int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // Display elements with index
    printf("\\nArray elements with their indexes:\\n");
    for(int i = 0; i < n; i++) {
        printf("Index %d -> %d\\n", i, arr[i]);
    }

    return 0;
}
`
};

export default program4;
