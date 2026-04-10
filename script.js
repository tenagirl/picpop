const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('close');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function renderGallery(items) {
    gallery.innerHTML = '';
    items.forEach((item) => {
        const container = document.createElement('div');
        container.className = 'img-item';

        if (item.type === "video") {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            container.addEventListener('mouseenter', () => video.play());
            container.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
            container.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            container.appendChild(img);
        }
        container.addEventListener('click', () => openModal(item));
        gallery.appendChild(container);
    });
}

function openModal(item) {
    modalContent.innerHTML = '';
    if (item.type === "video") {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        modalContent.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        modalContent.appendChild(img);
    }
    modal.classList.add('active');
}

closeBtn.onclick = () => modal.classList.remove('active');
window.onclick = (e) => { if (e.target == modal) modal.classList.remove('active'); };

// ចាប់ផ្តើមដំណើរការដោយប្រើ allMedia ពី data.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof allMedia !== 'undefined') {
        const randomOrder = shuffle([...allMedia]);
        renderGallery(randomOrder);
    } else {
        console.error("រកមិនឃើញ file data.js ឬអថេរ allMedia ទេ!");
    }
});