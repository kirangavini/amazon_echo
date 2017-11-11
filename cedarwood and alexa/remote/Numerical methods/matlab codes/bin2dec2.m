% For help see http://matlaboratory.blogspot.co.uk/2008/12/converting-decimal-to-binary-and-binary.html

function dec = bin2dec2(bin)
binstring = [];
bin=111;
if length(bin) > 1
     for i = 1:length(bin)
          tempstring = num2str(bin(i));
          binstring = [binstring,tempstring];
     end
else
     binstring=num2str(bin);
end
for i = 1:length(binstring);
     value(i)=str2double(binstring(i)) ...
     *(2^(length(binstring)-i));
end
dec=sum(value);
