

let navBar = document.getElementById("navBar");
let footer = document.getElementById("footer");

let navBarcontainer = `  
      <nav class="navbar navbar-expand-lg bg-white sticky-top">

        <div class="container   p-0">
          <div class="row  align-items-center  flex-lg-row flex-row-reverse  py-lg-2 navbar-expand-lg navbar-collapse">
            <div class="col-lg-2 col-4 ">
              <a class="w-100" href="index.html">
                <div
                  class="navbar-brand d-flex justify-content-lg-start justify-content-end text-center  m-0 ">
                  <img class=" navbar-brand img-fluid" src="assets/imgs/home/logo.png"  />
                </div>

              </a>
      
            </div>
            <div class="col-lg-8 col-3 order-lg-0 order-last ">
              <div class=" nav-container w-100 ">
                <a class="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 9.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 14.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 19.5H21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>  
                </a>
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                  aria-labelledby="offcanvasNavbarLabel">
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                      <a class="navbar-brand  py-2 text-center  m-0" href="index.html">
                        <img class="" src="assets/imgs/home/logo.png" />
                      </a>
                    </h5>
                    <button type="button" class="btn-close d-flex justify-content-center align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                      <i class="fa-solid fa-xmark text-black"></i>
                    </button>
                  </div>
      
                  <div class="offcanvas-body header ">
      
                    <ul class="navbar-nav  gap-lg-3 gap-2  justify-content-lg-center   flex-fill align-items-lg-center" >

                      <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#home">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#about">About Us</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#pricing">Our Packages</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#faq">FAQ</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact Us</a>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
                            <div class="col-lg-2 col-5 d-flex justify-content-lg-end justify-content-center">

                        <div class="language-switcher">
  <button class="lang-btn active">En</button>
  <button class="lang-btn">Ar</button>
                        </div>
                    </div>
          </div>
        </div>
</nav>
      <div class="floatwhatsapp btn-whatsapp-pulse btn-whatsapp-pulse-border">
      <i class="fa-brands fa-whatsapp "></i>
      </div>
      <div class="back-to-top" id="backTop">
      <i class="fa-solid fa-chevron-up"></i>
      </div>
  `
navBar.innerHTML = navBarcontainer;
// $(document).ready(() => {
//   $(window).scroll(function () {
//     let windowScroll = $(window).scrollTop();
//     if (windowScroll > 130) {
//       $("#backTop").fadeIn(10).css("display", "flex");

//     }
//     else {
//       $("#backTop").fadeOut(500)

//     }
//   })
//   $("#backTop").click(function () {
//     $("html,body").animate({ scrollTop: 0 }, 300)
//   })
// });




