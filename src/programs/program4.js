const program4 = {
  id: 4,
  title: "Program 4 - Method Overloading (Area of Shapes) (Java)",
  lang: "java",
  code: `import java.util.Scanner;

class Area {

    // Area of Square
    int area(int side) {
        return side * side;
    }

    // Area of Circle
    double area(double radius) {
        return 3.14 * radius * radius;
    }

    // Area of Rectangle
    int area(int length, int width) {
        return length * width;
    }
}

public class Shape {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        Area s = new Area();

        int x, l, w;
        double z;

        // Square
        System.out.print("Enter square side: ");
        x = in.nextInt();
        System.out.println("Area of square: " + s.area(x));

        // Circle
        System.out.print("Enter the radius: ");
        z = in.nextDouble();
        System.out.println("Area of circle: " + s.area(z));

        // Rectangle
        System.out.print("Enter length: ");
        l = in.nextInt();
        System.out.print("Enter width: ");
        w = in.nextInt();
        System.out.println("Area of rectangle: " + s.area(l, w));

        in.close();
    }
}`
};

export default program4;
