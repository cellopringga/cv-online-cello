$(document).ready(function () {
  function loadPage(page) {
    const content = $("#content");
    content.fadeOut(200, function() {
      $(this).load(page, function (response, status) {
        if (status === "error") {
          $(this).html("<div class='card'><h2>Oops!</h2><p>Gagal memuat konten. Pastikan file " + page + " tersedia.</p></div>");
        }
        $(this).hide().fadeIn(300);
      });
    });
  }

  $("#mainNav button").click(function () {
    $("#mainNav button").removeClass("active");
    $(this).addClass("active");
    loadPage($(this).data("page"));
  });

  // Halaman awal default
  loadPage("home.html");
});
