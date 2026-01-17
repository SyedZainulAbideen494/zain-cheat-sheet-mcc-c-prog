const program1 = {
  id: 1,
  title: "Program 1 - One Dimensional Array (Java)",
  lang: "java",
  code: `import java.util.Scanner;

public class OneDArray {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n;
        System.out.println("Enter number of elements:");
        n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter array elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("Array elements are:");
        for (int i = 0; i < n; i++) {
            System.out.println(arr[i]);
        }

        sc.close();
    }
}`
};

export default program1;
