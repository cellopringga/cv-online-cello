$(document).ready(function () {
  function loadPage(page) {
    const content = $("#content");
    content.fadeOut(300, function() {
      $(this).load(page, function (response, status) {
        if (status === "error") {
          $(this).html("<h2 class='section-title'>Oops!</h2><p>Gagal memuat konten.</p>");
        }
        $(this).hide().fadeIn(500);
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
