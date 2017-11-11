
          a=input('enter function:','s');
          f=inline(a)
          x(1)=input('enter first guess: ');
          x(2)=input('enter second guess: ');
          tol=input('enter tolerance: ');
          i=2;
          Error = 10;

       while (abs(Error) > tol)
          x(i+1)=x(i)-f(x(i))*(x(i)-x(i-1))/(f(x(i))-f(x(i-1)));
          Error = abs((x(i+1)-x(i))/x(i+1))*100;
          i = i+1;
       end
         disp(x(i+1));
         disp(Error);
         fprintf('Root of given equation is %f\n',x(i+1))
         fprintf('Approximate Error of given equation is %f',Error)
