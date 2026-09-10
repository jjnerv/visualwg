var wg
    , start_wg;

wg = {

    init: function () {

        wg.nav();
        wg.list();
        wg.gallery();
        wg.send();
        wg.back_top();
    },
    count: 0,
    showAll: function () {
        const articles = document.querySelectorAll('#jobs article');
        articles.forEach((article) => {
            article.style.display = 'block';
        });
    },
    hiddenAll: function () {
        const articles = document.querySelectorAll('#jobs article');
        articles.forEach((article) => {
            article.style.display = 'none';
        });
    },
    increment: function () {
        return this.count++;
    },
    drecrement: function () {
        return this.count--;
    },
    reset: function () {
        this.count = 0;
    },
    list: function () {
        document.querySelectorAll('#jobs ul.list li a').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                const filter = link.id;
                const articles = document.querySelectorAll('#jobs article');

                if (filter === 'all') {
                    wg.showAll();
                } else {
                    wg.hiddenAll();                    
                }

                const matchingArticles = document.querySelectorAll(
                    `#jobs article.${CSS.escape(filter)}`
                );

                matchingArticles.forEach((article) => {
                    article.style.display = 'block';
                });
            });  
        });        
    }
    , gallery: function () {
        document.querySelectorAll('#jobs article a.next').forEach(function (nextButton, index) {
            nextButton.addEventListener('click', function (e) {
                e.preventDefault();

                const btnNext = document.querySelectorAll('#jobs article a.next')[index];
                const btnPrev = document.querySelectorAll('#jobs article a.prev')[index];
                const reset = this.reset;

                btnPrev.style.display = 'block';

                const i = document.querySelectorAll('#jobs ul.list_galery')[index].querySelectorAll('li');
                let cnt = 0;
                i.forEach((item, idx) => {
                    if (item.style.display === 'block') {
                        cnt = idx;
                    }
                });

                let count = cnt;

                i[count].nextElementSibling.style.display = 'block';
                i[count].style.display = 'none';

                if(count >= i.length - 2) {
                    btnNext.style.display = 'none';
                }

            });
        });
        document.querySelectorAll('#jobs article a.prev').forEach(function (prevButton, index) {
            prevButton.addEventListener('click', function (e) {
                e.preventDefault();

                const btnNext = document.querySelectorAll('#jobs article a.next')[index];
                const btnPrev = document.querySelectorAll('#jobs article a.prev')[index];

                btnNext.style.display = 'block';

                const i = document.querySelectorAll('#jobs ul.list_galery')[index].querySelectorAll('li');
                let cnt = 0;
                i.forEach((item, index) => {
                    if (item.style.display === 'block') {
                        cnt = index;
                    }
                });
     
                let count = cnt;

                i[count].previousElementSibling.style.display = 'block';
                i[count].style.display = 'none';

                if(count <= 1) {
                    btnPrev.style.display = 'none';
                }

            });
        });
    }
    , nav: function () {
        document.querySelectorAll('#top nav ul li a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const className = this.className;
                const target = document.getElementById(className);

                if (target) {
                    const position = target.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: position - 120,
                        behavior: 'smooth'
                    });
                }
            });
        });

        document.querySelectorAll('.logo').forEach(logo => {
            logo.addEventListener('click', function (e) {
                e.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    },

    send: function () {

        document.querySelector('form#send').addEventListener('submit', function (e) {
            e.preventDefault();

            const msgValidation = document.querySelector('div.msg_validation');
            msgValidation.style.display = 'none';

            document.querySelectorAll('a.exit_contact').forEach(exit => {
                exit.addEventListener('click', function () {
                    document.querySelectorAll('.shadow, div.msg_contact').forEach(el => {
                        el.style.display = 'none';
                    });
                });
            });

            const nome = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const title = document.querySelector('#title').value;
            const mensagem = document.querySelector('#message').value;
            const msg = [];

            if (!/[a-zA-Z]/.test(nome)) {
                msg[0] = 'Preencha o nome corretamente.';
            } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                msg[0] = 'Preencha o email corretamente.';
            } else if (!/[a-zA-Z]/.test(title)) {
                msg[0] = 'Preencha o assunto corretamente.';
            } else if (!/[a-zA-Z]/.test(mensagem)) {
                msg[0] = 'Preencha a mensagem corretamente.';
            }

            if (msg.length > 0) {
                msgValidation.style.display = 'block';

                const span = msgValidation.querySelector('span');
                if (span) {
                    span.innerHTML = msg[0];
                }

                msgValidation.innerHTML = msg[0];
                return false;
            }

            emailjs.sendForm('service_dlo1vho', 'template_x6i094d', this)
                .then(() => {
                    msg[0] = 'Mensagem enviada com sucesso!';
                    msgValidation.style.display = 'block';

                    const span = msgValidation.querySelector('span');
                    if (span) {
                        span.innerHTML = msg[0];
                    }

                    msgValidation.innerHTML = msg[0];
                }, (error) => {
                    msg[0] = 'Ops, parece que sua mensagem não foi enviada!';
                    msgValidation.style.display = 'block';

                    const span = msgValidation.querySelector('span');
                    if (span) {
                        span.innerHTML = msg[0];
                    }

                    msgValidation.innerHTML = msg[0];
                });

                this.querySelectorAll("input[type=text], textarea").forEach(el => el.value = "");
            });

    },

    back_top: function () {
        document.addEventListener('scroll', function () {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollBtn = document.querySelector('span.scroll_top');

            if (scrollTop <= 20) {
                scrollBtn.style.transition = 'opacity 0.5s';
                scrollBtn.style.opacity = '0';
                setTimeout(() => {
                    scrollBtn.style.display = 'none';
                }, 500);
            } else {
                scrollBtn.style.display = 'inline';
                scrollBtn.style.transition = 'opacity 0.5s';
                scrollBtn.style.opacity = '1';
            }
        });

        document.querySelector('span.scroll_top').addEventListener('click', function (e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

start_wg = wg.init();