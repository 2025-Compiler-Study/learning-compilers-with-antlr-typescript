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

; 과제1
; define i32 @main() {
;   call void @write(i32 42)

;   ret i32 0
; }

; 과제2
; define i32 @main() {
;   %x = alloca i32
;   store i32 42, ptr %x
;   %out = load i32, ptr %x
;   call void @write(i32 %out)

;   ret i32 0
; }

; 과제3
; define i32 @main() {
;   %x = alloca i32
;   %val = call i32 @read()
;   store i32 %val, ptr %x
;   %out = load i32, ptr %x
;   call void @write(i32 %out)

;   ret i32 0
; }

; 과제4
define i32 @main() {
  %x = alloca i32
  %y = alloca i32
  %val = call i32 @read()
  %val2 = call i32 @read()
  store i32 %val, ptr %x
  store i32 %val2, ptr %y
  %out = load i32, ptr %x
  %out2 = load i32, ptr %y
  call void @write(i32 %out)
  call void @write(i32 %out2)

  ret i32 0
}
