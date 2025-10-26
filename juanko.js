




// Solo se ejecuta cuando el botón hamburguesa está visible
        const hamburger = document.getElementById('hamburger');
        const nav = document.querySelector('.horizontal-list');

        // Toggle del menú móvil
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en cualquier enlace (solo en móviles)
        const navLinks = document.querySelectorAll('.horizontal-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                }
            });
        });

        // Limpiar estado al cambiar de móvil a desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        });

        //APARTIR DE AQUI VIENE ELK CODIGO PARA LA FUNCION DE CARRUSEL TIPO IG
        let currentSlideIndex = 1;
        const totalSlides =3;
        //const slides = document.querySelectorAll('.carousel-slide');//IMAGENES reemplazado por totalslides 
        //const dots = document.querySelectorAll('.dot');// puntos
        const track = document.getElementById('carouselTrack');// contenederos que se mueven
        let transitioning = false;//interrupcion para hacer click multiples
        //aqui muestro el primer Slide
        track.style.transform = 'translateX(-100%)';
        
        
        function updateSlide(conTransition = true) {
            if(conTransition){track.style.transition = 'transform 0.5s ease';}
            else{track.style.transition = 'none';}
            track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            //track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;// mueve el contenedor auto
            
           /*dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlideIndex);//actualiza los puntos
            });*/
        }

        //esta funcion correr¿ el carrusel
        function nextSlide(){
               if(transitioning) return;//le puse las llaves
               transitioning = true;
               currentSlideIndex++;
               updateSlide(true);

               if(currentSlideIndex === totalSlides + 1){
                setTimeout(() =>{
                    currentSlideIndex =1;//vueleve al primer slide
                    updateSlide(false); //no va transicion
                    transitioning=false;
                },500);//esperar la transicion
               }
               else{
                setTimeout(()=>{transitioning=false},500);

               }
        }

        

        function previousSlide() {
            if(transitioning)return;
            transitioning=true;
            currentSlideIndex--;
            updateSlide(true);
            //si llegamos al slide clonado
            if(currentSlideIndex===0){
                setTimeout(()=>{currentSlideIndex=totalSlides;
                    updateSlide(false);//sin transiscion
                    transitioning=false;
                },500);//esperar a que termine la transicion
            }
            else{setTimeout(()=>{transitioning=false;},500);}

            
        }

        function currentSlide(n) {
            if(transitioning) return;
            currentSlideIndex=n;
            updateSlide(true);
        }/////
        //////
        ////

        function goToProject(projectId) {
            // Aquí puedes personalizar las URLs según tus necesidades
            const projectUrls = {
                
                'proyecto2': '/proyectos/sensor-iot',
                'proyecto3': '/proyectos/fuente-poder',
                'proyecto4': '/proyectos/audio-amplifier',
                
            };
            
            // Para demostración, mostramos una alerta
            // En producción, usarías: window.location.href = projectUrls[projectId];
            alert(`Navegando a: ${projectUrls[projectId]}\n\nAquí podrías redirigir a la página de detalles del proyecto.`);
        }

        // Auto-play del carrusel
        let autoPlay = setInterval(nextSlide, 5000);

        // Pausar auto-play cuando el usuario interactúa
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });

        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 5000);
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Touch/swipe support para móviles
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
        }