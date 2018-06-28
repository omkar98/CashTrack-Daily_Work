<?php
/**
 * Single Product Price, including microdata for SEO
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/price.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product;

$classes = array();
if($product->is_on_sale()) $classes[] = 'price-on-sale';
if(!$product->is_in_stock()) $classes[] = 'price-not-in-stock'; ?>
	<div class="linedraw"></div>
	<div class="original_price"> 
	<?php $mysus= $product->get_sale_price() ;
			//echo $mysus;
			if($mysus != ""){
			?>
			<table cellspacing="0">
				<tr></tr>
			<tr>	
			<td class="single_product_price_info_labels"><?php 
			echo '<span>'.'With Guardian Subscriptoins'.'</span>';
			?>
			</td>
			</tr>
		
			<tr>
			<td class="single_product_price_info_values"><?php 
			$prs=$product->get_regular_price();
			$newprice =floatval($prs) * 0.8;
			echo '<span style="font-size: 22px; font-weight:500; color: #E87722">'.'SGD '.$newprice.' /'.' '.'Pack'.'</span>'; 
			?>
			</td>
		</tr>
		<tr>
			<td class="single_product_price_info_values"><?php 
			$prs=$product->get_regular_price();
			echo '<span style="text-decoration: line-through; color: #9e9e9e; font-size: 14px; font-weight:500; line-height:3px">'.'SGD '.$prs.' /'.' '.'Pack'.'</span>'; 
			echo '<span style="font-size: 14px;">'.' -20%'.'</span>';
			?>
			</td>
	 	</tr>
<!--<tr>
			<td class="single_product_price_info_labels"><?php 
			echo '<span>'.'Tabs per Pack:'.'</span>';
			?>
			</td>
						<td class="single_product_price_info_values"><?php 
			$name=$product->get_title();
			$tabs = substr($name, -3,2);
			echo '<span>'.$tabs.' tabs'.'</span>'; 
			?>
			</td>
		</tr>-->

			<?php } ?>
		</table>
	</div>
		<div class="linedraw2"></div>
	<!---<p class="price product-page-price <?php echo implode(' ', $classes); ?>">
  <?php // echo $product->get_price_html(); ?></p>-->




