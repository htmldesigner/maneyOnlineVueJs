<template>

  <header class="shadow-sm bg-blue">
    <div class="container">
      <nav class="navbar navbar-expand-md navbar-white bg-blue">
        <a href="https://expresszaim.kz/" class="navbar-brand mr-4">
          <img
              src="@/assets/image/brand.svg"
              class="navbar-brand-img d-none d-sm-block desktop-logo"
              alt="..."
          />
          <img
              src="@/assets/image/brand-m.svg"
              class="navbar-brand-img d-block d-sm-none"
              alt="..."
          />
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <div class="navbar-toggler-icon">
            <div class="btn_row"></div>
            <div class="btn_row"></div>
            <div class="btn_row"></div>
          </div>
        </button>
        <div class="navbar-collapse collapse" id="navbarCollapse">

          <ul class="navbar-nav mr-auto ml-auto">
            <li class="nav-item active">
              <a class="nav-link"
                 href="https://expresszaim.kz/how_to_get_credit">{{
                  $t('links.how_to_get_credit', {value: 'Как получить кредит'})
                }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 href="https://expresszaim.kz/how_to_pay">{{
                  $t('links.how_to_pay', {value: 'Как оплатить кредит'})
                }}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link"
                 href="https://expresszaim.kz/#department">{{ $t('links.department', {value: 'Наши отделения'}) }}</a>
            </li>
          </ul>

          <div class="block-phone text-right ml-auto mr-auto">
            <div class="phone-number text-right"><a href="tel:87711099990"><span>8&nbsp;7711&nbsp;</span>09&nbsp;99&nbsp;90</a>
            </div>
            <div class="phone-text">{{ $t('links.work_time', {value: 'с 9:00 до 19:00 без выходных'}) }}</div>
          </div>
          <div class="lang ml-auto mr-auto">

            <LocaleChanger/>

          </div>


          <ul v-if="this.isUserLoggedIn" class="nav navbar-nav navbar-right login-user">
            <li class="dropdown open">
              <a href="#" class="dropdown-toggle d-flex align-items-center" data-toggle="dropdown">
                <!--        <span class="glyphicon glyphicon-user white"></span>&nbsp;-->
                <span class="login-name">Аккаунт</span>
                <span class="glyphicon glyphicon-chevron-down"></span>
              </a>
              <ul class="dropdown-menu p-3">
                <li>
                  <div class="navbar-login navbar-login-session">
                    <div class="row">
                      <div class="col-lg-12">
                        <p class="mb-0">
                          <router-link to="/cabinet" class="btn btn-danger btn-block">Кабинет</router-link>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="navbar-login navbar-login-session">
                    <div class="row">
                      <div class="col-lg-12">
                        <p class="mb-0">
                          <a href="#" @click.prevent="logOut" class="btn btn-danger btn-block">Выйти</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <router-link
              v-else
              tag="button"
              to="/"
              class="btn my-2 my-sm-0 btn-sign px-1"
          >
            {{ $t('buttons.private_office', {value: 'Кабинет'}) }}
          </router-link>

        </div>
      </nav>
    </div>
  </header>

</template>

<script>
import LocaleChanger from "./LocaleChanger";

export default {
  components: {LocaleChanger},
  name: "NavBar",
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    }
  },
  data() {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut').then(() => {
        // this.$router.push('/login')
        window.location.href = 'https://expresszaim.kz/'
      })

    }
  },
  mounted() {
    if (/Android|webOS|iPhone|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      const lang = document.querySelector(".lang")
      if (lang) {
        const navBar = document.createElement("div")
        navBar.classList.add('navbar')
        lang.append(navBar)
      }
    }
  }
};
</script>

<style>
</style>
