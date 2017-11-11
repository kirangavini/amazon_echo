x=input('x=');
i=1;
iteration=0;
y=floor(x);
fract=x-y;
p=[];
if fract==0
    p=0;
end;
while fract~=0
    fract=fract*2;
    if fract>=1
        p(i)=1;
        fract=fract-floor(fract);
        iteration=iteration+1;
    else 
        p(i)=0;
        iteration=iteration+1;
    end;
    if iteration==7
        break;
    end
    i=i+1;
end;
disp('the binary form of the fractional part is');
disp(p);


j = 1;
q = floor(y/2);
r = rem(y, 2);
bin(j) = num2str(r(j));
while 2 <= q
    y = q;
    j = j + 1;
    q = floor(y/2);
    r = rem(y, 2);
    bin(j) = num2str(r);
end
bin(j + 1) = num2str(q);
bin = fliplr(bin);







Binary_Before_Dec= bin;

Binary_After_Dec=p;
BBDLen = length(Binary_Before_Dec);
BADLen = length(Binary_After_Dec);
for j = 1:1:BBDLen
    str1(j) = num2str(Binary_Before_Dec(j),1);
end
for i = 1:1:BADLen
    str2(i) = num2str(Binary_After_Dec(i),1);
end
catstr= [str1,'.',str2];
strA = ['The number ', num2str(x),' represented in fixed point binary format is '];
Final_Binary = [strA,catstr];
fprintf('\n');
disp(Final_Binary);
    