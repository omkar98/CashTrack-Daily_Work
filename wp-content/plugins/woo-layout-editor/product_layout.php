<?php
/*******************************************************************************************************
*                                     Product_layout_Editor_Meta_Box
********************************************************************************************************/

function woolayedtil_Product_layout_Editor_Meta_Box( $options ) 
{ ?>
<div id="product-layout">
    <h6 class="h6-class">Product Layout</h6>
<ul id="sortable1" class="connectedSortable">
  <li  id = "id_1"> 1 On Sale Indication</li>
  <li  id = "id_2"> 2 Product Feature Image</li>
  <li  id = "id_3"> 3 Product Title</li>
  <li  id = "id_4"> 4 Product Rating</li>
  <li  id = "id_5"> 5 Product Price</li>
  <li  id = "id_6"> 6 Short Description(excerpt)</li>
  <li  id = "id_7"> 7 Add to Cart Button</li>
  <li  id = "id_8"> 8 Product Categories Meta Box</li>
  <li  id = "id_9"> 9 Social Sharing Button</li>
  <li  id = "id_10"> 10 Data Tabs and Their Content</li>
  <li  id = "id_11"> 11 Product Upsell Sisply</li>
  <li  id = "id_12">12  Related Products</li>
</ul>

<ul id="sortable2" class="connectedSortable">
Trash
</ul>

<div class="tables">
 	<h5 class="builder-header">Custom Content</h5>
    <div id="builder-div-product">
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


</div> <!-- product-layout -->
    
  <button type="button" id = "default_layers">Default Layout</button>
 
  <div id="seialize-div">
 	<input id="serialize-layers" type="text" name="serialization_stack" value="<?php echo esc_html(   $options['serialization_stack'] ); ?>"/><br />	
   	<input id="serialize-layers-product-builder" type="text" name="serialization_stack_product_builder" value="<?php echo esc_html(   $options['serialization_stack_product_builder'] ); ?>"/><br />	

  </div> <!-- seialize-div -->
	

<?php } // function Product_layout_Editor_Meta_Box( $options )


 add_action( 'wp_head', 'woolayedtil_arrange_woo_layers_according_sortable', 10 );
  function  woolayedtil_arrange_woo_layers_according_sortable(){

     error_log("\n\n product editor - current run (add 2 hours)= " . date('H:i:s', time() ).  " \n", 3, plugin_dir_path( __FILE__ ) . "php.log");
 
  
	$original_archtucture = array(
	        	array(0, 'woocommerce_show_product_sale_flash', 10),
				array(1, 'woocommerce_show_product_images', 20),

				array(2, 'woocommerce_template_single_title', 5),
				array(3, 'woocommerce_template_single_rating', 10),
				array(4, 'woocommerce_template_single_price', 10),
				array(5, 'woocommerce_template_single_excerpt', 20),
				array(6, 'woocommerce_template_single_add_to_cart', 30),
				array(7, 'woocommerce_template_single_meta', 40),
				array(8, 'woocommerce_template_single_sharing', 50),

				array(9, 'woocommerce_output_product_data_tabs', 10),
				array(10, 'woocommerce_upsell_display', 15),
				array(11, 'woocommerce_output_related_products', 20)
	);

    // first take off all the layers one by one

    for ($index_counter = 0; $index_counter < 12; $index_counter++){
 			if ($index_counter < 2){
		         remove_action('woocommerce_before_single_product_summary', $original_archtucture[$index_counter][1], $original_archtucture[$index_counter][2] );
			}
			else if (1 < $index_counter && $index_counter < 9 ){
				remove_action('woocommerce_single_product_summary', $original_archtucture[$index_counter][1], $original_archtucture[$index_counter][2] );
			}
			else{
				remove_action('woocommerce_after_single_product_summary', $original_archtucture[$index_counter][1], $original_archtucture[$index_counter][2] );
            }
    }// for ($index_counter = 0; $index_counter < 12; $index_counter++){

   // build product layers according to options from DB
	global $options;


    global  $html_builder;
    $html_builder = array();
	global $builder_elements_options_string;
	static $last_priority=0;
    static $last_hook ="";
	
    static $html_builder_index =0;
	// holds one or more builder elements that appear before any stnadrad element
	$preliminary_builder_elements = array();
	
	$serialize_data_before_processing = $options['serialization_stack'];
	$serialize_data_before_processing = substr($serialize_data_before_processing,5);// i.e 3&id[]=6&id[]=7&i

    // retreive elements from memory and process it
	
	$builder_elements_options_string = $options['serialization_stack_product_builder'];
	//$builder_elements_as_Array = explode(',',$builder_elements_options_string);

	for ($index_counter = 0; $index_counter < 13; $index_counter++)
	// allow ,more elements on page with builder
	{
		$current_layer_id = null;
		$index_of_next_prefix = strpos($serialize_data_before_processing, '&');
		//if ($index_of_next_prefix == true)
		if ($index_of_next_prefix > 0){
		  $current_layer_id = substr($serialize_data_before_processing, 0, $index_of_next_prefix);
		  }
        else{
          if (is_numeric($serialize_data_before_processing))
             $current_layer_id = $serialize_data_before_processing;
          }
          // reduce one because in array we count from 0 and not 1
          $current_layer_id--;

		// actual work
    
		// if the first elements are builder
		// just gather information. The "add_action" for all elements occure after the first standard element
		
		if(is_numeric($current_layer_id) && ($index_counter == 0) && ( $current_layer_id > 11 )) {
			// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
			//$html_builder=calculate_html("id_" . ($current_layer_id + 1));
			array_push($preliminary_builder_elements, "id_" . ($current_layer_id + 1));
            // compensate fsince it raises by 1
			$index_counter--;
		}

        // There has been at list one standard element
		else if ($index_counter < 2){
			if(is_numeric($current_layer_id)) {
				if ($current_layer_id <= 11) { // standard element (0 -> 11)
					add_action('woocommerce_before_single_product_summary', $original_archtucture[$current_layer_id][1], $original_archtucture[$index_counter][2]);
					// always save the last priority
					$last_hook = 'woocommerce_before_single_product_summary';
					$last_priority = $original_archtucture[$index_counter][2];
					error_log(" index_counter  1  = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority standard element  group 1 = " . $original_archtucture[$current_layer_id][1] . " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_hook 1 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 1 = " . $last_priority . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
					//error_log(" dirname( __FILE__ )" . " \n", 3, dirname( __FILE__ ) . ".\php.log");

					// After standard element we add all preliminary_builder_elements if exist
                    $array_size= sizeof($preliminary_builder_elements);
					$last_priority_builder = $last_priority;
				    for ($html_builder_index; $html_builder_index < $array_size; $html_builder_index++) {
						$current_element_id = array_shift($preliminary_builder_elements);
						//$html_builder[$html_builder_index++] = calculate_html("id_" . ($current_layer_id + 1));
						$html_builder[$html_builder_index] = calculate_html($current_element_id);
						add_action('woocommerce_before_single_product_summary', 'private_html_' . $html_builder_index, $last_priority_builder - 1);
						$last_priority_builder = $last_priority_builder - 1;
 				    	error_log(" index_counter  1/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
 				    	error_log(" private_html_X  1/1 = " . 'private_html_' . $html_builder_index . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				     	error_log(" function/priority builder element  group 1/1 = " . "Builder Element" . " / " . $last_priority_builder . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_hook 1 = " . 'woocommerce_before_single_product_summary' . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
				    	error_log(" last_priority_builder 1 = " . $last_priority_builder . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
                       //$html_builder_index++;
				    }
				} 
				 else { //current_layer_id > 11 => builder element
				 	// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					$html_builder[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
					add_action($last_hook, 'private_html_' . $html_builder_index++, $original_archtucture[$index_counter - 1][2] + 1);					
					$last_priority = $original_archtucture[$index_counter - 1][2] + 1;
					error_log(" index_counter 1 2 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 1 2 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 1 2 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 1 2 = " . $last_priority . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				 
				 }
			} // if(is_numeric($current_layer_id)) {

		}// second group
		else if (1 < $index_counter && $index_counter < 9 ){
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 11 ){ // standard element (0 -> 11)
				    add_action('woocommerce_single_product_summary', $original_archtucture[$current_layer_id][1], $original_archtucture[$index_counter][2] );
					$last_hook = 'woocommerce_single_product_summary';
					 // always save the last priority
					$last_priority = $original_archtucture[$index_counter][2];
					error_log(" index_counter 2/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 2/1 = " . $original_archtucture[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 2/1 = " . $last_priority . " \n\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					// we have an array
					$html_builder[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log(" index_counter 2/3 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 2/3 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 2/3 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 2/3 = " . $last_priority . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
				    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
		} //else if (1 < $index_counter && $index_counter < 9 ){
		// last group 9->12
		else{
			if(is_numeric($current_layer_id)){
				if ($current_layer_id <= 11 ){ // standard element (0 -> 11)
				    add_action('woocommerce_after_single_product_summary', $original_archtucture[$current_layer_id][1], $original_archtucture[$index_counter][2] );
					$last_hook = 'woocommerce_after_single_product_summary';
					 // always save the last priority
					$last_priority = $original_archtucture[$index_counter][2];
					error_log(" index_counter 3/1 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
			        error_log(" function/priority standard element  group 3/1 = " . $original_archtucture[$current_layer_id][1] . " / " .  $last_priority . "\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
			        error_log(" last_priority 3/1 = " . $last_priority . " \n\n", 3, plugin_dir_path( __FILE__ ) . "php.log");
				}
			else{ //current_layer_id > 11 => builder element
					// clculate markup from builder serilization option(we add 1 since we reduced 1 erlier)
					// we have an array
					$html_builder[$html_builder_index] = calculate_html("id_" . ($current_layer_id + 1));
				    add_action($last_hook, 'private_html_' . $html_builder_index++, $last_priority + 1);
					$last_priority = $last_priority + 1;
					error_log(" index_counter 3/2 = " .$index_counter . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" function/priority builder element  group 3/2 =  Builder Element ". " / " . $last_priority . "\n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" hook 3/2 = " . $last_hook . " \n", 3, plugin_dir_path(__FILE__) . "php.log");
					error_log(" last_priority 3/2 = " . $last_priority . " \n\n", 3, plugin_dir_path(__FILE__) . "php.log");
					
			    // reduce index in builder element
				    $index_counter--;
				} //if ($current_layer_id <= 11 ){ // standard element (0 -> 11)

			} //if(is_numeric($current_layer_id)){	   
		}

			// hook selected laye
		//} // else


		// prepare for next round
		$serialize_data_before_processing = substr($serialize_data_before_processing, $index_of_next_prefix + 6);
		//$index_counter++;

		// debug only - enable one loop

		//$serialize_data_before_processing = '';
	} // for ($index_counter = 1; $index_counter < 10; $index_counter++)

  } //  function  woolayedtil_arrange_woo_layers_according_sortable(){

  // decode markup from option
  function atou($str) {
    return urldecode(urlencode(base64_decode($str)));
  }
   
  function calculate_html( $element_id){
	  global $builder_elements_options_string;
	  $element_start = strpos($builder_elements_options_string, $element_id);
	  // first calculate to the end of builder
	  $element_to_the_string_end = substr($builder_elements_options_string,  $element_start);
	  // now calculate obly the element(until 6 elelemnts in the string
	  $element_as_array = explode(',', $element_to_the_string_end, 7);
	  if($element_as_array[1] == "markup"){
		  $return_value= $element_as_array[5];
		  $return_value= atou($return_value);
			 
			 // check if "<a..." exists in orifinal markup			 
			 $anchor_position = strpos( $return_value, "<a");
			 if ( $anchor_position !== false ) { // <a exists=> we have a specail treatment
				  if(($element_as_array[3] != "" ) && ($element_as_array[4] != "" )) { // $element_as_array[3] = href
				    // we wrap with <span> and modify the original href with javascript
					
					//change_anchor_by_javascript($element_as_array[2], $element_as_array[3], $element_as_array[4]); 
					// manipulate with phpquery
					$html = str_get_html($return_value);
					$a = $html->find('a',0);
					$a->href = $element_as_array[3];
					return (string) $html;
				  }
			 // class is not used by user. We use markup name as class
			 //else if(($element_as_array[3] != "null" ) && ($element_as_array[4] == "null" )) { // $element_as_array[3] = href
			 else if(($element_as_array[3] != "" ) && ($element_as_array[4] == "" )) { // $element_as_array[3] = href
				    // we wrap with <span> and modify the original href with javascript
					$html = str_get_html($return_value);
					$a = $html->find('a',0);
					$a->href = $element_as_array[3];
					return (string) $html;
					  
					//return $return_value;
				  }
				  
			 }//  if ( $anchor_position !== false ) { // <a exists=> we have a specail treatment
			 else { // there is no anchor
			  // if href and class are used by this markup
			  //if(($element_as_array[3] != "null" ) && ($element_as_array[4] != "null" )) { // $element_as_array[3] = href
			  if(($element_as_array[3] != "" ) && ($element_as_array[4] != "" )) { // $element_as_array[3] = href
				 $return_value = "<a class='" . $element_as_array[4] . "' " . " href='" . $element_as_array[3] . "'>" .  $return_value . "</a>";	
				 return $return_value;
			    }// if href  used but not class this markup
			  //else if(($element_as_array[3] != "null" ) && ($element_as_array[4] == "null" )) { // $element_as_array[3] = href
			  else if(($element_as_array[3] != "" ) && ($element_as_array[4] == "" )) { // $element_as_array[3] = href
				 $return_value = "<a href='" . $element_as_array[3] . "'>" .  $return_value . "</a>";	
				 return $return_value;
			    }// // if href and class are not used
			  //else if(($element_as_array[3] == "null" ) && ($element_as_array[4] == "null" )) { // $element_as_array[3] = href
			  else if(($element_as_array[3] == "" ) && ($element_as_array[4] == "" )) { // $element_as_array[3] = href
				 return $return_value;
			    }
			  
			 }
	 				 
	  }// markup
      if($element_as_array[1] == "button"){
		  // href and class are used
          //if(($element_as_array[3] != "null" ) && ($element_as_array[4] != "null" )) { // $element_as_array[3] = href
          if(($element_as_array[3] != "" ) && ($element_as_array[4] != "" )) { // $element_as_array[3] = href
		    $return_value = "<a class='" . $element_as_array[4] . "' " . " href='" . $element_as_array[3] . "'>" .  "<button>" . $element_as_array[2] . "</button></a>";
		  }
		  // href defined without class
		  //else if (($element_as_array[3] != "null" ) && ($element_as_array[4] == "null" )) {
		  else if (($element_as_array[3] != "" ) && ($element_as_array[4] == "" )) {
		    $return_value = "<a href='" . $element_as_array[3] . "'>" .  "<button>" . $element_as_array[2] . "</button></a>";
		  }
		  // class defined without href
		  //else if (($element_as_array[3] == "null" ) && ($element_as_array[4] != "null" )) {
		  else if (($element_as_array[3] == "" ) && ($element_as_array[4] != "" )) {
			  $return_value = "<button class='" . $element_as_array[4] . "' >" .  $element_as_array[2] . "</button>";
		  }
		  // href and class both not defined
		  //else if (($element_as_array[3] == "null" ) && ($element_as_array[4] == "null" ))// ==> do nothing
		  else if (($element_as_array[3] == "" ) && ($element_as_array[4] == "" ))// ==> do nothing
			  $return_value = "<button>" .  $element_as_array[2] . "</button>";
		  
		  return $return_value;
	  }// button
	  if($element_as_array[1] == "link"){
		  // href and class are used
		  //if(($element_as_array[3] != "null" ) && ($element_as_array[4] != "null" )) { // $element_as_array[3] = href
		  if(($element_as_array[3] != "" ) && ($element_as_array[4] != "" )) { // $element_as_array[3] = href
			  $return_value = "<a class='" . $element_as_array[4] . "' " . " href='" . $element_as_array[3] . "'>" . $element_as_array[2] . "</a>";
		  }
		  // href defined without class
		  //else if (($element_as_array[3] != "null" ) && ($element_as_array[4] == "null" )) {
		  else if (($element_as_array[3] != "" ) && ($element_as_array[4] == "" )) {
			  $return_value = "<a href='" . $element_as_array[3] . "'>" .  "<button>" . $element_as_array[2] . "</button></a>";
		  }
		  // class defined without href
		  //else if (($element_as_array[3] == "null" ) && ($element_as_array[4] != "null" )) {
		  else if (($element_as_array[3] == "" ) && ($element_as_array[4] != "" )) {
			  $return_value = "<button class='" . $element_as_array[4] . "' >" .  $element_as_array[2] . "</button>";
		  }
		  // href and class both not defined
		   else if (($element_as_array[3] == '' ) && ($element_as_array[4] == '' ))
			   $return_value = "<a href=#>" . $element_as_array[2] . "</a>";

		  return $return_value;
	  }// button

	  


  }// function calculate_html( $element_id){


  function private_html(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder;
  echo $html_builder;
  }

  function private_html_0(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder;
  echo $html_builder[0];
  }  
  function private_html_1(){
  //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
  global $html_builder;
  echo $html_builder[1];
  }
function private_html_2(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[2];
}

function private_html_3(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[3];
}

function private_html_4(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[4];
}

function private_html_5(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[5];
}
function private_html_6(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[6];
}
function private_html_7(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[7];
}
function private_html_8(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[8];
}
function private_html_9(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[9];
}
function private_html_10(){
    //echo "<p><i class='fa fa-camera-retro'></i> fa-camera-retro</p>";
    global $html_builder;
    echo $html_builder[10];
}


