	var sortable_serialize_layers_shop_products="";

	jQuery(document).ready(function($) {

 	 // shop products layers
	  var lis = document.getElementById("sortable_shop1pr").getElementsByTagName("li");
	  var sortable_serialize_layers_shop_products = "";
	  for(i = 0 ; i < 6 ; i++ ){
		sortable_serialize_layers_shop_products += "id[]=" + lis[i].outerText.substr(0,2).trim() + "&";
	  }
	  // take of last "&"
	  sortable_serialize_layers_shop_products = sortable_serialize_layers_shop.slice(0, -1);

	  // update dynamically for shop products
 
	  var element_index_sp = 1;
	  var button_index_sp =0;
	  var link_index_sp =0;
	  var markup_index_sp =0;
	  
	
	  
	  $( function() {
	  $( "#sortable_shop1pr, #sortable_shop2pr, #builder-div-shop-products .ul-builder" ).sortable({
		  connectWith: ".connectedSortable",
		  update: function (event, ui) {
			if ($(this).is("#sortable_shop1pr")) {
			  sortable_serialize_layers_shop_products = $(this).sortable('serialize');
			  $('#serilization-layers-shop-products').val(sortable_serialize_layers_shop_products);
			  // calculate height according to ul height
			  if ( $("#sortable_shop1pr").height() > $("#sortable_shop2pr").height())
					   $('div#Shop_Products_Layout_Editor_Meta_Box').height($("#sortable_shop1pr").height() + 70);
			  else
					   $('div#Shop_Products_Layout_Editor_Meta_Box').height($("#sortable_shop2pr").height() + 70); 
				// save the height for later use
				localStorage.setItem('shop_product_meta_box_height',$('div#Shop_Products_Layout_Editor_Meta_Box').height());
			}
			else if ($(this).is("#builder-div-shop-products .ul-builder")) {
			 ;//$('#sortable_shop1pr .content-elemet').text("custom text");
			}
			else // sortable_shop2pr
			  sortable_serialize_trash = $(this).sortable('serialize');
		  }, //  update: function (event, ui) {
		  
		 // cloning back custom elements after dragging to the product table 
		 stop: function(event, ui) {
		//if($('.ul-builder').has('content-elemet')) {
		if($(this).has('content-elemet')) {
			 new_class = '.' + element_index_sp;
			 builder_value =  $('#serialize-layers-shop-products-builder').val();
			 index_of_id_candidat = $('#serialize-layers-shop-products-builder').val().indexOf(element_index_sp +6);
			 while(  $('#serialize-layers-shop-products-builder').val().indexOf(element_index_sp + 6) > -1 ) {
              element_index_sp++;
			  new_class = '.' + element_index_sp;
			  $("#sortable_shop1pr .content-elemet").attr("id","idshoppr_" + (element_index_sp + 6 ).toString());
		     }
			 
			 $('#sortable_shop1pr .content-elemet').addClass(element_index_sp.toString());
			 $('#sortable_shop1pr .content-elemet').addClass('removable');
			if  ($(new_class).hasClass("markup")){	
			   if ( new_class < 0)
			   alert ('markup new class = ' + new_class);
			   markup_index_sp++;		 
			   $(new_class ).clone().appendTo($(this));// put it down
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('.' + element_index_sp.toString());
				$("#sortable_shop1pr " + new_class).attr("id","idshoppr_" + (element_index_sp + 6).toString());
			   if (($('#builder-div-shop-products  .markup-label').val().length < 3)){ 
				  $('#sortable_shop1pr .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   else if ($('#builder-div-shop-products  .textarea-markup-id').val().length < 3){
				  $('#sortable_shop1pr .content-elemet').remove();				  
				  alert("you must write some markup code");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   else if (!($('#builder-div-shop-products  .markup-link').val().indexOf("//") >= 0) && $('#builder-div-shop-products  .markup-link').val().length > 0){
				  $('#sortable_shop1pr .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   add_elements_array($("#sortable_shop1pr " + new_class).attr("id"), 'markup',$('#builder-div-shop-products  .markup-label').val(), 
				   $('#builder-div-shop-products li .markup-link').val(), $('#builder-div-shop-products li .markup-class').val(), $('#builder-div-shop-products  .textarea-markup-id').val(), "end");


     		   $("#sortable_shop1pr " + new_class + " span").text($("#builder-div-shop-products  .markup-label").val());
			   $(new_class ).removeClass(element_index_sp.toString());
			} // markup
			 else if ($(new_class).hasClass("button")){
			   if ( new_class < 0)
			   alert ('button new class = ' + new_class);
			   button_index_sp++;
			   inslall_selector = '#builder-div-shop-products .ul-builder' + ' .link';
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('.' + element_index_sp.toString());
				$("#sortable_shop1pr " + new_class).attr("id","idshoppr_" + (element_index_sp + 6).toString());
			   if (($('#builder-div-shop-products  .button-label').val().length < 3)){ 
				  $('#sortable_shop1pr .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   else if ( ($('#builder-div-shop-products  .button-link').val().length > 0)  && !($('#builder-div-shop-products  .button-link').val().indexOf("//") >= 0)){
				$('#sortable_shop1pr .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   add_elements_array($("#sortable_shop1pr " + new_class).attr("id"), 'button',$('#builder-div-shop-products  .button-label').val(), 
				   $('#builder-div-shop-products li .button-link').val(), $('#builder-div-shop-products li .button-class').val(), "", "end");
				
			   $("#sortable_shop1pr " + new_class + " span").text($("#builder-div-shop-products  .button-label").val());
			   $(new_class ).removeClass(element_index_sp.toString());
			   }// button
			 else if ($(new_class).hasClass("link")){
			   if ( new_class < 0)
			   alert ('link new class = ' + new_class);
			   link_index_sp++;
			   inslall_selector = '#builder-div-shop-products .ul-builder' + ' .markup';
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop-products  .ul-builder .removable').removeClass('.' + element_index_sp.toString());
			   $("#sortable_shop1pr " + new_class).attr("id","idshoppr_" + (element_index_sp + 6).toString());
			   if (($('#builder-div-shop-products  .link-label').val().length < 3)){
				  $('#sortable_shop1pr .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   else if (( $('#builder-div-shop-products  .link-link').val().length > 0)&& !($('#builder-div-shop-products  .link-link').val().indexOf("//") >= 0)){
	             $('#sortable_shop1pr .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   add_elements_array($("#sortable_shop1pr " + new_class).attr("id"), 'link',$('#builder-div-shop-products  .link-label').val(), 
				   $('#builder-div-shop-products li .link-link').val(), $('#builder-div-shop-products li .link-class').val(), "", "end");
				
			   $("#sortable_shop1pr " + new_class + " span").text($("#builder-div-shop-products  .link-label").val());
			   $(new_class ).removeClass(element_index_sp.toString());
			   
			   } // link	  
				 // always   
			   $('#sortable_shop1pr .content-elemet').removeClass('content-elemet');		   
			   // update product hidden serialization text box 
			   sortable_serialize_layers_shop_products = $('#sortable_shop1pr').sortable('serialize');
			   $('#serilization-layers-shop-products').val(sortable_serialize_layers_shop_products);
			   			 
			 //$('.ul-builder .removable').removeClass('removable');
		} // if($('.ul-builder').has('content-elemet')) 
		// deleting completely if thrown from product layer(to trash or back to builder
		if ($(this).is("#sortable_shop1pr")){ 
		   if( $('#sortable_shop2pr').find('.removable').length > 0 ) {
			   // reduce from elements_array
               var  idd = $('#sortable_shop2pr .removable').attr('id');   
			   throw_from_elements_array($('#sortable_shop2pr .removable').attr('id'),true);			   
			   $('#sortable_shop2pr .removable').remove();
		   }		   
		   if( $('#builder-div-shop-products .ul-builder').find('.removable').length > 0 ) {
			   throw_from_elements_array($('#builder-div-shop-products  .ul-builder .removable').attr('id'), true);
			$('#builder-div-shop-products  .ul-builder .removable').remove(); 
		   }
		} // if ($(this).is("#sortable_shop1pr")){ 
		// rearrange orginal builder if reordered by user
		if ($(this).is("#builder-div-shop-products .ul-builder")){
		 $("#builder-div-shop-products  .ul-builder .link").insertAfter("#builder-div-shop-products  .ul-builder .button");
		 $("#builder-div-shop-products  .ul-builder .markup").insertAfter("#builder-div-shop-products  .ul-builder .link");
		}
	   }// stop: function(event, ui) {
	   
		}).disableSelection(); //  $( "#sortable_shop1pr, #sortable_shop2pr" ).sortable({
	  } ); // $( function() { $( "#sortable_shop1pr, #sortable_shop2pr, #builder-div-shop-products .ul-builder" ).sortable({



	  // build dynamically builder elements string and in shop products
	  //  text box( for later saving in options)
		 
	  // new version without using arrays at all(since in the beginning and in the end we use strings)
	  function add_elements_array(elemnt_id, type, label, link_address, element_class, markup ,end_character){
	   // fill out any empty element with "null"
		if ( arguments[1] == 'markup' )
		   arguments[5] = b64EncodeUnicode(arguments[5]);
		current_element ="";
		for (var i = 0; i < arguments.length; i++) {
		current_element = current_element + ',' + arguments[i];
		}
	   // current builder string    
	   serialized_builder_string = $('#serialize-layers-shop-products-builder').val();
		  // !!!!!!! debug only-check if there is already such id
	   if (( $('#serialize-layers-shop-products-builder').val()).indexOf(arguments[0]) > -1 )
		  alert ("duplicate id: " +  current_element);
	   $('#serialize-layers-shop-products-builder').val(serialized_builder_string + current_element);
	  } // function add_elements_array
	  

	  //Remove the thrown element from builder elements array 
	  
	  function throw_from_elements_array(throw_elemnt_id, with_reset_element){
	  // !!!!! debug verify single element matching
	  var element_index_in_builder = $('#serialize-layers-shop-products-builder').val().indexOf(throw_elemnt_id) - 1; // to drop the comma
	  if ( element_index_in_builder < 0 )
		  alert ('element with id 0f ' + throw_elemnt_id + ' missing from product builder');
	  var containing_element_string = $('#serialize-layers-shop-products-builder').val().substr(element_index_in_builder);
	  var element_end_index_in_element_string = containing_element_string.indexOf('end') + 2;// we search or the 'd'
	  var element_end_index_in_builder = element_index_in_builder + element_end_index_in_element_string; 
	  var first_part_to_be_left = $('#serialize-layers-shop-products-builder').val().substr(0, element_index_in_builder);
	  var second_part_to_be_left = $('#serialize-layers-shop-products-builder').val().substr(element_end_index_in_builder + 1);// after the 'd'
	  // set the new value after throwing our element
	  $('#serialize-layers-shop-products-builder').val(first_part_to_be_left + second_part_to_be_left);
	   if (with_reset_element)
	   reset_product_elements_background();
	   
	   return;
	  } // function throw_from_elements_array
	  	  	   
	  
	// Shop products Page - desirialize from options and build sortable_shop1pr and the trash table

		// get value from php options
		serialize_data_before_processing_shop_products = objectFromPhpShop2pr.sortable_option_shop_products;
		// take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
		serialize_data_before_processing_shop_products = serialize_data_before_processing_shop_products.substring(11);

		// get the value from the builder hidden text box
		builder_text = $('#serialize-layers-shop-products-builder').val();
		var element_properties_as_array = null;// assume nothing on startup


		var junk_array_shop_products =[1,2,3,4,5,6];

		if (serialize_data_before_processing_shop_products != "") {

		  // zero sortable_shop1pr <li> in <ul> before restoring from options

		  $('#sortable_shop1pr').empty();

		  // process and add one by one every layer in a loop
			while (serialize_data_before_processing_shop_products) {
			index_of_next_prefix = serialize_data_before_processing_shop_products.indexOf('&');
			if (index_of_next_prefix >= 1)
			  current_layer_id = serialize_data_before_processing_shop_products.substring(0, index_of_next_prefix);
			else
			  current_layer_id = serialize_data_before_processing_shop_products;

			current_layer_id = parseInt(current_layer_id);
			junk_array_shop_products.splice(junk_array_shop_products.indexOf(current_layer_id), 1);
			
			
			// in case of custom elements we must retrieve the element
			// properties earlier. It's common to all elements types
		
			if (current_layer_id > 6 ){
			  if ( builder_text.length < 1 )
				alert("error in builder text");
			  // search this element in builder_text			
			  //elemet_start_index = builder_text.indexOf('id_' + current_layer_id.toString());
			  elemet_start_index = builder_text.indexOf('idshoppr_' + current_layer_id.toString());
			  containing_builder_text = builder_text.substr(elemet_start_index);
			  // including the word 'end'
			  elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
			  element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
			  element_properties_as_array = element_properties_as_string.split(',');
			   
			} //if (current_layer_id > 12 ){
			  //else {// no more custom elements
			  // builder_text ='';
			  //}
			
			
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
				  if (  element_properties_as_array[1] == "markup"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshoppr_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable_shop1pr').append('<li id=' + id_element + ' class="markup ui-sortable-handle removable" ><i class="fa fa-html5" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
				  if (  element_properties_as_array[1] == "button"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshoppr_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable_shop1pr').append('<li id=' + id_element + ' class="button ui-sortable-handle removable" style="border:3px;border-style:solid;border-color-red;border-radius: 25px"><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
			  //if ( current_layer_id > 12 ) {
				  if (  element_properties_as_array[1] == "link"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshoppr_" + current_layer_id.toString();
				  $('#sortable_shop1pr').append('<li id=' + id_element + ' class="link ui-sortable-handle removable" ><i class="fa fa-link" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
			  //}  // seems to be not neede
				
			} // switch (current_layer_id) {

			// prepare for next round
			 //serialize_data_before_processing_shop_products = serialize_data_before_processing_shop_products.substring(index_of_next_prefix + 6);
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
	

	// Default Layer Shop Product Click --> Woocommerce default layout. sortable_shop2pr --> 0

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

	  	// empty builder hidden box
		$('#serialize-layers-shop-products-builder').val('');
		
		$('div#Shop_Products_Layout_Editor_Meta_Box').height($("#sortable_shop1pr").height() + 70);
		

	 });// jQuery('#default_layers_shop').click(function() {
	  

	   // onhover on builder elements-> display the properties on builder
	  
	   //$("container").on("click","element",function() { ... });
		$("#sortable_shop1pr").on("mouseleave",".ui-sortable-handle",function() {
		  if ( disable_mouse_events == true )
		  return;
		  $('#builder-div-shop-products  .ul-builder-style input' ).val('');
		  $('#builder-div-shop-products  .ul-builder-style textarea' ).val('');
		  $('#builder-div-shop-products  .ul-builder-link input' ).val('');
		  $('#builder-div-shop-products  .ul-builder-class input' ).val('');
		  $(this).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-shop-products  .textarea-markup-id').css( "background-Color", '#fff' );
		  
		}); // $("#sortable1").on("mouseleave",".ui-sortable-handle",function() {

		function reset_product_elements_background() {
		  $("#sortable_shop1pr .ui-sortable-handle").css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-shop-products  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-shop-products  .textarea-markup-id').css( "background-Color", '#fff' );
		  $("#sortable_shop1pr .ui-sortable-handle").val('');
		  $('#builder-div-shop-products  .ul-builder-style input' ).val('');
		  $('#builder-div-shop-products  .ul-builder-style textarea' ).val('');
		  $('#builder-div-shop-products  .ul-builder-link input' ).val('');
		  $('#builder-div-shop-products  .ul-builder-class input' ).val('');
		  $('#builder-div-shop-products  .textarea-markup-id').val('');
	}	
	
	  // Onclick 
		
	   var disable_mouse_events = false;
	   var privious_clicked_element_id;
	  $("#sortable_shop1pr").on("click",".ui-sortable-handle",function() {
	   var clicked_element_id = $(this).attr('id');
		if (disable_mouse_events == true){
		  disable_mouse_events = false;
			  if ( clicked_element_id != privious_clicked_element_id ){
          		 current_element_id = $( this ).attr('id');
        		 builder_text = $('#serialize-layers-shop-products-builder').val();
        		 elemet_start_index = builder_text.indexOf(current_element_id);
	    		 containing_builder_text = builder_text.substr(elemet_start_index);
			     // including the word 'end'
			     elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
		    	 element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
		    	 element_properties_as_array = element_properties_as_string.split(',');
				//release this element green indications
				$("#sortable_shop1pr .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-shop-products  .ul-builder-style input' ).css("background-Color",'#fff');
				$('#builder-div-shop-products  .ul-builder-style textarea' ).css("background-Color",'#fff');
				$('#builder-div-shop-products  .ul-builder-link input' ).css("background-Color",'#fff');
				$('#builder-div-shop-products  .ul-builder-class input' ).css("background-Color",'#fff'); 
				$('#builder-div-shop-products  .textarea-markup-id').css( "background-Color", '#fff' );
				//$("#sortable1 .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-shop-products  .ul-builder-style input' ).val('');
				$('#builder-div-shop-products  .ul-builder-style textarea' ).val('');
				$('#builder-div-shop-products  .ul-builder-link input' ).val('');
				$('#builder-div-shop-products  .ul-builder-class input' ).val('');
				$('#builder-div-shop-products  .textarea-markup-id').val('');
				// color in green the right element properties
				if ( $( this ).hasClass('button') ){
				 $('#builder-div-shop-products  .button-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop-products li .button-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop-products li .button-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('link') ){
				 $('#builder-div-shop-products  .link-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop-products li .link-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop-products li .link-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('markup')){
                 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
                 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);				 
				 $('#builder-div-shop-products  .textarea-markup-id').val(element_properties_as_array[5]);  				 ;
				 $('#builder-div-shop-products  .markup-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop-products li .markup-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop-products li .markup-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .markup-class').css( "background-Color", '#c0db14' );
				 }
			  } // if ( clicked_element_id != privious_clicked_element_id ){
			  else //  clicked_element_id == privious_clicked_element_id
			  {
			    disable_mouse_events = true;
			    // throw element and than add again
			    throw_from_elements_array(clicked_element_id,false);
				// add again the modified element properties to the builder serilization
				if ($(this).hasClass('button')){
			   add_elements_array($(this).attr("id"), 'button',$('#builder-div-shop-products  .button-label').val(), 
				   $('#builder-div-shop-products li .button-link').val(), $('#builder-div-shop-products li .button-class').val(), "", "end");
			    // modify the new label on element also
				$(this).text($('#builder-div-shop-products  .button-label').val());
				   }
				else if ($(this).hasClass('link')){
			   add_elements_array($(this).attr("id"), 'link',$('#builder-div-shop-products  .link-label').val(), 
				   $('#builder-div-shop-products li .link-link').val(), $('#builder-div-shop-products li .link-class').val(), "", "end");
			    // modify the new label on element also
				$(this).find('span').text($('#builder-div-shop-products  .link-label').val());
				   }
				else if ($(this).hasClass('markup')){
	     		   add_elements_array($(this).attr("id"), 'markup',$('#builder-div-shop-products  .markup-label').val(), 
				   $('#builder-div-shop-products li .markup-link').val(), $('#builder-div-shop-products li .markup-class').val(), $('#builder-div-shop-products  .textarea-markup-id').val(), "end");
			    // modify the new label on element also
				 $(this).find('span').text($('#builder-div-shop-products  .markup-label').val());
				}
			  }
		  } // if (disable_mouse_events == true){
		else
		 disable_mouse_events = true
	   privious_clicked_element_id = clicked_element_id;
	   }); // $("#sortable1").on("click",".ui-sortable-handle",function() {
		   
	
		
	  $("#sortable_shop1pr").on("mouseenter",".ui-sortable-handle",function() {
		  if ( disable_mouse_events == true ) {
		   if (privious_clicked_element_id == privious_clicked_element_id) 
		     $(this).attr('title', 'Click again on the same element to remember modified properties. Click on a different element to unlock ');
		   else
		     $(this).attr('title', 'Click to unlock default custom element');
		  return;
		  }
		 // this is before any click was made
		 
		 $(this).attr('title', 'Click once to lock and modify element properties ');
		 
		 current_element_id = $( this ).attr('id');
		 builder_text = $('#serialize-layers-shop-products-builder').val();
		 elemet_start_index = builder_text.indexOf(current_element_id);
			  containing_builder_text = builder_text.substr(elemet_start_index);
			  // including the word 'end'
			  elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
			  element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
			  element_properties_as_array = element_properties_as_string.split(',');
		  
     		  // verify that its not standard element(for instance idshop_1 similar to udshop11)
			  if ( current_element_id != element_properties_as_array[0])
		    	  return;

		 // fill out the relevant fields in builder table
		 // elemnt_id, type, label, link_address, element_class, markup ,end_character
			var element_type;
			for (var i = 1; i < 6; i++) {
			  switch (i) {
				case 1:
				 element_type = element_properties_as_array[i];
				break;
				case 2: // type
				if (element_type == 'button'){
				 $('#builder-div-shop-products  .button-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'link'){
				 $('#builder-div-shop-products  .link-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'markup'){
				 $('#builder-div-shop-products  .markup-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop-products li .markup-class').css( "background-Color", '#c0db14' );
				 }
				break;
				case 3: // link address
				if (element_type == 'button')
				 $('#builder-div-shop-products li .button-link').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-shop-products li .link-link').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-shop-products li .markup-link').val(element_properties_as_array[i]);
				break;
				case 4: // class
				if (element_type == 'button')
				 $('#builder-div-shop-products li .button-class').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-shop-products li .link-class').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-shop-products li .markup-class').val(element_properties_as_array[i]);
				break;
				case 5: // markup
				if (element_type == 'button')
				 ;//do nothing $('#builder-div-shop-products li .button-class').val("");
				else if (element_type == 'link')
				 ;//$('#builder-div-shop-products li .link-class').val("");
				else if (element_type == 'markup'){
				 //do nothing decode markup code from options box
				 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
				 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);
				 $('#builder-div-shop-products  .textarea-markup-id').val(element_properties_as_array[i]);            			 
				}
				break;
	  
				default:
				//default code block
			  }//switch (i) {
			 
			}//for (var i = 0; i < 7; i++) {


	  }); //  $("#sortable_shop1pr").on("mouseenter",".ui-sortable-handle",function() {


	  
			
			
			
	  // ucs-2 string to base64 encoded ascii
	  function utoa(str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	  }
	  // base64 decode ascii to ucs-2 string
	  function atou(str) {
		return decodeURIComponent(escape(window.atob(str)));
	  }
			
	  
		  // escaping the string before encoding it
	  function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
         return String.fromCharCode('0x' + p1);
       }));
      }
	  // decode the Base64-encoded value back into a String:
	  function b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
       }).join(''));
      }
  
	  
	  
	}); // jQuery(document).ready(function($) {
	
	