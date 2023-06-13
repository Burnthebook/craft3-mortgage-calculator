<?php
/**
 * Mortgage Calculator plugin for Craft CMS 3.x
 *
 * Plugin to calculate UK mortgage costs
 *
 * @link      https://www.burnthebook.co.uk/
 * @copyright Copyright (c) 2020 Jake Noble
 */

namespace burnthebook\mortgagecalculator\models;

use burnthebook\mortgagecalculator\MortgageCalculator;

use Craft;
use craft\base\Model;
use yii\behaviors\AttributeTypecastBehavior;

/**
 * MortgageCalculator Settings Model
 *
 * This is a model used to define the plugin's settings.
 *
 * Models are containers for data. Just about every time information is passed
 * between services, controllers, and templates in Craft, it’s passed via a model.
 *
 * https://craftcms.com/docs/plugins/models
 *
 * @author    Jake Noble
 * @package   MortgageCalculator
 * @since     1.0.0
 */
class Settings extends Model
{
	// Public Properties
	// =========================================================================

	public $stampDuty = [];

	public $stampDutySettings = [];

	// Public Methods
	// =========================================================================

	/**
	 * Returns the validation rules for attributes.
	 *
	 * Validation rules are used by [[validate()]] to check if attribute values are valid.
	 * Child classes may override this method to declare different validation rules.
	 *
	 * More info: http://www.yiiframework.com/doc-2.0/guide-input-validation.html
	 *
	 * @return array
	 */
	public function rules()
	{
		return [];
//		return [
//			['stampDuty', 'string'],
//			['stampDutySettings', 'string']
//		];

//        return [
//            ['someAttribute', 'string'],
//            ['someAttribute', 'default', 'value' => 'Some Default'],
//        ];
	}
}
