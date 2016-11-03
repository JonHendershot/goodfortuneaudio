<?php
	
/**
 * Theme Option Page Example
 */
function plate_theme_menu()
{
  add_theme_page( 'Theme Option', 'plate Options', 'manage_options', 'plate_theme_options.php', 'plate_theme_page');  
}
add_action('admin_menu', 'plate_theme_menu');

/**
 * Callback function to the add_theme_page
 * Will display the theme options page
 */ 
function plate_theme_page()
{
?>
    <div class="section panel">
      <h1>Custom Theme Options</h1>
      <form method="post" enctype="multipart/form-data" action="options.php" id="admin-options">
        <?php 
          settings_fields('plate_theme_options'); 
        
          do_settings_sections('plate_theme_options.php');
        ?>
            <p class="submit">  
                <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />  
            </p>  
            
      </form>
      
    </div>
    <?php
}

/**
 * Register the settings to use on the theme options page
 */
add_action( 'admin_init', 'plate_register_settings' );

/**
 * Function to register the settings
 */
function plate_register_settings()
{
    // Register the settings with Validation callback
    register_setting( 'plate_theme_options', 'plate_theme_options', 'plate_validate_settings' );

    // Add settings section
    add_settings_section( 'plate_contact_section', 'Contact Information', 'plate_display_section', 'plate_theme_options.php' );
    add_settings_section( 'plate_text_section', 'Social Links', 'plate_display_section', 'plate_theme_options.php' );

    
    
    // Create About Title field for Footer
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_fabout_title',
      'name'      => 'plate_fabout_title',
      'desc'      => 'Footer About Title',
      'std'       => '',
      'label_for' => 'plate_fabout_title',
      'class'     => 'css_class'
    );

    add_settings_field( 'plate_fabout_title', 'Footer About Title', 'plate_display_setting', 'plate_theme_options.php', 'plate_contact_section', $field_args );
    
     // Create About field for footer
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_fabout_text',
      'name'      => 'plate_fabout_text',
      'desc'      => 'About paragraph for footer',
      'std'       => '',
      'label_for' => 'plate_fabout_text',
      'class'     => 'css_class'
    );

    add_settings_field( 'plate_fabout_text', 'About Text', 'plate_display_setting', 'plate_theme_options.php', 'plate_contact_section', $field_args );
    
    // Create field for Know Your World Purchase Link
    $field_args = array(
      'type'      => 'text',
      'id'        => 'kyw_purchase',
      'name'      => 'kyw_purchase',
      'desc'      => 'Link for button at bottom of Know Your World posts',
      'std'       => '',
      'label_for' => 'kyw_purchase',
      'class'     => 'css_class'
    );

    add_settings_field( 'kyw_purchase', 'Know Your World Link', 'plate_display_setting', 'plate_theme_options.php', 'plate_contact_section', $field_args );
    
    // Create field for Know Your World Purchase text
    $field_args = array(
      'type'      => 'text',
      'id'        => 'kyw_purchase_text',
      'name'      => 'kyw_purchase_text',
      'desc'      => 'Text for Know Your World Purchase button',
      'std'       => '',
      'label_for' => 'kyw_purchase_text',
      'class'     => 'css_class'
    );

    add_settings_field( 'kyw_purchase_text', 'Know Your World Purchase Text', 'plate_display_setting', 'plate_theme_options.php', 'plate_contact_section', $field_args );

    
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_facebook',
      'name'      => 'plate_facebook',
      'desc'      => 'Facebook Social Link',
      'std'       => '',
      'label_for' => 'plate_facebook',
      'class'     => 'css_class'
    );

    add_settings_field( 'facebook_link', 'Facebook Link', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_instagram',
      'name'      => 'plate_instagram',
      'desc'      => 'Instagram Link',
      'std'       => '',
      'label_for' => 'plate_instagram',
      'class'     => 'css_class'
    );

    add_settings_field( 'insta_link', 'Instagram Link', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_twitter',
      'name'      => 'plate_twitter',
      'desc'      => 'twitter Social Link',
      'std'       => '',
      'label_for' => 'plate_twitter',
      'class'     => 'css_class'
    );

    add_settings_field( 'twitter_link', 'twitter Link', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    
    
	// Search Header Image Upload
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_logo',
      'name'      => 'plate_logo',
      'desc'      => '<input data-category="plate_logo" class="left-float image-trigger" type="button" value="Upload Image"><p>Company Logo for Site Header</p>',
      'std'       => '',
      'label_for' => 'plate_logo',
      'class'     => ' left-float header_image plate_logo'
    );

    add_settings_field( 'plate_logo', 'Header Logo', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    
    // Know Your World Header Photo
    $field_args = array(
      'type'      => 'text',
      'id'        => 'know-your-world-header',
      'name'      => 'know-your-world-header',
      'desc'      => '<input data-category="kyw-header" class="left-float image-trigger" type="button" value="Upload Image"><p>Know Your World Archive Page Header</p>',
      'std'       => '',
      'label_for' => 'know-your-world-header',
      'class'     => ' left-float header_image kyw-header'
    );

    add_settings_field( 'know-your-world-header', 'Know Your World Header Photo', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    
        
    // Know Your World Header Logo
    $field_args = array(
      'type'      => 'text',
      'id'        => 'know-your-world-logo',
      'name'      => 'know-your-world-logo',
      'desc'      => '<input data-category="kyw-logo" class="left-float image-trigger" type="button" value="Upload Image"><p>Know Your World Archive Page Logo</p>',
      'std'       => '',
      'label_for' => 'know-your-world-logo',
      'class'     => ' left-float header_image kyw-logo'
    );

    add_settings_field( 'know-your-world-logo', 'Know Your World Header Logo', 'plate_display_setting', 'plate_theme_options.php', 'plate_text_section', $field_args );
    

// Footer Copyright
    $field_args = array(
      'type'      => 'text',
      'id'        => 'plate_footer_copy',
      'name'      => 'plate_footer_copy',
      'desc'      => 'Text for footer copyright',
      'std'       => '',
      'label_for' => 'plate_footer_copy',
      'class'     => 'css_class'
    );

    add_settings_field( 'plate_footer_copy', 'Footer Copyright', 'plate_display_setting', 'plate_theme_options.php', 'plate_contact_section', $field_args );    
  
}


/**
 * Function to add necessary scripts and styles
 */
 
add_action('admin_enqueue_scripts', 'my_admin_scripts');
 
function my_admin_scripts() {
        wp_enqueue_media();
        wp_register_script('my-admin-js',get_template_directory_uri() . '/js/plate-admin.js', array('jquery'));
        wp_enqueue_script('my-admin-js');
}

/**
 * Function to add extra text to display on each section
 */
function plate_display_section($section){ 

}

/**
 * Function to display the settings on the page
 * This is setup to be expandable by using a switch on the type variable.
 * In future you can add multiple types to be display from this function,
 * Such as checkboxes, select boxes, file upload boxes etc.
 */
function plate_display_setting($args)
{
    extract( $args );

    $option_name = 'plate_theme_options';

    $options = get_option( $option_name );

    switch ( $type ) {  
          case 'text':  
              $options[$id] = stripslashes($options[$id]);  
              $options[$id] = esc_attr( $options[$id]);  
              echo "<input class='regular-text$class' type='text' id='$id' name='" . $option_name . "[$id]' value='$options[$id]' />";  
              echo ($desc != '') ? "<br /><span class='description'>$desc</span>" : "";  
          break;  
    }
}

/**
 * Callback function to the register_settings function will pass through an input variable
 * You can then validate the values and the return variable will be the values stored in the database.
 */
function plate_validate_settings($input)
{
  foreach($input as $k => $v)
  {
    $newinput[$k] = trim($v);
    
/*
    // Check the input is a letter or a number
    if(!preg_match('/^[A-Z0-9 _]*$/i', $v)) {
      $newinput[$k] = '';
    }
*/
  }

  return $newinput;
}


?>