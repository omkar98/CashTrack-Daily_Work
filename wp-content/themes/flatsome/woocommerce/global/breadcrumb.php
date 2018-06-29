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
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

  


if ( !empty($breadcrumb) ) {

  
  //  do_action('flatsome_before_breadcrumb');
//
	//echo $wrap_before;
//    
//    //print_r($breadcrumb);
//
//
//	foreach ( $breadcrumb as $key => $crumb ) {
//       
//                
//		echo $before;
//		if ( ! empty( $crumb[1] ) && sizeof( $breadcrumb ) !== $key + 1 ) {
//			echo '<a href="' . esc_url( $crumb[1] ) . '">' . esc_html( $crumb[0] ) . '</a>';
//           
//        
//		} else if(!is_product() && !flatsome_option('wc_category_page_title')) {
//			echo esc_html( $crumb[0] );
//            
//		}
//        if($key == 2){
//            echo '<span class = "divider" style = "font-weight:300;"> &nbsp;| Caps :&nbsp;'. substr($crumb[0],-3,3).'</span>';
//          
//        }
//
//		echo $after;
//
//		// Single product or Active title
//		if(is_product() || flatsome_option('wc_category_page_title')){
//				$key = $key+1;
//				if ( sizeof( $breadcrumb ) > $key+1) {
//					//echo ' <span class="divider">'.$delimiter.'</span> ';
//                    echo '<span class="divider">:</span>';
//				}
//		} else{
//			
//		// Category pages
//		if ( sizeof( $breadcrumb ) !== $key + 1 ) {
//				//echo ' <span class="divider">'.$delimiter.'</span> ';
//                                echo '<span class="divider">:</span>';
//
//			}
//		}
//
//	}
//
       
	echo $wrap_after;
    //Fetch Needs And Brand
    $product_id = get_the_ID();
//echo get_the_title($product_id);
?>
<div id = "breadcrumb">
<?php
$terms = get_the_terms ( $product_id, 'product_cat' );
print_r($terms);
    $count = 0;
    $brand;
foreach ( $terms as $term ) 
{
    if($term->$term_id == 94)
    {
        $brand = $term->name;
    }
    if($term->$term_id == 15)
    {
        $needs = $term->name;
    }
}
$terms = get_the_terms ( $product_id, 'product_cat' );
foreach ( $terms as $term ) 
{   
    if($term->parent == 94)
    {
     echo "$brand : $term->name";
     echo '<a href="'.home_url( ).'/product-category/'.$brand.'/'.$term->name.'">' . '</a>';
    }
}   
 $terms = get_the_terms ( $product_id, 'product_cat' );
 $count = 0;
 foreach ( $terms as $term ) 
 {
    if($term->parent == 15)
    {
        if($count==0)
        {
            echo ' | Type: '.$term->name;
            $count++;
        }else{
            echo ',' .$term->name;
        }
    }
         
}
   echo ' | Caps :&nbsp;'. substr(get_the_title($product_id),-3,3);   
}
?>
</div>
<?php
do_action('flatsome_after_breadcrumb');
    ?>