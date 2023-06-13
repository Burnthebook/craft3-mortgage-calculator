<?php
/**
 * Mortgage Calculator plugin for Craft CMS 3.x
 *
 * Plugin to calculate UK mortgage costs
 *
 * @link      https://www.burnthebook.co.uk/
 * @copyright Copyright (c) 2020 Jake Noble
 */

namespace burnthebook\mortgagecalculator\controllers;

use burnthebook\mortgagecalculator\MortgageCalculator;

use Craft;
use craft\web\Controller;

/**
 * Default Controller
 *
 * Generally speaking, controllers are the middlemen between the front end of
 * the CP/website and your plugin’s services. They contain action methods which
 * handle individual tasks.
 *
 * A common pattern used throughout Craft involves a controller action gathering
 * post data, saving it on a model, passing the model off to a service, and then
 * responding to the request appropriately depending on the service method’s response.
 *
 * Action methods begin with the prefix “action”, followed by a description of what
 * the method does (for example, actionSaveIngredient()).
 *
 * https://craftcms.com/docs/plugins/controllers
 *
 * @author    Jake Noble
 * @package   MortgageCalculator
 * @since     1.0.0
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected array|bool|int $allowAnonymous = ['index', 'do-something'];

    // Public Methods
    // =========================================================================

    /**
     * Handle a request going to our plugin's index action URL,
     * e.g.: actions/mortgage-calculator/default
     * @todo is this needed?
     *
     * @return mixed
     */
    public function actionIndex() : mixed
    {
        $result = 'Welcome to the DefaultController actionIndex() method';

        return $result;
    }

    /**
     * Handle a request going to our plugin's actionDoSomething URL,
     * e.g.: actions/mortgage-calculator/default/do-something
     * @todo is this needed?
     *
     * @return mixed
     */
    public function actionDoSomething() : mixed
    {
        $result = 'Welcome to the DefaultController actionDoSomething() method';

        return $result;
    }
}
