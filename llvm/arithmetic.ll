declare i32 @printf(ptr, ...)
declare i32 @scanf(ptr, ...)

@.rfmt = private constant [3 x i8]  c"%d\00"
@.wfmt = private constant [4 x i8]  c"%d\0A\00"

define i32 @read() {
  %buf = alloca i32
  call i32 (ptr, ...) @scanf(ptr @.rfmt, ptr %buf)
  %val = load i32, ptr %buf
  ret i32 %val
}

define void @write(i32 %n) {
  call i32 (ptr, ...) @printf(ptr @.wfmt, i32 %n)
  ret void
}

define i32 @remainder(i32 %num1, i32 %num2) {
  %temp1 = sdiv i32 %num1, %num2
  %temp2 = mul i32 %temp1, %num2
  %result = sub i32 %num1, %temp2

  ret i32 %result
}


define i32 @main() {
  %a = call i32 @read()
  %b = call i32 @read()

  %sum  = add  i32 %a, %b
  %diff = sub  i32 %a, %b
  %prod = mul  i32 %a, %b
  %quot = sdiv i32 %a, %b
  ; %rem = srem i32 %a, %b
  %rem = call i32 @remainder(i32 %a, i32 %b)
  

  call void @write(i32 %sum)
  call void @write(i32 %diff)
  call void @write(i32 %prod)
  call void @write(i32 %quot)
  call void @write(i32 %rem)

  ret i32 0
}