
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

; (a + b) * (a - b)
; define i32 @main() {
;   %a = call i32 @read()
;   %b = call i32 @read()

;   %sum  = add  i32 %a, %b
;   %diff = sub  i32 %a, %b
;   %result = mul  i32 %sum, %diff
  
;   call void @write(i32 %result)

;   ret i32 0
; }

; a * a + b * b
; define i32 @main() {
;   %a = call i32 @read()
;   %b = call i32 @read()

;   %aMul = mul  i32 %a, %a
;   %bMul = mul  i32 %b, %b
;   %result = add  i32 %aMul, %bMul
  
;   call void @write(i32 %result)

;   ret i32 0
; }

define i32 @main() {
  %a = call i32 @read()
  %b = call i32 @read()
  %c = call i32 @read()
  %d = call i32 @read()

  %x1 = add i32 %a, %b  ; ① x1 
  %y = mul i32 %x1, 2 ; ② x1  RAW(①) — 진짜 의존성
  %x2 = add i32 %c, %d ; ③ x2  WAR(②), WAW(①) — 가짜 의존성
  %z = add i32 %x2, 1 ; ④ x2  RAW(③) — 진짜 의존성
  
  call void @write(i32 %x2)
  call void @write(i32 %y)
  call void @write(i32 %z)

  ret i32 0
}


