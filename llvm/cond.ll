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

; equal and not equal
; define i32 @main() {
;   %n      = call i32 @read()
;   %result = alloca i32

;   %temp1 = sdiv i32 %n, 2 
;   %temp2 = mul i32 %temp1, 2 
;   %cond = icmp eq i32 %n, %temp2  ; icmp - integer compare

;   br i1 %cond, label %even, label %odd

; even:
;   store i32 0, ptr %result
;   br label %end

; odd:
;   store i32 1, ptr %result
;   br label %end

; end:
;   %out = load i32, ptr %result
;   call void @write(i32 %out)
;   ret i32 0
; }

; signed greater than
define i32 @main() {
  %x      = call i32 @read()
  %y      = call i32 @read()
  %result = alloca i32
  %cond = icmp sgt i32 %x, %y

  br i1 %cond, label %lgt, label %rge

lgt:
  store i32 %x, ptr %result
  br label %end

rge:
  store i32 %y, ptr %result
  br label %end

end:
  %out = load i32, ptr %result
  call void @write(i32 %out)
  ret i32 0
}