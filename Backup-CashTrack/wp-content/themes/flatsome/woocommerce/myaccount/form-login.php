<?php
/**
 * Login Form
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 3.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<?php
$is_facebook_login = is_nextend_facebook_login();
$is_google_login   = is_nextend_google_login();

$login_text = flatsome_option( 'facebook_login_text' );
$login_bg   = flatsome_option( 'facebook_login_bg' );
$login_bg   = $login_bg ? 'style="background-image:url(' . do_shortcode( $login_bg ) . ')"' : '';

global $wp;
$endpoint_label = '';
$current_url    = home_url( $wp->request );

// Collect current WC endpoint label.
if ( function_exists( 'wc_get_account_menu_items' ) && get_theme_mod( 'wc_account_links', 1 ) ) {
	foreach ( wc_get_account_menu_items() as $endpoint => $label ) {
		if ( untrailingslashit( wc_get_account_endpoint_url( $endpoint ) ) === $current_url ) {
			$endpoint_label = $label;
			break;
		}
	}
}
?>
<?php wc_print_notices(); ?>

<?php do_action( 'woocommerce_before_customer_login_form' ); ?>

<div class="account-container lightbox-inner sizereduce">

	<?php if ( get_option( 'woocommerce_enable_myaccount_registration' ) === 'yes' ) : ?>

	<div class="col2-set row row-divided row-large" id="customer_login">

		<!--<div class="col-1 large-6 col pb-0">-->
		<div class="col-1  col pb-0">

	<?php endif; ?>

		<div class="account-login-inner">
  
 
			<label id="mylginform" class="ms-re"><input type="radio" name="radio" checked><h3 class=""><?php esc_html_e( 'I already have an account', 'woocommerce' ); ?></h3></label>
			
			<label id="myregisterform" class="ms-re"><input type="radio" name="radio"><h3 class=""><?php esc_html_e( "I don't have an account", 'woocommerce' ); ?></h3></label>

			<form  id="woocommerce-form-login" class="woocommerce-form woocommerce-form-login login" method="post">

				<?php do_action( 'woocommerce_login_form_start' ); ?>

				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
					<label for="username"><?php esc_html_e( 'Username or email address', 'woocommerce' ); ?> <span class="required">*</span></label>
					<input type="text" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" /><?php // @codingStandardsIgnoreLine ?>
				</p>
				<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
					<label for="password"><?php esc_html_e( 'Password', 'woocommerce' ); ?> <span class="required">*</span></label>
					<input class="woocommerce-Input woocommerce-Input--text input-text" type="password" name="password" id="password" />
				</p>

				<?php do_action( 'woocommerce_login_form' ); ?>

				<p class="form-row">
					<?php wp_nonce_field( 'woocommerce-login', 'woocommerce-login-nonce' ); ?>
					<button type="submit" class="woocommerce-Button button" name="login" value="<?php esc_attr_e( 'Login', 'woocommerce' ); ?>"><?php esc_html_e( 'Login', 'woocommerce' ); ?></button>
					<label class="woocommerce-form__label woocommerce-form__label-for-checkbox inline">
						<input class="woocommerce-form__input woocommerce-form__input-checkbox" name="rememberme" type="checkbox" id="rememberme" value="forever" /> <span><?php esc_html_e( 'Remember me', 'woocommerce' ); ?></span>
					</label>
				</p>
				<p class="woocommerce-LostPassword lost_password">
					<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>"><?php esc_html_e( 'Lost your password?', 'woocommerce' ); ?></a>
				</p>

				<?php do_action( 'woocommerce_login_form_end' ); ?>

			</form>
			
			<form id="woregister" method="post" class="register" style="display:none;"> 

					<?php do_action( 'woocommerce_register_form_start' ); ?>

					<?php if ( 'no' === get_option( 'woocommerce_registration_generate_username' ) ) : ?>

						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
							<label for="reg_username"><?php esc_html_e( 'Username', 'woocommerce' ); ?> <span class="required">*</span></label>
							<input type="text" class="woocommerce-Input woocommerce-Input--text input-text" name="username" id="reg_username" value="<?php echo ( ! empty( $_POST['username'] ) ) ? esc_attr( wp_unslash( $_POST['username'] ) ) : ''; ?>" /><?php // @codingStandardsIgnoreLine ?>
						</p>

					<?php endif; ?>

					<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
						<label for="reg_email"><?php esc_html_e( 'Email address', 'woocommerce' ); ?> <span class="required">*</span></label>
						<input type="email" class="woocommerce-Input woocommerce-Input--text input-text" name="email" id="reg_email" value="<?php echo ( ! empty( $_POST['email'] ) ) ? esc_attr( wp_unslash( $_POST['email'] ) ) : ''; ?>" /><?php // @codingStandardsIgnoreLine ?>
					</p>

					<?php if ( 'no' === get_option( 'woocommerce_registration_generate_password' ) ) : ?>

						<p class="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
							<label for="reg_password"><?php esc_html_e( 'Password', 'woocommerce' ); ?> <span class="required">*</span></label>
							<input type="password" class="woocommerce-Input woocommerce-Input--text input-text" name="password" id="reg_password" />
						</p>

					<?php endif; ?>

					<?php do_action( 'woocommerce_register_form' ); ?>

					<p class="woocommerce-FormRow form-row">
						<?php wp_nonce_field( 'woocommerce-register', 'woocommerce-register-nonce' ); ?>
						<?php if ( fl_woocommerce_version_check( '3.3.0' ) ) : ?>
							<button type="submit" class="woocommerce-Button button" name="register" value="<?php esc_attr_e( 'Register', 'woocommerce' ); ?>"><?php esc_html_e( 'Register', 'woocommerce' ); ?></button>
						<?php else : ?>
							<input type="submit" class="woocommerce-Button button" name="register" value="<?php esc_attr_e( 'Register', 'woocommerce' ); ?>" />
						<?php endif; ?>
					</p>

					<?php do_action( 'woocommerce_register_form_end' ); ?>

				</form>
			
		</div><!-- .login-inner -->

<?php if ( get_option( 'woocommerce_enable_myaccount_registration' ) === 'yes' ) : ?>

		</div>

		<?PHP /* <div class="col-2 large-6 col pb-0">
 
			<div class="account-register-inner"> 
				<div class="text-center social-login ownsocial">
					<?php if ( ! $is_facebook_login && ! $is_google_login ) {
						echo '<h1 class="uppercase mb-0">' . get_the_title() . '</h1>';
					} ?>

					<?php if ( $is_facebook_login && get_option( 'woocommerce_enable_myaccount_registration' ) == 'yes' && ! is_user_logged_in() ) { ?>
						<a href="<?php echo wp_login_url(); ?>?loginFacebook=1&redirect=<?php echo the_permalink(); ?>"
						   class="button social-button large facebook circle"
						   onclick="window.location = '<?php echo wp_login_url(); ?>?loginFacebook=1&redirect='+window.location.href return false"><i class="icon-facebook"></i>
							<span><?php _e( 'Login with <strong>Facebook</strong>', 'flatsome' ); ?></span></a>
					<?php } ?>

					<?php if ( $is_google_login && get_option( 'woocommerce_enable_myaccount_registration' ) == 'yes' && ! is_user_logged_in() ) { ?>

						<a class="button social-button large google-plus circle"
						   href="<?php echo wp_login_url(); ?>?loginGoogle=1&redirect=<?php echo the_permalink(); ?>"
						   onclick="window.location = '<?php echo wp_login_url(); ?>?loginGoogle=1&redirect='+window.location.href return false">
							<i class="icon-google-plus"></i>
							<span><?php _e( 'Login with <strong>Google</strong>', 'flatsome' ); ?></span></a>
					<?php } ?>

					<?php if ( $login_text ) { ?><p><?php echo do_shortcode( $login_text ); ?></p><?php } ?>
				</div>
				
				<!--<h3 class="uppercase"><?php //esc_html_e( 'Register', 'woocommerce' ); ?></h3>-->  

				

			</div><!-- .register-inner -->

		</div><!-- .large-6 --> */
 ?>
	</div> <!-- .row -->
<?php endif; ?>

</div><!-- .account-login-container -->

<?php do_action( 'woocommerce_after_customer_login_form' ); ?>
