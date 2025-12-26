  window.onload = function(){
        // [스크롤 감지하여 헤더 보여주기]
        window.addEventListener('scroll', function() {
            const stickyHeader = document.getElementById('sticky-header');
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // 스크롤을 300px 이상 내리면 헤더 등장
            if (scrollPosition > 300) {
                stickyHeader.classList.add('visible');
            } else {
                // 다시 위로 올리면 헤더 숨김
                stickyHeader.classList.remove('visible');
            }
        });



        // [1] MOST POPULAR & VIDEO: 무한 회전 슬라이드
        function rotateSlide(trackId, direction) {
            const track = document.getElementById(trackId);
            const firstItem = track.firstElementChild;
            const itemWidth = firstItem.getBoundingClientRect().width;
            
            if (direction === 1) {
                track.style.transition = 'transform 0.5s ease-out';
                track.style.transform = `translateX(-${itemWidth}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.appendChild(firstItem);
                    track.style.transform = 'translateX(0)';
                }, 500);
            } else {
                const lastItem = track.lastElementChild;
                track.style.transition = 'none';
                track.prepend(lastItem);
                track.style.transform = `translateX(-${itemWidth}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-out';
                    track.style.transform = 'translateX(0)';
                }, 10);
            }
        }

        // [2] K-FOOD: 자동 슬라이드 & 썸네일
        let foodIndex = 0;
        const foodTrack = document.getElementById('food-track');
        const foodThumbs = document.querySelectorAll('.thumb-item');
        const totalFood = foodThumbs.length;

        function goFoodSlide(index) {
            foodIndex = index;
            updateFoodSlider();
        }

        function updateFoodSlider() {
            foodTrack.style.transform = `translateX(-${foodIndex * 100}%)`;
            foodThumbs.forEach(t => t.classList.remove('active'));
            foodThumbs[foodIndex].classList.add('active');
        }

        function autoFoodSlide() {
            foodIndex++;
            if (foodIndex >= totalFood) { foodIndex = 0; }
            updateFoodSlider();
        }

        // [3] 자동 실행 설정
        function startAutoPlay() {
            setInterval(() => rotateSlide('pop-track', 1), 3000);
            setInterval(() => rotateSlide('video-track', 1), 3000);
            setInterval(autoFoodSlide, 3000);
        }

        window.onload = startAutoPlay;

        // [4] K-TRAVEL
        function changeTab(element, imgUrl) {
            document.querySelectorAll('.travel-tab').forEach(tab => tab.classList.remove('active'));
            element.classList.add('active');
            document.getElementById('travel-display').src = imgUrl;
        }
  }