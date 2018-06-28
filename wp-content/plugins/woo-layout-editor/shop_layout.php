<?php

session_start();

function woolayedtil_Shop_Layout_Editor( $options )
{ ?>

<div id="shop-general"> 
<h6 class="h6-class">Shop General Layout</h6>
	<ul id="sortable_shop1" class="connectedSortable">
		<li  id = "idshop_1"> 1 Output Content Wrapper</li>
		<li  id = "idshop_2"> 2 Breadcrumb</li>
		<li  id = "idshop_3"> 3 Taxonomy Archive Description</li>
		<li  id = "idshop_4"> 4 Product Archive Description</li>
		<li  id = "idshop_5"> 5 Print Notices</li>
		<li  id = "idshop_6"> 6 Result Count</li>
		<li  id = "idshop_7"> 7 Catalog Ordering</li>
		<li  id = "idshop_8"> 8 Pagination</li>
		<li  id = "idshop_9"> 9 Content Wrapper End</li>
	</ul>

	<ul id="sortable_shop2" class="connectedSortable">
         Trash
	</ul>
     <!-- copy 1 from products -->
<div class="tables">
 	<h5 class="builder-header">Custom Content</h5>
    <div id="builder-div-shop">
		<ul  class="ul-builder connectedSortable"> 
		  <li  class="content-elemet button" style="border:3px;border-style:solid;border-color-red;border-radius: 25px"><span>Button</span> </li>
		  <li  class="content-elemet link" ><i class="fa fa-link" aria-hidden="true"></i><span>Link</span></li>
		  <li  class="content-elemet markup" ><i class="fa fa-html5" aria-hidden="true"></i><span>Markup</span></li>
		</ul>	
		<ul class="ul-builder-style"> 
		  <li><input class="button-label button-style" type="text" name="button-style"  placeholder="Button label"/></li>  
		  <li><input class="link-label button-style" type="text" name="button-style"  placeholder="Link label"/></li> 
		   <li><input  class="markup-label button-style" type="text" name="button-style"  placeholder="Markup Label"/></li>   
		  <li><textarea class="textarea-markup-id" rows="4"  placeholder="Markup. Write or paste any Html Markup code"></textarea></li>  
		</ul>	
		<ul class="ul-builder-link"> 
		  <li><input class="button-link button-style" type="text" name="button-style"  placeholder="Link Address(optional)"/></li> 
		  <li><input class="link-link button-style" type="text" name="button-style"  placeholder="Link Address(optional)"/></li> 
		  <li><input class="markup-link button-style" type="text" name="button-style"  placeholder="Link Address(optional)"/></li>   
		</ul>
		<ul class="ul-builder-class"> 
		  <li><input class="button-class button-style" type="text" name="button-style"  placeholder="Button class(optional)"/></li>  
		  <li><input class="link-class button-style" type="text" name="button-style"  placeholder="Link class(optional)"/></li> 
		  <li><input class="markup-class button-style" type="text" name="button-style"  placeholder="Markup Class(optional)"/></li>   
		</ul>
    </div> <!-- builder-div-product -->
</div> <!-- tables -->
   <!-- copy 1 end from products -->
	 
</div> <!-- shop-general -->
 
  <button type="button" id = "default_layers_shop">Default Layout</button>

 
  <div id="seialize-shop-div">
 	<input id="serilization-layers-shop" type="text" name="serialization_stack_shop" value="<?php echo esc_html( $options['serialization_stack_shop'] ); ?>"/><br />	
   	<input id="serialize-layers-shop-builder" type="text" name="serialization_stack_shop_builder" value="<?php echo esc_html(   $options['serialization_stack_shop_builder'] ); ?>"/><br />	

  </div> <!-- seialize-div -->




<?php } // function Shop_Layout_Editor( $options )




// -------------- update shop layers according admin settings --------------------------------------------------------

