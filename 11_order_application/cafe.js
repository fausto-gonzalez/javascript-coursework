"use strict";

class Product {
  constructor(id, name, unitPrice, imageFile) {
    this.id = id;
    this.name = name;
    this.unitPrice = unitPrice;
    this.imageFile = imageFile;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getSubtotal() {
    return this.product.unitPrice * this.quantity;
  }
}

const products = [
  new Product(0, "Espresso", 1.95, "espresso.jpg"),
  new Product(1, "Latte", 2.95, "latte.jpg"),
  new Product(2, "Cappuccino", 3.45, "cappuccino.jpg"),
  new Product(3, "Drip coffee", 1.75, "coffee.jpg"),
  new Product(4, "Biscotti", 1.95, "biscotti.jpg"),
  new Product(5, "Scone", 2.95, "scone.jpg"),
];

function addItemHTMLTable(index) {
  $("#cart_items").append(`
    <tr data-product-id="${index}">
      <td>${products[index].name}</td>
			<td>
        <input type="number" name="quantity_${index}" min="1" max="99" step="1" value="1">
      </td>
      <td>$${products[index].unitPrice.toFixed(2)}</td>
			<td class="subtotal">$${products[index].unitPrice.toFixed(2)}</td>
      <td>
        <button type="button" class="remove_item">
          <img src="images/trash+bin+icon-24px.ico" alt="">
        </button>
      </td>
    </tr>
    `);
}

function updateCartTotal(cart) {
  const total = cart.reduce((sum, item) => sum + item.getSubtotal(), 0);

  $("#total").html(`<span>Total:</span> $${total.toFixed(2)}`);
}

function isValidQuantity(quantity) {
  return (
    quantity !== "" &&
    !isNaN(quantity) &&
    Number.isInteger(Number(quantity)) &&
    Number(quantity) >= 1 &&
    Number(quantity) <= 99
  );
}

$(document).ready(() => {
  const cart = [];

  $("#order_form").on("submit", (evt) => {
    // Validates all the <input type="number">
    let errors = false;

    $("#cart_items input[type='number']").each((index, element) => {
      const input = $(element);
      const quantity = input.val().trim();

      if (!isValidQuantity(quantity)) {
        input.addClass("quantity_input_error");
        errors = true;
      } else {
        input.removeClass("quantity_input_error");
      }
    });

    if (errors) {
      evt.preventDefault();
    }
  });

  $("#menu a").on("click", (evt) => {
    evt.preventDefault();

    const index = $("#menu a").index(evt.currentTarget);
    const row = $(`#cart_items tr[data-product-id="${index}"]`);

    if (row.length > 0) {
      // Product is already in the cart.
      row.addClass("already_added");

      setTimeout(() => {
        row.removeClass("already_added");
      }, 1000);

      return;
    }

    // Product isn't in the cart yet.
    cart.push(new CartItem(products[index], 1));
    addItemHTMLTable(index);

    updateCartTotal(cart);

    // Display the shopping cart.
    $("#shopping_cart").show();
  });

  $("#menu a").each((index, element) => {
    const image = $(element).find("img");

    const normalSrc = image.attr("src");
    const infoSrc = image.attr("id");

    $(element).hover(
      () => {
        // mouse enters
        image.stop(true).fadeOut(500, () => {
          image.attr("src", infoSrc);
          image.fadeIn(500);
        });
      },

      () => {
        // mouse leaves
        image.stop(true).fadeOut(500, () => {
          image.attr("src", normalSrc);
          image.fadeIn(500);
        });
      },
    );
  });

  $("#cart_items").on("change", 'input[type="number"]', (evt) => {
    // Handle quantity changes.
    const input = $(evt.currentTarget);
    const row = input.closest("tr");
    const productId = row.data("product-id");
    let quantity = input.val().trim();

    const cartItem = cart.find((item) => item.product.id === productId);

    // Data validation for quantity
    if (!isValidQuantity(quantity)) {
      // Highlight invalid quantity.
      input.addClass("quantity_input_error");

      // Restore the previous valid quantity.
      input.val(cartItem.quantity);

      setTimeout(() => {
        input.removeClass("quantity_input_error");
      }, 1000);

      return;
    }

    // Quantity is valid.
    input.removeClass("quantity_input_error");

    // Convert quantity to an integer only once.
    quantity = parseInt(quantity);

    // Update the value displayed in the input.
    input.val(quantity);

    // Update the corresponding CartItem.
    cartItem.quantity = quantity;

    // Update the subtotal displayed in this row.
    row.find(".subtotal").text(`$${cartItem.getSubtotal().toFixed(2)}`);

    updateCartTotal(cart);
  });

  $("#cart_items").on("click", ".remove_item", (evt) => {
    const button = $(evt.currentTarget);
    const row = button.closest("tr");
    const productId = row.data("product-id");

    // Find the position of this product inside cart[].
    const cartIndex = cart.findIndex((item) => item.product.id === productId);

    // Remove the CartItem from cart[].
    if (cartIndex !== -1) {
      cart.splice(cartIndex, 1);
    }

    // Remove the row from the HTML table.
    row.remove();
    updateCartTotal(cart);

    // If the cart is now empty, hide the shopping cart.
    if (cart.length === 0) {
      $("#shopping_cart").hide();
    }
  });

  $("#clear_order").on("click", () => {
    // Erases the whole cart[]
    // Because cart[] is defined as a constant (const),
    // I cannot just do: cart = []; to erase the array
    // (it would throw an error).
    cart.length = 0;

    // Hides the shopping cart.
    $("#cart_items").empty();
    $("#shopping_cart").hide();
  });
});
