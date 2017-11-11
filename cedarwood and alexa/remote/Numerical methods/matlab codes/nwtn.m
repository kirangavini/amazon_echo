
%***** MATLAB PROGRAM FOR NEWTON RAPHSON METHOD****!

%*************************************************!

%

% PROGRAMMED BY: AMIT BISWAL

% URL          : http://amitbiswal.blogspot.com

%

%*************************************************!

%---------NEWTON RAPHSON METHOD FORMULA-----------!

%

% x(n+1) = x(n) - (f(x)/f'(x))

% 

% ************************************************!

close all

clc

clear all



syms x

%---START OF FUNCTION-----------!

f= (x^2)+ (2*x) - 10

%---END OF FUNCTION-------------!

fdash=diff(f);

x=input('Enter the initial solution, x0=');

e=input('Enter the value of error, e=');

iteration=0;

error=1;

while (error>e)

iteration=iteration+1;

fprintf('********************Iteration no. %0.0f********************',iteration)

error=abs(x);

x=x-subs(f/fdash)

error=abs(x-error)

if(iteration>100) %exit condition for non-coverging solution

    break

end

end

fprintf('*************************RESULT****************************');

if(iteration>100)

    fprintf('\nSOLUTION NOT CONVERGING !\n TRY WITH DIFFERENT INITIAL SOLUTION/ERROR')

else

    fprintf('\nSolution x= %0.20f\nNumber of Iteration= %0.0f',x,iteration);

end

fprintf('\n***********************************************************');