add_action( 'wp_head', 'woolayedtil_arrange_woo_layers_according_sortable_shop',10 );
function  woolayedtil_arrange_woo_layers_according_sortable_shop(){

	error_log("\n\n Shop current run (add 2 hours)= " . date('H:i:s', time() ).  " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");


	$original_archtucture_shop = array(
		array(0, 'woocommerce_output_content_wrapper', 10),
		array(1, 'woocommerce_breadcrumb', 20),

		array(2, 'woocommerce_taxonomy_archive_description', 10),
		array(3, 'woocommerce_product_archive_description', 10),

		array(4, 'wc_print_notices', 10),
		array(5, 'woocommerce_result_count', 20),
		array(6, 'woocommerce_catalog_ordering', 30),


		array(7, 'woocommerce_pagination', 10),

		array(8, 'woocommerce_output_content_wrapper_end', 10)

	);

	// first take off all the layers one by one

	for ($index_counter = 0; $index_counter < 9; $index_counter++){
		if ($index_counter < 2){
			remove_action('woocommerce_before_main_content', $original_archtucture_shop[$index_counter][1], $original_archtucture_shop[$index_counter][2] );
		}
		else if (2 <= $index_counter && $index_counter <= 3 ){
			remove_action('woocommerce_archive_description', $original_archtucture_shop[$index_counter][1], $original_archtucture_shop[$index_counter][2] );
		}
		else if (4 <= $index_counter && $index_counter <= 6 ){
			remove_action('woocommerce_before_shop_loop', $original_archtucture_shop[$index_counter][1], $original_archtucture_shop[$index_counter][2] );
		}
		else if ($index_counter == 7 ){
			remove_action('woocommerce_after_shop_loop', $original_archtucture_shop[$index_counter][1], $original_archtucture_shop[$index_counter][2] );
		}
		//!!! last 10-1-17 missing in old code
		else if ($index_counter == 8 ){
			remove_action('woocommerce_after_main_content', $original_archtucture_shop[$index_counter][1], $original_archtucture_shop[$index_counter][2] );
		}
		
	}// for ($index_counter = 0; $index_counter < 12; $index_counter++){

	// just for debugging
	//exit();

	// build shop layers according to options from DB

	global $options;
	
	global  $html_builder_s;
    $html_builder_s = array();
    //$GLOBALS["$html_builder"];
    //$html_builder = array();
	global $builder_elements_options_string;
	static $last_priority=0;
    static $last_hook ="";
		
    static $html_builder_index =0;
	// holds one or more builder elements that appear before any stnadrad element
	$preliminary_builder_elements = array();

	$serialize_data_before_processing_shop = $options['serialization_stack_shop'];
	//$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop,5);// i.e 3&id[]=6&id[]=7&i
	$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop,9);// i.e 3&idshio[]=6&idshop[]=7&i
	//$index_counter = 1; // corresponds to "On Sale Indication" - woocommerce_show_product_sale_flash - 10

    // retreive elements from memory and process it
	
	$builder_elements_options_string = $options['serialization_stack_shop_builder'];
	//$builder_elements_as_Array = explode(',',$builder_elements_options_string);
	

	for ($index_counter = 0; $index_counter < 10; $index_counter++)
	{
		// extract each layer ID from the serialized options
		$current_layer_id = null;
		$index_of_next_prefix = strpos($serialize_data_before_processing_shop, '&');
		//if ($index_of_next_prefix == true)
		if ($index_of_next_prefix > 0){
			$current_layer_id = substr($serialize_data_before_processing_shop, 0, $index_of_next_prefix);
		}
		else{
			if (is_numeric($serialize_data_before_processing_shop)) {
				$current_layer_id = $serialize_data_before_processing_shop;
			}
		}
		// reduce one because in array we count from 0 and not 1
		$current_layer_id--;

		// actual work
        /*
		if ($index_counter < 2){
			if(is_numeric($current_layer_id)){
				add_action('woocommerce_before_main_content', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
			}
		}
		*/
		if(is_numeric($current_layer_id) && ($index_counter == 0) && ( $current_layer_id > 8 )) {
			// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
			//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
			array_push($preliminary_builder_elements, "idshop_" . ($current_layer_id + 1));
            // compensate fsince it raises by 1
			$index_counter--;
		}
        // There has been at list one standard element
		else if ($index_counter < 2){
			if(is_numeric($current_layer_id)) {
				if ($current_layer_id <= 8) { // standard element (0 -> 11)
					add_action('woocommerce_before_main_content', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2]);
					// always save the last priority
					$last_hook = 'woocommerce_before_main_content';
					$last_priority = $original_archtucture_shop[$index_counter][2];
					error_log(" standard element - index_counter  41  = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority standard element  group 4 1 = " . $original_archtucture_shop[$current_layer_id][1] . " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_hook 41 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 41 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  4 1  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
					//error_log(" dirname( __FILE__ )" . " \n", 3, dirname( __FILE__ ) . ".\php.log");

					// After standard element we add all preliminary_builder_elements if exist
                    $array_size= sizeof($preliminary_builder_elements);
					$last_priority_builder = $last_priority;
				    for ($html_builder_index; $html_builder_index < $array_size; $html_builder_index++) {
						//$current_element_id = array_shift($preliminary_builder_elements);
						// we need the last element and not the first one
						$current_element_id = array_pop($preliminary_builder_elements);
						//$html_builder[$html_builder_index++] = calculate_html("id_" . ($current_layer_id + 1));
						$html_builder_s[$html_builder_index] = calculate_html($current_element_id);
						add_action('woocommerce_before_main_content', 'private_html_s_' . $html_builder_index, $last_priority_builder - 1);
						$last_priority_builder = $last_priority_builder - 1;
			         	error_log(" builder element - index_counter  5/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
 				    	error_log(" private_html_X  5/1 = " . 'private_html_' . $html_builder_index . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				     	error_log(" function/priority builder element  group 5/1 = " . "Builder Element" . " / " . $last_priority_builder . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_hook 5 = " . 'woocommerce_before_main_content' . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_priority_builder 5 = " . $last_priority_builder . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
 	     				error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
	    				error_log(" urrent_layer_id  5  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
                      //$html_builder_index++;
				    }
				} 
				 else { //current_layer_id > 11 => builder element that comes after standard element
				 	// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					$html_builder_s[$html_builder_index] = calculate_html("idshop_" . ($current_layer_id + 1));
					add_action($last_hook, 'private_html_s_' . $html_builder_index++, $original_archtucture_shop[$index_counter - 1][2] + 1);					
					$last_priority = $original_archtucture_shop[$index_counter - 1][2] + 1;
					error_log(" builder element - index_counter 6 2 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 6 2 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 6 2 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 6 2 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  6  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				 
				 }
			} // if(is_numeric($current_layer_id)) {

		}// second group
		
		else if (2 <= $index_counter && $index_counter <= 3 ){
		/*	if(is_numeric($current_layer_id)){
				add_action('woocommerce_archive_description', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
			}
		} */
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 8 ){ // standard element (0 -> 11)
				    add_action('woocommerce_archive_description', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
					$last_hook = 'woocommerce_archive_description';
					 // always save the last priority
					$last_priority = $original_archtucture_shop[$index_counter][2];
					error_log(" second group standard element - index_counter 22/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 22/1 = " . $original_archtucture_shop[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 22/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
					// we have an array
					//$html_builder_s[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
					$html_builder_s[$html_builder_index] = calculate_html("idshop_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_s_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log("  second group , builder element - index_counter 22/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 22/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 22/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 22/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" erialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
		
		} // else if ($index_counter == 2 ){
		
		else if (4 <= $index_counter && $index_counter <= 6 ){
			/* if(is_numeric($current_layer_id)){
				add_action('woocommerce_before_shop_loop', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
			} */
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 8 ){ // standard element (0 -> 11)
				    add_action('woocommerce_before_shop_loop', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
					$last_hook = 'woocommerce_before_shop_loop';
					 // always save the last priority
					$last_priority = $original_archtucture_shop[$index_counter][2];
					error_log(" second group standard element - index_counter 22/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 22/1 = " . $original_archtucture_shop[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 22/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
					// we have an array
					//$html_builder_s[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
					$html_builder_s[$html_builder_index] = calculate_html("idshop_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_s_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log("  second group , builder element - index_counter 22/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 22/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 22/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 22/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" erialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
		
		} // else if ($index_counter == 2 ){

			else if ($index_counter == 7 ){
			/* if(is_numeric($current_layer_id)){
				add_action('woocommerce_after_shop_loop', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
			} */
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 8 ){ // standard element (0 -> 11)
				    add_action('woocommerce_after_shop_loop', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
					$last_hook = 'woocommerce_after_shop_loop';
					 // always save the last priority
					$last_priority = $original_archtucture_shop[$index_counter][2];
					error_log(" second group standard element - index_counter 22/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 22/1 = " . $original_archtucture_shop[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 22/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
					// we have an array
					//$html_builder_s[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
					$html_builder_s[$html_builder_index] = calculate_html("idshop_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_s_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log("  second group , builder element - index_counter 22/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 22/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 22/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 22/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" erialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
			
		}
			else if ($index_counter == 8 ){
			/* if(is_numeric($current_layer_id)){
				add_action('woocommerce_after_main_content', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
			}  */
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 8 ){ // standard element (0 -> 11)
				    add_action('woocommerce_after_main_content', $original_archtucture_shop[$current_layer_id][1], $original_archtucture_shop[$index_counter][2] );
					$last_hook = 'woocommerce_after_main_content';
					 // always save the last priority
					$last_priority = $original_archtucture_shop[$index_counter][2];
					error_log(" second group standard element - index_counter 22/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 22/1 = " . $original_archtucture_shop[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 22/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
					// we have an array
					//$html_builder_s[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
					$html_builder_s[$html_builder_index] = calculate_html("idshop_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_s_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log("  second group , builder element - index_counter 22/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 22/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 22/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 22/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" erialize_data_before_processing_shop = " . $serialize_data_before_processing_shop . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
			
		}

		// hook selected laye
		//} // else


		// prepare for next round
		//$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop, $index_of_next_prefix + 6);
		$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop, $index_of_next_prefix + 10);
		//$index_counter++;

		// debug only - enable one loop

		//$serialize_data_before_processing_shop = '';
	} // for ($index_counter = 1; $index_counter < 10; $index_counter++)


function private_html_s_0(){
		//echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
	global $html_builder_s;
	echo $html_builder_s[0];
}
	function private_html_s_1(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder_s;
  echo $html_builder_s[1];
  }
function private_html_s_2(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[2];
}

function private_html_s_3(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[3];
}

function private_html_s_4(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[4];
}

function private_html_s_5(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[5];
}
function private_html_s_6(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[6];
}
function private_html_s_7(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[7];
}
function private_html_s_8(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[8];
}
function private_html_s_9(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[9];
}
function private_html_s_10(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_s;
    echo $html_builder_s[10];
}
		
		
		
} // function  arrange_woocommerce_layers_according_sortable_shop(){
?>