const program2 = {
  id: 2,
  title: "Program 2 - Sum of Two Numbers (Java)",
  lang: "java",
  code: `import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter two numbers: ");
    int a = sc.nextInt();
    int b = sc.nextInt();

    int sum = a + b;
    System.out.println("Sum = " + sum);
  }
}`
};

export default program2;
