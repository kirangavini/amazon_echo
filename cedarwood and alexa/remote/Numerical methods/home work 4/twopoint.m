f=@(x) (x.^6)-(x^.2)*(sin(2*x));
a=input('Enter value of a: ');
b=input('enter value of b: ');
c(1)=input('Enter value of c1 in two point gaussian quadrature:');
c(2)=input('Enter value of c2 in two point gaussian quadrature: ');
x(1)=input('Enter first point of guess interval: ');
x(2)=input('Enter second point of guess interval: ');
L=(b-a)/2;
K=(b+a)/2;
I=(L*c(1)*f(L*x(1)+K))+(L*c(2)*f(L*x(2)+K));
fprintf('gauss interval of two point quadrature  is %f\n',I)  