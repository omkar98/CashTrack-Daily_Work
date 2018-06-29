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
	 
	  // update serialization dynamically upon moving

	  var element_index = 1;
	  var button_index =0;
	  var link_index =0;
	  var markup_index =0;
	  
	  
	  $( function() {
	  $( "#sortable1, #sortable2, #builder-div-product .ul-builder" ).sortable({
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
			else if ($(this).is("#builder-div-product .ul-builder")) {
			 ;//$('#sortable1 .content-elemet').text("custom text");
			}
			else // sortable2
			  sortable_serialize_trash = $(this).sortable('serialize');
		  }, //  update: function (event, ui) {
		  
		 // cloning back custom elements after dragging to the product table 
		 stop: function(event, ui) {
		if($(this).has('content-elemet')) {
			 new_class = '.' + element_index;
			 builder_value =  $('#serialize-layers-product-builder').val();
			 index_of_id_candidat = $('#serialize-layers-product-builder').val().indexOf(element_index +12);
			 while(  $('#serialize-layers-product-builder').val().indexOf(element_index +12) > -1 ) {
              element_index++;
			  new_class = '.' + element_index;
			  $("#sortable1 .content-elemet").attr("id","id_" + (element_index + 12 ).toString());
		     }
			 
			 $('#sortable1 .content-elemet').addClass(element_index.toString());
			 $('#sortable1 .content-elemet').addClass('removable');
			if  ($(new_class).hasClass("markup")){	
			   if ( new_class < 0)
			   alert ('markup new class = ' + new_class);
			   markup_index++;		 
			   $(new_class ).clone().appendTo($(this));// put it down
			   $('#builder-div-product  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-product  .ul-builder .removable').removeClass('.' + element_index.toString());
				$("#sortable1 " + new_class).attr("id","id_" + (element_index + 12).toString());
			   if (($('#builder-div-product  .markup-label').val().length < 3)){ 
				  $('#sortable1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   if ($('#builder-div-product  .textarea-markup-id').val().length < 3){
				  $('#sortable1 .content-elemet').remove();				  
				  alert("you must write some markup code");	              
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   add_elements_array($("#sortable1 " + new_class).attr("id"), 'markup',$('#builder-div-product  .markup-label').val(), 
				   $('#builder-div-product li .markup-link').val(), $('#builder-div-product li .markup-class').val(), $('#builder-div-product  .textarea-markup-id').val(), "end");


     		   $("#sortable1 " + new_class + " span").text($("#builder-div-product  .markup-label").val());
			   $(new_class ).removeClass(element_index.toString());
			} // markup
			 else if ($(new_class).hasClass("button")){
			   if ( new_class < 0)
			   alert ('button new class = ' + new_class);
			   button_index++;
			   inslall_selector = '#builder-div-product .ul-builder' + ' .link';
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-product  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-product  .ul-builder .removable').removeClass('.' + element_index.toString());
				$("#sortable1 " + new_class).attr("id","id_" + (element_index + 12).toString());
		   if (($('#builder-div-product  .button-label').val().length < 3)){ 
				  $('#sortable1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   //function add_elements_array_markup(elemnt_id, type, label, link_address, class, markup ,*,){
			   add_elements_array($("#sortable1 " + new_class).attr("id"), 'button',$('#builder-div-product  .button-label').val(), 
				   $('#builder-div-product li .button-link').val(), $('#builder-div-product li .button-class').val(), "", "end");
				
			   $("#sortable1 " + new_class + " span").text($("#builder-div-product  .button-label").val());
			   $(new_class ).removeClass(element_index.toString());
			   }// button
			 else if ($(new_class).hasClass("link")){
			   if ( new_class < 0)
			   alert ('link new class = ' + new_class);
			   link_index++;
			   inslall_selector = '#builder-div-product .ul-builder' + ' .markup';
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-product  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-product  .ul-builder .removable').removeClass('.' + element_index.toString());
			   //$("#sortable1 " + new_class + " span").text("Button" + button_index.toString());
			   $("#sortable1 " + new_class).attr("id","id_" + (element_index + 12).toString());
			   if (($('#builder-div-product  .link-label').val().length < 3)){
				  $('#sortable1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
 				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   //function add_elements_array_markup(elemnt_id, type, label, link_address, class, markup ,*,){
			   add_elements_array($("#sortable1 " + new_class).attr("id"), 'link',$('#builder-div-product  .link-label').val(), 
				   $('#builder-div-product li .link-link').val(), $('#builder-div-product li .link-class').val(), "", "end");
				
			   $("#sortable1 " + new_class + " span").text($("#builder-div-product  .link-label").val());
			   $(new_class ).removeClass(element_index.toString());
			   
			   } // link	  
				 // always   
			   $('#sortable1 .content-elemet').removeClass('content-elemet');		   
			   // update product hidden serialization text box 
			   sortable_serialize_layers_product = $('#sortable1').sortable('serialize');
			   $('#serialize-layers').val(sortable_serialize_layers_product);			   
		 
		} // if($('.ul-builder').has('content-elemet')) 
		// deleting completely if thrown from product layer(to trash or back to builder
		if ($(this).is("#sortable1")){ 
		   if( $('#sortable2').find('.removable').length > 0 ) {
               var  idd = $('#sortable2 .removable').attr('id');   
			   throw_from_elements_array($('#sortable2 .removable').attr('id'),true);			   
			   $('#sortable2 .removable').remove();
		   }		   
		   if( $('#builder-div-product .ul-builder').find('.removable').length > 0 ) {
			   //throw_from_elements_array($('.ul-builder .removable').attr('id'), 'link', 'link_name', 'link_class', "");
			   throw_from_elements_array($('#builder-div-product  .ul-builder .removable').attr('id'), true);
			$('#builder-div-product  .ul-builder .removable').remove(); 
				// element_index--; 			
		   }
		} // if ($(this).is("#sortable1")){ 
		// rearrange orginal builder if reordered by user
		if ($(this).is("#builder-div-product .ul-builder")){
		 $("#builder-div-product  .ul-builder .link").insertAfter("#builder-div-product  .ul-builder .button");
		 $("#builder-div-product  .ul-builder .markup").insertAfter("#builder-div-product  .ul-builder .link");
		}
	   }// stop: function(event, ui) {
	   
		}).disableSelection(); //  $( "#sortable1, #sortable2" ).sortable({
	  } ); // $( function() { $( "#sortable1, #sortable2, #builder-div-product .ul-builder" ).sortable({

	  // build dynamically builder elements string and in product_elements
	  //  text box( for later saving in options)
		 
	  // new version without using arrays at all(since in the beginning and in the end we use strings)
	  function add_elements_array(elemnt_id, type, label, link_address, element_class, markup ,end_character){
	   // fill out any empty element with "null"
		if ( arguments[1] == 'markup' )
		   //arguments[5] = utoa(arguments[5]);
		   // with new algorithm
		   arguments[5] = b64EncodeUnicode(arguments[5]);
		current_element ="";
		for (var i = 0; i < arguments.length; i++) {
		if ( arguments[i] == '')
		  //arguments[i] = "null";
		  arguments[i] = '';
		current_element = current_element + ',' + arguments[i];
		}
	   // current builder string    
	   serialized_builder_string = $('#serialize-layers-product-builder').val();
		  // !!!!!!! debug only-check if there is already such id
	   if (( $('#serialize-layers-product-builder').val()).indexOf(arguments[0]) > -1 )
		  alert ("duplicate id: " +  current_element);
	   $('#serialize-layers-product-builder').val(serialized_builder_string + current_element);
	  } // function add_elements_array
	  
	 
	 
	  //Remove the thrown element from builder elements array 
	  
	  function throw_from_elements_array(throw_elemnt_id, with_reset_element){
	  // !!!!! debug verify single element matching
	  var element_index_in_builder = $('#serialize-layers-product-builder').val().indexOf(throw_elemnt_id) - 1; // to drop the comma
	  if ( element_index_in_builder < 0 )
		  alert ('element with id 0f ' + throw_elemnt_id + ' missing from product builder');
	  var containing_element_string = $('#serialize-layers-product-builder').val().substr(element_index_in_builder);
	  var element_end_index_in_element_string = containing_element_string.indexOf('end') + 2;// we search or the 'd'
	  var element_end_index_in_builder = element_index_in_builder + element_end_index_in_element_string; 
	  var first_part_to_be_left = $('#serialize-layers-product-builder').val().substr(0, element_index_in_builder);
	  var second_part_to_be_left = $('#serialize-layers-product-builder').val().substr(element_end_index_in_builder + 1);// after the 'd'
	  // set the new value after throwing our element
	  $('#serialize-layers-product-builder').val(first_part_to_be_left + second_part_to_be_left);
	   if (with_reset_element)
	   reset_product_elements_background();
	   
	   return;
	  } // function throw_from_elements_array
	  

	  // Product - desirialize from options and build sortable1 and the trash table

	  $( function() { // Build Product Page When Submit or Refresh

		// get value from php options
		serialize_data_before_processing_product = objectFromPhp2.sortable_option;
		// take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
		serialize_data_before_processing_product = serialize_data_before_processing_product.substring(5);
		 
		// get the value from the builder hidden text box
		builder_text = $('#serialize-layers-product-builder').val();
		//builder_text = builder_text.trim();
		// if last char is comma than remove it
		//last_char = builder_text.charAt(builder_text.length - 1);
		//if ( last_char == ',' )
		//builder_text = builder_text.substr(0, builder_text.length - 1);
		var element_properties_as_array = null;// assume nothing on startup
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
			
			// in case of custom elements we must retrieve the element
			// properties earlier. It's common to all elements types
		
			if (current_layer_id > 12 ){
			  if ( builder_text.length < 1 )
				alert("error in builder text");
			  // search this element in builder_text			
			  elemet_start_index = builder_text.indexOf('id_' + current_layer_id.toString());
			  containing_builder_text = builder_text.substr(elemet_start_index);
			  // including the word 'end'
			  elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
			  element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
			  element_properties_as_array = element_properties_as_string.split(',');
			   
			} //if (current_layer_id > 12 ){			
			
			
			//} //if (current_layer_id > 12 ){
			 
			
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
				$('#sortable1').append('<li  id = "id_12"> 12   Related Products</li>');
				break;

			  default:
			  //default code block		  
				  if (  element_properties_as_array[1] == "markup"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "id_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable1').append('<li id=' + id_element + ' class="markup ui-sortable-handle removable" ><i class="fa fa-html5" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
				  if (  element_properties_as_array[1] == "button"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "id_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable1').append('<li id=' + id_element + ' class="button ui-sortable-handle removable" style="border:3px;border-style:solid;border-color-red;border-radius: 25px"><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
			  //if ( current_layer_id > 12 ) { // seems to be not needed
 				  if (  element_properties_as_array[1] == "link"){
				  //$('#sortable1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "id_" + current_layer_id.toString();
				  $('#sortable1').append('<li id=' + id_element + ' class="link ui-sortable-handle removable" ><i class="fa fa-link" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
			  //	}
			} // switch (current_layer_id) {
	 
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


		
	});//$( function() {// Build Product Page When Submit or Refresh
	
	
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
		
		// empty builder hidden box
		$('#serialize-layers-product-builder').val('');

		$('div#Product_layout_Editor_Meta_Box').height($("#sortable1").height() + 70);
		
	  });// jQuery('#default_layers').click(function() {


	  //-----------------

	   // onhover on builder elements-> display the properties on builder
	  
	   //$("container").on("click","element",function() { ... });
		$("#sortable1").on("mouseleave",".ui-sortable-handle",function() {
		  if ( disable_mouse_events == true )
		  return;
		  $('#builder-div-product  .ul-builder-style input' ).val('');
		  $('#builder-div-product  .ul-builder-style textarea' ).val('');
		  $('#builder-div-product  .ul-builder-link input' ).val('');
		  $('#builder-div-product  .ul-builder-class input' ).val('');
		  $(this).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-product  .textarea-markup-id').css( "background-Color", '#fff' );
		  
		}); // $("#sortable1").on("mouseleave",".ui-sortable-handle",function() {

		function reset_product_elements_background() {
		  $("#sortable1 .ui-sortable-handle").css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-product  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-product  .textarea-markup-id').css( "background-Color", '#fff' );
		  $("#sortable1 .ui-sortable-handle").val('');
		  $('#builder-div-product  .ul-builder-style input' ).val('');
		  $('#builder-div-product  .ul-builder-style textarea' ).val('');
		  $('#builder-div-product  .ul-builder-link input' ).val('');
		  $('#builder-div-product  .ul-builder-class input' ).val('');
		  $('#builder-div-product  .textarea-markup-id').val('');
	}	
	
	  // Onclick 
		
	   var disable_mouse_events = false;
	   var privious_clicked_element_id;
	  $("#sortable1").on("click",".ui-sortable-handle",function() {
	   var clicked_element_id = $(this).attr('id');
		if (disable_mouse_events == true){
		  disable_mouse_events = false;
			  if ( clicked_element_id != privious_clicked_element_id ){
          		 current_element_id = $( this ).attr('id');
        		 builder_text = $('#serialize-layers-product-builder').val();
        		 elemet_start_index = builder_text.indexOf(current_element_id);
	    		 containing_builder_text = builder_text.substr(elemet_start_index);
			     // including the word 'end'
			     elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
		    	 element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
		    	 element_properties_as_array = element_properties_as_string.split(',');
				//release this element green indications
				$("#sortable1 .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-product  .ul-builder-style input' ).css("background-Color",'#fff');
				$('#builder-div-product  .ul-builder-style textarea' ).css("background-Color",'#fff');
				$('#builder-div-product  .ul-builder-link input' ).css("background-Color",'#fff');
				$('#builder-div-product  .ul-builder-class input' ).css("background-Color",'#fff'); 
				$('#builder-div-product  .textarea-markup-id').css( "background-Color", '#fff' );
				//$("#sortable1 .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-product  .ul-builder-style input' ).val('');
				$('#builder-div-product  .ul-builder-style textarea' ).val('');
				$('#builder-div-product  .ul-builder-link input' ).val('');
				$('#builder-div-product  .ul-builder-class input' ).val('');
				$('#builder-div-product  .textarea-markup-id').val('');
				// color in green the right element properties
				if ( $( this ).hasClass('button') ){
				 $('#builder-div-product  .button-label').val(element_properties_as_array[2]);
				 $('#builder-div-product li .button-link').val(element_properties_as_array[3]);
				 $('#builder-div-product li .button-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('link') ){
				 $('#builder-div-product  .link-label').val(element_properties_as_array[2]);
				 $('#builder-div-product li .link-link').val(element_properties_as_array[3]);
				 $('#builder-div-product li .link-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('markup')){
                 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
                 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);				 
				 $('#builder-div-product  .textarea-markup-id').val(element_properties_as_array[5]);  				 ;
				 $('#builder-div-product  .markup-label').val(element_properties_as_array[2]);
				 $('#builder-div-product li .markup-link').val(element_properties_as_array[3]);
				 $('#builder-div-product li .markup-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .markup-class').css( "background-Color", '#c0db14' );
				 }
			  } // if ( clicked_element_id != privious_clicked_element_id ){
			  else //  clicked_element_id == privious_clicked_element_id
			  {
			    disable_mouse_events = true;
			    // throw element and than add again
			    throw_from_elements_array(clicked_element_id,false);
				// add again the modified element properties to the builder serilization
				if ($(this).hasClass('button')){
			   add_elements_array($(this).attr("id"), 'button',$('#builder-div-product  .button-label').val(), 
				   $('#builder-div-product li .button-link').val(), $('#builder-div-product li .button-class').val(), "", "end");
			    // modify the new label on element also
				$(this).text($('#builder-div-product  .button-label').val());
				   }
				else if ($(this).hasClass('link')){
			   add_elements_array($(this).attr("id"), 'link',$('#builder-div-product  .link-label').val(), 
				   $('#builder-div-product li .link-link').val(), $('#builder-div-product li .link-class').val(), "", "end");
			    // modify the new label on element also
				$(this).find('span').text($('#builder-div-product  .link-label').val());
				   }
				else if ($(this).hasClass('markup')){
	     		   add_elements_array($(this).attr("id"), 'markup',$('#builder-div-product  .markup-label').val(), 
				   $('#builder-div-product li .markup-link').val(), $('#builder-div-product li .markup-class').val(), $('#builder-div-product  .textarea-markup-id').val(), "end");
			    // modify the new label on element also
				 $(this).find('span').text($('#builder-div-product  .markup-label').val());
				}
			  }
		  } // if (disable_mouse_events == true){
		else
		 disable_mouse_events = true
	   privious_clicked_element_id = clicked_element_id;
	   }); // $("#sortable1").on("click",".ui-sortable-handle",function() {
		   
	
		
	  $("#sortable1").on("mouseenter",".ui-sortable-handle",function() {
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
		 builder_text = $('#serialize-layers-product-builder').val();
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
				 $('#builder-div-product  .button-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'link'){
				 $('#builder-div-product  .link-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'markup'){
				 $('#builder-div-product  .markup-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-product  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-product li .markup-class').css( "background-Color", '#c0db14' );
				 }
				break;
				case 3: // link address
				if (element_type == 'button')
				 $('#builder-div-product li .button-link').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-product li .link-link').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-product li .markup-link').val(element_properties_as_array[i]);
				break;
				case 4: // class
				if (element_type == 'button')
				 $('#builder-div-product li .button-class').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-product li .link-class').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-product li .markup-class').val(element_properties_as_array[i]);
				break;
				case 5: // markup
				if (element_type == 'button')
				 ;//do nothing $('#builder-div-product li .button-class').val("");
				else if (element_type == 'link')
				 ;//$('#builder-div-product li .link-class').val("");
				else if (element_type == 'markup'){
				 //do nothing decode markup code from options box
				 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
				 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);
				 $('#builder-div-product  .textarea-markup-id').val(element_properties_as_array[i]);            			 
				}
				break;
	  
				default:
				//default code block
			  }//switch (i) {
			 
			}//for (var i = 0; i < 7; i++) {


	  }); //  $("#sortable1").on("mouseenter",".ui-sortable-handle",function() {
		  
		  
	  
	  // ucs-2 string to base64 encoded ascii
	  function utoa(str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	  }
	  // base64 decode ascii to ucs-2 string
	  function atou(str) {
		return decodeURIComponent(escape(window.atob(str)));
	  }
	  
	  // the source is here 
	  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_.232_.E2.80.93_rewriting_atob()_and_btoa()_using_TypedArrays_and_UTF-8
	  
	  
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