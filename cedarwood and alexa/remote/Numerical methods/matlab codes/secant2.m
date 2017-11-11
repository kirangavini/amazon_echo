
 

x(1)=input('Enter first point of guess interval: ');
x(2)=input('Enter second point of guess interval: ');
n=input('Enter allowed Error in calculation: ');
iteration=0;
 
for i=2:1000
   x(i+1) = x(i) - (f(x(i)))*((x(i) - x(i-1))/(f(x(i)) - f(x(i-1))));
    iteration=iteration+1;
    if abs((x(i+1)-x(i))/x(i+1))*100>n
        root=x(i+1);
        iteration=iteration+1;
        error=abs((x(i+1)-x(i))/x(i+1))*100;
    else if abs((x(i+1)-x(i))/x(i+1))*100<n
            break
        end
        
    end
end
fprintf('Root of given equation is %f\n',root)
fprintf('error of given equation is %f',error)