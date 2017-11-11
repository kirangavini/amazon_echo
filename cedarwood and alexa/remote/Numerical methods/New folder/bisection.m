      
      f=@(x) x^3-x-1;
        a=1;
        b=2;
        p=0;
        tol=input('enter tolerance: ');
        Error=1e-07;
   while (abs(Error) > tol) && f(a)*f(b)<0 
          p=0;
        c=(a+b)/2;
        Error=abs((f(c)-f(p))/f(c))*100;
        if f(a)*f(c)>0
        a=c;
        p=c;
        end
        if f(a)*f(c)<0
        b=c;
        p=c;
        end
   end
 fprintf('approximation Error is %f',Error)

 