% Define function
f=inline('sin(7*x)');
%Define Point at which derivative is computed
x0=1;

%Difference step size

dx=0.2;
 %Aaproximate value of derivative 
 
 D=(f(x0+dx/2)-f(x0-dx/2))/dx;
 %Display the result
 disp(['Derivative=',num2str(D)])
