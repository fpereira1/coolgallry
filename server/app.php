<?php

if(!is_file('config.php')) user_error(sprintf("config.php file not found in %s", dirname(__FILE__)));

require 'config.php';
require '../vendor/autoload.php';

$app = new \Slim\Slim(array(
	'mode' => 'development',
	'cookies.secure' => true,
	'cookies.httponly' => true
));

$app->response->headers->set('Content-Type', 'application/json');

// Define a HTTP GET route:
$app->get('/photos', function() use($app) {

    $data = array(
		array('file' => 'blob_bgzbtt.png'),
		array('file' => 'blob_hzraa3.png'),
		array('file' => 'http_peartree_me_themes_default_images_weddingphotos_WEB-Lara-Fliype-wedding-016_zlsc5e.png'),
		array('file' => 'http_peartree_me_themes_default_images_weddingphotos_WEB-Lara-Fliype-wedding-009_wuhfwd.png')
	);

	echo json_encode($data);
});

// Run the Slim application:
$app->run();