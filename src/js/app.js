// Toggles and such

function toggleCart() {
	const objOpen = document.querySelector('.js-open-cart');
	const objClose = document.querySelector('.js-close-cart');
	const objCart = document.querySelector('.js-cart');

	objOpen.addEventListener('click', (e) => {
		e.currentTarget.setAttribute('aria-expanded', true);
		objCart.classList.add('cart--open');
		objClose.focus();
	});

	objClose.addEventListener('click', () => {
		objCart.classList.remove('cart--open');
		objOpen.setAttribute('aria-expanded', false);
		objOpen.focus();
	});
}

function toggleDetails() {
	const toggles = document.querySelectorAll('.js-toggle-details')

	Array.prototype.forEach.call(toggles, toggle => {
		let target = toggle.nextElementSibling

		toggle.onclick = () => {
			let expanded = toggle.getAttribute('aria-expanded') === 'true' || false

			toggle.setAttribute('aria-expanded', !expanded)
			target.hidden = expanded
		}
	})
}

toggleCart();
toggleDetails();

// Cart related functionality

loadEventListeners();

function loadEventListeners() {
    handleCart();
	document.querySelector('.js-cart-items').addEventListener('click', removeFromCart);
}

function handleCart() {
	const objAdd = document.querySelector('.js-cart-add');
	const objItems = document.querySelector('.js-cart-items');

	objAdd.addEventListener('click', buyShake);

	function buyShake(e) {
		const objShake = e.currentTarget.parentElement.parentElement;
		getShakeInfo(objShake);
	}

	function getShakeInfo(objShake) {
		const shakeInfo = {
			image: objShake.querySelector('img').src,
			title: objShake.querySelector('.shake-content__heading').textContent,
			price: objShake.querySelector('.shake-content__price').textContent
		}
		addToCart(shakeInfo);
	}

	function addToCart(objShake) {
		const cartItem = document.createElement('li');

		cartItem.innerHTML =
			`<article class="shake shake--cart">
				<picture>
					<source srcset="${objShake.image}" type="image/webp">
					<img src="${objShake.image}" alt="" width="200" height="215" loading="lazy">
				</picture>

				<div class="u-flow-vert shake-content">
					<div class="shake-content__top">
						<hgroup>
							<h3 class="shake-content__heading">${objShake.title}</h3>
							<h4 class="shake-content__price">${objShake.price}</h4>
						</hgroup>
					</div>

					<button class="js-cart-remove">delete</button>

					<div class="u-flow-horiz shake-content__quantity">
						<button type="button" class="btn--faux btn--qty js-qty-down">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
							<span class="u-a11y">Decrease quantity by 1</span>
						</button>
						<input type="number" min="1" max="5" aria-label="quantity" name="product_qty" value="1">
						<button type="button" class="btn--faux btn--qty js-qty-up">
							<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
							<span class="u-a11y">Increase quantity by 1</span>
						</button>
					</div>
				</div>
			</article>`;

		objItems.appendChild(cartItem);
	}
}

function removeFromCart(e) {
	if(e.target.classList.contains('js-cart-remove')) {
		e.target.parentElement.parentElement.remove();
	}
}
