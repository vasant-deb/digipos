
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
                        <div class="swiper-slide" id="category${category.id}">
                            <h2>${category.name}</h2>
                        </div>
                    `;
                });

                // Add the "categories" slides to the carousel container
                $('#carousel-container').html(categorySlides.join(''));

                // Create an array of slides for "models" section
                const modelSlides = models.map(model => {
                    return `
                        <div class="swiper-slide" id="model${model.id}">
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
                        <div class="swiper-slide" id="product${product.id}">
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
                de();
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


function addTableRow(productName, productPrice,quantity,pid,sub,sno) {
    
    var newRow = `
        <tr class="invoice-items">
            <td>${sno}</td>
            <td>${productName}<br>$ ${productPrice}</td>
            <td>
                <div class="quantity mycart${pid}" id="card">
                    <div role="group" class="input-group">
                        <div id="dec${pid}" class="input-group-prepend"><span class="btn btn-primary btn-sm">-</span></div>
                        <input class="form-control" id="quantity${pid}"  name="quantity${pid}" type="number" value="${quantity}">
                        <div id="inc${pid}" class="input-group-append"><span class="btn btn-primary btn-sm">+</span></div>
                    </div>
                </div>
            </td>
            <td class="text-center">$ ${sub}</td>
        </tr>
    `;

    // Append the new row to the table
    $('#invoice-table tbody').append(newRow);
  

}
 /* end corouse */
 function de(){
 $('.swiper-slide').on('click', function() {
    var clickSound = document.getElementById('clickSound');
    clickSound.play();
     // Get the id attribute of the clicked swiper-slide element
     var slideId = $(this).attr('id');
     var id = slideId.replace(/^[a-zA-Z]+/, ''); // Remove text from the beginning
     var type = slideId.replace(/\d+$/, ''); // Remove numbers from the end
     const userid=localStorage.getItem('userid');
     // You can now use slideId as needed
     $.ajax({
        type: 'POST', // Adjust the HTTP method as needed (e.g., POST, GET)
        url: 'https://pwa.onlinebilling.ca/getdata', // Replace with your API endpoint for user authentication
        data: {
            type: type,
            id: id,
            userid:userid
        },
        success: function(response) {
          // Check the response from the API
          if (response.error===false) {
            var newupdatedata=response.mydata;
            var type=response.type;
           
           
            if(type=="category"){
                var modelSlides = newupdatedata.map(model => {
                    return `
                        <div class="swiper-slide" id="model${model.id}">
                        <img class="proimage" src="https://api.1stopwireless.ca/public/uploads/categories/${model.image}"/>
                            <h2>${model.name}</h2>
                        </div>
                    `;
                });

                // Add the "models" slides to the carousel container
                $('#carousel-models').html(modelSlides.join(''));
                de();
            }
            if(type=="model"){
                var productSlides = newupdatedata.map(product => {
                    return `
                        <div class="swiper-slide" id="product${product.id}">
                        <img class="proimage" src="https://api.1stopwireless.ca/public/uploads/products/${product.image}"/>
                            <h2>${product.name}</h2>
                        </div>
                    `;
                });

                // Add the "products" slides to the carousel container
                $('#carousel-products').html(productSlides.join(''));   
                de();
            }
            if (type == "product") {
                
                $('#invoice-table tbody').empty();
                // Assuming newupdatedata is an array of products
                var subtotal = 0; // Initialize subtotal
                sno=1;
                newupdatedata.forEach(function(product) {
                    var productName = product.product_name;
                    var productPrice = product.discounted_price;
                    var quantity = product.quantity;
                    var pid = product.product_id;
                    var sub = (productPrice * quantity).toFixed(2);
            
                    // Add the current product's sub to the subtotal
                    subtotal += parseFloat(sub);
            
                    // Call the function to add the table row dynamically for each product
                    addTableRow(productName, productPrice, quantity, pid, sub,sno);
                    sno++;
                });
            
                // Calculate the HST (assuming 13% HST, you can adjust this as needed)
                var hst = (subtotal * 0.13).toFixed(2);
            
                // Calculate the total (subtotal + HST)
                var total = (parseFloat(subtotal) + parseFloat(hst) * 1.00).toFixed(2);
            
                // Add the subtotal row
                var subtotalRow = `
                    <tr class="invoice-items">
                        <td>Subtotal</td>
                        <td></td>
                        <td></td>
                        <td class="text-center">$ ${subtotal}</td>
                    </tr>
                `;
            
                // Add the HST (Tax) row
                var hstRow = `
                    <tr class="invoice-items">
                        <td>HST</td>
                        <td></td>
                        <td></td>
                        <td class="text-center">$ ${hst}</td>
                    </tr>
                `;
            
                // Append the subtotal and HST rows to the table
                $('#invoice-table tbody').append(subtotalRow);
                $('#invoice-table tbody').append(hstRow);
                $('#totalpayable').text(total);
              
            }
            
          
          } else {
            // Authentication failed
            console.log('not found');
          
          }
        },
        error: function() {
       //   $('#loginStatus').text('An error occurred while attempting to log in.');
        }
      });

    
 });
    // Initialize Swiper (you should use your own swiper initialization code)
}
//reset call
$('#reset').on('click', function() {
    var clickSound = document.getElementById('clickSound');
    clickSound.play();
     // Get the id attribute of the clicked swiper-slide element
     const userid=localStorage.getItem('userid');
     // You can now use slideId as needed
     $.ajax({
        type: 'POST', // Adjust the HTTP method as needed (e.g., POST, GET)
        url: 'https://pwa.onlinebilling.ca/clearcart', // Replace with your API endpoint for user authentication
        data: {          
            userid:userid
        },
        success: function(response) {
            const toasts = new Toasts({
                width: 300,
                timing: 'ease',
                duration: '0.5s',
                dimOld: false,
                position: 'top-right' // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
            });
            toasts.push({
                title: 'Reset',
                content: 'Clear Items Successfully',
                style: 'success'
            });

            $('#invoice-table tbody').empty();
          },
            error: function() {
           //   $('#loginStatus').text('An error occurred while attempting to log in.');
            }
          });


        });
//end reset call