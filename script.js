$(document).ready(function() {
    var ans = '',
        entryExpr = '', // Current Expression
        resultExpr = '';

    $("button").click(function() {
        current = $(this).val();

        if (current == 'ce') {
            // Not empty or more than one digit
            if (entryExpr.length !== 0 && entryExpr.length > 1) {
                resultExpr = delLastChar();
                entryExpr = entryExpr.slice(0, entryExpr.length - 1);
                updateResult(resultExpr, entryExpr);
            } else {
                // Only one digit present
                updateResult("0", "0");
                reset();
            }
        } else if (current == 'ac') {
            $("#entry").html("0");
            $("#history").html("0");
            reset();
        } else if (current == '=') {
            // Subsequent pressing of =
            if (entryExpr !== ans) {
                // Check for valid expression, Ex 9+
                if (isMultipleOperator()) {
                    ans = evaluate(entryExpr);
                    // Format History for display
                    entryExpr = formatResult(entryExpr, ans);
                    updateResult(ans, entryExpr);
                    // Reset the entryExpr value
                    entryExpr = formatResult(entryExpr, ans);
                } else {
                    // Invalid Expression
                    updateResult('0', "Invalid");
                    reset();
                }
            }
        } else if (current == '0') {
            // Avoid initial multiple zeros
            if (entryExpr.length !== 0) {
                resultExpr = resultExpr + current;
                entryExpr = entryExpr + current;
                updateResult(resultExpr, entryExpr);
            }
        } else if (current == '.') {
            // First digit
            if (entryExpr.length == 0) {
                resultExpr = "0.";
                entryExpr = "0.";
                updateResult(resultExpr, entryExpr);
            } else {
                // Check for existence of '.'
                if (resultExpr.indexOf('.') == -1) {
                    // Example: 5 + 0.6
                    if (resultExpr.length === 0) {
                        resultExpr = "0";
                        entryExpr = entryExpr + "0";
                    }
                    resultExpr = resultExpr + current;
                    entryExpr = entryExpr + current;
                    updateResult(resultExpr, entryExpr);
                }
            }
        } else {
            // For '/,*,-,+,1-9'
            if (current == '+' || current == '-' || current == '*' || current == '/') {
                // Avoid initial operator and multipe operator Ex. 7++
                if (entryExpr.length !== 0 && isMultipleOperator()) {
                    entryExpr = entryExpr + current;
                    updateResult(current, entryExpr);
                    resultExpr = '';
                }
            } else {
                // If numbers pressed, then re-initialize the expression
                if (ans == entryExpr) {
                    entryExpr = '';
                }
                resultExpr = resultExpr + current;
                entryExpr = entryExpr + current
                updateResult(resultExpr, entryExpr);
            }
        }

        function formatResult(entryExpr, ans) {
            // debugger
            if (entryExpr.indexOf('=') == -1 && entryExpr.length !== 0) {
                entryExpr = entryExpr + '=' + ans;
            } else {
                // In number pressed erase the value
                // Else for operator store the value
                entryExpr = ans;
                resultExpr = '';
            }

            return entryExpr;
        }

        // Take two digit after decimal from answer
        function evaluate(expr) {
            var result = eval(expr).toString();
            if (result.indexOf('.') !== -1) {
                var idx = result.indexOf('.');
                result = result.slice(0, idx) + result.slice(idx, idx + 3);
            }
            return result;
        }

        function delLastChar() {
            if (resultExpr.length !== 0 && resultExpr.length > 1) {
                // ToDo result expression splice
                resultExpr = resultExpr.slice(0, resultExpr.length - 1);
            } else {
                resultExpr = '0';
            }
            return resultExpr;
        }

        function updateResult(entry, history) {
            // Digit limit validation
            if (resultExpr.length > 8 || ans.toString().length > 8) {
                $("#entry").html("0");
                $("#history").html("Digit Limit Reached");
                reset();
            } else {
                $("#entry").html(entry);
                $("#history").html(history);
                return;
            }
        }

        function isMultipleOperator() {
            // Get last character of expression
            operatorArr = ["+", "*", "-", "/"];
            lastChar = entryExpr[entryExpr.length - 1];
            return operatorArr.indexOf(lastChar) == -1;
        }

        // Clear all values
        function reset() {
            ans = '';
            entryExpr = '';
            current = '';
            resultExpr = '';
        }
    });
});