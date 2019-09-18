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

    list: function () {
        $('#jobs ul.list li a').bind('click', function (e) {
            e.preventDefault();

            var filter = $(this).prop('id');

            if (filter !== "all") {
                if ($('#jobs').find('article.' + filter).size() > 0) {
                    $('#jobs article.' + filter).show('slow');
                    $('#jobs article:not(.' + filter + ')').hide('slow');
                } else {
                    $('#jobs article:not(.' + filter + ')').hide('slow');
                }
            } else {
                $('#jobs article').show('slow');
            }
        });
    }
    , gallery: function () {
        $('#jobs article a.next').bind('click', function (e) {
            e.preventDefault();

            var $indexEl = $(this).parent().index("article.box_gallery");

            $('article.box_gallery:eq(' + $indexEl + ') a.prev').show('slow');
            $('ul.list_galery:eq(' + $indexEl + ') li:visible').next().show();
            $('ul.list_galery:eq(' + $indexEl + ') li:visible').prev().hide();

            if ($('ul.list_galery:eq(' + $indexEl + ') li:last-child').is(':visible')) {
                $(this).hide('fast');
            }
        });
        $('#jobs article a.prev').bind('click', function (e) {
            e.preventDefault();

            var $indexEl = $(this).parent().index("article.box_gallery");

            $('article.box_gallery:eq(' + $indexEl + ') a.next').show('slow');
            $('ul.list_galery:eq(' + $indexEl + ') li:visible').prev().show();
            $('ul.list_galery:eq(' + $indexEl + ') li:visible').next().hide();

            if ($('ul.list_galery:eq(' + $indexEl + ') li:first-child').is(':visible')) {
                $(this).hide('fast');
            }

        });

    }
    , nav: function () {
        $('#top nav ul li a').bind('click', function (e) {
            e.preventDefault();

            var link = $(this).prop('class');
            var position = $('#' + link).offset();

            $('body').animate({
                scrollTop: (position.top - 150) + 'px'
            }, '500');
        });

        $('.logo').bind('click', function (e) {
            e.preventDefault();

            $('body').animate({
                scrollTop: '0px'
            }, '500');
        });
    },

    send: function () {

        $('form#send').submit(function (e) {
            e.preventDefault();

            $('div.msg_validation').remove();

            $('a.exit_contact').bind('click', function () {
                $('.shadow').fadeOut();
                $('div.msg_contact').fadeOut();
            });

            var nome = $('#nick').val()
                , email = $('#email').val()
                , mensagem = $('#subject').val()
                , msg = [];

            if (!/[a-zA-Z]/.test(nome)) {
                msg[0] = 'Preencha o nome corretamente.';
            } else
            if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
                msg[0] = 'Preencha o email corretamente.';
            } else
            if (!/[a-zA-Z]/.test(mensagem)) {
                msg[0] = 'Preencha a mensagem corretamente.';
            }

            if (msg.length > 0) {
                //$('.shadow').fadeIn();
                //$(this).append('div.msg_validation').fadeIn().find('span').html(msg);
                $(this).parent().append("<div class='msg_validation'></div>");
                $('div.msg_validation').html(msg);
                return false;
            }

            $.ajax({
                url: "from.php"
                , type: "POST"
                , data: {
                    mail: email
                    , msg: mensagem
                }
            }).done(function (data) {
                $('.shadow').fadeIn();
                $('div.msg_contact').fadeIn().find('span').html(data);
                return false;
            });

            $('form').find("input[type=text], textarea").val("");
        });
    },

    back_top: function () {
        $(document).scroll(function () {

            if ($(document).scrollTop() <= 100) {
                $('span.scroll_top').fadeOut('slow');
            } else if ($(document).scrollTop() > 100) {
                $('span.scroll_top').fadeIn('slow');
            }
        });

        $('span.scroll_top').bind('click', function () {

            $("html, body").animate({
                scrollTop: 0
            }, '500');
        });
    }
};

start_wg = wg.init();