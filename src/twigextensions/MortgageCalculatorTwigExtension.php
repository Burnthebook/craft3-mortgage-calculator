<?php
/**
 * Mortgage Calculator plugin for Craft CMS 3.x
 *
 * Plugin to calculate UK mortgage costs
 *
 * @link      https://www.burnthebook.co.uk/
 * @copyright Copyright (c) 2020 Jake Noble
 */

namespace burnthebook\mortgagecalculator\twigextensions;

use burnthebook\mortgagecalculator\MortgageCalculator;

use Craft;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Jake Noble
 * @package   MortgageCalculator
 * @since     1.0.0
 */
class MortgageCalculatorTwigExtension extends AbstractExtension
{
    // Public Methods
    // =========================================================================

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName() : string
    {
        return 'MortgageCalculator';
    }

    /**
     * Returns an array of Twig filters, used in Twig templates via:
     *
     *      {{ 'something' | someFilter }}
     *
     * @todo is this needed?
     * @return array
     */
    public function getFilters() : array
    {
        return [
            new TwigFilter('someFilter', [$this, 'someInternalFunction']),
        ];
    }

    /**
     * Returns an array of Twig functions, used in Twig templates via:
     *
     *      {% set this = someFunction('something') %}
     *
     * @todo is this needed?
     * @return array
     */
    public function getFunctions() : array
    {
        return [
            new TwigFunction('someFunction', [$this, 'someInternalFunction']),
        ];
    }

    /**
     * Our function called via Twig; it can do anything you want
     *
     * @param null $text
     *
     * @todo is this needed?
     * @return string
     */
    public function someInternalFunction($text = null) : string
    {
        $result = $text . " in the way";

        return $result;
    }
}
