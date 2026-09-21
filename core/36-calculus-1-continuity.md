# 36 Calculus 1 - Continuity

Calc 1 cards for continuity: point continuity, interval continuity, graph/table recognition, discontinuity types, piecewise functions, continuity rules, and IVT/EVT.

## A. Big Picture

What does it mean for a function to be continuous informally? >> You can draw the graph near the point without lifting your pencil.

What is the main idea of continuity at a point? >> The function value matches the value the graph approaches.

What three things must be true for `f` to be continuous at `x = a`? >> `f(a)` is defined, `lim_{x→a} f(x)` exists, and `lim_{x→a} f(x) = f(a)`.

What is the first continuity check at `x = a`? >> Check that `f(a)` is defined.

What is the second continuity check at `x = a`? >> Check that `lim_{x→a} f(x)` exists.

What is the third continuity check at `x = a`? >> Check that the limit equals the function value: `lim_{x→a} f(x) = f(a)`.

What does it mean if `f(a)` is undefined? >> The function is not continuous at `a`.

What does it mean if the two-sided limit does not exist? >> The function is not continuous at `a`.

What does it mean if the limit exists but is not equal to `f(a)`? >> The function is not continuous at `a`.

What is the short formula for continuity at `a`? >> `lim_{x→a} f(x) = f(a)`.

## B. Continuity From Graphs

How do you identify continuity from a graph? >> Check whether the graph connects through the point without a hole, jump, or vertical blow-up.

What does a filled dot show on a graph? >> The actual function value `f(a)`.

What does an open circle show on a graph? >> A missing point or hole in the graph.

Can a graph have a limit at a hole? >> Yes, if both sides approach the same y-value.

Is a function continuous at a hole? >> No, because the function value is missing or does not match the limit.

What graph feature suggests a jump discontinuity? >> The left and right pieces approach different y-values.

What graph feature suggests an infinite discontinuity? >> The graph shoots upward or downward near a vertical line.

What graph feature suggests oscillatory discontinuity? >> The graph wiggles infinitely without approaching one value.

How do you check continuity at a graph endpoint? >> Use the one-sided limit from inside the domain and compare it to the endpoint value.

What should you compare at a piecewise graph boundary? >> The left-hand limit, right-hand limit, and function value.

## C. Continuity From Tables And Formulas

How can a table suggest continuity at `a`? >> Values from the left and right approach the same number, and `f(a)` equals that number.

What table behavior suggests a jump? >> Values from the left and right approach different numbers.

What table behavior suggests a removable discontinuity? >> Values approach one number, but `f(a)` is missing or listed as a different number.

For a formula, what is the first continuity move? >> Check whether the formula is defined at the point.

When is direct substitution enough for continuity? >> When the function type is continuous at the point and substitution is allowed.

Why are polynomials continuous everywhere? >> They are built from sums and products of powers of `x`, which are continuous for all real `x`.

Where can rational functions fail to be continuous? >> Where the denominator equals zero.

Where can square-root functions fail to be continuous? >> Where the expression inside the root is negative, or at domain endpoints depending on the question.

Where can logarithmic functions fail to be continuous? >> Where the input to the logarithm is not positive.

Where can trigonometric quotient functions fail to be continuous? >> Where a denominator is zero or the expression is outside its domain.

## D. One-Sided Continuity

What is right-continuity at `a`? >> `lim_{x→a⁺} f(x) = f(a)`.

What is left-continuity at `a`? >> `lim_{x→a⁻} f(x) = f(a)`.

Why is one-sided continuity important at endpoints? >> At an endpoint, the function may only be defined on one side.

What continuity condition is used at the left endpoint of a closed interval? >> Right-continuity from inside the interval.

What continuity condition is used at the right endpoint of a closed interval? >> Left-continuity from inside the interval.

For continuity on `[a,b]`, what is required at interior points? >> Ordinary two-sided continuity.

For continuity on `[a,b]`, what is required at endpoints? >> One-sided continuity from within the interval.

When does a two-sided continuity check fail automatically? >> When the left-hand and right-hand limits are different.

## E. Types Of Discontinuity

What is a discontinuity? >> A point where the function is not continuous.

What is a removable discontinuity? >> A hole or wrong point value that could be fixed by redefining the function at that point.

What is a jump discontinuity? >> A discontinuity where the left-hand and right-hand limits are finite but different.

What is an infinite discontinuity? >> A discontinuity where the function grows without bound near the point.

What is an oscillatory discontinuity? >> A discontinuity where the function keeps oscillating and does not approach one value.

How do you recognize a removable discontinuity algebraically? >> A factor cancels, leaving a hole at the canceled value.

How do you recognize an infinite discontinuity algebraically? >> The denominator approaches zero while the numerator does not also cancel to zero.

Can a removable discontinuity have a two-sided limit? >> Yes.

Can a jump discontinuity have a two-sided limit? >> No, because the one-sided limits differ.

Can an infinite discontinuity have a finite two-sided limit? >> No.

What type of discontinuity is caused by `sin(1/x)` near `0`? >> Oscillatory discontinuity.

## F. Piecewise Functions

Why do piecewise functions need special continuity checks? >> Different formulas may apply on different sides of a boundary.

What do you check at a piecewise boundary? >> Left-hand limit, right-hand limit, and the actual function value.

What must be true for a piecewise function to be continuous at a boundary? >> Left limit, right limit, and function value must all be equal.

How do you solve for a constant to make a piecewise function continuous? >> Set the relevant one-sided expressions equal at the boundary, then solve for the constant.

