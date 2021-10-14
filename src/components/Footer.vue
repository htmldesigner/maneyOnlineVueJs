<template>
  <!-- FOOTER
        ================================================== -->
<!--  <footer class="py-4 py-md-4 bg-gray-200 d-none d-sm-block">-->
<!--    <div class="container">-->
<!--      <div class="row">-->
<!--        <div class="col copyright mb-3 mb-sm-0">© 2020, ТОО «МФО» Экспресс Займ»</div>-->
<!--        <div class="developed text-left text-md-right mb-3 ml-md-auto mb-sm-0"></div>-->
<!--        <div class="col developed text-sm-right mb-3">Разработка сайта — <a href="http://www.web-design.kz">Студия «Web-Design.kz»</a></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </footer>-->


  <footer class="py-4 py-md-4 bg-gray-200 d-none d-sm-block">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 copyright mb-3 mb-sm-0">© 2020, ТОО «МФО» Экспресс Займ»</div>
        <div class="col-lg-5 text-left  mb-1">
          <a href="https://expresszaim.kz/about" class="footer-menu-item">{{$t('links.about', { value: 'О компании'})}}</a>
          <a href="https://expresszaim.kz/news" class="footer-menu-item">{{$t('links.news', { value: 'Новости'})}}</a>
        </div>
        <div class="col-lg-4 developed text-sm-right mb-3">{{$t('links.production', { value: 'Разработка сайта'})}} — <a href="http://www.web-design.kz">Студия «Web-Design.kz»</a></div>
      </div>
    </div>
  </footer>


</template>

<script>
export default {};
</script>
