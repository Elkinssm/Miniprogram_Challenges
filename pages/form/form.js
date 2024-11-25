Page({
  data: {
    name: '',
    email: '',
    terms: false,
    newsletter: false
  },
  handleInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [field]: e.detail.value });
  },
  handleCheckboxChange(e) {
    this.setData({ terms: e.detail.value });
  },
  handleSwitchChange(e) {
    this.setData({ newsletter: e.detail.value });
  },
  handleFormSubmit(e) {
    const { name, email, terms } = this.data;
    if (!name || !email || !terms) {
      my.showToast({ content: 'Please complete all required fields.' });
      return;
    }
    my.alert({ title: 'Registration Successful', content: JSON.stringify(e.detail.value) });
  }
});