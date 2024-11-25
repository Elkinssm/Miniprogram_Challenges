
Page({
  data: {
    images: [
      { src: '../../assets/club.png', description: 'Esto es un ejemplo de descripcion' },
      { src: '../../assets/club.png', description: 'Esto es un ejemplo de descripcion' },
      { src: '../../assets/club.png', description: 'Esto es un ejemplo de descripcion' }
    ]
  },
  handleImageTap(e) {
    const description = e.currentTarget.dataset.description;
    my.alert({
      title: 'Image Selected',
      content: description,
      buttonText: 'Aceptar',
    });

  },
  handleSwiperChange(e) {
    console.log('Current slide index:', e.detail.current);
  }
});