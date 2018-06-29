<?php
/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'bitnami_wordpress');
/** MySQL database username */
define('DB_USER', 'bn_wordpress');
/** MySQL database password */
define('DB_PASSWORD', 'd48bd978ba');
/** MySQL hostname */
define('DB_HOST', 'localhost:3306');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '4be37d73c312647e13a3ccc6653c51ab4645af526c5782f71669d2166596527f');
define('SECURE_AUTH_KEY', '836b3a8f7cc4a3272752a7987006fbc6bce667c82685273ece3eb240cd995016');
define('LOGGED_IN_KEY', '7365cac23d57b7c283a6e30fb9ee9b33faafd6f665b7274f61757865546ed10a');
define('NONCE_KEY', '1d05956b04841cc57521c2e7ff63c41cca5ecf8d0975157e45d9de77d993c66b');
define('AUTH_SALT', '03d841fadafb7eb819f52884b7c9cbebb23b899fdce2b343da508d49d55eb389');
define('SECURE_AUTH_SALT', '625cc4354e3518e80768440364569f0652b7ebcbdb65a38331a4490ad7f860f2');
define('LOGGED_IN_SALT', 'eb0c76a808da8b11ccee7947e5a8f90c551945861b85fd0e176fe102760a73cc');
define('NONCE_SALT', '0648c2e88a9b82bd20d327ad2d63726068724d480d306e3566153335261e8173');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
/* That's all, stop editing! Happy blogging. */
/**
 * The WP_SITEURL and WP_HOME options are configured to access from any hostname or IP address.
 * If you want to access only from an specific domain, you can modify them. For example:
 *  define('WP_HOME','https://example.com');
 *  define('WP_SITEURL','https://example.com');
 *
*/
define('WP_SITEURL','https://' . $_SERVER['HTTP_HOST'] . '/');
define('WP_HOME','https://' . $_SERVER['HTTP_HOST'] . '/');
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
define('WP_TEMP_DIR', '/opt/bitnami/apps/wordpress/tmp');
define('FS_METHOD', 'direct');
//  Disable pingback.ping xmlrpc method to prevent Wordpress from participating in DDoS attacks
//  More info at: https://docs.bitnami.com/?page=apps&name=wordpress&section=how-to-re-enable-the-xml-rpc-pingback-feature
// remove x-pingback HTTP header
add_filter('wp_headers', function($headers) {
    unset($headers['X-Pingback']);
    return $headers;
});
// disable pingbacks
add_filter( 'xmlrpc_methods', function( $methods ) {
        unset( $methods['pingback.ping'] );
        return $methods;
});
add_filter( 'auto_update_translation', '__return_false' );
