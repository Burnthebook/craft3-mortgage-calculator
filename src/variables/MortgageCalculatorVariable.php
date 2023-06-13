<?php
/**
 * Mortgage Calculator plugin for Craft CMS 3.x
 *
 * Plugin to calculate UK mortgage costs
 *
 * @link      https://www.burnthebook.co.uk/
 * @copyright Copyright (c) 2020 Jake Noble
 */

namespace burnthebook\mortgagecalculator\variables;

use burnthebook\mortgagecalculator\MortgageCalculator;

use Craft;
use craft\base\Plugin;
use craft\web\View;

/**
 * Mortgage Calculator Variable
 *
 * Craft allows plugins to provide their own template variables, accessible from
 * the {{ craft }} global variable (e.g. {{ craft.mortgageCalculator }}).
 *
 * https://craftcms.com/docs/plugins/variables
 *
 * @author    Jake Noble
 * @package   MortgageCalculator
 * @since     1.0.0
 */
class MortgageCalculatorVariable
{
	// Public Methods
	// =========================================================================

	/**
	 * @param string $type
	 * @return array
	 */
	public function calculator($type = 'stampDuty')
	{
		$settings = array();
		$settings[$type] = MortgageCalculator::getInstance()->getSettings();

		return $settings;
	}

	/**
	 * @param string $type
	 * @return string
	 * @throws \Twig\Error\LoaderError
	 * @throws \Twig\Error\RuntimeError
	 * @throws \Twig\Error\SyntaxError
	 * @throws \yii\base\Exception
	 */
	public function render($type = 'stampDuty')
	{
		$view = Craft::$app->getView();

		$oldTemplatesPath = $view->getTemplatesPath();

		switch ($type) {
			case 'stampDuty':
				$view->setTemplatesPath(MortgageCalculator::getInstance()->getBasePath());
				$html = Craft::$app->view->renderTemplate('templates/stampDuty.twig');
				$view->setTemplatesPath($oldTemplatesPath);
				break;
			case 'affordability':
				$view->setTemplatesPath(MortgageCalculator::getInstance()->getBasePath());
				$html = Craft::$app->view->renderTemplate('templates/affordability.twig');
				$view->setTemplatesPath($oldTemplatesPath);
				break;
			default:
				return '<!-- UNKNOWN TYPE (' . $type . ') -->';
				break;
		}

		return $html;
	}
}
