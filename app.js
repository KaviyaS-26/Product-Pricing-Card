/**
 * Pricing Toggle Script
 * -------------------------------------------------------------
 * Manages switching between "monthly" and "yearly" billing plans.
 * All pricing numbers are read dynamically from HTML data attributes
 * (data-monthly and data-yearly) with zero hardcoded prices in JS.
 */

// 1. Select and cache toggle buttons and dynamic text elements
const monthlyBtn = document.getElementById('monthly');
const yearlyBtn = document.getElementById('yearly');
const priceElements = document.querySelectorAll('.price');
const unitElements = document.querySelectorAll('.unit');

/**
 * Updates prices, unit labels, button states, and accessibility attributes.
 * @param {'monthly' | 'yearly'} period - The selected billing interval
 */
function setPeriod(period) {
  const isYearly = period === 'yearly';

  // Step 1: Update each card's price from its corresponding data attribute
  priceElements.forEach(priceEl => {
    // Reads data-yearly or data-monthly directly from the HTML element
    const newPrice = isYearly ? priceEl.dataset.yearly : priceEl.dataset.monthly;
    priceEl.textContent = newPrice;
  });

  // Step 2: Update every billing unit label ("per month" vs "per year")
  const unitText = isYearly ? 'per year' : 'per month';
  unitElements.forEach(unitEl => {
    unitEl.textContent = unitText;
  });

  // Step 3: Update aria-pressed accessibility attributes and toggle the 'active' class
  monthlyBtn.setAttribute('aria-pressed', String(!isYearly));
  yearlyBtn.setAttribute('aria-pressed', String(isYearly));

  monthlyBtn.classList.toggle('active', !isYearly);
  yearlyBtn.classList.toggle('active', isYearly);
}

// Attach click event listeners to the billing interval toggle buttons
monthlyBtn.addEventListener('click', () => setPeriod('monthly'));
yearlyBtn.addEventListener('click', () => setPeriod('yearly'));

// Initialize with "monthly" billing on initial page load
setPeriod('monthly');
