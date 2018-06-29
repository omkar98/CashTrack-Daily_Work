<?php

function woolayedtil_Shop_Products_Layout_Editor_Meta_Box( $options )
{ ?>

<div id="shop-products">
<h6 class="h6-class">Shop Products Layout</h6>
	<ul id="sortable_shop1pr" class="connectedSortable">
		<li  id = "idshoppr_1"> 1 Show Product Sale Flash</li>
		<li  id = "idshoppr_2"> 2 Product Thumbnail</li>
		<li  id = "idshoppr_3"> 3 Product Title</li>
		<li  id = "idshoppr_4"> 4 Product Price</li>
		<li  id = "idshoppr_5"> 5 Product Rating</li>
		<li  id = "idshoppr_6"> 6 Product Add to Cart Button</li>
	</ul>
	<ul id="sortable_shop2pr" class="connectedSortable">
     Trash
	</ul>

<!-- copy1 from products -->
<div class="tables">
 	<h5 class="builder-header">Custom Content</h5>
    <div id="builder-div-shop-products">
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

<!-- copy1 end from products -->	   
	   
</div><!-- shop-products -->

<!-- copy2 from products -->	  
  <button type="button" id = "default_layers_shop_products">Default Layout</button>
 
  <div id="seialize-div-shop-products">
 	<input id="serilization-layers-shop-products" type="text" name="serialization_stack_shop_products" value="<?php echo esc_html( $options['serialization_stack_shop_products'] ); ?>"/><br />	
   	<input id="serialize-layers-shop-products-builder" type="text" name="serialization_stack_shop_products_builder" value="<?php echo esc_html(   $options['serialization_stack_shop_products_builder'] ); ?>"/><br />	

  </div> <!-- seialize-div -->
	
<!-- copy2 end from products -->	  
 
 
<?php } // function woolayedtil_Shop_Products_Layout_Editor_Meta_Box( $options )


// -------------- Update shop Products layers according admin settings --------------------------------------------------------

