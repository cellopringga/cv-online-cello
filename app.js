function fetchGitHubData() {
    const username = "cellopringga"; // Username kamu
    const container = $("#githubContent");
    
    container.html("<p class='loading'>Menyelaraskan data dengan GitHub...</p>");

    // Ambil Data Profil
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      success: function (user) {
        let profileHtml = `
          <div class="profile-header" style="margin-bottom: 40px;">
            <div style="position: relative; display: inline-block;">
              <img src="${user.avatar_url}" style="width:140px; border-radius:50%; border: 6px solid white; box-shadow: 0 15px 30px rgba(0,0,0,0.15);">
              <div style="position: absolute; bottom: 10px; right: 10px; background: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>
            </div>
            <h2 class="section-title" style="margin-top:20px; margin-bottom: 5px;">${user.name || user.login}</h2>
            <p style="color: #64748b; font-weight: 500;">@${user.login}</p>
            <p style="margin: 15px auto; max-width: 500px; line-height: 1.6;">${user.bio || 'Passionate Developer & Student'}</p>
            
            <div class="grid" style="grid-template-columns: repeat(2, 1fr); max-width: 400px; margin: 20px auto;">
              <div class="card" style="padding: 15px;">
                <h3 style="color: var(--primary); font-size: 1.5rem;">${user.public_repos}</h3>
                <p style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Repositories</p>
              </div>
              <div class="card" style="padding: 15px;">
                <h3 style="color: var(--primary); font-size: 1.5rem;">${user.followers}</h3>
                <p style="font-size: 0.8rem; color: #94a3b8; text-transform: uppercase;">Followers</p>
              </div>
            </div>
          </div>
          
          <h3 style="margin-bottom: 25px; text-align: left; font-weight: 700; color: #1e293b;">
            <i class="fa-solid fa-code-branch" style="color: var(--primary);"></i> Latest Repositories
          </h3>
          <div id="repoList" class="grid" style="text-align: left;"></div>
        `;
        
        container.html(profileHtml);

        // Ambil Daftar Repository
        $.get(user.repos_url + "?sort=updated&per_page=6", function (repos) {
          repos.forEach(repo => {
            $("#repoList").append(`
              <div class="card repo-card" style="padding: 20px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <i class="fa-regular fa-folder-open" style="font-size: 1.2rem; color: var(--primary);"></i>
                    <span style="font-size: 0.7rem; background: #f1f5f9; padding: 4px 10px; border-radius: 20px; color: #475569;">
                      ${repo.language || 'Code'}
                    </span>
                  </div>
                  <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: #1e293b; font-weight: 700; font-size: 1.1rem;">
                    ${repo.name}
                  </a>
                  <p style="font-size: 0.85rem; color: #64748b; margin-top: 8px; line-height: 1.4;">
                    ${repo.description || 'No description provided.'}
                  </p>
                </div>
                <div style="margin-top: 15px; font-size: 0.75rem; color: #94a3b8;">
                  <i class="fa-regular fa-star"></i> ${repo.stargazers_count} Stars
                </div>
              </div>
            `);
          });
        });
      },
      error: function () {
        container.html("<div class='card'><p>Gagal mengambil data dari GitHub. Cek koneksi atau username anda.</p></div>");
      }
    });
  }
