<?php
	
/**
 * Theme Option Page Example
 */
function GFA_theme_menu()
{
  add_theme_page( 'Theme Option', 'GFA Options', 'manage_options', 'GFA_theme_options.php', 'GFA_theme_page');  
}
add_action('admin_menu', 'GFA_theme_menu');

/**
 * Callback function to the add_theme_page
 * Will display the theme options page
 */ 
function GFA_theme_page()
{
?>
    <div class="section panel">
      <h1>Custom Theme Options</h1>
      <form method="post" enctype="multipart/form-data" action="options.php" id="admin-options">
        <?php 
          settings_fields('GFA_theme_options'); 
        
          do_settings_sections('GFA_theme_options.php');
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
add_action( 'admin_init', 'GFA_register_settings' );

/**
 * Function to register the settings
 */
function GFA_register_settings()
{
    // Register the settings with Validation callback
    register_setting( 'GFA_theme_options', 'GFA_theme_options', 'GFA_validate_settings' );

    // Add settings section
    add_settings_section( 'GFA_contact_section', 'Contact Information', 'GFA_display_section', 'GFA_theme_options.php' );
    add_settings_section( 'GFA_text_section', 'Social Links', 'GFA_display_section', 'GFA_theme_options.php' );

    
    
    // Create About Title field for Footer
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_fabout_title',
      'name'      => 'GFA_fabout_title',
      'desc'      => 'Footer About Title',
      'std'       => '',
      'label_for' => 'GFA_fabout_title',
      'class'     => 'css_class'
    );

    add_settings_field( 'GFA_fabout_title', 'Footer About Title', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_contact_section', $field_args );
    
     // Create About field for footer
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_fabout_text',
      'name'      => 'GFA_fabout_text',
      'desc'      => 'About paragraph for footer',
      'std'       => '',
      'label_for' => 'GFA_fabout_text',
      'class'     => 'css_class'
    );

    add_settings_field( 'GFA_fabout_text', 'About Text', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_contact_section', $field_args );
    
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

    add_settings_field( 'kyw_purchase', 'Know Your World Link', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_contact_section', $field_args );
    
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

    add_settings_field( 'kyw_purchase_text', 'Know Your World Purchase Text', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_contact_section', $field_args );

    
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_facebook',
      'name'      => 'GFA_facebook',
      'desc'      => 'Facebook Social Link',
      'std'       => '',
      'label_for' => 'GFA_facebook',
      'class'     => 'css_class'
    );

    add_settings_field( 'facebook_link', 'Facebook Link', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_instagram',
      'name'      => 'GFA_instagram',
      'desc'      => 'Instagram Link',
      'std'       => '',
      'label_for' => 'GFA_instagram',
      'class'     => 'css_class'
    );

    add_settings_field( 'insta_link', 'Instagram Link', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    
    
    // Create textbox field
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_twitter',
      'name'      => 'GFA_twitter',
      'desc'      => 'twitter Social Link',
      'std'       => '',
      'label_for' => 'GFA_twitter',
      'class'     => 'css_class'
    );

    add_settings_field( 'twitter_link', 'twitter Link', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    
    
	// Search Header Image Upload
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_logo',
      'name'      => 'GFA_logo',
      'desc'      => '<input data-category="GFA_logo" class="left-float image-trigger" type="button" value="Upload Image"><p>Company Logo for Site Header</p>',
      'std'       => '',
      'label_for' => 'GFA_logo',
      'class'     => ' left-float header_image GFA_logo'
    );

    add_settings_field( 'GFA_logo', 'Header Logo', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    
    // Alternate Header Logo Color
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_logo_alt1',
      'name'      => 'GFA_logo_alt1',
      'desc'      => '<input data-category="gfa-alt" class="left-float image-trigger" type="button" value="Upload Image"><p>Alternate Header Logo</p>',
      'std'       => '',
      'label_for' => 'know-your-world-header',
      'class'     => ' left-float header_image gfa-alt'
    );

    add_settings_field( 'GFA_logo_alt1', 'Header Logo - Alternate 1', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    
        
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

    add_settings_field( 'know-your-world-logo', 'Know Your World Header Logo', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_text_section', $field_args );
    

// Footer Copyright
    $field_args = array(
      'type'      => 'text',
      'id'        => 'GFA_footer_copy',
      'name'      => 'GFA_footer_copy',
      'desc'      => 'Text for footer copyright',
      'std'       => '',
      'label_for' => 'GFA_footer_copy',
      'class'     => 'css_class'
    );

    add_settings_field( 'GFA_footer_copy', 'Footer Copyright', 'GFA_display_setting', 'GFA_theme_options.php', 'GFA_contact_section', $field_args );    
  
}


/**
 * Function to add necessary scripts and styles
 */
 
add_action('admin_enqueue_scripts', 'my_admin_scripts');
 
function my_admin_scripts() {
        wp_enqueue_media();
        wp_register_script('my-admin-js',get_template_directory_uri() . '/js/GFA-admin.js', array('jquery'));
        wp_enqueue_script('my-admin-js');
}

/**
 * Function to add extra text to display on each section
 */
function GFA_display_section($section){ 

}

/**
 * Function to display the settings on the page
 * This is setup to be expandable by using a switch on the type variable.
 * In future you can add multiple types to be display from this function,
 * Such as checkboxes, select boxes, file upload boxes etc.
 */
function GFA_display_setting($args)
{
    extract( $args );

    $option_name = 'GFA_theme_options';

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
function GFA_validate_settings($input)
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