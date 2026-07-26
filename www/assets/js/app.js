/**
 * Application JavaScript
 * Uses jQuery for DOM manipulation
 */

$(function() {
    // Line counter for entry lines
    var lineCounter = 0;

    /**
     * Calculate totals for entry lines
     */
    function calculateTotals() {
        var totalDebit = 0;
        var totalCredit = 0;

        $('#entry-lines-body tr').each(function() {
            var debit = parseFloat($(this).find('.line-debit').val()) || 0;
            var credit = parseFloat($(this).find('.line-credit').val()) || 0;
            totalDebit += debit;
            totalCredit += credit;
        });

        $('#total-debit').text(totalDebit.toFixed(2));
        $('#total-credit').text(totalCredit.toFixed(2));

        var balance = totalDebit - totalCredit;
        var balanceText = balance.toFixed(2);
        var $balance = $('#balance');

        if (Math.abs(balance) <= 0.01) {
            $balance.text('Equilibre');
            $balance.removeClass('unbalanced').addClass('balanced');
        } else {
            $balance.text('Ecart: ' + balanceText);
            $balance.removeClass('balanced').addClass('unbalanced');
        }
    }

    /**
     * Add new entry line
     */
    function addEntryLine() {
        lineCounter++;
        var $template = $('#line-template').clone();
        $template.removeAttr('id');
        $template.removeClass('hidden');

        // Update field names with line number
        $template.find('[name]').each(function() {
            var name = $(this).attr('name');
            $(this).attr('name', name.replace('[]', '[' + lineCounter + ']'));
        });

        $template.find('.line-no').text(lineCounter);
        $('#entry-lines-body').append($template);

        // Focus on account select
        $template.find('.line-account').first().focus();
    }

    /**
     * Remove entry line
     */
    function removeEntryLine(btn) {
        var $row = $(btn).closest('tr');
        $row.remove();
        renumberLines();
        calculateTotals();
    }

    /**
     * Renumber lines after removal
     */
    function renumberLines() {
        var num = 1;
        $('#entry-lines-body tr').each(function() {
            $(this).find('.line-no').text(num);
            num++;
        });
    }

    // Event handlers for entry lines
    $(document).on('click', '.btn-add-line', function(e) {
        e.preventDefault();
        addEntryLine();
    });

    $(document).on('click', '.btn-remove-line', function(e) {
        e.preventDefault();
        if ($('#entry-lines-body tr').length > 1) {
            if (confirm('Supprimer cette ligne ?')) {
                removeEntryLine(this);
            }
        } else {
            alert('Une piece doit avoir au moins une ligne.');
        }
    });

    $(document).on('change', '.line-debit, .line-credit', function() {
        calculateTotals();
    });

    $(document).on('input', '.line-debit, .line-credit', function() {
        calculateTotals();
    });

    // Initialize if on entry edit page
    if ($('#entry-lines-body').length) {
        // Add first line if empty
        if ($('#entry-lines-body tr').length === 0) {
            addEntryLine();
            addEntryLine();
        } else {
            // Count existing lines
            lineCounter = $('#entry-lines-body tr').length;
        }
        calculateTotals();
    }

    /**
     * Confirm dialogs
     */
    $(document).on('click', '.confirm-action', function(e) {
        var message = $(this).data('confirm') || 'Etes-vous sur ?';
        if (!confirm(message)) {
            e.preventDefault();
            return false;
        }
    });

    /**
     * Form validation
     */
    $('form.validate').on('submit', function(e) {
        var valid = true;

        $(this).find('[required]').each(function() {
            if (!$(this).val()) {
                valid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        if (!valid) {
            e.preventDefault();
            alert('Veuillez remplir tous les champs obligatoires.');
        }

        return valid;
    });

});
