<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_content
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

require_once JPATH_ROOT .'/components/com_ukrgb/helpers/riverguides.php';

//JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');


$is_riverguide = RiverguideHelper::is_riverguide_category($this->category->id);
if ($is_riverguide)
{
	// use default layout for non riverguides.
	include(__DIR__ . '/riverguide_articles.php');
}
else
{
	include(__DIR__ . '/common_articles.php');
}
