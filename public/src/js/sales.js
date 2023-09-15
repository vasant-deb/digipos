


document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');
  
    modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
      modeSwitch.classList.toggle('active');
    });
    
    var listView = document.querySelector('.list-view');
    var gridView = document.querySelector('.grid-view');
    var projectsList = document.querySelector('.project-boxes');
    
    listView.addEventListener('click', function () {
      gridView.classList.remove('active');
      listView.classList.add('active');
      projectsList.classList.remove('jsGridView');
      projectsList.classList.add('jsListView');
    });
    
    gridView.addEventListener('click', function () {
      gridView.classList.add('active');
      listView.classList.remove('active');
      projectsList.classList.remove('jsListView');
      projectsList.classList.add('jsGridView');
    });
    
    document.querySelector('.messages-btn').addEventListener('click', function () {
      document.querySelector('.messages-section').classList.add('show');
    });
    
    document.querySelector('.messages-close').addEventListener('click', function() {
      document.querySelector('.messages-section').classList.remove('show');
    });
  });
 /* corousel start */

document.addEventListener("DOMContentLoaded", function() {
    // Make an API call to retrieve data
    $.ajax({
        type: 'GET',
        url: 'https://pwa.onlinebilling.ca/default',
        success: function(response) {
            if (response.error === false) {
                const categories = response.categories;
                const models = response.models;
                const products = response.products;

                // Create an array of slides for "categories" section
                const categorySlides = categories.map(category => {
                    return `
                        <div class="swiper-slide">
                            <h2>${category.name}</h2>
                        </div>
                    `;
                });

                // Add the "categories" slides to the carousel container
                $('#carousel-container').html(categorySlides.join(''));

                // Create an array of slides for "models" section
                const modelSlides = models.map(model => {
                    return `
                        <div class="swiper-slide">
                        <img class="proimage" src="https://api.1stopwireless.ca/public/uploads/categories/${model.image}"/>
                            <h2>${model.name}</h2>
                        </div>
                    `;
                });

                // Add the "models" slides to the carousel container
                $('#carousel-models').html(modelSlides.join(''));

                // Create an array of slides for "products" section
                const productSlides = products.map(product => {
                    return `
                        <div class="swiper-slide">
                        <img class="proimage" src="https://api.1stopwireless.ca/public/uploads/products/${product.image}"/>
                            <h2>${product.name}</h2>
                        </div>
                    `;
                });

                // Add the "products" slides to the carousel container
                $('#carousel-products').html(productSlides.join(''));

                // Initialize Swiper for "categories" section
                const swiperCategories = new Swiper('.categories', {
                    slidesPerView: 7, // Display 7 items at a time
                    spaceBetween: 10, // Adjust the spacing between items
                    navigation: {
                        nextEl: '.nextxc',
                        prevEl: '.prevxc',
                    },
                });

                // Initialize Swiper for "models" section
                const swiperModels = new Swiper('.xmodels', {
                    slidesPerView: 7, // Display 7 items at a time
                    spaceBetween: 10, // Adjust the spacing between items
                    navigation: {
                        nextEl: '.nextxm',
                        prevEl: '.prevxm',
                    },
                });

                // Initialize Swiper for "products" section
                const swiperProducts = new Swiper('.xproducts', {
                    slidesPerView: 7, // Display 7 items at a time
                    spaceBetween: 10, // Adjust the spacing between items
                    navigation: {
                        nextEl: '.nextxp',
                        prevEl: '.prevxp',
                    },
                });
            } else {
                console.log('Not found');
                $('#loginStatus').text('No Data Found');
            }
        },
        error: function() {
            $('#loginStatus').text('An error occurred while attempting to retrieve data.');
        }
    });
});
 /* end corouse */