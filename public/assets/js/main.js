/**
* Template Name: iPortfolio
* Updated: React compatible version
*/

(function () {
  "use strict";


  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  if (headerToggleBtn) {

    function headerToggle() {

      const header = document.querySelector('#header');

      if (header) {
        header.classList.toggle('header-show');
      }

      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }

    headerToggleBtn.addEventListener('click', headerToggle);
  }



  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {

    navmenu.addEventListener('click', () => {

      const header = document.querySelector('#header');

      if (header && header.classList.contains('header-show')) {

        header.classList.remove('header-show');

        if (headerToggleBtn) {
          headerToggleBtn.classList.add('bi-list');
          headerToggleBtn.classList.remove('bi-x');
        }

      }

    });

  });



  /**
   * Dropdown toggle
   */
  document.querySelectorAll('.navmenu .toggle-dropdown')
    .forEach(navmenu => {

      navmenu.addEventListener('click', function (e) {

        e.preventDefault();

        this.parentNode.classList.toggle('active');

        if (this.parentNode.nextElementSibling) {
          this.parentNode.nextElementSibling.classList.toggle(
            'dropdown-active'
          );
        }

        e.stopImmediatePropagation();

      });

    });



  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');

  if (preloader) {

    window.addEventListener('load', () => {

      preloader.remove();

    });

  }



  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');


  function toggleScrollTop() {

    if (scrollTop) {

      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }

    }

  }


  if (scrollTop) {

    scrollTop.addEventListener('click', (e) => {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }


  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);



  /**
   * AOS Animation
   */
  function aosInit() {

    if (typeof AOS !== "undefined") {

      AOS.init({

        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false

      });

    }

  }


  window.addEventListener('load', aosInit);



  /**
   * Typed JS
   */
  const selectTyped = document.querySelector('.typed');


  if (selectTyped && typeof Typed !== "undefined") {


    let typed_strings =
      selectTyped.getAttribute('data-typed-items');


    if (typed_strings) {


      typed_strings = typed_strings.split(',');


      new Typed('.typed', {

        strings: typed_strings,

        loop: true,

        typeSpeed: 100,

        backSpeed: 50,

        backDelay: 2000

      });


    }

  }




  /**
   * Pure Counter
   */
  if (typeof PureCounter !== "undefined") {

    new PureCounter();

  }





  /**
   * Skills Animation
   */
  const skillsAnimation =
    document.querySelectorAll('.skills-animation');


  skillsAnimation.forEach((item) => {


    if (typeof Waypoint !== "undefined") {


      new Waypoint({

        element: item,

        offset: '80%',


        handler: function () {


          let progress =
            item.querySelectorAll('.progress .progress-bar');


          progress.forEach(el => {

            el.style.width =
              el.getAttribute('aria-valuenow') + '%';

          });


        }

      });


    }


  });





  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {


    GLightbox({

      selector: '.glightbox'

    });


  }





  /**
   * Swiper
   */
  function initSwiper() {


    document.querySelectorAll(".init-swiper")
      .forEach(function (swiperElement) {


        if (
          typeof Swiper !== "undefined" &&
          swiperElement.querySelector(".swiper-config")
        ) {


          let config =
            JSON.parse(
              swiperElement.querySelector(".swiper-config")
              .innerHTML.trim()
            );


          new Swiper(swiperElement, config);


        }


      });


  }


  window.addEventListener(
    "load",
    initSwiper
  );





  /**
   * Hash scrolling
   */
  window.addEventListener(
    'load',
    function () {


      if (window.location.hash) {


        const section =
          document.querySelector(window.location.hash);


        if (section) {


          setTimeout(() => {


            window.scrollTo({

              top: section.offsetTop,

              behavior: 'smooth'

            });


          },100);


        }


      }


    }
  );





  /**
   * Nav Scroll Spy
   */
  const navmenulinks =
    document.querySelectorAll('.navmenu a');



  function navmenuScrollspy() {


    navmenulinks.forEach(navmenulink => {


      if (!navmenulink.hash)
        return;


      const section =
        document.querySelector(navmenulink.hash);



      if (!section)
        return;



      let position =
        window.scrollY + 200;



      if (
        position >= section.offsetTop &&
        position <=
        section.offsetTop + section.offsetHeight
      ) {


        document
          .querySelectorAll('.navmenu a.active')
          .forEach(link =>
            link.classList.remove('active')
          );


        navmenulink.classList.add('active');


      }


    });


  }


  window.addEventListener(
    'load',
    navmenuScrollspy
  );


  document.addEventListener(
    'scroll',
    navmenuScrollspy
  );



})();