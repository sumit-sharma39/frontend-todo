# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
\\\// Online C++ compiler to run C++ program online
#include <iostream>



using namespace std;
int main() {
    // Write C++ code here
    int num=123;
    int temp=num;
    int n=0 , s=0 , sum=0;
    while (num>0){
        n= num%10;
        sum= sum+n;
        num=num/10;
    }
    
    while(temp>0){
        n=temp%10; 123%10 =3 
        s=s*10+n; 30+2
        temp=temp/10;
    }
    
    
    
    cout<<s<<endl;
    cout<<sum;
    return 0;
}