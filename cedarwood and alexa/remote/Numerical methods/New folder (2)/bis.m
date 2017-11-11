 f=@(x) x.^3-x-1;
a=1;
b=2;
Error=1;
j=1;
i=0;
iteration=0;
if f(a)*f(b)>0
    fprintf(' this is not possible\n')
elseif f(a)*f(b)<0
     c=(a+b)/2;
end

for j=1:100 
     c(j)=(a+b)/2;
      if f(a)*f(c(j))<0
        b=c(j);
        c(j+1)=(a+b)/2;
      
        
      elseif f(a)*f(c(j))>0
        a=c(j);
        c(j+1)=(a+b)/2;
        
      end
      
      
      iteration=iteration+1;
      if iteration == 10
          break;
      end
end
Error=abs((c(j+1)-c(j))/c(j+1))*100;
  fprintf('the root for given equation is %f\n',c)  
      fprintf('approximation Error is %f',Error)