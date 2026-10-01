/* =========================================================
   TATI PORTFOLIO
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.getElementById("header");

    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const navLinks = nav.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");
            menuToggle.classList.remove("open");
            document.body.classList.remove("menu-open");

        });

    });


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       SKILL BARS
    ===================================================== */

    const skillBars = document.querySelectorAll(".skill-bar span");

    const skillsObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const bar = entry.target;
                const level = bar.dataset.level;

                bar.style.width = `${level}%`;

                skillsObserver.unobserve(bar);

            });

        },
        {
            threshold: 0.4
        }
    );

    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });


    /* =====================================================
       CURSOR
    ===================================================== */

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    if (
        cursor &&
        follower &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let followerX = mouseX;
        let followerY = mouseY;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

        });

        const animateFollower = () => {

            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        };

        animateFollower();


        const interactiveElements = document.querySelectorAll(
            "a, button, .project, .real-project, input, textarea"
        );

        interactiveElements.forEach(element => {

            element.addEventListener("mouseenter", () => {
                follower.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                follower.classList.remove("hover");
            });

        });

    }


    /* =====================================================
       FORMULARIO
       
       NOTA:
       Esto NO envía realmente un email todavía.
       Evita el falso "funciona" típico de formularios
       frontend sin backend.
    ===================================================== */

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const formData = new FormData(form);

            const nombre = formData.get("nombre");
            const email = formData.get("email");
            const mensaje = formData.get("mensaje");

            if (!nombre || !email || !mensaje) {

                formMessage.textContent =
                    "Completa los campos obligatorios.";

                return;
            }

            formMessage.textContent =
                "Formulario preparado. Para recibir mensajes tendrás que conectarlo a un servicio de formularios.";

            form.reset();

        });

    }


    /* =====================================================
       PORTFOLIO — EFECTO PARALLAX MUY SUAVE
    ===================================================== */

    const projects = document.querySelectorAll(".project-image");

    if (
        projects.length &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        window.addEventListener("scroll", () => {

            const viewportCenter = window.innerHeight / 2;

            projects.forEach(project => {

                const rect = project.getBoundingClientRect();

                if (
                    rect.bottom < 0 ||
                    rect.top > window.innerHeight
                ) {
                    return;
                }

                const projectCenter =
                    rect.top + rect.height / 2;

                const distance =
                    projectCenter - viewportCenter;

                const movement =
                    Math.max(-8, Math.min(8, distance * -0.015));

                const image = project.querySelector("img");

                if (image) {
                    image.style.transform =
                        `scale(1.02) translateY(${movement}px)`;
                }

            });

        }, {
            passive: true
        });

    }


    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    const footerYear = document.querySelector(".footer div");

    if (footerYear) {

        const currentYear = new Date().getFullYear();

        footerYear.textContent = `© ${currentYear}`;

    }

});