import React, { useState, useEffect } from 'react';

// Наш хук
export default function useDebounce(value, delay) {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);
//   Состояние и сеттер для ожидания отложенного значения
  const [isPending, setIsPending] = useState(true)

  useEffect(
    () => {
        if (!isPending) {
            setIsPending(true);
        }
      // Выставить debouncedValue равным value (переданное значение) и убрать флажок загрузки
      // после заданной задержки
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsPending(false);
        }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
        return () => {
            clearTimeout(handler);
        };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return [isPending, debouncedValue];
}