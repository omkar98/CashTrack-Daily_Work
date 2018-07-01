<style>
div#breadcrumb {
    font-size: 12px;
    margin-bottom: -39px;
    padding-top: 05px;
}

</style>
<?php
/**
 * Shop breadcrumb
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.3.0
 * @see         woocommerce_breadcrumb()
 
 A backup of this file is stored in breadcrumb-backup.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


if ( !empty($breadcrumb) ) {    
	echo $wrap_after;
    //Fetch Needs And Brand
    $product_id = get_the_ID();
?>
<div id = "breadcrumb">
<?php
    
    /*This gets all the terms of a particular product ID*/
$terms = get_the_terms ( $product_id, 'product_cat' );
//print_r($terms);
    $count = 0;
/*This loop is for Brand*/
foreach ( $terms as $term ) 
{   
    if($term->parent == 94)
    {
//     echo  "Brand : " . $term->name;
     echo 'Brand : ';
     echo '<a href="'.home_url( ).'/product-category/brand/'.$term->slug.'">' .$term->name. '</a>';
    }
}   
    
/*This loop is for Type*/
 $terms = get_the_terms ( $product_id, 'product_cat' );
 $count = 0;
 foreach ( $terms as $term ) 
 {
    if($term->parent == 15)
    {
        if($count==0)
        {
            echo ' | More ';
            echo '<a href="'.home_url( ).'/product-category/needs/'.$term->slug.'">'.$term->name.'</a>';
            $count++;
        }else{
            echo ' & ';
            echo '<a href="'.home_url( ).'/product-category/needs/'.$term->slug.'">'.$term->name.'</a>';
        }
    }       
}
   echo ' related products ';
   echo '| Caps :&nbsp;<span>'. substr(get_the_title($product_id),-3,3) . '</span>';   
}
?>
</div>
<?php
do_action('flatsome_after_breadcrumb');
    ?>