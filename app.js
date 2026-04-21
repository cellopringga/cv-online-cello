$(document).ready(function () {
  
  function loadPage(page) {
    const content = $("#content");
    
    // Smooth Transition Out
    content.css({ opacity: 0, transform: 'translateY(20px)' });

    setTimeout(function() {
      content.load(page, function (response, status, xhr) {
        if (status == "error") {
          content.html("<div class='error'><h3>Oops!</h3><p>Gagal memuat konten.</p></div>");
        }
        
        // Smooth Transition In
        content.css({ opacity: 1, transform: 'translateY(0)', transition: 'all 0.5s ease' });
        
        // Re-init functions
        if(page === 'contact.html') initContactForm();
        if(page === 'github.html') fetchGitHubData();
      });
    }, 250);
  }

  $("#mainNav button").click(function () {
    $("#mainNav button").removeClass("active");
    $(this).addClass("active");
    loadPage($(this).data("page"));
  });

  // Default Initial Load
  loadPage("home.html");

  // --- Fungsi Tambahan Tetap Sama Namun Lebih Optimal ---
  function initContactForm() {
    $("#name").val(localStorage.getItem("contact_name"));
    $("#email").val(localStorage.getItem("contact_email"));

    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      alert("Pesan Terkirim! (Simulasi)");
      localStorage.setItem("contact_name", $("#name").val());
      localStorage.setItem("contact_email", $("#email").val());
    });
  }

  function fetchGitHubData() {
    const username = "cellopringga";
    $("#githubContent").html("<p class='loading'>Menghubungkan ke GitHub API...</p>");
    
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      success: function (user) {
        let html = `
          <div style="text-align:center" class="page-enter">
            <img src="${user.avatar_url}" style="width:140px; border-radius:50%; border: 4px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.1)">
            <h2 style="margin-top:15px">${user.name || user.login}</h2>
            <p style="color:#64748b">${user.bio || 'Tech Enthusiast'}</p>
            <div class="grid" style="margin-top:30px">
               <div class="card"><strong>${user.public_repos}</strong><br>Repositories</div>
               <div class="card"><strong>${user.followers}</strong><br>Followers</div>
            </div>
          </div>
        `;
        $("#githubContent").html(html);
      }
    });
  }
});
