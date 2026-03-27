async function loadSingleArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    try {
        // Fetching directly from posts.json in the same folder
        const response = await fetch('blogs/posts.json');
        const posts = await response.json();
        const currentPost = posts.find(p => p.id === postId);
        if (currentPost) {
            // 1. Fill in the header details
            document.getElementById('post-title').innerText = currentPost.title;
            document.getElementById('post-date').innerText = currentPost.date;
            document.getElementById('post-author').innerText = currentPost.author;
            
            const imgElement = document.getElementById('post-image');
            imgElement.src = currentPost.image;
            imgElement.alt = currentPost.title;
            imgElement.style.display = 'block'; 

            // 2. Fetch the actual Markdown file (e.g., blogs/cpp-memory.md)
            const mdResponse = await fetch(currentPost.file);
            const mdText = await mdResponse.text();

            // 3. Convert the Markdown text into HTML and inject it!
            document.getElementById('post-content').innerHTML = marked.parse(mdText);

            // 4. Tell Prism to highlight the code blocks we just created
            if (window.Prism) {
                Prism.highlightAll();
            }
        }
       
        else {
            document.getElementById('post-title').innerText = "Post Not Found";
            document.getElementById('post-content').innerHTML = "<p>Sorry, article missing.</p>";
        }
    } catch (error) {
        console.error("Error loading the article:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadSingleArticle);