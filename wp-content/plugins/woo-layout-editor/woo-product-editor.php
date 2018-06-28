<?php
/**
 * Plugin Name: Woo Layout Editor
 * Plugin URI: http://www.triplebit.com/myplugins/woo-layout-editor.zip
 * Description: Page/Shop Layout Editor
 * Version: 1.5.4
 * Author: Izac Lesher
 * Author URI: http://itziklesher.com
 * Text Domain: woo-layout-editor
 * Domain Path: /languages
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Copyright 2016  Izack Lesher  (email : msher3@gmail.com)
 */

// eliminate direct access 
defined( 'ABSPATH' ) or die( 'No script kiddies please!' ); 
 
global $options_page;


$html_builder ="";
$options = get_option( 'woolayedtil_options' );


/********************************************************************************
 * runs function (woolayedtil_set_default_options_array) on Activating the plugin        
 *******************************************************************************/

register_activation_hook( __FILE__, 'woolayedtil_set_default_options_array' );

function woolayedtil_set_default_options_array() {
	if ( get_option( 'woolayedtil_options' ) === false ) {
		$new_options['serialization_stack_shop'] = "idshop[]=1&idshop[]=2&idshop[]=3&idshop[]=4&idshop[]=5&idshop[]=6&idshop[]=7&idshop[]=8&idshop[]=9";
		$new_options['serialization_stack_shop_products'] = "idshoppr[]=1&idshoppr[]=2&idshoppr[]=3&idshoppr[]=4&idshoppr[]=5&idshoppr[]=6";
		$new_options['serialization_stack'] = "id[]=1&id[]=2&id[]=3&id[]=4&id[]=5&id[]=6&id[]=7&id[]=8&id[]=9&id[]=10&id[]=11&id[]=12";
		$new_options['serialization_stack_product_builder'] = "";
		$new_options['serialization_stack_shop_products_builder'] = "";
		$new_options['serialization_stack_shop_builder'] = "";
		$new_options['version'] = "1.4";
		add_option( 'woolayedtil_options', $new_options );
	} else {
		$existing_options = get_option( 'woolayedtil_options' );
		if ( $existing_options['version'] < 1.5 ) {
			$existing_options['version'] = "1.5.4";
			update_option( 'woolayedtil_options', $existing_options );
		}
	}
}

/*****************************************************************
 * Creating an administration page menu item                     *                                         *
 *****************************************************************/
add_action('admin_menu', 'woolayedtil_register_woo_layout_editor',99);
function woolayedtil_register_woo_layout_editor() {

global $options_page;

 $options_page =  add_submenu_page( 'woocommerce', 'Layout Editor', 'Layout Editor', 
 'manage_options', 'my-custom-submenu-page', 'woolayedtil_config_page' ); 

	if ($options_page)
		add_action( 'load-' . $options_page, 'woolayedtil_help_tabs', 10 );
}
/*****************************************************************
 * Rendering admin page contents using HTML                      *
 *****************************************************************/

