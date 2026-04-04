$(document).ready(function () {
  
  // Level 4: Interactive Navigation
  function loadPage(page) {
    $("#content").fadeOut(200, function () {
      $(this).load(page, function (response, status, xhr) {
        if (status == "error") {
          $(this).html("<p class='error'>Gagal memuat konten.</p>");
        }
        $(this).fadeIn(300);
        
        // Inisialisasi fitur setelah halaman dimuat
        if(page === 'contact.html') initContactForm();
        if(page === 'github.html') fetchGitHubData();
      });
    });
  }

  // Handle Klik Navigasi
  $("#mainNav button").click(function () {
    $("#mainNav button").removeClass("active");
    $(this).addClass("active");
    loadPage($(this).data("page"));
  });

  // Default Load
  loadPage("home.html");

  // Level 5 & 6: Smart Form & Data Keeper
  function initContactForm() {
    // Load data dari LocalStorage
    $("#name").val(localStorage.getItem("contact_name"));
    $("#email").val(localStorage.getItem("contact_email"));
    $("#message").val(localStorage.getItem("contact_message"));

    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const name = $("#name").val();
      const email = $("#email").val();
      const message = $("#message").val();

      // Simple Validation
      if (name.length < 3) {
        $("#nameError").text("Nama minimal 3 karakter");
        isValid = false;
      } else { $("#nameError").text(""); }

      if (!email.includes("@")) {
        $("#emailError").text("Format email salah");
        isValid = false;
      } else { $("#emailError").text(""); }

      if (isValid) {
        // Level 6: Simpan ke LocalStorage
        localStorage.setItem("contact_name", name);
        localStorage.setItem("contact_email", email);
        localStorage.setItem("contact_message", message);
        
        alert("Pesan Berhasil Terkirim & Tersimpan!");
      }
    });
  }

  // Level 7: API Explorer (GitHub)
  function fetchGitHubData() {
    const username = "cellopringga"; // Ganti dengan username GitHub kamu
    $("#githubContent").html("<p class='loading'>Sedang mengambil data GitHub...</p>");

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      success: function (user) {
        let html = `
          <div style="text-align:center">
            <img src="${user.avatar_url}" style="width:120px; border-radius:50%">
            <h3>${user.name || user.login}</h3>
            <p>${user.bio || 'Developer'}</p>
            <div class="grid">
              <div class="card"><strong>Repo:</strong> ${user.public_repos}</div>
              <div class="card"><strong>Followers:</strong> ${user.followers}</div>
            </div>
            <h4 style="margin-top:20px">Daftar Repository:</h4>
            <ul id="repoList" style="text-align:left; list-style:none; margin-top:10px"></ul>
          </div>
        `;
        $("#githubContent").html(html);

        // Ambil Repo
        $.get(user.repos_url, function (repos) {
          repos.slice(0, 5).forEach(repo => {
            $("#repoList").append(`<li class="card" style="margin-bottom:10px">
              <a href="${repo.html_url}" target="_blank" style="text-decoration:none; color: #46a3a7; font-weight:bold;">
                ${repo.name}
              </a>
              <p style="font-size:0.8rem">${repo.description || 'No description'}</p>
            </li>`);
          });
        });
      },
      error: function () {
        $("#githubContent").html("<p class='error'>Gagal memuat data GitHub. Pastikan username benar.</p>");
      }
    });
  }
});