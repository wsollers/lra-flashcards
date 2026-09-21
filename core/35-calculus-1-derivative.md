# 35 Calculus 1 Derivative

Calc 1 cards for derivatives: difference quotients, derivatives as limits,
tangent lines, derivative existence, early derivative theorems, graph behavior,
concavity, applications, and notation.

## A. Big Picture

What is a derivative? >> The derivative measures the instantaneous rate of change of a function.

What does `f'(a)` mean? >> The derivative of `f` at `x = a`, or the instantaneous rate of change at `a`.

What does the derivative represent geometrically? >> The slope of the tangent line to the graph at a point.

What does the derivative represent physically for position? >> Instantaneous velocity.

What does the derivative represent physically for velocity? >> Instantaneous acceleration.

What is the main idea behind a derivative? >> Start with slopes of secant lines, then take a limit as the two points come together.

What is the difference between average rate of change and instantaneous rate of change? >> Average rate uses two separated points; instantaneous rate is the limiting rate at one point.

What does `dy/dx` suggest? >> A rate of change of `y` with respect to `x`.

What does `d/dx [f(x)]` mean? >> Differentiate the function `f(x)` with respect to `x`.

What is a derivative function? >> A function `f'` that gives the derivative value at each point where the derivative exists.

## B. Secant Lines And Tangent Lines

What is a secant line? >> A line through two points on a curve.

What is the slope of the secant line through `(a, f(a))` and `(b, f(b))`? >> `(f(b) - f(a)) / (b - a)`.

What is a tangent line? >> The line that best matches the curve's direction at a single point.

How is a tangent line related to secant lines? >> It is the limiting position of secant lines as the second point approaches the first point.

What is the slope of the tangent line at `x = a`? >> `f'(a)`, if the derivative exists.

What is the equation of a tangent line at `x = a`? >> `y - f(a) = f'(a)(x - a)`.

What do you need to write a tangent line equation? >> The point `(a, f(a))` and the slope `f'(a)`.

What is a normal line? >> A line perpendicular to the tangent line at a point.

If the tangent slope is `m`, what is the normal slope? >> `-1/m`, if `m` is nonzero.

What does a horizontal tangent mean? >> The derivative is `0` at that point.

## C. Difference Quotients

What is the difference quotient based at `a`? >> `(f(a+h) - f(a)) / h`.

What does `h` represent in the difference quotient? >> The horizontal change from `a` to `a+h`.

Why must `h ≠ 0` in the difference quotient? >> Because the quotient divides by `h`.

What does the difference quotient calculate before taking a limit? >> The slope of a secant line.

What happens to the second point as `h → 0`? >> The point `a+h` moves toward `a`.

What is a common first step when simplifying a difference quotient? >> Expand `f(a+h)`, subtract `f(a)`, then factor and cancel `h`.

What should happen to the denominator `h` before substituting `h = 0`? >> The problematic factor should cancel or simplify away.

What does a simplified difference quotient approach? >> The derivative value.

What is the difference quotient for the derivative function at `x`? >> `(f(x+h) - f(x)) / h`.

What does the derivative function definition look like? >> `f'(x) = lim_{h→0} (f(x+h) - f(x)) / h`.

## D. Derivative As A Limit

What is the limit definition of `f'(a)` using `h`? >> `f'(a) = lim_{h→0} (f(a+h) - f(a)) / h`.

What is the limit definition of `f'(a)` using `x` approaching `a`? >> `f'(a) = lim_{x→a} (f(x) - f(a)) / (x - a)`.

What must be true for `f'(a)` to exist? >> The derivative limit must exist as a finite two-sided limit.

How do left and right derivative limits determine differentiability? >> The derivative exists only if the left-hand and right-hand derivative limits both exist and agree.

What is the left-hand derivative at `a`? >> The limit of the difference quotient as the approach comes from the left side.

What is the right-hand derivative at `a`? >> The limit of the difference quotient as the approach comes from the right side.

What happens if the left and right derivative limits disagree? >> The derivative does not exist at that point.

What does it mean when a derivative fails to exist? >> There is no single finite tangent slope at that point.

Can a function be continuous but not differentiable? >> Yes, for example at a corner or cusp.

Can a function be differentiable but not continuous? >> No. Differentiability implies continuity.

## E. When Derivatives Do Not Exist

Why might a derivative not exist at a corner? >> The left and right tangent slopes are different.

Why might a derivative not exist at a cusp? >> The slopes become unbounded or approach different infinite behavior.

