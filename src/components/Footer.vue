<template>

  <footer style="margin-top: 80px;">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-3">
          <ul class="list-unstyled">
            <li>
              <a href="https://expresszaim.kz/" class="navbar-brand mr-4">
                <img
                    src="@/assets/image/logo-footer.svg"
                    class="navbar-brand-img d-none d-sm-block desktop-logo"
                    alt="..."
                />
                <img
                    src="@/assets/image/logo-footer.svg"
                    class="navbar-brand-img d-block d-sm-none"
                    alt="..."
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="col-sm-3">
          <ul class="list-unstyled">
            <li><a href="https://expresszaim.kz/about"><span>О компании</span></a></li>
            <li><a href="https://expresszaim.kz/#department"><span>Наши отделения</span></a></li>
          </ul>
        </div>
        <div class="col-sm-3">
          <ul class="list-unstyled">
            <li><a href="https://lk.expresszaim.kz/"><span>Личный кабинет</span></a></li>
            <li><a href="https://expresszaim.kz/how_to_get_credit"><span>Как получить кредит</span></a></li>
            <li><a href="https://expresszaim.kz/how_to_pay"><span>Как оплатить кредит</span></a></li>
            <li><a href="https://expresszaim.kz/docs"><span>Юридическая информация</span></a></li>
          </ul>
        </div>
        <div class="col-sm-3">
          <ul class="list-unstyled">
            <li class="locality-footer">
              <div class="block-phone text-right ml-auto mr-auto">
                <div class="phone-number text-right"><a href="tel:87711099990"><span>8&nbsp;7711&nbsp;</span>09&nbsp;99&nbsp;90</a></div>
                <div class="phone-text">с 9:00 до 19:00 без выходных</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="">
          <div class="col-12 border-top"></div>
        </div>
        <div class="row">
          <div class="col-sm-6"><p>© ТОО "МФО" Экспресс Займ" 2021</p></div><div class="col-sm-6 text-right"><p class="powered">{{$t('links.production', { value: 'Разработка сайта'})}} — <a target="_blank" href="http://www.web-design.kz">студия «Web-design.kz»</a></p></div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>
