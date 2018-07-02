<?php
// Add custom Theme Functions here
function sai_woocommerce_catalog_orderby( $orderby ) {
	unset($orderby["newness"]);
	unset($orderby["average-rating"]);
	return $orderby;
}
add_filter( "woocommerce_catalog_orderby", "sai_woocommerce_catalog_orderby", 20 );
/* WORDPRESS REDIRECT ON LOGOUT */
add_action('wp_logout','auto_redirect_after_logout');
function auto_redirect_after_logout(){
  wp_redirect( home_url("/shop") );
  exit();
}
/* END WORDPRESS REDIRECT ON LOGOUT */
?>

<?php


remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );

add_action( 'woocommerce_after_add_to_cart_button', 'add_content_after_addtocart_button_func' );

function add_content_after_addtocart_button_func() {
    echo '<img src="'.home_url( ).'/wp-content/uploads/2018/05/offer_image.PNG"></a>';
}




<?php
/**
 * @snippet       Display Discount Percentage @ Loop Pages - WooCommerce
 * @how-to        Watch tutorial @ https://businessbloomer.com/?p=19055
 * @sourcecode    https://businessbloomer.com/?p=21997
 * @author        Rodolfo Melogli
 * @compatible    WC 2.6.14, WP 4.7.2, PHP 5.5.9
 */
 
add_action( 'woocommerce_before_shop_loop_item_title', 'bbloomer_show_sale_percentage_loop', 25 );
 
function bbloomer_show_sale_percentage_loop() {
global $product;
if ( $product->is_on_sale() ) {
if ( ! $product->is_type( 'variable' ) ) {
$max_percentage = round( ( ( $product->regular_price - $product->sale_price ) / $product->regular_price ) * 100 );
} else {
foreach ( $product->get_children() as $child_id ) :
$variation = $product->get_child( $child_id );
$price = $variation->get_regular_price();
$sale = $variation->get_sale_price();
$percentage = $price != 0 && ! empty( $sale ) ? ( ( $price - $sale ) / $price * 100 ) : $max_percentage;
if ( $percentage >= $highest_percentage ) :
    $max_percentage = $percentage;
    $regular_price = $product->get_variation_regular_price( 'min' );
    $sale_price = $product->get_variation_sale_price( 'min' );
endif;
endforeach;
}
//echo "<div class='sale-perc'>-" . round($max_percentage) . "%</div>";
}
}
add_action( 'woocommerce_before_cart_table', 'wpdesk_cart_free_shipping_text' );
/**
 * Add "free shipping" text to WooCommerce cart page
 *
 */
if(!function_exists('flatsome_woocommerce_before_cart_totals')) {
  function flatsome_woocommerce_before_cart_totals(){  ?>
          <table cellspacing="0">
          <thead>
              <tr>
                  <th class="product-name" colspan="2" style="border-width:3px;"><?php _e( 'Cart total', 'woocommerce' ); ?></th>
              </tr>
          </thead>
          </table>
  <?php }
}
add_action( 'woocommerce_before_cart_totals', 'flatsome_woocommerce_before_cart_totals' );

/* add_filter( 'woocommerce_cart_calculate_fees', 'add_recurring_postage_fees', 10, 1 );

function add_recurring_postage_fees( $cart ) {
    if ( ! empty( $cart->recurring_cart_key ) ) {
        $cart->add_fee( 'Postage', 5 );  
    }
} */
?>

<?php // Do not include this if already open!
/**
 * Code goes in theme functions.php
 * 
 * Reduce the strength requirement on the woocommerce password.
 *
 * Strength Settings
 * 3 = Strong (default)
 * 2 = Medium
 * 1 = Weak
 * 0 = Very Weak / Anything
 */
add_filter( 'woocommerce_min_password_strength', function () {
	return 1;
} );


/**
 * Change number of products that are displayed per page (shop page)
 */
add_filter( 'loop_shop_per_page', 'new_loop_shop_per_page', 20 );

function new_loop_shop_per_page( $cols ) {
  // $cols contains the current number of products per page based on the value stored on Options -> Reading
  // Return the number of products you wanna show per page.
  $cols = 9;
  return $cols;
}



