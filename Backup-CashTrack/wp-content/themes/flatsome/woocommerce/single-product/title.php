<?php
/**
 * Single Product title
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

        global $product; 
       
?>
<h1 class="product-title entry-title removepadng">
	<?php the_title(); ?>
</h1>
<!--<p class="packsize">Pack Size : <?php //echo $product->get_stock_quantity(); ?> Tabs</p> -->
<?php if(get_theme_mod('product_title_divider', 1)) { ?>
	<div class="is-divider small"></div>
<?php } ?>
