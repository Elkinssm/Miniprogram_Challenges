Page({
  data: {
    sizes: {
      small: 10,
      medium: 15,
      large: 20,
    },
    colors: {
      red: 2,
      blue: 3,
      green: 4,
    },
    sizeArray: ["small", "medium", "large"],
    sizeIndex: 0,
    basePrice: 10,
    colorPrice: 0,
    quantity: 1,
    discount: 0.1,
    applyDiscount: false,
    totalPrice: 10,
    selectedColors: [],

    items: [
      { id: 1, name: "Nombre 23", name2: "test" },
      { id: 2, name: "Item 2", name3: "desdeName3" },
      { id: 3, name: "Item 3" },
    ],
    selectedItemName: "Select an item",
  },

  onLoad() {
    this.updateTotalPrice();
  },

  handleSizeChange(e) {
    const sizeIndex = e.detail.value;
    const selectedSize = this.data.sizeArray[sizeIndex];
    this.setData({
      sizeIndex: sizeIndex,
      basePrice: this.data.sizes[selectedSize],
    });
    this.updateTotalPrice();
  },

  handleColorButtonTap(e) {
    const color = e.currentTarget.dataset.color;
    let selectedColors = this.data.selectedColors;
    if (selectedColors.includes(color)) {
      selectedColors = selectedColors.filter((c) => c !== color);
    } else {
      selectedColors.push(color);
    }
    const colorPrice = selectedColors.reduce(
      (total, color) => total + this.data.colors[color],
      0
    );
    this.setData({
      selectedColors: selectedColors,
      colorPrice: colorPrice,
    });
    this.updateTotalPrice();
  },

  handleQuantityChange(e) {
    let quantity = parseInt(e.detail.value, 10);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }
    this.setData({
      quantity: quantity,
    });
    this.updateTotalPrice();
  },

  handleDiscountSwitch(e) {
    this.setData({
      applyDiscount: e.detail.value,
    });
    this.updateTotalPrice();
  },

  updateTotalPrice() {
    let totalPrice =
      (this.data.basePrice + this.data.colorPrice) * this.data.quantity;
    if (this.data.applyDiscount && this.data.quantity > 5) {
      totalPrice *= 1 - this.data.discount;
    }
    this.setData({
      totalPrice: totalPrice.toFixed(2),
    });
  },

  showSummary() {
    const selectedSize = this.data.sizeArray[this.data.sizeIndex];
    const selectedColors = this.data.selectedColors.join(", ");
    const summary = `
      Size: ${selectedSize}
      Colors: ${selectedColors}
      Quantity: ${this.data.quantity}
      Total Price: $${this.data.totalPrice}
    `;
    my.confirm({
      title: "Summary of Purchase",
      content: summary,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      success: (result) => {
        if (result.confirm) {
          my.alert({
            title: "Order Confirmed",
          });
        } else {
          my.alert({
            title: "Order Cancelled",
          });
        }
      },
    });
  },

  handlePickerChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedItemName: this.data.items[index].name,
    });
  },
});
