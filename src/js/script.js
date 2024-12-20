class Carousel {
  constructor() {
    // Seleciona elementos do DOM
    this.container = document.querySelector(".carousel-container");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dotsContainer = document.querySelector(".carousel-dots");
    this.prevBtn = document.querySelector(".carousel-btn.prev");
    this.nextBtn = document.querySelector(".carousel-btn.next");

    // Inicializa variáveis de controle
    this.currentSlide = 0;
    this.slideCount = this.slides.length;
    this.autoPlayInterval = null;

    // Inicia o carrossel
    this.init();
  }

  init() {
    // Cria dots de navegação
    this.slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });

    // Adiciona event listeners para os botões
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Inicia o autoplay
    this.startAutoPlay();

    // Adiciona listeners para pausar o autoplay no hover
    this.container.addEventListener("mouseenter", () => this.stopAutoPlay());
    this.container.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  // Atualiza a posição do slide
  updateSlidePosition() {
    this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    // Atualiza o dot ativo
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  // Avança para o próximo slide
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
    this.updateSlidePosition();
  }

  // Volta para o slide anterior
  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slideCount) % this.slideCount;
    this.updateSlidePosition();
  }

  // Vai para um slide específico
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlidePosition();
  }

  // Inicia o autoplay
  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  // Para o autoplay
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new Carousel();
});
