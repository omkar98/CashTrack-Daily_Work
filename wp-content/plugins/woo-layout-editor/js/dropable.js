jQuery(document).ready(function($) {

  // calculate sortable serialization value from the current layers state

  // product layers
  var lis = document.getElementById("sortable1").getElementsByTagName("li");
  var sortable_serialize_layers_product = "";
  for(i = 0 ; i < 12 ; i++ ){
    sortable_serialize_layers_product += "id[]=" + lis[i].outerText.substr(0,2).trim() + "&";
  }
  // take of last "&"
  sortable_serialize_layers_product = sortable_serialize_layers_product.slice(0, -1);
  //$('#serialize-layers').val(sortable_serialize_layers);

  // shop layers
  var lis = document.getElementById("sortable_shop1").getElementsByTagName("li");
  var sortable_serialize_layers_shop = "";
  for(i = 0 ; i < 9 ; i++ ){
    sortable_serialize_layers_shop += "id[]=" + lis[i].outerText.substr(0,2).trim() + "&";
  }
  // take of last "&"
  sortable_serialize_layers_shop = sortable_serialize_layers_shop.slice(0, -1);
  //$('#serialize-layers').val(sortable_serialize_layers);


 // shop products layers
  var lis = document.getElementById("sortable_shop1pr").getElementsByTagName("li");
  var sortable_serialize_layers_shop_products = "";
  for(i = 0 ; i < 6 ; i++ ){
    sortable_serialize_layers_shop_products += "id[]=" + lis[i].outerText.substr(0,2).trim() + "&";
  }
  // take of last "&"
  sortable_serialize_layers_shop_products = sortable_serialize_layers_shop.slice(0, -1);
 
  // update serialization dynamically upon moving

  $( function() {
    $( "#sortable1, #sortable2" ).sortable({
      connectWith: ".connectedSortable",
      update: function (event, ui) {
        if ($(this).is("#sortable1")) {
          sortable_serialize_layers_product = $(this).sortable('serialize');
          $('#serialize-layers').val(sortable_serialize_layers_product);
          // calculate height according to ul height
          if ( $("#sortable1").height() > $("#sortable2").height())
                   $('div#Product_layout_Editor_Meta_Box').height($("#sortable1").height() + 70);
          else
                   $('div#Product_layout_Editor_Meta_Box').height($("#sortable2").height() + 70); 
			// save the height for later use
       		localStorage.setItem('product_meta_box_height',$('div#Product_layout_Editor_Meta_Box').height());
        }
        else // sortable2
          sortable_serialize_trash = $(this).sortable('serialize');
      }, //  update: function (event, ui) {
    }).disableSelection(); //  $( "#sortable1, #sortable2" ).sortable({
  } ); // $( function() {

  // update dynamically for shop

  var shop_meta_box_height;
  $( function() {
    $( "#sortable_shop1, #sortable_shop2" ).sortable({
      connectWith: ".connectedSortable",
	  // adding shop product indication after tth layer
      stop: function(event, ui) {
	   if ($("#sortable_shop1 li").length > 6 ){
		 if (!$('#sortable_shop1').find('b').length)			
			 $('#sortable_shop1 li:nth-child(7)').after('<b>Here come the products</b>');
		$('#sortable_shop2 b').remove();
		$('#sortable_shop1pr b').remove();
		$('#sortable_shop2pr b').remove();		
		$('#sortable1 b').remove();		
		$('#sortable2 b').remove();		
	   }
       else{
     	if(!$("#sortable_shop1").find('b').length)
		     	$("#sortable_shop1 li:last-child").after('<b>Here come the products</b>');
		$('#sortable_shop2 b').remove();		
		$('#sortable_shop1pr b').remove();
		$('#sortable_shop2pr b').remove();		
		$('#sortable1 b').remove();		
		$('#sortable2 b').remove();		
	   }		
      },	  
      update: function (event, ui) {
        if ($(this).is("#sortable_shop1")) {
          sortable_serialize_layers_shop = $(this).sortable('serialize');
          $('#serilization-layers-shop').val(sortable_serialize_layers_shop);
		  // delete the product loop indication if exists
		  $("#sortable_shop1 b").remove();
          // calculate height according to ul height
          if ( ($("#sortable_shop1").height() + 70) > $("#sortable_shop2").height())
                   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 140);
           else
                   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop2").height() + 70);
           // get the height here since checked later in order to choose the most heigh in the shop meta box  
           shop_meta_box_height_general = $('div#Shop_Layout_Editor_Meta_Box').height();
		   localStorage.setItem('shop_meta_box_height',$('div#Shop_Layout_Editor_Meta_Box').height());
        }
        else // sortable2
          sortable_serialize_trash = $(this).sortable('serialize');
      }, //  update: function (event, ui) {
    }).disableSelection(); //  $( "#sortable1, #sortable2" ).sortable({
  } ); // $( function() {


  // update dynamically for shop products

  $( function() {
    $( "#sortable_shop1pr, #sortable_shop2pr" ).sortable({
      connectWith: ".connectedSortable",
      update: function (event, ui) {
        if ($(this).is("#sortable_shop1pr")) {
          sortable_serialize_layers_shop_products = $(this).sortable('serialize');
          $('#serilization-layers-shop-products').val(sortable_serialize_layers_shop_products);
          // calculate height according to ul height
          if ( $("#sortable_shop1").height() > $("#sortable_shop2").height())                
                   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 70);
          else
                   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop2").height() + 70);
		  //localStorage.setItem('shop_layout_meta_box_height',$('div#Shop_Layout_Editor_Meta_Box').height());
   
        }
        else // sortable2
          sortable_serialize_trash_shop_products = $(this).sortable('serialize');
      }, //  update: function (event, ui) {
    }).disableSelection(); //  $( "#sortable1, #sortable2" ).sortable({
  } ); // $( function() {

  // Product - desirialize from options and build sortable1 and the trash table

  $( function() {

    // Build Product Page When Submit or Refresh

    // get value from php options
    serialize_data_before_processing_product = objectFromPhp2.sortable_option;
    // take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
    serialize_data_before_processing_product = serialize_data_before_processing_product.substring(5);

    var junk_array =[1,2,3,4,5,6,7,8,9,10,11,12];

    if (serialize_data_before_processing_product != "") {

      // zero sortable1 <li> in <ul> before restoring from options

      $('#sortable1').empty();

      // process and add one by one every layer in a loop
      while (serialize_data_before_processing_product) {
        index_of_next_prefix = serialize_data_before_processing_product.indexOf('&');
        if (index_of_next_prefix >= 1)
          current_layer_id = serialize_data_before_processing_product.substring(0, index_of_next_prefix);
        else
          current_layer_id = serialize_data_before_processing_product;

        current_layer_id = parseInt(current_layer_id);
        // reduce corresponding element from junk array
        junk_array.splice(junk_array.indexOf(current_layer_id), 1);
        switch (current_layer_id) {
          case 1:
            $('#sortable1').append('<li  id = "id_1"> 1 On Sale Indication</li>');
            break;
          case 2:
            $('#sortable1').append('<li  id = "id_2"> 2 Product Feature Image</li>');
            break;
          case 3:
            $('#sortable1').append('<li  id = "id_3"> 3 Product Title</li>');
            break;
          case 4:
            $('#sortable1').append('<li  id = "id_4"> 4 Product Rating</li>');
            break;
          case 5:
            $('#sortable1').append('<li  id = "id_5"> 5 Product Price</li>');
            break;
          case 6:
            $('#sortable1').append('<li  id = "id_6"> 6 Short Description(excerpt)</li>');
            break;
          case 7:
            $('#sortable1').append('<li  id = "id_7"> 7 Add to Cart Button</li>');
            break;
          case 8:
            $('#sortable1').append('<li  id = "id_8"> 8 Product Categories Meta Box</li>');
            break;
          case 9:
            $('#sortable1').append('<li  id = "id_9"> 9 Social Sharing Button</li>');
            break;
          case 10:
            $('#sortable1').append('<li  id = "id_10"> 10 Data Tabs and Their Content</li>');
            break;
          case 11:
            $('#sortable1').append('<li  id = "id_11"> 11 Product Upsell Sisply</li>');
            break;
          case 12:
            $('#sortable1').append('<li  id = "id_12"> 12  Related Products</li>');
            break;

          default:
          //default code block
        }

        // prepare for next round
        serialize_data_before_processing_product = serialize_data_before_processing_product.substring(index_of_next_prefix + 6);
      }// while (serialize_data_before_processing) {
    }// if (serialize_data_before_processing != "") {

    // build the junk table

    // usually start from 0 but here I adpted to the layer names
    for  (junk_index = 1 ; junk_index < junk_array.length + 1; junk_index++){
      switch (junk_array[junk_index - 1]) {
        case 1:
          $('#sortable2').append('<li  id = "id_1"> 1 On Sale Indication</li>');
          break;
        case 2:
          $('#sortable2').append('<li  id = "id_2"> 2 Product Feature Image</li>');
          break;
        case 3:
          $('#sortable2').append('<li  id = "id_3"> 3 Product Title</li>');
          break;
        case 4:
          $('#sortable2').append('<li  id = "id_4"> 4 Product Rating</li>');
          break;
        case 5:
          $('#sortable2').append('<li  id = "id_5"> 5 Product Price</li>');
          break;
        case 6:
          $('#sortable2').append('<li  id = "id_6"> 6 Short Description(excerpt)</li>');
          break;
        case 7:
          $('#sortable2').append('<li  id = "id_7"> 7 Add to Cart Button</li>');
          break;
        case 8:
          $('#sortable2').append('<li  id = "id_8"> 8 Product Categories Meta Box</li>');
          break;
        case 9:
          $('#sortable2').append('<li  id = "id_9"> 9 Social Sharing Button</li>');
          break;
        case 10:
          $('#sortable2').append('<li  id = "id_10"> 10 Data Tabs and Their Content</li>');
          break;
        case 11:
          $('#sortable2').append('<li  id = "id_11"> 11 Product Upsell Sisply</li>');
          break;
        case 12:
          $('#sortable2').append('<li  id = "id_12"> 12  Related Products</li>');
          break;

        default:
        //default code block
      }// switch (junk_array[junk_index]) {

    }// for  (junk_index = 1 ; junk_index < junk_array.length + 1; junk_index++){

    // Shop Page - desirialize from options and build sortable1 and the trash table

    // get value from php options
    serialize_data_before_processing_shop = objectFromPhpShop2.sortable_option_shop;
    // take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
    serialize_data_before_processing_shop = serialize_data_before_processing_shop.substring(9);

    var junk_array_shop =[1,2,3,4,5,6,7,8,9];

    if (serialize_data_before_processing_shop != "") {

      // zero sortable1 <li> in <ul> before restoring from options

      $('#sortable_shop1').empty();
      
	  // index in order to add the product loop border
	  product_loop_border_index = 1;
	  add_bottom_border_flag = false;
      // process and add one by one every layer in a loop
      while (serialize_data_before_processing_shop) {
		if (product_loop_border_index == 7)
			 add_bottom_border_flag = true;
		 else
			 add_bottom_border_flag = false;
			 
		 product_loop_border_index++;
        index_of_next_prefix = serialize_data_before_processing_shop.indexOf('&');
        if (index_of_next_prefix >= 1)
          current_layer_id = serialize_data_before_processing_shop.substring(0, index_of_next_prefix);
        else
          current_layer_id = serialize_data_before_processing_shop;

        current_layer_id = parseInt(current_layer_id);
        // reduce corresponding element from junk array
         junk_array_shop.splice(junk_array_shop.indexOf(current_layer_id), 1);
        switch (current_layer_id) {
		
          case 1:
            $('#sortable_shop1').append('<li  id = "idshop_1"> 1 Output Content Wrapper</li>');
			if (add_bottom_border_flag){
                $('#sortable_shop1 #idshop_1').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_1').addClass('add-product-loop-border');
                //add_bottom_border_flag = false;
			}				
            break;
          case 2:
            $('#sortable_shop1').append('<li  id = "idshop_2"> 2 Breadcrumb</li>');
			if (add_bottom_border_flag){
                $('#sortable_shop1 #idshop_2').after('<b>Here come the products</b>');
			    $('#sortable_shop1 #idshop_2').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
            break;
          case 3:
            $('#sortable_shop1').append('<li  id = "idshop_3"> 3 Taxonomy Archive Description</li>');
 			if (add_bottom_border_flag){
               $('#sortable_shop1 #idshop_3').after('<b>Here come the products</b>');
			   $('#sortable_shop1 #idshop_3').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
            break;
          case 4:
            $('#sortable_shop1').append('<li  id = "idshop_4"> 4 Product Archive Description</li>');
			if (add_bottom_border_flag){
                 $('#sortable_shop1 #idshop_4').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_4').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
           break;
         case 5:
            $('#sortable_shop1').append('<li  id = "idshop_5"> 5 Print Notices</li>');
 			if (add_bottom_border_flag){
               $('#sortable_shop1 #idshop_5').after('<b>Here come the products</b>');
			   $('#sortable_shop1 #idshop_5').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
            break;
          case 6:
            $('#sortable_shop1').append('<li  id = "idshop_6"> 6 Result Count</li>');
 			if (add_bottom_border_flag){
                $('#sortable_shop1 #idshop_6').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_6').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
          break;
          case 7:
            $('#sortable_shop1').append('<li  id = "idshop_7"> 7 Catalog Ordering</li>');
 			if (add_bottom_border_flag){
                $('#sortable_shop1 #idshop_7').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_7').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
           break;
          case 8:
            $('#sortable_shop1').append('<li  id = "idshop_8"> 8 Pagination</li>');
			if (add_bottom_border_flag){
                 $('#sortable_shop1 #idshop_8').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_8').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
           break;
          case 9:
            $('#sortable_shop1').append('<li  id = "idshop_9"> 9 Content Wrapper End</li>');
 			if (add_bottom_border_flag){
                $('#sortable_shop1 #idshop_9').after('<b>Here come the products</b>');
				$('#sortable_shop1 #idshop_9').addClass('add-product-loop-border');
                add_bottom_border_flag = false;
			}
           break;

          default:
            //default code block
         }

        // prepare for next round
         serialize_data_before_processing_shop = serialize_data_before_processing_shop.substring(index_of_next_prefix + 10);
      }// while (serialize_data_before_processing) {
	   if ($("#sortable_shop1 li").length < 7 )
        	$("#sortable_shop1 li:last-child").after('<b>Here come the products</b>');	   
		  
    }// if (serialize_data_before_processing != "") {

    // build the junk table

    // usually start from 0 but here I adpted to the layer names
    for  (junk_index = 1 ; junk_index < junk_array_shop.length + 1; junk_index++){
      switch (junk_array_shop[junk_index - 1]) {
         case 1:
          $('#sortable_shop2').append('<li  id = "idshop_1"> 1 Output Content Wrapper</li>');
          break;
        case 2:
          $('#sortable_shop2').append('<li  id = "idshop_2"> 2 Breadcrumb</li>');
          break;
        case 3:
          $('#sortable_shop2').append('<li  id = "idshop_3"> 3 Taxonomy Archive Description</li>');
          break;
        case 4:
          $('#sortable_shop2').append('<li  id = "idshop_4"> 4 Product Archive Description</li>');
          break;
        case 5:
          $('#sortable_shop2').append('<li  id = "idshop_5"> 5 Print Notices</li>');
          break;
        case 6:
          $('#sortable_shop2').append('<li  id = "idshop_6"> 6 Result Count</li>');
          break;
        case 7:
          $('#sortable_shop2').append('<li  id = "idshop_7"> 7 Catalog Ordering</li>');
          break;
        case 8:
          $('#sortable_shop2').append('<li  id = "idshop_8"> 8 Pagination</li>');
          break;
        case 9:
          $('#sortable_shop2').append('<li  id = "idshop_9"> 9 Content Wrapper End</li>');
          break;

        default:
          //default code block
      }// switch (junk_array[junk_index]) {

    }// for  (junk_index = 1 ; junk_index < junk_array.length + 1; junk_index++){


    // Shop products Page - desirialize from options and build sortable1 and the trash table

    // get value from php options
    serialize_data_before_processing_shop_products = objectFromPhpShop2pr.sortable_option_shop_products;
    // take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
    serialize_data_before_processing_shop_products = serialize_data_before_processing_shop_products.substring(11);

    var junk_array_shop_products =[1,2,3,4,5,6];

    if (serialize_data_before_processing_shop_products != "") {

      // zero sortable1 <li> in <ul> before restoring from options

      $('#sortable_shop1pr').empty();

      // process and add one by one every layer in a loop
        while (serialize_data_before_processing_shop_products) {
        index_of_next_prefix = serialize_data_before_processing_shop_products.indexOf('&');
        if (index_of_next_prefix >= 1)
          current_layer_id = serialize_data_before_processing_shop_products.substring(0, index_of_next_prefix);
        else
          current_layer_id = serialize_data_before_processing_shop_products;

        current_layer_id = parseInt(current_layer_id);
        // reduce corresponding element from junk array
        //junk_array.splice(current_layer_id - 1, 1);
        junk_array_shop_products.splice(junk_array_shop_products.indexOf(current_layer_id), 1);
        switch (current_layer_id) {
          case 1:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_1"> 1 Show Product Sale Flash</li>');
            break;
          case 2:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_2"> 2  Product Thumbnail</li>');
            break;						
          case 3:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_3"> 3  Product Title</li>');
            break;
          case 4:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_4"> 4 Product Price</li>');
            break;
         case 5:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_5"> 5 Product Rating</li>');
            break;
          case 6:
            $('#sortable_shop1pr').append('<li  id = "idshoppr_6"> 6 Product Add to Cart Button</li>');
            break;
  
          default:
            //default code block
        }

        // prepare for next round
         serialize_data_before_processing_shop_products = serialize_data_before_processing_shop_products.substring(index_of_next_prefix + 12);
     }// while (serialize_data_before_processing) {
    }// if (serialize_data_before_processing != "") {

    // build the junk table
  
    // usually start from 0 but here I adpted to the layer names
    for  (junk_index = 1 ; junk_index < junk_array_shop_products.length + 1; junk_index++){
      switch (junk_array_shop_products[junk_index - 1]) {
          case 1:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_1"> 1 Show Product Sale Flash</li>');
            break;
          case 2:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_2"> 2  Product Thumbnail</li>');
            break;						
          case 3:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_3"> 3  Product Title</li>');
            break;
          case 4:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_4"> 4 Product Price</li>');
            break;
         case 5:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_5"> 5 Product Rating</li>');
            break;
          case 6:
            $('#sortable_shop2pr').append('<li  id = "idshoppr_6"> 6 Product Add to Cart Button</li>');
            break;

        default:
          //default code block
      }// switch (junk_array[junk_index]) {

    }// for  (junk_index = 1 ; junk_index < junk_array.length + 1; junk_index++){
    
});//$( function() {

 //------ END - Shop products Page - desirialize from options and build sortable1 and the trash table    --------------------------

 // Product - Default Layer Click --> Woocommerce default layout. Sortable2 --> 0

  jQuery('#default_layers').click(function() {
    // empty main box
    $('#sortable1').empty();
    // fill in default values
    for  (default_index = 1 ; default_index < 13 ; default_index++){
      switch (default_index) {
        case 1:
          $('#sortable1').append('<li  id = "id_1"> 1 On Sale Indication</li>');
          break;
        case 2:
          $('#sortable1').append('<li  id = "id_2"> 2 Product Feature Image</li>');
          break;
        case 3:
          $('#sortable1').append('<li  id = "id_3"> 3 Product Title</li>');
          break;
        case 4:
          $('#sortable1').append('<li  id = "id_4"> 4 Product Rating</li>');
          break;
        case 5:
          $('#sortable1').append('<li  id = "id_5"> 5 Product Price</li>');
          break;
        case 6:
          $('#sortable1').append('<li  id = "id_6"> 6 Short Description(excerpt)</li>');
          break;
        case 7:
          $('#sortable1').append('<li  id = "id_7"> 7 Add to Cart Button</li>');
          break;
        case 8:
          $('#sortable1').append('<li  id = "id_8"> 8 Product Categories Meta Box</li>');
          break;
        case 9:
          $('#sortable1').append('<li  id = "id_9"> 9 Social Sharing Button</li>');
          break;
        case 10:
          $('#sortable1').append('<li  id = "id_10"> 10 Data Tabs and Their Content</li>');
          break;
        case 11:
          $('#sortable1').append('<li  id = "id_11"> 11 Product Upsell Sisply</li>');
          break;
        case 12:
          $('#sortable1').append('<li  id = "id_12">12  Related Products</li>');
          break;

        default:
        //default code block
      }// switch (default_index) {

    }// for  (default_index = 1 ; default_index < 13 ; default_index++){

    // empty junk box

    sortable_serialize_layers_product = 'id[]=1&id[]=2&id[]=3&id[]=4&id[]=5&id[]=6&id[]=7&id[]=8&id[]=9&id[]=10&id[]=11&id[]=12';
    $('#serialize-layers').val(sortable_serialize_layers_product);
    //$('#sortable2').empty();
    $('#sortable2').text('Trash');
  });// jQuery('#default_layers').click(function() {


  //-----------------

  // Default Layer Shop Click --> Woocommerce default layout. Sortable2 --> 0

  jQuery('#default_layers_shop').click(function() {
    // empty main box
    $('#sortable_shop1').empty();
    // fill in default values
    for  (default_index = 1 ; default_index < 16 ; default_index++){
      switch (default_index) {
        case 1:
          $('#sortable_shop1').append('<li  id = "idshop_1"> 1 Output Content Wrapper</li>');
          break;
        case 2:
          $('#sortable_shop1').append('<li  id = "idshop_2"> 2 Breadcrumb</li>');
          break;
        case 3:
          $('#sortable_shop1').append('<li  id = "idshop_3"> 3 Taxonomy Archive Description</li>');
          break;
        case 4:
          $('#sortable_shop1').append('<li  id = "idshop_4"> 4 Product Archive Description</li>');
          break;
        case 5:
          $('#sortable_shop1').append('<li  id = "idshop_5"> 5 Print Notices</li>');
          break;
        case 6:
          $('#sortable_shop1').append('<li  id = "idshop_6"> 6 Result Count</li>');
          break;
        case 7:
          $('#sortable_shop1').append('<li  id = "idshop_7"> 7 Catalog Ordering</li>');
		  $('#sortable_shop1 li:nth-child(7)').after('<b>Here come the products</b>');
          break;
        case 8:
          $('#sortable_shop1').append('<li  id = "idshop_8"> 8 Pagination</li>');
          break;
        case 9:
          $('#sortable_shop1').append('<li  id = "idshop_9"> 9 Content Wrapper End</li>');
          break;

        default:
          //default code block
      }// switch (default_index) {

    }// for  (default_index = 1 ; default_index < 13 ; default_index++){

    // empty junk box

    sortable_serialize_layers_shop = 'idshop[]=1&idshop[]=2&idshop[]=3&idshop[]=4&idshop[]=5&idshop[]=6&idshop[]=7&idshop[]=8&idshop[]=9';
    $('#serilization-layers-shop').val(sortable_serialize_layers_shop);
    //$('#sortable_shop2').empty();
    $('#sortable_shop2').text('Trash');
	// adjust the height by adding 70px for the "Here come products" message
	$('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 70);
  });// jQuery('#default_layers_shop').click(function() {

// Default Layer Shop Click --> Woocommerce default layout. Sortable2 --> 0

  jQuery('#default_layers_shop_products').click(function() {
    // empty main box
    $('#sortable_shop1pr').empty();
    // fill in default values
    for  (default_index = 1 ; default_index < 7 ; default_index++){
      switch (default_index) {
         case 1:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_1"> 1 Show Product Sale Flash</li>');
          break;
        case 2:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_2"> 2  Product Thumbnail</li>');
          break;
        case 3:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_3"> 3  Product Title</li>');
          break;
        case 4:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_4"> 4 Product Price</li>');
          break;
        case 5:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_5"> 5 Product Rating</li>');
          break;
        case 6:
          $('#sortable_shop1pr').append('<li  id = "idshoppr_6"> 6 Product Add to Cart Button</li>');
          break;

        default:
          //default code block
      }// switch (default_index) {

    }// for  (default_index = 1 ; default_index < 13 ; default_index++){

    // empty junk box

    sortable_serialize_layers_shop_products = 'idshoppr[]=1&idshoppr[]=2&idshoppr[]=3&idshoppr[]=4&idshoppr[]=5&idshoppr[]=6';
    $('#serilization-layers-shop-products').val(sortable_serialize_layers_shop_products);
    $('#sortable_shop2pr').text('Trash');

  });// jQuery('#default_layers_shop').click(function() {


}); // jQuery(document).ready(function($) {