function woolayedtil_config_page() {
	// Retrieve plugin configuration options from database
	$options = get_option( 'woolayedtil_options' );
        global $options_page;
	?>

	<div id="woolayedtil-general" class="wrap">
	<h2>Woo Layout Editor</h2>
	
	<?php if (isset( $_GET['message'] ) && $_GET['message'] == '1') { ?>
	<div id='message' class='updated fade'><p><strong>Settings Saved</strong></p></div>
	<?php } ?>

	<form method="post" action="admin-post.php">

	 <input type="hidden" name="action"
		value="save_woolayedtil_options" />

	 <!-- Adding security through hidden referrer field -->
	 <?php wp_nonce_field( 'woolayedtil' ); ?>

	<!-- Security fields for meta box save processing -->
		<?php wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false ); ?>
		<?php wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false ); ?>

		<div id="poststuff" class="metabox-holder">
			<div id="post-body">
				<div id="post-body-content">
				<?php do_meta_boxes( $options_page, 'normal', $options ) ; ?>
				</div>
			</div>
			<br class="clear"/>
		</div>
		<input type="submit" value="Save" class="button-primary"/>
	</form>
	</div>

	<script type="text/javascript">

		//<![CDATA[
		jQuery( document ).ready( function( $ ) {
		// close postboxes that should be closed
		$( '.if-js-closed' ) .removeClass( 'if-js-closed' ).addClass( 'closed' );

		// takes care in Refresh and in Submit
		if(!$('div#Product_layout_Editor_Meta_Box').hasClass('closed')){
          // calculate height according to ul height
          if ( $("#sortable1").height() > $("#sortable2").height())
                   $('div#Product_layout_Editor_Meta_Box').height($("#sortable1").height() + 70);
          else
                   $('div#Product_layout_Editor_Meta_Box').height($("#sortable2").height() + 70);  			   
			   // save value for future use
			   localStorage.setItem('product_meta_box_height',$('div#Product_layout_Editor_Meta_Box').height());
        }
			else
				$('div#Product_layout_Editor_Meta_Box').height('');

         // in case we toggle with the right button
      	 $('div#Product_layout_Editor_Meta_Box button.handlediv.button-link').click(function(){
            if(!$('div#Product_layout_Editor_Meta_Box').hasClass('closed'))
              $('div#Product_layout_Editor_Meta_Box').height('');
            else{
 			  $('div#Product_layout_Editor_Meta_Box').height(localStorage.getItem('product_meta_box_height'));
             } // else{
            });  //  $('div#Product_layout_Editor_Meta_Box button.handlediv.button-link').click(function(){

		    // same for Shop Editor

			// takes care in Refresh and in Submit
			if(!$('div#Shop_Layout_Editor_Meta_Box').hasClass('closed')){
             // calculate height according to ul height
            if ( ($("#sortable_shop1").height() + 70) > $("#sortable_shop2").height())
                  $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop1").height() + 140);
            else
                   $('div#Shop_Layout_Editor_Meta_Box').height($("#sortable_shop2").height() + 70);
             // get the height here since checked later in order to choose the most heigh in the shop meta box  
             shop_meta_box_height_general = $('div#Shop_Layout_Editor_Meta_Box').height();
             localStorage.setItem('shop_meta_box_height',$('div#Shop_Layout_Editor_Meta_Box').height());

            }// if(!$('div#Shop_Layout_Editor_Meta_Box').hasClass('closed')){
			else
				$('div#Shop_Layout_Editor_Meta_Box').height('');

			// in case we toggle with the right button
			$('div#Shop_Layout_Editor_Meta_Box button.handlediv.button-link').click(function(){
				if(!$('div#Shop_Layout_Editor_Meta_Box').hasClass('closed'))
					$('div#Shop_Layout_Editor_Meta_Box').height('');
				else{
					//$('div#Shop_Layout_Editor_Meta_Box').height(900);
				/*	
                                        shtrudel_count = $('#serialize-layers').val().split("&").length-1;
                                        if (shtrudel_count  >= 4)// if yes than we calculate according trash box
                                           $('div#Shop_Layout_Editor_Meta_Box').height((shtrudel_count + 1) * 80);
                                        else
                                           $('div#Shop_Layout_Editor_Meta_Box').height((9 - (shtrudel_count + 1)) * 80);
				*/
			        $('div#Shop_Layout_Editor_Meta_Box').height(localStorage.getItem('shop_meta_box_height'));
				
  			  $('div#Shop_Layout_Editor_Meta_Box').height(localStorage.getItem('shop_meta_box_height'));
                                 }
			});

		    // same for Shop Products Editor

			// takes care in Refresh and in Submit
			if(!$('div#Shop_Products_Layout_Editor_Meta_Box').hasClass('closed')){
             // calculate height according to ul height
             if ( ($("#sortable_shop1pr").height() + 70) > $("#sortable_shop2pr").height())
                   $('div#Shop_Products_Layout_Editor_Meta_Box').height($("#sortable_shop1pr").height() + 140);
            else
                   $('div#Shop_Products_Layout_Editor_Meta_Box').height($("#sortable_shop2pr").height() + 70);
             // get the height here since checked later in order to choose the most heigh in the shop meta box  
             shop_products_meta_box_height_general = $('div#Shop_Products_Layout_Editor_Meta_Box').height();
             localStorage.setItem('shop_products_meta_box_height',$('div#Shop_Products_Layout_Editor_Meta_Box').height());

            }// if(!$('div#Shop_Products_Layout_Editor_Meta_Box').hasClass('closed')){
			else
				$('div#Shop_Products_Layout_Editor_Meta_Box').height('');

			// in case we toggle with the right button
			$('div#Shop_Products_Layout_Editor_Meta_Box button.handlediv.button-link').click(function(){
				if(!$('div#Shop_Products_Layout_Editor_Meta_Box').hasClass('closed'))
					$('div#Shop_Products_Layout_Editor_Meta_Box').height('');
				else{
					//$('div#Shop_Products_Layout_Editor_Meta_Box').height(900);
                                        shtrudel_count = $('#serilization-layers-shop-products').val().split("&").length-1;
                                        if (shtrudel_count  >= 4)// if yes than we calculate according trash box
                                           $('div#Shop_Products_Layout_Editor_Meta_Box').height((shtrudel_count + 1) * 80);
                                        else
                                           $('div#Shop_Products_Layout_Editor_Meta_Box').height((9 - (shtrudel_count + 1)) * 80);
  			       $('div#Shop_Products_Layout_Editor_Meta_Box').height(localStorage.getItem('shop_products_meta_box_height'));
                                 }
			});
			
			
			
			// postboxes setup
		postboxes.add_postbox_toggles( '<?php echo $options_page; ?>' );
		});
		//]]>
      //# sourceURL=MyInlineScript.js
	</script>
