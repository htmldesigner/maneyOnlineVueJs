<template>
 <header class="shadow-sm bg-white">
  <div class="container">
   <nav class="navbar navbar-expand-md navbar-white bg-white">
    <a href="http://express-zaim.web-design.kz" class="navbar-brand mr-4">
     <img
      src="@/assets/image/brand.svg"
      class="navbar-brand-img d-none d-sm-block"
      alt="..."
     />
     <img
      src="@/assets/image/brand-m.svg"
      class="navbar-brand-img d-block d-sm-none"
      alt="..."
     />
    </a>




    <div class="dropdown lang">
      <LocaleChanger/>
<!--     <button-->
<!--      class="btn dropdown-toggle"-->
<!--      type="button"-->
<!--      id="dropdownMenu2"-->
<!--      data-toggle="dropdown"-->
<!--      aria-haspopup="true"-->
<!--      aria-expanded="false"-->
<!--     >-->
<!--      ru-->
<!--     </button>-->
<!--     <div class="dropdown-menu" aria-labelledby="dropdownMenu2">-->
<!--      <button class="dropdown-item" type="button">en</button>-->
<!--     </div>-->
    </div>



    <button
     class="navbar-toggler collapsed"
     type="button"
     data-toggle="collapse"
     data-target="#navbarCollapse"
     aria-controls="navbarCollapse"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <div class="navbar-toggler-icon">
      <div class="btn_row"></div>
      <div class="btn_row"></div>
      <div class="btn_row"></div>
     </div>
    </button>
    <div class="navbar-collapse collapse" id="navbarCollapse">
     <ul class="navbar-nav mr-auto ml-0 ml-sm-3">
      <li class="nav-item active">
       <a class="nav-link" href="https://express-zaim.web-design.kz/how_to_get_credit">Как получить кредит</a>
      </li>
      <li class="nav-item">
       <a class="nav-link" href="https://express-zaim.web-design.kz/how_to_pay">Как оплатить кредит</a>
      </li>
      <li class="nav-item">
       <a class="nav-link" href="https://express-zaim.web-design.kz/#department">Наши отделения</a>
      </li>
     </ul>
     <div class="block-phone text-right">
      <div class="phone-number text-right">
       <a href="tel:87711099990">87711099990</a>
      </div>
      <div class="phone-text">9:00 до 19:00 без выходных</div>
     </div>

     <ul v-if="this.isUserLoggedIn" class="nav navbar-nav navbar-right login-user">
      <li class="dropdown open">
       <a href="#" class="dropdown-toggle d-flex align-items-center" data-toggle="dropdown">
        <span class="glyphicon glyphicon-user"></span>&nbsp;
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
      class="btn btn-primary my-2 my-sm-0"
     >
      {{ $t('buttons.private_office', { value: 'Личный кабинет' }) }}
     </router-link>
    </div>
   </nav>
  </div>
 </header>
</template>

<script>
 import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
 import LocaleChanger from "./LocaleChanger";
 export default {
   components: {LocaleChanger},
  name: "NavBar",
  computed: {
   isUserLoggedIn(){
    return this.$store.getters.isUserLoggedIn
   }
  },
  data() {
   return {};
  },
  methods: {
  logOut(){
   this.$store.dispatch('logOut').then(()=>{
    // this.$router.push('/login')
     window.location.href = 'https://express-zaim.web-design.kz/'
   })

   }
  }
 };
</script>

<style>
</style>