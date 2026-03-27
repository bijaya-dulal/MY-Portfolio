async function loadBlogPosts() {
    const container = document.getElementById('blog-container');
    if (!container) return; 

    try {
        // Fetching directly from posts.json in the same folder
        const response = await fetch('blogs/posts.json');
        const posts = await response.json();
        
        let htmlContent = '';

        posts.forEach(post => {
            htmlContent += `
            <div class="portfolio-box">
                <img src="${post.image}" alt="${post.title}">
                <div class="portfolio-layer">
                    <h4>${post.title}</h4>
                    <p>${post.excerpt}</p>
                    <a href="blog-post.html?id=${post.id}"><i class="bx bx-book-open"></i></a>
                </div>
            </div>
            `;
        });

        container.innerHTML = htmlContent;

        ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
        ScrollReveal().reveal('.portfolio-box', {origin: 'bottom'});

    } catch (error) {
        console.error("Error loading the blog posts:", error);
        container.innerHTML = "<p style='text-align:center; font-size:1.6rem;'>Unable to load blog posts.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);