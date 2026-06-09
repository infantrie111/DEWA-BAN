/*
	Dewa Ban — Scroll reveal, smooth anchor & sticky navbar
	Version 2.0
*/

(function () {
	'use strict';

	/* ── Sticky navbar: tambah class 'scrolled' saat scroll > 80px ── */
	var header = document.getElementById('header');
	if (header) {
		var onScroll = function () {
			if (window.scrollY > 80) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll(); // cek kondisi awal
	}

	/* ── Smooth scroll untuk same-page anchor links ── */
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			var targetId = this.getAttribute('href');
			if (targetId === '#') return;

			var target = document.querySelector(targetId);
			if (!target) return;

			e.preventDefault();

			// offset untuk sticky navbar
			var navHeight = header ? header.offsetHeight : 0;
			var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

			window.scrollTo({ top: targetTop, behavior: 'smooth' });
		});
	});

	/* ── Intersection Observer untuk scroll reveal ── */
	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.10, rootMargin: '0px 0px -36px 0px' }
		);

		document.querySelectorAll('.reveal').forEach(function (el) {
			observer.observe(el);
		});
	} else {
		/* Fallback untuk browser lama */
		document.querySelectorAll('.reveal').forEach(function (el) {
			el.classList.add('visible');
		});
	}

})();
