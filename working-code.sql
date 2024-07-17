/*
list of 2024 xactions
- 171847 -
*/
select * from HISTTRN
where number in 
(
select number
from histhd
where confnum = 0
)
and trandate > '20231231'