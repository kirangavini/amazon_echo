function bin = dec2bin2(dec)
dec=11.1875;
number=floor(dec);
fraction=dec-number;
temp=fraction;
i=0;
p=1;
while i==0
   temp=temp*2;
 if temp>1
     bin(p)=1;
  temp=floor(temp);
 end
 if (0<temp)&&(temp<1)
  bin(p)=0;
  temp=temp;
 end
if temp==0
    i=i+1;
else
    p=p+1;
end
end 
