f=@(x) sin(x)+x.*cos(x)
xO=0
a=-5;
b=5;
for i=1:100
    c=(a+b)/2;
    if f(c)>0
        b=c;
    else
        a=c;
    end
end
a=-5;
b=5;
p=c;
for i=1:100
    c=(a+b)/2;
    er(i)=f(c)-f(p);
    if f(c)>0
        b=c;
    else
        a=c;
    end
end
fprintf('Root of given equation is %f\n',c)
fprintf('Root of given equation is %f',er)
