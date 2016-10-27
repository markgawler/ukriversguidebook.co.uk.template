<?php
/**
 * @package     Joomla.Site
* @subpackage  Templates.ukrgb-bsj3
*
* @copyright   Copyright (C) 2005 - 2013 Open Source Matters, Inc. All rights reserved.
* @license     GNU General Public License version 2 or later; see LICENSE.txt
*/
defined ( '_JEXEC' ) or die ();

$app = JFactory::getApplication ();
$doc = JFactory::getDocument ();
$this->language = $doc->language;
$sitename = $app->getCfg ( 'sitename' );

// Check for forum
$itemid = $app->input->getCmd ( 'Itemid', '' );
$phpbbPage = ($itemid == $this->params->get('forumItemId'));

$doc->addStyleSheet ( 'templates/' . $this->template . '/css/template.min.css' );

// Add JavaScript Frameworks
JHtml::_ ( 'bootstrap.framework' );

// Add current user information
$user = JFactory::getUser ();

$fluid = '-fluid';

$desktop = False;
$mobile = False;
$asside = False;
$dev_type ="Other";
if (isset($_SERVER['HTTP_CLOUDFRONT_IS_DESKTOP_VIEWER'])){
	if ($_SERVER['HTTP_CLOUDFRONT_IS_DESKTOP_VIEWER']=='true')
	{
		$dev_type ="Desktop";
		$desktop = True;
		$asside = True;
		
	}
	else if ($_SERVER['HTTP_CLOUDFRONT_IS_TABLET_VIEWER']=='true')
	{
		$dev_type ="Tablet";
		
	}
	else if ($_SERVER['HTTP_CLOUDFRONT_IS_MOBILE_VIEWER']=='true')
	{
		$dev_type ="Mobile";
		$mobile = True;
	}
}
//echo $dev_type;
$phpbbLayout = '';
if ($phpbbPage){
	$phpbbLayout = 'phpbb-layout';
}


if ($this->countModules( 'aside' ) == 0){
	$asside = False;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<jdoc:include type="head" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Google --> 
<script>
  if (window != top) top.location.href = location.href;

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
  ga('create', 'UA-26908210-1', 'auto');
  ga('require', 'displayfeatures');
  ga('set', '&uid', '<?php echo $user->id; ?>'); 
  ga('send', 'pageview');

</script>	
</head>

<body>

<!-- Headder -->
	<div id="wrap-headder" class="container<?php echo ($fluid);?> <?php echo($phpbbLayout); ?> bg">
		<div id="header" class="row<?php echo ($fluid); ?> logo">
			<div class="span6">
				<img class="img-responsive"	src="templates/<?php echo $this->template;?>/images/banner.jpg">
			</div>
			<div class="span6">
				<h1>UKRGB</h1>
				<h1>The UK Rivers Guidebook</h1>
			</div>
			<!-- end logo -->
		</div>
		
		<div id="banner" class="row<?php echo ($fluid); ?> banner">	
			<div id="banner-left" class="<?php echo $mobile ? 'span12' : 'span6'; ?> ">
				<jdoc:include type="modules" name="banner-left" style="none" />
			</div>
			<?php if (!$mobile) :?>
				<div id="banner-right" class="banner-right span6">
					<jdoc:include type="modules" name="banner-right" style="none" />
				</div>
			<?php endif;?>
		</div>
	</div>

	<!-- Body -->
	<div id="wrap-body" class="container<?php echo ($fluid); ?> bg wrap-body <?php echo($phpbbLayout); ?>">
		<!-- Navigation mainmenu-->
		<nav class="navbar navbar-inverse" role="navigation">
			<div class="navbar-inner">
				<div class="container-fluid">
					<button type="button" class="btn btn-navbar" data-toggle="collapse"
						data-target=".nav-collapse">
						<span class="hidden">Toggle navigation</span> 
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span> 
						<span class="icon-bar"></span>
					</button>
					<ul class="nav pull-right navbar-nav menu collapse-show ">
						<?php if (!$user->name) {
							$collapsehide = "collapse-hide"; ?>
							<li><a href="<?php echo JRoute::_('forum/ucp.php?mode=login'); ?>"><i class="icon-switch"></i> Sign In</a></li>
						<?php } else {
							$collapsehide = ""; ?>
	          			<?php }?>					
					</ul>
					<a class="brand" href="/">UKRGB</a>


					<!-- Collect the nav links, forms, and other content for toggling -->
					<!--<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> -->
					<div class="nav-collapse collapse">
						<jdoc:include type="modules" name="menu" style="none" />
						<ul class="nav pull-right <?php echo $collapsehide; ?>">
							<!-- The drop down menu -->
							<li class="dropdown">
	          				<?php if ($user->name) {?>
	          					
	          					<a class="dropdown-toggle" data-toggle="dropdown"
								href="#"><?php echo $user->name;?><span class="caret"></span></a>
								<ul class="dropdown-menu">
								
									<li><a href="<?php echo JRoute::_('/forum/ucp.php'); ?>"><i class="icon-cog"></i> User Control Panel</a></li>
									<li><a href="<?php echo JRoute::_('index.php?option=com_users&lang=en&layout=edit&view=profile'); ?>"><i class="icon-user"></i> User Profile</a></li>
									<li><a href="<?php echo JRoute::_('/forum/ucp.php?i=ucp_pm'); ?>"><i class="icon-mail"></i> Private Messages</a></li>
									<li class="divider"></li>
									<li><a href="<?php echo JRoute::_('index.php?option=com_users&task=user.logout&'. JSession::getFormToken().'=1'); ?>"><i class="icon-switch"></i> Log out</a></li>
								</ul>
	          				<?php } else {?> 
	          				    <a class="dropdown-toggle" data-toggle="dropdown"
								href="#"><i class="icon-switch"></i> Sign In <span class="caret"></span></a>
								<div class="dropdown-menu"
									style="padding: 15px; padding-bottom: 0px;">
									<!-- Login form here -->
									<jdoc:include type="modules" name="login" style="none" />
								</div>
							<?php }?>
							</li>
						</ul>
					</div>
				</div>
			</div>
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

			<main id="content" class=<?php echo $asside ? 'span9' : 'span12'; ?>>
			<div class="pad-main">
				<jdoc:include type="message" />
				<jdoc:include type="component" />
			</div>
			</main>
			<?php if ($asside) : ?>
				<div id="aside" class="span3">
					<jdoc:include type="modules" name="aside" style="well" />
				</div>
			<?php endif;?>


		</div>
		<!-- main -->

	</div>
	<!-- Footer -->
	<footer class="footer container<?php echo ($fluid); ?> <?php echo($phpbbLayout); ?> " role="contentinfo">
		<div>
			<!-- <hr /> -->
			<jdoc:include type="modules" name="footer" style="none" />
			<p class="pull-right">
				<a href="#top" id="back-top"><?php echo JText::_('TPL_UKRGB_BACKTOTOP'); ?></a>
			</p>
			<p>&copy; <?php echo $sitename; ?> <?php echo date('Y');?></p>
		</div>
	</footer>
	<jdoc:include type="modules" name="debug" style="none" />


<script type="text/javascript" src="//s.skimresources.com/js/71630X1520410.skimlinks.js"></script>

</body>
</html>