<?php }
//  function woolayedtil_config_page() {
/*****************************************************************
 * Processing and storing admin page post data                   *
 *****************************************************************/

add_action( 'admin_init', 'woolayedtil_admin_init', 10 );

function woolayedtil_admin_init() {
	add_action('admin_post_save_woolayedtil_options',
		 'woolayedtil_process_options',10);
}
//Processing and storing admin page post data

function woolayedtil_process_options() {
	// Check that user has proper security level

	if ( !current_user_can( 'manage_options' ) )
	wp_die( 'Not allowed' );

	// Check that nonce field created in configuration form
	// is present

	check_admin_referer( 'woolayedtil' );

	// Retrieve original plugin options array
	$options = get_option( 'woolayedtil_options' );

	// Cycle through all text form fields and store their values
	// in the options array

	foreach ( array( 'serialization_stack_shop' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}
	foreach ( array( 'serialization_stack_shop_products' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}
	foreach ( array( 'serialization_stack' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}
	
	foreach ( array( 'serialization_stack_product_builder' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}
	foreach ( array( 'serialization_stack_shop_products_builder' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}
	foreach ( array( 'serialization_stack_shop_builder' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = sanitize_text_field($_POST[$option_name]);
		}
	}

	// Cycle through all check box form fields and set the options
	// array to true or false values based on presence of
	// variables

	foreach ( array( 'eliminate_aditional_information' ) as $option_name ) {
		if ( isset( $_POST[$option_name] ) ) {
			$options[$option_name] = true;
		} else {
			$options[$option_name] = false;
		}
	}

	// Store updated options array to database
	update_option( 'woolayedtil_options', $options );

	// Redirect the page to the configuration form that was
	// processed

	//wp_redirect( add_query_arg( array( 'page' => 'woolayedtil-Woo-edit-configuration', 'message' => '1'), admin_url( 'options-general.php' ) ) );
	wp_redirect( add_query_arg( array( 'page' => 'my-custom-submenu-page', 'message' => '1'), admin_url( 'admin.php' ) ) );
	exit;
}

/*****************************************************************
 * Adding custom help pages                                      *
 *****************************************************************/
 
function woolayedtil_help_tabs() 
{
	$screen = get_current_screen();
	$screen->add_help_tab( array(
		'id'       => 'woolayedtil-plugin-help-instructions',
		'title'    => 'Instructions',
		'callback' => 'woolayedtil_plugin_help_instructions',
	) );

	$screen->add_help_tab( array(
		'id'       => 'woolayedtil-plugin-help-faq',
		'title'    => 'FAQ',
		'callback' => 'woolayedtil_plugin_help_faq',
	) );

	$screen->set_help_sidebar( '<p>This is the sidebar content</p>' );

	global $options_page;
	
	add_meta_box( 'Shop_Layout_Editor_Meta_Box',
			'Shop Layout Editor', 'woolayedtil_Shop_Layout_Editor',
			$options_page, 'normal', 'core' );

	add_meta_box( 'Shop_Products_Layout_Editor_Meta_Box',
			'Shop Products Layout Editor', 'woolayedtil_Shop_Products_Layout_Editor_Meta_Box',
			$options_page, 'normal', 'core' );

	add_meta_box( 'Product_layout_Editor_Meta_Box',
			'Product Layout Editor', 'woolayedtil_Product_layout_Editor_Meta_Box',
			$options_page, 'normal', 'core' ); 
       
}

function woolayedtil_plugin_help_instructions() { ?>
	<p>These are instructions explaining how to use this plugin.</p>
<?php }

function woolayedtil_plugin_help_faq() { ?>
	<p>These are the most frequently asked questions on the use of this plugin.</p>
<?php }

// load all style and css files

add_action( 'admin_enqueue_scripts', 'woolayedtil_load_admin_scripts', 10 );

function woolayedtil_load_admin_scripts() {
	global $current_screen;
	global $options_page;
    global $options;

	if ( $current_screen->id == $options_page ) {
		wp_enqueue_script( 'common' );
		wp_enqueue_script( 'wp-lists' );
		wp_enqueue_script( 'postbox' );
		wp_enqueue_script( 'jquery' );			
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui' );
		wp_enqueue_script( 'jquery-ui-draggable' );
		wp_enqueue_script( 'jquery-ui-sortable' );                  
		wp_enqueue_script( 'woolayedtil_templates_js',plugins_url( './js/templates.js' , __FILE__ ));
		wp_enqueue_script( 'woolayedtil_shop_js',plugins_url( './js/shop.js' , __FILE__ ));
		wp_enqueue_script( 'woolayedtil_shopproducts_js',plugins_url( './js/shop-products.js' , __FILE__ ));
		wp_enqueue_script( 'woolayedtil_product_js',plugins_url( './js/product.js' , __FILE__ ));
		wp_enqueue_style( 'woolayedtil_sortable_css',plugins_url( './css/woo_layout_editor.css' , __FILE__ ));
		wp_enqueue_style( 'woolayedtil_fontaesome_css',plugins_url( './font-awesome/css/font-awesome.css' , __FILE__ ));
		wp_localize_script('woolayedtil_product_js', 'objectFromPhp2', array(
			  'sortable_option' =>  $options['serialization_stack']));
		wp_localize_script('woolayedtil_shop_js', 'objectFromPhpShop2', array(
			  'sortable_option_shop' =>  $options['serialization_stack_shop']));
		wp_localize_script('woolayedtil_shopproducts_js', 'objectFromPhpShop2pr', array(
			  'sortable_option_shop_products' =>  $options['serialization_stack_shop_products']));

	}
} // function woolayedtil_load_admin_scripts() {

// create html meta boxes in admin area


  include dirname( __FILE__ ) . '/lib/simple_html_dom.php';  
  include dirname( __FILE__ ) . '/shop_layout.php';
  include dirname( __FILE__ ) . '/shop_products_layout.php';
  include dirname( __FILE__ ) . '/product_layout.php';
?>
