const program12 = {
  id: 12,
  title: "Program 12 - Linear Search",
  lang: "c",
  code: `#include <stdio.h>

int linearSearch(int a[], int n, int k);

int main()
{
    int a[20], n, k, i, pos;
    printf("Linear Search");
    printf("\\n-----------");
    printf("\\nHow many elements? ");
    scanf("%d", &n);
    for(i=0;i<n;i++)
    {
        printf("\\na[%d]=",i);
        scanf("%d", &a[i]);
    }
    printf("\\nKey to search?");
    scanf("%d", &k);
    pos = linearSearch(a,n,k);
    if(pos==-1)
        printf("\\n%d is not found", k);
    else
        printf("\\n%d is found at position %d",k,pos);
    return 0;
}

int linearSearch(int a[], int n, int k)
{
    int i;
    for(i=0;i<n;i++)
    {
        if(a[i]==k)
            return i;
    }
    return -1;
}
`
};

export default program12;
