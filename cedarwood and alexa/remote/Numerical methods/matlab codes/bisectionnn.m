function root = bisection(f,a,b,epsilon)
% Program : bisection.m
%
% Purpose : find the root of a given single variable function within the
%           given interval
%
% Author :  Aamir Alaud Din
% Date :    17.09.2013
%
% Inputs :  At least three input arguments are required viz., function, initial point of the
%           interval, and final point of the interval
%
% Syntax :  root = bisection(f,a,b)
%           where f is an inline function 
%           e.g., f = inline('sin(x)','x');
%           a and b are the end point of the interval
%
% Example:  root = bisection(f,-3,5)
%           The fourth input argument is the stopping criteria
%           If the function value deceeds epsilon, the loop terminates
%           giving the root. Default is 1e-6.
%
% Syntax :  root = bisection(f,a,b,epsilon)
%
% Example:  root = bisection(f,1,2,1e-9)
%           where f is again an inline function as mentioned above
if (nargin < 3)
    disp('Wrong number of input arguments.');
elseif (nargin == 3)
    if (f(a)*f(b) >= 0)
        disp('The function has positive value at the end points of interval.');
        disp('The root can''t be found using bisection method, use some other method.');
        root = 'Root can''t be found using bisection method';
        return;
    else
        fprintf('Iteration\t\t\ta\t\t\tb\t\t\tm\t\t\tf(a)\t\t\tf(b)\t\t\tf(m)\n');
        fprintf('=========\t\t ======\t\t ======\t\t ======\t\t   ======\t\t   ======\t\t   ======\n');
        m = (a + b)/2;
        if (abs(f(m)) <= 1e-6)
            root = m;
            return;
        else
            Iter = 0;
            while (abs(f(m)) >= 1e-6)
                Iter = Iter + 1; 
                m = (a + b)/2;
                if(f(a)*f(m) > 0)
                    a = m;
                else
                    b = m;
                end
                fprintf('%3d',Iter);
                fprintf('%20.4f',a);
                fprintf('%12.4f',b);
                fprintf('%12.4f',m);
                fprintf('%14.4f',f(a));
                fprintf('%16.4f',f(b));
                fprintf('%16.4f',f(m));
                fprintf('\n');
            end
            root = m;
        end
    end
elseif (nargin == 4)
    if (f(a)*f(b) >= 0)
        disp('The function has positive value at the end points of interval.');
        disp('The root can''t be found using bisection method, use some other method.');
        root = 'Root can''t be found using bisection method';
        return;
    else
        fprintf('Iteration\t\t\ta\t\t\tb\t\t\tm\t\t\tf(a)\t\t\tf(b)\t\t\tf(m)\n');
        fprintf('=========\t\t ======\t\t ======\t\t ======\t\t   ======\t\t   ======\t\t   ======\n');
        m = (a + b)/2;
        if (abs(f(m)) <= epsilon)
            root = m;
            return;
        else
            Iter = 0;
            while (abs(f(m)) >= epsilon)
                Iter = Iter + 1; 
                m = (a + b)/2;
                if(f(a)*f(m) > 0)
                    a = m;
                else
                    b = m;
                end
                fprintf('%3d',Iter);
                fprintf('%20.4f',a);
                fprintf('%12.4f',b);
                fprintf('%12.4f',m);
                fprintf('%14.4f',f(a));
                fprintf('%16.4f',f(b));
                fprintf('%16.4f',f(m));
                fprintf('\n');
            end
            root = m;
        end
    end
end