

    function getStampDuty(price) {

        let origPrice = price;
        let location = 'ENG';
        let property = 'first';

        let first = $('#firstTimeBuyer').val() === 'yes' ? '1' : '0';

//no stamp duty to pay ...yet
        let payable = 0;
        let difference = 0;

        $.each(rates, function (i) {


            if (rates[i]['location'] == location && rates[i]['property'] == first) {

// at this point we only have rates that match the location

                bracketMin = parseInt(rates[i]['bracketMin']);
                bracketMax = parseInt(rates[i]['bracketMax']);

                if (isNaN(bracketMax)) {
                    bracketMax = 'e';
                }


                if (origPrice > bracketMin) {


                    if (bracketMax === 'e' || origPrice <= bracketMax) {
                        bracketMax = bracketMin + price;
                    }

                    difference = bracketMax - bracketMin;

                    payable += (difference / 100) * rates[i][property];
                    price = price - difference;

                }

            }

        });

        return payable;

    }

    function getMonthlyRepayment(loan, interest, term) {

// Monthly payment = Loan[rate(1 + rate)^months]/[(1 + rate)^months - 1]
        let rate = (interest / 100) / 12;
        let months = term * 12;
        let monthlyRepayment = loan * ((rate * Math.pow(rate + 1, months)) / (Math.pow(rate + 1, months) - 1));

        return monthlyRepayment.toFixed(2);
    }

    //not money laundering
    function cleanseMoney(x) {
        return parseInt(x.replace(/\D/g, ''));
    }

    function calculate(data) {

        let type = data[0]['value']; //may be unused but keep for now
        let price = cleanseMoney(data[1]['value']);
        let requestPrice = cleanseMoney(data[1]['value']); //request price is to remain untouched by affordance logic
        let income = cleanseMoney(data[2]['value']);
        let deposit = cleanseMoney(data[3]['value']);
        let interest = data[4]['value'].replace(/[^0-9.]/g, "");
        let term = data[5]['value'].replace(/[^0-9.]/g, "");

//mortgage potential
        let affordance = (income * 4.5) + deposit;

        if (affordance < price) {
//lets be realistic here
            price = affordance;
        }

//calculate how much the bank would have to pay
        let loan = price - deposit;
        let ltv = (loan / price) * 100;

        if (ltv > 95 && type !== 'remortgage') {
            affordance = false;
        }

//if the user doesn't know their interest rate, lets assume one
        if (interest === '') {
            interest = ltv <= 90 ? 2.5 : 4;
        }

        if (term === '' || !$.isNumeric(term)) {
            term = 25;
        }

        if (term > 40) {
            term = 40;
        }

        if (term < 5) {
            term = 5;
        }

//final output
        let result = {
            affordance: affordance,
            requestPrice: requestPrice,
            price: price,
            loan: loan,
            deposit: deposit,
            stampDuty: getStampDuty(price),
            monthlyRepayments: getMonthlyRepayment(loan, interest, term),
            interest: interest,
            term: term,
            ltv: ltv
        };

        console.dir(result);

        return result;
    }

    $('#affordabilityCalculator').submit(function () {

//get initial form input
        var data = calculate($(this).serializeArray());

//if user matches mortgage criteria
        if (data && data['affordance'] !== false && !isNaN(data['affordance']) && !isNaN(data['loan'])) {
            $('#products').removeClass('hide');

            if (!$('#no-products').hasClass('hide')) {
                $('#no-products').addClass('hide');
            }

            $('#affordance').html('£' + money(data['affordance']));

//$('#property-price').html('For a property worth £' + money(data['price']) + ', we can find you a mortgage with these terms');

            $('#loan-amount').html('£' + money(data['loan']));
            $('#deposit').html('£' + money(data['deposit']));
            $('#stamp-duty').html('£' + money(data['stampDuty'].toFixed(2)));
            $('#monthly-payments').html('£' + money(data['monthlyRepayments']));
            $('.calc-data-years').html(data['term']);
            $('#m-calc-term').val(data['term']);

            $('#m-calc-interest').val(data['interest']);
            $('#interest-assumption').html('We have assumed an interest rate of ' + data['interest'] + '% based on your affordability over a term of ' + data['term'] + ' years');

            $('#calc-result').fadeIn("slow", function () {
// Fade animation complete
                $(this).removeClass("calc-result--hide");
                if (!$('.calc-result-filler__content').hasClass('hide')) {
                    $('.calc-result-filler__content').addClass('hide');
                }

            });
        } else {
//if user wants remortgage
            if (data == false) {
                $('#no-products').html('Please call us for a tailored quote for your needs');
            }

            $('#no-products').removeClass('hide');

            if (!$('#products').hasClass('hide')) {
                $('#products').addClass('hide');
            }
        }


        return false;

    });

    $('.calc-option').click(function () {

        let ftb = $("#calc-ftb");
        let deposit = $("#calc-deposit");
        let remortgageNote = $("#calc-remortgage-note");
        let depositBlock = $("#result-block-deposit");
        let stampDutyBlock = $("#result-block-stamp-duty");

        let mode = $(this).is("#calc-option-2") ? 'remortgage' : 'purchase';

        switch (mode) {
            case 'purchase':
                ftb.show();
                deposit.find("input[type=text]").val('');
                deposit.show();
                remortgageNote.hide();
                depositBlock.show();
                stampDutyBlock.show();
                break;
            case 'remortgage':
                ftb.hide();
                deposit.hide();
                deposit.find("input[type=text]").val(0);
                ftb.find("input[type=checkbox]").prop("checked", false);
                remortgageNote.show();
                depositBlock.hide();
                stampDutyBlock.hide();
                break;
        }

        updateLabels(mode);

        $('#products').addClass('hide');
        $('#no-products').addClass('hide');
        $('.calc-result-filler__content').removeClass('hide');
    });

    function updateLabels(mode) {
        let labels = {
            'propertyValue': {
                'purchase': 'Property value: ',
                'remortgage': 'Total borrowing: '
            },
            'propertyValueTooltip': {
                'purchase': 'This is the purchase price of the property',
                'remortgage': 'This is the amount of your outstanding mortgage + additional amount you would like to borrow'
            },
            'affordanceMessage': {
                'purchase': 'We think you can afford a property worth up to:',
                'remortgage': 'We think you can remortgage for a maximum of:'
            },
            'mortgageAmount': {
                'purchase': 'Mortgage Amount: ',
                'remortgage': 'Remortgage Amount: '
            }
        };

        $("[data-labels]").each(function () {
            $(this).html(labels[$(this).attr("data-labels")][mode]);
        });

        $("[data-title-labels]").each(function () {
            let textValue = labels[$(this).attr("data-title-labels")][mode];
            let tooltipId = $(this).attr('aria-describedby');
            if (typeof tooltipId !== typeof undefined && tooltipId !== false) {
                $("#" + tooltipId).html(textValue);
            } else {
                $(this).attr("title", textValue);
            }
        });
    }

    updateLabels('purchase');

    function traverseRates(data) {

        window.rates = data;

        return false;
    }

    //fancy regex... it just prettifies numbers( input = 100000, output = 100,000)
    function money(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //call money() on input fields for UX reasons
    function prettifyMoney(input) {

        var x = input.value.replace(/\D/g, '');
        var result = money(x);

        $(input).val('£' + result);

    }

    function cleanseMoney(x) {
        return parseInt(x.replace(/\D/g, ''));
    }

    $('#stampDutyData').submit(function () {

        let data = $(this).serializeArray();

// console.dir(data);

        let origPrice = cleanseMoney(data[0]['value']);
        let price = cleanseMoney(data[0]['value']);
        let location = data[1]['value'];
        let property = data[2]['value'];
        let first = $('#firstTimeBuyer').val() === 'yes' ? '1' : '0'; //is this the first property purchase?

// if original price is greater than £625,000 and the location is ENG the first time buyer discounts do not apply anymore.
// DMS13599-7
        if ((origPrice > 625000) && (location == "ENG")) {
            $("#calc-toggle-ftb-yes").removeClass("calc-toggle--selected");
            $("#calc-toggle-ftb-no").addClass("calc-toggle--selected");
            $('#ftbDiscountToolTip').removeClass("hide");
            first = 0;
        }

//no stamp duty to pay ...yet
        let payable = 0;
        let difference = 0;
        let totalCost = 0;
        let payableInBracket = 0;

        let html = '<div class="row">';

        $.each(rates, function (i) {
            if (rates[i]['location'] == location && rates[i]['property'] == first) {
                // at this point we only have rates that match the location

                bracketMin = parseInt(rates[i]['bracketMin']);
                bracketMax = parseInt(rates[i]['bracketMax']);

                if (isNaN(bracketMax)) {
                    bracketMax = 'e';
                }

                if (origPrice > bracketMin) {

                    if (bracketMax === 'e' || origPrice <= bracketMax) {
                        bracketMax = bracketMin + price;
                    }

                    difference = bracketMax - bracketMin;

                    payableInBracket = (difference / 100) * rates[i][property];

                    html += '<div class="row calc-result__bracket">';
                    html += '<p class="columns small-8 medium-9">You pay ' + rates[i][property] + '% up to £' + money(bracketMax) + '</p>';
                    html += '<p class="columns small-4 medium-3 calc-result__bracket-right">£' + money(payableInBracket.toFixed(2)) + '</p>';
                    html += '</div><!-- row -->';

                    payable += (difference / 100) * rates[i][property];
                    price = price - difference;

                    totalCost = origPrice + payable;

                }
            }
        });

        html += '';

        $('#stampDutyPayable').html('£' + money(payable.toFixed(2)));
        $('#stampDutyBrackets').html(html);
        $('#totalCost').html('£' + money(totalCost.toFixed(2)));

        $('#calc-result-filler').fadeOut("fast", function () {
            // Fade animation complete
            $(this).addClass("calc-result-filler--hide");

            $('#calc-result').fadeIn("fast", function () {
                // Fade animation complete
                $(this).removeClass("calc-result--hide");
            });
        });

        return false;
    });
