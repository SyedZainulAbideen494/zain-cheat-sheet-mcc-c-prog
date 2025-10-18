const program13 = {
  id: 13,
  title: "Program 13 - Sorting of a Number",
  lang: "c",
  code: `#include <stdio.h>

int main()
{
    int a[20], b[20], i, j, t, n;
    printf("\\nHow many to sort? ");
    scanf("%d", &n);
    for(i=0;i<n;i++)
    {
        printf("\\na[%d]=", i);
        scanf("%d", &a[i]);
        b[i] = a[i];
    }
    for(i=0;i<n;i++)
    {
        for(j=i+1;j<n;j++)
        {
            if(a[i] < a[j])
            {
                t = a[i];
                a[i] = a[j];
                a[j] = t;
            }
        }
    }
    printf("\\nOriginal \\t Descending \\t Ascending");
    printf("\\n-----------------------------------");
    for(i=0;i<n;i++)
        printf("\\n%d\\t\\t%d\\t\\t%d", b[i], a[i], a[n-1-i]);
    printf("\\n-----------------------------------");
    return 0;
}
`
};

export default program13;
