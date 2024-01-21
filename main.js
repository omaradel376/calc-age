// تعريف المتغيرات للوصول إلى عناصر الصفحة
let year = document.querySelector("#year");
let month = document.querySelector("#month");
let day = document.querySelector("#day");
let numYear = document.querySelector(".num-year");
let numMonth = document.querySelector(".num-month");
let numDay = document.querySelector(".num-day");
let button = document.querySelector("button");

let yearsNormal = "";
let yearsIfMohthUnder0 = "";

// تعريف متغيرات للتحقق من صحة إدخال المستخدم
let checkYear = true;
let checkMonth = true;
let checkDay = true;

// مصفوفات تحتوي على عدد الأيام لكل شهر
let month30Day = [4, 6, 9, 11];
let month31Day = [1, 3, 5, 7, 8, 10, 12];

// إنشاء عنصر div لعرض الرسائل
let msg = document.createElement("div");
msg.className = "msg";
document.body.append(msg);

// تفعيل تابع عند إدخال قيمة في حقل السنة
year.oninput = function () {
  // تفعيل الزر عند إدخال قيمة في أي من حقول التاريخ
  button.disabled = false;
  // التحقق من صحة قيمة السنة وعرض رسالة الخطأ إذا لزم الأمر
  if (year.value > new Date().getFullYear() || year.value < 1) {
    showMsg();
    msg.innerHTML = `year must be before ${new Date().getFullYear()}`;
    year.style.backgroundColor = "red";
    year.style.color = "white";
    checkYear = false;
  } else {
    // إخفاء رسالة الخطأ وإعادة تعيين ألوان الحقل
    hideMsg();
    year.style.backgroundColor = "white";
    year.style.color = "black";
    checkYear = true;
    // التحقق من صحة اليوم بناءً على الشهر المحدد
    checkDayOfMonth();
  }
};

// تفعيل تابع عند إدخال قيمة في حقل الشهر
month.oninput = function () {
  // تفعيل الزر عند إدخال قيمة في أي من حقول التاريخ
  button.disabled = false;
  // التحقق من صحة قيمة الشهر وعرض رسالة الخطأ إذا لزم الأمر
  if (month.value > 12 || month.value < 1) {
    showMsg();
    msg.innerHTML = "Month must be from 1 to 12";
    month.style.backgroundColor = "red";
    month.style.color = "white";
    checkMonth = false;
  } else {
    // إخفاء رسالة الخطأ وإعادة تعيين ألوان الحقل
    hideMsg();
    month.style.backgroundColor = "white";
    month.style.color = "black";
    checkMonth = true;
    // التحقق من صحة اليوم بناءً على الشهر المحدد
    checkDayOfMonth();
  }
};

// تفعيل تابع عند إدخال قيمة في حقل اليوم
day.oninput = function () {
  // تفعيل الزر عند إدخال قيمة في أي من حقول التاريخ
  button.disabled = false;
  // التحقق من صحة قيمة اليوم وعرض رسالة الخطأ إذا لزم الأمر
  if (day.value > 31 || day.value < 1) {
    showMsg();
    msg.innerHTML = "day must be from 1 to (28-31)";
    day.style.backgroundColor = "red";
    day.style.color = "white";
    checkDay = false;
  } else {
    // إخفاء رسالة الخطأ وإعادة تعيين ألوان الحقل
    hideMsg();
    day.style.backgroundColor = "white";
    day.style.color = "black";
    checkDay = true;
    // التحقق من صحة اليوم بناءً على الشهر المحدد
    checkDayOfMonth();
  }
};

// تفعيل تابع عند النقر على الزر
button.onclick = function () {
  // التحقق من صحة القيم المدخلة قبل إجراء الحسابات
  if (checkYear == true && checkMonth == true && checkDay == true) {
    button.disabled = false;
    hideMsg();
    // حساب الفارق بين التاريخ المدخل والتاريخ الحالي
    numYear.innerHTML = new Date().getFullYear() - year.value;
    yearsNormal = numYear.innerHTML;
    numMonth.innerHTML = new Date().getMonth() + 1 - month.value;
    numDay.innerHTML = new Date().getDate() - day.value;

    // إجراء التعديلات اللازمة إذا كانت الفروق سالبة
    if (numDay.innerHTML < 0) {
      numMonth.innerHTML--;
      numDay.innerHTML = 31 - Math.abs(new Date().getDate() - day.value);
    }
    if (numMonth.innerHTML < 0) {
      numYear.innerHTML--;
      numMonth.innerHTML =
        12 - Math.abs(new Date().getMonth() + 1 - month.value);
      yearsIfMohthUnder0 = numYear.innerHTML;
      // console.log(numMonth.innerHTML)
      // this is very important condetion
      if (yearsIfMohthUnder0 == yearsNormal) {
        numMonth.innerHTML--;
      } else if (numMonth.innerHTML == 12) {
        numMonth.innerHTML--;
      } else {
        if (numDay.innerHTML > new Date().getDate()) {
          numMonth.innerHTML--;
        }
      }
    }
  } else {
    // إظهار رسالة الخطأ إذا كان هناك خطأ في إحدى الحقول
    button.disabled = true;
    showMsg();
    msg.innerHTML = `year must be between 1 to ${new Date().getFullYear()} <br>
      and month must be between (1-12) <br>
      day must be between 1- (28-31)
    `;
  }
};

// إظهار رسالة الخطأ
function showMsg() {
  msg.style.top = "0";
  msg.style.transition = ".3s";
}

// إخفاء رسالة الخطأ
function hideMsg() {
  msg.style.top = "-100%";
  msg.style.transition = "1s";
}

// التحقق من عدد الأيام في الشهر المحدد
function checkDayOfMonth() {
  if (month.value == 2 && day.value > 28) {
    button.disabled = true;
    msg.innerHTML = `month (${month.value}) has 28 days only`;
    showMsg();
  } else if (month30Day.includes(+month.value) && day.value > 30) {
    button.disabled = true;
    msg.innerHTML = `month (${month.value}) has 30 days only`;
    showMsg();
  } else {
    button.disabled = false;
    hideMsg();
  }
}
