import {extend, validate, localize} from "vee-validate";
import {required, email, min, max, numeric} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Обязателно для заполнения"
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Подтверждение пароля не совпадает'
});


extend("email", {
  ...email,
  message: 'Неправильный формат адреса почты'
});

extend("minPhone", {
  async validate(value, { min }) {
    const res = await validate(value, `min:${min}`,)
    return res.valid;
  },
  params: ['min'],
  message: 'Минимум {min} символов'
});

extend("validateIIN", {
  async validate(value, { min }) {
    const res = await validate(value, `min:${min}`,)
    return res.valid;
  },
  params: ['min'],
  message: 'ИИН должен содержать {min} символов'
});

extend("max", max);
extend("min", min);

extend("numeric", {
  ...numeric,
  message: "Ваш номер телефона"
});

extend("sum", {
  ...numeric,
  message: "Только цифры"
});



extend("regex", {
  async validate(value, {numeric}) {
    const MOBILEREG = /^((1[3578][0-9])+\d{8})$/;
    return await validate(value , MOBILEREG.test(value))
  },
  message: "1111"
});



extend("minSum", {
  async validate(value, { min }) {
    return value >= min
  },
  params: ['min'],
  message: 'Минимум {min} тенге'
});

extend('digits_between', {
  async validate(value, { min, max }) {
    const res = await validate(value, `min:${min}|max:${max}`,)
    return res.valid;
  },
  params: ['min', 'max'],
  message: 'Пароль от {min} до {max} символов'
});