If a piecewise function defines `f(a)` using the left formula, what still must be checked? >> The right-hand limit must match that same value.

If left and right limits match but `f(a)` is different, what type of discontinuity is present? >> Removable discontinuity.

If left and right limits do not match, can changing only `f(a)` make the function continuous? >> No.

What is the usual workflow for piecewise continuity? >> Compute left limit, compute right limit, compute `f(a)`, compare all three.

## G. Continuity Rules

If `f` and `g` are continuous at `a`, is `f+g` continuous at `a`? >> Yes.

If `f` and `g` are continuous at `a`, is `f-g` continuous at `a`? >> Yes.

If `f` and `g` are continuous at `a`, is `fg` continuous at `a`? >> Yes.

If `f` and `g` are continuous at `a`, when is `f/g` continuous at `a`? >> When `g(a) ≠ 0`.

If `g` is continuous at `a` and `f` is continuous at `g(a)`, what about `f(g(x))`? >> The composition `f∘g` is continuous at `a`.

Why is composition continuity useful? >> It lets you evaluate many limits by direct substitution.

Are absolute value functions continuous? >> Yes, `|x|` is continuous everywhere.

Are sine and cosine continuous everywhere? >> Yes.

Is tangent continuous everywhere? >> No, tangent is discontinuous where `cos x = 0`.

Are exponential functions continuous everywhere? >> Yes.

Are logarithmic functions continuous everywhere? >> No, logs are continuous only on their positive domain.

## H. Continuity On Intervals

What does it mean for a function to be continuous on an open interval? >> It is continuous at every point in the interval.

What does it mean for a function to be continuous on a closed interval `[a,b]`? >> It is continuous on `(a,b)`, right-continuous at `a`, and left-continuous at `b`.

Why do closed intervals matter in Calc 1 theorems? >> Theorems like IVT and EVT require continuity on a closed interval.

What is a common interval notation for all real numbers? >> `(-∞, ∞)`.

How do holes affect continuity on an interval? >> The function is not continuous on any interval that includes the hole.

How do vertical asymptotes affect continuity on an interval? >> The function is not continuous on any interval that crosses the asymptote.

How do domain restrictions affect continuity intervals? >> Continuity can only be considered where the function is defined.

## I. Intermediate Value Theorem

What does the Intermediate Value Theorem say informally? >> A continuous function on `[a,b]` takes every y-value between `f(a)` and `f(b)`.

What are the hypotheses of the Intermediate Value Theorem? >> The function is continuous on the closed interval `[a,b]`.

What does IVT let you prove? >> That some input exists where the function reaches a particular intermediate value.

Does IVT tell you where the input is exactly? >> No, it guarantees existence but not the exact location.

Why does IVT fail without continuity? >> A jump or hole can skip over intermediate y-values.

How can IVT prove a root exists? >> If `f(a)` and `f(b)` have opposite signs, continuity guarantees some `c` with `f(c)=0`.

What does a sign change across an interval suggest for a continuous function? >> There is at least one root in the interval.

Does IVT guarantee only one solution? >> No, it guarantees at least one solution.

## J. Extreme Value Theorem

What does the Extreme Value Theorem say? >> A continuous function on a closed interval has an absolute maximum and absolute minimum.

What are the hypotheses of EVT? >> The function is continuous on a closed interval `[a,b]`.

Does EVT require differentiability? >> No.

What does EVT guarantee? >> Absolute maximum and minimum values exist on the interval.

Does EVT tell you how to find the maximum and minimum? >> No, it guarantees they exist; derivative methods help find them later.

Why can EVT fail on an open interval? >> The function may approach a value without ever attaining it.

Why can EVT fail if the function is discontinuous? >> A hole or jump can remove the point where an extreme value would occur.

What is the difference between local and absolute extrema? >> Local extrema compare nearby points; absolute extrema compare the whole domain or interval.

## K. Continuity And Derivatives

If a function is differentiable at `a`, what must be true? >> It is continuous at `a`.

If a function is continuous at `a`, must it be differentiable at `a`? >> No.

What is an example of continuous but not differentiable? >> `f(x)=|x|` at `x=0`.

Why is `|x|` not differentiable at `0`? >> The left and right slopes are different.

Can a discontinuous function have a derivative at that point? >> No.

What should you check before asking whether a derivative exists? >> Check continuity first.

Does a corner break continuity? >> Not necessarily; a corner can be continuous but not differentiable.

Does a hole break differentiability? >> Yes, because it breaks continuity.

## L. Test Strategy

What is the continuity checklist at a point? >> Check `f(a)`, check the limit, then check whether they are equal.

What should you do first for a formula continuity problem? >> Identify the point and check whether the formula is defined there.

What should you do first for a graph continuity problem? >> Look for holes, jumps, asymptotes, and mismatched point values.

What should you do first for a piecewise continuity problem? >> Check the boundary points where formulas change.

If a denominator is zero at the point, what should you ask? >> Does a factor cancel, or is there a vertical asymptote?

If a factor cancels, what discontinuity is likely? >> Removable discontinuity.

If no factor cancels and the denominator is zero, what discontinuity is likely? >> Infinite discontinuity or vertical asymptote.

If left and right limits are different, what discontinuity is likely? >> Jump discontinuity.

If the function wiggles without settling, what discontinuity is likely? >> Oscillatory discontinuity.

What is the final exam habit for continuity questions? >> Always state which of the three continuity conditions fails or succeeds.
