$(document).ready(function () {
  
  function loadPage(page) {
    const content = $("#content");
    
    // Efek transisi keluar yang halus
    content.fadeOut(300, function() {
      $(this).load(page, function (response, status) {
        if (status === "error") {
          $(this).html("<h2 class='section-title'>Oops!</h2><p>Gagal memuat konten.</p>");
        }
        
        // Memastikan semua gambar di dalam konten rapi
        $(this).find('img').css({'display': 'block', 'margin': '0 auto'});
        
        // Efek transisi masuk dengan slide-up
        $(this).hide().fadeIn(500).css({
          'transform': 'translateY(0)',
          'opacity': '1'
        });

        // Inisialisasi ulang fungsi jika diperlukan
        if(page === 'contact.html') initContactForm();
        if(page === 'github.html') fetchGitHubData();
      });
    });
  }

  // Navigasi Klik
  $("#mainNav button").click(function () {
    $("#mainNav button").removeClass("active");
    $(this).addClass("active");
    loadPage($(this).data("page"));
  });

  // WAJIB: Load halaman pertama saat dibuka
  loadPage("home.html");

  function initContactForm() {
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      alert("Terima kasih! Pesan Anda telah tersimpan.");
    });
  }

  function fetchGitHubData() {
    const username = "cellopringga";
    $("#githubContent").html("<p>Sedang memuat data...</p>");
    $.get(`https://api.github.com/users/${username}`, function (user) {
      let html = `
        <div class="page-enter">
          <img src="${user.avatar_url}" style="width:120px; border-radius:50%; border:5px solid white; box-shadow:0 10px 20px rgba(0,0,0,0.1)">
          <h2 class="section-title" style="margin-top:20px">${user.name || user.login}</h2>
          <p>${user.bio || 'Web Developer'}</p>
        </div>
      `;
      $("#githubContent").html(html);
    });
  }
});
