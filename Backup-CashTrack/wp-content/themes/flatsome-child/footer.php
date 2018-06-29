<?php
/**
 * The template for displaying the footer.
 *
 * @package flatsome
 */

global $flatsome_opt;
?>

</main><!-- #main -->

<footer id="footer" class="footer-wrapper">

	<?php do_action('flatsome_footer'); ?>

</footer><!-- .footer-wrapper -->

</div><!-- #wrapper -->
<script>
jQuery(document).ready(function(){
	jQuery('#customer_login').on('click', "#mylginform", function () {
   
        jQuery('#woocommerce-form-login').show();
		jQuery('#woregister').hide();
		
    });
	jQuery('#customer_login').on('click', "#myregisterform", function () {
	
        jQuery('#woocommerce-form-login').hide();
		jQuery('#woregister').show();
    });
});
</script>
<?php wp_footer(); ?>

</body>
</html>
