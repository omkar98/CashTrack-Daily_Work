	 var sortable_serialize_layers_shop = "";

	jQuery(document).ready(function($) {

	  // calculate sortable serialization value from the current layers state

	  // shop layers
	  var lis = document.getElementById("sortable_shop1").getElementsByTagName("li");
	  //var sortable_serialize_layers_shop = "";
	  for(i = 0 ; i < 9 ; i++ ){
		sortable_serialize_layers_shop += "id[]=" + lis[i].outerText.substr(0,2).trim() + "&";
	  }
	  // take of last "&"
	  sortable_serialize_layers_shop = sortable_serialize_layers_shop.slice(0, -1);
	  //$('#serialize-layers').val(sortable_serialize_layers);

	  
	 	  // update dynamically for shop

	  var element_index = 1;
	  var button_index =0;
	  var link_index =0;
	  var markup_index =0;
	  
	
 	  var shop_meta_box_height;
	  
	  
 	  $( function() {
	  $( "#sortable_shop1, #sortable_shop2, #builder-div-shop .ul-builder" ).sortable({
		  connectWith: ".connectedSortable",
		  update: function (event, ui) {
			if ($(this).is("#sortable_shop1")) {
			  sortable_serialize_layers_shop = $(this).sortable('serialize');
			  $('#serilization-layers-shop').val(sortable_serialize_layers_shop);
			  // calculate height according to ul height
			  if ( $("#sortable_shop1").height() > $("#sortable_shop2").height())
					   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 70);
			  else
					   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop2").height() + 70); 
				// save the height for later use
				localStorage.setItem('shop_meta_box_height',$('div#Shop_Layout_Editor_Meta_Box').height());
			}
			else if ($(this).is("#builder-div-shop .ul-builder")) {
			 ;//$('#sortable_shop1 .content-elemet').text("custom text");
			}
			else // sortable_shop2
			  sortable_serialize_trash = $(this).sortable('serialize');
		  }, //  update: function (event, ui) {
		  
		 // cloning back custom elements after dragging to the product table 
		 stop: function(event, ui) {
		if($(this).has('content-elemet')) {
			 new_class = '.' + element_index;
			 builder_value =  $('#serialize-layers-shop-builder').val();
			 index_of_id_candidat = $('#serialize-layers-shop-builder').val().indexOf(element_index + 9);
			 while(  $('#serialize-layers-shop-builder').val().indexOf(element_index +9) > -1 ) {
              element_index++;
			  new_class = '.' + element_index;
			  $("#sortable_shop1 .content-elemet").attr("id","idshop_" + (element_index + 9 ).toString());
		     }
			 
			 $('#sortable_shop1 .content-elemet').addClass(element_index.toString());
			 $('#sortable_shop1 .content-elemet').addClass('removable');
			if  ($(new_class).hasClass("markup")){	
			   if ( new_class < 0)
			   alert ('markup new class = ' + new_class);
			   markup_index++;		 
			   $(new_class ).clone().appendTo($(this));// put it down
			   $('#builder-div-shop  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop  .ul-builder .removable').removeClass('.' + element_index.toString());
			   //$("#sortable_shop1 " + new_class + " span").text("Button" + button_index.toString());
				$("#sortable_shop1 " + new_class).attr("id","idshop_" + (element_index + 9).toString());
			   if (($('#builder-div-shop  .markup-label').val().length < 3)){ 
				  $('#sortable_shop1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   else if ($('#builder-div-shop  .textarea-markup-id').val().length < 3){
				  $('#sortable_shop1 .content-elemet').remove();				  
				  alert("you must write some markup code");	              
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   else if ( ($('#builder-div-shop  .markup-link').val().length > 0)  && !($('#builder-div-shop  .markup-link').val().indexOf("//") >= 0)){
				$('#sortable_shop1 .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   add_elements_array($("#sortable_shop1 " + new_class).attr("id"), 'markup',$('#builder-div-shop  .markup-label').val(), 
				   $('#builder-div-shop li .markup-link').val(), $('#builder-div-shop li .markup-class').val(), $('#builder-div-shop  .textarea-markup-id').val(), "end");


     		   $("#sortable_shop1 " + new_class + " span").text($("#builder-div-shop  .markup-label").val());
			   $(new_class ).removeClass(element_index.toString());
			} // markup
			 else if ($(new_class).hasClass("button")){
			   if ( new_class < 0)
			   alert ('button new class = ' + new_class);
			   button_index++;
			   inslall_selector = '#builder-div-shop .ul-builder' + ' .link';
			   //$(new_class ).removeClass(element_index.toString()).clone().insertBefore($(inslall_selector));
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-shop  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop  .ul-builder .removable').removeClass('.' + element_index.toString());
			   //$("#sortable1 " + new_class + " span").text("Button" + button_index.toString());
				$("#sortable_shop1 " + new_class).attr("id","idshop_" + (element_index + 9).toString());
			   if (($('#builder-div-shop  .button-label').val().length < 3)){ 
				  $('#sortable_shop1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
				 //alert ('new class = ' + new_class);	
		         //alert ("serialize-layers-shop-builder value: " +  $('#serialize-layers-shop-builder').val() + "problamtic element: " + $('#sortable_shop1 ' + new_class).attr('id') + ",markup" );				  
				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   else if ( ($('#builder-div-shop  .button-link').val().length > 0)  && !($('#builder-div-shop  .button-link').val().indexOf("//") >= 0)){
				$('#sortable_shop1 .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   //function add_elements_array_markup(elemnt_id, type, label, link_address, class, markup ,*,){
			   add_elements_array($("#sortable_shop1 " + new_class).attr("id"), 'button',$('#builder-div-shop  .button-label').val(), 
				   $('#builder-div-shop li .button-link').val(), $('#builder-div-shop li .button-class').val(), "", "end");
				
			   $("#sortable_shop1 " + new_class + " span").text($("#builder-div-shop  .button-label").val());
			   $(new_class ).removeClass(element_index.toString());
			   }// button
			 else if ($(new_class).hasClass("link")){
			   if ( new_class < 0)
			   alert ('link new class = ' + new_class);
			   link_index++;
			   inslall_selector = '#builder-div-shop .ul-builder' + ' .markup';
			   $(new_class ).clone().insertBefore($(inslall_selector));
			   $('#builder-div-shop  .ul-builder .removable').removeClass('removable');
			   $('#builder-div-shop  .ul-builder .removable').removeClass('.' + element_index.toString());
			   //$("#sortable1 " + new_class + " span").text("Button" + button_index.toString());
			   $("#sortable_shop1 " + new_class).attr("id","idshop_" + (element_index + 9).toString());
			   if (($('#builder-div-shop  .link-label').val().length < 3)){
				  $('#sortable_shop1 .content-elemet').remove();
				 alert("you must write a unic lable to the element");
 				 $(new_class ).removeClass(element_index.toString());
				 return;
				}
			   else if ( ($('#builder-div-shop  .link-link').val().length > 0)  && !($('#builder-div-shop  .link-link').val().indexOf("//") >= 0)){
				$('#sortable_shop1 .content-elemet').remove();				  
				  alert("bad link value");	              
				 $(new_class ).removeClass(element_index_sp.toString());
				 return;
				}
			   add_elements_array($("#sortable_shop1 " + new_class).attr("id"), 'link',$('#builder-div-shop  .link-label').val(), 
				   $('#builder-div-shop li .link-link').val(), $('#builder-div-shop li .link-class').val(), "", "end");
				
			   $("#sortable_shop1 " + new_class + " span").text($("#builder-div-shop  .link-label").val());
			   $(new_class ).removeClass(element_index.toString());
			   
			   } // link	  
				 // always   
			   $('#sortable_shop1 .content-elemet').removeClass('content-elemet');		   
			   // update product hidden serialization text box 
			   sortable_serialize_layers_shop = $('#sortable_shop1').sortable('serialize');
			   $('#serilization-layers-shop').val(sortable_serialize_layers_shop);
			   			 
			 //$('.ul-builder .removable').removeClass('removable');
		} // if($('.ul-builder').has('content-elemet')) 
		// deleting completely if thrown from product layer(to trash or back to builder
		if ($(this).is("#sortable_shop1")){ 
		   if( $('#sortable_shop2').find('.removable').length > 0 ) {
               var  idd = $('#sortable_shop2 .removable').attr('id');   
			   throw_from_elements_array($('#sortable_shop2 .removable').attr('id'),true);			   
			   $('#sortable_shop2 .removable').remove();
		   }		   
		   if( $('#builder-div-shop .ul-builder').find('.removable').length > 0 ) {
			   //throw_from_elements_array($('.ul-builder .removable').attr('id'), 'link', 'link_name', 'link_class', "");
			   throw_from_elements_array($('#builder-div-shop  .ul-builder .removable').attr('id'), true);
			$('#builder-div-shop  .ul-builder .removable').remove(); 
				// element_index--; 			
		   }
		} // if ($(this).is("#sortable1")){ 
		// rearrange orginal builder if reordered by user
		if ($(this).is("#builder-div-shop .ul-builder")){
		 $("#builder-div-shop  .ul-builder .link").insertAfter("#builder-div-shop  .ul-builder .button");
		 $("#builder-div-shop  .ul-builder .markup").insertAfter("#builder-div-shop  .ul-builder .link");
		}
	   }// stop: function(event, ui) {
	   
		}).disableSelection(); //  $( "#sortable_shop1, #sortable_shop2" ).sortable({
	  } ); // $( function() { $( "#sortable_shop1, #sortable_shop2, #builder-div-product .ul-builder" ).sortable({

 
 	  // new version without using arrays at all(since in the beginning and in the end we use strings)
	  function add_elements_array(elemnt_id, type, label, link_address, element_class, markup ,end_character){
	   // fill out any empty element with "null"
		if ( arguments[1] == 'markup' )
		   //arguments[5] = utoa(arguments[5]);
		   // with new algorithm
		   arguments[5] = b64EncodeUnicode(arguments[5]);
		current_element ="";
		for (var i = 0; i < arguments.length; i++) {
		//if ( arguments[i] == '')
		//  arguments[i] = "null";
		current_element = current_element + ',' + arguments[i];
		}
	   // current builder string    
	   serialized_builder_string = $('#serialize-layers-shop-builder').val();
		  // !!!!!!! debug only-check if there is already such id
	   if (( $('#serialize-layers-shop-builder').val()).indexOf(arguments[0]) > -1 )
		  alert ("duplicate id: " +  current_element);
	   $('#serialize-layers-shop-builder').val(serialized_builder_string + current_element);
	  } // function add_elements_array
	  
	 
	 
	  //Remove the thrown element from builder elements array 
	  
	  function throw_from_elements_array(throw_elemnt_id, with_reset_element){
	  var element_index_in_builder = $('#serialize-layers-shop-builder').val().indexOf(throw_elemnt_id) - 1; // to drop the comma
	  if ( element_index_in_builder < 0 )
		  alert ('element with id 0f ' + throw_elemnt_id + ' missing from product builder');
	  var containing_element_string = $('#serialize-layers-shop-builder').val().substr(element_index_in_builder);
	  var element_end_index_in_element_string = containing_element_string.indexOf('end') + 2;// we search or the 'd'
	  var element_end_index_in_builder = element_index_in_builder + element_end_index_in_element_string; 
	  var first_part_to_be_left = $('#serialize-layers-shop-builder').val().substr(0, element_index_in_builder);
	  var second_part_to_be_left = $('#serialize-layers-shop-builder').val().substr(element_end_index_in_builder + 1);// after the 'd'
	  // set the new value after throwing our element
	  $('#serialize-layers-shop-builder').val(first_part_to_be_left + second_part_to_be_left);
	   if (with_reset_element)
	   reset_product_elements_background();
	   
	   return;
	  } // function throw_from_elements_array
	   
 
 
		// Shop Page - submit - desirialize from options and build sortable1 and the trash table

		// get value from php options
		serialize_data_before_processing_shop = objectFromPhpShop2.sortable_option_shop;
		// take of the first 5 digits (id[]=) until arriving to first layer number: i.e 3&id[]=6&id[]=7&i
		serialize_data_before_processing_shop = serialize_data_before_processing_shop.substring(9);

		// get the value from the builder hidden text box
		builder_text = $('#serialize-layers-shop-builder').val();

		var junk_array_shop =[1,2,3,4,5,6,7,8,9];

		//builder_text = builder_text.substr(0, builder_text.length - 1);
		var element_properties_as_array = null;// assume nothing on startup
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

			// in case of custom elements we must retrieve the element
			// properties earlier. It's common to all elements types
		
			if (current_layer_id > 9 ){
			  if ( builder_text.length < 1 )
				alert("error in builder text");
			  // search this element in builder_text			
			  elemet_start_index = builder_text.indexOf('idshop_' + current_layer_id.toString());
			  containing_builder_text = builder_text.substr(elemet_start_index);
			  // including the word 'end'
			  elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
			  element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
			  element_properties_as_array = element_properties_as_string.split(',');
			   
			} //if (current_layer_id > 12 ){
			 

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
				  if (  element_properties_as_array[1] == "markup"){
				  //$('#sortable_shop1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshop_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable_shop1').append('<li id=' + id_element + ' class="markup ui-sortable-handle removable" ><i class="fa fa-html5" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
				  if (  element_properties_as_array[1] == "button"){
				  //$('#sortable_shop1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshop_" + current_layer_id.toString();
				  //markap_label = element_properties_as_array[3];
				  $('#sortable_shop1').append('<li id=' + id_element + ' class="button ui-sortable-handle removable" style="border:3px;border-style:solid;border-color-red;border-radius: 25px"><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
			  //if ( current_layer_id > 12 ) { // seems to be not needed
 				  if (  element_properties_as_array[1] == "link"){
				  //$('#sortable_shop1').append('<li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>');			  
				  id_element = "idshop_" + current_layer_id.toString();
				  $('#sortable_shop1').append('<li id=' + id_element + ' class="link ui-sortable-handle removable" ><i class="fa fa-link" aria-hidden="true"></i><span>' + element_properties_as_array[2] + '</span></li>');			  
				  }
					//default code block
			 } // switch (current_layer_id) {

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
	  
	  // Default Layer Shop Click --> Woocommerce default layout. sortable_shop2 --> 0

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
		
		// empty builder hidden box
		$('#serialize-layers-shop-builder').val('');
		
		
		$('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 70);
	 
	 });// jQuery('#default_layers_shop').click(function() {
	  


	  // onhover on builder elements-> display the properties on builder
	  
	   //$("container").on("click","element",function() { ... });
		$("#sortable_shop1").on("mouseleave",".ui-sortable-handle",function() {
		  if ( disable_mouse_events == true )
		  return;
		  $('#builder-div-shop  .ul-builder-style input' ).val('');
		  $('#builder-div-shop  .ul-builder-style textarea' ).val('');
		  $('#builder-div-shop  .ul-builder-link input' ).val('');
		  $('#builder-div-shop  .ul-builder-class input' ).val('');
		  $(this).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-shop  .textarea-markup-id').css( "background-Color", '#fff' );
		  
		}); // $("#sortable_shop1").on("mouseleave",".ui-sortable-handle",function() {

		function reset_product_elements_background() {
		  $("#sortable_shop1 .ui-sortable-handle").css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-style input' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-style textarea' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-link input' ).css("background-Color",'#fff');
		  $('#builder-div-shop  .ul-builder-class input' ).css("background-Color",'#fff'); 
		  $('#builder-div-shop  .textarea-markup-id').css( "background-Color", '#fff' );
		  $("#sortable_shop1 .ui-sortable-handle").val('');
		  $('#builder-div-shop  .ul-builder-style input' ).val('');
		  $('#builder-div-shop  .ul-builder-style textarea' ).val('');
		  $('#builder-div-shop  .ul-builder-link input' ).val('');
		  $('#builder-div-shop  .ul-builder-class input' ).val('');
		  $('#builder-div-shop  .textarea-markup-id').val('');
	}	
	
	  // Onclick 
		
	   var disable_mouse_events = false;	  
	   var privious_clicked_element_id;
	  $("#sortable_shop1").on("click",".ui-sortable-handle",function() {
	   var clicked_element_id = $(this).attr('id');
		if (disable_mouse_events == true){
		  disable_mouse_events = false;
			  if ( clicked_element_id != privious_clicked_element_id ){
          		 current_element_id = $( this ).attr('id');
        		 builder_text = $('#serialize-layers-shop-builder').val();
        		 elemet_start_index = builder_text.indexOf(current_element_id);
	    		 containing_builder_text = builder_text.substr(elemet_start_index);
			     // including the word 'end'
			     elemet_stop_index_in_containing_text = containing_builder_text.indexOf('end') + 3;
		    	 element_properties_as_string = containing_builder_text.substr(0, elemet_stop_index_in_containing_text);
		    	 element_properties_as_array = element_properties_as_string.split(',');
				//release this element green indications
				$("#sortable_shop1 .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-shop  .ul-builder-style input' ).css("background-Color",'#fff');
				$('#builder-div-shop  .ul-builder-style textarea' ).css("background-Color",'#fff');
				$('#builder-div-shop  .ul-builder-link input' ).css("background-Color",'#fff');
				$('#builder-div-shop  .ul-builder-class input' ).css("background-Color",'#fff'); 
				$('#builder-div-shop  .textarea-markup-id').css( "background-Color", '#fff' );
				//$("#sortable_shop1 .ui-sortable-handle").css("background-Color",'#fff');
				$('#builder-div-shop  .ul-builder-style input' ).val('');
				$('#builder-div-shop  .ul-builder-style textarea' ).val('');
				$('#builder-div-shop  .ul-builder-link input' ).val('');
				$('#builder-div-shop  .ul-builder-class input' ).val('');
				$('#builder-div-shop  .textarea-markup-id').val('');
				// color in green the right element properties
				if ( $( this ).hasClass('button') ){
				 $('#builder-div-shop  .button-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop li .button-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop li .button-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('link') ){
				 $('#builder-div-shop  .link-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop li .link-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop li .link-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if ( $( this ).hasClass('markup')){
                 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
                 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);				 
				 $('#builder-div-shop  .textarea-markup-id').val(element_properties_as_array[5]);  				 ;
				 $('#builder-div-shop  .markup-label').val(element_properties_as_array[2]);
				 $('#builder-div-shop li .markup-link').val(element_properties_as_array[3]);
				 $('#builder-div-shop li .markup-class').val(element_properties_as_array[4]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .markup-class').css( "background-Color", '#c0db14' );
				 }
			  } // if ( clicked_element_id != privious_clicked_element_id ){
			  else //  clicked_element_id == privious_clicked_element_id
			  {
			    disable_mouse_events = true;
			    // throw element and than add again
			    throw_from_elements_array(clicked_element_id,false);
				// add again the modified element properties to the builder serilization
				if ($(this).hasClass('button')){
			   add_elements_array($(this).attr("id"), 'button',$('#builder-div-shop  .button-label').val(), 
				   $('#builder-div-shop li .button-link').val(), $('#builder-div-shop li .button-class').val(), "", "end");
			    // modify the new label on element also
				$(this).text($('#builder-div-shop  .button-label').val());
				   }
				else if ($(this).hasClass('link')){
			   add_elements_array($(this).attr("id"), 'link',$('#builder-div-shop  .link-label').val(), 
				   $('#builder-div-shop li .link-link').val(), $('#builder-div-shop li .link-class').val(), "", "end");
			    // modify the new label on element also
				$(this).find('span').text($('#builder-div-shop  .link-label').val());
				   }
				else if ($(this).hasClass('markup')){
	     		   add_elements_array($(this).attr("id"), 'markup',$('#builder-div-shop  .markup-label').val(), 
				   $('#builder-div-shop li .markup-link').val(), $('#builder-div-shop li .markup-class').val(), $('#builder-div-shop  .textarea-markup-id').val(), "end");
			    // modify the new label on element also
				 $(this).find('span').text($('#builder-div-shop  .markup-label').val());
				}
			  }
		  } // if (disable_mouse_events == true){
		else
		 disable_mouse_events = true
	   privious_clicked_element_id = clicked_element_id;
	   }); // $("#sortable_shop1").on("click",".ui-sortable-handle",function() {
		   
	
		
	  $("#sortable_shop1").on("mouseenter",".ui-sortable-handle",function() {
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
		 		 
		 builder_text = $('#serialize-layers-shop-builder').val();
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
				 $('#builder-div-shop  .button-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .button-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .button-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .button-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'link'){
				 $('#builder-div-shop  .link-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 //$('.textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .link-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .link-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .link-class').css( "background-Color", '#c0db14' );
				 }
				else if (element_type == 'markup'){
				 $('#builder-div-shop  .markup-label').val(element_properties_as_array[i]);
				 $( this ).css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .textarea-markup-id').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop  .markup-label').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .markup-link').css( "background-Color", '#c0db14' );
				 $('#builder-div-shop li .markup-class').css( "background-Color", '#c0db14' );
				 }
				break;
				case 3: // link address
				if (element_type == 'button')
				 $('#builder-div-shop li .button-link').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-shop li .link-link').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-shop li .markup-link').val(element_properties_as_array[i]);
				break;
				case 4: // class
				if (element_type == 'button')
				 $('#builder-div-shop li .button-class').val(element_properties_as_array[i]);
				else if (element_type == 'link')
				 $('#builder-div-shop li .link-class').val(element_properties_as_array[i]);
				else if (element_type == 'markup')
				 $('#builder-div-shop li .markup-class').val(element_properties_as_array[i]);
				break;
				case 5: // markup
				if (element_type == 'button')
				 ;//do nothing $('#builder-div-shop li .button-class').val("");
				else if (element_type == 'link')
				 ;//$('#builder-div-shop li .link-class').val("");
				else if (element_type == 'markup'){
				 //do nothing decode markup code from options box
				 //element_properties_as_array[5] = atou(element_properties_as_array[5]);
				 // new algorithm
				 element_properties_as_array[5] = b64DecodeUnicode(element_properties_as_array[5]);
				 $('#builder-div-shop  .textarea-markup-id').val(element_properties_as_array[i]);            			 
				}
				break;
	  
				default:
				//default code block
			  }//switch (i) {
			 
			}//for (var i = 0; i < 7; i++) {


	  }); //  $("#sortable_shop1").on("mouseenter",".ui-sortable-handle",function() {
	 
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
	
	