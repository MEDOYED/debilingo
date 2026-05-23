// // Імпортуємо функції для тестування з бібліотеки vitest
// import { describe, expect, it } from "vitest";
// // Імпортуємо нашу функцію, яку будемо тестувати
// import { cn } from "../web-app/src/shared/lib/styles/cn/cn";
// // describe створює "блок" або групу тестів для певної фічі.
// // Це допомагає організувати тести, коли їх багато.
// describe("Функція cn (об'єднання класів)", () => {
//   // it (або test) - це конкретний сценарій, який ми перевіряємо.
//   // Перший аргумент - це опис того, що має відбутися (людською мовою).
//   it("повинна просто з'єднувати звичайні рядки", () => {
//     // expect(що_ми_маємо).toBe(що_ми_очікуємо_отримати)
//     expect(cn("btn", "btn-primary")).toBe("btn btn-primary");
//   });
//   it("повинна ігнорувати пусті або недійсні значення (null, undefined, false)", () => {
//     const result = cn("btn", null, undefined, false, "", "active");
//     expect(result).toBe("btn active");
//   });
//   it("повинна правильно обробляти об'єкти (умови)", () => {
//     // Якщо значення властивості true - клас додається. Якщо false - ігнорується.
//     const result = cn({
//       btn: true,
//       "btn-disabled": false,
//       active: true,
//     });
//     expect(result).toBe("btn active");
//   });
//   it("повинна працювати з масивами", () => {
//     expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
//   });
//   it("повинна коректно працювати з міксом різних типів (рядки, об'єкти, масиви)", () => {
//     const result = cn("base-class", ["array-class"], { "obj-class": true, hidden: false }, null);
//     expect(result).toBe("base-class array-class obj-class");
//   });
// });
