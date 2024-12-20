let cart = [];

function changeThumbnail(imagePath, element) {
  // Update the main thumbnail image
  document.getElementById("main-thumbnail").src = imagePath;

  const buttons = document.querySelectorAll("#color-options button");
  buttons.forEach((btn) => btn.classList.remove("active-color"));

  element.classList.add("active-color");

  const selectedColor = window.getComputedStyle(element).backgroundColor;

  // Update the active border color dynamically
  element.style.setProperty("--active-border-color", selectedColor);
}

function incrementQuantity() {
  const quantityInput = document.getElementById("quantity");
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decrementQuantity() {
  const quantityInput = document.getElementById("quantity");
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

const colorImageMap = {
  "#816BFF": "./assets/img/light-blue.png",
  "#1FCEC9": "./assets/img/black.png",
  "#4B97D3": "./assets/img/blue.png",
  "#3B4747": "./assets/img/cyan.png",
};

// Function to convert RGB to HEX
function rgbToHex(rgb) {
  if (rgb.startsWith("#")) return rgb;
  const rgbValues = rgb.match(/\d+/g);
  if (!rgbValues || rgbValues.length !== 3) return console.log("invalid color");
  const r = parseInt(rgbValues[0]).toString(16).padStart(2, "0");
  const g = parseInt(rgbValues[1]).toString(16).padStart(2, "0");
  const b = parseInt(rgbValues[2]).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`.toUpperCase();
}

function addToCart() {
  const selectedColorBtn = document.querySelector(".product__colors-button.active-color");
  const rgbColor = selectedColorBtn ? selectedColorBtn.style.backgroundColor : "";
  const color = rgbToHex(rgbColor);
  const productImage = colorImageMap[color];
  const selectedSizeBtn = document.querySelector(".product__sizes-button.active-size");
  const sizeInfo = selectedSizeBtn ? selectedSizeBtn.innerText : "M - $79";
  const [size, priceText] = sizeInfo.split(" - ");
  const price = parseFloat(priceText.replace("$", ""));

  const quantity = parseInt(document.getElementById("quantity").value);

  const productTitle = document.querySelector(".product__title").innerText;

  if (quantity > 0) {
    const item = {
      title: productTitle,
      image: productImage,
      color: rgbColor,
      size: size,
      price: price,
      quantity: quantity,
      total: price * quantity,
    };

    cart.push(item);
    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("checkout-btn").classList.remove("d-none");
  }
}
function showCart() {
  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");

  // Start with table structure
  let tableHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Color</th>
          <th>Size</th>
          <th>Qnt</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Check if cart is empty
  if (cart.length === 0) {
    tableHTML += `
        <tr>
          <td colspan="5" class="text-center py-4">
            <p class="text-muted mb-0">No products available in cart</p>
          </td>
        </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Totals:</strong></td>
            <td></td>
            <td colspan="1" class="total-qnt">0</td>
            <td class="total-price">$0.00</td>
          </tr>
        </tfoot>
      </table>
    `;
  } else {
    // Add cart items
    tableHTML += cart
      .map(
        (item, index) => `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="${item.image}" alt="${item.title}" class="cart-img" style="width: 50px; height: 50px; object-fit: cover;">
              <span>${item.title}</span>
            </div>
          </td>
          <td>
            <span class="color-circle" style="background-color: ${item.color};"></span>
          </td>
          <td>${item.size}</td>
          <td>${item.quantity}</td>
          <td>$${item.total.toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    // Calculate totals
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

    // Add table footer with totals
    tableHTML += `
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2"><strong>Totals:</strong></td>
            <td></td>
            <td colspan="1" class="total-qnt">${totalQuantity}</td>
            <td class="total-price">$${totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  cartItems.innerHTML = tableHTML;
  cartModal.classList.add("active");
}

function hideCart() {
  document.getElementById("cart-modal").classList.remove("active");
}

function selectSize(element, size) {
  const buttons = document.querySelectorAll(".product__sizes-button");
  buttons.forEach((btn) => btn.classList.remove("active-size"));
  element.classList.add("active-size");
}