add_action( 'wp_head', 'woolayedtil_arrange_woo_layers_according_sortable_shop_products',10 );
function  woolayedtil_arrange_woo_layers_according_sortable_shop_products(){

     //error_log("\n\n Shop Products current run (add 2 hours)= " . date('H:i:s', time() ).  " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");


	$original_archtucture_shop_products = array(
	    // hook = woocommerce_before_shop_loop_item_title
		array(0, 'woocommerce_show_product_loop_sale_flash', 10),
		array(1, 'woocommerce_template_loop_product_thumbnail', 10),
		
        // hook = woocommerce_shop_loop_item_title
		array(2, 'woocommerce_template_loop_product_title', 10),
		
		// hook = woocommerce_after_shop_loop_item_title
		array(3, 'woocommerce_template_loop_price', 10),
		array(4, 'woocommerce_template_loop_rating', 5),
				
		// hook woocommerce_after_shop_loop_item
		array(5, 'woocommerce_template_loop_add_to_cart', 10),
	);

	// first take off all the layers one by one - Shop Layer Products

	for ($index_counter = 0; $index_counter < 6; $index_counter++){
		if ($index_counter < 2){
			remove_action('woocommerce_before_shop_loop_item_title', $original_archtucture_shop_products[$index_counter][1], $original_archtucture_shop_products[$index_counter][2] );
		}
		else if ($index_counter == 2 ){
			remove_action('woocommerce_shop_loop_item_title', $original_archtucture_shop_products[$index_counter][1], $original_archtucture_shop_products[$index_counter][2] );
		}
		else if (3 <= $index_counter && $index_counter <= 4 ){
			remove_action('woocommerce_after_shop_loop_item_title', $original_archtucture_shop_products[$index_counter][1], $original_archtucture_shop_products[$index_counter][2] );
		}
		else if ($index_counter == 5 ){
			remove_action('woocommerce_after_shop_loop_item', $original_archtucture_shop_products[$index_counter][1], $original_archtucture_shop_products[$index_counter][2] );
		}
	}// for ($index_counter = 0; $index_counter < 12; $index_counter++){

	// just for debugging
	//exit();

	// build shop layers products according to options from DB

	
	
	global $options;
	
	// copy 111
    
	global  $html_builder_sp;
    $html_builder_sp = array();
	global $builder_elements_options_string;
	static $last_priority=0;
    static $last_hook ="";
	
    static $html_builder_index =0;
	// holds one or more builder elements that appear before any stnadrad element
	$preliminary_builder_elements = array();	
	
	$serialize_data_before_processing_shop_products = $options['serialization_stack_shop_products'];
	//$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop,5);// i.e 3&id[]=6&id[]=7&i
	$serialize_data_before_processing_shop_products = substr($serialize_data_before_processing_shop_products,11);// i.e 3&idshio[]=6&idshoppr[]=7&i
	//$index_counter = 1; // corresponds to "On Sale Indication" - woocommerce_show_product_sale_flash - 10
 
    // retreive elements from memory and process it
	
	$builder_elements_options_string = $options['serialization_stack_shop_products_builder'];
	//$builder_elements_as_Array = explode(',',$builder_elements_options_string);


	//for ($index_counter = 0; $index_counter < 6; $index_counter++)
	for ($index_counter = 0; $index_counter < 7; $index_counter++)
	{
		// extract each layer ID from the serialized options
		$current_layer_id = null;
		$index_of_next_prefix = strpos($serialize_data_before_processing_shop_products, '&');
		//if ($index_of_next_prefix == true)
		if ($index_of_next_prefix > 0){
			$current_layer_id = substr($serialize_data_before_processing_shop_products, 0, $index_of_next_prefix);
		}
		else{
			if (is_numeric($serialize_data_before_processing_shop_products)) {
				$current_layer_id = $serialize_data_before_processing_shop_products;
			}
		}
		// reduce one because in array we count from 0 and not 1
		$current_layer_id--;

        // first group out of 3
        
		// if the first elements are builder
		// just gather information. The "add_action" for all elements occure after the first standard element
		
		if(is_numeric($current_layer_id) && ($index_counter == 0) && ( $current_layer_id > 5 )) {
			// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
			array_push($preliminary_builder_elements, "idshoppr_" . ($current_layer_id + 1));
            // compensate fsince it raises by 1
			$index_counter--;
		}

        // There has been at list one standard element
		else if ($index_counter < 2){
			if(is_numeric($current_layer_id)) {
				if ($current_layer_id <= 5) { // standard element (0 -> 11)
					add_action('woocommerce_before_shop_loop_item_title', $original_archtucture_shop_products[$current_layer_id][1], $original_archtucture_shop_products[$index_counter][2]);
					// always save the last priority
					$last_hook = 'woocommerce_before_shop_loop_item_title';
					$last_priority = $original_archtucture_shop_products[$index_counter][2];
					error_log(" standard element - index_counter  11  = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority standard element  group 1 = " . $original_archtucture_shop_products[$current_layer_id][1] . " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_hook 11 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 11 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");

					// After standard element we add all preliminary_builder_elements if exist
                    $array_size= sizeof($preliminary_builder_elements);
					$last_priority_builder = $last_priority;
				    for ($html_builder_index; $html_builder_index < $array_size; $html_builder_index++) {
						//$current_element_id = array_shift($preliminary_builder_elements);
						// we need the last element and not the first one
						$current_element_id = array_pop($preliminary_builder_elements);
						//$html_builder[$html_builder_index++] = calculate_html("id_" . ($current_layer_id + 1));
						$html_builder_sp[$html_builder_index] = calculate_html($current_element_id);
						add_action('woocommerce_before_shop_loop_item_title', 'private_html_sp_' . $html_builder_index, $last_priority_builder - 1);
						$last_priority_builder = $last_priority_builder - 1;
 				    	error_log(" builder element - index_counter  11/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
 				    	error_log(" private_html_X  11/1 = " . 'private_html_' . $html_builder_index . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				     	error_log(" function/priority builder element  group 11/1 = " . "Builder Element" . " / " . $last_priority_builder . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_hook 11 = " . 'woocommerce_before_shop_loop_item_title' . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_priority_builder 11 = " . $last_priority_builder . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
 	     				error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
	    				error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
                      //$html_builder_index++;
				    }
				} 
				 else { //current_layer_id > 11 => builder element that comes after standard element
				 	// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					$html_builder_sp[$html_builder_index] = calculate_html("idshoppr_" . ($current_layer_id + 1));
					add_action($last_hook, 'private_html_sp_' . $html_builder_index++, $original_archtucture_shop_products[$index_counter - 1][2] + 1);					
					$last_priority = $original_archtucture_shop_products[$index_counter - 1][2] + 1;
					error_log(" builder element - index_counter 11 2 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 11 2 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 11 2 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 11 2 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				 
				 }
			} // if(is_numeric($current_layer_id)) {

		}// second group
			
		else if ($index_counter == 2 ){
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 5 ){ // standard element (0 -> 11)
				    add_action('woocommerce_shop_loop_item_title', $original_archtucture_shop_products[$current_layer_id][1], $original_archtucture_shop_products[$index_counter][2] );
					$last_hook = 'woocommerce_shop_loop_item_title';
					 // always save the last priority
					$last_priority = $original_archtucture_shop_products[$index_counter][2];
					error_log(" second group standard element - index_counter 22/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 22/1 = " . $original_archtucture_shop_products[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 22/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					$html_builder_sp[$html_builder_index] = calculate_html("idshoppr_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_sp_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log("  second group , builder element - index_counter 22/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 22/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 22/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 22/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" erialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
		
		} // else if ($index_counter == 2 ){
		else if (3 <= $index_counter && $index_counter <= 4 ){
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 5 ){ // standard element (0 -> 11)
				    add_action('woocommerce_after_shop_loop_item_title', $original_archtucture_shop_products[$current_layer_id][1], $original_archtucture_shop_products[$index_counter][2] );
					$last_hook = 'woocommerce_after_shop_loop_item_title';
					 // always save the last priority
					$last_priority = $original_archtucture_shop_products[$index_counter][2];
					error_log(" 3rd group , standard element - index_counter 32/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 32/1 = " . $original_archtucture_shop_products[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 32/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" urrent_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			    else{ //current_layer_id > 5 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					// we have an array
					$html_builder_sp[$html_builder_index] = calculate_html("idshoppr_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_sp_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log(" 3rg group - builder element - index_counter 32/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 32/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 32/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 32/3 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" current_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   							
		}
			//else if ($index_counter == 5 ){
			else if ($index_counter >= 5 ){
			/*	
			if(is_numeric($current_layer_id)){
				add_action('woocommerce_after_shop_loop_item', $original_archtucture_shop_products[$current_layer_id][1], $original_archtucture_shop_products[$index_counter][2] );
			}
			*/
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 5 ){ // standard element (0 -> 11)
				    add_action('woocommerce_after_shop_loop_item', $original_archtucture_shop_products[$current_layer_id][1], $original_archtucture_shop_products[$index_counter][2] );
					$last_hook = 'woocommerce_after_shop_loop_item';
					 // always save the last priority
					$last_priority = $original_archtucture_shop_products[$index_counter][2];
					error_log(" 4th group- standard element index_counter 43/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 43/1 = " . $original_archtucture_shop_products[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 43/1 = " . $last_priority . " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" current_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				}
			    else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					$html_builder_sp[$html_builder_index] = calculate_html("idshoppr_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_sp_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log(" 4th group- builder element - index_counter 43/2 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 43/2 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 43/2 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 43/2 = " . $last_priority . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" serialize_data_before_processing_shop_products = " . $serialize_data_before_processing_shop_products . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" current_layer_id  11  = " .$current_layer_id . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
					
			    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
			
		}

		// hook selected laye
		//} // else


		// prepare for next round
		//$serialize_data_before_processing_shop = substr($serialize_data_before_processing_shop, $index_of_next_prefix + 6);
		$serialize_data_before_processing_shop_products = substr($serialize_data_before_processing_shop_products, $index_of_next_prefix + 12);
		//$index_counter++;

		// debug only - enable one loop

		//$serialize_data_before_processing_shop = '';
	} // for ($index_counter = 1; $index_counter < 10; $index_counter++)

} // function  arrange_woocommerce_layers_according_sortable_shop_products(){
	

  function private_html_sp_0(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder_sp;
  echo $html_builder_sp[0];
  }  
  function private_html_sp_1(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder_sp;
  echo $html_builder_sp[1];
  }
function private_html_sp_2(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[2];
}

function private_html_sp_3(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[3];
}

function private_html_sp_4(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[4];
}

function private_html_sp_5(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[5];
}
function private_html_sp_6(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[6];
}
function private_html_sp_7(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[7];
}
function private_html_sp_8(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[8];
}
function private_html_sp_9(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[9];
}
function private_html_sp_10(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder_sp;
    echo $html_builder_sp[10];
} 
  
?>
