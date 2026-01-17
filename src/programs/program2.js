const program2 = {
  id: 2,
  title: "Program 2 - Addition of Two Matrices (Java)",
  lang: "java",
  code: `public class Array2D {
    public static void main(String[] args) {

        int m = 2, n = 2;

        int[][] first = {
            {1, 2},
            {3, 4}
        };

        int[][] second = {
            {5, 6},
            {7, 8}
        };

        int[][] sum = new int[m][n];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                sum[i][j] = first[i][j] + second[i][j];
            }
        }

        System.out.println("Sum of the matrices:");
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print(sum[i][j] + "\\t");
            }
            System.out.println();
        }
    }
}`
};

export default program2;
