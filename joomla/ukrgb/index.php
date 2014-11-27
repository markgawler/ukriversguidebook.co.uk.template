<?php
/**
 * @package     Joomla.Site
* @subpackage  Templates.ukrgb-bsj3
*
* @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
* @license     GNU General Public License version 2 or later; see LICENSE.txt
*/

defined('_JEXEC') or die;

//Getting params from template
//$params = JFactory::getApplication()->getTemplate(true)->params;

$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$this->language = $doc->language;
$sitename = $app->getCfg('sitename');

// Check for forum
$itemid   = $app->input->getCmd('Itemid', '');
//$phpbbLayout = ($itemid == $this->params->get('forumItemId') ? 'phpbb-layout' : '');

$doc->addStyleSheet('templates/'.$this->template.'/css/template.css');

//$doc->addStyleSheet('media/system/css/system.css');

// Add JavaScript Frameworks
JHtml::_('bootstrap.framework');

// Add current user information
$user = JFactory::getUser();

$fluid = '-fluid';
//$fluid = '';

?>

<!DOCTYPE html>
<html lang="en">
<head>
<jdoc:include type="head" />
<meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>
	<div id="wrapper" class="container<?php echo ($fluid); ?> bg">
		<!-- Headder -->
		<div id="wrapper-header ">
			<div id="header" class="row<?php echo ($fluid); ?> logo">
				<div class="span6">
					<!-- <img class="img-responsive" src="http://placehold.it/1170x100"> -->
					<img class="img-responsive"
						src="templates/<?php echo $this->template;?>/images/banner.jpg">
					<!--  <jdoc:include type="modules" name="logo" style="xhtml" />	-->
				</div>
				<div class="span6">
					<h1>UKRGB</h1>
					<h1>The UK Rivers Guidebook</h1>
				</div>
				<!-- end logo -->
			</div>
		</div>
		<div id="banner" class="row<?php echo ($fluid); ?> banner">
			<div id="banner-left" class="span6">
				<img class="img-responsive" src="http://placehold.it/570x80">
			</div>
			<div id="banner-right" class="span6">
				<img class="img-responsive" src="http://placehold.it/570x80">
			</div>
		</div>	
		

		<!-- Navigation mainmenu-->
		<nav class="navbar" role="navigation">
			<div class="navbar-inner">
				<div class="container-fluid">
					<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
						<span class="sr-only">Toggle navigation</span> 
						<span class="icon-bar"></span>
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span>
					</button>
					<a class="brand" href="#">UKRGB</a>
		
	
					<!-- Collect the nav links, forms, and other content for toggling -->
					<!--<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> -->
					<div class="nav-collapse collapse">
						<jdoc:include type="modules" name="menu" style="none" />
						
						<!-- <form class="navbar-form navbar-right" role="search">-->
						<!-- 	<div class="form-group">-->
								<!-- <jdoc:include type="modules" name="search" style="none" />-->
								<!-- <input type="text" class="form-control" placeholder="Search"> -->
						<!-- 	</div>-->
						<!-- </form>-->
						<ul class="nav pull-right">
								<!-- <li class="navbar-form"><jdoc:include type="modules" name="search" style="none" /></li>-->
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
			</div>
			<!-- /.container-fluid -->
		</nav>

		<!--  breadcrumb -->
		<div id="breadcrumb" class="row<?php echo ($fluid); ?>">
			<div id="breadcrumb-wrapper" class="span12">
				<jdoc:include type="modules" name="breadcrumb" style="none" />
			</div>
			<!-- end breadcrumb-wrapper -->
		</div>
		


		<!-- Content -->

		<div class="row<?php echo ($fluid); ?>">

			<main id="content" class="span9 ">
			<div class="pad-main">
				<!-- 					<jdoc:include type="message" /> -->
				<jdoc:include type="component" />
			</div>
			</main>
			<div id="aside" class="span3">
				<!--				<div class="pad-aside">-->
				<jdoc:include type="modules" name="aside" style="well" />
				<!--				</div>-->
			</div>


		</div>
		<!-- main -->
	</div>
	<!-- Footer -->
	<footer class="footer" role="contentinfo">
		<div class="container<?php echo ($fluid); ?>">
			<!-- <hr /> -->
			<jdoc:include type="modules" name="footer" style="none" />
			<p class="pull-right">
				<a href="#top" id="back-top"><?php echo JText::_('TPL_UKRGB_BACKTOTOP'); ?></a>
			</p>
			<p>&copy; <?php echo $sitename; ?> <?php echo date('Y');?></p>
		</div>
	</footer>
	<jdoc:include type="modules" name="debug" style="none" />

</body>
</html>
