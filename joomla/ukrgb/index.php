<?php
/**
 * @package     Joomla.Site
* @subpackage  Templates.ukrgb-bsj3
*
* @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
* @license     GNU General Public License version 2 or later; see LICENSE.txt
*/

defined('_JEXEC') or die;

// Remove the default version of Bootstrap and Jquery. Append new versions in a way 
// that ensures they are the first scripts in the heade first.
unset($this->_scripts["/media/jui/js/bootstrap.min.js"]);
unset($this->_scripts["/media/jui/js/jquery.min.js"]);
$template_path = 'templates/' .$this->template; 
$script_array = array('mime' => "text/javascript",'defer' => false,'async' => false);
$template_js = array(	$template_path . "/js/jquery.min.js" => $script_array,
						$template_path . "/js/bootstrap.js" => $script_array);
$this->_scripts = $template_js + $this->_scripts;

//Getting params from template
//$params = JFactory::getApplication()->getTemplate(true)->params;

$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$this->language = $doc->language;
$sitename = $app->getCfg('sitename');

// Check for forum
$itemid   = $app->input->getCmd('Itemid', '');
//$phpbbLayout = ($itemid == $this->params->get('forumItemId') ? 'phpbb-layout' : '');

$doc->addStyleSheet('templates/'.$this->template.'/css/bootstrap.css');

$doc->addStyleSheet('media/system/css/system.css');

// Add current user information
$user = JFactory::getUser();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<jdoc:include type="head" /> 
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
	<div id="wrapper" class="container-fluid bg">
		<!-- Headder -->
		<div id="wrapper-header">
			<div id="header" class="row logo">
				<div id="logo" class="col-md-6">
					<!-- <img class="img-responsive" src="http://placehold.it/1170x100"> -->
					<img class="img-responsive" src="templates/<?php echo $this->template;?>/images/banner.jpg">
					<!--  <jdoc:include type="modules" name="logo" style="xhtml" />	-->
				</div>
				<div class="col-md-6">
					<h1>UKRGB</h1>
					<h1>The UK Rivers Guidebook</h1>
				</div>
				<!-- end logo -->
			</div>
			<!-- row headder-->

			<div id="banner" class="row banner">
				<div id="banner-left" class="col-md-6">
					<!-- <jdoc:include type="modules" name="banner-left" style="none" -->
					<img class="img-responsive" src="http://placehold.it/570x80">
				</div>
				<div id="banner-right" class="col-md-6">
					<!--<jdoc:include type="modules" name="banner-right" style="none" -->
					<img class="img-responsive" src="http://placehold.it/570x80">
				</div>
			</div>
			<!-- banner -->
		</div>

		<!-- Navigation mainmenu-->
		<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span> 
						<span class="icon-bar"></span>
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">UKRGB</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<jdoc:include type="modules" name="menu" style="none" />
					
					<form class="navbar-form navbar-right" role="search">
						<div class="form-group">
							<!-- <jdoc:include type="modules" name="search" style="none" />-->
							<!-- <input type="text" class="form-control" placeholder="Search"> -->
						</div>
					</form>
					<ul class="nav navbar-nav navbar-right">
						<li class="navbar-form"><jdoc:include type="modules" name="search" style="none" /></li>
						<!-- The drop down menu -->
          				<li class="dropdown">
          				<?php if ($user->name) {?>
          					
          					<a class="dropdown-toggle" data-toggle="dropdown" href="#"><?php echo $user->name;?><span class="caret"></span></a>
          					<ul class="dropdown-menu">						
          						<li><a href="<?php echo JRoute::_('index.php?option=com_users&task=user.logout&'. JSession::getFormToken().'=1'); ?>">Log out</a></li>
          					    <li><a href="<?php echo JRoute::_('index.php?option=com_jfusion&view=plugin&Itemid=102&jfile=ucp.php&i=pm&folder=inbox'); ?>">Private Messages</a></li>
							</ul>
          				<?php } else {?> 
          				    <a class="dropdown-toggle" data-toggle="dropdown" href="#">Sign In <span class="caret"></span></a>
          					<div class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
              					<!-- Login form here -->
								<jdoc:include type="modules" name="login" style="none" /> 
							</div>
						<?php }?>
						</li>
					</ul>
				</div>
				<!-- /.navbar-collapse -->
			</div>
			<!-- /.container-fluid -->
		</nav>

		<!--  breadcrumb -->
		<div id="breadcrumb" class="row">
			<div id="breadcrumb-wrapper" class="col-md-12">
				<jdoc:include type="modules" name="breadcrumb" style="none" />
			</div>
			<!-- end breadcrumb-wrapper -->
		</div>
		<!-- row breadcrumb-->

		<!-- Content -->
		<div id="main" class="row">

			<main id="content" class="col-md-9 ">
			<div class="pad-main">
				<jdoc:include type="message" />
				<jdoc:include type="component" />
			</div>
			</main>
			<div id="aside" class="col-md-3">
				<div class="pad-aside">
					<jdoc:include type="modules" name="aside" style="well" />
				</div>
			</div>

		</div>
		<!-- main -->

		<!-- Footer -->
		<footer class="footer" role="contentinfo">
			<div class="container-fluid">
				<!-- <hr /> -->
				<jdoc:include type="modules" name="footer" style="none" />
				<p class="pull-right">
					<a href="#top" id="back-top"><?php echo JText::_('TPL_UKRGB_BACKTOTOP'); ?></a>
				</p>
				<p>&copy; <?php echo $sitename; ?> <?php echo date('Y');?></p>
			</div>
		</footer>
		<jdoc:include type="modules" name="debug" style="none" />
	</div>
	<!-- wrapper -->
</body>
</html>
