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
    my.alert({
      title: "Size Selected",
      content: `You selected ${selectedSize} size.`,
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
    const quantity = parseInt(e.detail.value, 10);
    this.setData({
      quantity: quantity,
    });
    my.alert({
      title: "Quantity Changed",
      content: `You selected ${quantity} units.`,
    });
    this.updateTotalPrice();
  },

  handleDiscountSwitch(e) {
    this.setData({
      applyDiscount: e.detail.value,
    });
    my.alert({
      title: "Discount Toggle",
      content: `Discount is now ${e.detail.value ? "enabled" : "disabled"}.`,
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
});
