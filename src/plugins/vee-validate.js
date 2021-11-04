import Vue from 'vue';
import {extend, validate, localize} from "vee-validate";
import {required, email, min, max, numeric, alpha} from "vee-validate/dist/rules";
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import kz from '../locales/kz.json'
import ru from '../locales/ru.json'


const messages = {
  kz,
  ru
}

const i18n = new VueI18n({
  locale: localStorage.getItem('selectedLang') || 'ru',
  messages: {
    ru,
    kz
  }
});


extend("required", {
  ...required,
  message: i18n.t("validation.required")
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: i18n.t("validation.confirm_password")
});


extend("email", {
  ...email,
  message: i18n.t("validation.mail")
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
  message: i18n.t("validation.iin_length", {min})
});

extend("validateMaxIIN", {
  async validate(value, { max }) {
    const res = await validate(value, `max:${max}`,)
    return res.valid;
  },
  params: ['max'],
  message: i18n.t("validation.validateMaxIIN", {max})
});


extend("documentID", {
  async validate(value, { min }) {
    const res = await validate(value, `min:${min}`,)
    return res.valid;
  },
  params: ['min'],
  message: i18n.t("validation.id_length", {max: max})
});

extend("documentIDMax", {
  async validate(value, { max }) {
    const res = await validate(value, `max:${max}`,)
    return res.valid;
  },
  params: ['max'],
  message: i18n.t("validation.id_length", {max: max})
});


extend("numberOnly", {
  ...numeric,
  message: i18n.t("validation.only_number")
});

extend("max", max);
extend("min", min);

extend("alpha", {
  ...alpha,
  message: i18n.t("validation.only_chair")
});

extend("numeric", {
  ...numeric,
  message: i18n.t("validation.you_phone")
});

extend("sum", {
  ...numeric,
  message: i18n.t("validation.only_number")
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
  message: i18n.t("validation.min_tenge", (min) => {
    return min})
});

extend("maxSum", {
  async validate(value, { max }) {
    return value <= max
  },
  params: ['max'],
  message: i18n.t("validation.max_tenge", (max) => {
    return max})
});



extend('digits_between', {
  async validate(value, { min, max }) {
    const res = await validate(value, `min:${min}|max:${max}`,)
    return res.valid;
  },
  params: ['min', 'max'],
  message: i18n.t("validation.password_length", {min: min, max: max})
});
