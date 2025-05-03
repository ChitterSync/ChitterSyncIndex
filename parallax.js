class Parallax {
  constructor(element, options = {}) {
    this.element = element;
    this.layers = Array.from(element.children);
    this.options = Object.assign(
      {
        speed: 0.1, // Default parallax speed for mouse movement
      },
      options
    );

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.init();
  }

  init() {
    this.updateLayers();
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  updateLayers() {
    this.layers.forEach((layer) => {
      const depth = layer.getAttribute('data-depth') || 0;
      layer.style.transform = `translate(0px, 0px)`;
      layer.dataset.depth = depth;
    });
  }

  handleMouseMove(event) {
    const { clientX, clientY, innerWidth, innerHeight } = window;
    const mouseX = event.clientX / innerWidth - 0.5; // Normalize to range [-0.5, 0.5]
    const mouseY = event.clientY / innerHeight - 0.5; // Normalize to range [-0.5, 0.5]

    this.layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth);
      const translateX = mouseX * depth * this.options.speed * 100; // Adjust multiplier for effect strength
      const translateY = mouseY * depth * this.options.speed * 100;
      layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  }

  destroy() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    this.layers.forEach((layer) => {
      layer.style.transform = '';
    });
  }
}

// Automatically initialize the Parallax class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const parallaxContainer = document.getElementById('parallax-container');
  if (parallaxContainer) {
    new Parallax(parallaxContainer, { speed: 0.2 });
  }
});