Why might a derivative not exist at a vertical tangent? >> The tangent slope is infinite or undefined.

Why might a derivative not exist at a discontinuity? >> Differentiability requires continuity first.

What graph feature often signals a derivative does not exist? >> Sharp corner, cusp, vertical tangent, jump, hole, or infinite discontinuity.

Does a tangent line always mean the derivative exists? >> In Calc 1, the derivative exists when the tangent has a single finite slope.

What is the derivative of `|x|` at `x = 0`? >> It does not exist because the left slope is `-1` and the right slope is `1`.

What is the derivative behavior at a jump discontinuity? >> The derivative does not exist there.

What is the derivative behavior at a removable discontinuity? >> The derivative does not exist at the hole because the function is not continuous there.

What is the first thing to check before differentiability at a point? >> Check whether the function is continuous at that point.

## F. Basic Derivative Rules

What is the derivative of a constant? >> `0`.

What is the derivative of `x`? >> `1`.

What is the power rule? >> `d/dx [x^n] = n x^{n-1}`.

What is the constant multiple rule? >> `d/dx [c f(x)] = c f'(x)`.

What is the sum rule? >> `d/dx [f(x) + g(x)] = f'(x) + g'(x)`.

What is the difference rule? >> `d/dx [f(x) - g(x)] = f'(x) - g'(x)`.

What is the product rule? >> `(fg)' = f'g + fg'`.

What is the quotient rule? >> `(f/g)' = (f'g - fg') / g^2`, where `g ≠ 0`.

What is the chain rule? >> The derivative of a composition is outside derivative times inside derivative.

What is the chain rule notation for `f(g(x))`? >> `d/dx[f(g(x))] = f'(g(x)) g'(x)`.

## G. Common Derivatives

What is `d/dx [sin x]`? >> `cos x`.

What is `d/dx [cos x]`? >> `-sin x`.

What is `d/dx [tan x]`? >> `sec^2 x`.

What is `d/dx [e^x]`? >> `e^x`.

What is `d/dx [a^x]`? >> `a^x ln(a)`.

What is `d/dx [ln x]`? >> `1/x`.

What is `d/dx [log_a x]`? >> `1 / (x ln a)`.

What is `d/dx [sqrt(x)]`? >> `1/(2 sqrt(x))`, for `x > 0`.

What is `d/dx [1/x]`? >> `-1/x^2`.

What is `d/dx [x^{-n}]` found by? >> The power rule, treating the exponent as negative.

## H. Early Theorems And Consequences

What does differentiability imply? >> Continuity.

Does continuity imply differentiability? >> No.

What does Rolle's Theorem say informally? >> If a function is continuous on `[a,b]`, differentiable on `(a,b)`, and has equal endpoint values, then some interior point has derivative `0`.

What are the hypotheses of Rolle's Theorem? >> Continuous on `[a,b]`, differentiable on `(a,b)`, and `f(a) = f(b)`.

What is the conclusion of Rolle's Theorem? >> There exists `c` in `(a,b)` such that `f'(c) = 0`.

What does the Mean Value Theorem say informally? >> Somewhere, the instantaneous rate of change equals the average rate of change over the interval.

What are the hypotheses of the Mean Value Theorem? >> Continuous on `[a,b]` and differentiable on `(a,b)`.

What is the conclusion of the Mean Value Theorem? >> There exists `c` in `(a,b)` such that `f'(c) = (f(b)-f(a))/(b-a)`.

How is Rolle's Theorem related to the Mean Value Theorem? >> Rolle's Theorem is the special case where the average rate of change is `0`.

What does the Extreme Value Theorem say? >> A continuous function on a closed interval has an absolute maximum and absolute minimum.

What are the hypotheses of the Extreme Value Theorem? >> The function is continuous on a closed interval `[a,b]`.

Does EVT require differentiability? >> No. It only requires continuity on a closed interval.

What is Fermat's theorem about local extrema? >> If `f` has a local extremum at an interior point and `f'` exists there, then `f'(c)=0`.

Why does Fermat's theorem matter? >> It explains why critical points are candidates for local maxima and minima.

## I. Increasing, Decreasing, And Critical Points

What is a critical number? >> A point in the domain where `f'(x)=0` or `f'(x)` does not exist.

Why are critical numbers important? >> Local maxima and minima can occur at critical numbers.

If `f'(x) > 0` on an interval, what is `f` doing? >> Increasing on that interval.

If `f'(x) < 0` on an interval, what is `f` doing? >> Decreasing on that interval.

