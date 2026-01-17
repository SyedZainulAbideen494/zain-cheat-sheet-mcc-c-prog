const program3 = {
  id: 3,
  title: "Program 3 - Constructor Overloading (Java)",
  lang: "java",
  code: `import java.util.Scanner;

class Student_1 {
    int student_id;
    int course_id;
    String student_name;
    String course_name;

    Student_1() {
        student_id = 0;
        course_id = 0;
        student_name = "";
        course_name = "";
    }

    Student_1(int sid, int cid, String sname, String cname) {
        student_id = sid;
        course_id = cid;
        student_name = sname;
        course_name = cname;
    }

    void display() {
        System.out.println(student_id + "\\t\\t" +
                           course_id + "\\t\\t" +
                           student_name + "\\t\\t" +
                           course_name);
    }
}

public class Constructor_Overloading {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        Student_1[] obj = new Student_1[10];

        int sid, cid;
        String sname, cname;

        for (int i = 0; i < 3; i++) {
            System.out.println("Enter details for Student " + (i + 1));

            System.out.print("Student ID: ");
            sid = sc.nextInt();

            System.out.print("Course ID: ");
            cid = sc.nextInt();
            sc.nextLine();

            System.out.print("Student Name: ");
            sname = sc.nextLine();

            System.out.print("Course Name: ");
            cname = sc.nextLine();

            obj[i] = new Student_1(sid, cid, sname, cname);
        }

        System.out.println("\\nStudent Details:");
        System.out.println("Student_ID\\tCourse_ID\\tStudent_Name\\tCourse_Name");

        for (int i = 0; i < 3; i++) {
            obj[i].display();
        }

        sc.close();
    }
}`
};

export default program3;
