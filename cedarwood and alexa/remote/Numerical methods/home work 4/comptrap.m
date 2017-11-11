f=@(x) x.*exp(x);
a=input('lower limit of the integral ');
b=input('upper limit of the integral ');
n=input('no. of segments ');
h=(b-a)/n;
I=(h/2).*(f(a)+2.*sum(arrayfun(@(i) f(a+(i.*h)),1:n-1))+f(b));
fprintf('The result of integration is %f\n',I);