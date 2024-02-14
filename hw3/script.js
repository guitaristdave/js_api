const ACCESS_KEY = 'goZO0AZxR0y2CJdHuplufeU_vAPgNrHI54yE_m9BDE0';
        const likeCountElement = document.getElementById('likeCount');
        const likeButton = document.getElementById('likeButton');
        const prevButton = document.getElementById('prevButton');
        let liked = false;
        let likedImages = JSON.parse(localStorage.getItem('likedImages')) || [];
        let history = JSON.parse(localStorage.getItem('history')) || [];

        async function getRandomImage() {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}`);
                const data = await response.json();
                const imageUrl = data.urls.regular;
                const photographerName = data.user.name;
                const photographerUsername = data.user.username;

                document.getElementById('image').src = imageUrl;
                document.getElementById('photographer').textContent = `Photographer: ${photographerName} (@${photographerUsername})`;

                // Check if image is already liked
                liked = likedImages.includes(imageUrl);
                updateLikeButton();

                // Add image to history
                history.unshift({ imageUrl, photographerName });
                localStorage.setItem('history', JSON.stringify(history));
            } catch (error) {
                console.error('Error fetching random image:', error);
            }
        }

        function updateLikeButton() {
            likeButton.textContent = liked ? '💔' : '❤️';
        }

        likeButton.addEventListener('click', () => {
            liked = !liked;
            updateLikeButton();
            if (liked) {
                likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
                likedImages.push(document.getElementById('image').src);
            } else {
                likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
                likedImages = likedImages.filter(image => image !== document.getElementById('image').src);
            }
            localStorage.setItem('likedImages', JSON.stringify(likedImages));
        });

        prevButton.addEventListener('click', () => {
            if (history.length > 1) {
                history.shift();
                const prevImage = history[0];
                document.getElementById('image').src = prevImage.imageUrl;
                document.getElementById('photographer').textContent = `Photographer: ${prevImage.photographerName}`;
            } else {
                alert('No previous images');
            }
        });

        window.onload = getRandomImage;