let FooterContainer = `<footer class="position-relative" style="z-index:11">
<div class="container py-md-5 py-3 ">
  <div class="row justify-content-between gy-2" data-aos="fade-up">
    <div class="col-lg-5 col-md-6 col-sm-10 text-white align-items-start gap-3">
      <div class="navbar-brand text-center m-0 mb-3 overflow-hidden d-flex align-items-center">
        <img class="w-auto " style="max-height: 80px;" src="assets/imgs/home/logo.png" alt="Splendor Logo">
      </div>
      <p class=" py-2  fw-normal fs-14" style="max-width: 80%;">
Your all-in-one platform for discovering and booking fitness and wellness services. Connect with trusted providers and start your journey toward a healthier lifestyle.    </p>

    </div>
    <div class="col-lg-2 col-sm-6 col-8">
      <h4 class="fw-semibold">خريطة الموقع</h4>
      <ul class="p-0 fs-6 list-footer" >
        <li class="py-1">
          <a href="index.html#home">
          الصفحة الرئيسية
          </a>
        </li>
        <li class="py-1">
          <a href="index.html#aboutus">
           من نحن
          </a>
        </li>
        <li class="py-1">
          <a href="index.html#services">
           الخدمات
          </a>
        </li>
        <li class="py-1">
          <a href="index.html#contactus">
        تواصل معنا
          </a>
        </li>
                      <li class=" py-lg-2 py-1 ">
                            <a href="https://eyeofsea.emcan-group.com/terms">
                                الشروط والأحكام                            </a>

                        </li>
                        <li class=" py-lg-2 py-1 ">
                            <a href="https://eyeofsea.emcan-group.com/policy">
                                سياسة الخصوصية                            </a>

                        </li>

      </ul>
      
    </div>

    <div class="col-lg-3 col-sm-6 order-md-0 order-last">
      <h4 class="fw-semibold">تواصل معنا</h4>
      <ul class="p-0 fs-6">
        <li class=" py-lg-2 py-1 "> <a href="tel:+ ٩٦٦٢٢٢٢٢٢٢١١" class="d-flex gap-lg-3 gap-2 align-items-center"
            target="_blank">
            <span>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.77762 10.9424C1.8296 9.28931 1.37185 7.93948 1.09584 6.57121C0.687622 4.54758 1.62181 2.57081 3.16938 1.30947C3.82345 0.776383 4.57323 0.958518 4.96 1.6524L5.83318 3.21891C6.52529 4.46057 6.87134 5.08139 6.8027 5.73959C6.73407 6.39779 6.26737 6.93386 5.33397 8.00601L2.77762 10.9424ZM2.77762 10.9424C4.69651 14.2883 7.70784 17.3013 11.0576 19.2224M11.0576 19.2224C12.7107 20.1704 14.0605 20.6282 15.4288 20.9042C17.4524 21.3124 19.4292 20.3782 20.6905 18.8306C21.2236 18.1766 21.0415 17.4268 20.3476 17.04L18.7811 16.1668C17.5394 15.4747 16.9186 15.1287 16.2604 15.1973C15.6022 15.2659 15.0661 15.7326 13.994 16.666L11.0576 19.2224Z"
                  stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                <path d="M13 2V4.8M17.9502 4.05078L15.9703 6.03068M20 9H17.2" stroke="white" stroke-width="1.5"
                  stroke-linecap="round" />
              </svg>

            </span>
            <span class="">+ ٩٦٦٢٢٢٢٢٢٢١١</span>
          </a>
        </li>
     <li class=" py-2">
          <a href="mailto:Mariamapp@gmail.com" class="d-flex  gap-3" target="_blank">
            <span>
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 6.25L11.1413 11.1558C14.2984 12.9481 15.7016 12.9481 18.8587 11.1558L27.5 6.25" stroke="white" stroke-width="1.875" stroke-linejoin="round"/>
<path d="M13.125 24.375C12.5421 24.3674 11.9585 24.3562 11.3735 24.3415C7.43791 24.2426 5.4701 24.1931 4.0562 22.773C2.64229 21.3529 2.60143 19.4359 2.51971 15.6017C2.49344 14.3689 2.49342 13.1434 2.5197 11.9105C2.60142 8.07641 2.64228 6.15935 4.05619 4.73924C5.4701 3.31912 7.43791 3.26966 11.3735 3.17072C13.7991 3.10975 16.2009 3.10976 18.6265 3.17074C22.5621 3.26968 24.5299 3.31915 25.9437 4.73926C27.3577 6.15936 27.3986 8.07643 27.4802 11.9106C27.4924 12.4781 27.4989 12.7456 27.4999 13.125" stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.75 21.25C23.75 22.2855 22.9105 23.125 21.875 23.125C20.8395 23.125 20 22.2855 20 21.25C20 20.2145 20.8395 19.375 21.875 19.375C22.9105 19.375 23.75 20.2145 23.75 21.25ZM23.75 21.25V21.875C23.75 22.9105 24.5895 23.75 25.625 23.75C26.6605 23.75 27.5 22.9105 27.5 21.875V21.25C27.5 18.1434 24.9816 15.625 21.875 15.625C18.7684 15.625 16.25 18.1434 16.25 21.25C16.25 24.3566 18.7684 26.875 21.875 26.875" stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </span>
            <span class="text-white">Mariamapp@gmail.com</span>
          </a>
        </li>
        <li class=" py-2">
          <a href="" class="d-flex  gap-3" target="_blank">
            <span>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6177 21.867C13.1841 22.273 12.6044 22.5 12.0011 22.5C11.3978 22.5 10.8182 22.273 10.3845 21.867C6.41302 18.126 1.09076 13.9469 3.68627 7.87966C5.08963 4.59916 8.45834 2.5 12.0011 2.5C15.5439 2.5 18.9126 4.59916 20.316 7.87966C22.9082 13.9393 17.599 18.1389 13.6177 21.867Z" stroke="white" stroke-width="1.875"/>
                <path d="M15.5 11.5C15.5 13.433 13.933 15 12 15C10.067 15 8.5 13.433 8.5 11.5C8.5 9.567 10.067 8 12 8C13.933 8 15.5 9.567 15.5 11.5Z" stroke="white" stroke-width="1.875"/>
                </svg>
                

            </span>
            <span class="text-white">الدمام ٣٢٣٢٤، الفرسان، الدمام- طريق الرياض السريع خلف اسواق العثيم</span>
          </a>
        </li>
      </ul>


    </div>
        <div class="col-lg-2 col-sm-6 col-4 align-items-lg-start align-items-end  d-flex justify-content-end">
   
            <ul class="social d-flex px-0 py-2 flex-column gap-3 mb-0">
      <li>
        <a target="_blank" href="#"><i class="fa-brands fa-x-twitter icon">
          </i></a>
      </li>
      <li>
        <a target="_blank" href="#">
          <i class="fab fa-facebook-f icon"></i>
        </a>
      </li>
      <li>
        <a target="_blank" href="#"><i class="fa-brands fa-snapchat icon">
          </i></a>
      </li>
      <li>
        <a target="_blank" href="#"><i class="fa-brands fa-tiktok icon">
          </i></a>
      </li>
    </ul>

    </div>
  </div>
</div>
  <div class="container py-2">

    <div class="row justify-content-center  py-2 fw-medium border-top">
      <div class="col-12   text-center  emcan px-0">
          © 2025 Fit. All right reserved.
      Powered by
          <a class="fw-bold text-white text-decoration-underline" style="opacity: 1; font-size:inherit" target="_blank"
            href="https://emcan-group.com/en">
            Emcan Solutions</a>
      </div>



    </div>
  </div>

</footer>

  `
footer.innerHTML = FooterContainer;




document.addEventListener("DOMContentLoaded", function () {
  const offcanvasLinks = document.querySelectorAll(".offcanvas a");
  const offcanvas = document.querySelector(".offcanvas");

  offcanvasLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    });
  });
});

$(document).ready(() => {
  $(window).scroll(function () {
    let windowScroll = $(window).scrollTop();
    if (windowScroll > 130) {
      $("#backTop").fadeIn(10).css("display","flex");


    }
    else {
      $("#backTop").fadeOut(500)
  
    }
  })
  $("#backTop").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 300)
  })
  });

  $(document).ready(() => {
    AOS.init({
    duration: 800,
    once: true,
    offset: 80
  });
  });
  document.addEventListener('DOMContentLoaded', function () {


    const htmlTag = document.documentElement;
    const htmlLang = htmlTag.lang.toLowerCase();
    function updateLanguageFromHtmlLang() {
    if (htmlLang === "ar") {
    htmlTag.setAttribute("dir", "rtl");
    document.body.style.direction = "rtl"
    } else {
    htmlTag.setAttribute("dir", "ltr");
    document.body.style.direction = "ltr"
    }
    }
    
    updateLanguageFromHtmlLang();
    });

    const langButtons = document.querySelectorAll(".lang-btn");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Scroll-spy: highlight nav link for visible section
(function () {
  const sectionIds = ["home", "about", "pricing", "faq", "contact"];
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function setActive(id) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#" + id) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();