What is the First Derivative Test? >> Use sign changes of `f'` around a critical number to classify local maxima and minima.

What sign change gives a local maximum? >> `f'` changes from positive to negative.

What sign change gives a local minimum? >> `f'` changes from negative to positive.

What if `f'` does not change sign at a critical number? >> There may be no local extremum there.

What is an absolute maximum? >> The greatest function value on the entire interval or domain considered.

What is an absolute minimum? >> The smallest function value on the entire interval or domain considered.

What candidates should you check for absolute extrema on a closed interval? >> Critical numbers inside the interval and the endpoints.

## J. Concavity And Second Derivatives

What does the second derivative measure? >> How the first derivative is changing; it gives concavity information.

If `f''(x) > 0`, what is the graph doing? >> Concave up.

If `f''(x) < 0`, what is the graph doing? >> Concave down.

What is an inflection point? >> A point where concavity changes.

What does concave up look like? >> The graph bends upward like a cup.

What does concave down look like? >> The graph bends downward like a cap.

What does the Second Derivative Test classify? >> Local maxima and minima using the sign of `f''` at a critical point.

If `f'(c)=0` and `f''(c)>0`, what happens? >> `f` has a local minimum at `c`.

If `f'(c)=0` and `f''(c)<0`, what happens? >> `f` has a local maximum at `c`.

If `f'(c)=0` and `f''(c)=0`, what does the Second Derivative Test say? >> The test is inconclusive.

## K. Applications

What is an optimization problem? >> A problem asking for a maximum or minimum value under given conditions.

What is the usual optimization workflow? >> Define variables, write the target function, use constraints, differentiate, find critical points, and check candidates.

What is related rates? >> Problems where quantities change with time and their rates are connected by an equation.

What is the usual related-rates workflow? >> Draw/define variables, write an equation, differentiate with respect to time, substitute known values, solve for the unknown rate.

Why do related-rates problems use implicit differentiation? >> Because multiple variables depend on time.

What does `dy/dt` mean? >> The rate of change of `y` with respect to time.

What does `dx/dt` mean? >> The rate of change of `x` with respect to time.

What does linear approximation use? >> A tangent line to approximate function values near a point.

What is the linearization formula at `x=a`? >> `L(x) = f(a) + f'(a)(x-a)`.

Why is the derivative useful in graph sketching? >> It identifies increasing/decreasing behavior, extrema, and concavity.

What is implicit differentiation? >> Differentiating an equation where `y` is treated as a function of `x`.

When do you use implicit differentiation? >> When solving explicitly for `y` is hard or unnecessary.

## L. Notation And Interpretation

What are common notations for the derivative? >> `f'(x)`, `y'`, `dy/dx`, and `d/dx[f(x)]`.

What does `f'(a)` mean compared with `f'(x)`? >> `f'(a)` is a number at one point; `f'(x)` is the derivative function.

What does `dy/dx` emphasize? >> Rate of change of `y` with respect to `x`.

What does `d/dx` emphasize? >> An operation: differentiate with respect to `x`.

What does a positive derivative mean? >> The function is increasing locally.

What does a negative derivative mean? >> The function is decreasing locally.

What does a zero derivative mean? >> The tangent line is horizontal, though this does not always mean a max or min.

What does a large derivative magnitude mean? >> The graph is changing steeply.

What unit does a derivative have? >> Output units divided by input units.

What is a good derivative interpretation sentence? >> "For each 1-unit increase in the input, the output is changing at about `f'(x)` units at that instant."

## M. Reverse And Conceptual Questions

A function has a derivative at `a`. What must be true about continuity at `a`? >> The function must be continuous at `a`.

A function is continuous at `a`. Must it be differentiable at `a`? >> No.

A graph has a sharp corner at `a`. What usually happens to the derivative? >> It does not exist at `a`.

A graph has a vertical tangent at `a`. What usually happens to the derivative? >> It does not exist as a finite derivative.

A graph has a local maximum at an interior point and is differentiable there. What is the derivative? >> `0`.

A graph changes from increasing to decreasing. What kind of point might be present? >> A local maximum.

A graph changes from decreasing to increasing. What kind of point might be present? >> A local minimum.

A graph changes concavity. What kind of point might be present? >> An inflection point.

If `f'(x)` is increasing, what can you say about `f''(x)`? >> `f''(x)` is positive where that increasing behavior holds.

If `f'(x)` is decreasing, what can you say about `f''(x)`? >> `f''(x)` is negative where that decreasing behavior holds.
