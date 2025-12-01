const program3 = {
  id: 3,
  title: "Program 3 - Odd or Even Checker (Java)",
  lang: "java",
  code: `import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int n = sc.nextInt();

    if (n % 2 == 0)
      System.out.println(n + " is Even");
    else
      System.out.println(n + " is Odd");
  }
}`
};

export default program3;
